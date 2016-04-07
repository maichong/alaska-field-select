/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import Select from './Select';
import { shallowEqual } from 'alaska-admin-view';
import _ from 'lodash';

function filter(options, data) {
  if (!options || !data || !options.length) {
    return options;
  }
  let result = [];
  options.forEach(opt => {
    if (!opt.depends) {
      result.push(opt);
      return;
    }
    if (typeof opt.depends === 'string') {
      if (data[opt.depends]) {
        result.push(opt);
      }
    } else if (typeof opt.depends === 'object' && _.every(opt.depends, (value, k) => data[k] === value)) {
      result.push(opt);
    }
  });
  return result;
}

export default class SelectFieldView extends React.Component {

  static propTypes = {
    field: React.PropTypes.object,
    data: React.PropTypes.object,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    errorText: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      options: filter(props.field.options, props.data)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.field !== this.props.field || nextProps.data !== this.props.data) {
      this.setState({
        options: filter(nextProps.field.options, nextProps.data)
      });
    }
  }

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || state !== this.state;
  }

  handleChange = (option) => {
    this.props.onChange && this.props.onChange(option.value);
  };

  render() {
    let { field, value, disabled, errorText } = this.props;
    let help = field.help;
    let className = 'form-group';
    if (errorText) {
      className += ' has-error';
      help = errorText;
    }
    let helpElement = help ? <p className="help-block">{help}</p> : null;
    return (
      <div className={className}>
        <label className="control-label col-xs-2">{field.label}</label>
        <div className="col-xs-10">
          <Select
            value={value}
            disabled={disabled}
            options={this.state.options}
            onChange={this.handleChange}
          />
          {helpElement}
        </div>
      </div>
    );
  }
}
