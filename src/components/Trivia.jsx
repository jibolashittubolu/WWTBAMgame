import React, { useEffect, useState } from 'react'
import './trivia.scss'
import useSound  from 'use-sound'

import correctanswer from '../assets/sound/correctanswer.mp3'
import wronganswer from '../assets/sound/wronganswer.mp3'

function Trivia(props) {
    const data = [
        {
            id:1, 
            question:"Rolex is a company that specializes in what type of product?",
            answers:[
                {
                    text:"Phone",
                    correct:false,
                },
                {
                    text:"Watches",
                    correct:true,
                },
                {
                    text:"Vehicles",
                    correct:false,
                },
                {
                    text:"Food",
                    correct:false,
                }
            ]
        },
        {
            id:2, 
            question:"3 + 2 = ?",
            answers:[
                {
                    text:"6",
                    correct:false,
                },
                {
                    text:"4",
                    correct:false,
                },
                {
                    text:"5",
                    correct:true,
                },
                {
                    text:"12",
                    correct:false,
                }
            ]
        },        {
            id:3, 
            question:"Which is a noun?",
            answers:[
                {
                    text:"funny",
                    correct:false,
                },
                {
                    text:"fruity",
                    correct:false,
                },
                {
                    text:"orange",
                    correct:true,
                },
                {
                    text:"sad",
                    correct:false,
                }
            ]
        },
        {
            id:4, 
            question:"What year did Nigeria gain independence ?",
            answers:[
                {
                    text:"1963",
                    correct:false,
                },
                {
                    text:"1970",
                    correct:false,
                },
                {
                    text:"1960",
                    correct:true,
                },
                {
                    text:"1965",
                    correct:false,
                }
            ]
        },    
    ]

    const [timeout, settimeout] = React.useState(null)
    const {propquestionNumber, propsetquestionNumber, propsetstop, propearned,proppyramid_list, propstop, propselectedAnswer, propsetselectedAnswer} = props

    const [question, setquestion]  = useState(null)
    // const [selectedAnswer, setselectedAnswer]  = useState(null)
    const [className, setclassName] = useState("answer active")
    const [pointerEvent, setpointerEvent] = React.useState(false)
    //the above state is used to prevent additional input

  const [correctAnswerSound] = useSound(correctanswer)
  const [wrongAnswerSound] = useSound(wronganswer)

    useEffect(() => {
        setquestion(data[props.propquestionNumber - 1])
        //We collect the question number from the parent and set the question using question state and array index
        return () => {
            // cleanup
        }
    }, [data, props.propquestionNumber])

    function delay(duration, callback){
        const timeout = setTimeout(() => {
            callback()
        }, duration);
        // return clearTimeout(timeout)
    }

    function handleClick(answer){
        setpointerEvent(true)
        //the above prevents additional clicks once a button/option is clicked or chosen
        props.propsetselectedAnswer(answer)
        setclassName("answer active")
        delay(1000, 
            () => setclassName(answer.correct ? 'answer correct' : 'answer wrong')
        )
        //after the classname is set to 'answer correct' , the animation for answer correct is invoked in the css and the animation length is run for 1secs as specified in the css file
        //after the 1s above + the 1s = 2s for the animation 'answer correct', the below 
        delay(2000, 
            () => {
                // correct()
                setpointerEvent(false)
                //this above releases the pointer after the animation is completed in 2s no matter whether correct or wrong option is picked
                if (answer.correct){
                    correctAnswerSound()
                    props.propsetquestionNumber((prev) => prev + 1 )
                    props.propsetearned(props.proppyramid_list[props.proppyramid_list.length - props.propquestionNumber].amount)
                    //the above uses backward list indexing. As the question number increases, so does the earned state updates accordingly
                    props.propsetselectedAnswer(null)
                } else {
                    wrongAnswerSound()
                    props.propsetearned( 
                        props.propquestionNumber > 1 ?
                        props.proppyramid_list[props.proppyramid_list.length + 1  - props.propquestionNumber].amount :
                        0
                    )
                    // The +1 and the >1 sign in the above ensures the previous amount is chosen if a wrong answer is supplied while the >1 ensures that a value is also provided for the first move, since the first move cannot be given an amount backwards since the list starts at $ 10 and a value less than 10 must be chosen which is unavailable in our list
                    props.propsetstop(true)
                    props.propsetquestionNumber(1)
                    //the above ensures the game starts afresh and begins at the bottom of the pyramid.
                }
            }
        )
    }


    return (
        <div className="trivia">
            <div className="question">{question ?.question}</div>
            <div className="answers">
                {question?.answers.map((answer) =>
                     <div 
                     style={{pointerEvents: pointerEvent ? 'none' : true }}
                     // the above style property in conjuction is used to 
                     className= {JSON.stringify(props.propselectedAnswer) === 
                     JSON.stringify(answer) ?
                     className : "answer"}
                     onClick = {() => handleClick(answer)} >
                        {answer.text}
                     </div>
                )}
            </div> 
        </div>
    )
}

export default Trivia
