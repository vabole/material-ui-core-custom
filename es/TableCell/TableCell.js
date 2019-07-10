import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { darken, fade, lighten } from '../styles/colorManipulator';
import TableContext from '../Table/TableContext';
import Tablelvl2Context from '../Table/Tablelvl2Context';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: _extends({}, theme.typography.body2, {
    display: 'table-cell',
    verticalAlign: 'inherit',
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: `1px solid
    ${theme.palette.type === 'light' ? lighten(fade(theme.palette.divider, 1), 0.88) : darken(fade(theme.palette.divider, 1), 0.68)}`,
    textAlign: 'left',
    padding: '14px 40px 14px 16px',
    '&:last-child': {
      paddingRight: 16
    }
  }),

  /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
  head: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: theme.typography.pxToRem(21),
    fontWeight: theme.typography.fontWeightMedium
  },

  /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
  body: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular
  },

  /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
  footer: {
    color: theme.palette.text.secondary,
    lineHeight: theme.typography.pxToRem(21),
    fontSize: theme.typography.pxToRem(12)
  },

  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    padding: '6px 24px 6px 16px',
    '&:last-child': {
      paddingRight: 16
    },
    '&$paddingCheckbox': {
      width: 24,
      // prevent the checkbox column from growing
      padding: '0px 12px 0 16px',
      '&:last-child': {
        paddingLeft: 12,
        paddingRight: 16
      },
      '& > *': {
        padding: 0
      }
    }
  },

  /* Styles applied to the root element if `padding="checkbox"`. */
  paddingCheckbox: {
    width: 48,
    // prevent the checkbox column from growing
    padding: '0 0 0 4px',
    '&:last-child': {
      paddingLeft: 0,
      paddingRight: 4
    }
  },

  /* Styles applied to the root element if `padding="none"`. */
  paddingNone: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  },

  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {
    textAlign: 'left'
  },

  /* Styles applied to the root element if `align="center"`. */
  alignCenter: {
    textAlign: 'center'
  },

  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: 'right',
    flexDirection: 'row-reverse'
  },

  /* Styles applied to the root element if `align="justify"`. */
  alignJustify: {
    textAlign: 'justify'
  }
});
const TableCell = React.forwardRef(function TableCell(props, ref) {
  const {
    align = 'inherit',
    classes,
    className,
    component,
    padding: paddingProp,
    scope: scopeProp,
    size: sizeProp,
    sortDirection,
    variant
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["align", "classes", "className", "component", "padding", "scope", "size", "sortDirection", "variant"]);

  const table = React.useContext(TableContext);
  const tablelvl2 = React.useContext(Tablelvl2Context);
  let Component;

  if (component) {
    Component = component;
  } else {
    Component = tablelvl2 && tablelvl2.variant === 'head' ? 'th' : 'td';
  }

  let scope = scopeProp;

  if (!scope && tablelvl2 && tablelvl2.variant === 'head') {
    scope = 'col';
  }

  const padding = paddingProp || (table && table.padding ? table.padding : 'default');
  const size = sizeProp || (table && table.size ? table.size : 'medium');
  let ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return React.createElement(Component, _extends({
    ref: ref,
    className: clsx(classes.root, className, (variant ? variant === 'head' : tablelvl2 && tablelvl2.variant === 'head') && classes.head, (variant ? variant === 'body' : tablelvl2 && tablelvl2.variant === 'body') && classes.body, (variant ? variant === 'footer' : tablelvl2 && tablelvl2.variant === 'footer') && classes.footer, align !== 'inherit' && classes[`align${capitalize(align)}`], padding !== 'default' && classes[`padding${capitalize(padding)}`], size !== 'medium' && classes[`size${capitalize(size)}`]),
    "aria-sort": ariaSort,
    scope: scope
  }, other));
});
process.env.NODE_ENV !== "production" ? TableCell.propTypes = {
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   */
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),

  /**
   * The table cell contents.
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
   * Sets the padding applied to the cell.
   * By default, the Table parent component set the value (`default`).
   */
  padding: PropTypes.oneOf(['default', 'checkbox', 'none']),

  /**
   * Set scope attribute.
   */
  scope: PropTypes.string,

  /**
   * Specify the size of the cell.
   * By default, the Table parent component set the value (`medium`).
   */
  size: PropTypes.oneOf(['small', 'medium']),

  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),

  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant: PropTypes.oneOf(['head', 'body', 'footer'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiTableCell'
})(TableCell);