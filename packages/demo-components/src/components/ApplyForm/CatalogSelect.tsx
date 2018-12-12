import React, { Component } from 'react';
import { Select } from 'antd';
import { find, isEqual } from 'lodash';

const { Option } = Select;

const catalog = [
  {
    id: '1',
    name: '计算机',
  },
  {
    id: '2',
    name: '飞机',
  },
  {
    id: '3',
    name: '火箭',
  },
];

export type Catalog = {
  id: string;
  name: string;
};

interface Props {
  value: Catalog;
  onChange: (value: Catalog) => void;
}

// eslint-disable-next-line
class CatalogSelect extends Component<Props> {
  onChange = value => {
    const c = find<Catalog>(catalog, { id: value });
    // eslint-disable-next-line
    if (c) this.props.onChange(c);
  };

  shouldComponentUpdate(nextProps) {
    // eslint-disable-next-line
    return !isEqual(this.props.value, nextProps.value);
  }

  render() {
    const { value } = this.props;
    return (
      <Select {...this.props} value={value.id} onChange={this.onChange}>
        {catalog.map(item => (
          <Option key={item.id}>{item.name}</Option>
        ))}
      </Select>
    );
  }
}

export default CatalogSelect;
