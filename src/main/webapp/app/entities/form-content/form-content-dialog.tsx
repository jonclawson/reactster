import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './form-content.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';
import FieldForm from '../field/field-form';

export interface IFormContentDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  formContent: any;
  forms: any[];
  match: any;
  history: any;
}

export interface IFormContentDialogState {
  showModal: boolean;
  isNew: boolean;
  formId: number;
}

export class FormContentDialog extends React.Component<IFormContentDialogProps, IFormContentDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      formId: 0,
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
    this.props.history.push('/form-content');
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
    const { formContent, forms, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <div>
      <div >
        <Translate contentKey="reactsterApp.formContent.home.createOrEditLabel">Create or edit a FormContent</Translate>
      </div>
      { isNew ? 
       <AvForm model={isNew ? {} : formContent} onSubmit={this.saveEntity} >
          <div>
            { formContent.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
            <AvGroup>
              <Label for="form.id">
                <Translate contentKey="reactsterApp.formContent.form">Form</Translate>
              </Label>
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
              <AvInput type="hidden"
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
        : null
      }
     {formContent.form && !isNew ? 
     <FieldForm history={this.props.history} formId={formContent.form.id} formContentId={this.props.match.params.id}/>
    : null} 
    </div>
    );
  }
}

const mapStateToProps = storeState => ({
  formContent: storeState.formContent.entity,
  forms: storeState.formContent.forms,
  loading: storeState.formContent.loading,
  updating: storeState.formContent.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(FormContentDialog);
