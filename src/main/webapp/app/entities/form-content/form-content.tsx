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
} from './form-content.reducer';
 // tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from '../../config/constants';

export interface IFormContentProps {
  getEntities: ICrudGetAction;
  formContents: any[];
  getforms: ICrudGetAction;
  match: any;
}

export class FormContent extends React.Component<IFormContentProps> {
  componentDidMount() {
    this.props.getEntities();
    this.props.getforms();
  }

  render() {
    const { formContents, match } = this.props;
    return (
      <div>
        <h2>
          <Translate contentKey="reactsterApp.formContent.home.title">Form Contents</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
            <FaPlus /> <Translate contentKey="reactsterApp.formContent.home.createLabel" />
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th><Translate contentKey="global.field.id">ID</Translate></th>
                <th><Translate contentKey="reactsterApp.formContent.form">Form</Translate></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                formContents.map((formContent, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${formContent.id}`} color="link" size="sm">
                      {formContent.id}
                    </Button>
                  </td>
                  <td>
                    {formContent.form ?
                    <Link to={`form/${formContent.form.id}`}>
                      {formContent.form.id}
                    </Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${formContent.id}`} color="info" size="sm">
                        <FaEye/> <span className="d-none d-md-inline" ><Translate contentKey="entity.action.view" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${formContent.id}/edit`} color="primary" size="sm">
                        <FaPencil/> <span className="d-none d-md-inline"><Translate contentKey="entity.action.edit" /></span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${formContent.id}/delete`} color="danger" size="sm">
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
  formContents: storeState.formContent.entities
});

const mapDispatchToProps = { getforms, getEntities };

export default connect(mapStateToProps, mapDispatchToProps)(FormContent);
