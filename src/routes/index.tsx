import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import { PrivateResource } from './PrivateResource';

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
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path="/" element={<SignIn />} />
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
