import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number; // Token expiration time
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    // Token validation
    const checkToken = () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);

                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error decoding token', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    };

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        navigate('/main');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    useEffect(() => {
        checkToken();
    }, []);

    return { isAuthenticated, login, logout };
};

export default useAuth;
