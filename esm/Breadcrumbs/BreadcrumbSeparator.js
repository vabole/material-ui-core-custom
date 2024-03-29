import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
var styles = {
  root: {
    display: 'flex',
    userSelect: 'none',
    marginLeft: 8,
    marginRight: 8
  }
};
/**
 * @ignore - internal component.
 */

function BreadcrumbSeparator(props) {
  var classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ["classes", "className"]);

  return React.createElement("li", _extends({
    "aria-hidden": true,
    className: clsx(classes.root, className)
  }, other));
}

process.env.NODE_ENV !== "production" ? BreadcrumbSeparator.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
} : void 0;
export default withStyles(styles, {
  name: 'PrivateBreadcrumbSeparator'
})(BreadcrumbSeparator);