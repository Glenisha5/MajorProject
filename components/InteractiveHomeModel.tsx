"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
// Update the import path to the correct location, for example:
import {DetailedHouseModel} from "./DetailedHouseModel";
export type HouseElement = {
  id: number;
  kind: "floor" | "room";
  width: number;
  depth: number;
  height: number;
  x: number;
  y: number;
  z: number;
  color?: string;
};

export default function InteractiveHomeModel() {
  const [elements, setElements] = useState<HouseElement[]>(() => [
    { id: 1, kind: "floor", width: 10, depth: 10, height: 0.25, x: 0, y: 0, z: 0, color: "#9CA3FF" },
  ]);
  const idRef = useRef(2);
  const [useGltf, setUseGltf] = useState(true);

  const highestY = useMemo(() => {
    return elements.reduce((max, e) => Math.max(max, e.y + e.height / 2), -Infinity);
  }, [elements]);

  function addFloor() {
    const newId = idRef.current++;
    const floorY = Math.max(0, highestY + 0.25);
    const base = elements[0];
    setElements((prev) => [
      ...prev,
      {
        id: newId,
        kind: "floor",
        width: base?.width ?? 10,
        depth: base?.depth ?? 10,
        height: 0.25,
        x: 0,
        y: floorY,
        z: 0,
        color: "#9CA3FF",
      },
    ]);
  }

  function addRoom() {
    const newId = idRef.current++;
    // place room centered on top of highest floor, slightly inset
    const roomWidth = 3;
    const roomDepth = 3;
    const roomHeight = 2.6;
    const roomY = highestY + roomHeight / 2 + 0.25;
    setElements((prev) => [
      ...prev,
      {
        id: newId,
        kind: "room",
        width: roomWidth,
        depth: roomDepth,
        height: roomHeight,
        x: 0,
        y: roomY,
        z: 0,
        color: "#FDE68A",
      },
    ]);
  }

  function removeLast() {
    setElements((prev) => prev.slice(0, -1));
  }

  function resetModel() {
    idRef.current = 2;
    setElements([{ id: 1, kind: "floor", width: 10, depth: 10, height: 0.25, x: 0, y: 0, z: 0, color: "#9CA3FF" }]);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-3/4 h-[480px] bg-slate-900 rounded-lg overflow-hidden">
        <Canvas shadows camera={{ position: [8, 6, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <OrbitControls makeDefault />
          <Grid position={[0, 0, 0]} args={[100, 100]} />
          {/* render GLTF if available; DetailedHouseModel falls back to simple mesh if missing */}
          {useGltf && <DetailedHouseModel wallColor="#ffffff" />}
          {/* render interactive primitives */}
          {elements.map((el) => {
            const posY = el.y + el.height / 2;
            const color = el.color ?? (el.kind === "floor" ? "#9CA3FF" : "#FDE68A");
            return (
              <mesh key={el.id} position={[el.x, posY, el.z]} castShadow receiveShadow>
                <boxGeometry args={[el.width, el.height, el.depth]} />
                <meshStandardMaterial color={color} metalness={0.1} roughness={0.7} />
              </mesh>
            );
          })}
        </Canvas>
      </div>

      <aside className="w-full md:w-1/4 space-y-3">
        <div className="p-3 bg-slate-800 rounded-md text-sm">
          <div className="flex gap-2 mb-3">
            <button className="px-3 py-1 bg-indigo-600 rounded" onClick={addFloor}>
              Add Floor
            </button>
            <button className="px-3 py-1 bg-amber-500 rounded" onClick={addRoom}>
              Add Room
            </button>
            <button className="px-3 py-1 bg-red-600 rounded" onClick={removeLast}>
              Remove Last
            </button>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              className="px-3 py-1 bg-gray-600 rounded"
              onClick={() => setUseGltf((s) => !s)}
            >
              {useGltf ? "Hide GLTF" : "Show GLTF"}
            </button>
            <button className="px-3 py-1 bg-gray-600 rounded" onClick={resetModel}>
              Reset
            </button>
          </div>

          <div>
            <h4 className="font-medium mb-1">Elements</h4>
            <ul className="text-xs space-y-1 max-h-60 overflow-auto">
              {elements.map((el) => (
                <li key={el.id} className="flex justify-between items-center">
                  <div>
                    #{el.id} {el.kind} — {Math.round(el.width)}x{Math.round(el.depth)}x{Math.round(el.height)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-3 bg-slate-800 rounded-md text-sm">
          <h4 className="font-medium mb-2">Tips</h4>
          <ul className="text-xs list-disc ml-4">
            <li>Add floors to stack levels.</li>
            <li>Add rooms to place simple volumes on top of floors.</li>
            <li>Use the GLTF toggle to overlay your detailed model if available.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}