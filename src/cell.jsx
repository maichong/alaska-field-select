/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

export default class SelectViewCell extends React.Component {

  static contextTypes = {
    settings: React.PropTypes.object,
  };

  shouldComponentUpdate(props) {
    return props.value != this.props.value;
  }

  render() {
    let { field, value } = this.props;
    for (let i in field.options) {
      if (field.options[i].value == value) {
        value = field.options[i].label || value;
        return <div>{value}</div>;
      }
    }
    return (
      <div>{value}</div>
    );
  }
}
