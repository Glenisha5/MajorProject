import React from "react";

export default function OptionsPanel({ form, setForm, onGenerate }) {
  const styles = ["Modern Minimalist","Traditional Indian","Luxury Contemporary","Eco-Friendly"];
  const colors = ["Neutral Elegance","Warm Earth","Cool Blues","Vibrant Accent"];

  const toggleFeature = (feat) => {
    setForm(f => {
      const has = f.features.includes(feat);
      return { ...f, features: has ? f.features.filter(x=>x!==feat) : [...f.features, feat] };
    });
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded shadow">
      <h2 className="font-bold text-lg">Design Preferences</h2>

      <div>
        <label className="block font-medium mb-2">Architectural Style</label>
        <div className="space-y-2">
          {styles.map(s => (
            <label key={s} className="flex items-center space-x-2">
              <input type="radio" name="style" checked={form.style===s}
                onChange={() => setForm(f => ({...f, style: s}))}
                className="w-4 h-4" />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">Color Scheme</label>
        <select value={form.colorScheme} onChange={e => setForm({...form, colorScheme: e.target.value})}
          className="border p-1 rounded w-full">
          {colors.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2">Rooms</label>
        <div className="flex items-center space-x-2">
          <input type="number" min="1" value={form.rooms.bedrooms}
            onChange={e => setForm({...form, rooms:{...form.rooms, bedrooms: +e.target.value}})}
            className="w-20 border p-1 rounded" /> bedrooms
        </div>
        <div className="flex items-center mt-2 space-x-2">
          <input type="number" min="1" value={form.rooms.bathrooms}
            onChange={e => setForm({...form, rooms:{...form.rooms, bathrooms: +e.target.value}})}
            className="w-20 border p-1 rounded" /> bathrooms
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">Special Features</label>
        {["Solar panels","Rainwater harvesting","Natural ventilation","Vastu Shastra"].map(f => (
          <label key={f} className="flex items-center space-x-2">
            <input type="checkbox" checked={form.features.includes(f)} onChange={() => toggleFeature(f)} />
            <span>{f}</span>
          </label>
        ))}
      </div>

      <div className="pt-2">
        <button onClick={onGenerate} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Generate AI Design
        </button>
      </div>
    </div>
  )
}
