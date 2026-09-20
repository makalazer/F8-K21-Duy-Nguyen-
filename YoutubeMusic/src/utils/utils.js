export const formatSeconds = (totalSeconds) => {
    if (!totalSeconds) return totalSeconds;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);

    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
};

export const formatSecondsToHHMM = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const hh = String(hours).padStart(1, "0");
    const mm = String(minutes).padStart(2, "0");

    return hours > 0 ? `${hh} giờ ${mm} phút` : `${mm} phút`;
};
