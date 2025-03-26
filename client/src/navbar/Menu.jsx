import React from "react";
import { useSelector } from "react-redux";
import { varAlpha } from "../theme/varAlpha";

const Menu = () => {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();

  return (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user?.photoURL, alt: user?.displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(
            theme.palette.primary.mainChannel,
            0
          )} 25%, ${theme.palette.primary.main} 100%)`,
        },
      }}
    >
      {user?.displayName?.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );
};

export default Menu;
