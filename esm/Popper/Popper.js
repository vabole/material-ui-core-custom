import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import { chainPropTypes } from '@material-ui/utils';
import Portal from '../Portal';
import { createChainedFunction } from '../utils/helpers';
import { useForkRef } from '../utils/reactHelpers';

function flipPlacement(placement) {
  var direction = typeof window !== 'undefined' && document.body.getAttribute('dir') || 'ltr';

  if (direction !== 'rtl') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';

    case 'bottom-start':
      return 'bottom-end';

    case 'top-end':
      return 'top-start';

    case 'top-start':
      return 'top-end';

    default:
      return placement;
  }
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

var useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
var defaultPopperOptions = {};
/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */

var Popper = React.forwardRef(function Popper(props, ref) {
  var anchorEl = props.anchorEl,
      children = props.children,
      container = props.container,
      _props$disablePortal = props.disablePortal,
      disablePortal = _props$disablePortal === void 0 ? false : _props$disablePortal,
      _props$keepMounted = props.keepMounted,
      keepMounted = _props$keepMounted === void 0 ? false : _props$keepMounted,
      modifiers = props.modifiers,
      open = props.open,
      _props$placement = props.placement,
      placementProps = _props$placement === void 0 ? 'bottom' : _props$placement,
      _props$popperOptions = props.popperOptions,
      popperOptions = _props$popperOptions === void 0 ? defaultPopperOptions : _props$popperOptions,
      popperRefProp = props.popperRef,
      _props$transition = props.transition,
      transition = _props$transition === void 0 ? false : _props$transition,
      other = _objectWithoutProperties(props, ["anchorEl", "children", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition"]);

  var tooltipRef = React.useRef(null);
  var handleRef = useForkRef(tooltipRef, ref);
  var popperRef = React.useRef(null);
  var handlePopperRefRef = React.useRef();
  var handlePopperRef = useForkRef(popperRef, popperRefProp);
  useEnhancedEffect(function () {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, function () {
    return popperRef.current;
  }, []);

  var _React$useState = React.useState(!open),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      exited = _React$useState2[0],
      setExited = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      placement = _React$useState4[0],
      setPlacement = _React$useState4[1];

  var handleOpen = React.useCallback(function () {
    var handlePopperUpdate = function handlePopperUpdate(data) {
      if (data.placement !== placement) {
        setPlacement(data.placement);
      }
    };

    var popperNode = tooltipRef.current;

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      handlePopperRefRef.current(null);
    }

    var popper = new PopperJS(getAnchorEl(anchorEl), popperNode, _extends({
      placement: flipPlacement(placementProps)
    }, popperOptions, {
      modifiers: _extends({}, disablePortal ? {} : {
        // It's using scrollParent by default, we can use the viewport when using a portal.
        preventOverflow: {
          boundariesElement: 'window'
        }
      }, modifiers, popperOptions.modifiers),
      // We could have been using a custom modifier like react-popper is doing.
      // But it seems this is the best public API for this use case.
      onCreate: createChainedFunction(handlePopperUpdate, popperOptions.onCreate),
      onUpdate: createChainedFunction(handlePopperUpdate, popperOptions.onUpdate)
    }));
    handlePopperRefRef.current(popper);
  }, [anchorEl, disablePortal, modifiers, open, placement, placementProps, popperOptions]);

  var handleEnter = function handleEnter() {
    setExited(false);
  };

  var handleClose = function handleClose() {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current(null);
  };

  var handleExited = function handleExited() {
    setExited(true);
    handleClose();
  };

  React.useEffect(function () {
    // Let's update the popper position.
    handleOpen();
  }, [handleOpen]);
  React.useEffect(function () {
    return function () {
      handleClose();
    };
  }, []);
  React.useEffect(function () {
    if (!open && !transition) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open, transition]);

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  var childProps = {
    placement: placement || flipPlacement(placementProps)
  };

  if (transition) {
    childProps.TransitionProps = {
      in: open,
      onEnter: handleEnter,
      onExited: handleExited
    };
  }

  return React.createElement(Portal, {
    onRendered: handleOpen,
    disablePortal: disablePortal,
    container: container
  }, React.createElement("div", _extends({
    ref: handleRef,
    role: "tooltip",
    style: {
      // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
      position: 'absolute'
    }
  }, other), typeof children === 'function' ? children(childProps) : children));
});
process.env.NODE_ENV !== "production" ? Popper.propTypes = {
  /**
   * This is the reference element, or a function that returns the reference element,
   * that may be used to set the position of the popover.
   * The return value will passed as the reference object of the Popper
   * instance.
   *
   * The reference element should be an HTML Element instance or a referenceObject:
   * https://popper.js.org/popper-documentation.html#referenceObject.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([PropTypes.object, PropTypes.func]), function (props) {
    if (props.open) {
      var resolvedAnchorEl = getAnchorEl(props.anchorEl);

      if (resolvedAnchorEl instanceof Element) {
        var box = resolvedAnchorEl.getBoundingClientRect();

        if (process.env.NODE_ENV !== 'test' && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(['Material-UI: the `anchorEl` prop provided to the component is invalid.', 'The reference element should be part of the document layout.', "Make sure the element is present in the document or that it's not display none."].join('\n'));
        }
      } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.clientWidth !== 'number' || typeof resolvedAnchorEl.clientHeight !== 'number' || typeof resolvedAnchorEl.getBoundingClientRect !== 'function') {
        return new Error(['Material-UI: the `anchorEl` prop provided to the component is invalid.', 'It should be an HTML Element instance or a referenceObject:', 'https://popper.js.org/popper-documentation.html#referenceObject.'].join('\n'));
      }
    }

    return null;
  }),

  /**
   * Popper render function or node.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,

  /**
   * A node, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,

  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   */
  keepMounted: PropTypes.bool,

  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
   */
  modifiers: PropTypes.object,

  /**
   * If `true`, the popper is visible.
   */
  open: PropTypes.bool.isRequired,

  /**
   * Popper placement.
   */
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance.
   */
  popperOptions: PropTypes.object,

  /**
   * Callback fired when a new popper instance is used.
   */
  popperRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Help supporting a react-transition-group/Transition component.
   */
  transition: PropTypes.bool
} : void 0;
export default Popper;