import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './field-option.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';

export interface IFieldOptionDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  fieldOption: any;
  fields: any[];
  match: any;
  history: any;
}

export interface IFieldOptionDialogState {
  showModal: boolean;
  isNew: boolean;
  fieldId: number;
  formId: number;
}

export class FieldOptionDialog extends React.Component<IFieldOptionDialogProps, IFieldOptionDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      fieldId: 0,
      formId: 0,
      showModal: true
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getEntity(this.props.match.params.id);
    if (this.props.match.params.fieldId) {
      this.setState({
        fieldId: +this.props.match.params.fieldId,
        formId: +this.props.match.params.formId
    })
    }
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
    if (!this.state.fieldId) {
      this.props.history.push('/field-option');
    } 
    else {
      this.props.history.push(`/form/${this.state.formId}/field/${this.state.fieldId}/edit`);
    }
  }

  fieldUpdate = element => {
    const id = element.target.value;
    for (const i in this.props.fields) {
        if (id.toString() === this.props.fields[i].id.toString()) {
            this.setState({
                fieldId: this.props.fields[i].id
            });
        }
    }
  }

  render() {
    const isInvalid = false;
    const { fieldOption, fields, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg">
      <ModalHeader toggle={this.handleClose}>
        <Translate contentKey="reactsterApp.fieldOption.home.createOrEditLabel">Create or edit a FieldOption</Translate>
      </ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : fieldOption} onSubmit={this.saveEntity} >
          <ModalBody>
            { fieldOption.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label id="valueLabel" for="value">
                <Translate contentKey="reactsterApp.fieldOption.value">
                  value
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="value" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label id="labelLabel" for="label">
                <Translate contentKey="reactsterApp.fieldOption.label">
                  label
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="label" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="field.id">
                <Translate contentKey="reactsterApp.fieldOption.field">Field</Translate>
              </Label>
              <AvInput type="select"
                className="form-control"
                name="field.id"
                onChange={this.fieldUpdate}>
                <option value="" key="0" />
                {
                  fields.map(otherEntity =>
                    <option
                      value={otherEntity.id}
                      key={otherEntity.id}>
                      {otherEntity.id}
                    </option>
                  )
                }
              </AvInput>
              <AvInput type="text"
                name="field.id"
                value={this.state.fieldId} />
            </AvGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleClose}>
              <FaBan/>&nbsp;
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit" disabled={isInvalid || updating}>
              <FaFloppyO/>&nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      }
    </Modal>
    );
  }
}

const mapStateToProps = storeState => ({
  fieldOption: storeState.fieldOption.entity,
  fields: storeState.fieldOption.fields,
  loading: storeState.fieldOption.loading,
  updating: storeState.fieldOption.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(FieldOptionDialog);
