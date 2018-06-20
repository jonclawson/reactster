import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import FieldOption from './field-option';
import FieldOptionDetail from './field-option-detail';
import FieldOptionDialog from './field-option-dialog';
import FieldOptionDeleteDialog from './field-option-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={FieldOption} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={FieldOptionDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={FieldOptionDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={FieldOptionDialog} />
      <Route exact path={`${match.url}/:id`} component={FieldOptionDetail} />
    </Switch>
  </div>
);

export default Routes;
