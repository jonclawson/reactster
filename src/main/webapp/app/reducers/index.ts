import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import layout from './layout';
import authentication from './authentication';
import administration from './administration';
import userManagement from './user-management';
import field from '../entities/field/field.reducer';
import form from '../entities/form/form.reducer';
import formContent from '../entities/form-content/form-content.reducer';
import fieldValue from '../entities/field-value/field-value.reducer';
import fieldOption from '../entities/field-option/field-option.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export default combineReducers({
  authentication,
  locale,
  layout,
  administration,
  userManagement,
  field,
  form,
  formContent,
  fieldValue,
  fieldOption,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});
