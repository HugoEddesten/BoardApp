import { useEffect, useRef, useState } from "react"


const Board = ({ startX, startY, endX, endY, title}) => {
    const board = useRef()
    
    useEffect(() => {
        
    })

    const submit = (e) => {
        console.log(e)
    }


    return (
        <div className="board" ref={board} style={{
            top: startY+'px',                //endX > startX ? startY+'px' : endY+'px', 
            left: startX+'px',               //endY > startY ? startX+'px' : endX+'px', 
            height: endY-startY+'px',             //endY > startY ? endY-startY+'px' : startY-endY+'px', 
            width: endX-startX+'px'             //endX > startX ? endX-startX+'px' : startX-endX+'px'
            }}> 
            
            {
                title != null 
                ? <h4 className="title">{title}</h4>  
                : 
                    <div className="single-input">
                        <input className="title-input" placeholder="Name your board!"/>
                        <button>+</button>
                    </div>
                    
            }


        </div>
    )
}   

export default Board