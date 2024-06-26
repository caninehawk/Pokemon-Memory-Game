
import {useState} from 'react' 
import './Header.css'
function Header(props){
    return (
        <div className='header'>
            <h1>Memory Game!!</h1>
            <div className="buttons">
                <button className="start" onClick={props.startGame}>Start</button>
                <button className="reset" onClick={props.resetGame}>Reset</button>
            </div>
            <div className='scoreBoard'>
                <p> Score: {props.score}</p>
                <p> High:  {props.highScore}</p>
            </div>
        </div>
    )
}
export default Header