"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _warning = _interopRequireDefault(require("warning"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _colorManipulator = require("../styles/colorManipulator");

var TRANSITION_DURATION = 4; // seconds

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      overflow: 'hidden',
      height: 4
    },

    /* Styles applied to the root & bar2 element if `color="primary"`; bar2 if `variant-"buffer"`. */
    colorPrimary: {
      backgroundColor: (0, _colorManipulator.lighten)(theme.palette.primary.light, 0.6)
    },

    /* Styles applied to the root & bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`. */
    colorSecondary: {
      backgroundColor: (0, _colorManipulator.lighten)(theme.palette.secondary.light, 0.4)
    },

    /* Styles applied to the root element if `variant="determinate"`. */
    determinate: {},

    /* Styles applied to the root element if `variant="indeterminate"`. */
    indeterminate: {},

    /* Styles applied to the root element if `variant="buffer"`. */
    buffer: {
      backgroundColor: 'transparent'
    },

    /* Styles applied to the root element if `variant="query"`. */
    query: {
      transform: 'rotate(180deg)'
    },

    /* Styles applied to the additional bar element if `variant="buffer"`. */
    dashed: {
      position: 'absolute',
      marginTop: 0,
      height: '100%',
      width: '100%',
      animation: 'buffer 3s infinite linear',
      // Backward compatible logic between JSS v9 and v10.
      // To remove with the release of Material-UI v4
      animationName: '$buffer'
    },

    /* Styles applied to the additional bar element if `variant="buffer"` & `color="primary"`. */
    dashedColorPrimary: {
      backgroundImage: "radial-gradient(".concat((0, _colorManipulator.lighten)(theme.palette.primary.light, 0.6), " 0%, ").concat((0, _colorManipulator.lighten)(theme.palette.primary.light, 0.6), " 16%, transparent 42%)"),
      backgroundSize: '10px 10px',
      backgroundPosition: '0px -23px'
    },

    /* Styles applied to the additional bar element if `variant="buffer"` & `color="secondary"`. */
    dashedColorSecondary: {
      backgroundImage: "radial-gradient(".concat((0, _colorManipulator.lighten)(theme.palette.secondary.light, 0.4), " 0%, ").concat((0, _colorManipulator.lighten)(theme.palette.secondary.light, 0.6), " 16%, transparent 42%)"),
      backgroundSize: '10px 10px',
      backgroundPosition: '0px -23px'
    },

    /* Styles applied to the layered bar1 & bar2 elements. */
    bar: {
      width: '100%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      top: 0,
      transition: 'transform 0.2s linear',
      transformOrigin: 'left'
    },

    /* Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer". */
    barColorPrimary: {
      backgroundColor: theme.palette.primary.main
    },

    /* Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer". */
    barColorSecondary: {
      backgroundColor: theme.palette.secondary.main
    },

    /* Styles applied to the bar1 element if `variant="indeterminate or query"`. */
    bar1Indeterminate: {
      width: 'auto',
      animation: 'mui-indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite',
      // Backward compatible logic between JSS v9 and v10.
      // To remove with the release of Material-UI v4
      animationName: '$mui-indeterminate1'
    },

    /* Styles applied to the bar1 element if `variant="determinate"`. */
    bar1Determinate: {
      transition: "transform .".concat(TRANSITION_DURATION, "s linear")
    },

    /* Styles applied to the bar1 element if `variant="buffer"`. */
    bar1Buffer: {
      zIndex: 1,
      transition: "transform .".concat(TRANSITION_DURATION, "s linear")
    },

    /* Styles applied to the bar2 element if `variant="indeterminate or query"`. */
    bar2Indeterminate: {
      width: 'auto',
      animation: 'mui-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
      // Backward compatible logic between JSS v9 and v10.
      // To remove with the release of Material-UI v4
      animationName: '$mui-indeterminate2',
      animationDelay: '1.15s'
    },

    /* Styles applied to the bar2 element if `variant="buffer"`. */
    bar2Buffer: {
      transition: "transform .".concat(TRANSITION_DURATION, "s linear")
    },
    // Legends:
    // || represents the viewport
    // -  represents a light background
    // x  represents a dark background
    '@keyframes mui-indeterminate1': {
      //  |-----|---x-||-----||-----|
      '0%': {
        left: '-35%',
        right: '100%'
      },
      //  |-----|-----||-----||xxxx-|
      '60%': {
        left: '100%',
        right: '-90%'
      },
      '100%': {
        left: '100%',
        right: '-90%'
      }
    },
    '@keyframes mui-indeterminate2': {
      //  |xxxxx|xxxxx||-----||-----|
      '0%': {
        left: '-200%',
        right: '100%'
      },
      //  |-----|-----||-----||-x----|
      '60%': {
        left: '107%',
        right: '-8%'
      },
      '100%': {
        left: '107%',
        right: '-8%'
      }
    },
    '@keyframes buffer': {
      '0%': {
        opacity: 1,
        backgroundPosition: '0px -23px'
      },
      '50%': {
        opacity: 0,
        backgroundPosition: '0px -23px'
      },
      '100%': {
        opacity: 1,
        backgroundPosition: '-200px -23px'
      }
    }
  };
};
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */


