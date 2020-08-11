import axios from "axios";

export const signup = async (data) => {
  try {
    const res = await axios.post("/api/register", data);
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const signin = async (data) => {
  try {
    const res = await axios.post("/api/login", data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("t", JSON.stringify(data));
    next();
  }
};

export const logout = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("t");
    next();
    try {
      const response = await axios(`api/logout`, {
        method: "GET",
      });
      console.log("logout", response);
    } catch (err) {
      return console.log(err);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("t")) {
    return JSON.parse(localStorage.getItem("t"));
  } else {
    return false;
  }
};
