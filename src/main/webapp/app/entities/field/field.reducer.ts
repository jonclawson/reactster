import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from '../../reducers/action-type.util';
import { messages, SERVER_API_URL } from '../../config/constants';

// import { Field } from './field.model';

export const ACTION_TYPES = {
  FETCH_FIELDS: 'field/FETCH_FIELDS',
  FETCH_forms: 'forms/FETCH_forms',
  FETCH_FIELD:  'field/FETCH_FIELD',
  CREATE_FIELD: 'field/CREATE_FIELD',
  UPDATE_FIELD: 'field/UPDATE_FIELD',
  DELETE_FIELD: 'field/DELETE_FIELD'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  forms: [],
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_forms):
    case REQUEST(ACTION_TYPES.FETCH_FIELDS):
    case REQUEST(ACTION_TYPES.FETCH_FIELD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FIELD):
    case REQUEST(ACTION_TYPES.UPDATE_FIELD):
    case REQUEST(ACTION_TYPES.DELETE_FIELD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_forms):
    case FAILURE(ACTION_TYPES.FETCH_FIELDS):
    case FAILURE(ACTION_TYPES.FETCH_FIELD):
    case FAILURE(ACTION_TYPES.CREATE_FIELD):
    case FAILURE(ACTION_TYPES.UPDATE_FIELD):
    case FAILURE(ACTION_TYPES.DELETE_FIELD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_forms):
      return {
        ...state,
        loading: false,
        forms: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FIELD):
    case SUCCESS(ACTION_TYPES.UPDATE_FIELD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FIELD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/fields';

// Actions

export const getforms: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_forms,
  payload: axios.get(`/api/forms?cacheBuster=${new Date().getTime()}`)
});

export const getEntities: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FIELDS,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FIELD,
    payload: axios.get(requestUrl)
  };
};

export const createEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FIELD,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.post(apiUrl, entity)
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FIELD,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.put(apiUrl, entity)
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FIELD,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
