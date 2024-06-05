import { useEffect, useRef, useState } from "react"
import useBoardOrientation from '../hooks/useBoardOrientation'

const Board = ({ id, x, y, width, height, title, reloadHandler, workspace}) => {
    const boardRef = useRef()
    const [titleValue, setTitleValue] = useState(title)
    const {boardOrientation, setBoardOrientation, startDrag, startResize} = useBoardOrientation({id, title, x, y, width, height, workspace})
    const [board, setBoard] = useState({'id': id, 'title': title})
    //const [moving, setMoving] = useState({'active': false, 'initX': null, 'initY': null, 'prevX': null, 'prevY': null})
    
    const httpPutChanges = async () => {
        try {
            await fetch("http://localhost:7279/api/boards", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id,
                    "title": titleValue, // Ändra backend så att den inte updateraar alla utan bara de som inte är null
                    "x": boardOrientation.x,
                    "y": boardOrientation.y,
                    "width": boardOrientation.width,
                    "height": boardOrientation.height,
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const submitTitle = async () => {
        await httpPutChanges()
        reloadHandler()
    }

    const deleteBoard = async() => {
        try {
            await fetch('http://localhost:7279/api/boards', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id
                })
            })
        } catch (error) {
            console.log(error)
        }
        reloadHandler()
    }
    /*
    const moveMouseDown = (e) => {
        setMoving({'active': true, 'initX': e.clientX, 'initY': e.clientY, 'prevX': e.clientX, 'prevY': e.clientY})
    }

    const moveMouseMoving = (e) => {
        setBoard({...board, 'x': board.x + e.clientX - moving.prevX, 'y': board.y + e.clientY - moving.prevY})
        setMoving({...moving, 'prevX': e.clientX, 'prevY': e.clientY})
    }

    const moveMouseUp = async (e) => {
        setMoving({...moving, active: false})
        if (moving.initX == e.clientX && moving.initY == e.clientY) {
            return
        }
        await httpPutChanges()
        reloadHandler()
        
        
    }
    */
    return (
        
        <div className="board" ref={boardRef} style={{
            top: boardOrientation.y+'px',
            left: boardOrientation.x+'px', 
            height: boardOrientation.height+'px',
            width: boardOrientation.width+'px'
            }}>
            
            <div className="board-header" onMouseDown={startDrag}> {/* onMouseMove={moving.active ? (e) => moveMouseMoving(e) : null} onMouseUp={moving.active ? (e) => moveMouseUp(e) : null}> */}
                {
                    title != null
                    ?
                        <h4 className="title">{title}</h4>
                    :
                        <div className="single-input">
                            <input onChange={(e) => setTitleValue(e.target.value)} className="title-input" placeholder="Name your board!"/>
                            <button onClick={submitTitle}>+</button>
                        </div>
                }
                <button className="btn remove" onClick={deleteBoard}>Remove</button>
            </div>
            
            <div className="resize" onMouseDown={startResize}></div>
        </div>
    )
}

export default Board