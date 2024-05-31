

const Sidebar = ({ handleAddBoard }) => {

const handleAddBoardClick = (e) => {
    handleAddBoard(true)
}

    return (
        <div className="sidebar">
            <h3>Options</h3>
            <div className="buttons">
                <button className="add-board" onClick={handleAddBoardClick}>
                    <h6>Add board</h6>
                </button>
                <button className="add-board" onClick={handleAddBoardClick}>
                    <h6>Add board</h6>
                </button>
                <button className="add-board" onClick={handleAddBoardClick}>
                    <h6>Add board</h6>
                </button>
                <button className="add-board" onClick={handleAddBoardClick}>
                    <h6>Add board</h6>
                </button>
                <button className="add-board" onClick={handleAddBoardClick}>
                    <h6>Add board</h6>
                </button>
            </div>
            
        </div>
    )
}

export default Sidebar