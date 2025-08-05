import React, { useRef, useState } from "react";

enum ButtonType {
  START = "start",
  STOP = "stop",
  RESET = "reset",
  LAP = "lap",
}

interface Ilap {
  name: string;
  value: number;
}

const StopWatch: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const [laps, setLaps] = useState<Ilap[]>([]);

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
    } else if (type === ButtonType.LAP) {
      if (isRunning) {
        let lapName = "Lap 1";
        const lastLap = laps[laps.length - 1];
        if (lastLap) {
          const prevCount = lastLap.name.split(" ")[1];
          lapName = `Lap ${parseInt(prevCount) + 1}`;
        }
        const newLap = {
          name: lapName,
          value: counter,
        };
        setLaps((prev) => [...prev, newLap]);
      }
    } else {
      if (intervalId.current !== null) {
        setIsRunning(false);
        clearInterval(intervalId.current);
        setCounter(0);
      }
    }
  };

  // const second = Math.floor(counter % 60);
  // const minute = Math.floor(counter / 60);
  // const hour = Math.floor(counter / (60 * 60));

  const getLapTime = (value: number): [string, string, string] => {
    let second = Math.floor(value % 60).toString();
    let minute = Math.floor(value / 60).toString();
    let hour = Math.floor(value / (60 * 60)).toString();
    if (hour.length === 1) {
      hour = `0${hour}`;
    }
    if (minute.length === 1) {
      minute = `0${minute}`;
    }
    if (second.length === 1) {
      second = `0${second}`;
    }
    return [hour, minute, second];
  };

  const [hour, minute, second] = getLapTime(counter);

  return (
    <div className='rounded border-gray-600 border-2 p-4'>
      <h1 className='text-center text-3xl font-bold text-zinc-600'>
        Stop Watch
      </h1>
      <div className='flex flex-row justify-center gap-4 p-4'>
        <h3 className='text-5xl font-extrabold text-gray-900'>{hour}</h3>
        <h3 className='text-5xl font-extrabold text-gray-900'>:</h3>
        <h3 className='text-5xl font-extrabold text-gray-900'>{minute}</h3>
        <h3 className='text-5xl font-extrabold text-gray-900'>:</h3>
        <h3 className='text-5xl font-extrabold text-gray-900'>{second}</h3>
      </div>
      <div className='flex flex-row justify-center gap-4 p-4'>
        <button
          onClick={() => handleClick(ButtonType.START)}
          disabled={isRunning}
          className='bg-green-600 p-1 pl-3 pr-3 text-white rounded disabled:bg-gray-100 disabled:text-gray-400'>
          Start
        </button>
        <button
          onClick={() => handleClick(ButtonType.STOP)}
          disabled={!isRunning}
          className='bg-red-600 p-1 pl-3 pr-3 text-white rounded disabled:bg-gray-100 disabled:text-gray-400'>
          Stop
        </button>
        <button
          onClick={() => handleClick(ButtonType.RESET)}
          className='bg-blue-600 p-1 pl-3 pr-3 text-white rounded'>
          Reset
        </button>
        <button
          disabled={!isRunning}
          onClick={() => handleClick(ButtonType.LAP)}
          className='bg-orange-600 p-1 pl-3 pr-3 text-white rounded  disabled:bg-gray-100 disabled:text-gray-400'>
          Lap
        </button>
      </div>

      <div className='flex flex-col justify-center gap-4 p-4'>
        <div className='flex flex-row justify-between'>
          <h4 className='text-lg text-zinc-600 font-semibold'>Laps</h4>
          <button
            onClick={() => {
              setLaps([]);
            }}
            className='bg-blue-600 p-1 pl-3 pr-3 text-white rounded'>
            Clear
          </button>
        </div>
        <hr />
        <div className='flex flex-col justify-center gap-1'>
          {laps.map((item, index) => {
            const [hour, minute, second] = getLapTime(item.value);
            return (
              <div key={index} className='flex flex-row justify-between'>
                <h6 className='text-slate-700'>{item.name}</h6>
                <p className='text-slate-700 font-semibold'>{`${hour}:${minute}:${second}`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
