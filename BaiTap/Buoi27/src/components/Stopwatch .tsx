import { useEffect, useRef, useState } from "react";
import { TimeSpan } from "ts-timespan";

export const StopWatch = () => {
    function formatTimeSpan(ts: TimeSpan): string {
        const milliseconds = Math.floor((ts.milliseconds % 1000) / 10);
        const mm = String(ts.minutes).padStart(2, "0");
        const ss = String(ts.seconds).padStart(2, "0");
        const ms = String(milliseconds).padStart(2, "0");

        return `${mm}:${ss}:${ms}`;
    }
    const [timer, setTimer] = useState<number>(0);
    const [isRuning, setIsRuning] = useState<boolean>(false);
    const [laptimes, setLapTime] = useState<number[]>([]);
    const timerID = useRef(0);
    const timeStart = useRef(0);
    const handleStop = (): void => {
        clearInterval(timerID.current);
        setIsRuning(false);
    };
    const handleStart = (): void => {
        if (isRuning || timer !== 0 || timerID.current) return;

        timeStart.current = Date.now();
        timerID.current = setInterval(() => {
            setTimer(Date.now() - timeStart.current);
        }, 10);
        setIsRuning(true);
    };

    const handleContinue = (): void => {
        if (isRuning) return;
        timeStart.current = Date.now() - timer;
        timerID.current = setInterval(() => {
            setTimer(Date.now() - timeStart.current);
        }, 10);
        setIsRuning(true);
    };
    const handleReset = (): void => {
        setTimer(0);
        handleStop();
        setIsRuning(false);
        setLapTime([]);
    };

    const handleAddlap = (): void => {
        setLapTime((prev) => [timer, ...prev]);
    };
    useEffect(() => {
        return () => {
            clearInterval(timerID.current);
        };
    }, []);
    return (
        <div>
            <h2>{formatTimeSpan(TimeSpan.fromMilliseconds(timer))}</h2>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleContinue}>Continue</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleAddlap}>Lap</button>
            <ul>
                {laptimes.map((lap, index) => {
                    return (
                        <li key={index}>
                            {formatTimeSpan(TimeSpan.fromMilliseconds(lap))}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
