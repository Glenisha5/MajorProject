import { MongoClient, Db } from "mongodb"

// default to local MongoDB for development when not set
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/"
const dbName = process.env.MONGODB_DB || "majorproject"

if (!uri) {
  // It's fine to throw here in dev if env is not set — callers should supply MONGODB_URI
  // but avoid crashing at import time in some environments by keeping this check.
  console.warn("MONGODB_URI is not set. Database calls will fail until it is configured.")
}

declare global {
  // eslint-disable-next-line
  // allow global to cache the client across module reloads in dev
  // @ts-ignore
  var _mongoClient: { client: MongoClient | null; promise: Promise<MongoClient> | null } | undefined
}

let cached: { client: MongoClient | null; promise: Promise<MongoClient> | null } = global._mongoClient || { client: null, promise: null }

export async function connectToDatabase(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment")
  }

  if (!cached.client) {
    if (!cached.promise) {
      const client = new MongoClient(uri)
      cached.promise = client.connect().then(() => {
        cached.client = client
        return client
      })
    }
    await cached.promise
  }

  if (!cached.client) throw new Error("Failed to establish MongoDB client")

  global._mongoClient = cached

  return cached.client.db(dbName)
}

export default connectToDatabase
