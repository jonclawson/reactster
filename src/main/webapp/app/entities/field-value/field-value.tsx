import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import {
  getformContents,
  getfields,
  getEntities
} from './field-value.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IFieldValueProps {
  getEntities: ICrudGetAction;
  fieldValues: any[];
  getformContents: ICrudGetAction;
  getfields: ICrudGetAction;
  match: any;
}

export class FieldValue extends React.Component<IFieldValueProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getformContents();
    this.props.getfields();
  }

  render() {
    const { fieldValues, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="reactsterApp.fieldValue.home.title">Field Values</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="reactsterApp.fieldValue.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="reactsterApp.fieldValue.value">Value</Translate></th>
                <th><Translate contentKey="reactsterApp.fieldValue.formContent">Form Content</Translate></th>
                <th><Translate contentKey="reactsterApp.fieldValue.field">Field</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                fieldValues.map((fieldValue, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fieldValue.id}`} color="link" size="sm">
                      {fieldValue.id}
                    </Button>
                  </td>
                  <td>
                    {fieldValue.value}
                  </td>
                  <td>
                    {fieldValue.formContent ?
                    <Link to={`formContent/${fieldValue.formContent.id}`}>
                      {fieldValue.formContent.id}
                    </Link> : ''}
                  </td>
                  <td>
                    {fieldValue.field ?
                    <Link to={`field/${fieldValue.field.id}`}>
                      {fieldValue.field.id}
                    </Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fieldValue.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fieldValue.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fieldValue.id}/delete`} color="danger" size="sm">
                        <FaTrash/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.delete" /></span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  fieldValues: storeState.fieldValue.entities
});

const mapDispatchToProps = { getformContents, getfields, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(FieldValue);
