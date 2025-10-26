"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useGLTF } from "@react-three/drei"

type Props = { wallColor?: string }

export function DetailedHouseModel({ wallColor = "#ffffff" }: Props) {
  const [modelPath, setModelPath] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function probe() {
      try {
        // Prefer single-file .glb
        const glbRes = await fetch("/detailed-house.glb", { method: "HEAD" })
        if (cancelled) return
        if (glbRes.ok) {
          setModelPath("/detailed-house.glb")
          return
        }

        // Try .gltf (must ensure .bin and assets exist alongside)
        const gltfRes = await fetch("/detailed-house.gltf")
        if (cancelled) return
        if (!gltfRes.ok) {
          setModelPath(null)
          return
        }

        const gltfJson = await gltfRes.json()
        // check referenced buffers (if any) exist
        const buffers = Array.isArray(gltfJson.buffers) ? gltfJson.buffers : []
        const checks = await Promise.all(
          buffers.map(async (b: any) => {
            if (!b.uri) return true // embedded or missing? treat as ok
            if (b.uri.startsWith("data:")) return true // embedded
            try {
              // resolve relative to the .gltf file
              const bufferUrl = new URL(b.uri, location.origin + "/detailed-house.gltf").href
              const r = await fetch(bufferUrl, { method: "HEAD" })
              return r.ok
            } catch {
              return false
            }
          })
        )

        if (checks.every(Boolean)) {
          setModelPath("/detailed-house.gltf")
        } else {
          setModelPath(null)
        }
      } catch {
        if (!cancelled) setModelPath(null)
      } finally {
        if (!cancelled) setChecking(false)
      }
    }

    probe()
    return () => {
      cancelled = true
    }
  }, [])

  if (checking) return null // or spinner

  if (!modelPath) {
    // fallback simple mesh so app doesn't crash
    return (
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[2, 1.2, 2]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    )
  }

  return (
    <Suspense fallback={null}>
      <GLTFModel path={modelPath} wallColor={wallColor} />
    </Suspense>
  )
}

function GLTFModel({ path, wallColor = "#ffffff" }: { path: string; wallColor?: string }) {
  // preload if desired
  useEffect(() => {
    try {
      useGLTF.preload(path)
    } catch {
      // noop
    }
  }, [path])

  const gltf = useGLTF(path) as any

  useEffect(() => {
    if (!gltf || !gltf.scene) return
    gltf.scene.traverse((obj: any) => {
      if (obj.isMesh && obj.material) {
        try {
          obj.material.color?.set?.(wallColor)
        } catch {
          // some materials may not support color - ignore
        }
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [gltf, wallColor])

  // clone to avoid modifying cached scene
  return <primitive object={gltf.scene.clone()} />
}

// optional: export type if other components need it
export type DetailedHouseModelProps = Props