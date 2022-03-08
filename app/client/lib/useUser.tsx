import { useEffect } from "react";
import Router from "next/router";

import { useAuthCtx } from "../components/Context";

const useUser = ({ redirectTo = "", redirectToIfLoggedIn = false } = {}) => {
  const { user, refreshToken, setUser } = useAuthCtx();

  const setCookies = (
    userValue: any,
    refToken: any,
    customRedirect?: string
  ) => {
    setUser((pre: any) => ({
      ...pre,
      user: userValue,
      refreshToken: refToken,
    }));

    if (customRedirect || redirectTo) {
      const to = customRedirect || redirectTo;
      Router.push(to);
    }
  };

  const logout = (customRedirect?: string) => {
    setUser({ user: false, refreshToken: false });
    if (customRedirect || redirectTo) Router.push(customRedirect || redirectTo);
  };

  useEffect(() => {
    if (!redirectTo) {
      return;
    }
    const firstCond = redirectTo && !redirectToIfLoggedIn && !user,
      secondCond = redirectToIfLoggedIn && user;
    if (firstCond || secondCond) {
      Router.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, redirectTo, redirectToIfLoggedIn]);
  return { user, setCookies, refreshToken, logout };
};

export default useUser;
