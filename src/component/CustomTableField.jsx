import "./css/CustomTableFiels.css"
import {useState} from "react";

const CustomTableField = () => {

    const [reserved, setReserved] = useState(false);
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        clicked ? setClicked(false) : setClicked(true);
    };

    const getBtnClass = reserved ? 'reserved-btn' : (clicked ? 'clicked-btn' : 'default-btn')

    return (
        <button className={getBtnClass} onClick={handleClick}>_</button>
    );
}

export default CustomTableField;