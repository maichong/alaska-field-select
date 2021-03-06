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

const { any, array, bool, func } = React.PropTypes;

export default class Select extends React.Component {

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
      options: props.options,
      optionsMap: {}
    };
    if (props.options) {
      for (let o of props.options) {
        this.state.optionsMap[o.value] = o;
      }
    }
    this.state.value = this.processValue(props.value);
    this._cache = {};
  }

  componentWillMount() {
    let props = this.props;
    if (props.loadOptions && (!props.options || !props.options.length)) {
      this.handleSearchChange('');
    }
  }

  componentWillReceiveProps(props) {
    let state = {};
    if (props.options !== this.props.options) {
      state.options = props.options;
      state.optionsMap = {};
      if (props.options) {
        for (let o of props.options) {
          state.optionsMap[o.value] = o;
        }
      }
    }
    if (props.value !== undefined) {
      state.value = this.processValue(props.value);
    }
    this.setState(state, () => {
      if (state.optionsMap) {
        this.setState({ value: this.processValue(props.value) });
      }
    });
  }

  componentWillUnmount() {
    this._cache = {};
  }

  processValue = (value) => {
    let optionsMap = this.state.optionsMap;

    function processOne(v) {
      if (v && typeof v === 'object') {
        if (v.label !== v.value) {
          return v;
        } else {
          if (optionsMap[v.value]) {
            return optionsMap[v.value];
          }
          return v;
        }
      }
      if (optionsMap[v]) {
        return optionsMap[v];
      }
      return { label: v, value: v };
    }

    if (this.props.multi) {
      if (!value || !value.length) {
        return [];
      }
      return value.map(processOne);
    }
    return processOne(value);
  };

  handleChange = (value) => {
    let optionsMap = this.state.optionsMap;
    if (value) {
      if (value instanceof Array) {
        value.forEach(vv => {
          if (vv.label != vv.value) {
            optionsMap[vv.value] = vv;
          }
        });
      }
      if (value.label != value.value) {
        optionsMap[value.value] = value;
      }
    }
    this.setState({ optionsMap, value });
    this.props.onChange && this.props.onChange(value);
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
    if (this._cache[search]) {
      this.setState({ options: this._cache[search] });
      return;
    }
    this.props.loadOptions(search, (error, res) => {
      if (!error && res.options) {
        let options = this._cache[search] = res.options;
        let optionsMap = this.state.optionsMap;
        options.forEach(o => {
          optionsMap[o.value] = o;
        });
        let value = this.state.value;
        if (value && this.props.multi) {
          value.forEach(v => {
            if (v.label == v.value && optionsMap[v.value]) {
              v.label = optionsMap[v.value].label;
            }
          });
        } else if (value && value.label == value.value && optionsMap[value.value]) {
          value.label = optionsMap[value.value].label;
        }
        this.setState({ options, value, optionsMap });
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
