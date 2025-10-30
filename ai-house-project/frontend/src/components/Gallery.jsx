import React from "react";

export default function Gallery({ images }) {
  const views = ["front","back","top","plan"];
  return (
    <div className="grid grid-cols-2 gap-4">
      {views.map(k => (
        <div key={k} className="bg-white p-3 rounded shadow min-h-[220px] flex flex-col">
          <h3 className="font-semibold capitalize">{k} view</h3>
          <div className="mt-2 flex-1 flex items-center justify-center">
            {images[k] ? (
              <img src={images[k]} alt={k} className="max-h-64 object-cover rounded" />
            ) : (
              <div className="text-gray-400">No image yet</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
