'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const protectedRoutes = {
  "/properties": ["landlord", "host", "admin"],
  "/my-properties": ["landlord", "host", "admin"],
  "/reports": ["landlord", "host", "admin"],
  "/dashboard": ["renter", "landlord", "host", "admin"],
  "/account": ["renter", "landlord", "host", "admin"],
  "/account/persanal-info": ["renter", "landlord", "host", "admin"],
  "/notifications": ["renter", "landlord", "host", "admin"],
  "/wish-lists": ["renter", "landlord", "host", "admin"],
  "/chats": ["renter", "landlord", "host", "admin"],
  "/chats-popup": ["renter", "landlord", "host", "admin"],
  "/applications": ["renter", "landlord", "host", "admin"],
  "/applications/[id]": ["renter", "landlord", "host", "admin"],
  "/leases": ["renter", "landlord", "host", "admin"],
  "/leases/[id]": ["renter", "landlord", "host", "admin"],
  "/payments": ["renter", "landlord", "host", "admin"],
  "/payment-checkout": ["renter", "landlord", "host", "admin"],
  "/reviews": ["renter", "landlord", "host", "admin"],
  "/insurance": ["renter", "landlord", "host", "admin"],
  "/maintenance": ["renter", "landlord", "host", "admin"],
  "/referrals": ["renter", "landlord", "host", "admin"],
  "/support": ["renter", "landlord", "host", "admin"],
  "/user-verification": ["renter", "landlord", "host", "admin"],
  "/preferences": ["renter", "landlord", "host", "admin"],
  "/apply": ["renter", "landlord", "host", "admin"],
  "/virtual-assistant": ["renter", "landlord", "host", "admin"],
  "/admin": ["admin"],
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
      // For /admin, match any sub-path too (e.g. /admin/users)
      if (routePattern === '/admin') {
        return /^\/admin(\/.*)?$/.test(pathname);
      }
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