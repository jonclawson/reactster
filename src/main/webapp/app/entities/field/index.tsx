import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Field from './field';
import FieldDetail from './field-detail';
import FieldDialog from './field-dialog';
import FieldDeleteDialog from './field-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Field} />
      <Route exact path={`${match.url}/new`} component={FieldDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={FieldDeleteDialog} />
      <Route exact path={`${match.url}/:id/edit`} component={FieldDialog} />
      <Route exact path={`${match.url}/:id`} component={FieldDetail} />
    </Switch>
  </div>
);

export default Routes;
