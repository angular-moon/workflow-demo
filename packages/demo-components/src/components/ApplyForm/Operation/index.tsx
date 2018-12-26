import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import Save from './Save';
import Cancel from '../../Operation/Cancel';
import Submit from './Submit';
import Reject from '../../Operation/Reject';
import Revoke from '../../Operation/Revoke';

export { Save, Cancel, Reject, Submit };

// opComponentMaps
export default {
  [OperationType.SUBMIT]: Submit,
  [OperationType.REJECT]: Reject,
  [OperationType.REVOKE]: Revoke,
};
