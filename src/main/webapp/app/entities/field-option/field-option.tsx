import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import {
  getfields,
  getEntities
} from './field-option.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IFieldOptionProps {
  getEntities: ICrudGetAction;
  fieldOptions: any[];
  getfields: ICrudGetAction;
  match: any;
}

export class FieldOption extends React.Component<IFieldOptionProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getfields();
  }

  render() {
    const { fieldOptions, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="reactsterApp.fieldOption.home.title">Field Options</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="reactsterApp.fieldOption.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="reactsterApp.fieldOption.value">Value</Translate></th>
                <th><Translate contentKey="reactsterApp.fieldOption.label">Label</Translate></th>
                <th><Translate contentKey="reactsterApp.fieldOption.field">Field</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                fieldOptions.map((fieldOption, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fieldOption.id}`} color="link" size="sm">
                      {fieldOption.id}
                    </Button>
                  </td>
                  <td>
                    {fieldOption.value}
                  </td>
                  <td>
                    {fieldOption.label}
                  </td>
                  <td>
                    {fieldOption.field ?
                    <Link to={`field/${fieldOption.field.id}`}>
                      {fieldOption.field.id}
                    </Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fieldOption.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fieldOption.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fieldOption.id}/delete`} color="danger" size="sm">
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
  fieldOptions: storeState.fieldOption.entities
});

const mapDispatchToProps = { getfields, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(FieldOption);
