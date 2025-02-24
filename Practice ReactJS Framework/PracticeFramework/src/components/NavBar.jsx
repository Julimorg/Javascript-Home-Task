import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <nav className={`navbar ${isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} 
                        p-3 d-flex justify-content-between`}>
            <h1 className="navbar-brand">
                <Link to="/" className={`text-decoration-none ${isDarkMode ? "text-light" : "text-dark"}`}>
                    Movie App
                </Link>
            </h1>
            <div>
                <button className="btn btn-outline-secondary" onClick={toggleTheme}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
