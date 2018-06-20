import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ModalRoute } from 'react-router-modal';

import Form from './form';
import FormDetail from './form-detail';
import FormDialog from './form-dialog';
import FormDeleteDialog from './form-delete-dialog';
import FieldDialog from '../field/field-dialog';
import FieldOptionDialog from '../field-option/field-option-dialog';


const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route exact path={match.url} component={Form} />
      <Route exact path={`${match.url}/new`} component={FormDialog} />
      <Route exact path={`${match.url}/:formId/field/new`} component={FieldDialog} />
      <Route exact path={`${match.url}/:formId/field/:id/edit`} component={FieldDialog} />
      <ModalRoute exact parentPath={match.url} path={`${match.url}/:id/delete`} component={FormDeleteDialog} />
      <Route exact path={`${match.url}/:id/edit`} component={FormDialog} />
      <Route exact path={`${match.url}/:id`} component={FormDetail} />
      <ModalRoute exact parentPath={`${match.url}/:formId/field/:fieldId/edit`} path={`${match.url}/:formId/field/:fieldId/field-option/new`} component={FieldOptionDialog} />
    </Switch>
  </div>
);

export default Routes;
