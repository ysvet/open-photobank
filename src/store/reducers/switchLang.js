import {
  SWITCH_LANGUAGE_RU,
  SWITCH_LANGUAGE_RO,
  SWITCH_BAR_VISIBILITY_OFF,
  SWITCH_BAR_VISIBILITY_ON
} from '../actions/actionTypes';

const initialState = {
  language: 'ru',
  showBar: true
};

const switchLang = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANGUAGE_RO:
      return {
        ...state,
        language: 'ro'
      };
    case SWITCH_LANGUAGE_RU:
      return {
        ...state,
        language: 'ru'
      };
    case SWITCH_BAR_VISIBILITY_OFF:
      return {
        ...state,
        showBar: false
      };
    case SWITCH_BAR_VISIBILITY_ON:
      return {
        ...state,
        showBar: true
      };
    default:
      return state;
  }
};

export default switchLang;
