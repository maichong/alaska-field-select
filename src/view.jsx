/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import Select from './Select';
import Checkbox from './Checkbox';
import Switch from './Switch';
import { shallowEqual, checkDepends } from 'alaska-admin-view';
import _find from 'lodash/find';
import _every from 'lodash/every';
import _forEach from 'lodash/forEach';
import _isArray from 'lodash/isArray';
import _filter from 'lodash/filter';

function getOptionValue(opt) {
  if (opt && typeof opt === 'object') return opt.value;
  return opt;
}

const { bool, object, func, string, any } = React.PropTypes;

export default class SelectFieldView extends React.Component {

  static propTypes = {
    model: object,
    field: object,
    data: object,
    errorText: string,
    disabled: bool,
    value: any,
    onChange: func,
  };

  static contextTypes = {
    t: func,
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
    const { onChange, field } = this.props;
    if (!onChange) return;
    let value;
    if (field.multi) {
      value = [];
      _forEach(option, o => {
        value.push(getOptionValue(o));
      });
    } else {
      value = getOptionValue(option);
    }
    onChange(value);
  };

  t(opt) {
    const t = this.context.t;
    if (this.props.field.translate === false || !t) {
      return opt;
    }
    return {
      label: t(opt.label, this.props.model.service.id),
      value: opt.value,
      style: opt.style
    };
  }

  filter(options, data) {
    if (!options || !data || !options.length) {
      return options;
    }
    let res = [];
    _forEach(options, opt => {
      if (checkDepends(opt.depends, data)) {
        res.push(this.t(opt));
      }
    });
    return res;
  };

  render() {
    let { field, value, disabled, errorText } = this.props;
    let View = Select;
    if (field.checkbox) {
      View = Checkbox;
    } else if (field.switch) {
      View = Switch;
    }
    if (field.multi) {
      if (!_isArray(value)) {
        value = [value];
      }
      value = _filter(value, v => v !== undefined && v !== null);
    }
    let help = field.help;
    let className = 'form-group select-field';
    if (errorText) {
      className += ' has-error';
      help = errorText;
    }
    let helpElement = help ? <p className="help-block">{help}</p> : null;
    let inputElement;
    if (field.static) {
      if (field.multi) {
        inputElement = [];
        let valueMap = {};
        _forEach(value, v => (valueMap[getOptionValue(v)] = true));
        _forEach(this.state.options, opt => {
          if (valueMap[opt.value]) {
            inputElement.push(<span key={opt.value}>{opt.label || opt.value}</span>);
          }
        });
      } else {
        let option = _find(this.state.options, opt => opt.value === value);
        inputElement = option ? option.label : value;
      }
      inputElement = <p className="form-control-static">{inputElement}</p>;
    } else {
      inputElement = <View
        value={value}
        multi={field.multi}
        disabled={disabled}
        options={this.state.options}
        onChange={this.handleChange}
      />;
    }

    let label = field.nolabel ? '' : field.label;

    if (field.horizontal === false) {
      let labelElement = label ? (
        <label className="control-label">{label}</label>
      ) : null;
      return (
        <div className={className}>
          {labelElement}
          {inputElement}
          {helpElement}
        </div>
      );
    }

    return (
      <div className={className}>
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-10">
          {inputElement}
          {helpElement}
        </div>
      </div>
    );
  }
}
