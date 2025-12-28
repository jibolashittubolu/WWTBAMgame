import React, {useState, useMemo, useEffect} from 'react';
import logo from './logo.svg'
import './app.scss' 

import Trivia from './components/Trivia';
// import { useState, useMemo } from 'react/cjs/react.development';
import Timer from './components/Timer';
import Start from './components/Start';
import useSound  from 'use-sound'

import commercialbreak from './assets/sound/commercialbreak.mp3'
import wronganswer from './assets/sound/wronganswer.mp3'
import correctanswer from './assets/sound/correctanswer.mp3'
import letsplay from './assets/sound/letsplay.mp3'

function App(props) {
  const [userName, setuserName] = useState(null)
  const [userNames, setuserNames] = useState(null)
  const [questionNumber, setquestionNumber] = React.useState(1)
  // const []
  
  const [stop, setstop] = React.useState(false)
  const [earned, setearned] = React.useState('$ 0') 
  const [letsPlaySound] = useSound(letsplay)
  const [wrongAnswerSound] = useSound(wronganswer)
  const [dummyState, setdummyState] = React.useState(false)

  const [selectedAnswer, setselectedAnswer]  = useState(null)

  // if (stop === true){
    
  // }

  const moneyPyramid = useMemo(() =>  
  {
    [ 
      {'id':12, 'amount':200000000000},
      {'id':11, 'amount':520000000000},
      {'id':10, 'amount':20000000000},
      {'id':9, 'amount':1200000000},
      {'id':8, 'amount':120000000},
      {'id':7, 'amount':10000000},
      {'id':6, 'amount':2500000},
      {'id':5, 'amount':200000},
      {'id':4, 'amount':12000},
      {'id':3, 'amount':1200},
      {'id':2, 'amount':500},
      {'id':1, 'amount':10}
    ].reverse();
  }, [])

  const pyramid_list = [
    {'id':12, 'amount':200000000000},
    {'id':11, 'amount':520000000000},
    {'id':10, 'amount':20000000000},
    {'id':9, 'amount':1200000000},
    {'id':8, 'amount':120000000},
    {'id':7, 'amount':10000000},
    {'id':6, 'amount':2500000},
    {'id':5, 'amount':200000},
    {'id':4, 'amount':12000},
    {'id':3, 'amount':1200},
    {'id':2, 'amount':500},
    {'id':1, 'amount':10},
  ]

  const pyramid_map = pyramid_list.map((item) =>(
      <li 
      key={item.id} 
      className={questionNumber === item.id 
      ? "pyramidListItem active" : "pyramidListItem"} 
      // onClick={()=> setquestionNumber(item.id)}
      >
        <span className="pyramidListItemId">{item.id}</span>
        <span className="pyramidListItemAmount">{'$ '}{item.amount}</span>
      </li>
  ))

  return (
    <div className="App" >
      {userName ? 
      //if we have a username render the regular below
      (
      <div className="mainApp">
      {stop === true ? wrongAnswerSound() : null}
      {/* the above line is to ensure that a sound plays if the refresh button is used or no interaction is made and the timer runs out */}
      {
        stop ?
        // if stop is true
        // game over component renders
        (<div className='gameOver'>
          <h2>Game Over</h2> 
          <h1>You earned {earned} </h1> 
          <div className = "twoButtons">
            <div className="buttonItem" onClick = { ()=> {setstop(false); letsPlaySound(); setselectedAnswer(null)} }>Restart</div>
            {/* we must set selectedAnswer to null before restarting else we experience a glitch. Why? Because the main states that reflect the initial state of the game are '''stop and '''selected answer */}
            <div className="buttonItem" onClick = { ()=> {setstop(false);letsPlaySound();setuserName(null)} }>Close</div>
          </div>
        </div>)
        //game over component ends
        :
        // else
        //normal question begins
        (<>
          <div className="top">
            <p>{userName}</p>
            <div className="timer">
              <Timer
                propsetstop = {setstop}
                propquestionNumber = {questionNumber}
                propsetquestionNumber = {setquestionNumber}
                propselectedAnswer = {selectedAnswer}
                propsetselectedAnswer = {setselectedAnswer} 
              />
            </div>
          </div>
          <div className="bottom">
            <Trivia
            propquestionNumber = {questionNumber} 
            propsetquestionNumber={setquestionNumber}
            propstop = {stop}
            propsetstop = {setstop}
            proppyramid_list = {pyramid_list}
            propearned = {earned}
            propsetearned = {setearned} 
            propselectedAnswer = {selectedAnswer}
            propsetselectedAnswer = {setselectedAnswer}  
            />  
          </div>
        </>)
        }
      </div>
       )
       :
      //else if we dont have a username, render the below
       <Start 
       propuserName = {userName}
       propsetuserName={setuserName}  
       /> 
       }

      <div className="pyramid">
        {pyramid_map}
      </div>
    </div>
  );
}

export default App;
