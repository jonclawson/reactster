import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { getEntity } from './field-option.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IFieldOptionDetailProps {
  getEntity: ICrudGetAction;
  fieldOption: any;
  match: any;
}

export class FieldOptionDetail extends React.Component<IFieldOptionDetailProps> {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fieldOption } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="reactsterApp.fieldOption.detail.title">FieldOption</Translate> [<b>{fieldOption.id}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>
            <span id="value">
              <Translate contentKey="reactsterApp.fieldOption.value">
              value
              </Translate>
            </span>
          </dt>
          <dd>
            {fieldOption.value}
          </dd>
          <dt>
            <span id="label">
              <Translate contentKey="reactsterApp.fieldOption.label">
              label
              </Translate>
            </span>
          </dt>
          <dd>
            {fieldOption.label}
          </dd>
          <dt>
            <Translate contentKey="reactsterApp.fieldOption.field">
              Field
            </Translate>
          </dt>
          <dd>
              {(fieldOption.field) ? fieldOption.field.id : ''}
          </dd>
        </dl>
        <Button tag={Link} to="/field-option" replace color="info">
          <FaArrowLeft/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.back">Back</Translate></span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
    fieldOption: storeState.fieldOption.entity
});

const mapDispatchToProps = { getEntity };

export default connect(mapStateToProps, mapDispatchToProps)(FieldOptionDetail);
