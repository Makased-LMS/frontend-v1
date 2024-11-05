import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser'
import SpinnerLoader from './SpinnerLoader';
import { useLogin } from '../features/authentication/useLogin';
function PrivateRoute({ children, allowedRoles, checkAuth = false }) {
    const { isAuthenticated, user } = useUser();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (checkAuth)
        return children;

    return allowedRoles.includes(user?.role) ? <Outlet /> : <Navigate replace to="/" />;
}

export default PrivateRoute;