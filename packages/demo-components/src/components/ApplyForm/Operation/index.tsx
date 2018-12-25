import { OperationType } from 'demo-common/src/enums/OperationType.enum';
import Save from './Save';
import Submit from './Submit';
import Reject from '../../Operation/Reject';
import Cancel from '../../Operation/Cancel';

export { Save, Cancel, Reject, Submit };

// opComponentMaps
export default {
  [OperationType.SUBMIT]: Submit,
  [OperationType.REJECT]: Reject,
};
