import tensorflow as tf
import base64
from io import BytesIO
from tensorflow.keras.preprocessing.image import img_to_array
from glob import glob
from flask import Flask, request, jsonify
from PIL import Image
import numpy as np

# Load the models
print("Loading modelPn")
modelPn = tf.keras.models.load_model("model_ML.h5")

print("Model loaded")
print(modelPn.summary())

print("Loading modelMe")
modelMe = tf.keras.models.load_model("model_melanoma.h5")

print("Model loaded")
print(modelMe.summary())

classnames = [
    "actinic keratosis",
    "basal cell carcinoma",
    "dermatofibroma",
    "melanoma",
    "nevus",
    "pigmented benign keratosis",
    "seborrheic keratosis",
    "squamous cell carcinoma",
    "vascular lesion",
]


def convert_base64_to_image(base64_string):
    # Remove the data URL prefix if present
    if base64_string.startswith("data:image"):
        base64_string = base64_string.split(",")[-1]

    # Decode the base64 string
    image_bytes = base64.b64decode(base64_string)

    # Create a BytesIO object to work with the bytes data
    image_buffer = BytesIO(image_bytes)

    # Open the image using PIL (Python Imaging Library)
    image = Image.open(image_buffer)

    return image


app = Flask(__name__)


@app.route("/predictPneumonia", methods=["POST"])
def predictPneumonia():
    # Get the image file from the request
    # Access the JSON body of the request
    json_data = request.json

    # Access the desired property
    base64Image = json_data.get("image")
    image = convert_base64_to_image(base64Image)

    # Open the image using PIL
    image = image.convert("RGB")
    image = image.resize((224, 224))
    image = img_to_array(image)
    image = image.reshape(1, 224, 224, 3)
    image = image / 255.0

    result = modelPn.predict(image)
    result = np.argmax(result, axis=1)

    # Return the prediction as JSON response
    if result == 0:
        response = "normal"
    else:
        response = "pneumonia"

    return jsonify(response)


@app.route("/predictMelanoma", methods=["POST"])
def predictMelanoma():
    # Get the image file from the request
    # Access the JSON body of the request
    json_data = request.json

    # Access the desired property
    base64Image = json_data.get("image")
    image = convert_base64_to_image(base64Image)
    image = image.convert("RGB")
    image = image.resize((180, 180))
    image = img_to_array(image)
    image = image.reshape(1, 180, 180, 3)
    image = image / 255.0

    # img = np.expand_dims(image, axis=0)

    result = modelMe.predict(image)
    result = np.argmax(result)

    response = classnames[result]

    return jsonify(response)


if __name__ == "__main__":
    app.run()
