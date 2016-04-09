/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import Select from './Select';
import { shallowEqual } from 'alaska-admin-view';
import _ from 'lodash';

function tr(opt, translate, t) {
  if (translate === false || !t) {
    return opt;
  }
  return {
    label: t()
  }
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

  static contextTypes = {
    t: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      options: this.filter(this.props.field.options, this.props.data)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.field !== this.props.field || nextProps.data !== this.props.data) {
      this.setState({
        options: this.filter(nextProps.field.options, nextProps.data)
      });
    }
  }

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || state !== this.state;
  }

  handleChange = (option) => {
    this.props.onChange && this.props.onChange(option.value);
  };

  t(opt) {
    const t = this.context.t;
    if (this.props.field.translate === false || !t) {
      return opt;
    }
    return {
      label: t(opt.label, this.props.model.service.id),
      value: opt.value
    };
  }

  filter(options, data) {
    if (!options || !data || !options.length) {
      return options;
    }
    let result = [];
    options.forEach(opt => {
      if (!opt.depends) {
        result.push(this.t(opt));
        return;
      }
      if (typeof opt.depends === 'string') {
        if (data[opt.depends]) {
          result.push(this.t(opt));
        }
      } else if (typeof opt.depends === 'object' && _.every(opt.depends, (value, k) => data[k] === value)) {
        result.push(this.t(opt));
      }
    });
    return result;
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
