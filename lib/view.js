'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _selectField = require('material-ui/lib/select-field');

var _selectField2 = _interopRequireDefault(_selectField);

var _menuItem = require('material-ui/lib/menus/menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _alaskaAdminView = require('alaska-admin-view');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

  function SelectFieldView(props, context) {
    _classCallCheck(this, SelectFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelectFieldView).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      settings: context.settings
    };
    return _this;
  }

  _createClass(SelectFieldView, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views,
        settings: this.context.settings
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
      this.setState(newState);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model');
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event, index, value) {
      this.props.onChange && this.props.onChange(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var field = _props.field;
      var value = _props.value;
      var disabled = _props.disabled;
      var errorText = _props.errorText;
      var muiTheme = this.state.muiTheme;

      var noteElement = field.note ? _react2.default.createElement(
        'div',
        { style: field.fullWidth ? muiTheme.fieldNote : muiTheme.fieldNoteInline },
        field.note
      ) : null;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _selectField2.default,
          {
            floatingLabelText: field.label,
            fullWidth: field.fullWidth,
            value: value,
            disabled: disabled,
            errorText: errorText,
            onChange: this.handleChange },
          _.map(field.options, function (option) {
            return _react2.default.createElement(_menuItem2.default, { key: option.value, value: option.value,
              primaryText: option.label });
          })
        ),
        noteElement
      );
    }
  }]);

  return SelectFieldView;
}(_react2.default.Component);

SelectFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
SelectFieldView.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
SelectFieldView.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
SelectFieldView.mixins = [_contextPure2.default];
exports.default = SelectFieldView;