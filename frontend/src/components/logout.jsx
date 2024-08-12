import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/site/logout', {}, {
                withCredentials: true, // Ensure cookies are sent for session management
            });

            if (response.data.status === 200) {
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
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
