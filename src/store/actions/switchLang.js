import {
  SWITCH_LANGUAGE_RU,
  SWITCH_LANGUAGE_RO,
  SWITCH_BAR_VISIBILITY_OFF,
  SWITCH_BAR_VISIBILITY_ON
} from './actionTypes';

export const switchLangRu = () => {
  return {
    type: SWITCH_LANGUAGE_RU
  };
};

export const switchLangRo = () => {
  return {
    type: SWITCH_LANGUAGE_RO
  };
};

export const showBar = () => dispatch => {
  dispatch({ type: SWITCH_BAR_VISIBILITY_ON });
};

export const hideBar = () => dispatch => {
  dispatch({ type: SWITCH_BAR_VISIBILITY_OFF });
};
