/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import Select from './Select';

export default class SelectFieldFilter extends React.Component {

  static propTypes = {
    value: React.PropTypes.any,
    field: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onClose: React.PropTypes.func,
  };

  static contextTypes = {
    t: React.PropTypes.func,
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
      error: false
    };
  }

  handleInverse = () => {
    this.setState({ inverse: !this.state.inverse }, () => this.handleBlur());
  };

  handleChange = option => {
    this.setState({ value: option ? option.value : undefined }, () => this.handleBlur());
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
    const buttonClassNameActive = buttonClassName + ' active';
    let className = 'row field-filter field-filter-number' + (error ? ' error' : '');
    return (
      <div className={className}>
        <label className="col-xs-2 control-label text-right">{field.label}</label>
        <form className="form-inline col-xs-10">
          <div className="form-group" style={{ minWidth: 230 }}>
            <Select
              options={field.options}
              value={value}
              onChange={this.handleChange}
            />
          </div>
          <button
            className={inverse ? buttonClassNameActive : buttonClassName}
            onClick={this.handleInverse}>{t('inverse')}
          </button>
        </form>
        <button className="btn field-filter-close" onClick={onClose}><i className="fa fa-close"/></button>
      </div>
    );
  }
}
