import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { signToken } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body || {}

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await connectToDatabase()
    const users = db.collection("users")

    const existing = await users.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const insert = await users.insertOne({ name, email: email.toLowerCase(), password, createdAt: new Date() })

    const token = signToken({ userId: insert.insertedId.toString(), email: email.toLowerCase() })

    const res = NextResponse.json({ ok: true, user: { id: insert.insertedId.toString(), name, email } }, { status: 201 })

    // set cookie (httpOnly)
    const isProd = process.env.NODE_ENV === "production"
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; ${isProd ? "Secure;" : ""}`
    res.headers.set("Set-Cookie", cookie)

    return res
  } catch (err: any) {
    console.error("/api/auth/signup error", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
