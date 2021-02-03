import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './global/GlobalStyle';
import theme from './global/theme';
import MainNavigation from './shared/components/navigation/MainNavigation';
import LoadingSpinner from './shared/components/UI/LoadingSpinner';
// import Users from './user/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
// import UserPlaces from './places/pages/UserPlaces';
// import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth';
import useAuth from './shared/hooks/useAuth';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

function App() {
  const { token, login, logout, uid } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:uid/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace />
        </Route>
        <Route path='/places/:pid' exact>
          <UpdatePlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:uid/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <>
      <GlobalStyle />
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, token, uid, login, logout }}
      >
        <Router basename={process.env.PUBLIC_URL}>
          <ThemeProvider theme={theme}>
            <MainNavigation />
            <main>
              <Suspense
                fallback={
                  <LoadingSpinnerWrapper>
                    <LoadingSpinner />
                  </LoadingSpinnerWrapper>
                }
              >
                {routes}
              </Suspense>
            </main>
          </ThemeProvider>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
