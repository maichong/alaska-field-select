/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { shallowEqual } from 'alaska-admin-view';

import * as _ from 'lodash';

export default class SelectFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object,
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
  };

  static mixins = [
    ContextPure
  ];

  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : getMuiTheme(),
      views: context.views,
      settings: context.settings,
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      views: this.context.views,
      settings: this.context.settings,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newState = {};
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    if (nextContext.views) {
      newState.views = nextContext.views;
    }
    this.setState(newState);
  }

  shouldComponentUpdate(props) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model');
  }

  handleChange(event, index, value) {
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    let { field, value, disabled, errorText } = this.props;
    let { muiTheme } = this.state;
    let noteElement = field.note ?
      <div style={field.fullWidth?muiTheme.fieldNote:muiTheme.fieldNoteInline}>{field.note}</div> : null;
    return (
      <div>
        <SelectField
          floatingLabelText={field.label}
          fullWidth={field.fullWidth}
          value={value}
          disabled={disabled}
          errorText={errorText}
          onChange={this.handleChange}>
          {
            _.map(field.options, option=><MenuItem key={option.value} value={option.value}
                                                   primaryText={option.label}/>)
          }
        </SelectField>
        {noteElement}
      </div>
    );
  }
}