exports.styles = styles;

var LinearProgress = _react.default.forwardRef(function LinearProgress(props, ref) {
  var classes = props.classes,
      classNameProp = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      theme = props.theme,
      value = props.value,
      valueBuffer = props.valueBuffer,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'indeterminate' : _props$variant,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "color", "theme", "value", "valueBuffer", "variant"]);
  var className = (0, _clsx.default)(classes.root, classNameProp, color === 'primary' ? classes.colorPrimary : classes.colorSecondary, variant === 'determinate' && classes.determinate, variant === 'indeterminate' && classes.indeterminate, variant === 'buffer' && classes.buffer, variant === 'query' && classes.query);
  var dashedClass = (0, _clsx.default)(classes.dashed, color === 'primary' ? classes.dashedColorPrimary : classes.dashedColorSecondary);
  var bar1ClassName = (0, _clsx.default)(classes.bar, (variant === 'indeterminate' || variant === 'query') && classes.bar1Indeterminate, color === 'primary' ? classes.barColorPrimary : classes.barColorSecondary, variant === 'determinate' && classes.bar1Determinate, variant === 'buffer' && classes.bar1Buffer);
  var bar2ClassName = (0, _clsx.default)(classes.bar, (variant === 'indeterminate' || variant === 'query') && classes.bar2Indeterminate, variant === 'buffer' ? [classes.bar2Buffer, color === 'primary' ? classes.colorPrimary : classes.colorSecondary] : color === 'primary' ? classes.barColorPrimary : classes.barColorSecondary);
  var rootProps = {};
  var inlineStyles = {
    bar1: {},
    bar2: {}
  };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      var transform = value - 100;

      if (theme.direction === 'rtl') {
        transform = -transform;
      }

      inlineStyles.bar1.transform = "translateX(".concat(transform, "%)");
    } else {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'Material-UI: you need to provide a value property ' + 'when using the determinate or buffer variant of LinearProgress .') : void 0;
    }
  }

  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      var _transform = (valueBuffer || 0) - 100;

      if (theme.direction === 'rtl') {
        _transform = -_transform;
      }

      inlineStyles.bar2.transform = "translateX(".concat(_transform, "%)");
    } else {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'Material-UI: you need to provide a valueBuffer property ' + 'when using the buffer variant of LinearProgress.') : void 0;
    }
  }

  return _react.default.createElement("div", (0, _extends2.default)({
    className: className,
    role: "progressbar"
  }, rootProps, {
    ref: ref
  }, other), variant === 'buffer' ? _react.default.createElement("div", {
    className: dashedClass
  }) : null, _react.default.createElement("div", {
    className: bar1ClassName,
    style: inlineStyles.bar1
  }), variant === 'determinate' ? null : _react.default.createElement("div", {
    className: bar2ClassName,
    style: inlineStyles.bar2
  }));
});

process.env.NODE_ENV !== "production" ? LinearProgress.propTypes = {
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes.default.oneOf(['primary', 'secondary']),

  /**
   * @ignore
   */
  theme: _propTypes.default.object,

  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: _propTypes.default.number,

  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer: _propTypes.default.number,

  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   */
  variant: _propTypes.default.oneOf(['determinate', 'indeterminate', 'buffer', 'query'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiLinearProgress',
  withTheme: true
})(LinearProgress);

exports.default = _default;