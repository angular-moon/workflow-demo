import React from 'react';
import { Operation } from 'demo-common/src/types/Operation';

interface OperationComponentMaps {
  [type: string]: typeof React.Component;
}

interface OperationComponentProps {
  [type: string]: any;
}

const mapOpComponents = (
  opComponentMaps: OperationComponentMaps,
  opComponentProps: OperationComponentProps = {}
) => (operation: Operation) => {
  const Component = opComponentMaps[operation.type];
  const ComponentProps = opComponentProps[operation.type];

  const restProps = { ...operation.data, ...ComponentProps };
  if (Component) {
    return (
      <Component
        key={operation.type}
        text={operation.name}
        type={operation.type}
        selectKey={operation.selectKey}
        opinion={operation.opinion}
        {...restProps}
      />
    );
  }
  return null;
};

export { mapOpComponents };
