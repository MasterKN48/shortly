import axios from "axios";
export const signup = async data => {
    try {
        const res = await axios.post("/api/register", data);
        //console.log(res);
        return res.data;
    }
    catch (err) {
        return console.error(err);
    }
};

export const signin = async data => {
    try {
        const res = await axios.post("/api/login",data)
        return res.data;
    }
    catch (err) {
        return console.error(err);
    }
};
export const google = async ()=> {
    try {
        const res = await axios({
            method: 'get', 
            url: 'http://localhost:5000/api/auth/google',
            headers: {
                "Access-Control-Allow-Origin":"*"
            }
        })
        console.log(res.data)
        return res.data;
    }
    catch (err) {
        return console.error(err);
    }
};
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("t", JSON.stringify(data));
        next();
    }
};

export const logout = async next => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("t");
        next();
        try {
            const response = await fetch(`api/logout`, {
                method: "GET"
            });
            console.log("logout", response);
        }
        catch (err) {
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