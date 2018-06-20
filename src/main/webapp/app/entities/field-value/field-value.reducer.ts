import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from '../../reducers/action-type.util';
import { messages, SERVER_API_URL } from '../../config/constants';

// import { FieldValue } from './field-value.model';

export const ACTION_TYPES = {
  FETCH_FIELDVALUES: 'fieldValue/FETCH_FIELDVALUES',
  FETCH_formContents: 'formContents/FETCH_formContents',
  FETCH_fields: 'fields/FETCH_fields',
  FETCH_FIELDVALUE:  'fieldValue/FETCH_FIELDVALUE',
  CREATE_FIELDVALUE: 'fieldValue/CREATE_FIELDVALUE',
  UPDATE_FIELDVALUE: 'fieldValue/UPDATE_FIELDVALUE',
  DELETE_FIELDVALUE: 'fieldValue/DELETE_FIELDVALUE'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  formContents: [],
  fields: [],
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_formContents):
    case REQUEST(ACTION_TYPES.FETCH_fields):
    case REQUEST(ACTION_TYPES.FETCH_FIELDVALUES):
    case REQUEST(ACTION_TYPES.FETCH_FIELDVALUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FIELDVALUE):
    case REQUEST(ACTION_TYPES.UPDATE_FIELDVALUE):
    case REQUEST(ACTION_TYPES.DELETE_FIELDVALUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_formContents):
    case FAILURE(ACTION_TYPES.FETCH_fields):
    case FAILURE(ACTION_TYPES.FETCH_FIELDVALUES):
    case FAILURE(ACTION_TYPES.FETCH_FIELDVALUE):
    case FAILURE(ACTION_TYPES.CREATE_FIELDVALUE):
    case FAILURE(ACTION_TYPES.UPDATE_FIELDVALUE):
    case FAILURE(ACTION_TYPES.DELETE_FIELDVALUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_formContents):
      return {
        ...state,
        loading: false,
        formContents: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_fields):
      return {
        ...state,
        loading: false,
        fields: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDVALUES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDVALUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FIELDVALUE):
    case SUCCESS(ACTION_TYPES.UPDATE_FIELDVALUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FIELDVALUE):
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

const apiUrl = SERVER_API_URL + '/api/field-values';

// Actions

export const getformContents: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_formContents,
  payload: axios.get(`/api/form-contents?cacheBuster=${new Date().getTime()}`)
});

export const getfields: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_fields,
  payload: axios.get(`/api/fields?cacheBuster=${new Date().getTime()}`)
});

export const getEntities: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FIELDVALUES,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FIELDVALUE,
    payload: axios.get(requestUrl)
  };
};

export const createEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FIELDVALUE,
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
    type: ACTION_TYPES.UPDATE_FIELDVALUE,
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
    type: ACTION_TYPES.DELETE_FIELDVALUE,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
