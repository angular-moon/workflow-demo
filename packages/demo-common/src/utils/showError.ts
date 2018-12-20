import { notification } from 'antd';

export default errorMessage => {
  notification.error({
    message: 'ERROR',
    description: errorMessage,
  });
};
