import React from 'react'
import { useState } from 'react/cjs/react.development'
import './start.scss'
import useSound  from 'use-sound'

import letsplay from '../assets/sound/letsplay.mp3'


function Start(props) {
    const handleSubmitName = () =>{
        if (holdName){
            letsPlaySound()
        }
        // holdName ? letsPlaySound() : null
    }

    const [letsPlaySound] = useSound(letsplay)

    const {propuserName, propsetuserName} = props
    //When we hit submit, we take the value held in '''holdName and set it to the propsetuserName in the root app
    const [holdName, setholdName] = useState(null)
    //we use the above to hold the name while changing the value
    return (
        <div className="start">
            <div className="middleInput">
                <p>{'Value: '}{propuserName}</p>
                <input placeholder="Please Enter Your Name" onChange={(event)=>setholdName(event.target.value)} />
                <div className="startButton" onClick={(event)=>{propsetuserName(holdName);handleSubmitName()}} > Start </div>
            </div>
        </div>
    )
}

export default Start
