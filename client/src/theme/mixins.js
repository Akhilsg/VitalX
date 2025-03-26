import {
  autocompleteClasses,
  checkboxClasses,
  dividerClasses,
  menuItemClasses,
} from "@mui/material";

export const hideScrollX = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  overflowX: "auto",
  "&::-webkit-scrollbar": { display: "none" },
};

export const hideScrollY = {
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
};

export function textGradient(color) {
  return {
    background: `linear-gradient(${color})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    color: "transparent",
  };
}

export function borderGradient(props) {
  return {
    inset: 0,
    width: "100%",
    content: '""',
    height: "100%",
    margin: "auto",
    position: "absolute",
    borderRadius: "inherit",
    padding: props?.padding ?? "2px",
    mask: "linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)",
    WebkitMask:
      "linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)",
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
    ...(props?.color && {
      background: `linear-gradient(${props.color})`,
    }),
  };
}

export function bgGradient({ color, imgUrl }) {
  if (imgUrl) {
    return {
      background: `linear-gradient(${color}), url(${imgUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };
  }
  return { background: `linear-gradient(${color})` };
}

export function bgBlur({ color, blur = 6, imgUrl }) {
  if (imgUrl) {
    return {
      position: "relative",
      backgroundImage: `url(${imgUrl})`,
      "&::before": {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: "100%",
        height: "100%",
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: color,
      },
    };
  }
  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: color,
  };
}

function getFontSize(fontSize) {
  return typeof fontSize === "string" ? parseFloat(fontSize) * 16 : fontSize;
}

function getLineHeight(lineHeight, fontSize) {
  if (typeof lineHeight === "string") {
    return fontSize ? parseFloat(lineHeight) / fontSize : 1;
  }
  return lineHeight;
}

export function maxLine({ line, persistent }) {
  const baseStyles = {
    overflow: "hidden",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    WebkitLineClamp: line,
    WebkitBoxOrient: "vertical",
  };

  if (persistent) {
    const fontSizeBase = getFontSize(persistent.fontSize);
    const fontSizeSm = getFontSize(persistent.fontSizeSm);
    const fontSizeMd = getFontSize(persistent.fontSizeMd);
    const fontSizeLg = getFontSize(persistent.fontSizeLg);

    const lineHeight = getLineHeight(persistent.lineHeight, fontSizeBase);

    return {
      ...baseStyles,
      ...(lineHeight && {
        ...(fontSizeBase && { height: fontSizeBase * lineHeight * line }),
        ...(fontSizeSm && { height: fontSizeSm * lineHeight * line }),
        ...(fontSizeMd && { height: fontSizeMd * lineHeight * line }),
        ...(fontSizeLg && { height: fontSizeLg * lineHeight * line }),
      }),
    };
  }

  return baseStyles;
}

export function paper({ color, dropdown }) {
  return {
    padding: 0,
    backdropFilter: `blur(20px)`,
    WebkitBackdropFilter: `blur(20px)`,
    backgroundColor: color || "rgba(28, 37, 46, 0.9)",
    backgroundImage: `url(https://assets.minimals.cc/public/assets/core/cyan-blur.png), url(https://assets.minimals.cc/public/assets/core/red-blur.png)`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "top right, left bottom",
    backgroundSize: "50%, 50%",
    ...(dropdown && {
      padding: "4px",
      boxShadow: "0px 4px 8px 0 rgba(0, 0, 0, 0.16)",
      borderRadius: "12px",
    }),
  };
}

export function menuItem() {
  return {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    padding: "6px 8px",
    borderRadius: "6px",
    "&:not(:last-of-type)": { marginBottom: "4px" },
    [`&.${menuItemClasses.selected}`]: {
      fontWeight: 600,
      backgroundColor: "rgba(145, 158, 171, 0.16)",
      "&:hover": { backgroundColor: "rgba(145, 158, 171, 0.08)" },
    },
    [`& .${checkboxClasses.root}`]: {
      padding: "4px",
      marginLeft: "-4px",
      marginRight: "4px",
    },
    [`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
      backgroundColor: "rgba(145, 158, 171, 0.16)",
      "&:hover": { backgroundColor: "rgba(145, 158, 171, 0.08)" },
    },
    [`&+.${dividerClasses.root}`]: { margin: "4px 0" },
  };
}
