import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import './Frontofhouse.css';

function Frontofhouse({ inputDisplay, collectTipsRef }) {
    const [tipsList, setTipsList] = useState(() => {
        try {
            const savedTips = localStorage.getItem('tipsList');
            return savedTips ? JSON.parse(savedTips) : [];
        } catch (error) {
            console.log('Local Storage is not available');
            return [];
        }
    });

    const [totalPartTimeHours, setTotalPartTimeHours] = useState('');
    const [totalFullTimeHours, setTotalFullTimeHours] = useState('');
    const [hoursWorked, setHoursWorked] = useState('');
    const [error, setError] = useState(null);
    const [bohIncluded, setBohIncluded] = useState('');


    /* Saving tips to local storage */

    useEffect(() => {
        try {
            localStorage.setItem('tipsList', JSON.stringify(tipsList));
        } catch (error) {
            console.log('Local Storage is not available');
        }
    }, [tipsList])

    /* BoH Included Section, will take 15% off input display */ 

    const boh = (event) => {
        setBohIncluded(event.target.value);
    };

    /* Part-Time hours and Full-Time hours for Front of House employees */

    const partTimeHours = (event) => {
        setTotalPartTimeHours(parseInt(event.target.value) * 5.5);
    }

    const fullTimeHours = (event) => {
    setTotalFullTimeHours(parseInt(event.target.value) * 8);
    }

    const totalHours = totalFullTimeHours + totalPartTimeHours;

    /* Employees Hours */

    const newHours = (event) => {
        setHoursWorked(parseFloat(event.target.value));
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
     * - If BoH included: Use 85% of total tips (15% goes to BoH)
     * - If BoH not included: Use 100% of total tips
     * - Formula: (tip amount × percentage) ÷ total hours × individual hours
     */

    const collectTips = () => {
 
        /* Error handling */

        // Validate tip amount from calculator
        if (!inputDisplay || isNaN(parseFloat(inputDisplay)) || parseFloat(inputDisplay) <= 0){
            setError('Enter a valid tip amount.');
            setTimeout(() => setError(''), 1500);
            return;
        }
        
        // Validate Back of House selection
        if (!bohIncluded){
            setError('Select if Back of House is included.');
            setTimeout(() => setError(''), 1500);
            return;
        }
        // Validate employee hour calculations
        
        if (isNaN(totalFullTimeHours) || isNaN(totalPartTimeHours)) {
            setError('Enter a valid number of employees.');
            setTimeout(() => setError(''), 1500);
            return;
        }

        // Ensure at least one employee type has hours

        if (totalFullTimeHours <= 0 && totalPartTimeHours <= 0) {
            setError('Enter Full-time or Part-time Hours.');
            setTimeout(() => setError(''), 1500);
            return;
        }

        // Double-check total hours calculation

        if(totalHours <= 0 || isNaN(totalHours)){
            setError('Enter Full-time or Part-time Hours.');
            setTimeout(() => setError(''), 1500);
            return;
        }
        
        // Validate individual hours worked

        if(!hoursWorked || isNaN(hoursWorked) || hoursWorked <= 0){
            setError('Enter Hours Worked.');
            setTimeout(() => setError(''), 1500);
            return;
        }

        /* Tip Calculation */

        let updatedTips;

            if (bohIncluded === 'yes') {
                updatedTips = ((parseFloat(inputDisplay) * .85) / totalHours) * hoursWorked;
            } else {
                updatedTips = (parseFloat(inputDisplay) / totalHours) * hoursWorked;
            }

        setTipsList(tipsList => [...tipsList, updatedTips]) 
        };

        /**
         * Effect to expose collectTips function for keyboard shortcuts
         * Allows Enter key to trigger tip collection from parent component
         */

        useEffect(() => {
         if (collectTipsRef) {
            collectTipsRef.foh = collectTips;
         }
        });

        /* Deleting tip off of the tip list */

    const deleteTips = (index) => {
        setTipsList(tipsList.filter((tip, currentIndex) => currentIndex !== index));
    }

    /* Delete all tips from the tips list */ 

    const deleteAll = () => {
        setTipsList([]);
    }


    return (
        <div className="requirements-container">
            <div>
             {/* Component header */}
                <h2 className="foh">Front of House</h2>

             {/* Back of House inclusion form */}
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="radio-group">
                    <label className="backOfHouse">Back of House Included?</label>
                    <div className="radio-options">
                        <label>
                            <input type="radio" value='yes' checked={bohIncluded === 'yes'} onChange={boh}/>
                            Yes
                        </label>
                        <label>
                            <input type="radio" value='no' checked={bohIncluded === 'no'} onChange={boh}/>
                            No
                        </label>
                    </div>
                </div>
            </form>
            {/* Employee count form */}
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="ftBudtenders">Full-Time Budtenders:</label>
                <input type="text" placeholder="Number of full-time employees" onChange={fullTimeHours}/>
                <label className="ptBudtenders">Part-Time Budtenders:</label>
                <input type="text" placeholder="Number of part-time employees" onChange={partTimeHours}/>
            </form>
            {/* Individual hours worked form */}
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="hoursWorked">Hours worked?</label>
                <input type="text" placeholder="Number of hours you worked" onChange={newHours}/>
            </form>
             {/* Error message display */}
            {error && 
            <div className="error">
                {error}
            </div>}
            {/* Tip calculation trigger button */}
            <button className="collectBtn" onClick={collectTips}>Collect Tips</button>
            </div>
            {/* Tips display section */}
            <div className="tipsList-container">
            {/* List of individual tip calculations */}
                <ul className="tipsList">
                    {tipsList.map((tip, index) => ( 
                        <li key={index} className="tips">
                            ${tip.toFixed(2)}
                        <button className="deleteTips" onClick={() => deleteTips(index)}><Trash2 /></button>
                        </li>
                    ))}
                </ul>
                    {/* Total tips calculation and display */}
                    <div className="tipsTotal">Tips: ${tipsList.reduce((sum, tip) => sum + tip, 0).toFixed(2)}</div>
                    {/* Conditional delete all button (only show if tips exist) */}
                     {tipsList.length > 0 && (
                        <button onClick={deleteAll} className="deleteAllBtn">Delete All</button>
                    )}
            </div>
        </div>
    )
}

export default Frontofhouse