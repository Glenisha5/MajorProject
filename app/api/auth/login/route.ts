import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { signToken } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body || {}

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await connectToDatabase()
    const users = db.collection("users")

    const user = await users.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const valid = password === user.password
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }    const token = signToken({ userId: user._id.toString(), email: user.email })

    const res = NextResponse.json({ ok: true, user: { id: user._id.toString(), name: user.name, email: user.email } }, { status: 200 })

    const isProd = process.env.NODE_ENV === "production"
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; ${isProd ? "Secure;" : ""}`
    res.headers.set("Set-Cookie", cookie)

    return res
  } catch (err: any) {
    console.error("/api/auth/login error", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
