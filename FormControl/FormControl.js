"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("../InputBase/utils");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _helpers = require("../utils/helpers");

var _reactHelpers = require("../utils/reactHelpers");

var _FormControlContext = _interopRequireDefault(require("./FormControlContext"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    // Reset fieldset default style.
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0,
    verticalAlign: 'top' // Fix alignment issue on Safari.

  },

  /* Styles applied to the root element if `margin="normal"`. */
  marginNormal: {
    marginTop: 16,
    marginBottom: 8
  },

  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    marginTop: 8,
    marginBottom: 4
  },

  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: '100%'
  }
};
/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 *
 * You can find one composition example below and more going to [the demos](/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️Only one input can be used within a FormControl.
 */

exports.styles = styles;

var FormControl = _react.default.forwardRef(function FormControl(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$error = props.error,
      error = _props$error === void 0 ? false : _props$error,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$margin = props.margin,
      margin = _props$margin === void 0 ? 'none' : _props$margin,
      _props$required = props.required,
      required = _props$required === void 0 ? false : _props$required,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "component", "disabled", "error", "fullWidth", "margin", "required", "variant"]);

  var _React$useState = _react.default.useState(function () {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    var initialAdornedStart = false;

    if (children) {
      _react.default.Children.forEach(children, function (child) {
        if (!(0, _reactHelpers.isMuiElement)(child, ['Input', 'Select'])) {
          return;
        }

        var input = (0, _reactHelpers.isMuiElement)(child, ['Select']) ? child.props.input : child;

        if (input && (0, _utils.isAdornedStart)(input.props)) {
          initialAdornedStart = true;
        }
      });
    }

    return initialAdornedStart;
  }),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 1),
      adornedStart = _React$useState2[0];

  var _React$useState3 = _react.default.useState(function () {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    var initialFilled = false;

    if (children) {
      _react.default.Children.forEach(children, function (child) {
        if (!(0, _reactHelpers.isMuiElement)(child, ['Input', 'Select'])) {
          return;
        }

        if ((0, _utils.isFilled)(child.props, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      filled = _React$useState4[0],
      setFilled = _React$useState4[1];

  var _React$useState5 = _react.default.useState(false),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      focused = _React$useState6[0],
      setFocused = _React$useState6[1];

  if (disabled && focused) {
    setFocused(false);
  }

  var handleFocus = function handleFocus() {
    setFocused(true);
  };

  var handleBlur = function handleBlur() {
    setFocused(false);
  };

  var handleDirty = function handleDirty() {
    if (!filled) {
      setFilled(true);
    }
  };

  var handleClean = function handleClean() {
    if (filled) {
      setFilled(false);
    }
  };

  var childContext = {
    adornedStart: adornedStart,
    disabled: disabled,
    error: error,
    filled: filled,
    focused: focused,
    margin: margin,
    onBlur: handleBlur,
    onEmpty: handleClean,
    onFilled: handleDirty,
    onFocus: handleFocus,
    required: required,
    variant: variant
  };
  return _react.default.createElement(_FormControlContext.default.Provider, {
    value: childContext
  }, _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, margin !== 'none' && classes["margin".concat((0, _helpers.capitalize)(margin))], fullWidth && classes.fullWidth),
    ref: ref
  }, other), children));
});

process.env.NODE_ENV !== "production" ? FormControl.propTypes = {
  /**
   * The contents of the form control.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the component will take up the full width of its container.
   */
  fullWidth: _propTypes.default.bool,

  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: _propTypes.default.oneOf(['none', 'dense', 'normal']),

  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: _propTypes.default.bool,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['standard', 'outlined', 'filled'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFormControl'
})(FormControl);

exports.default = _default;