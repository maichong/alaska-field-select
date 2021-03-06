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

function getOptionValue(opt) {
  if (opt && typeof opt === 'object') return opt.value;
  return opt;
}

const { any, array, bool, func } = React.PropTypes;

export default class Checkbox extends React.Component {

  static propTypes = {
    multi: bool,
    onChange: func,
    loadOptions: func,
    value: any,
    options: array
  };

  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    };
  }

  componentWillMount() {
    let props = this.props;
    if (props.loadOptions && (!props.options || !props.options.length)) {
      this.props.loadOptions('', (error, res) => {
        if (!error && res.options) {
          this.setState({ options: res.options });
        }
      });
    }
  }

  componentWillReceiveProps(props) {
    let state = {};
    if (props.options) {
      state.options = props.options;
      this.setState(state);
    }
  }

  handleCheck(opt) {
    const { multi, onChange, value } = this.props;
    const { options } = this.state;
    if (!multi) {
      let valueId = getOptionValue(value);
      if (valueId != opt.value) {
        onChange(opt);
      }
      return;
    }

    //multi
    if (!value || !value.length) {
      onChange([opt]);
      return;
    }

    let optionsMap = {};
    _forEach(options, opt => (optionsMap[getOptionValue(opt)] = true));

    let res = [];
    let found = false;

    _forEach(value, v => {
      if (!v) return;
      let vid = getOptionValue(v);
      if (vid == opt.value) {
        found = true;
      } else if (optionsMap[vid]) {
        res.push(v);
      }
    });

    if (!found) {
      res.push(opt.value);
    }
    onChange(res);
  }

  render() {
    const { multi, value } = this.props;
    const { options } = this.state;
    let valueMap = {};
    if (multi) {
      _forEach(value, v => {
        if (!v) return;
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
