/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

export default class SelectViewCell extends React.Component {

  static contextTypes = {
    t: React.PropTypes.func,
  };

  shouldComponentUpdate(props) {
    return props.value != this.props.value;
  }

  render() {
    const t = this.context.t;
    let { field, value, model } = this.props;
    for (let i in field.options) {
      if (field.options[i].value == value) {
        value = field.options[i].label || value;
        break;
      }
    }
    if (field.translate !== false) {
      value = t(value, model.service.id);
    }
    return <div>{value}</div>;
  }
}
