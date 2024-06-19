import { useEffect, useRef, useState } from "react"
import TextBox from "./TextBox"

const Board = ({ board, reloadHandler, workspace, startDrag, startResize, http}) => {
    const boardRef = useRef()
    const [titleValue, setTitleValue] = useState(board.title) 
    const [editState, setEditState] = useState(false)
    const titleRef = useRef()

    useEffect(() => {
        if (editState) {
            document.addEventListener('mousedown', toggleEditState)
            return () => {
                document.removeEventListener('mousedown', toggleEditState)
                
            }
        }   
    }, [editState])


    const submitTitle = async () => {
        await http.PUT({...board, 'title': titleValue})
        setEditState(false) 
        reloadHandler()
    }   

    const deleteBoard = async() => {
        await http.DELETE({'id': board.id})
        reloadHandler()
    }

    const toggleEditState = (e) => {
        if (!titleRef.current.contains(e.target)) {
            setEditState(!editState)    
            return
        }
        setEditState(true)
    }

    return (
        
        <div className="board" ref={boardRef} style={{
            top: board.y+'px',
            left: board.x+'px', 
            height: board.height+'px',
            width: board.width+'px'
            }}>
            
            <div className="board-header" onMouseDown={(e) => startDrag(e, board.id)}> 
                <div ref={titleRef}>
                {
                    board.title != null && !editState 
                    ?
                        <h6 className="title" onClick={(e) => toggleEditState(e)}>{board.title == "" ? "Name me" : board.title}</h6>
                    :   
                        <div className="single-input">
                            <input onChange={(e) => setTitleValue(e.target.value)} className="title-input" placeholder="Title" value={titleValue == null ? "" : titleValue}/>
                            <button onClick={() => submitTitle()}>+</button>
                        </div>  
                }
                </div>
                
                <button className="btn remove" onClick={deleteBoard}>Remove</button>
            </div>
            <div className="board-content">
                {board.textBoxes.map((textBox) => {
                    return (
                        <TextBox key={textBox.id} text={textBox.text}/>
                    )
                })}
            </div>

            <div className="resize" onMouseDown={(e) => startResize(e, board.id)}></div>
        </div>
    )
}

export default Board