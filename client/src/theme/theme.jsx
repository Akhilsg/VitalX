import {
  accordionClasses,
  accordionSummaryClasses,
  alertClasses,
  checkboxClasses,
  chipClasses,
  inputBaseClasses,
  listClasses,
  radioClasses,
  ratingClasses,
  sliderClasses,
  svgIconClasses,
  tabClasses,
  tableCellClasses,
  tableRowClasses,
  tooltipClasses,
  typographyClasses,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ArrowDownIcon from "./icons/ArrowDown";
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
  CheckboxIndeterminateIcon,
} from "./icons/Checkbox";
import { RadioCheckedIcon, RadioIcon } from "./icons/Radio";
import { RatingIcon } from "./icons/Rating";
import { menuItem, paper } from "./mixins";
import { pxToRem } from "./pxToRem";
import { responsiveFontSizes } from "./responsiveFontSizes";
import { varAlpha } from "./varAlpha";
import {
  AlertErrorIcon,
  AlertInfoIcon,
  AlertSuccessIcon,
  AlertWarningIcon,
} from "./icons/Alert";
import { ChipDeleteIcon } from "./icons/Chip";

const COLORS = ["primary", "secondary", "info", "success", "warning", "error"];

export function setFont(fontName) {
  return `"${fontName}",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`;
}

const SIZE = {
  rail: { small: 6, medium: 10 },
  thumb: { small: 16, medium: 20 },
  mark: { small: 4, medium: 6 },
};

// function styleColor(ownerState, styles) {
//   const outputStyle = COLORS.reduce((acc, color) => {
//     if (!ownerState.disabled && ownerState.color === color) {
//       acc = styles(color);
//     }
//     return acc;
//   }, {});

//   return outputStyle;
// }

function styleColors(ownerState, styles) {
  const outputStyle = COLORS.reduce((acc, color) => {
    if (ownerState.severity === color) {
      acc = styles(color);
    }
    return acc;
  }, {});

  return outputStyle;
}

