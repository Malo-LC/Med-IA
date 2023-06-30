import tensorflow as tf
import base64
from io import BytesIO
from tensorflow.keras.preprocessing.image import img_to_array

print("Loading model")
model_path = "model_ML.h5"
model = tf.keras.models.load_model(model_path)

print("Model loaded")
print(model.summary())


from flask import Flask, request, jsonify
from PIL import Image
import numpy as np


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


@app.route("/predict", methods=["POST"])
def predict():
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

    result = model.predict(image)
    result = np.argmax(result, axis=1)

    # Return the prediction as JSON response
    if result == 0:
        response = "normal"
    else:
        response = "pneumonia"

    return jsonify(response)


if __name__ == "__main__":
    app.run()
