import { useEffect } from "react";

/**
 * This can be used to prompt a native browser dialog to confirm
 * if the user wants to leave this page without saving the changes
 * It will prompt the confirm dialog when the user
 * press reload, back, enters a url or closing the browser/tab
 */
const useSafeReload = () => {
  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  return null;
};

export default useSafeReload;
