const formatSeconds = (totalSeconds) => {
    if (!totalSeconds) return totalSeconds;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);

    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
};

const formatSecondsToHHMM = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const hh = String(hours).padStart(1, "0");
    const mm = String(minutes).padStart(2, "0");

    return hours > 0 ? `${hh} giờ ${mm} phút` : `${mm} phút`;
};

const saveToken = (token) => {
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem("refresh_token", token.refresh_token);
};

const getToken = () => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    return { access_token, refresh_token };
};

const deleteToken = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export { formatSeconds, formatSecondsToHHMM, saveToken, getToken, deleteToken };
