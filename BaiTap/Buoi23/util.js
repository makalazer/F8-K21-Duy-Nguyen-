const saveToken = (token) => {
    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("refreshToken", token.refreshToken);
};

const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

const clearToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};
export { saveToken, getAccessToken, getRefreshToken, clearToken };
