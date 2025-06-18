import { useEffect, useState } from "react";
import {Trash2 } from 'lucide-react';
import './Backofhouse.css';

function BackofHouse({ inputDisplay }) {
    const [bohTipsList, setBohTipsList] = useState(() => {
        try {
            const bohSavedTips = localStorage.getItem('bohTipsList');
            return bohSavedTips ? JSON.parse(bohSavedTips) : [];
        } catch (error) {
            console.log('Local Storage is not avaailable');
            return [];
        }
    });
    const [bohHoursWorked, setBohHoursWorked] = useState('');
    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState('');

    // Save tips list to local storage

    useEffect(() => {
        try {
            localStorage.setItem('bohTipsList', JSON.stringify(bohTipsList));
        } catch (error) {
            console.log('Local Storage is not available');
        }
    }, [bohTipsList]);

    /* Employees Hours */

    const hours = (event) => {
        setBohHoursWorked(parseFloat(event.target.value));
    }
    
    // Total hours for Back of House Employees

    const bohEmployees = (event) => {
        setEmployees(parseFloat(event.target.value) * 8);
    }

        /**
     * Main tip calculation function with comprehensive validation
     * 
     * Validation checks:
     * - Valid tip amount from calculator
     * - Back of House selection made
     * - Valid employee counts entered
     * - At least one employee type has hours
     * - Individual hours worked entered
     * 
     * Calculation logic:
     * - Take 15% off of the total amount.
     * - Divide that amount by the total hours of the back of house employees
     * - Multiple the amount by the total hours the employee worked.
     * - Formula: (tip amount × percentage) ÷ Total Back of House Employee Hours × individual hours
     */

    const collectBohTips = () => {
        /* Error handling */

        // Validate tip amount from calculator

        if (!inputDisplay || isNaN(parseFloat(inputDisplay)) || parseFloat(inputDisplay) <= 0) {
            setError('Enter a valid tip amount');
            setTimeout(() => setError(''), 1500);
            return;
        }
        
        // Validate individual hours worked

        if(!bohHoursWorked || isNaN(bohHoursWorked) || bohHoursWorked <= 0){
            setError('Enter Hours Worked.');
            setTimeout(() => setError(''), 1500);
            return;
        }

        // Validate employee amount

        if(!employees || isNaN(employees) || employees <= 0){
            setError('Enter Employees.');
            setTimeout(() => setError(''), 1500);
            return;
        }

        /* Tip Calculation */

        let updatedTips;

        updatedTips = ((parseFloat(inputDisplay) * .15) / employees) * bohHoursWorked;

        setBohTipsList(bohTipsList => [...bohTipsList, updatedTips])
    };

    /* Deleting tip off of the tip list */

    const removeTips = (index) => {
        setBohTipsList(bohTipsList.filter((tip, currentIndex) => currentIndex !== index));
    }

    /* Delete all tips from the tips list */ 

    const removeAll = () => {
        setBohTipsList([]);
    }

    return (
        <div className="boh-container">
            <div>
                {/* Conditional delete all button (only show if tips exist) */}
                <h2 className="boh">Back of House</h2>

                {/* Employee information and hours form */}
                <form onSubmit={(e) => e.preventDefault()}>
                <label className="bohEmployees">Number of Back of House Employees: </label>
                <input type="text" placeholder="How many BoH employees worked today?" onChange={bohEmployees}/>
                <label className="bohHoursWorked">Hours Worked?</label>
                <input type="text" placeholder="Number of hours you worked" onChange={hours} />
                </form>
            </div>
            {/* Error message display */}
            {error && 
            <div className="error">
                {error}
                </div>}
            {/* Tip calculation trigger button */}
            <button className="bohCollectBtn" onClick={collectBohTips}>Collect Tips</button>
            {/* Back of House tips display section */}
            <div className="bohTipsList-container">
            {/* List of individual Back of House tip calculations */}
                <ul className="bohTipList">
                    {bohTipsList.map((tip, index) => (
                        <li key={index} className="bohTips">
                            ${tip.toFixed(2)}
                            <button className="removeTips" onClick={() => removeTips(index)}><Trash2/></button>
                        </li>
                    ))}
                </ul>
                {/* Total Back of House tips calculation and display */}
                <div className="bohTipsTotal">Tips: ${bohTipsList.reduce((sum, tip) => sum + tip, 0).toFixed(2)}</div>
                {/* Conditional delete all button (only show if tips exist) */}
                {bohTipsList.length > 0 && (
                    <button onClick={removeAll} className="removeAllBtn">Delete All</button>
                )}
            </div>
        </div>
    )
}

export default BackofHouse