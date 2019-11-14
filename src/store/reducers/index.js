import { combineReducers } from 'redux';
import switchLang from './switchLang';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import photo from './photo';
import album from './album';
import category from './category';
import location from './location';
import period from './period';
import search from './search';
import contributor from './contributor';

export default combineReducers({
  switchLang,
  alert,
  auth,
  profile,
  photo,
  album,
  category,
  location,
  period,
  search,
  contributor
});
