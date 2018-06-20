import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './form-content.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';
import { getEntities as getFieldValues } from '../field-value/field-value.reducer';
import FieldValueDetail from '../field-value/field-value-detail';

export interface IFormContentDetailProps {
  getEntity: ICrudGetAction;
  getFieldValues: ICrudGetAction;
  formContent: any;
  match: any;
  fieldValues: any[];
}

export class FormContentDetail extends React.Component<IFormContentDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getFieldValues();
  }

  render() {
    const { formContent } = this.props;
    const fieldValues = this.props.fieldValues.filter(fieldValue => fieldValue.formContent.id === formContent.id) 

    return (
      <div>
        <h2>
          <Translate contentKey="reactsterApp.formContent.detail.title">FormContent</Translate> [<b>{formContent.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <Translate contentKey="reactsterApp.formContent.form">
              Form
            </Translate>
          </dt>
          <dd>
              {(formContent.form) ? formContent.form.id : ''}
              {
                fieldValues.map((fieldValue, i) => (
                  <FieldValueDetail key={i.toString()} Entity={fieldValue} />
                ))
              }
          </dd>
        </dl>
        <Button tag={Link} to={`/form-content/${formContent.id}/edit`} replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.edit">Edit</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    formContent: storeState.formContent.entity,
    fieldValues: storeState.fieldValue.entities
});

const mapDispatchToProps = { getEntity, getFieldValues };

export default connect(mapStateToProps, mapDispatchToProps)(FormContentDetail);
