/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-14
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import _map from 'lodash/map';
import _forEach from 'lodash/forEach';

function getOptionValue(opt) {
  if (opt && typeof opt === 'object') return opt.value;
  return opt;
}

const { any, array, bool, func } = React.PropTypes;

export default class Switch extends React.Component {

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

  handleClick(opt) {
    const { value, multi, onChange } = this.props;
    const { options } = this.state;
    if (!multi) {
      return onChange(opt);
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
      let vid = getOptionValue(v);
      if (vid === opt) {
        found = true;
      } else if (optionsMap[vid]) {
        res.push(vid);
      }
    });
    if (!found) {
      res.push(opt);
    }
    return onChange(res);
  }

  render() {
    const { value, multi } = this.props;
    const { options } = this.state;
    let valueMap = {};
    if (multi) {
      _forEach(value, v => (valueMap[getOptionValue(v)] = true));
    } else if (value) {
      valueMap[getOptionValue(value)] = true;
    }
    return (
      <div className="btn-group">
        {_map(options, o => {
          let cls = 'btn btn-' + (o.style || 'default');
          let vid = getOptionValue(o);
          if (valueMap[vid]) {
            cls += (o.style ? ' active' : ' btn-success');
          }
          return <div key={vid} className={cls} onClick={() => this.handleClick(vid)}>{o.label}</div>;
        })}
      </div>
    );
  }
}
