import { createBrowserHistory } from 'history';
import { getConfirmation } from './confirmation';

const history = createBrowserHistory({
  basename: process.env.REACT_APP_ROUTE_BASENAME,
  getUserConfirmation: getConfirmation,
});
export default history;
