"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHorizontal = isHorizontal;
exports.getAnchor = getAnchor;
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _Backdrop = _interopRequireDefault(require("../Backdrop"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Slide = _interopRequireDefault(require("../Slide"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _helpers = require("../utils/helpers");

var _transitions = require("../styles/transitions");

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {},

    /* Styles applied to the root element if `variant="permanent or persistent"`. */
    docked: {
      flex: '0 0 auto'
    },

    /* Styles applied to the `Paper` component. */
    paper: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flex: '1 0 auto',
      zIndex: theme.zIndex.drawer,
      WebkitOverflowScrolling: 'touch',
      // Add iOS momentum scrolling.
      // temporary style
      position: 'fixed',
      top: 0,
      // We disable the focus ring for mouse, touch and keyboard users.
      // At some point, it would be better to keep it for keyboard users.
      // :focus-ring CSS pseudo-class will help.
      outline: 'none'
    },

    /* Styles applied to the `Paper` component if `anchor="left"`. */
    paperAnchorLeft: {
      left: 0,
      right: 'auto'
    },

    /* Styles applied to the `Paper` component if `anchor="right"`. */
    paperAnchorRight: {
      left: 'auto',
      right: 0
    },

    /* Styles applied to the `Paper` component if `anchor="top"`. */
    paperAnchorTop: {
      top: 0,
      left: 0,
      bottom: 'auto',
      right: 0,
      height: 'auto',
      maxHeight: '100%'
    },

    /* Styles applied to the `Paper` component if `anchor="bottom"`. */
    paperAnchorBottom: {
      top: 'auto',
      left: 0,
      bottom: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100%'
    },

    /* Styles applied to the `Paper` component if `anchor="left"` & `variant` is not "temporary". */
    paperAnchorDockedLeft: {
      borderRight: "1px solid ".concat(theme.palette.divider)
    },

    /* Styles applied to the `Paper` component if `anchor="top"` & `variant` is not "temporary". */
    paperAnchorDockedTop: {
      borderBottom: "1px solid ".concat(theme.palette.divider)
    },

    /* Styles applied to the `Paper` component if `anchor="right"` & `variant` is not "temporary". */
    paperAnchorDockedRight: {
      borderLeft: "1px solid ".concat(theme.palette.divider)
    },

    /* Styles applied to the `Paper` component if `anchor="bottom"` & `variant` is not "temporary". */
    paperAnchorDockedBottom: {
      borderTop: "1px solid ".concat(theme.palette.divider)
    },

    /* Styles applied to the `Modal` component. */
    modal: {}
  };
};

exports.styles = styles;
var oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};

function isHorizontal(anchor) {
  return ['left', 'right'].indexOf(anchor) !== -1;
}

function getAnchor(theme, anchor) {
  return theme.direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

var defaultTransitionDuration = {
  enter: _transitions.duration.enteringScreen,
  exit: _transitions.duration.leavingScreen
};
/**
 * The properties of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */

var Drawer = _react.default.forwardRef(function Drawer(props, ref) {
  var _props$anchor = props.anchor,
      anchorProp = _props$anchor === void 0 ? 'left' : _props$anchor,
      BackdropProps = props.BackdropProps,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$elevation = props.elevation,
      elevation = _props$elevation === void 0 ? 16 : _props$elevation,
      _props$ModalProps = props.ModalProps;
  _props$ModalProps = _props$ModalProps === void 0 ? {} : _props$ModalProps;
  var BackdropPropsProp = _props$ModalProps.BackdropProps,
      ModalProps = (0, _objectWithoutProperties2.default)(_props$ModalProps, ["BackdropProps"]),
      onClose = props.onClose,
      _props$open = props.open,
      open = _props$open === void 0 ? false : _props$open,
      PaperProps = props.PaperProps,
      SlideProps = props.SlideProps,
      theme = props.theme,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? defaultTransitionDuration : _props$transitionDura,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'temporary' : _props$variant,
      other = (0, _objectWithoutProperties2.default)(props, ["anchor", "BackdropProps", "children", "classes", "className", "elevation", "ModalProps", "onClose", "open", "PaperProps", "SlideProps", "theme", "transitionDuration", "variant"]); // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.

  var mounted = _react.default.useRef(false);

  _react.default.useEffect(function () {
    mounted.current = true;
  }, []);

  var anchor = getAnchor(theme, anchorProp);

  var drawer = _react.default.createElement(_Paper.default, (0, _extends2.default)({
    elevation: variant === 'temporary' ? elevation : 0,
    square: true,
    className: (0, _clsx.default)(classes.paper, classes["paperAnchor".concat((0, _helpers.capitalize)(anchor))], variant !== 'temporary' && classes["paperAnchorDocked".concat((0, _helpers.capitalize)(anchor))])
  }, PaperProps), children);

  if (variant === 'permanent') {
    return _react.default.createElement("div", (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, classes.docked, className),
      ref: ref
    }, other), drawer);
  }

  var slidingDrawer = _react.default.createElement(_Slide.default, (0, _extends2.default)({
    in: open,
    direction: oppositeDirection[anchor],
    timeout: transitionDuration,
    appear: mounted.current
  }, SlideProps), drawer);

  if (variant === 'persistent') {
    return _react.default.createElement("div", (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, classes.docked, className)
    }, other), slidingDrawer);
  } // variant === temporary


  return _react.default.createElement(_Modal.default, (0, _extends2.default)({
    BackdropProps: (0, _extends2.default)({}, BackdropProps, BackdropPropsProp, {
      transitionDuration: transitionDuration
    }),
    BackdropComponent: _Backdrop.default,
    className: (0, _clsx.default)(classes.root, classes.modal, className),
    open: open,
    onClose: onClose,
    ref: ref
  }, other, ModalProps), slidingDrawer);
});

process.env.NODE_ENV !== "production" ? Drawer.propTypes = {
  /**
   * Side from which the drawer will appear.
   */
  anchor: _propTypes.default.oneOf(['left', 'top', 'right', 'bottom']),

  /**
   * @ignore
   */
  BackdropProps: _propTypes.default.object,

  /**
   * The contents of the drawer.
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
   * The elevation of the drawer.
   */
  elevation: _propTypes.default.number,

  /**
   * Properties applied to the [`Modal`](/api/modal/) element.
   */
  ModalProps: _propTypes.default.object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: _propTypes.default.func,

  /**
   * If `true`, the drawer is open.
   */
  open: _propTypes.default.bool,

  /**
   * Properties applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: _propTypes.default.object,

  /**
   * Properties applied to the [`Slide`](/api/slide/) element.
   */
  SlideProps: _propTypes.default.object,

  /**
   * @ignore
   */
  theme: _propTypes.default.object.isRequired,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiDrawer',
  flip: false,
  withTheme: true
})(Drawer);

exports.default = _default;