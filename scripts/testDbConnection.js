const path = require("path")
const fs = require("fs")
const dotenv = require("dotenv")
const { MongoClient } = require("mongodb")

// try to load .env.local first, fall back to .env
const candidates = [".env.local", ".env"]
let loadedFrom = null
for (const c of candidates) {
  const p = path.resolve(__dirname, "../", c)
  if (fs.existsSync(p)) {
    dotenv.config({ path: p })
    loadedFrom = c
    break
  }
}

console.log("[testDbConnection] loaded env from:", loadedFrom || "none")
const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "test"

if (!uri) {
  console.error("MONGODB_URI not found in loaded env. Check .env.local or .env at project root.")
  process.exit(1)
}

async function test() {
  console.log("Attempting to connect to:", uri.split("@")[1]?.slice(0,40) || "n/a")
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  try {
    await client.connect()
    console.log("Connected OK to", client.db(dbName).databaseName)
    const cols = await client.db(dbName).listCollections().toArray()
    console.log("Collections preview:", cols.map(c=>c.name).slice(0,5))
  } catch (err) {
    console.error("CONNECTION ERROR:", err && err.message ? err.message : err)
    console.error(err)
    process.exitCode = 1
  } finally {
    await client.close().catch(()=>{})
  }
}
test()