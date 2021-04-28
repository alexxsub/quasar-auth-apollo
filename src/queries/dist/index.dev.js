"use strict";

var _interopRequireDefault = require("/home/local/TENSOR-CORP/subbotin/work/quasar/quasar-auth-apollo/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CHECK_ACCESS = exports.DATA = exports.MENU = exports.GET_COLUMNS = exports.SIGNUP = exports.SIGNIN = exports.DELETE_USER = exports.ENABLED_USER = exports.MODIFY_PROFILE = exports.MODIFY_USER = exports.USERS = exports.CURRENT_USER = exports.fragment = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/home/local/TENSOR-CORP/subbotin/work/quasar/quasar-auth-apollo/node_modules/@babel/runtime/helpers/taggedTemplateLiteral"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  query checkAccess($res: String!){\n    checkAccess(res: $res)\n  }\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  query getData{\n    getData {\n      name\n      admin\n      director\n      manager\n    }\n  }\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  query getMenu{\n    getMenu {\n      name\n      icon\n      link\n    }\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  query getColumns($model: String!) {\n    getColumns(model: $model) {\n      name\n    }\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation signUp($username: String!,$email: String!, $password: String!) {\n    signUp(username: $username, email: $email, password: $password) {\n      ...User\n    }\n  }\n  ", "\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation signIn($username: String!, $password: String!) {\n    signIn(username: $username, password: $password) {\n      token\n    }\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation deleteUser($id: ID!) {\n    deleteUser(id: $id) {\n    ...User\n    }\n  }\n  ", "\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation enabledUser($id: ID!,$enabled: Boolean!) {\n    enabledUser(id: $id, enabled: $enabled) {\n    ...User\n    }\n  }\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation modifyProfile($input: inputProfile!) {\n    modifyProfile(input: $input) {\n      ...User\n    }\n  }\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  mutation modifyUser($input: inputUser!) {\n    modifyUser(input: $input) {\n      ...User\n    }\n  }\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  query getUsers {\n    getUsers {\n      ...User\n    }\n  }\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  query getCurrentUser {\n    getCurrentUser {\n      ...User\n    }\n  }\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  fragment User on User {\n    _id\n    avatar\n    username\n    fullname\n    email\n    roles\n    enabled\n    createdDate\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var fragment = (0, _graphqlTag.default)(_templateObject());
exports.fragment = fragment;
var CURRENT_USER = (0, _graphqlTag.default)(_templateObject2(), fragment);
exports.CURRENT_USER = CURRENT_USER;
var USERS = (0, _graphqlTag.default)(_templateObject3(), fragment);
exports.USERS = USERS;
var MODIFY_USER = (0, _graphqlTag.default)(_templateObject4(), fragment);
exports.MODIFY_USER = MODIFY_USER;
var MODIFY_PROFILE = (0, _graphqlTag.default)(_templateObject5(), fragment);
exports.MODIFY_PROFILE = MODIFY_PROFILE;
var ENABLED_USER = (0, _graphqlTag.default)(_templateObject6(), fragment);
exports.ENABLED_USER = ENABLED_USER;
var DELETE_USER = (0, _graphqlTag.default)(_templateObject7(), fragment);
exports.DELETE_USER = DELETE_USER;
var SIGNIN = (0, _graphqlTag.default)(_templateObject8());
exports.SIGNIN = SIGNIN;
var SIGNUP = (0, _graphqlTag.default)(_templateObject9(), fragment);
exports.SIGNUP = SIGNUP;
var GET_COLUMNS = (0, _graphqlTag.default)(_templateObject10());
exports.GET_COLUMNS = GET_COLUMNS;
var MENU = (0, _graphqlTag.default)(_templateObject11());
exports.MENU = MENU;
var DATA = (0, _graphqlTag.default)(_templateObject12());
exports.DATA = DATA;
var CHECK_ACCESS = (0, _graphqlTag.default)(_templateObject13());
exports.CHECK_ACCESS = CHECK_ACCESS;