const softVariant = {
  colors: COLORS.map((color) => ({
    props: ({ ownerState }) =>
      !ownerState.disabled &&
      ownerState.variant === "soft" &&
      ownerState.color === color,
    style: ({ theme }) => ({
      backgroundColor: varAlpha(theme.palette[color].mainChannel, 0.16),
      "&:hover": {
        backgroundColor: varAlpha(theme.palette[color].mainChannel, 0.32),
      },
      color: theme.palette[color].light,
    }),
  })),
  inheritColor: [
    {
      props: ({ ownerState }) =>
        ownerState.variant === "soft" && ownerState.color === "default",
      style: {
        backgroundColor: varAlpha("145 158 171", 0.16),
        "&:hover": {
          backgroundColor: varAlpha("145 158 171", 0.32),
        },
      },
    },
  ],
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0C68E9",
      light: "#6BB1F8",
      lighter: "#CDE9FD",
      dark: "#063BA7",
      darker: "#021D6F",
      mainChannel: "12 104 233",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8E33FF",
      light: "#C684FF",
      lighter: "#EFD6FF",
      dark: "#5119B7",
      darker: "#27097A",
      mainChannel: "142 51 255",
      contrastText: "#FFFFFF",
    },
    success: {
      light: "#77ED8B",
      lighter: "#D3FCD2",
      main: "#22C55E",
      mainChannel: "34 197 94",
      contrastText: "#FFFFFF",
      dark: "#118D57",
      darker: "#065E49",
    },
    error: {
      lighter: "#FFE9D5",
      light: "#FFAC82",
      main: "#FF5630",
      mainChannel: "255 86 48",
      contrastText: "#FFFFFF",
      dark: "#B71D18",
      darker: "#7A0916",
    },
    warning: {
      lighter: "#FFF5CC",
      light: "#FFD666",
      main: "#FFAB00",
      mainChannel: "255 171 0",
      contrastText: "#1C252E",
      dark: "#B76E00",
      darker: "#7A4100",
    },
    info: {
      lighter: "#D6E4FF",
      light: "#61F3F3",
      main: "#00B8D9",
      mainChannel: "0 184 217",
      contrastText: "#FFFFFF",
      dark: "#006C9C",
      darker: "#003A5D",
    },
    divider: "rgba(145 158 171 / 0.2)",
    action: {
      hover: "rgba(145 158 171 / 0.08)",
      selected: "rgba(145 158 171 / 0.16)",
      disabled: "rgba(145 158 171 / 0.8)",
      disabledBackground: "rgba(145 158 171 / 0.24)",
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
    disabled: {
      main: "rgba(145 158 171 / 0.24)",
    },
    iconButton: {
      main: "#919EAB",
    },
    background: {
      default: "#141A21",
      paper: "#1C252E",
      neutral: "#28323D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#919EAB",
      disabled: "#637381",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: setFont("Public Sans"),
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 800,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      fontFamily: setFont("Barlow"),
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontWeight: 800,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      fontFamily: setFont("Barlow"),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      fontFamily: setFont("Barlow"),
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(18),
      ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    },
    h6: {
      fontWeight: 700,
      lineHeight: 28 / 18,
      fontSize: pxToRem(17),
      ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
    },
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16),
    },
    body2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(14),
    },
    caption: {
      fontWeight: 500,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(12),
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 700,
      lineHeight: 24 / 14,
      fontSize: pxToRem(14),
      textTransform: "unset",
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "20px",
          [`&.${accordionClasses.expanded}`]: {
            backgroundColor: theme.palette.background.neutral,
          },
          [`&.${accordionClasses.disabled}`]: {
            backgroundColor: "transparent",
          },
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
          [`&.${accordionSummaryClasses.disabled}`]: {
            opacity: 1,
            color: theme.palette.action.disabled,
            [`& .${typographyClasses.root}`]: { color: "inherit" },
          },
        }),
        expandIconWrapper: { color: "inherit" },
      },
    },
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          error: <AlertErrorIcon />,
          info: <AlertInfoIcon />,
          success: <AlertSuccessIcon />,
          warning: <AlertWarningIcon />,
        },
      },
      styleOverrides: {
        icon: { opacity: 1 },
        root: { borderRadius: 8 },
        standard: ({ ownerState, theme }) => {
          const styled = {
            colors: styleColors(ownerState, (color) => ({
              color: theme.palette[color].lighter,
              backgroundColor: theme.palette[color].darker,
              [`& .${alertClasses.icon}`]: {
                color: theme.palette[color].light,
              },
            })),
          };
          return { ...styled.colors };
        },
        filled: ({ ownerState, theme }) => {
          const styled = {
            colors: styleColors(ownerState, (color) => ({
              color: theme.palette[color].contrastText,
            })),
          };
          return { ...styled.colors };
        },
        outlined: ({ ownerState, theme }) => {
          const styled = {
            colors: styleColors(ownerState, (color) => ({
              backgroundColor: varAlpha(theme.palette[color].mainChannel, 0.08),
              border: `solid 1px ${varAlpha(
                theme.palette[color].mainChannel,
                0.16
              )}`,
              color: theme.palette[color].light,
              [`& .${alertClasses.icon}`]: {
                color: theme.palette[color].main,
              },
            })),
          };
          return { ...styled.colors };
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginBottom: theme.spacing(0.5),
          fontWeight: 600,
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        contained: ({ theme, ownerState }) => {
          const styled = {
            boxShadow: "none",
            inheritColor: {
              ...(ownerState.color === "inherit" &&
                !ownerState.disabled && {
                  color: theme.palette.grey[800],
                  backgroundColor: theme.palette.common.white,
                  "&:hover": { backgroundColor: theme.palette.grey[400] },
                }),
            },
          };
          return { ...styled.inheritColor };
        },
        outlined: ({ theme }) => ({
          borderColor: "rgb(55, 65, 81)",
          color: "white",
          "&:hover": { backgroundColor: theme.palette.action.hover },
        }),
        root: {
          padding: "6px 12px",
          textTransform: "capitalize",
          borderRadius: "10px",
          fontWeight: 700,
        },
        text: ({ ownerState, theme }) => {
          const styled = {
            inheritColor: {
              ...(ownerState.color === "inherit" &&
                !ownerState.disabled && {
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }),
            },
          };
          return { ...styled.inheritColor };
        },
        sizeSmall: ({ ownerState }) => ({
          height: 30,
          ...(ownerState.variant === "text"
            ? { paddingLeft: "4px", paddingRight: "4px" }
            : { paddingLeft: "8px", paddingRight: "8px" }),
        }),
        sizeMedium: ({ ownerState }) => ({
          ...(ownerState.variant === "text"
            ? { paddingLeft: "8px", paddingRight: "8px" }
            : { paddingLeft: "12px", paddingRight: "12px" }),
        }),
        sizeLarge: ({ ownerState }) => ({
          height: 48,
          ...(ownerState.variant === "text"
            ? { paddingLeft: "10px", paddingRight: "10px" }
            : { paddingLeft: "16px", paddingRight: "16px" }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          borderRadius: "16px",
          backgroundImage: "none",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px",
          zIndex: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: { root: ({ theme }) => ({ padding: theme.spacing(3) }) },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6" },
        subheaderTypographyProps: { variant: "body2", marginTop: "4px" },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3, 3, 0),
        }),
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
        indeterminateIcon: <CheckboxIndeterminateIcon />,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          padding: theme.spacing(1),
          ...(ownerState.color === "default" && {
            [`&.${checkboxClasses.checked}`]: {
              color: theme.palette.text.primary,
            },
          }),
          [`&.${checkboxClasses.disabled}`]: {
            color: theme.palette.action.disabled,
          },
        }),
      },
    },
    MuiChip: {
      defaultProps: { deleteIcon: <ChipDeleteIcon /> },
      variants: [...[...softVariant.inheritColor, ...softVariant.colors]],
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const styled = {
            colors: styleColors(ownerState, (color) => ({
              [`& .${chipClasses.avatar}`]: {
                color: theme.palette[color].lighter,
                backgroundColor: theme.palette[color].dark,
              },
            })),
            disabled: {
              [`&.${chipClasses.disabled}`]: {
                opacity: 1,
                [`& .${chipClasses.avatar}`]: {
                  color: theme.palette.action.disabled,
                  backgroundColor: theme.palette.action.disabledBackground,
                },
                ...(ownerState.variant === "outlined" && {
                  color: theme.palette.action.disabled,
                  borderColor: theme.palette.action.disabledBackground,
                }),
                ...(["filled", "soft"].includes(ownerState.variant) && {
                  color: theme.palette.action.disabled,
                  backgroundColor: theme.palette.action.disabledBackground,
                }),
              },
            },
          };

          return { ...styled.colors, ...styled.disabled };
        },
        label: ({ theme }) => ({
          fontWeight: theme.typography.fontWeightMedium,
        }),
        icon: { color: "currentColor" },
        deleteIcon: {
          opacity: 0.48,
          color: "currentColor",
          "&:hover": { opacity: 1, color: "currentColor" },
        },
        sizeMedium: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 1.25,
        }),
        sizeSmall: ({ theme }) => ({ borderRadius: theme.shape.borderRadius }),
        filled: ({ ownerState, theme }) => {
          const styled = {
            defaultColor: {
              ...(!ownerState.disabled &&
                ownerState.color === "default" && {
                  [`& .${chipClasses.avatar}`]: {
                    color: theme.palette.text.primary,
                  },
                  color: theme.palette.grey[800],
                  "&:hover": {
                    backgroundColor: theme.palette.grey[100],
                  },
                }),
            },
          };
          return { ...styled.defaultColor };
        },

        outlined: ({ ownerState, theme }) => {
          const styled = {
            defaultColor: {
              ...(!ownerState.disabled &&
                ownerState.color === "default" && {
                  borderColor: varAlpha("145 158 171", 0.32),
                }),
            },
          };
          return { ...styled.defaultColor };
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          backgroundImage: "none",
          backgroundColor: "#1C252E",
          boxShadow: "rgba(0, 0, 0, 0.24) -40px 40px 80px -8px",
        },
        backdrop: {
          backgroundColor: "rgba(28, 37, 46, 0.4)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "1.125rem",
          padding: "24px 24px 16px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#141A21",
          borderRight: "1px solid #1d242b",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: () => {
          const styled = {
            backgroundColor: "rgba(12 104 233 / 0.24)",
            inheritColor: {
              "&::before": { display: "none" },
              backgroundColor: "rgba(255 255 255 / 0.24)",
            },
          };
          return {
            borderRadius: 10,
            ...styled.inheritColor,
            ...styled.colors,
          };
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          ...paper({ theme, dropdown: true }),
        }),
        list: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...menuItem(theme),
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          ...paper({ theme, dropdown: true }),
          [`& .${listClasses.root}`]: { paddingTop: 0, paddingBottom: 0 },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          [`&.${inputBaseClasses.disabled}`]: {
            "& svg": { color: theme.palette.text.secondary },
          },
        }),
        input: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(15),
          [theme.breakpoints.down("sm")]: {
            fontSize: theme.typography.pxToRem(16),
          },
          "&::placeholder": {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          "& fieldset": {
            color: "#9CA3AF",
            borderColor: "rgba(145 158 171 / 0.2)",
          },
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
        icon: <RadioIcon />,
        checkedIcon: <RadioCheckedIcon />,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          padding: theme.spacing(1),
          ...(ownerState.color === "default" && {
            [`&.${radioClasses.checked}`]: {
              color: theme.palette.text.primary,
            },
          }),
          [`&.${radioClasses.disabled}`]: {
            color: theme.palette.action.disabled,
          },
        }),
      },
    },
    MuiRating: {
      defaultProps: { emptyIcon: <RatingIcon />, icon: <RatingIcon /> },
      styleOverrides: {
        root: { [`&.${ratingClasses.disabled}`]: { opacity: 0.48 } },
        iconEmpty: ({ theme }) => ({
          color: theme.palette.text.disabled,
        }),
        sizeSmall: { [`& .${svgIconClasses.root}`]: { width: 20, height: 20 } },
        sizeMedium: {
          [`& .${svgIconClasses.root}`]: { width: 24, height: 24 },
        },
        sizeLarge: { [`& .${svgIconClasses.root}`]: { width: 28, height: 28 } },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowDownIcon,
      },
      styleOverrides: {
        icon: {
          right: 10,
          width: 18,
          height: 18,
          top: "calc(50% - 9px)",
        },
      },
    },
    MuiSlider: {
      defaultProps: { size: "small" },
      variants: [
        {
          props: ({ ownerState }) => ownerState.color === "inherit",
          style: ({ theme }) => ({
            [`& .${sliderClasses.markActive}`]: {
              backgroundColor: varAlpha(theme.palette.grey["800Channel"], 0.48),
            },
          }),
        },
        {
          props: ({ ownerState }) => !!ownerState.disabled,
          style: ({ theme }) => ({
            [`&.${sliderClasses.disabled}`]: {
              color: varAlpha(
                "145 158 171",
                theme.palette.action.disabledOpacity
              ),
            },
          }),
        },
      ],
      styleOverrides: {
        root: ({ theme }) => ({
          [`& .${sliderClasses.thumb}`]: {
            borderWidth: 1,
            borderStyle: "solid",
            width: SIZE.thumb.medium,
            height: SIZE.thumb.medium,
            boxShadow: "0 1px 2px 0 rgba(0 0 0 / 0.16)",
            color: theme.palette.common.white,
            borderColor: varAlpha("145 158 171", 0.08),
            "&::before": {
              boxShadow: "none",
              width: "calc(100% - 4px)",
              height: "calc(100% - 4px)",
              backgroundImage: `linear-gradient(180deg, ${
                theme.palette.grey[500]
              } 0%, ${varAlpha("145 158 171", 0)} 100%)`,
              opacity: 0.8,
            },
          },
        }),
        rail: ({ theme }) => ({
          opacity: 0.12,
          height: SIZE.rail.medium,
          backgroundColor: theme.palette.grey[500],
        }),
        track: { height: SIZE.rail.medium },
        mark: ({ theme }) => ({
          width: 1,
          height: SIZE.mark.medium,
          backgroundColor: varAlpha("145 158 171", 0.48),
          '&[data-index="0"]': { display: "none" },
        }),
        markActive: ({ theme }) => ({
          backgroundColor: varAlpha(theme.palette.common.whiteChannel, 0.64),
        }),
        markLabel: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(13),
          color: theme.palette.text.disabled,
        }),
        valueLabel: ({ theme }) => ({
          borderRadius: 8,
          backgroundColor: theme.palette.grey[700],
        }),
        sizeSmall: {
          [`& .${sliderClasses.thumb}`]: {
            width: SIZE.thumb.small,
            height: SIZE.thumb.small,
          },
          [`& .${sliderClasses.rail}`]: { height: SIZE.rail.small },
          [`& .${sliderClasses.track}`]: { height: SIZE.rail.small },
          [`& .${sliderClasses.mark}`]: { height: SIZE.mark.small },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: "relative",
          scrollbarWidth: "thin",
          scrollbarColor: `rgba(99, 115, 129, 0.4) rgba(99, 115, 129, 0.08)`,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "--palette-TableCell-border": "rgba(145, 158, 171, 0.2)",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: "rgba(0, 120, 103, 0.04)",
            "&:hover": {
              backgroundColor: "rgba(0, 120, 103, 0.08)",
            },
          },
          "&:last-of-type": {
            [`& .${tableCellClasses.root}`]: {
              borderColor: "transparent",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomStyle: "dashed",
          borderColor: "rgba(145 158 171 / 0.2)",
        },
        head: ({ theme }) => ({
          fontSize: 14,
          color: theme.palette.text.secondary,
          fontWeight: 600,
          backgroundColor: theme.palette.background.neutral,
        }),
        stickyHeader: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        }),
        paddingCheckbox: ({ theme }) => ({ paddingLeft: theme.spacing(1) }),
      },
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: { size: "small" },
        nextIconButtonProps: { size: "small" },
        slotProps: { select: { name: "table-pagination-select" } },
      },
      styleOverrides: {
        root: {
          width: "100%",
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: 8,
        },
        select: {
          paddingLeft: 8,
          "&:focus": {
            borderRadius: 4,
          },
        },
        selectIcon: {
          right: 4,
          width: 16,
          height: 16,
          top: "calc(50% - 8px)",
        },
      },
    },
    MuiTab: {
      defaultProps: { disableRipple: true, iconPosition: "start" },
      styleOverrides: {
        root: ({ theme }) => ({
          opacity: 1,
          minWidth: 48,
          minHeight: 48,
          padding: theme.spacing(1, 0),
          color: theme.palette.text.secondary,
          fontWeight: 500,
          lineHeight: theme.typography.body2.lineHeight,
          [`&.${tabClasses.selected}`]: {
            color: theme.palette.text.primary,
            fontWeight: 600,
          },
        }),
      },
    },
    MuiTabs: {
      defaultProps: {
        textColor: "inherit",
        variant: "scrollable",
        allowScrollButtonsMobile: true,
      },
      styleOverrides: {
        flexContainer: ({ ownerState, theme }) => ({
          ...(ownerState.variant !== "fullWidth" && {
            gap: "24px",
            [theme.breakpoints.up("sm")]: {
              gap: "40px",
            },
          }),
        }),
        indicator: { backgroundColor: "currentColor" },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          // margin: 0,
          backgroundColor: "#454f5b",
          borderRadius: "8px",
        },
        arrow: {
          color: "#454f5b",
        },
        popper: {
          [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
            {
              marginTop: 12,
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
            {
              marginBottom: 12,
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
            {
              marginLeft: 12,
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
            {
              marginRight: 12,
            },
        },
      },
    },
  },
});

export default theme;
