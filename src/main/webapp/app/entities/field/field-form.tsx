import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudPutAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

import {
    getforms,
    getEntities as getFields
} from './field.reducer';

import { 
    getEntity as getFormContent,
    updateEntity as updateFormContent, 
    createEntity as createFormContent 
} from '../form-content/form-content.reducer';

import { 
    getEntity as getFieldValue,
    getEntities as getFieldValues,
    updateEntity as updateFieldValue, 
    createEntity as createFieldValue,
    getformContents,
    getfields
} from '../field-value/field-value.reducer';

import FieldDetail from '../field/field-detail'

 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IFieldFormProps {
  getFields: ICrudGetAction;
  getFormContent: ICrudGetAction;
  updateFormContent: ICrudPutAction;
  createFormContent: ICrudPutAction;
  getFieldValues: ICrudGetAction;
  getFieldValue: ICrudGetAction;
  updateFieldValue: ICrudPutAction;
  createFieldValue: ICrudPutAction;
  fields: any[];
  fieldValues: any[];
  getforms: ICrudGetAction;
  match: any;
  formId: number;
  formContentId: number;
  updating: boolean;
  formContent: any;
  forms: any[];
  loading: boolean;
  history: any;
}

export interface IFieldFormState {
    isNew: boolean;
}

export class FieldForm extends React.Component<IFieldFormProps, IFieldFormState> {
    constructor(props) {
        super(props);
        this.state = {
            isNew: !this.props || !this.props.formContentId,
        };
    }
  componentDidMount() {
    this.props.getFields();
    this.props.getforms();
    this.props.getFieldValues();
    !this.state.isNew && this.props.getFormContent((+this.props.formContentId));
  }

  saveFieldValues = async (values, formContent) => {
    let fields =  this.props.fields.filter(field => field.form.id === formContent.form.id)
    let fieldValues = []
    for (let field of fields) {
        let fieldValue = this.props.fieldValues.filter(fv => (fv.field.id === field.id && fv.formContent.id === this.props.formContent.id))[0]
        if (fieldValue) {
            let fieldValueBody = { id: fieldValue.id, field: {id: field.id}, formContent: {id: formContent.id}, value: values[field.name]}
            await this.props.updateFieldValue(fieldValueBody)
        } 
        else {
            let fieldValueBody = { field: {id: field.id}, formContent: {id: formContent.id}, value: values[field.name]}
            let fieldValue = await this.props.createFieldValue(fieldValueBody)
        }
        fieldValues.push(fieldValue)
    }
  }

  saveEntity = async (event, errors, values) => {
    if (this.state.isNew) {
        let formContentBody = {form: {id: this.props.formId}}
        let response = await this.props.createFormContent(formContentBody);
        let formContent = response.value.data
        await this.saveFieldValues(values, formContent)
        this.props.history.push(`/form-content/${formContent.id}`);
    } else {
        await this.saveFieldValues(values, this.props.formContent )
        this.props.history.push(`/form-content/${this.props.formContent.id}`);
    }
   
  }

  render() {
    const isInvalid = false;
    const { formContent, forms, loading, updating } = this.props;
    const formContentId = this.props.formContentId ? +this.props.formContentId : 0
    const formId = this.props.formId ? +this.props.formId : 0
    const fields = formId ?  this.props.fields.filter(field => field.form.id === formId) : [];
    const fieldValues = formContentId ? this.props.fieldValues.filter(fieldValue => fieldValue.formContent.id === formContentId) : []
    const match = formId ? { url: '/field'} : this.props.match;
    const { isNew } = this.state;
    const findFieldValue = field => {
        for (let fieldValue of fieldValues) {
            if (fieldValue.field.id === field.id) {
                return fieldValue.value;
            }
        }
    }
    return (
      <div> 
        <AvForm model={isNew ? {} : formContent} onSubmit={this.saveEntity}>
            {
                fields.map((field, i) => (
                    <FieldDetail Entity={field} 
                                key={i.toString()} 
                                fieldKey={i.toString()} 
                                fieldValue={findFieldValue(field)} >
                    </FieldDetail>
                ))
            }
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
        </AvForm>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  fields: storeState.field.entities,
  fieldValues: storeState.fieldValue.entities,
  formContent: storeState.formContent.entity
});

const mapDispatchToProps = { 
    getforms, 
    getFields, 
    getFieldValues, 
    createFormContent, 
    getFormContent, 
    updateFormContent, 
    createFieldValue,
    updateFieldValue 
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldForm);
