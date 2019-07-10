"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _clsx = _interopRequireDefault(require("clsx"));

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var _ownerWindow = _interopRequireDefault(require("../utils/ownerWindow"));

var _normalizeScrollLeft = require("normalize-scroll-left");

var _animate = _interopRequireDefault(require("../internal/animate"));

var _ScrollbarSize = _interopRequireDefault(require("./ScrollbarSize"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _TabIndicator = _interopRequireDefault(require("./TabIndicator"));

var _TabScrollButton = _interopRequireDefault(require("./TabScrollButton"));

var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));

/* eslint-disable no-restricted-globals */
var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      overflow: 'hidden',
      minHeight: 48,
      WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.

    },

    /* Styles applied to the flex container element. */
    flexContainer: {
      display: 'flex'
    },

    /* Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`. */
    centered: {
      justifyContent: 'center'
    },

    /* Styles applied to the tablist element. */
    scroller: {
      position: 'relative',
      display: 'inline-block',
      flex: '1 1 auto',
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the tablist element if `!variant="scrollable"`. */
    fixed: {
      overflowX: 'hidden',
      width: '100%'
    },

    /* Styles applied to the tablist element if `variant="scrollable"`. */
    scrollable: {
      overflowX: 'scroll',
      // Hide dimensionless scrollbar on MacOS
      scrollbarWidth: 'none',
      // Firefox
      '&::-webkit-scrollbar': {
        display: 'none' // Safari + Chrome

      }
    },

    /* Styles applied to the `ScrollButtonComponent` component. */
    scrollButtons: {},

    /* Styles applied to the `ScrollButtonComponent` component if `scrollButtons="auto"` or scrollButtons="desktop"`. */
    scrollButtonsDesktop: (0, _defineProperty2.default)({}, theme.breakpoints.down('xs'), {
      display: 'none'
    }),

    /* Styles applied to the `TabIndicator` component. */
    indicator: {}
  };
};

exports.styles = styles;

