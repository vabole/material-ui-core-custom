import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ListContext from '../List/ListContext';
export var styles = {
  /* Styles applied to the root element. */
  root: {
    minWidth: 56,
    flexShrink: 0
  },

  /* Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  alignItemsFlexStart: {
    marginTop: 8
  }
};
/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */

var ListItemAvatar = React.forwardRef(function ListItemAvatar(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ["classes", "className"]);

  var context = React.useContext(ListContext);
  return React.createElement("div", _extends({
    className: clsx(classes.root, className, context.alignItems === 'flex-start' && classes.alignItemsFlexStart),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemAvatar.propTypes = {
  /**
   * The content of the component – normally `Avatar`.
   */
  children: PropTypes.element.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string
} : void 0;
export default withStyles(styles, {
  name: 'MuiListItemAvatar'
})(ListItemAvatar);