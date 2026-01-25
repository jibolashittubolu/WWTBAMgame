import React, {useState, useEffect} from 'react'

function Timer(props) {
    // if an option is clicked, i should get an additional 2 secs before it hits 0 and game over
    const [timer, settimer] = useState(5)
    const [timer2, settimer2] = useState(8)
    // the
    const [clicked, setClicked] = useState(true)
    const {propsetstop, propquestionNumber, propsetquestionNumber, propselectedAnswer, propsetselectedAnswer } = props

    useEffect(() => {
        // setClicked(!clicked)
        if (timer2 === 3){
            // suprisingly if the below if, else block are(the both ni o) not used, the timer would still set to 0 in the background i.e even when we move to a new question, the timer would set itself to 0 arbitrarily and a glitch occursf
            if(props.propselectedAnswer) {
            // //     // settimer(prev => prev + 2)
            // //     // return (a premature rather than the below)
            // //     // alternatively (increase the background timer by 2) for only once
            // //     // now how do we ensure this if block is not run for the second time
            }      
            else {
                props.propsetstop(true)
                props.propsetquestionNumber(1)
                // i.e if a selection is not made within five seconds
            }
            // props.propsetstop(true)
            // props.propsetquestionNumber(1)
        }
        const interval = setInterval(() => {
            settimer(current => current - 1)
            // settimer2(current => current - 1)
        }, 1000);
        const interval2 = setInterval(() => {
            // settimer(current => current - 1)
            settimer2(current => current - 1)
        }, 1000);
        return () => {
            clearInterval(interval)
            clearInterval(interval2)
        }
    }, [timer,timer2, props.propsetstop])

    useEffect(() => {
        settimer(5)
        settimer2(8)
        // return () => {
        // }
    }, [props.propquestionNumber])
    // the above effect allows a timer to be reset to the values in the block - if the question number changes.

    return (
        <p>{timer2 > 3 ? timer : 0}</p>
        // we use the above other than a raw timer(like the below) to prevent displaying negative values for 'timer' since we always rely on timer2. Hence timer 2 is the original logic and timer 1 is merely for display. 
        // <p>{timer}</p>
    )
}

export default Timer
