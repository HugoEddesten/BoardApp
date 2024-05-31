import { Link, useLocation } from "react-router-dom"

const Header = () => {
    const location= useLocation()

    return (
        <div className="header">
            <Link to="/" className="logo">
                <h1>Board App</h1>
            </Link>
            <div className="nav">
                <Link to="/boards" className={location.pathname == '/boards' ? 'active link option ' : 'link option'}>
                    <h6>My Boards </h6>
                </Link>
                <Link to="/contact" className={location.pathname == '/contact' ? 'active link option ' : 'link option '}>
                    <h6>Contact</h6>
                </Link>
                <Link to="/about" className={location.pathname == '/about' ? 'active link option ' : 'link option '}>
                    <h6>About</h6>
                </Link>
            </div>

        </div>
    )
}

export default Header