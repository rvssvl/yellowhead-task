import * as React from 'react';
import { RouteProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';

interface IStateProps extends RouteProps {
  authPath: string;
}

type IProps = IStateProps;

export const PrivateRoute: React.FC<IProps> = ({ component, path, authPath }) => {
    const token = useSelector((state: RootState) => state.user.token);

  return token ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect
      to={{
        pathname: `${authPath}`,
        search: `redirectUri=${path}`,
      }}
    />
  );
};

export default PrivateRoute;
