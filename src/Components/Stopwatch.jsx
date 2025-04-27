import React, { useEffect, useRef, useState } from 'react'

const Stopwatch = () => {
const [time, setTime] = useState(0);
const [running, setRunning] = useState(false);
const [lastTime, setLastTime] = useState(null);
const intervalRef = useRef(null);


useEffect(()=>{
    const savedTime = localStorage.getItem("lastStopTime");
    if(savedTime){
        setLastTime(savedTime);
    }
},[]);

const startTimer=()=>{
    if(intervalRef.current !== null) return;
    setRunning(true);
    intervalRef.current = setInterval(()=>{
        setTime(prev=> prev +10);
    }, 10);
};
const stopTimer =()=>{
    if(intervalRef.current){
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
    setRunning(false);

    const formatted = formatTime(time);
    setLastTime(formatted);
    localStorage.setItem("lastStopTime", formatted);
};


const resetTimer =()=>{
    stopTimer();
    setTime(0);
}

const formatTime = (time)=>{
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time/1000);
    const getSeconds =`0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes}`.slice(-2);

    return `${getMinutes}:${getSeconds}:${getMilliseconds}`
}
  return (
    <div className='h-dvh grid place-items-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]'>
      <div className=' bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg text-center grid gap-6'>
        <h1 className='text-4xl text-white font-bold'>Stopwatch</h1>

        {/* Current running time */}
        <div className='text-5xl font-mono text-white'>{formatTime(time)}</div>

        {/* Last stop time */}
        {lastTime && (
            <div className='text-md text-gray-300 mb-8'>Last Stopped at: <span className='text-white font-bold'>{lastTime}</span></div>
        )}
        <div className='grid grid-cols-3 text-white gap-4 mt-4'>
          <button onClick={startTimer} className="neon-button  bg-green-500 hover:bg-green-600">Start</button>
          <button onClick={stopTimer} className="neon-button bg-yellow-500 hover:bg-yellow-600">Stop</button>
          <button onClick={resetTimer} className="neon-button  bg-red-500 hover:bg-red-600">Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Stopwatch