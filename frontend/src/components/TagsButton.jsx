import {useState} from "react";

function TagsButton({sentFunc, sentValue}) {

    const [activeState, setActiveState] = useState(false);

    return (
        <>
            <button className={"btn " + (activeState ? "selected" : null)} 
            type="button" value={sentValue} 
            onClick={(e) => {sentFunc(); setActiveState(!activeState);}}>
                {sentValue.toUpperCase()}
            </button>
        </>
    )
}

export default TagsButton