import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route } from 'react-router-dom';

const PrivateRoute = ({ childern }) => {
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <div className="min-h-screen flex items-center justify-center">
      Unauthenticated
    </div>
  }

  return <Outlet />;
}

export default PrivateRoute;