import { cloneElement } from "react";
import { Link } from "react-router-dom";

export function useNavItem({
  path,
  icon,
  info,
  depth,
  render,
  hasChild,
  externalLink,
  enabledRootRedirect,
}) {
  const rootItem = depth === 1;

  const subItem = !rootItem;

  const subDeepItem = Number(depth) > 2;

  const linkProps = externalLink
    ? { to: path, target: "_blank", rel: "noopener" }
    : { component: Link, to: path };

  const baseProps =
    hasChild && !enabledRootRedirect ? { component: "div" } : linkProps;

  let renderIcon = null;

  if (icon && render?.navIcon && typeof icon === "string") {
    renderIcon = render?.navIcon[icon];
  } else {
    renderIcon = icon;
  }

  let renderInfo = null;

  if (info && render?.navInfo && Array.isArray(info)) {
    const [key, value] = info;
    const element = render.navInfo(value)[key];

    renderInfo = element ? cloneElement(element) : null;
  } else {
    renderInfo = info;
  }

  return {
    subItem,
    rootItem,
    subDeepItem,
    baseProps,
    renderIcon,
    renderInfo,
  };
}
