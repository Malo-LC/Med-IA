const API_URL = "http://localhost:3000/api";

class API {
  get(path) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}${path}`, {
          mode: "cors",
          credentials: "include",
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  put(path, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}${path}`, {
          mode: "cors",
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: typeof body === "string" ? body : JSON.stringify(body),
        });

        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  post(path, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}${path}`, {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: typeof body === "string" ? body : JSON.stringify(body),
        });

        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }

  delete(path) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}${path}`, {
          mode: "cors",
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const res = await response.json();
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  }
}

const api = new API();

export default api;
