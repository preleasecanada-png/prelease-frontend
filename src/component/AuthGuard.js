'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const protectedRoutes = {
  "/properties": ["landlord", "host", "admin"],
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

    const token = localStorage.getItem("token");
    const role = (localStorage.getItem("role") || '').toLowerCase();
    const matchedRoute = getProtectedRoute(pathname);

    if (!matchedRoute) return; // route is public

    if (!token) {
      router.replace("/login");
      return;
    }

    const allowedRoles = protectedRoutes[matchedRoute];
    if (!allowedRoles.includes(role)) {
      router.replace("/");
      return;
    }
  }, [pathname, router, mounted, isReady]);

  if (!mounted || !isReady) return null;

  return <>{children}</>;
};

export default AuthGuard;