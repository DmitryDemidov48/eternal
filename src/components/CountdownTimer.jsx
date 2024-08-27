import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const isActive = true;

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);


    function calculateTimeLeft() {
        const currentDate = new Date();
        const difference = targetDate - currentDate;

        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((difference / 1000 / 60) % 60);
        let seconds = Math.floor((difference / 1000) % 60);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    return (
        <div className="text-zinc-600 p-5 m-4 rounded-sm shadow-md mx-auto dark:text-zinc-400 max-w-xl md:max-w-md lg:max-w-lg xl:max-w-2xl mobile-timer ">
            <div className="grid grid-cols-4 gap-16">
                <div className="text-center">
                    <div className={`text-3xl font-bold ${isActive ? 'text-teal-500 dark:text-teal-400' : 'dark:text-zinc-400'}`}>{timeLeft.days}</div>
                    <div className="text-sm dark:text-zinc-400">дней</div>
                </div>
                <div className="text-center">
                    <div className={`text-3xl font-bold ${isActive ? 'text-teal-500 dark:text-teal-400' : 'dark:text-zinc-400'}`}>{timeLeft.hours}</div>
                    <div className="text-sm dark:text-zinc-400">часов</div>
                </div>
                <div className="text-center">
                    <div className={`text-3xl font-bold ${isActive ? 'text-teal-500 dark:text-teal-400' : 'dark:text-zinc-400'}`}>{timeLeft.minutes}</div>
                    <div className="text-sm dark:text-zinc-400">минут</div>
                </div>
                <div className="text-center">
                    <div className={`text-3xl font-bold ${isActive ? 'text-teal-500 dark:text-teal-400' : 'dark:text-zinc-400'}`}>{timeLeft.seconds}</div>
                    <div className="text-sm dark:text-zinc-400 ">секунд</div>
                </div>
            </div>
        </div>
    );
}

export default CountdownTimer;
