import { ButtonBase, Icon, styled } from "@mui/material";
import { forwardRef } from "react";
import { useNavItem } from "./hooks";

export const NavItem = forwardRef(
  ({ title, path, open, active, hasChild, externalLink, subItem }, ref) => {
    const navItem = useNavItem({ path, hasChild, externalLink });

    return (
      <StyledNavItem
        disableRipple
        ref={ref}
        aria-label={title}
        open={open}
        active={active}
        subItem={subItem}
        {...navItem.baseProps}
      >
        {title}

        {hasChild && (
          <Icon
            width={16}
            icon="eva:arrow-ios-downward-fill"
            style={{ ml: 0.75 }}
          />
        )}
      </StyledNavItem>
    );
  }
);

const StyledNavItem = styled(ButtonBase, {
  shouldForwardProp: (prop) =>
    prop !== "active" && prop !== "open" && prop !== "subItem",
})(({ active, open, subItem, theme }) => {
  const rootItem = !subItem;

  const baseStyles = {
    item: {
      ...theme.typography.body2,
      fontWeight: 600,
      transition: theme.transitions.create(["all"], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    dot: {
      width: 6,
      height: 6,
      left: -12,
      opacity: 0.64,
      content: '""',
      borderRadius: "50%",
      position: "absolute",
      backgroundColor: theme.palette.text.disabled,
      ...(active && {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      }),
    },
  };

  return {
    ...(rootItem && {
      ...baseStyles.item,
      height: "100%",
      "&:hover": { "&::before": baseStyles.dot },
      ...(active && {
        color: theme.palette.primary.main,
        fontWeight: 600,
        "&::before": baseStyles.dot,
      }),
      ...(open && { opacity: 0.64, "&::before": baseStyles.dot }),
    }),

    ...(subItem && {
      ...baseStyles.item,
      justifyContent: "flex-start",
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(13),
      "&:hover": {
        color: theme.palette.text.primary,
        "&::before": baseStyles.dot,
      },
      ...(active && {
        color: theme.palette.text.primary,
        fontWeight: 600,
        "&::before": baseStyles.dot,
      }),
    }),
  };
});
