import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthorized } from '../../store/selectors';

const PrivateRoute: React.FC = () => {
  const isAuthorized = useSelector(selectIsAuthorized);

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
