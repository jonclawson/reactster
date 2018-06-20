import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
// TODO import TextFormat only when fieldContainsDate
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaPlus, FaEye, FaPencil, FaTrash } from 'react-icons/lib/fa';

import {
  getforms,
  getEntities
} from './field.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IFieldProps {
  getEntities: ICrudGetAction;
  fields: any[];
  getforms: ICrudGetAction;
  match: any;
}

export class Field extends React.Component<IFieldProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getforms();
  }

  render() {
    const formId = this.props.match.params.id ? +this.props.match.params.id : 0
    const fields = formId ?  this.props.fields.filter(field => field.form.id === formId) : this.props.fields;
    const match = formId ? { url: '/field'} : this.props.match;
    return (
      <div>
        <h2>
          <Translate contentKey="reactsterApp.field.home.title">Fields</Translate>
          <Link to={`field/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="reactsterApp.field.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="reactsterApp.field.type">Type</Translate></th>
                <th><Translate contentKey="reactsterApp.field.title">Title</Translate></th>
                <th><Translate contentKey="reactsterApp.field.name">Name</Translate></th>
                <th><Translate contentKey="reactsterApp.field.form">Form</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                fields.map((field, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${field.id}`} color="link" size="sm">
                      {field.id}
                    </Button>
                  </td>
                  <td>
                    {field.type}
                  </td>
                  <td>
                    {field.title}
                  </td>
                  <td>
                    {field.name}
                  </td>
                  <td>
                    {field.form ?
                    <Link to={`form/${field.form.id}`}>
                      {field.form.id}
                    </Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${field.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`field/${field.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${field.id}/delete`} color="danger" size="sm">
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
  fields: storeState.field.entities
});

const mapDispatchToProps = { getforms, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(Field);
