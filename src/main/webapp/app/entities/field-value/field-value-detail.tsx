import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './field-value.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IFieldValueDetailProps {
  getEntity: ICrudGetAction;
  Entity: any;
  fieldValue: any;
  match: any;
}

export class FieldValueDetail extends React.Component<IFieldValueDetailProps> {

  componentDidMount() {
    if (!this.props.Entity) {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  render() {
    const  fieldValue  = this.props.Entity || this.props.fieldValue;
    return (
      <div>
          {(fieldValue.field) ? fieldValue.field.name : ''} :  {fieldValue.value}
  
        {/* <Button tag={Link} to="/field-value" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button> */}
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
   fieldValue: storeState.fieldValue.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(FieldValueDetail);
