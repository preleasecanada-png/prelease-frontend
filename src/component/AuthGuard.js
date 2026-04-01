'use client';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const protectedRoutes = {
  "/properties": ["Landload", "host", "Landlord"], // landlord/host can access
};

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsReady(true), 100);
  }, []);

  const getProtectedRoute = (pathname) => {
    return Object.keys(protectedRoutes).find(routePattern => {
      const regexPattern = "^" + routePattern.replace(/\[.*?\]/g, "[^/]+") + "$";
      return new RegExp(regexPattern).test(pathname);
    });
  };

  useEffect(() => {
    if (!mounted || !isReady) return;

    const token = Cookies.get("token");
    const role = Cookies.get("role"); // get role from cookies
    const matchedRoute = getProtectedRoute(pathname);

    if (!matchedRoute) return; // route is public

    if (!token) {
      router.replace("/login");
      return;
    }

    const allowedRoles = protectedRoutes[matchedRoute];
    if (!allowedRoles.includes(role)) {
      router.replace("/unauthorized"); // or /login
      return;
    }
  }, [pathname, router, mounted, isReady]);

  if (!mounted || !isReady) return null;

  return <>{children}</>;
};

export default AuthGuard;