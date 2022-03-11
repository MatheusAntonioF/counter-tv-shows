import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { PrivateResource } from './resources/PrivateResource';
import RedirectResource from './resources/RedirectResource';

const ListShows = lazy(() =>
  import('../pages/ListShows').then(module => ({
    default: module.ListShows,
  }))
);

const SignIn = lazy(() =>
  import('../pages/Auth/SignIn').then(module => ({
    default: module.SignIn,
  }))
);

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route
            path="/"
            element={
              <RedirectResource>
                <SignIn />
              </RedirectResource>
            }
          />
          <Route
            path="/list-shows"
            element={
              <PrivateResource>
                <ListShows />
              </PrivateResource>
            }
          />
          <Route />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export { Routes };
