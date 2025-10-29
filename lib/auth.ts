import bcrypt from "bcryptjs"
import { sign, verify } from "jsonwebtoken"
import clientPromise from "@/lib/mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "please-set-a-secret"

/**
 * Authenticate user by email/password.
 * Throws Error("Missing fields") or Error("Invalid credentials")
 */
export async function authenticateUser(email: string, password: string) {
  if (!email || !password) throw new Error("Missing fields")

  const db = await clientPromise()
  const user = await db.collection("users").findOne({ email: email.toLowerCase() })
  if (!user) throw new Error("Invalid credentials")

  const stored = user.password as string | undefined
  if (!stored) throw new Error("Invalid credentials")

  let valid = false

  // bcrypt hashes usually start with $2
  if (stored.startsWith("$2")) {
    valid = await bcrypt.compare(password, stored)
  } else {
    // fallback for legacy plaintext password storage: rehash after successful login
    valid = password === stored
    if (valid) {
      const hashed = await bcrypt.hash(password, 10)
      await db.collection("users").updateOne({ _id: user._id }, { $set: { password: hashed } })
    }
  }

  if (!valid) throw new Error("Invalid credentials")

  const safeUser = { ...user } as any
  delete safeUser.password
  return safeUser
}

export function signToken(payload: Record<string, any>, expiresIn: string | number = "7d") {
  return sign(payload as any, JWT_SECRET, { expiresIn } as any)
}

export function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET) as Record<string, any>
  } catch {
    return null
  }
}

export default { authenticateUser, signToken, verifyToken }
