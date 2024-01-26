import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route } from 'react-router-dom';

const PublicRoute = ({ childern }) => {
  const { isAuth } = useSelector((state) => state.auth);

  if (isAuth) {
      return <Navigate to="/" />
  }

  return <Outlet />;
}

export default PublicRoute;