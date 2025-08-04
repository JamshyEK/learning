import React, { useRef, useState } from "react";

enum ButtonType {
  START = "start",
  STOP = "stop",
  RESET = "reset",
}

const Timer: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleClick = (type: ButtonType) => {
    if (type === ButtonType.START) {
      if (!isRunning) {
        setIsRunning(true);
        intervalId.current = setInterval(() => {
          setCounter((prev) => prev + 1);
        }, 1000);
      }
    } else if (type === ButtonType.STOP) {
      if (intervalId.current !== null) {
        setIsRunning(false);
        clearInterval(intervalId.current);
      }
    } else {
      if (intervalId.current !== null) {
        setIsRunning(false);
        clearInterval(intervalId.current);
        setCounter(0);
      }
    }
  };

  const second = Math.floor(counter % 60);
  const minute = Math.floor(counter / 60);
  const hour = Math.floor(counter / (60 * 60));

  return (
    <div className='h-screen flex justify-center items-center shadow'>
      <div className='rounded border-gray-600 border-2 p-4'>
        <h1 className='text-center text-3xl font-bold text-zinc-600'>Timer</h1>
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
        <div className='flex flex-row justify-center gap-4 p-4'>
          <button
            onClick={() => handleClick(ButtonType.START)}
            className='bg-green-600 p-1 pl-3 pr-3 text-white rounded'>
            Start
          </button>
          <button
            onClick={() => handleClick(ButtonType.STOP)}
            className='bg-red-600 p-1 pl-3 pr-3 text-white rounded'>
            Stop
          </button>
          <button
            onClick={() => handleClick(ButtonType.RESET)}
            className='bg-blue-600 p-1 pl-3 pr-3 text-white rounded'>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
