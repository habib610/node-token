import { LOGIN_URI, LOGOUT_URI } from "../components/routes/route";

let accessToken = null;
export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

export const login = async (body) => {
    try {
        let data = await fetch(LOGIN_URI, {
            method: "POST",
            body: JSON.stringify(body),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (data.ok) {
            let res = await data.json();
            setAccessToken(res?.accessToken);
            return Promise.resolve(res.user);
        } else {
            Promise.reject("Something went wrong!");
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const logout = async () => {
    try {
        let data = await fetch(LOGOUT_URI, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (data.ok) {
            setAccessToken(null);
            return Promise.resolve("Logout success");
        } else {
            return Promise.reject("Something went wrong!");
        }
    } catch (error) {
        return Promise.reject(error);
    }
};
