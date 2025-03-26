import "./styles.css";

import NProgress from "nprogress";
import { useState, useEffect } from "react";
import { usePathname } from "../../hooks/use-pathname";

export function ProgressBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      NProgress.start();
      setVisible(true);
    }

    if (visible) {
      NProgress.done();
      setVisible(false);
    }

    if (!visible && mounted) {
      setVisible(false);
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
  }, [pathname, mounted]);

  if (!mounted) {
    return null;
  }

  return null;
}
