import {useState, useEffect, useRef} from 'react';
import Button from './button';
import ButtonWrapper from './buttonHOC';

const IncrementBtn = ButtonWrapper(Button,"inc");
const DecrementBtn = ButtonWrapper(Button,"dec");
const ResetBtn = ButtonWrapper(Button,"reset");

const Timer = () => {

    // const [counter,setCounter] = useState(0);
    // const [speed,setSpeed] = useState(1000);
    // const [cutOff,changeCutoff] = useState(60);

    const [counter,setCounter] = useState(0);
    const [speed,setSpeed] = useState(1);
    const [cutOff,changeCutoff] = useState(60);
    const [scrollpos,changeScrollpos] = useState(window.pageYOffset);
    const myRef = useRef(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll',handleScroll,true)

        return () => {
            window.removeEventListener('scroll',handleScroll);
        }
    },[]);

    let countdown;
    useEffect(() => {
        let sp;
        if(speed>=1) sp = 1000/speed;
        else sp = Math.abs(speed)*1000; 
     
        countdown = setInterval(() => {
            //console.log("er"); NOT BEING DISPLAYED WHEN ONCHANGE INPUT BEING UPDATED CONTINUOUSLY
            if(counter==cutOff) setCounter(0);
            else setCounter(prevcounter => prevcounter + 1);
        },sp);

        //console.log(counter);
        return () => {
            //console.log("DUMPED");
            window.removeEventListener('scroll',handleScroll);
            clearInterval(countdown);
        }
    }, [counter,speed]); 

    useEffect(() => {

        //console.log(`${scrollpos} ${myRef.current} ${window.pageYOffset}`);
        if(scrollpos>window.pageYOffset || scrollpos>myRef.current){
            incrementSpeed();
        }
        else if(scrollpos<window.pageYOffset || scrollpos<myRef.current){ 
            decrementSpeed();
        }
        myRef.current = scrollpos;

    },[scrollpos]);

    const incrementSpeed = () => {
        if(speed===-2) setSpeed(1);     
        else setSpeed(prevspeed => prevspeed+1);
    }

    const decrementSpeed = () => {
        if(speed===1) setSpeed(-2);
        else setSpeed(prevspeed => prevspeed-1);
    }

    const handleScroll = () => {
        changeScrollpos(window.pageYOffset);
    }

    return(
        <div className="timer-screen">
            <div className="timer-clock">
                {counter}
            </div>
            <div className={"speed-dashboard"}>
                <p>Timer speed : { (speed>=1) ? (1000/speed)/1000 : Math.abs(speed)} second(s)</p>
                <div className={"btn-container"}>
                    <IncrementBtn changeSpeed={() => incrementSpeed()}/>
                    <DecrementBtn changeSpeed={() => decrementSpeed()}/>
                </div>
                <div>
                    Counter Reset Value : 
                    <input className="end-input" value={cutOff} type="text" onChange={(e) => changeCutoff(e.target.value)}/>
                </div>
                <ResetBtn changeSpeed={() => setCounter(0)}/>
            </div>
        </div>
    )

}

export default Timer;


// CONCEPTUAL POINTS : 

// *MOST IMPORTANT*
// 1. If we dont put a useEffect function for [counter] seperately then setInterval function will be called everytime we 
// update counter reset value and if we call onChange of counter reset in less than 1 sec than the setInterval will be cleared
// before it can push the callback in the callback queue, thus the counter value will remain constant(as setstate in callback
// of setInterval will not be called) untill we stop calling onChange of counter reset value.

// 2. If we put seperate useEffect for [counter] just like we have , the counter will be updated seperately and render the 
// component every 1 second and the onChange for counter reset value the component will be rendered one extra time seperately. 

// 3. Keeping counter and speed , both in useEffect is extremely important as , if someone scrolls up to a speed of 14sec 
// and immediately changes it to 0.5sec we want to clear the previous registered setInterval of 14sec and make a new interval
// of 0.5sec.

// 4. keeping useEffect seperate for scroll helps in not interfering or stopping other renders such as counter and speed