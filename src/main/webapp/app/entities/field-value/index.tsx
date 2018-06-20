import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import FieldValue from './field-value';
import FieldValueDetail from './field-value-detail';
import FieldValueDialog from './field-value-dialog';
import FieldValueDeleteDialog from './field-value-delete-dialog';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={FieldValue} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/new`} component={FieldValueDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={FieldValueDeleteDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/edit`} component={FieldValueDialog} />
      <Route exact path={`${match.url}/:id`} component={FieldValueDetail} />
    </Switch>
  </div>
);

export default Routes;
