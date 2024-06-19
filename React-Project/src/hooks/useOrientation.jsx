import { useEffect, useState } from "react"

const useOrientation = ({workspace, snappingDistance = 20, minWidth = 0, maxWidth = 0, minHeight = 0, maxHeight = 0, minCompletedWidth = 0, minCompletedHeight = 0, snapping = true}) => {
    const [items, setItems] = useState([])
    const [initialItem, setInitialItem] = useState()
    const [currentItem, setCurrentItem] = useState({})
    const [mouseData, setMouseData] = useState({'initX': null, 'initY': null, 'prevX': null, 'prevY': null})  
    const [finishedItem, setFinishedItem] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isResizing, setIsResizing] = useState(false)
    const [snappingLines, setSnappingLines] = useState({'x': [], 'y': []})
    const [nearbySnappingLines, setNearbySnappingLines] = useState({'x': [], 'y': []})
    const [snappingActive, setSnappingActive] = useState(snapping)

    useEffect(() => {
        if (snappingActive) {
            setSnappingLines({
                'x': 
                    [
                        workspace.current.offsetLeft + workspace.current.offsetWidth / 2,
                        
                        ...items.map((item) => {
                            if (item.id != currentItem.id) {
                                return item.x
                            }
                        }),
                        ...items.map((item) => {
                            if (item.id != currentItem.id) {
                                return item.x+(item.width/2)
                            }
                        }),
                        ...items.map((item) => {
                            if (item.id != currentItem.id) {
                                return item.x+item.width
                            }
                        })
                    ], 
                'y': 
                    [
                        workspace.current.offsetTop + workspace.current.offsetHeight / 2,
                        
                        ...items.map((item) => {
                            if (item.id != currentItem.id) {
                                return item.y
                            }
                        }),
                        ...items.map((item) => {
                            if (item.id != currentItem.id) {
                                return item.y+(item.height/2)
                            }
                        }),
                        ...items.map((item) => {
                            if (item.id != currentItem.id) {
                                return item.y+item.height
                            }
                        })
                    ]
                }
            )
        } else {
            setSnappingLines({'x': [], 'y': []})
        }
    }, [items, snappingActive])


    const startDrag = (e, id) => {
        if (items.length > 0) {
            const item = items.filter((item) => {
                return item.id == id
            })[0]
            setCurrentItem(item)
            setInitialItem(item)
        } else {
            setCurrentItem({'x': e.clientX, 'y': e.clientY, 'width': 0, 'height': 0})
        }
        setMouseData({'initX': e.clientX, 'initY': e.clientY, 'prevX': e.clientX, 'prevY': e.clientY})
        setIsDragging(true)
        
    }

    
    const startResize = (e, id) => {
        if (items.length > 0) {
            setCurrentItem(items.filter((item) => {
                return item.id == id
            })[0])
        } else {
            setCurrentItem({'x': e.clientX, 'y': e.clientY, 'width': 0, 'height': 0})
        }
        setMouseData({'initX': e.clientX, 'initY': e.clientY, 'prevX': e.clientX, 'prevY': e.clientY})
        setIsResizing(true)
    }

    const handleMouseMove = (e) => {
        const deltaX = e.clientX - mouseData.prevX
        const deltaY = e.clientY - mouseData.prevY

        const containerBounds = {
            left: workspace.current.offsetLeft,
            top: workspace.current.offsetTop,
            right: workspace.current.offsetLeft + workspace.current.offsetWidth,
            bottom: workspace.current.offsetTop + workspace.current.offsetHeight,
            centerX: workspace.current.offsetLeft + workspace.current.offsetWidth / 2,
            centerY: workspace.current.offsetTop + workspace.current.offsetHeight / 2,
        };   
        
        if (isDragging) {
            handleDragging(deltaX, deltaY, containerBounds, e);
        } 
        
        if (isResizing) {
            handleResizing(deltaX, deltaY, containerBounds, e);
        }
    }

    const handleDragging = (deltaX, deltaY, containerBounds, e) => {
        const newBoardX = currentItem.x + deltaX
        const newBoardY = currentItem.y + deltaY
    
        const withinHorizontalBounds = newBoardX > containerBounds.left && (newBoardX + currentItem.width) < containerBounds.right
        const withinVerticalBounds = newBoardY > containerBounds.top && (newBoardY + currentItem.height) < containerBounds.bottom
    
        let updatedOrientation = { ...currentItem }
        let updatedMouseData = { ...mouseData }
        
        const nearbyHorizontalSnappingLines = snappingLines.x.filter((line) => {
            return Math.abs(newBoardX - line) < snappingDistance ||
                   Math.abs(newBoardX + updatedOrientation.width / 2 - line) < snappingDistance ||
                   Math.abs(newBoardX + updatedOrientation.width - line) < snappingDistance;
        });
    
        const nearbyVerticalSnappingLines = snappingLines.y.filter((line) => {
            return Math.abs(newBoardY - line) < 25 ||
                   Math.abs(newBoardY + updatedOrientation.height / 2 - line) < snappingDistance ||
                   Math.abs(newBoardY + updatedOrientation.height - line) < snappingDistance;
        });
        setNearbySnappingLines({'x': nearbyHorizontalSnappingLines, 'y': nearbyVerticalSnappingLines})
        
        if (withinHorizontalBounds) {
            const activeHorizontalSnappingLine = snappingLines.x.filter((line) => {
                return Math.abs(newBoardX - line) < snappingDistance ||
                       Math.abs(newBoardX + updatedOrientation.width / 2 - line) < snappingDistance ||
                       Math.abs(newBoardX + updatedOrientation.width - line) < snappingDistance;
            })[0];
    
            if (activeHorizontalSnappingLine != null) {
                if (Math.abs(newBoardX - activeHorizontalSnappingLine) < snappingDistance) {
                    updatedOrientation.x = activeHorizontalSnappingLine;
                } else if (Math.abs(newBoardX + updatedOrientation.width / 2 - activeHorizontalSnappingLine) < snappingDistance) {
                    updatedOrientation.x = activeHorizontalSnappingLine - updatedOrientation.width / 2;
                } else if (Math.abs(newBoardX + updatedOrientation.width - activeHorizontalSnappingLine) < snappingDistance) {
                    updatedOrientation.x = activeHorizontalSnappingLine - updatedOrientation.width;
                }
            } else {
                updatedOrientation.x = newBoardX
                updatedMouseData.prevX = e.clientX
            }   
        }

        if (withinVerticalBounds) {
            const activeVerticalSnappingLine = snappingLines.y.filter((line) => {
                return Math.abs(newBoardY - line) < snappingDistance ||
                       Math.abs(newBoardY + updatedOrientation.height / 2 - line) < snappingDistance ||
                       Math.abs(newBoardY + updatedOrientation.height - line) < snappingDistance;
            })[0];
    
            if (activeVerticalSnappingLine != null) {
                if (Math.abs(newBoardY - activeVerticalSnappingLine) < snappingDistance) {
                    updatedOrientation.y = activeVerticalSnappingLine;
                } else if (Math.abs(newBoardY + updatedOrientation.height / 2 - activeVerticalSnappingLine) < snappingDistance) {
                    updatedOrientation.y = activeVerticalSnappingLine - updatedOrientation.height / 2;
                } else if (Math.abs(newBoardY + updatedOrientation.height - activeVerticalSnappingLine) < snappingDistance) {
                    updatedOrientation.y = activeVerticalSnappingLine - updatedOrientation.height;
                }
            } else {
                updatedOrientation.y = newBoardY
                updatedMouseData.prevY = e.clientY
            }
        }
        

        setMouseData({...mouseData, 'prevX': updatedMouseData.prevX, 'prevY': updatedMouseData.prevY})
        setCurrentItem({...currentItem, 'x': updatedOrientation.x, 'y': updatedOrientation.y})
        
        setItems(items.map(item => {
            if (item.id === currentItem.id) {
                return {...item, 'x': updatedOrientation.x, 'y': updatedOrientation.y}
            }
            else {
                return item
            }
        }))
    }

    const handleResizing = (deltaX, deltaY, containerBounds, e) => {
        const newBoardWidth = currentItem.width + deltaX
        const newBoardHeight = currentItem.height + deltaY
    
        const withinHorizontalBounds = (currentItem.x + newBoardWidth) < containerBounds.right
        const withinVerticalBounds = (currentItem.y + newBoardHeight) < containerBounds.bottom
    
        let updatedOrientation = { ...currentItem }
        let updatedMouseData = { ...mouseData }

        const nearbyHorizontalSnappingLines = snappingLines.x.filter((line) => {
            return Math.abs(currentItem.x + newBoardWidth - line) < snappingDistance;
        });
    
        const nearbyVerticalSnappingLines = snappingLines.y.filter((line) => {
            return Math.abs(currentItem.y + newBoardHeight - line) < snappingDistance;
        });
        setNearbySnappingLines({ 'x': nearbyHorizontalSnappingLines, 'y': nearbyVerticalSnappingLines });

        if (withinHorizontalBounds) {
            const activeHorizontalSnappingLine = snappingLines.x.filter((line) => {
                return Math.abs(currentItem.x + newBoardWidth - line) < snappingDistance;
            })[0];
    
            if (activeHorizontalSnappingLine != null) {
                updatedOrientation.width = Math.max(activeHorizontalSnappingLine - currentItem.x, minWidth);
            } else {
                updatedOrientation.width = Math.max(newBoardWidth, minWidth)
                if (newBoardWidth >= minWidth) {
                    updatedMouseData.prevX = e.clientX
                }
            }
        }
        if (withinVerticalBounds) {
            const activeVerticalSnappingLine = snappingLines.y.filter((line) => {
                return Math.abs(currentItem.y + newBoardHeight - line) < snappingDistance;
            })[0];
    
            if (activeVerticalSnappingLine != null) {
                console.log(Math.max(activeVerticalSnappingLine, minHeight))
                updatedOrientation.height = Math.max(activeVerticalSnappingLine - currentItem.y, minHeight);
            } else {
                updatedOrientation.height = Math.max(newBoardHeight, minHeight)
                if (newBoardHeight >= minHeight) {
                    updatedMouseData.prevY = e.clientY
                }
            }
        }
        
        setMouseData({...mouseData, 'prevX': updatedMouseData.prevX, 'prevY': updatedMouseData.prevY})
        setCurrentItem({...currentItem, 'width': updatedOrientation.width, 'height': updatedOrientation.height})
        setItems(items.map(item => {
            if (item.id === currentItem.id) {
                return {...item, 'width': updatedOrientation.width, 'height': updatedOrientation.height}
            }
            else {
                return item
            }
        }))
    }

    const handleMouseUp = async () => {
        if (initialItem != currentItem) {
            setFinishedItem({...currentItem, 'width': Math.max(minCompletedWidth, currentItem.width), 'height': Math.max(minCompletedHeight, currentItem.height)})
        }

        setNearbySnappingLines({'x': [], 'y': []})
        setIsDragging(false)    
        setIsResizing(false)
        setMouseData({'initX': null, 'initY': null, 'prevX': null, 'prevY': null})
    };

    const handleKeyDown = (e) => {

        if (e.keyCode == 17) {
            setSnappingActive(false)
        }
    }
    const handleKeyUp = (e) => {
        if (e.keyCode == 17) {
            setSnappingActive(true)
        }
    }

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            document.addEventListener('keydown', handleKeyDown)
            document.addEventListener('keyup', handleKeyUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
                document.removeEventListener('keydown', handleKeyDown)
                
            }
        }
    }, [isDragging, isResizing, items, currentItem, mouseData])


    return {
        items,
        setItems,
        currentItem,
        finishedItem,
        snappingLines,
        nearbySnappingLines,
        startDrag,
        startResize,
    }
}

export default useOrientation;