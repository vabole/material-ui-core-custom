import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 1,
    margin: 0,
    // Reset browser default style.
    border: 'none',
    flexShrink: 0,
    backgroundColor: theme.palette.divider
  },

  /* Styles applied to the root element if `absolute={true}`. */
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },

  /* Styles applied to the root element if `variant="inset"`. */
  inset: {
    marginLeft: 72
  },

  /* Styles applied to the root element if `light={true}`. */
  light: {
    backgroundColor: fade(theme.palette.divider, 0.08)
  },

  /* Styles applied to the root element if `variant="middle"`. */
  middle: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
});
const Divider = React.forwardRef(function Divider(props, ref) {
  const {
    absolute = false,
    classes,
    className,
    component: Component = 'hr',
    light = false,
    role = Component !== 'hr' ? 'separator' : undefined,
    variant = 'fullWidth'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["absolute", "classes", "className", "component", "light", "role", "variant"]);

  return React.createElement(Component, _extends({
    className: clsx(classes.root, className, variant === 'inset' && classes.inset, variant === 'middle' && classes.middle, absolute && classes.absolute, light && classes.light),
    role: role,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Divider.propTypes = {
  /**
   * Absolutely position the element.
   */
  absolute: PropTypes.bool,

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
   * If `true`, the divider will have a lighter color.
   */
  light: PropTypes.bool,

  /**
   * @ignore
   */
  role: PropTypes.string,

  /**
   *  The variant to use.
   */
  variant: PropTypes.oneOf(['fullWidth', 'inset', 'middle'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiDivider'
})(Divider);