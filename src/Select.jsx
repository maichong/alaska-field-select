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
    value: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(props) {
  }

  componentWillUnmount() {
  }

  handleValueChange = (v) => {
    this.setState({
      value: v
    });
    this.props.onChange && this.props.onChange(v);
  };

  handleValuesChange = (v) => {
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

  render() {
    let {
      multi,
      onChange,
      allowCreate,
      renderValue,
      value,
      ...others
      } = this.props;

    return multi ? (
      <MultiSelect
        createFromSearch={ allowCreate ? createFromSearchMulti : null}
        renderValue={renderValue ? renderValue : this.renderValueWithRemove}
        onValuesChange={this.handleValuesChange}
        values={this.state.value}
        {...others}
      />
    ) : (
      <SimpleSelect
        createFromSearch={ allowCreate ? createFromSearchSimple : null}
        renderValue={renderValue}
        onValueChange={this.handleValueChange}
        value={this.state.value}
        {...others}
      />
    );
  }
}
