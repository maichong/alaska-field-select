'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _alaskaAdminView = require('alaska-admin-view');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-10
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SelectFieldView = function (_React$Component) {
  _inherits(SelectFieldView, _React$Component);

  function SelectFieldView() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectFieldView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SelectFieldView)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleChange = function (option) {
      _this.props.onChange && _this.props.onChange(option.value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectFieldView, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var field = _props.field;
      var value = _props.value;
      var disabled = _props.disabled;
      var errorText = _props.errorText;

      var noteElement = field.note ? _react2.default.createElement(
        'p',
        { classNamp: 'help-block' },
        field.note
      ) : null;
      var errorLabel = errorText ? _react2.default.createElement(
        'p',
        { className: 'help-block text-danger' },
        errorText
      ) : null;
      console.log('field.options', field.options);
      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
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
            options: field.options,
            onChange: this.handleChange
          }),
          noteElement,
          errorLabel
        )
      );
    }
  }]);

  return SelectFieldView;
}(_react2.default.Component);

SelectFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
SelectFieldView.contextTypes = {
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
exports.default = SelectFieldView;