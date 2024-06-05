import { useEffect, useRef, useState } from "react"
import Sidebar from "../components/Sidebar"
import Board from "../components/Board"
import TempBoard from "../components/TempBoard"

function Boards() {

    const [boards, setBoards] = useState([])
    const workspace = useRef()
    const [currentBoard, setCurrentBoard] = useState({})
    const [addState, setAddState] = useState(false)
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
        setCurrentBoard({'x': e.clientX, 'y': e.clientY})
    }

    const handleMouseMove = (e) => {
        setCurrentBoard({...currentBoard, 'width': currentBoard.width - e.clientX, 'height': currentBoard - e.clientY})
    }

    const handleMouseUp = async () => {
        let boardObject = {'x': currentBoard.x, 'y': currentBoard.y, 'width': currentBoard.width, 'height': currentBoard.height}
        setCurrentBoard({})
        setAddState(false)
        setMouseDown(false)
        await addBoard(boardObject)
        reload()
    }

    const startAddBoard = () => {
        setAddState(true)
    }
    
    const onMouseDown = (e) => {
        
        if (!workspace.current.contains(e.target)) {
            setAddState(false)
        }
    }

    useEffect(() => {
        if (addState) {
            document.addEventListener('mousedown', onMouseDown)
            return () => {
                document.removeEventListener('mousedown', onMouseDown)
            }
        }
        
    }, [addState])

    return (
        <section className='boards'>
            <div className="sidebar-component">
                <Sidebar handleAddBoard={startAddBoard}/>
            </div>
            <div className='wrapper'>
                <div className={addState ? 'workspace active' : 'workspace'} ref={workspace} 
                onMouseDown={(e) => addState ? handleMouseDown(e) : null} 
                onMouseMove={mouseDown ? (e) => handleMouseMove(e): null} 
                onMouseUp={() => addState ? handleMouseUp() : null}>
                    {boards.map((board) => {
                        return (
                            <Board key={board.id} id={board.id} x={board.x} y={board.y} width={board.width} height={board.height} title={board.title} reloadHandler={reload} workspace={workspace}/>
                        )
                    })}
                    {mouseDown 
                    
                    ? <TempBoard x={currentBoard.x} y={currentBoard.y} width={currentBoard.width} height={currentBoard.height}/> 
                    : null
                    }
                    
                       

                    
                    
                </div>
            </div>  
        </section>
    )            
}

export default Boards