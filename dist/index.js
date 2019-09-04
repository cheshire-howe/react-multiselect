'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var debounce = (function (fn, delay) {
  var timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
});

/**
 * Check if a string contains a value
 */
function includes(str, term, caseSensitive) {
  if (!caseSensitive) {
    return String(str).toLowerCase().indexOf(String(term).toLowerCase()) > -1;
  } else {
    return String(str).indexOf(String(term)) > -1;
  }
}

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isDataObject = function isDataObject(obj, valueKey, labelKey) {
  return _typeof(obj) === 'object' && obj.hasOwnProperty(valueKey) && obj.hasOwnProperty(labelKey);
};
var hasItem = function hasItem(all, item, valueKey, labelKey, returnIndex) {
  if (!all || !item) return false;

  if (Array.isArray(all)) {
    if (isDataObject(item, valueKey, labelKey)) {
      var find = all.findIndex(function (opt) {
        return opt[valueKey] === item[valueKey];
      });

      if (returnIndex) {
        return find;
      }

      return find > -1;
    } else {
      var indexOfItem = all.indexOf(item);

      if (returnIndex) {
        return indexOfItem;
      }

      return indexOfItem > -1;
    }
  } else {
    if (isDataObject(item, valueKey, labelKey)) {
      return all[valueKey] === item[valueKey];
    }

    return all === item;
  }
};
var hasItemIndex = function hasItemIndex(all, item, valueKey, labelKey) {
  return hasItem(all, item, valueKey, labelKey, true);
};
var keyExtractor = function keyExtractor(item, valueKey, labelKey) {
  return isDataObject(item, valueKey, labelKey) ? item[valueKey] : item;
};
var sortCollection = function sortCollection(array, valueKey) {
  if (valueKey) {
    return array.sort(function (a, b) {
      return a[valueKey] < b[valueKey] ? -1 : 1;
    });
  } else {
    return array.sort(function (a, b) {
      return a < b ? -1 : 1;
    });
  }
};
function arraysEqual(left, right) {
  if (left.length !== right.length) return false;
  var leftLen = left.length;
  var i = leftLen;

  while (i) {
    if (left[i] !== right[i]) return false;
    i--;
  }

  return true;
}

function split(str) {
  var a = 1;
  var res = '';
  var parts = str.split('%'),
      len = parts.length;

  if (len > 0) {
    res += parts[0];
  }

  for (var i = 1; i < len; i++) {
    if (parts[i][0] === 's' || parts[i][0] === 'd') {
      var value = arguments[a++];
      res += parts[i][0] === 'd' ? Math.floor(value) : value;
    } else if (parts[i][0]) {
      res += '%' + parts[i][0];
    } else {
      i++;
      res += '%' + parts[i][0];
    }

    res += parts[i].substring(1);
  }

  return res;
}

var regex = /%[sdj]/;

function format(message) {
  if (regex.test(message)) return split.apply(null, arguments);
  return Array.from(arguments).join(' ');
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var shallowEqual_1 = shallowEqual;

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createChangeEmitter = exports.createChangeEmitter = function createChangeEmitter() {
  var currentListeners = [];
  var nextListeners = currentListeners;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  function listen(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function () {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  function emit() {
    currentListeners = nextListeners;
    var listeners = currentListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(listeners, arguments);
    }
  }

  return {
    listen: listen,
    emit: emit
  };
};
});

unwrapExports(lib);
var lib_1 = lib.createChangeEmitter;

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */

    return BaseComponent;
  };
};

var setDisplayName = function setDisplayName(displayName) {
  return setStatic('displayName', displayName);
};

var getDisplayName = function getDisplayName(Component$$1) {
  if (typeof Component$$1 === 'string') {
    return Component$$1;
  }

  if (!Component$$1) {
    return undefined;
  }

  return Component$$1.displayName || Component$$1.name || 'Component';
};

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + "(" + getDisplayName(BaseComponent) + ")";
};

var pick = function pick(obj, keys) {
  var result = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

var shouldUpdate = function shouldUpdate(test) {
  return function (BaseComponent) {
    var factory = React.createFactory(BaseComponent);

    var ShouldUpdate =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(ShouldUpdate, _Component);

      function ShouldUpdate() {
        return _Component.apply(this, arguments) || this;
      }

      var _proto = ShouldUpdate.prototype;

      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return test(this.props, nextProps);
      };

      _proto.render = function render() {
        return factory(this.props);
      };

      return ShouldUpdate;
    }(React.Component);

    if (process.env.NODE_ENV !== 'production') {
      return setDisplayName(wrapDisplayName(BaseComponent, 'shouldUpdate'))(ShouldUpdate);
    }

    return ShouldUpdate;
  };
};

