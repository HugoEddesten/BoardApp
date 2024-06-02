import { useEffect, useRef, useState } from "react"


const Board = ({ id, startX, startY, endX, endY, title, reloadHandler}) => {
    const board = useRef()
    const [titleValue, setTitleValue] = useState('')


    useEffect(() => {
        
    })

    const httpPutChanges = async () => {
        try {
            await fetch("http://localhost:7279/api/boards", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id,
                    "title": titleValue,
                    "startX": startX,
                    "startY": startY,
                    "endX": endX,
                    "endY": endY,
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const submitTitle = () => {
        console.log(titleValue)
        console.log(id)
        httpPutChanges()
        reloadHandler()

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
                        <input onChange={(e) => setTitleValue(e.target.value)} className="title-input" placeholder="Name your board!"/>
                        <button onClick={submitTitle}>+</button>
                    </div>
                    
            }


        </div>
    )
}   

export default Board