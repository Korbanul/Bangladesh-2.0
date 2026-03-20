import { NextResponse } from "next/server";
console.log("🔥 BFF HIT");
const BACKEND_URL = "https://bangladesh-20-backend-production.up.railway.app";

export async function POST(req, { params }) {
  const resolvedParams = await params;
  return handleRequest(req, resolvedParams);
}

export async function GET(req, { params }) {
  const resolvedParams = await params;
  return handleRequest(req, resolvedParams);
}

async function handleRequest(req, params) {
  try {
    // 1. Ensure path is an array (handles folder naming issues)
    const pathArray = params.path;
    if (!Array.isArray(pathArray)) {
      throw new Error("Folder must be named [...path] (with three dots)");
    }
    const path = pathArray.join("/");

    // 2. Safe Body Parsing (Handles empty or non-JSON bodies)
    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      try {
        const text = await req.text();
        body = text ? JSON.parse(text) : undefined;
      } catch (e) {
        console.error("Body parse error:", e);
      }
    }

    // 3. Fetch from Railway
    const backendRes = await fetch(`${BACKEND_URL}/${path}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        // Forward existing cookies from the browser to your backend
        "Cookie": req.headers.get("cookie") || "",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // 4. Safe Response Parsing (Check if it's actually JSON)
    const contentType = backendRes.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await backendRes.json();
    } else {
      data = { message: await backendRes.text() };
    }

    const response = NextResponse.json(data, { status: backendRes.status });

    // 5. Login/Cookie Logic
    if (path === "auth/login" && data.jwttoken) {
      response.cookies.set("token", data.jwttoken, {
        httpOnly: true,
        secure: true, // Netlify is always HTTPS
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
    }
    if (path === "auth/logout") {
      response.cookies.set("token", "", {
        path: "/",
        maxAge: 0,        // Expires immediately
        expires: new Date(0), // Sets date to 1970
      });
    }

    return response;

  } catch (error) {
    // THIS IS CRITICAL: This log shows up in your Netlify/Terminal logs
    console.error("BFF Error Details:", error.message);

    return NextResponse.json(
      { message: "BFF Error", details: error.message },
      { status: 500 }
    );
  }
}