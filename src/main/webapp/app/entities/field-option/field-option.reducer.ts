import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from '../../reducers/action-type.util';
import { messages, SERVER_API_URL } from '../../config/constants';

// import { FieldOption } from './field-option.model';

export const ACTION_TYPES = {
  FETCH_FIELDOPTIONS: 'fieldOption/FETCH_FIELDOPTIONS',
  FETCH_fields: 'fields/FETCH_fields',
  FETCH_FIELDOPTION:  'fieldOption/FETCH_FIELDOPTION',
  CREATE_FIELDOPTION: 'fieldOption/CREATE_FIELDOPTION',
  UPDATE_FIELDOPTION: 'fieldOption/UPDATE_FIELDOPTION',
  DELETE_FIELDOPTION: 'fieldOption/DELETE_FIELDOPTION'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  fields: [],
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_fields):
    case REQUEST(ACTION_TYPES.FETCH_FIELDOPTIONS):
    case REQUEST(ACTION_TYPES.FETCH_FIELDOPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FIELDOPTION):
    case REQUEST(ACTION_TYPES.UPDATE_FIELDOPTION):
    case REQUEST(ACTION_TYPES.DELETE_FIELDOPTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_fields):
    case FAILURE(ACTION_TYPES.FETCH_FIELDOPTIONS):
    case FAILURE(ACTION_TYPES.FETCH_FIELDOPTION):
    case FAILURE(ACTION_TYPES.CREATE_FIELDOPTION):
    case FAILURE(ACTION_TYPES.UPDATE_FIELDOPTION):
    case FAILURE(ACTION_TYPES.DELETE_FIELDOPTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_fields):
      return {
        ...state,
        loading: false,
        fields: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDOPTIONS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FIELDOPTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FIELDOPTION):
    case SUCCESS(ACTION_TYPES.UPDATE_FIELDOPTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FIELDOPTION):
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

const apiUrl = SERVER_API_URL + '/api/field-options';

// Actions

export const getfields: ICrudGetAction = () => ({
  type: ACTION_TYPES.FETCH_fields,
  payload: axios.get(`/api/fields?cacheBuster=${new Date().getTime()}`)
});

export const getEntities: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FIELDOPTIONS,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FIELDOPTION,
    payload: axios.get(requestUrl)
  };
};

export const createEntity: ICrudPutAction = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FIELDOPTION,
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
    type: ACTION_TYPES.UPDATE_FIELDOPTION,
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
    type: ACTION_TYPES.DELETE_FIELDOPTION,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
