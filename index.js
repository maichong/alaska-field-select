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
      'unique',
      'text',
      'sparse',
      'required',
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
    let inverse = false;
    if (typeof filter === 'object' && filter.value) {
      value = filter.value;
      if (filter.inverse === true || filter.inverse === 'true') {
        inverse = true;
      }
    }

    if (this.dataType === Number) {
      value = parseInt(value);
      if (isNaN(value)) return;
      return inverse ? { $ne: value } : value;
    }

    if (this.dataType === String) {
      if (typeof value !== 'string' && value.toString) {
        value = value.toString();
      }
      if (typeof value === 'string') {
        return inverse ? { $ne: value } : value;
      }
    }

    if (this.dataType === Boolean) {
      value = value && (value === true || value === 'true');
      return inverse ? { $ne: value } : value;
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
  },
  filter: {
    name: 'SelectFieldFilter',
    field: __dirname + '/lib/filter.js'
  }
};

SelectField.plain = String;

SelectField.viewOptions = ['options', 'translate'];

module.exports = SelectField;