var Tabs = _react.default.forwardRef(function Tabs(props, ref) {
  var action = props.action,
      _props$centered = props.centered,
      centered = _props$centered === void 0 ? false : _props$centered,
      childrenProp = props.children,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$indicatorColor = props.indicatorColor,
      indicatorColor = _props$indicatorColor === void 0 ? 'secondary' : _props$indicatorColor,
      onChange = props.onChange,
      _props$ScrollButtonCo = props.ScrollButtonComponent,
      ScrollButtonComponent = _props$ScrollButtonCo === void 0 ? _TabScrollButton.default : _props$ScrollButtonCo,
      _props$scrollButtons = props.scrollButtons,
      scrollButtons = _props$scrollButtons === void 0 ? 'auto' : _props$scrollButtons,
      _props$TabIndicatorPr = props.TabIndicatorProps,
      TabIndicatorProps = _props$TabIndicatorPr === void 0 ? {} : _props$TabIndicatorPr,
      _props$textColor = props.textColor,
      textColor = _props$textColor === void 0 ? 'inherit' : _props$textColor,
      theme = props.theme,
      value = props.value,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      other = (0, _objectWithoutProperties2.default)(props, ["action", "centered", "children", "classes", "className", "component", "indicatorColor", "onChange", "ScrollButtonComponent", "scrollButtons", "TabIndicatorProps", "textColor", "theme", "value", "variant"]);
  var scrollable = variant === 'scrollable';
  var isRtl = theme.direction === 'rtl';
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!centered || !scrollable, 'Material-UI: you can not use the `centered={true}` and `variant="scrollable"` properties ' + 'at the same time on a `Tabs` component.') : void 0;

  var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      mounted = _React$useState2[0],
      setMounted = _React$useState2[1];

  var _React$useState3 = _react.default.useState({}),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      indicatorStyle = _React$useState4[0],
      setIndicatorStyle = _React$useState4[1];

  var _React$useState5 = _react.default.useState({
    left: false,
    right: false
  }),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      displayScroll = _React$useState6[0],
      setDisplayScroll = _React$useState6[1];

  var _React$useState7 = _react.default.useState({
    overflow: 'hidden',
    marginBottom: null
  }),
      _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
      scrollerStyle = _React$useState8[0],
      setScrollerStyle = _React$useState8[1];

  var valueToIndex = new Map();

  var tabsRef = _react.default.useRef(null);

  var getTabsMeta = function getTabsMeta() {
    var tabsNode = tabsRef.current;
    var tabsMeta;

    if (tabsNode) {
      var rect = tabsNode.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollLeftNormalized: (0, _normalizeScrollLeft.getNormalizedScrollLeft)(tabsNode, theme.direction),
        scrollWidth: tabsNode.scrollWidth,
        left: rect.left,
        right: rect.right
      };
    }

    var tabMeta;

    if (tabsNode && value !== false) {
      var _children = tabsNode.children[0].children;

      if (_children.length > 0) {
        var tab = _children[valueToIndex.get(value)];

        process.env.NODE_ENV !== "production" ? (0, _warning.default)(tab, ["Material-UI: the value provided `".concat(value, "` to the Tabs component is invalid."), 'None of the Tabs children have this value.', valueToIndex.keys ? "You can provide one of the following values: ".concat(Array.from(valueToIndex.keys()).join(', '), ".") : null].join('\n')) : void 0;
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }

    return {
      tabsMeta: tabsMeta,
      tabMeta: tabMeta
    };
  };

  var updateIndicatorState = (0, _useEventCallback.default)(function () {
    var _getTabsMeta = getTabsMeta(),
        tabsMeta = _getTabsMeta.tabsMeta,
        tabMeta = _getTabsMeta.tabMeta;

    var left = 0;

    if (tabMeta && tabsMeta) {
      var correction = isRtl ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
      left = Math.round(tabMeta.left - tabsMeta.left + correction);
    }

    var newIndicatorStyle = {
      left: left,
      // May be wrong until the font is loaded.
      width: tabMeta ? Math.round(tabMeta.width) : 0
    };

    if ((newIndicatorStyle.left !== indicatorStyle.left || newIndicatorStyle.width !== indicatorStyle.width) && !isNaN(newIndicatorStyle.left) && !isNaN(newIndicatorStyle.width)) {
      setIndicatorStyle(newIndicatorStyle);
    }
  });

  var scroll = function scroll(scrollValue) {
    (0, _animate.default)('scrollLeft', tabsRef.current, scrollValue);
  };

  var moveTabsScroll = function moveTabsScroll(delta) {
    var multiplier = isRtl ? -1 : 1;
    var nextScrollLeft = tabsRef.current.scrollLeft + delta * multiplier; // Fix for Edge

    var invert = isRtl && (0, _normalizeScrollLeft.detectScrollType)() === 'reverse' ? -1 : 1;
    scroll(invert * nextScrollLeft);
  };

  var handleLeftScrollClick = function handleLeftScrollClick() {
    moveTabsScroll(-tabsRef.current.clientWidth);
  };

  var handleRightScrollClick = function handleRightScrollClick() {
    moveTabsScroll(tabsRef.current.clientWidth);
  };

  var handleScrollbarSizeChange = _react.default.useCallback(function (scrollbarHeight) {
    setScrollerStyle({
      overflow: null,
      marginBottom: -scrollbarHeight
    });
  }, []);

  var getConditionalElements = function getConditionalElements() {
    var conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? _react.default.createElement(_ScrollbarSize.default, {
      className: classes.scrollable,
      onChange: handleScrollbarSizeChange
    }) : null;
    var scrollButtonsActive = displayScroll.left || displayScroll.right;
    var showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === 'desktop' || scrollButtons === 'on');
    conditionalElements.scrollButtonLeft = showScrollButtons ? _react.default.createElement(ScrollButtonComponent, {
      direction: isRtl ? 'right' : 'left',
      onClick: handleLeftScrollClick,
      visible: displayScroll.left,
      className: (0, _clsx.default)(classes.scrollButtons, scrollButtons !== 'on' && classes.scrollButtonsDesktop)
    }) : null;
    conditionalElements.scrollButtonRight = showScrollButtons ? _react.default.createElement(ScrollButtonComponent, {
      direction: isRtl ? 'left' : 'right',
      onClick: handleRightScrollClick,
      visible: displayScroll.right,
      className: (0, _clsx.default)(classes.scrollButtons, scrollButtons !== 'on' && classes.scrollButtonsDesktop)
    }) : null;
    return conditionalElements;
  };

  var scrollSelectedIntoView = (0, _useEventCallback.default)(function () {
    var _getTabsMeta2 = getTabsMeta(),
        tabsMeta = _getTabsMeta2.tabsMeta,
        tabMeta = _getTabsMeta2.tabMeta;

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      var nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      scroll(nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      var _nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);

      scroll(_nextScrollLeft);
    }
  });
  var updateScrollButtonState = (0, _useEventCallback.default)(function () {
    if (scrollable && scrollButtons !== 'off') {
      var _tabsRef$current = tabsRef.current,
          scrollWidth = _tabsRef$current.scrollWidth,
          clientWidth = _tabsRef$current.clientWidth;
      var scrollLeft = (0, _normalizeScrollLeft.getNormalizedScrollLeft)(tabsRef.current, theme.direction); // use 1 for the potential rounding error with browser zooms.

      var showLeftScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      var showRightScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;

      if (showLeftScroll !== displayScroll.left || showRightScroll !== displayScroll.right) {
        setDisplayScroll({
          left: showLeftScroll,
          right: showRightScroll
        });
      }
    }
  });

  _react.default.useEffect(function () {
    var handleResize = (0, _debounce.default)(function () {
      updateIndicatorState();
      updateScrollButtonState();
    });
    var win = (0, _ownerWindow.default)(tabsRef.current);
    win.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
    };
  }, [updateIndicatorState, updateScrollButtonState]);

  var handleTabsScroll = _react.default.useCallback((0, _debounce.default)(function () {
    updateScrollButtonState();
  }));

  _react.default.useEffect(function () {
    return function () {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);

  _react.default.useEffect(function () {
    setMounted(true);
  }, []);

  _react.default.useEffect(function () {
    updateIndicatorState();
    updateScrollButtonState();
  });

  _react.default.useEffect(function () {
    scrollSelectedIntoView();
  }, [scrollSelectedIntoView, indicatorStyle]);

  _react.default.useImperativeHandle(action, function () {
    return {
      updateIndicator: updateIndicatorState
    };
  }, [updateIndicatorState]);

  var indicator = _react.default.createElement(_TabIndicator.default, (0, _extends2.default)({
    className: classes.indicator,
    color: indicatorColor
  }, TabIndicatorProps, {
    style: (0, _extends2.default)({}, indicatorStyle, TabIndicatorProps.style)
  }));

  var childIndex = 0;

  var children = _react.default.Children.map(childrenProp, function (child) {
    if (!_react.default.isValidElement(child)) {
      return null;
    }

    process.env.NODE_ENV !== "production" ? (0, _warning.default)(child.type !== _react.default.Fragment, ["Material-UI: the Tabs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
    var childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    var selected = childValue === value;
    childIndex += 1;
    return _react.default.cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected: selected,
      onChange: onChange,
      textColor: textColor,
      value: childValue
    });
  });

  var conditionalElements = getConditionalElements();
  return _react.default.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other), _react.default.createElement("div", {
    className: classes.flexContainer
  }, conditionalElements.scrollButtonLeft, conditionalElements.scrollbarSizeListener, _react.default.createElement("div", {
    className: (0, _clsx.default)(classes.scroller, scrollable ? classes.scrollable : classes.fixed),
    style: scrollerStyle,
    ref: tabsRef,
    role: "tablist",
    onScroll: handleTabsScroll
  }, _react.default.createElement("div", {
    className: (0, _clsx.default)(classes.flexContainer, centered && !scrollable && classes.centered)
  }, children), mounted && indicator), conditionalElements.scrollButtonRight));
});

