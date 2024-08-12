import React from 'react';
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';
 function Header() {
    const navigate = useNavigate();
    const authToken = sessionStorage.getItem('token');
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/site/logout', {}, {
                withCredentials: true, // Ensure that cookies (session) are included in the request
            });
            console.log("logout response", response);
            if (response.status === 200) {
                // Successfully logged out
                navigate('/site/login'); // Redirect to the login page or another route
            } else {
                console.error('Logout failed:', response.data.msg);
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <header id="header">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        {document.title} {/* Assuming document.title holds the equivalent of Yii::$app->name */}
                    </Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/site/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/site/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/site/contact">Contact</Link>
                        </li>
                        {
                            authToken !==null || authToken !==undefined ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/site/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/site/register">Register</Link>
                            </li>
                        </>
                        : <li className="nav-item">
                        <button
                            className="nav-link btn btn-link logout"
                            id="logout-button"
                            onClick={handleLogout}
                        >
                            Logout 
                        </button>
                    </li>
                        }
                        
                    </ul>
                </div>
            </nav>
        </header>
    );
}
  export default Header;