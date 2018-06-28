import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaPlus, FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './field.reducer';
import {
  getEntities as getFieldOptions
} from '../field-option/field-option.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';

export interface IFieldDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  getFieldOptions: ICrudGetAction;
  loading: boolean;
  updating: boolean;
  field: any;
  forms: any[];
  fieldOptions: any[];
  match: any;
  history: any;
}

export interface IFieldDialogState {
  showModal: boolean;
  isNew: boolean;
  formId: number;
}

export class FieldDialog extends React.Component<IFieldDialogProps, IFieldDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew:  !this.props.match || !this.props.match.params || !this.props.match.params.id,
      formId: 0,
      showModal: true
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getEntity(this.props.match.params.id);
    if (this.props.match.params.formId) {
      this.setState({
        formId: +this.props.match.params.formId
    })
    }
    this.props.getFieldOptions();
  }

  saveEntity = (event, errors, values) => {
    if (this.state.isNew) {
      this.props.createEntity(values);
    } else {
      this.props.updateEntity(values);
    }
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
        showModal: false
    });
    if (!this.state.formId) {
      this.props.history.push('/field');
    }
    else {
      this.props.history.push(`/form/${this.state.formId}/edit`);
    }
  }

  formUpdate = element => {
    const id = element.target.value;
    for (const i in this.props.forms) {
        if (id.toString() === this.props.forms[i].id.toString()) {
            this.setState({
                formId: this.props.forms[i].id
            });
        }
    }
  }

  render() {
    const isInvalid = false;
    const { field, forms, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    let fieldOptions = this.props.fieldOptions.filter(fieldOption => fieldOption.field.id === this.props.field.id)
    return (
      <div >
      <div >
        <Translate contentKey="reactsterApp.field.home.createOrEditLabel">Create or edit a Field</Translate>
      </div>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : field} onSubmit={this.saveEntity} >
          <div>
            { field.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label id="typeLabel">
                <Translate contentKey="reactsterApp.field.type">
                  type
                </Translate>
              </Label>
              <AvInput type="select"
                className="form-control"
                name="type"
              >
                <option value="TEXT">
                    TEXT
                </option>
                <option value="TEXTAREA">
                    TEXTAREA
                </option>
                <option value="SELECT">
                    SELECT
                </option>
                <option value="NUMBER">
                    NUMBER
                </option>
                <option value="RADIO">
                    RADIO
                </option>
                <option value="CHECKBOX">
                    CHECKBOX
                </option>
                <option value="FILE">
                    FILE
                </option>
              </AvInput>
            </AvGroup>
            <AvGroup>
              {
                fieldOptions.map(fieldOption =>(
                  <span>{fieldOption.label}</span>
                ))
              }
            <Link to={`field-option/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="reactsterApp.fieldOption.home.createLabel" />
          </Link>
            </AvGroup>
            <AvGroup>
              <Label id="titleLabel" for="title">
                <Translate contentKey="reactsterApp.field.title">
                  title
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="title" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label id="nameLabel" for="name">
                <Translate contentKey="reactsterApp.field.name">
                  name
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="name" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="form.id">
                <Translate contentKey="reactsterApp.field.form">Form</Translate>
              </Label>
              { !this.props.match.params.formId ?
              <AvInput type="select"
                className="form-control"
                name="form.id"
                onChange={this.formUpdate}>
                <option value="" key="0" />
                {
                  forms.map(otherEntity =>
                    <option
                      value={otherEntity.id}
                      key={otherEntity.id}>
                      {otherEntity.id}
                    </option>
                  )
                }
              </AvInput>
              : null }
              <AvInput type="number"
              readOnly
                name="form.id"
                value={this.state.formId} />
            </AvGroup>
          </div>
          <div>
            <Button color="secondary" onClick={this.handleClose}>
              <FaBan/>&nbsp;
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FaFloppyO/>&nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </div>
        </AvForm>
      }
    </div>
    );
  }
}

const mapStateToProps = storeState => ({
  field: storeState.field.entity,
  forms: storeState.field.forms,
  loading: storeState.field.loading,
  updating: storeState.field.updating,
  fieldOptions: storeState.fieldOption.entities
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity, getFieldOptions };

export default connect(mapStateToProps, mapDispatchToProps)(FieldDialog);
