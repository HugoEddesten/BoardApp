
const TempBoard = ({x, y, width, height}) => {
    return (
        <div className="temp-board" style={{
            top: y+'px',
            left: x+'px', 
            height: height+'px',
            width: width+'px'
            }}>
            
        </div>
    )
}

export default TempBoard