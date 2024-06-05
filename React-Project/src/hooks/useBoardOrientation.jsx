import { useEffect, useState } from "react"

const useBoardOrientation = ({id, title, x, y, width, height, workspace}) => {
    const [boardOrientation, setBoardOrientation] = useState({'x': x, 'y': y, 'width': width, 'height': height})
    const [mouseData, setMouseData] = useState({'initX': null, 'initY': null, 'prevX': null, 'prevY': null})  
    const [isDragging, setIsDragging] = useState(false)
    const [isResizing, setIsResizing] = useState(false)
    
    

    const startDrag = (e) => {
        setMouseData({'initX': e.clientX, 'initY': e.clientY, 'prevX': e.clientX, 'prevY': e.clientY})
        setIsDragging(true)
    }

    const startResize = (e) => {
        setMouseData({'initX': e.clientX, 'initY': e.clientY, 'prevX': e.clientX, 'prevY': e.clientY})
        setIsResizing(true)
    }



    const handleMouseMove = (e) => {
        if (isDragging) {
            setBoardOrientation({...boardOrientation, 'x': boardOrientation.x + e.clientX - mouseData.prevX, 'y': boardOrientation.y + e.clientY - mouseData.prevY})
            console.log(boardOrientation)
            setMouseData({...mouseData, 'prevX': e.clientX, 'prevY': e.clientY})
        }
        if (isResizing) {
            setBoardOrientation({...boardOrientation, 'width': boardOrientation.width + e.clientX - mouseData.prevX, 'height': boardOrientation.height + e.clientY - mouseData.prevY})
        }
    }

    const httpPutChanges = async () => {
        try {
            await fetch("http://localhost:7279/api/boards", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id,
                    "title": title, // Ändra backend så att den inte updateraar alla utan bara de som inte är null
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

    const handleMouseUp = async () => {
        console.log(boardOrientation)
        await httpPutChanges()

        setIsDragging(false);
        setIsResizing(false);
        setMouseData({'initX': null, 'initY': null, 'prevX': null, 'prevY': null})
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        };
        
        
    }, [isDragging, isResizing])

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mouseup', handleMouseUp);
            }
        }
    }, [boardOrientation])

    return {
        boardOrientation,
        setBoardOrientation,
        startDrag,
        startResize,
      }
}

export default useBoardOrientation;