/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import _map from 'lodash/map';
import Select from './Select';
import Checkbox from './Checkbox';
import Switch from './Switch';

function getOptionValue(opt) {
  if (opt && typeof opt === 'object') return opt.value;
  return opt;
}

const { object, any, func, string } = React.PropTypes;

export default class SelectFieldFilter extends React.Component {

  static propTypes = {
    value: any,
    field: object,
    onChange: func,
    onClose: func,
  };

  static contextTypes = {
    t: func,
  };

  constructor(props) {
    super(props);
    let value = props.value || {};
    if (typeof value === 'string') {
      value = { value };
    }
    this.state = {
      value: value.value,
      inverse: value.inverse === true || value.inverse === 'true',
      error: value.value === undefined
    };
  }

  t(opt) {
    const t = this.context.t;
    if (this.props.field.translate === false || !t) {
      return opt;
    }
    return {
      label: t(opt.label),
      value: opt.value,
      style: opt.style
    };
  }

  handleInverse = () => {
    this.setState({ inverse: !this.state.inverse }, () => this.handleBlur());
  };

  handleChange = option => {
    this.setState({ value: getOptionValue(option) }, () => this.handleBlur());
  };

  handleBlur = () => {
    let { value, inverse } = this.state;
    if (value === undefined) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false });

    this.props.onChange(inverse ? { value, inverse } : value);
  };

  render() {
    const t = this.context.t;
    const { field, onClose } = this.props;
    const { value, inverse, error } = this.state;
    const buttonClassName = 'btn btn-default';
    const buttonClassNameActive = buttonClassName + ' btn-success';
    let className = 'row field-filter select-field-filter' + (error ? ' error' : '');
    let View = Select;
    if (field.checkbox) {
      View = Checkbox;
    } else if (field.switch) {
      View = Switch;
    }
    return (
      <div className={className}>
        <label className="col-xs-2 control-label text-right">{field.label}</label>
        <div className="form-inline col-xs-10">
          <div className="form-group" style={{ minWidth: 230 }}>
            <View
              options={_map(field.options, opt => this.t(opt))}
              value={value}
              onChange={this.handleChange}
            />
          </div>
          <a
            className={inverse ? buttonClassNameActive : buttonClassName}
            onClick={this.handleInverse}>{t('inverse')}
          </a>
        </div>
        <a className="btn field-filter-close" onClick={onClose}><i className="fa fa-close"/></a>
      </div>
    );
  }
}
