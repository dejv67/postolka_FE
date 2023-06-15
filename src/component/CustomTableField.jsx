import "./css/CustomTableFiels.css"
import {useEffect, useState} from "react";

const CustomTableField = (args) => {

    const [reserved, setReserved] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        args.isReserved ? setReserved(true) : setReserved(false);
        setClicked(false);
    }, [args]);

    const handleClick = () => {
        clicked ? setClicked(false) : setClicked(true);
    };


    const getBtnClass = reserved ? 'reserved-btn' : (clicked ? 'clicked-btn' : 'default-btn')

    return (
        <button className={getBtnClass} onClick={handleClick}>_</button>
    );
}

export default CustomTableField;