import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "please-set-a-secret"

export function signToken(payload: Record<string, any>, expiresIn = "7d") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as Record<string, any>
  } catch (e) {
    return null
  }
}

export default { signToken, verifyToken }
