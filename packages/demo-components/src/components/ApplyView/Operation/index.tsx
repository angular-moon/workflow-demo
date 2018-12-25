import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import Revoke from '../../Operation/Revoke';
import Submit from '../../Operation/Submit';
import Cancel from '../../Operation/Cancel';

export { Cancel, Revoke, Submit };

// opComponentMaps
export default {
  [OperationType.REVOKE]: Revoke,
  [OperationType.SUBMIT]: Submit,
};
