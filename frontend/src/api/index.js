import { getAccessToken, setAccessToken } from "../auth";
import { BASE_URL } from "../components/routes/route";

const api = async (endpoint, options = {}) => {
    options.credentials = "include";
    options.headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    const token = getAccessToken();
    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }
    try {
        let response = await fetch(`${BASE_URL}${endpoint}`, options);
        if (response.status === 401 && !options._retry) {
            options._retry = true;

            const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (refreshResponse.ok) {
                const data = await refreshResponse.json();

                setAccessToken(data.accessToken);

                options.headers["Authorization"] = `Bearer ${data.accessToken}`;

                return await fetch(`${BASE_URL}${endpoint}`, options);
            } else {
                setAccessToken(null);
                window.dispatchEvent(new Event("auth-failure"));
                return Promise.reject("Session expired");
            }
        }
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default api;
