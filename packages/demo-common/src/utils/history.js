import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  basename: process.env.REACT_APP_ROUTE_BASENAME,
});
export default history;
