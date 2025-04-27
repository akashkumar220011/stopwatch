import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import clickSound from '../assets/click.mp3';



const Stopwatch = () => {
const [time, setTime] = useState(0);
const [running, setRunning] = useState(false);
const [lastTime, setLastTime] = useState(null);
const [laps,setLaps] = useState([]);
const intervalRef = useRef(null);
const [play] = useSound(clickSound);


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
    play();
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
    play();
};


const resetTimer =()=>{
    stopTimer();
    setTime(0);
    setLastTime(null);
    setLaps([]);
  localStorage.removeItem("lastStopTime");
  play();
}

const recordLap = ()=>{
    const formatted = formatTime(time);
    setLaps(prevLaps => [...prevLaps, formatted]);
    play();
}

const formatTime = (time)=>{
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(time/1000);
    const getSeconds =`0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes}`.slice(-2);

    return `${getMinutes}:${getSeconds}:${getMilliseconds}`
}
const progressWidth = (time % 60000) /600;
  return (
    <div className='h-dvh grid place-items-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364]'>
      <motion.div 
        initial={{opacity: 0, scale: 0.8}}
        animate={{ opacity:1, scale:1}}
        transition={{duration: 0.5 }}
        className=' bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg text-center grid gap-6 w-full max-w-md'>
        <h1 className='text-4xl text-white font-bold'>Stopwatch</h1>

        {/* Progress Bar */}
        <div className='w-ful bg-white/20 h-2 rounded-full overflow-hidden mb-4'>
            <motion.div className='bg-cyan-400 h-full'
            style={{width: `${progressWidth}%`}}
            transition={{ease: "easeInOut", duration: 0.2}}/>
        </div>
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
          <button onClick={recordLap}  className="neon-button bg-purple-500 hover:bg-purple-600">Lap</button>
        </div>
        {/* Lap Records */}
        {laps.length > 0 && ( 
            <div className='text-white mt-4'>
                <h2 className='text-xl font-semibold mb-2'>Laps</h2>
                <ul className='grid gap-1 max-h-40 overflow-y-auto'>
                    {laps.map((lap,index)=>(
                        <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x:0 }}
                        transition={{ delay: index * 0.1 }}
                        className='text-sm text-gray-200'
                        >#{index+1} : {lap}</motion.div>
                    ))}
                </ul>
            </div>
        )}
      </motion.div>
    </div>
  )
}

export default Stopwatch