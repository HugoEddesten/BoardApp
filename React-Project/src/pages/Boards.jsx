import { useEffect, useRef, useState } from "react"
import Sidebar from "../components/Sidebar"
import Board from "../components/Board"

function Boards() {

    const [boards, setBoards] = useState([])
    const workspace = useRef()
    const [currentBoard, setCurrentBoard] = useState({})
    const [addState, setAddState] = useState(false);
    const [mouseDown, setMouseDown] = useState(false)

    const reload = () => {
        fetchData()
    }

    const addBoard = async (board) => {
        try {
            await fetch("http://localhost:7279/api/boards", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(board)
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
            
        try {
            
            const fetchedBoards = await fetch("http://localhost:7279/api/boards").then((response) => response.json())
            
            setBoards(fetchedBoards)
            console.log(fetchedBoards)
        } catch (error) {
            console.log(error)
        }
    } 

    const handleMouseDown = (e) => {
        setMouseDown(true)
        setCurrentBoard({startX: e.clientX, startY: e.clientY})
    }

    const handleMouseMove = (e) => {
        setCurrentBoard({startX: currentBoard.startX, startY: currentBoard.startY, endX: e.clientX, endY: e.clientY})
    }

    const handleMouseUp = async () => {
        let boardObject = {startX: currentBoard.startX, startY: currentBoard.startY, endX: currentBoard.endX, endY: currentBoard.endY}
        setCurrentBoard({})
        setAddState(false)
        setMouseDown(false)
        await addBoard(boardObject)
        reload()
    }

    return (
        <section className='boards'>
            <div className="sidebar-component">
                <Sidebar handleAddBoard={setAddState}/>
            </div>
            <div className='wrapper'>
                <div className="workspace" ref={workspace} 
                onMouseDown={(e) => addState ? handleMouseDown(e) : null} 
                onMouseMove={mouseDown ? (e) => handleMouseMove(e): null} 
                onMouseUp={() => addState ? handleMouseUp() : null}>
                    {boards.map((board, index) => {
                        
                        return (
                            <Board key={index} id={board.id} startX={board.startX} startY={board.startY} endX={board.endX} endY={board.endY} title={board.title} reloadHandler={reload}/>
                        )
                    })}
                    {mouseDown 
                    ? <Board key={currentBoard} startX={currentBoard.startX} startY={currentBoard.startY} endX={currentBoard.endX} endY={currentBoard.endY} reloadHandler={reload} /> 
                    : null
                    }
                    
                       

                    
                    
                </div>
            </div>  
        </section>
    )            
}

export default Boards