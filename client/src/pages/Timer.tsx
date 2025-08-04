import Countdown from "../components/Timer/Countdown";
import StopWatch from "../components/Timer/StopWatch";

const Timer: React.FC = () => {
  return (
    <>
      <h1 className='text-center text-4xl pt-2 font-thin text-stone-700'>
        --Timers--
      </h1>
      <div className='h-screen flex flex-col gap-2 justify-center items-center shadow'>
        <StopWatch />
        <Countdown />
      </div>
    </>
  );
};

export default Timer;
