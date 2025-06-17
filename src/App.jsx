import Requirements from './Components/Requirements'
import './App.css'
import { useState } from 'react';

function App() {
  const [inputDisplay, setInputDisplay] = useState('');

  const numberDisplay = (event) => setInputDisplay(inputDisplay + event.target.value);


    const periodDisplay = (event) => {
        if(!inputDisplay.includes('.')){
            setInputDisplay(inputDisplay + event.target.value)};
    }


    const deleteDisplay = () => {
        setInputDisplay(inputDisplay.substring(0, inputDisplay.length - 1));
    }

    const clearDisplay = () => {
        setInputDisplay('');
    }

  return (
    <div className='container'>
        <div className="calculator-container">
                <input className="display" type="text" value={inputDisplay} disabled />
        <div className="btns-container">
                <button className="numberBtns" onClick={numberDisplay} value='1'>1</button>
                <button className="numberBtns" onClick={numberDisplay} value='2'>2</button>
                <button className="numberBtns" onClick={numberDisplay} value='3'>3</button>
                <button className="numberBtns" onClick={numberDisplay} value='4'>4</button>
                <button className="numberBtns" onClick={numberDisplay} value='5'>5</button>
                <button className="numberBtns" onClick={numberDisplay} value='6'>6</button>
                <button className="numberBtns" onClick={numberDisplay} value='7'>7</button>
                <button className="numberBtns" onClick={numberDisplay} value='8'>8</button>
                <button className="numberBtns" onClick={numberDisplay} value='9'>9</button>
                <button className="numberBtns" onClick={numberDisplay} value='0'>0</button>
                <button className="numberBtns" onClick={periodDisplay} value='.' >.</button>
                <button className="deleteDisplay" onClick={deleteDisplay}>Delete</button>
                <button className="clearDisplay" onClick={clearDisplay}>Clear</button>
            </div>
        </div>
      <Requirements inputDisplay={inputDisplay}></Requirements>
    </div>
  )
}

export default App
