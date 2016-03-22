/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { SimpleSelect, MultiSelect } from 'react-selectize';

import 'react-selectize/themes/index.css';
import '../select.less';

function createFromSearchSimple(options, search) {
  if (!search) {
    return null;
  }
  search = search.trim();
  return search ? { label: search, value: search } : null;
}

function createFromSearchMulti(options, values, search) {
  if (!search) {
    return null;
  }
  search = search.trim();
  let labels = values.map(v => v.label);
  if (!search || labels.indexOf(search) > -1)
    return null;
  return { label: search, value: search };
}

export default class Select extends React.Component {

  static propTypes = {
    multi: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    loadOptions: React.PropTypes.func,
    value: React.PropTypes.any,
    options: React.PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      value: props.value
    };
  }

  componentDidMount() {
    let props = this.props;
    if (props.loadOptions && (!props.options || !props.options.length)) {
      this.handleSearchChange('');
    }
  }

  componentWillReceiveProps(props) {
    if (props.options) {
      this.setState({
        options: props.options
      });
    }
  }

  handleChange = (v) => {
    this.setState({
      value: v
    });
    this.props.onChange && this.props.onChange(v);
  };

  renderValueWithRemove = (item) => {
    let me = this;

    function handleRemove() {
      let values = [];
      me.state.value.forEach(v => {
        if (v.value != item.value) {
          values.push(v);
        }
      });
      me.setState({ value: values });
      me.props.onChange && me.props.onChange(values);
    }

    return (
      <div className="simple-value">
        <span
          className="simple-value-remove"
          onClick={handleRemove}>x</span>
        <span>{item.label}</span>
      </div>
    );
  };

  handleSearchChange = (search) => {
    this.props.loadOptions(search, (error, res) => {
      if (!error && res.options) {
        this.setState({ options: res.options });
      }
    });
  };

  render() {
    let {
      multi,
      onChange,
      allowCreate,
      renderValue,
      loadOptions,
      disabled,
      value,
      options,
      ...others
      } = this.props;

    return multi ? (
      <MultiSelect
        createFromSearch={ allowCreate ? createFromSearchMulti : null}
        renderValue={renderValue || disabled ? renderValue : this.renderValueWithRemove}
        onValuesChange={this.handleChange}
        values={this.state.value}
        onSearchChange={loadOptions ? this.handleSearchChange : null}
        options={this.state.options}
        disabled={disabled}
        {...others}
      />
    ) : (
      <SimpleSelect
        createFromSearch={ allowCreate ? createFromSearchSimple : null}
        renderValue={renderValue}
        onValueChange={this.handleChange}
        value={this.state.value}
        onSearchChange={loadOptions ? this.handleSearchChange : null}
        options={this.state.options}
        disabled={disabled}
        {...others}
      />
    );
  }
}
