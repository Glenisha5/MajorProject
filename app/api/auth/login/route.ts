import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { signToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body || {}

    console.log("[/api/auth/login] incoming body:", { email: email ? String(email).slice(0, 40) : email })

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await connectToDatabase()
    const users = db.collection("users")

    const user = await users.findOne({ email: String(email).toLowerCase() })
    if (!user) {
      console.log("[/api/auth/login] user not found for:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const stored = user.password as string | undefined
    if (!stored) {
      console.log("[/api/auth/login] no password stored for user:", user._id)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    let valid = false
    if (stored.startsWith("$2")) {
      // bcrypt hash
      valid = await bcrypt.compare(password, stored)
      console.log("[/api/auth/login] bcrypt compare result:", valid)
    } else {
      // legacy plaintext fallback (rehash on success)
      valid = password === stored
      console.log("[/api/auth/login] plaintext compare result:", valid)
      if (valid) {
        try {
          const hashed = await bcrypt.hash(password, 10)
          await users.updateOne({ _id: user._id }, { $set: { password: hashed } })
          console.log("[/api/auth/login] re-hashed legacy password for user:", user._id)
        } catch (err) {
          console.warn("[/api/auth/login] failed to rehash legacy password:", err)
        }
      }
    }

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // successful auth — remove sensitive fields
    const safeUser: any = { ...user }
    delete safeUser.password

    const token = signToken({ userId: user._id.toString(), email: user.email })
    const isProd = process.env.NODE_ENV === "production"
    const maxAge = 60 * 60 * 24 * 7 // 7 days
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax; ${isProd ? "Secure;" : ""}`

    console.log("[/api/auth/login] login successful for:", user.email)
    return NextResponse.json({ ok: true, user: { id: user._id.toString(), email: user.email, name: user.name } }, { status: 200, headers: { "Set-Cookie": cookie } })
  } catch (err: any) {
    console.error("/api/auth/login error", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
