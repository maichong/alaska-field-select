/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-10
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');

exports.views = {
  cell: {
    name: 'SelectFieldCell',
    field: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'SelectFieldView',
    field: __dirname + '/lib/view.js'
  }
};

exports.plain = String;

/**
 * 初始化Schema
 * @param field   alaksa.Model中的字段配置
 * @param schema
 * @param Model
 */
exports.initSchema = function (field, schema, Model) {
  let options = {
    type: field.number ? Number : field.boolean ? Boolean : String
  };
  [
    'get',
    'set',
    'default',
    'index',
    'select'
  ].forEach(function (key) {
    if (field[key] !== undefined) {
      options[key] = field[key];
    }
  });

  schema.path(field.path, options);
};

/**
 * alaska-admin-view 前端控件初始化参数
 * @param field
 * @param Model
 */
exports.viewOptions = function (field, Model) {
  let options = alaska.Field.viewOptions.apply(this, arguments);
  options.options = field.options;
  return options;
};
