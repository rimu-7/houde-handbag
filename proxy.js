import { NextResponse } from "next/server";

export default function middleware(request) {
  const allowedOrigins =
    process.env.allowedOrigins ||
    process.env.allowedOrigins2 ||
    process.env.allowedOrigins3;

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (request.nextUrl.pathname.startsWith("/api")) {
    if (origin) {
      if (!allowedOrigins.includes(origin)) {
        return new NextResponse(
          JSON.stringify({ message: "Unauthorized: Bad Origin" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    } else if (referer) {
      const isValidReferer = allowedOrigins.some((domain) =>
        referer.startsWith(domain)
      );

      if (!isValidReferer) {
        return new NextResponse(
          JSON.stringify({ message: "Unauthorized: Bad Referer" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized: Direct API access denied" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
