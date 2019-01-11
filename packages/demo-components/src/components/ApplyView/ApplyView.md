# ApplyView

## Basic usage

```jsx
import { OperationType, OpinionStrategy } from 'demo-common/src/enums';

<ApplyView
  applyId="1"
  processInstanceId="1"
  taskId="1"
  operations={[
    {
      name: '提交',
      type: OperationType.SUBMIT,
      selectKey: '1',
      opinionStrategy: OpinionStrategy.OPTIONAL,
    },
  ]}
/>;
```
