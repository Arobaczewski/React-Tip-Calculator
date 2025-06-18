import Frontofhouse from './Components/Frontofhouse';
import Backofhouse from './Components/Backofhouse';
import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [inputDisplay, setInputDisplay] = useState('');
  const collectTipsRef = useRef(null);

  // Total Tip Display

  const numberDisplay = (event) => setInputDisplay(inputDisplay + event.target.value);


  // Period display. If period is already displayed, it will not display again.

    const periodDisplay = (event) => {
        if(!inputDisplay.includes('.')){
            setInputDisplay(inputDisplay + event.target.value)};
    }

    // Delete Tip display by one

    const deleteDisplay = () => {
        setInputDisplay(inputDisplay.substring(0, inputDisplay.length - 1));
    }

    // Clear Tip Display

    const clearDisplay = () => {
        setInputDisplay('');
    }

    /**
   * Effect hook to handle keyboard shortcuts
   * Supports:
   * - Number keys (0-9) for input
   * - Decimal point key
   * - Backspace for deletion
   * - Escape/Delete for clearing
   * - Enter for collecting tips (Front of House only)
   */

useEffect(() => {
    const handleKeyPress = (event) => {

      /* 
      * Focus on active elements
      * Will input keypress based on active element
      */

      const activeElement = document.activeElement;
      const isInputFocused = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
      

      // If input is focused, only handle Enter key for tip collection

      if (isInputFocused) {
        if (event.key === 'Enter' && collectTipsRef.current) {
          collectTipsRef.current();
        }
        return;
      }


      const key = event.key;
    
      // Handle number key presses (0-9)

      if (key >= '0' && key <= '9') {
        setInputDisplay(prev => prev + key);
      }

      // Handle decimal point (only if not already present)

      else if (key === '.' && !inputDisplay.includes('.')) {
        setInputDisplay(prev => prev + '.');
      }
      
     // Handle backspace (delete last character)


      else if (key === 'Backspace'){
        setInputDisplay(prev => prev.substring(0, prev.length - 1));
      }

      // Handle escape or delete (clear display)


      else if (key === 'Escape' || key === 'Delete'){
        setInputDisplay('');
      } 

      // Handle enter (collect tips for Front of House)


      else if (key === 'Enter' && collectTipsRef.foh){
        collectTipsRef.foh();
      }
    };

    // Add event listener for keydown events


    window.addEventListener('keydown', handleKeyPress);


    // Cleanup: remove event listener when component unmounts


    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [inputDisplay])

  return (
    <div className='container'>
              {/* Calculator Section */}
        <div className="calculator-container">
        {/* Display showing current input value (disabled to prevent direct editing) */}
                <input className="display" type="text" value={inputDisplay} disabled />
        <div className="btns-container">
                 {/* Number pad buttons (1-9) */}
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
      <div>
      {/* Front of House tip calculation component */}
      <Frontofhouse inputDisplay={inputDisplay}></Frontofhouse>
      </div>
      <div>
      {/* Back of House tip calculation component */}
      <Backofhouse inputDisplay={inputDisplay}></Backofhouse>
      </div>
    </div>
  )
}

export default App
