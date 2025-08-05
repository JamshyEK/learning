import React, { useEffect, useRef, useState } from "react";

interface ICoundown {
  hour: number;
  minute: number;
  second: number;
}

const Countdown: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [countdown, setCountdown] = useState<ICoundown>({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (counter === 0) {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    }
  }, [counter]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCountdown((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const handleStart = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      setCounter(0);
    }
    console.log(intervalId);

    const { hour, minute, second } = countdown;
    if (hour || minute || second) {
      const hourToSec = hour * 60 * 60;
      const minuteToSec = minute * 60;
      const totalCount = hourToSec + minuteToSec + second;
      setCountdown({
        hour: 0,
        minute: 0,
        second: 0,
      });
      setCounter((prev) => prev + totalCount);
      intervalId.current = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }
  };

  const second = Math.floor(counter % 60);
  const minute = Math.floor(counter / 60);
  const hour = Math.floor(counter / (60 * 60));

  return (
    <div className='rounded border-gray-600 border-2 p-4'>
      <h1 className='text-center text-3xl font-bold text-zinc-600'>
        Countdown
      </h1>
      <div className='flex flex-row justify-center gap-4 p-4'>
        <input
          type='number'
          name='hour'
          placeholder='Hour'
          value={countdown.hour || ""}
          onChange={handleChange}
          className='border border-gray-300 p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input
          type='number'
          name='minute'
          value={countdown.minute || ""}
          placeholder='Minute'
          onChange={handleChange}
          className='border border-gray-300 p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <input
          type='number'
          name='second'
          value={countdown.second || ""}
          placeholder='Second'
          onChange={handleChange}
          className='border border-gray-300 p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={handleStart}
          className='bg-green-600 p-1 pl-3 pr-3 text-white rounded'>
          Start
        </button>
      </div>
      <div className='flex flex-row justify-center gap-4 p-4'>
        <h3 className='text-5xl font-extrabold text-gray-900'>
          {" "}
          {hour ? (hour.toString().length === 1 ? `0${hour}` : hour) : "00"}
        </h3>
        <h3 className='text-5xl font-extrabold text-gray-900'>:</h3>
        <h3 className='text-5xl font-extrabold text-gray-900'>
          {" "}
          {minute
            ? minute.toString().length === 1
              ? `0${minute}`
              : minute
            : "00"}
        </h3>
        <h3 className='text-5xl font-extrabold text-gray-900'>:</h3>
        <h3 className='text-5xl font-extrabold text-gray-900'>
          {second
            ? second.toString().length === 1
              ? `0${second}`
              : second
            : "00"}
        </h3>
      </div>
    </div>
  );
};

export default Countdown;
