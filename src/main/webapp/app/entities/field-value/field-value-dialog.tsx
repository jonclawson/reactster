import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './field-value.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';

export interface IFieldValueDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  fieldValue: any;
  formContents: any[];
  fields: any[];
  match: any;
  history: any;
}

export interface IFieldValueDialogState {
  showModal: boolean;
  isNew: boolean;
  formContentId: number;
  fieldId: number;
}

export class FieldValueDialog extends React.Component<IFieldValueDialogProps, IFieldValueDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      formContentId: 0,
      fieldId: 0,
      showModal: true
    };
  }

  componentDidMount() {
    !this.state.isNew && this.props.getEntity(this.props.match.params.id);
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
    this.props.history.push('/field-value');
  }

  formContentUpdate = element => {
    const id = element.target.value;
    for (const i in this.props.formContents) {
        if (id.toString() === this.props.formContents[i].id.toString()) {
            this.setState({
                formContentId: this.props.formContents[i].id
            });
        }
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
    const { fieldValue, formContents, fields, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <Modal isOpen={showModal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
        toggle={this.handleClose} size="lg">
      <ModalHeader toggle={this.handleClose}>
        <Translate contentKey="reactsterApp.fieldValue.home.createOrEditLabel">Create or edit a FieldValue</Translate>
      </ModalHeader>
      { loading ? <p>Loading...</p>
      : <AvForm model={isNew ? {} : fieldValue} onSubmit={this.saveEntity} >
          <ModalBody>
            { fieldValue.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label id="valueLabel" for="value">
                <Translate contentKey="reactsterApp.fieldValue.value">
                  value
                </Translate>
              </Label>
              <AvInput type="text" className="form-control" name="value" required />
              <AvFeedback>This field is required.</AvFeedback>
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="formContent.id">
                <Translate contentKey="reactsterApp.fieldValue.formContent">Form Content</Translate>
              </Label>
              <AvInput type="select"
                className="form-control"
                name="formContent.id"
                onChange={this.formContentUpdate}>
                <option value="" key="0" />
                {
                  formContents.map(otherEntity =>
                    <option
                      value={otherEntity.id}
                      key={otherEntity.id}>
                      {otherEntity.id}
                    </option>
                  )
                }
              </AvInput>
              <AvInput type="hidden"
                name="formContent.id"
                value={this.state.formContentId} />
            </AvGroup>
            <AvGroup>
              <Label for="field.id">
                <Translate contentKey="reactsterApp.fieldValue.field">Field</Translate>
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
              <AvInput type="hidden"
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
  fieldValue: storeState.fieldValue.entity,
  formContents: storeState.fieldValue.formContents,
  fields: storeState.fieldValue.fields,
  loading: storeState.fieldValue.loading,
  updating: storeState.fieldValue.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(FieldValueDialog);
