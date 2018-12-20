/* eslint-disable */
import { createAPI } from '../util';

// mock server: 'http://192.168.2.11:7300/mock/5c08b836666bcf1da5ef15fa/workflow-demo'
const baseUrl = process.env.REACT_APP_API_GATEWAY_BASE;

export default createAPI(baseUrl);
