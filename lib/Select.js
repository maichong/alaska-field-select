'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelectize = require('react-selectize');

require('react-selectize/themes/index.css');

require('../select.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-22
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

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
  var labels = values.map(function (v) {
    return v.label;
  });
  if (!search || labels.indexOf(search) > -1) return null;
  return { label: search, value: search };
}

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, props));

    _this.processValue = function (value) {
      if (!value) {
        return value;
      }
      var optionsMap = _this.state.optionsMap;

      function processOne(v) {
        if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
          if (v.label != v.value) {
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

      if (_this.props.multi) {
        if (!value || !value.length) {
          return [];
        }
        return value.map(processOne);
      }
      return processOne(value);
    };

    _this.handleChange = function (v) {
      var optionsMap = _this.state.optionsMap;
      if (v) {
        if (v instanceof Array) {
          v.forEach(function (vv) {
            if (vv.label != vv.value) {
              optionsMap[vv.value] = vv;
            }
          });
        }
        if (v.label != v.value) {
          optionsMap[v.value] = v;
        }
      }
      _this.setState({ optionsMap: optionsMap, value: v });
      _this.props.onChange && _this.props.onChange(v);
    };

    _this.renderValueWithRemove = function (item) {
      var me = _this;

      function handleRemove() {
        var values = [];
        me.state.value.forEach(function (v) {
          if (v.value != item.value) {
            values.push(v);
          }
        });
        me.setState({ value: values });
        me.props.onChange && me.props.onChange(values);
      }

      return _react2.default.createElement(
        'div',
        { className: 'simple-value' },
        _react2.default.createElement(
          'span',
          {
            className: 'simple-value-remove',
            onClick: handleRemove },
          'x'
        ),
        _react2.default.createElement(
          'span',
          null,
          item.label
        )
      );
    };

    _this.handleSearchChange = function (search) {
      _this.props.loadOptions(search, function (error, res) {
        if (!error && res.options) {
          (function () {
            var options = res.options.slice();
            var optionsMap = _this.state.optionsMap;
            options.forEach(function (o) {
              optionsMap[o.value] = o;
            });
            var value = _this.state.value;
            if (value && _this.props.multi) {
              value.forEach(function (v) {
                if (v.label == v.value && optionsMap[v.value]) {
                  v.label = optionsMap[v.value].label;
                }
              });
            } else if (value && value.label == value.value && optionsMap[value.value]) {
              value.label = optionsMap[value.value].label;
            }
            _this.setState({ options: options, value: value, optionsMap: optionsMap });
          })();
        }
      });
    };

    _this.state = {
      options: props.options,
      optionsMap: {}
    };
    _this.state.value = _this.processValue(props.value);
    return _this;
  }

  _createClass(Select, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var props = this.props;
      if (props.loadOptions && (!props.options || !props.options.length)) {
        this.handleSearchChange('');
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var state = {};
      if (props.options) {
        state.options = props.options;
      }
      if (props.value !== undefined) {
        state.value = this.processValue(props.value);
      }
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var multi = _props.multi;
      var onChange = _props.onChange;
      var allowCreate = _props.allowCreate;
      var renderValue = _props.renderValue;
      var loadOptions = _props.loadOptions;
      var disabled = _props.disabled;
      var value = _props.value;
      var options = _props.options;

      var others = _objectWithoutProperties(_props, ['multi', 'onChange', 'allowCreate', 'renderValue', 'loadOptions', 'disabled', 'value', 'options']);

      return multi ? _react2.default.createElement(_reactSelectize.MultiSelect, _extends({
        createFromSearch: allowCreate ? createFromSearchMulti : null,
        renderValue: renderValue || disabled ? renderValue : this.renderValueWithRemove,
        onValuesChange: this.handleChange,
        values: this.state.value,
        onSearchChange: loadOptions ? this.handleSearchChange : null,
        options: this.state.options,
        disabled: disabled
      }, others)) : _react2.default.createElement(_reactSelectize.SimpleSelect, _extends({
        createFromSearch: allowCreate ? createFromSearchSimple : null,
        renderValue: renderValue,
        onValueChange: this.handleChange,
        value: this.state.value,
        onSearchChange: loadOptions ? this.handleSearchChange : null,
        options: this.state.options,
        disabled: disabled
      }, others));
    }
  }]);

  return Select;
}(_react2.default.Component);

Select.propTypes = {
  multi: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  loadOptions: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.any,
  options: _react2.default.PropTypes.array
};
exports.default = Select;