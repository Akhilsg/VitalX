import { createTheme } from "@mui/material/styles";
import { pxToRem } from "./pxToRem";
import { responsiveFontSizes } from "./responsiveFontSizes";
import { RadioCheckedIcon, RadioIcon } from "./components/Radio";
import { CheckboxCheckedIcon, CheckboxIcon } from "./components/Checkbox";
import { ArrowDownIcon } from "./components/Select";
import { linearProgressClasses } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      darker: "#021D6F",
      lighter: "#CDE9FD",
      dark: "#063BA7",
      main: "#0C68E9",
      light: "#6BB1F8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8E33FF",
      light: "#C684FF",
      dark: "#5119B7",
      contrastText: "#FFFFFF",
    },
    error: {
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
    },
    warning: {
      main: "#FFAB00",
    },
    disabled: {
      main: "rgba(145 158 171 / 0.24)",
    },
    iconButton: {
      main: "#919EAB",
    },
    success: {
      main: "#22C55E",
    },
    background: {
      default: "#141A21",
      paper: "#1C252E",
      neutral: "#28323D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#919EAB",
    },
  },
  typography: {
    fontFamily: "Public Sans",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 800,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontWeight: 800,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
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
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: "none",
        },
        outlined: {
          borderColor: "rgb(55, 65, 81)",
          color: "white",
          "&:hover": {
            borderColor: "rgb(55, 65, 81)",
            backgroundColor: "rgba(145 158 171 / 0.08)",
          },
        },
        root: {
          padding: "6px 12px",
          textTransform: "capitalize",
          borderRadius: "10px",
          fontWeight: 700,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          backgroundImage: "none",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          margin: "3px",
          maxWidth: "calc(100% - 6px)",
          fontSize: "0.8125rem",
          height: "28px",
          backgroundColor: "rgba(145 158 171 / 0.16)",
          fontWeight: 600,
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "rgba(145 158 171 / 0.24)",
          },
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
    MuiInputBase: {
      defaultProps: { autoComplete: "off" },
      styleOverrides: {
        input: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(15),
          [theme.breakpoints.down("sm")]: {
            fontSize: theme.typography.pxToRem(16),
          },
          "&::placeholder": {
            opacity: 1,
            color: "#637381",
          },
        }),
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 3,
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: "#0C68E9",
          },
        },
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
      },
    },
    MuiSelect: {
      defaultProps: { IconComponent: ArrowDownIcon },
      styleOverrides: {
        icon: {
          right: 10,
          width: 18,
          height: 18,
          top: "calc(50% - 9px)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#454f5b",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
