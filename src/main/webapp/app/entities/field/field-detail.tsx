import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Label } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './field.reducer';
import {
  getEntities as getFieldOptions
} from '../field-option/field-option.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';
import { AvForm, AvGroup, AvInput, AvFeedback, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';

export interface IFieldDetailProps {
  getEntity: ICrudGetAction;
  getFieldOptions: ICrudGetAction;
  field: any;
  Entity: any;
  fieldKey: any;
  fieldValue: any;
  fieldOptions: any[];
  match: any;
}

export class FieldDetail extends React.Component<IFieldDetailProps> {

  componentDidMount() {
    if (!this.props.Entity) {
      this.props.getEntity(this.props.match.params.id);
    }
    this.props.getFieldOptions();
  }

  render() {
    const { fieldKey, fieldValue } = this.props;
    const field = this.props.Entity || this.props.field;
    let fieldOptions = this.props.fieldOptions.filter(fieldOption => fieldOption.field.id === field.id)
    const fieldType = field => {
      switch (field.type.toLowerCase()) {
        case 'text':
        case 'textarea':
        case 'number':
          return <AvInput key={fieldKey}
          id={field.id}
          type={field.type.toLowerCase()}
          className="form-control"
          name={field.name}
          title={field.title}
          value={fieldValue}/>
        case 'select':
          return <AvInput type="select"
          key={fieldKey}
          name={field.name}
          label={field.title}
          value={fieldValue}
          helpMessage="">
          {fieldOptions.map(fieldOption => (
             <option value={fieldOption.value}>{fieldOption.label}</option>
          ))}
        </AvInput>
        case 'radio':
          return <AvRadioGroup
                    name={field.name}
                    key={fieldKey}
                    value={fieldValue}
                    label={field.title}
                    className="form-control"
                    errorMessage="">
                        {fieldOptions.map(fieldOption => (
                            <AvRadio label={fieldOption.label} value={fieldOption.value} />
                        ))}
               </AvRadioGroup>
        case 'checkbox':
          return <AvGroup check value={fieldValue}>
                  <Label check>
                    <AvInput
                    key={fieldKey}
                    id={field.id}
                    type={field.type.toLowerCase()}
                    className="form-control"
                    name={field.name}
                    title={field.title}
                    checked={fieldValue ? 'true': ''}
                    />
                  </Label>
                </AvGroup>
      }
    }
    return (
      <div>
          <AvGroup>
            <label>{field.title}</label>
             { fieldType(field) }
          </AvGroup>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    field: storeState.field.entity,
    fieldOptions: storeState.fieldOption.entities
});

const mapDispatchToProps = { getEntity, getFieldOptions };

export default connect(mapStateToProps, mapDispatchToProps)(FieldDetail);
