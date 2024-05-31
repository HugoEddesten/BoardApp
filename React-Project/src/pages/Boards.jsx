import { useEffect, useRef, useState } from "react"
import Sidebar from "../components/Sidebar"
import Board from "../components/Board"

function Boards() {

    const [boards, setBoards] = useState([])
    const workspace = useRef()
    const [board, setBoard] = useState({})
    const [addState, setAddState] = useState(false);
    const [mouseDown, setMouseDown] = useState(false)

    useEffect(() => {
        if (addState) {
            setMouseDown(true)
        }
        if (!addState && mouseDown && board.startX != undefined && board.startY != undefined && board.endX != undefined && board.endY != undefined) {
            let boardObject = {startX: board.startX, startY: board.startY, endX: board.endX, endY: board.endY}
            if (board.startX-board.endX < 50 || board.startY-board.endY < 50) {
                setBoard({})
                setAddState(false)  
                setMouseDown(false) 
            }
            setBoards([...boards, boardObject])   
            setBoard({})
            setAddState(false)  
            setMouseDown(false) 
            
        }
        
    }, [board, boards])  

    return (
        <section className='boards'>
            <div className="sidebar-component">
                <Sidebar handleAddBoard={setAddState}/>
            </div>
            <div className='wrapper'>
                <div className="workspace" ref={workspace} onMouseMove={mouseDown ? (e) => setBoard({startX: board.startX, startY: board.startY, endX: e.clientX, endY: e.clientY}) : console.log('mouseDown: false')} onMouseDown={(e) => addState ? setBoard({startX: e.clientX, startY: e.clientY}) : console.log('addState: false')} onMouseUp={() => addState ? setAddState(false) : console.log('addState: false')}>
                    {boards.map((board, index) => {
                        return (
                            <Board key={index} startX={board.startX} startY={board.startY} endX={board.endX} endY={board.endY} title={board.title}/>
                        )
                    })}
                    {mouseDown 
                    ? <Board key={board} startX={board.startX} startY={board.startY} endX={board.endX} endY={board.endY} /> 
                    : null
                    }
                    
                       

                    
                    
                </div>
            </div>  
        </section>
    )            
}

export default Boards