process.env.NODE_ENV !== "production" ? Tabs.propTypes = {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `updateIndicator()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: _propTypes.default.func,

  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered: _propTypes.default.bool,

  /**
   * The content of the component.
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
   * Determines the color of the indicator.
   */
  indicatorColor: _propTypes.default.oneOf(['secondary', 'primary']),

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {any} value We default to the index of the child (number)
   */
  onChange: _propTypes.default.func,

  /**
   * The component used to render the scroll buttons.
   */
  ScrollButtonComponent: _propTypes.default.elementType,

  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `desktop` will only present them on medium and larger viewports.
   * - `on` will always present them.
   * - `off` will never present them.
   */
  scrollButtons: _propTypes.default.oneOf(['auto', 'desktop', 'on', 'off']),

  /**
   * Properties applied to the `TabIndicator` element.
   */
  TabIndicatorProps: _propTypes.default.object,

  /**
   * Determines the color of the `Tab`.
   */
  textColor: _propTypes.default.oneOf(['secondary', 'primary', 'inherit']),

  /**
   * @ignore
   */
  theme: _propTypes.default.object.isRequired,

  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: _propTypes.default.any,

  /**
   *  Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  -`fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   */
  variant: _propTypes.default.oneOf(['standard', 'scrollable', 'fullWidth'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTabs',
  withTheme: true
})(Tabs);

exports.default = _default;