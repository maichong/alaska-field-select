/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-11
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import Check from 'alaska-field-checkbox/lib/Checkbox';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _forEach from 'lodash/forEach';

const { any, array, bool, func } = React.PropTypes;

export default class Checkbox extends React.Component {

  static propTypes = {
    multi: bool,
    onChange: func,
    loadOptions: func,
    value: any,
    options: array
  };

  handleCheck(opt) {
    const { multi, onChange, value } = this.props;
    if (!multi) {
      let valueId = value.value || value;
      if (valueId != opt.value) {
        onChange(opt);
      }
      return;
    }

    if (!value || !value.length) {
      onChange([opt]);
      return;
    }

    let res = [];
    let found = false;

    _forEach(value, v => {
      let vid = v.value || v;
      if (vid == opt.value) {
        found = true;
      } else {
        res.push(v);
      }
    });

    if (!found) {
      res.push(opt);
    }
    onChange(res);
  }

  render() {
    const { options, multi, value } = this.props;
    let valueMap = {};
    if (multi) {
      _forEach(value, v => {
        v = v.value ? v.value : v;
        valueMap[v] = true;
      });
    }

    return (
      <div>{
        _map(options, (opt, key) => {
          return (<Check
            key={key}
            radio={!multi}
            label={opt.label}
            value={multi ? valueMap[opt.value] : (opt.value == value || opt == value || opt.value == value.value)}
            style={{ display: 'inline-block', marginRight: 16 }}
            onCheck={() => this.handleCheck(opt)}
          />);
        })
      }</div>
    );
  }
}
