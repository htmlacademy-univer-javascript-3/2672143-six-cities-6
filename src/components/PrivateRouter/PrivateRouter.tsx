import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';

type PrivateRouteProps = {
  isAuthorized: boolean;
  redirectPath?: string;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  isAuthorized,
  redirectPath = '/login',
}) => (isAuthorized ? <Outlet /> : <Navigate to={redirectPath} replace />);

export default PrivateRoute;
