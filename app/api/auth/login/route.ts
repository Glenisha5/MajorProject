import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { signToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json().catch((e) => {
      console.error("[/api/auth/login] failed to parse JSON body:", e)
      return null
    })
    const { email, password } = body || {}

    console.log("[/api/auth/login] incoming body:", { email: email ? String(email).slice(0, 60) : email })

    if (!email || !password) {
      console.warn("[/api/auth/login] missing email or password")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let db: any
    try {
      db = await connectToDatabase()
    } catch (err) {
      console.error("[/api/auth/login] connectToDatabase threw:", err)
      return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }

    if (!db || typeof db.collection !== "function") {
      console.error("[/api/auth/login] connectToDatabase did not return a valid db object:", db)
      return NextResponse.json({ error: "Database unavailable" }, { status: 500 })
    }

    const users = db.collection("users")
    let user: any
    try {
      user = await users.findOne({ email: String(email).toLowerCase() })
    } catch (err) {
      console.error("[/api/auth/login] users.findOne threw:", err)
      return NextResponse.json({ error: "Database query error" }, { status: 500 })
    }

    if (!user) {
      console.log("[/api/auth/login] user not found for:", String(email).toLowerCase())
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const stored = user.password as string | undefined
    if (!stored) {
      console.warn("[/api/auth/login] no password stored for user:", user._id)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    let valid = false
    try {
      if (typeof stored === "string" && stored.startsWith("$2")) {
        valid = await bcrypt.compare(password, stored)
        console.log("[/api/auth/login] bcrypt compare result:", valid)
      } else {
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
    } catch (err) {
      console.error("[/api/auth/login] password comparison threw:", err)
      return NextResponse.json({ error: "Authentication error" }, { status: 500 })
    }

    if (!valid) {
      console.log("[/api/auth/login] authentication failed for:", String(email).toLowerCase())
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // sanitize user before returning
    const safeUser: any = { ...user }
    delete safeUser.password

    let token: string
    try {
      token = signToken({ userId: String(user._id), email: user.email })
    } catch (err) {
      console.error("[/api/auth/login] signToken threw:", err)
      return NextResponse.json({ error: "Token creation failed" }, { status: 500 })
    }

    const isProd = process.env.NODE_ENV === "production"
    const maxAge = 60 * 60 * 24 * 7 // 7 days
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax; ${isProd ? "Secure;" : ""}`

    console.log("[/api/auth/login] login successful for:", user.email)
    return NextResponse.json(
      { ok: true, user: { id: String(user._id), email: user.email, name: user.name } },
      { status: 200, headers: { "Set-Cookie": cookie } },
    )
  } catch (err: any) {
    console.error("[/api/auth/login] unexpected error:", err, err?.stack)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
