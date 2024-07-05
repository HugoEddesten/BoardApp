import { useEffect, useRef, useState } from "react"
import Sidebar from "../components/Sidebar"
import Board from "../components/Board"
import TempBoard from "../components/TempBoard"
import useOrientation from "../hooks/useOrientation"
import useHttp from "../hooks/useHttp"
import SnappingLine from "../components/SnappingLine"

function Boards() {
    const workspace = useRef()
    const [addBoardState, setAddBoardState] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)
    
    const boards = useOrientation({ workspace, snappingDistance: 15, minWidth: 300, minHeight: 300, snapping: true})
    const tempBoard = useOrientation({ workspace, minCompletedWidth: 300, minCompletedHeight: 300, snapping: false})


    const http = useHttp("http://localhost:7279/api/boards")

    const reload = () => {
        fetchItems()
    }   

    const fetchItems = async () => {
        const data = await http.GET(boards.setItems)
        console.log(data)
    }

    useEffect(() => {
        fetchItems()
    }, [])      

    useEffect(() => {
        if (boards.finishedItem != null) {
            http.PUT(boards.finishedItem)
        }
    }, [boards.finishedItem])


    const startAddBoard = () => {
        setAddBoardState(true)
    }

    useEffect(() => {
        const handlefinishedItem = async () => {
            if (tempBoard.finishedItem != null) {
                setAddBoardState(false)
                setMouseDown(false)
                await http.POST(tempBoard.finishedItem)
                reload()
            }
        }
        handlefinishedItem()
    }, [tempBoard.finishedItem])
    
    useEffect(() => {
        if (addBoardState) {
            document.addEventListener('mousedown', onMouseDown)
            return () => {
                document.removeEventListener('mousedown', onMouseDown)
            }
        }
    }, [addBoardState])

    const onMouseDown = (e) => {
        if (!workspace.current.contains(e.target) || e.button == 2) {
            setAddBoardState(false)
            setMouseDown(false)
        } else {
            setMouseDown(true)
            tempBoard.startResize(e, 0)
        }
    }

    return (
        <section className='boards'>
            <div className="sidebar-component">
                <Sidebar handleAddBoard={startAddBoard}/>
            </div>
            <div className='wrapper'>
                <div className={addBoardState ? 'workspace active' : 'workspace'} ref={workspace} 
                    onMouseDown={addBoardState ? onMouseDown : null}>
                    {boards.items.map((board) => {
                        return (
                            <Board key={board.id} board={{'id': board.id, 'title': board.title, 'textBoxes': board.textBoxes, 'x': board.x, 'y': board.y, 'width': board.width, 'height': board.height}} reloadHandler={reload} workspace={workspace} startDrag={boards.startDrag} startResize={boards.startResize} http={http}/>
                        )
                    })}
                    {addBoardState && mouseDown
                        ? <TempBoard x={tempBoard.currentItem.x} y={tempBoard.currentItem.y} width={tempBoard.currentItem.width} height={tempBoard.currentItem.height}/> 
                        : null
                    }
                    {boards.nearbySnappingLines.x.length > 0 ? boards.nearbySnappingLines.x.map((line, index) => {
                        return (
                            <SnappingLine key={index} workspace={workspace.current} x={line}/>
                        )
                    }) : null}
                
                    {boards.nearbySnappingLines.y.length > 0 ? boards.nearbySnappingLines.y.map((line, index) => {
                        return (
                            <SnappingLine key={index} workspace={workspace.current} y={line}/>
                        )
                    }) : null}
                </div>
            </div>  
        </section>
    )            
}

export default Boards