import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './form.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';
import FieldForm from '../field/field-form';

export interface IFormDetailProps {
  getEntity: ICrudGetAction;
  form: any;
  match: any;
  history: any;
}

export class FormDetail extends React.Component<IFormDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { form } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="reactsterApp.form.detail.title">Form</Translate> [<b>{form.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
        <FieldForm history={this.props.history}  formId={this.props.match.params.id}/>
        </dl>  
        <Button tag={Link} to="/form" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    form: storeState.form.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(FormDetail);
