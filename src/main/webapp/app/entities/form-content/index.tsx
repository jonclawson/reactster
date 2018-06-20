import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import FormContent from './form-content';
import FormContentDetail from './form-content-detail';
import FormContentDialog from './form-content-dialog';
import FormContentDeleteDialog from './form-content-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={FormContent} />
      <Route exact path={`${match.url}/new`} component={FormContentDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={FormContentDeleteDialog} />
      <Route exact path={`${match.url}/:id/edit`} component={FormContentDialog} />
      <Route exact path={`${match.url}/:id`} component={FormContentDetail} />
    </Switch>
  </div>
);

export default Routes;
