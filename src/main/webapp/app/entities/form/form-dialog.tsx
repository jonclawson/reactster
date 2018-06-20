import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FaBan, FaFloppyO } from 'react-icons/lib/fa';

import { getEntity, updateEntity, createEntity } from './form.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from '../../shared/util/date-utils';
import Field from '../field/field';

export interface IFormDialogProps {
  getEntity: ICrudGetAction;
  updateEntity: ICrudPutAction;
  createEntity: ICrudPutAction;
  loading: boolean;
  updating: boolean;
  form: any;
  match: any;
  history: any;
}

export interface IFormDialogState {
  showModal: boolean;
  isNew: boolean;
}

export class FormDialog extends React.Component<IFormDialogProps, IFormDialogState> {

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
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
    this.props.history.push('/form');
  }

  render() {
    const isInvalid = false;
    const { form, loading, updating } = this.props;
    const { showModal, isNew } = this.state;
    return (
      <div  >
      <div  >
        <Translate contentKey="reactsterApp.form.home.createOrEditLabel">Create or edit a Form</Translate>
      </div>
      { loading ? <p>Loading...</p>
      : <div>
        <AvForm model={isNew ? {} : form} onSubmit={this.saveEntity} >
          
            { form.id ?
              <AvGroup>
                <Label for="id"><Translate contentKey="global.field.id">ID</Translate></Label>
                <AvInput type="text" className="form-control" name="id" required readOnly/>
              </AvGroup>
              : null
            }
          
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
        { this.state.isNew ? null :
        <Field match={this.props.match}/>
        }
        </div>
      }
    </div>
    );
  }
}

const mapStateToProps = storeState => ({
  form: storeState.form.entity,
  loading: storeState.form.loading,
  updating: storeState.form.updating
});

const mapDispatchToProps = { getEntity, updateEntity, createEntity };

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