var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  var hoc = shouldUpdate(function (props, nextProps) {
    return !shallowEqual_1(pick(nextProps, propKeys), pick(props, propKeys));
  });

  if (process.env.NODE_ENV !== 'production') {
    return function (BaseComponent) {
      return setDisplayName(wrapDisplayName(BaseComponent, 'onlyUpdateForKeys'))(hoc(BaseComponent));
    };
  }

  return hoc;
};

// NEEDS REFACTOR

var isEmptyValue = function isEmptyValue(value) {
  return value === null || value === undefined || Array.isArray(value) && !value.length;
};

var Placeholder = function Placeholder(_ref) {
  var placeholder = _ref.placeholder,
      value = _ref.value,
      numberDisplayed = _ref.numberDisplayed,
      multiple = _ref.multiple,
      valueKey = _ref.valueKey,
      labelKey = _ref.labelKey,
      manySelectedPlaceholder = _ref.manySelectedPlaceholder,
      allSelectedPlaceholder = _ref.allSelectedPlaceholder,
      allSelected = _ref.allSelected;
  var message = '';

  if (isEmptyValue(value)) {
    message = placeholder;
  } else {
    if (Array.isArray(value) && multiple) {
      // If type is array and values length less than number displayed
      // join the values
      if (value.length <= numberDisplayed) {
        message = value.map(function (opt) {
          if (isDataObject(opt, valueKey, labelKey)) {
            return opt[labelKey];
          }

          return opt;
        }).join(', ');
      } else {
        // if many selected and not all selected then use the placeholder
        if (manySelectedPlaceholder && !allSelected) {
          // if it doesn't include the sprintf token then just use the placeholder
          message = includes(manySelectedPlaceholder, '%s') ? format(manySelectedPlaceholder, value.length) : manySelectedPlaceholder; //If all selected and there is an allselectedplaceholder use that
        } else if (allSelected && allSelectedPlaceholder) {
          // if it doesn't include the sprintf token then just use the placeholder
          message = includes(allSelectedPlaceholder, '%s') ? format(allSelectedPlaceholder, value.length) : allSelectedPlaceholder;
        }
      }
    } else {
      var tempValue = Array.isArray(value) ? value[0] : value;

      if (isDataObject(tempValue, valueKey, labelKey)) {
        message = tempValue[labelKey];
      } else {
        message = tempValue;
      }
    }
  }

  return React__default.createElement("span", {
    className: "picky__placeholder",
    "data-testid": "picky_placeholder"
  }, message);
};

Placeholder.defaultProps = {
  placeholder: 'None selected',
  allSelectedPlaceholder: '%s selected',
  manySelectedPlaceholder: '%s selected',
  allSelected: false
};
Placeholder.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.object]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  manySelectedPlaceholder: PropTypes.string,
  allSelectedPlaceholder: PropTypes.string,
  allSelected: PropTypes.bool
};
var Placeholder$1 = onlyUpdateForKeys(['multiple', 'value', 'numberDisplayed', 'allSelected', 'allSelectedPlaceholder'])(Placeholder);

function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Filter =
/*#__PURE__*/
function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, _getPrototypeOf(Filter).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.placeholder !== nextProps.placeholder || this.props.tabIndex !== nextProps.tabIndex;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return React__default.createElement("div", {
        className: "picky__filter"
      }, React__default.createElement("input", {
        type: "text",
        ref: function ref(input) {
          return _this.filterInput = input;
        },
        className: "picky__filter__input",
        "data-testid": "picky__filter__input",
        placeholder: this.props.placeholder,
        tabIndex: this.props.tabIndex,
        "aria-label": "filter options",
        onChange: function onChange(e) {
          return _this.props.onFilterChange(e.target.value);
        }
      }));
    }
  }]);

  return Filter;
}(React.Component);

Filter.defaultProps = {
  placeholder: 'Filter...'
};
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  tabIndex: PropTypes.number,
  placeholder: PropTypes.string
};

