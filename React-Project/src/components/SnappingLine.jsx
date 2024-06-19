import { useEffect, useState } from "react"

const SnappingLine = ({workspace, x = 0, y = 0, color='var(--color-red)'}) => {

    return (
        <div>
            { y == 0
            ? 
            <div className="line" style={{
                top: workspace.offsetTop+'px',
                left: x+'px', 
                height: workspace.offsetHeight+'px',
                width: 2+'px',
                backgroundColor: color
                }}>
            </div> 
            : 
            <div className="line" style={{
                top: y+'px',
                left: workspace.offsetLeft+'px', 
                height: 2+'px',
                width: workspace.offsetWidth+'px',
                backgroundColor: color
                }}>
            </div>}
        </div>
        
    )
}

export default SnappingLine