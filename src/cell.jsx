/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import _find from 'lodash/find';
import _forEach from 'lodash/forEach';

function getOptionValue(opt) {
  if (opt && typeof opt === 'object') return opt.value;
  return opt;
}

const { any, object, func } = React.PropTypes;

export default class SelectViewCell extends React.Component {

  static propTypes = {
    value: any,
    field: object,
    model: object,
  };

  static contextTypes = {
    t: func
  };

  shouldComponentUpdate(props) {
    return props.value != this.props.value;
  }

  render() {
    const t = this.context.t;
    let { field, value, model } = this.props;
    let el;

    if (field.multi) {
      el = [];
      let valueMap = {};
      _forEach(value, v => (valueMap[getOptionValue(v)] = true));
      _forEach(field.options, opt => {
        if (valueMap[opt.value]) {
          let label = opt.label || opt.value;
          if (field.translate !== false) {
            label = t(label, model.service.id);
          }
          el.push(<span key={opt.value}>{label}</span>);
        }
      });
    } else {
      let option = _find(field.options, opt => opt.value === value);
      el = option ? option.label : value;
      if (field.translate !== false) {
        el = t(el, model.service.id);
      }
    }
    return <div className="select-field-cell">{el}</div>;
  }
}
