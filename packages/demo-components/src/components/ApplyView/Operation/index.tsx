import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import Submit from '../../Operation/Submit';
import Reject from '../../Operation/Reject';
import Revoke from '../../Operation/Revoke';
import Cancel from '../../Operation/Cancel';

export { Cancel, Revoke, Submit };

// opComponentMaps
export default {
  [OperationType.SUBMIT]: Submit,
  [OperationType.REJECT]: Reject,
  [OperationType.REVOKE]: Revoke,
};
