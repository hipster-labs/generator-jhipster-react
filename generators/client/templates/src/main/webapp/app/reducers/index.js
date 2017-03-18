import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authentication from './authentication.reducer';
import locale from './locale.reducer';
import administration from './administration.reducer';

export default combineReducers({
  authentication,
  locale,
  routing,
  administration
});
