import React, { SFC } from 'react';

export interface Props {
  h?: string;
}

class X extends React.Component<Props, {}> {
  render() {
    const { h } = this.props;
    return (
      <div>
        hello
        {h}
      </div>
    );
  }
}

// const X: SFC<Props> = ({ h }) => (
//   <div>
//     hello
//     {h}
//   </div>
// );

export default X;
