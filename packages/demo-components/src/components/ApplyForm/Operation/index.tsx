import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import Save from './Save';
import Reject from './Reject';
import Submit from './Submit';

export { Save, Reject, Submit };

export default {
  [OperationType.SUBMIT]: Submit,
  [OperationType.REJECT]: Reject,
};
