import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { isFilled, isAdornedStart } from '../InputBase/utils';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { isMuiElement } from '../utils/reactHelpers';
import FormControlContext from './FormControlContext';
export var styles = {
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

var FormControl = React.forwardRef(function FormControl(props, ref) {
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
      other = _objectWithoutProperties(props, ["children", "classes", "className", "component", "disabled", "error", "fullWidth", "margin", "required", "variant"]);

  var _React$useState = React.useState(function () {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    var initialAdornedStart = false;

    if (children) {
      React.Children.forEach(children, function (child) {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        var input = isMuiElement(child, ['Select']) ? child.props.input : child;

        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }

    return initialAdornedStart;
  }),
      _React$useState2 = _slicedToArray(_React$useState, 1),
      adornedStart = _React$useState2[0];

  var _React$useState3 = React.useState(function () {
    // We need to iterate through the children and find the Input in order
    // to fully support server-side rendering.
    var initialFilled = false;

    if (children) {
      React.Children.forEach(children, function (child) {
        if (!isMuiElement(child, ['Input', 'Select'])) {
          return;
        }

        if (isFilled(child.props, true)) {
          initialFilled = true;
        }
      });
    }

    return initialFilled;
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      filled = _React$useState4[0],
      setFilled = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
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
  return React.createElement(FormControlContext.Provider, {
    value: childContext
  }, React.createElement(Component, _extends({
    className: clsx(classes.root, className, margin !== 'none' && classes["margin".concat(capitalize(margin))], fullWidth && classes.fullWidth),
    ref: ref
  }, other), children));
});
process.env.NODE_ENV !== "production" ? FormControl.propTypes = {
  /**
   * The contents of the form control.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,

  /**
   * If `true`, the component will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,

  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),

  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiFormControl'
})(FormControl);