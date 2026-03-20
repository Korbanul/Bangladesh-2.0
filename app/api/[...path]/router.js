import { NextResponse } from "next/server";

const BACKEND_URL = "https://bangladesh-20-backend-production.up.railway.app";

export async function POST(req, { params }) {
  return handleRequest(req, params);
}

export async function GET(req, { params }) {
  return handleRequest(req, params);
}

async function handleRequest(req, params) {
  try {
    const path = params.path.join("/"); // 🔥 dynamic path
    const body = req.method !== "GET" ? await req.json() : null;

    const backendRes = await fetch(`${BACKEND_URL}/${path}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await backendRes.json();

    const response = NextResponse.json(data, {
      status: backendRes.status,
    });

    // 🔥 ONLY set cookie when login
    if (path === "auth/login" && data.jwttoken) {
      response.cookies.set("token", data.jwttoken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 10,
      });
    }

    // 🔥 logout case (optional)
    if (path === "auth/logout") {
      response.cookies.set("token", "", {
        maxAge: 0,
        path: "/",
      });
    }

    return response;

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}