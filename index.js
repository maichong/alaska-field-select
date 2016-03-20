/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');

class SelectField extends alaska.Field {
  initSchema() {
    let schema = this._schema;
    this.dataType = this.number ? Number : this.boolean ? Boolean : String;
    let options = {
      type: this.dataType
    };
    [
      'get',
      'set',
      'default',
      'index',
      'select'
    ].forEach(key => {
      if (this[key] !== undefined) {
        options[key] = this[key];
      }
    });

    schema.path(this.path, options);
  }

  createFilter(filter) {
    let value = filter;
    if (typeof filter === 'object' && filter.value) {
      value = filter.value;
    }

    if (this.dataType === Number) {
      value = parseInt(value);
      if (isNaN(value)) {
        return;
      }
      return value;
    }

    if (this.dataType === String) {
      if (typeof value !== 'string' && value.toString) {
        value = value.toString();
      }
      if (typeof value === 'string') {
        return value;
      }
    }

    if (this.dataType === Boolean) {
      return (!value || value === 'false') ? { $ne: true } : true;
    }
  }

}

SelectField.views = {
  cell: {
    name: 'SelectFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'SelectFieldView',
    field: __dirname + '/lib/view.js'
  }
};

SelectField.plain = String;

SelectField.viewOptions = ['options'];

module.exports = SelectField;
