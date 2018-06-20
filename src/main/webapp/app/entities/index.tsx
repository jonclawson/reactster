import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

import Field from './field';
import Form from './form';
import FormContent from './form-content';
import FieldValue from './field-value';
import FieldOption from './field-option';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      <Route path={'/field'} component={Field}/>
      <Route path={'/form'} component={Form}/>
      <Route path={'/form-content'} component={FormContent}/>
      <Route path={'/field-value'} component={FieldValue}/>
      <Route path={'/field-option'} component={FieldOption}/>
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
