import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {routes} from "@/routes";

const rolePermissions = [
  {path: `${routes.danhsach}/${routes.yeuthich}`, roles: ["user"]},
  { path: `${routes.danhsach}/${routes.lichsu}`, roles: ["user"] },
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/dang-nhap", req.url));
  }

  const userRole = token.role;

  const pathname = req.nextUrl.pathname;

  const routePermission = rolePermissions.find(
    (route) => route.path === pathname
  );

  if (routePermission && routePermission.roles) {
    if (routePermission && !routePermission.roles.includes(String(userRole))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
      `${routes.danhsach}/${routes.yeuthich}`,
      `${routes.danhsach}/${routes.lichsu}`
  ],
};