var Option = function Option(props) {
  var id = props.id,
      item = props.item,
      isSelected = props.isSelected,
      labelKey = props.labelKey,
      valueKey = props.valueKey,
      selectValue = props.selectValue,
      style = props.style,
      multiple = props.multiple,
      tabIndex = props.tabIndex,
      disabled = props.disabled;
  var cssOverride = item.cssOverride;
  var cssClass = isSelected ? 'option selected ' + cssOverride : 'option ' + cssOverride;
  var body = isDataObject(item, labelKey, valueKey) ? item[labelKey] : item;
  var inputType = multiple ? 'checkbox' : 'radio';

  var select = function select() {
    return !disabled && selectValue(item);
  };

  return React__default.createElement("div", {
    tabIndex: tabIndex,
    id: id,
    role: "option",
    style: style,
    "data-testid": "option",
    "data-selected": isSelected ? 'selected' : '',
    "aria-selected": isSelected,
    className: cssClass,
    onClick: select,
    onKeyPress: function onKeyPress(e) {
      e.preventDefault();

      if (!disabled) {
        selectValue(item);
      }
    }
  }, React__default.createElement("input", {
    type: inputType,
    readOnly: true,
    tabIndex: -1,
    disabled: disabled,
    checked: isSelected,
    "aria-label": body,
    "data-testid": 'option-checkbox'
  }), body);
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  id: PropTypes.string,
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  style: PropTypes.object,
  selectValue: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool
};
var Option$1 = onlyUpdateForKeys(['multiple', 'isSelected', 'id', 'item', 'tabIndex'])(Option);

function SelectAll(_ref) {
  var tabIndex = _ref.tabIndex,
      disabled = _ref.disabled,
      allSelected = _ref.allSelected,
      id = _ref.id,
      selectAllText = _ref.selectAllText,
      toggleSelectAll = _ref.toggleSelectAll,
      visible = _ref.visible;

  if (!visible) {
    return null;
  }

  return React__default.createElement("div", {
    tabIndex: tabIndex,
    role: "option",
    "data-testid": "selectall",
    id: id + '-option-' + 'selectall',
    "data-selectall": "true",
    "aria-selected": allSelected,
    className: allSelected ? 'option selected' : 'option',
    onClick: toggleSelectAll,
    disabled: disabled,
    onKeyPress: toggleSelectAll
  }, React__default.createElement("input", {
    type: "checkbox",
    readOnly: true,
    "data-testid": "selectall-checkbox",
    tabIndex: -1,
    checked: allSelected,
    "aria-label": "select all",
    disabled: disabled
  }), React__default.createElement("span", {
    "data-testid": "select-all-text"
  }, selectAllText));
}

SelectAll.propTypes = {
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  allSelected: PropTypes.bool,
  id: PropTypes.string.isRequired,
  selectAllText: PropTypes.string,
  toggleSelectAll: PropTypes.func.isRequired,
  visible: PropTypes.bool
};
var SelectAll$1 = onlyUpdateForKeys(['tabIndex', 'disabled', 'allSelected', 'selectAllText', 'visible'])(SelectAll);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Button(_ref) {
  var id = _ref.id,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ["id", "disabled", "onClick", "children", "className"]);

  var buttonId = "".concat(id, "__button");
  var classes = ['picky__input', disabled ? 'picky__input--disabled' : '', className].join(' ');
  return React__default.createElement("button", _extends({
    id: buttonId,
    type: "button",
    className: classes,
    onClick: onClick,
    "data-testid": "picky-input"
  }, rest), children);
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string
};
Button.displayName = 'Button';
var Button$1 = onlyUpdateForKeys(['disabled', 'children'])(Button);

function _typeof$2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }

function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }

function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }

function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

