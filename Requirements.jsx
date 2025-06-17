import { useState } from "react";
import { Trash2 } from "lucide-react";
import './Requirements.css';

function Requirements({ inputDisplay }) {
    const [tipsList, setTipsList] = useState([]);
    const [totalPartTimeHours, setTotalPartTimeHours] = useState('');
    const [totalFullTimeHours, setTotalFullTimeHours] = useState('');
    const [hoursWorked, setHoursWorked] = useState('');
    const [error, setError] = useState(null);
    const [bohIncluded, setBohIncluded] = useState('');

    const boh = (event) => {
        setBohIncluded(event.target.value);
    };

    const partTimeHours = (event) => {
        setTotalPartTimeHours(parseInt(event.target.value) * 5.5);
    }

    const fullTimeHours = (event) => {
    setTotalFullTimeHours(parseInt(event.target.value) * 8);
    }

    const totalHours = totalFullTimeHours + totalPartTimeHours;

    const newHours = (event) => {
        setHoursWorked(parseFloat(event.target.value));
    }

    const collectTips = () => {
        if (!inputDisplay || isNaN(parseFloat(inputDisplay)) || parseFloat(inputDisplay) <= 0){
            setError('Enter a valid tip amount.');
            setTimeout(() => setError(''), 1500);
            return;
        }
        if (!bohIncluded){
            setError('Select BoH.');
            setTimeout(() => setError(''), 1500);
            return;
        }
        if (isNaN(totalFullTimeHours) || isNaN(totalPartTimeHours)) {
            setError('Enter a valid number of employees.');
            setTimeout(() => setError(''), 1500);
            return;
        }
        if (totalFullTimeHours <= 0 && totalPartTimeHours <= 0) {
            setError('Enter Full-time or Part-time Hours.');
            setTimeout(() => setError(''), 1500);
            return;
        }
        if(totalHours <= 0 || isNaN(totalHours)){
            setError('Enter Full-time or Part-time Hours.');
            setTimeout(() => setError(''), 1500);
            return;
        }
        if(!hoursWorked || isNaN(hoursWorked) || hoursWorked <= 0){
            setError('Enter Hours Worked.');
            setTimeout(() => setError(''), 1500);
            return;
        }

        let updatedTips;

            if (bohIncluded === 'yes') {
                updatedTips = ((parseFloat(inputDisplay) * .85) / totalHours) * hoursWorked;
            } else {
                updatedTips = (parseFloat(inputDisplay) / totalHours) * hoursWorked;
            }

        setTipsList(tipsList => [...tipsList, updatedTips]) 
        }

    
    const deleteTips = (index) => {
        setTipsList(tipsList.filter((tip, currentIndex) => currentIndex !== index));
    }
    const deleteAll = () => {
        setTipsList([]);
    }


    return (
        <div className="requirements-container">
            <div>
            <form>
                <div>
                    <label className="backOfHouse">Back of House Included?</label>
                    <br></br>
                        <input type="radio" value='yes' checked={bohIncluded === 'yes'} onChange={boh}/>
                        <br></br>
                    <label>Yes</label>
                    <br></br>
                        <input type="radio" value='no' checked={bohIncluded === 'no'} onChange={boh}/>
                        <br></br>
                    <label>No</label>
                </div>
            </form>
            <form>
                <label className="ftBudtenders">Full-Time Budtenders:</label>
                <br></br>
                <input type="text" placeholder="Number of full-time employees" onChange={fullTimeHours}/>
                <br></br>
                <label className="ptBudtenders">Part-Time Budtenders:</label>
                <br></br>
                <input type="text" placeholder="Number of part-time employees" onChange={partTimeHours}/>
            </form>
            <form>
                <label className="hoursWorked">Hours worked?</label>
                <br></br>
                <input type="text" placeholder="Number of hours you worked" onChange={newHours}/>
            </form>
            {error && 
            <div className="error">
                {error}
            </div>}
            <button className="collectBtn" onClick={collectTips}>Collect Tips</button>
            </div>
            <div className="tipsList-container">
                <ul className="tipsList">
                    {tipsList.map((tip, index) => ( 
                        <li key={index} className="tips">
                            ${tip.toFixed(2)}
                        <button className="deleteTips" onClick={() => deleteTips(index)}><Trash2 /></button>
                        </li>
                    ))}
                    <button onClick={deleteAll} className="deleteAllBtn">Delete All</button>
                </ul>
                <span className="tipsTotal">Tips: ${tipsList.reduce((sum, tip) => sum + tip, 0).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default Requirements