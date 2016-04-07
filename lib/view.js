'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                   * @date 2016-03-10
                                                                                                                                                                                                                                                   * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _alaskaAdminView = require('alaska-admin-view');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function filter(options, data) {
  if (!options || !data || !options.length) {
    return options;
  }
  var result = [];
  options.forEach(function (opt) {
    if (!opt.depends) {
      result.push(opt);
      return;
    }
    if (typeof opt.depends === 'string') {
      if (data[opt.depends]) {
        result.push(opt);
      }
    } else if (_typeof(opt.depends) === 'object' && _lodash2.default.every(opt.depends, function (value, k) {
      return data[k] === value;
    })) {
      result.push(opt);
    }
  });
  return result;
}

var SelectFieldView = function (_React$Component) {
  _inherits(SelectFieldView, _React$Component);

  function SelectFieldView(props) {
    _classCallCheck(this, SelectFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectFieldView).call(this, props));

    _this.handleChange = function (option) {
      _this.props.onChange && _this.props.onChange(option.value);
    };

    _this.state = {
      options: filter(props.field.options, props.data)
    };
    return _this;
  }

  _createClass(SelectFieldView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.field !== this.props.field || nextProps.data !== this.props.data) {
        this.setState({
          options: filter(nextProps.field.options, nextProps.data)
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model') || state !== this.state;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var field = _props.field;
      var value = _props.value;
      var disabled = _props.disabled;
      var errorText = _props.errorText;

      var help = field.help;
      var className = 'form-group';
      if (errorText) {
        className += ' has-error';
        help = errorText;
      }
      var helpElement = help ? _react2.default.createElement(
        'p',
        { className: 'help-block' },
        help
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'label',
          { className: 'control-label col-xs-2' },
          field.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-10' },
          _react2.default.createElement(_Select2.default, {
            value: value,
            disabled: disabled,
            options: this.state.options,
            onChange: this.handleChange
          }),
          helpElement
        )
      );
    }
  }]);

  return SelectFieldView;
}(_react2.default.Component);

SelectFieldView.propTypes = {
  field: _react2.default.PropTypes.object,
  data: _react2.default.PropTypes.object,
  onChange: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.any,
  disabled: _react2.default.PropTypes.bool,
  errorText: _react2.default.PropTypes.string
};
exports.default = SelectFieldView;