var Picky =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits$1(Picky, _React$PureComponent);

  function Picky(props) {
    var _this;

    _classCallCheck$1(this, Picky);

    _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(Picky).call(this, props));
    _this.state = {
      selectedValue: props.value || (props.multiple ? [] : null),
      open: props.open,
      filtered: false,
      filteredOptions: [],
      allSelected: false
    };
    _this.toggleDropDown = _this.toggleDropDown.bind(_assertThisInitialized$1(_this));
    _this.toggleSelectAll = _this.toggleSelectAll.bind(_assertThisInitialized$1(_this));
    _this.onFilterChange = _this.onFilterChange.bind(_assertThisInitialized$1(_this));
    _this.selectValue = _this.selectValue.bind(_assertThisInitialized$1(_this));
    _this.allSelected = _this.allSelected.bind(_assertThisInitialized$1(_this));
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_assertThisInitialized$1(_this));
    _this.isItemSelected = _this.isItemSelected.bind(_assertThisInitialized$1(_this));
    _this.focusFilterInput = _this.focusFilterInput.bind(_assertThisInitialized$1(_this));
    _this.getValue = _this.getValue.bind(_assertThisInitialized$1(_this));
    return _this;
  }

  _createClass$1(Picky, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.setState({
        allSelected: this.allSelected()
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.focusFilterInput(this.state.open);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.options !== nextProps.options || this.props.value !== nextProps.value) {
        var valuesEqual = Array.isArray(nextProps.value) ? arraysEqual(nextProps.value, this.props.value) : nextProps.value === this.props.value;
        var optsEqual = arraysEqual(nextProps.options, this.props.options);
        this.setState({
          allSelected: !(valuesEqual && optsEqual) ? this.allSelected(nextProps.value, nextProps.options) : this.allSelected()
        });
      }
    }
  }, {
    key: "selectValue",
    value: function selectValue(val) {
      var _this2 = this;

      var valueLookup = this.props.value;

      if (this.props.multiple && Array.isArray(valueLookup)) {
        var itemIndex = hasItemIndex(valueLookup, val, this.props.valueKey, this.props.labelKey);
        var selectedValue = [];

        if (itemIndex > -1) {
          selectedValue = [].concat(_toConsumableArray(valueLookup.slice(0, itemIndex)), _toConsumableArray(valueLookup.slice(itemIndex + 1)));
        } else {
          selectedValue = [].concat(_toConsumableArray(this.props.value), [val]);
        }

        this.setState({
          allSelected: this.allSelected(selectedValue)
        }, function () {
          _this2.props.onChange(selectedValue);
        });
      } else {
        this.props.onChange(val);
      }
    }
    /**
     * Get the value of a given option or value safely
     *
     * @param {*} option
     * @returns
     * @memberof Picky
     */

  }, {
    key: "getValue",
    value: function getValue(option) {
      return typeof this.props.valueKey !== 'undefined' ? option[this.props.valueKey] : option;
    }
    /**
     * Determine whether all items are selected
     *
     * @returns {Boolean}
     * @memberof Picky
     */

  }, {
    key: "allSelected",
    value: function allSelected(overrideSelected, overrideOptions) {
      var _this$props = this.props,
          value = _this$props.value,
          options = _this$props.options;
      var selectedValue = overrideSelected || value;
      var selectedOptions = overrideOptions || options; // If there are no options we are getting a false positive for all items being selected

      if (selectedOptions && selectedOptions.length === 0) {
        return false;
      }

      var copiedOptions = selectedOptions.map(this.getValue);
      var copiedValues = Array.isArray(selectedValue) ? selectedValue.map(this.getValue) : [];
      return arraysEqual(sortCollection(copiedValues), sortCollection(copiedOptions));
    }
    /**
     * Toggles select all
     *
     * @memberof Picky
     */

  }, {
    key: "toggleSelectAll",
    value: function toggleSelectAll() {
      var _this3 = this;

      if (this.props.disabled) return;
      this.setState(function (state) {
        return _objectSpread({}, state, {
          allSelected: !_this3.state.allSelected
        });
      }, function () {
        if (!_this3.state.allSelected) {
          _this3.props.onChange([]);
        } else {
          _this3.props.onChange(_this3.props.options);
        }
      });
    }
  }, {
    key: "isItemSelected",
    value: function isItemSelected(item) {
      return hasItem(this.props.value, item, this.props.valueKey, this.props.labelKey);
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var _this4 = this;

      var items = this.state.filtered ? this.state.filteredOptions : this.props.options;
      var _this$props2 = this.props,
          labelKey = _this$props2.labelKey,
          valueKey = _this$props2.valueKey,
          multiple = _this$props2.multiple,
          render = _this$props2.render,
          tabIndex = _this$props2.tabIndex,
          renderList = _this$props2.renderList,
          disabled = _this$props2.disabled;

      if (renderList) {
        return renderList({
          items: items,
          selected: this.props.value,
          multiple: multiple,
          tabIndex: tabIndex,
          getIsSelected: this.isItemSelected,
          selectValue: this.selectValue,
          disabled: disabled
        });
      }

      return items.map(function (item, index) {
        // Create a key based on the options value
        var key = keyExtractor(item, valueKey, labelKey);

        var isSelected = _this4.isItemSelected(item); // If render prop supplied for items call that.


        if (typeof render === 'function') {
          return render({
            index: index,
            item: item,
            isSelected: isSelected,
            selectValue: _this4.selectValue,
            labelKey: labelKey,
            valueKey: valueKey,
            multiple: multiple,
            disabled: disabled
          });
        } else {
          // Render a simple option
          return React__default.createElement(Option$1, {
            key: key,
            item: item,
            isSelected: isSelected,
            selectValue: _this4.selectValue,
            labelKey: labelKey,
            valueKey: valueKey,
            multiple: multiple,
            tabIndex: tabIndex,
            disabled: disabled,
            id: _this4.props.id + '-option-' + index
          });
        }
      });
    }
    /**
     * Called when Filter term changes. Sets filteredOptions and filtered state.
     *
     * @param {any} term
     * @returns
     * @memberof Picky
     */

  }, {
    key: "onFilterChange",
    value: function onFilterChange(term) {
      var _this5 = this;

      /**
       * getFilterValue function will provide the input value of filter to the picky dropdown, so that if we have a larger list of options then we can only supply the matching options based on this value
       */
      if (this.props.getFilterValue) {
        this.props.getFilterValue(term);
      }

      if (!term.trim()) {
        return this.setState({
          filtered: false,
          filteredOptions: []
        });
      }

      var isObject = isDataObject(this.props.options && this.props.options[0], this.props.valueKey, this.props.labelKey);
      var filteredOptions = this.props.options.filter(function (option) {
        if (isObject) {
          return includes(option[_this5.props.labelKey], term, _this5.props.caseSensitiveFilter);
        }

        return includes(option, term, _this5.props.caseSensitiveFilter);
      });
      this.setState({
        filtered: true,
        filteredOptions: filteredOptions
      }, function () {
        if (_this5.props.onFiltered) {
          _this5.props.onFiltered(filteredOptions);
        }
      });
    }
    /**
     *
     * Called by a click event listener. Used to determine any clicks that occur outside of the component.
     * @param {MouseEvent} e
     * @returns
     * @memberof Picky
     */

  }, {
    key: "handleOutsideClick",
    value: function handleOutsideClick(e) {
      // If keep open then don't toggle dropdown
      // If radio and not keepOpen then auto close it on selecting a value
      // If radio and click to the filter input then don't toggle dropdown
      var keepOpen = this.props.keepOpen || this.props.multiple;

      if (this.node && this.node.contains(e.target) && keepOpen) {
        return;
      }

      if (this.filter && this.filter.filterInput && this.filter.filterInput.contains(e.target)) {
        return;
      }

      this.toggleDropDown();
    }
  }, {
    key: "focusFilterInput",
    value: function focusFilterInput(isOpen) {
      if (isOpen && this.props.defaultFocusFilter) {
        if (this.filter && this.filter.filterInput) {
          this.filter.filterInput.focus();
        }
      }
    }
    /**
     * Toggle state of dropdown
     *
     * @memberof Picky
     */

  }, {
    key: "toggleDropDown",
    value: function toggleDropDown() {
      var _this6 = this;

      if (!this.state.open) {
        // Add event listener to listen for clicks to determine if click occured outside the component or not
        document.addEventListener('click', this.handleOutsideClick, false);
      } else {
        // Remove
        document.removeEventListener('click', this.handleOutsideClick, false);
      }

      this.setState(function (state) {
        return _objectSpread({}, state, {
          // Toggle open state
          open: !state.open
        });
      }, function () {
        var isOpen = _this6.state.open; // Prop callbacks

        _this6.focusFilterInput(isOpen);

        if (isOpen && _this6.props.onOpen) {
          _this6.props.onOpen();
        } else if (!isOpen && _this6.props.onClose) {
          _this6.props.onClose();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$props3 = this.props,
          className = _this$props3.className,
          placeholder = _this$props3.placeholder,
          value = _this$props3.value,
          multiple = _this$props3.multiple,
          numberDisplayed = _this$props3.numberDisplayed,
          includeFilter = _this$props3.includeFilter,
          valueKey = _this$props3.valueKey,
          labelKey = _this$props3.labelKey,
          tabIndex = _this$props3.tabIndex,
          dropdownHeight = _this$props3.dropdownHeight,
          renderSelectAll = _this$props3.renderSelectAll,
          filterPlaceholder = _this$props3.filterPlaceholder,
          disabled = _this$props3.disabled,
          buttonProps = _this$props3.buttonProps;
      var open = this.state.open;
      var ariaOwns = '';

      if (open) {
        ariaOwns += this.props.id + '-list';
      }

      var buttonId = "".concat(this.props.id, "__button");
      var dropdownStyle = {
        maxHeight: dropdownHeight,
        overflowY: 'scroll'
      };
      return React__default.createElement("div", {
        ref: function ref(node) {
          _this7.node = node;
        },
        className: ['picky', className].join(' '),
        id: this.props.id,
        role: "combobox",
        "aria-controls": buttonId,
        "aria-expanded": open,
        "aria-haspopup": open,
        "aria-owns": ariaOwns,
        tabIndex: tabIndex
      }, React__default.createElement(Button$1, _extends$1({
        id: "".concat(this.props.id, "__button"),
        disabled: disabled,
        onClick: this.toggleDropDown
      }, buttonProps), React__default.createElement(Placeholder$1, {
        allSelected: this.state.allSelected,
        placeholder: placeholder,
        manySelectedPlaceholder: this.props.manySelectedPlaceholder,
        allSelectedPlaceholder: this.props.allSelectedPlaceholder,
        value: value,
        multiple: multiple,
        numberDisplayed: numberDisplayed,
        valueKey: valueKey,
        labelKey: labelKey,
        "data-testid": "placeholder-component"
      })), React__default.createElement("div", {
        className: "picky__dropdown",
        id: this.props.id + '-list',
        "aria-hidden": !open,
        hidden: !open,
        style: open ? dropdownStyle : {
          visibility: 'hidden'
        }
      }, includeFilter && React__default.createElement(Filter, {
        ref: function ref(filter) {
          return _this7.filter = filter;
        },
        placeholder: filterPlaceholder,
        onFilterChange: this.filterDebounce
      }), renderSelectAll ? renderSelectAll({
        filtered: this.state.filtered,
        allSelected: this.state.allSelected,
        toggleSelectAll: this.toggleSelectAll,
        tabIndex: tabIndex,
        multiple: multiple,
        disabled: disabled
      }) : React__default.createElement(SelectAll$1, {
        visible: this.showSelectAll,
        tabIndex: tabIndex,
        disabled: disabled,
        allSelected: this.state.allSelected,
        id: this.props.id,
        selectAllText: this.props.selectAllText,
        toggleSelectAll: this.toggleSelectAll
      }), open && React__default.createElement("div", {
        "data-testid": "dropdown"
      }, this.renderOptions())));
    }
  }, {
    key: "filterDebounce",
    get: function get() {
      var filterDebounce = this.props.filterDebounce;
      return filterDebounce > 0 ? debounce(this.onFilterChange, filterDebounce) : this.onFilterChange;
    }
  }, {
    key: "showSelectAll",
    get: function get() {
      var _this$props4 = this.props,
          renderSelectAll = _this$props4.renderSelectAll,
          multiple = _this$props4.multiple,
          includeSelectAll = _this$props4.includeSelectAll;
      return !renderSelectAll && includeSelectAll && multiple && !this.state.filtered;
    }
  }]);

  return Picky;
}(React__default.PureComponent);

Picky.defaultProps = {
  numberDisplayed: 3,
  options: [],
  filterDebounce: 150,
  dropdownHeight: 300,
  onChange: function onChange() {},
  tabIndex: 0,
  keepOpen: true,
  selectAllText: 'Select all'
};
Picky.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number, PropTypes.object]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  includeSelectAll: PropTypes.bool,
  includeFilter: PropTypes.bool,
  filterDebounce: PropTypes.number,
  dropdownHeight: PropTypes.number,
  onFiltered: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  render: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  keepOpen: PropTypes.bool,
  manySelectedPlaceholder: PropTypes.string,
  allSelectedPlaceholder: PropTypes.string,
  selectAllText: PropTypes.string,
  renderSelectAll: PropTypes.func,
  defaultFocusFilter: PropTypes.bool,
  className: PropTypes.string,
  renderList: PropTypes.func,
  filterPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  getFilterValue: PropTypes.func,
  caseSensitiveFilter: PropTypes.bool,
  buttonProps: PropTypes.object
};

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function value(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

      var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


      var thisArg = arguments[1]; // 5. Let k be 0.

      var k = 0; // 6. Repeat, while k < len

      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];

        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        } // e. Increase k by 1.


        k++;
      } // 7. Return -1.


      return -1;
    }
  });
}

module.exports = Picky;
