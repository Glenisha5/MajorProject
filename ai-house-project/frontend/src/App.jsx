import React, {useState} from "react";
import OptionsPanel from "./components/OptionsPanel";
import Gallery from "./components/Gallery";

export default function App() {
  const [form, setForm] = useState({
    style: "Modern Minimalist",
    colorScheme: "Neutral Elegance",
    rooms: { bedrooms: 3, bathrooms: 2 },
    features: []
  });
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleGenerate(){
    setLoading(true);
    setImages({});
    try {
      const res = await fetch("http://localhost:4000/api/generate", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error(`Server ${res.status}: ${await res.text()}`);
      const data = await res.json();
      setImages(data.images || {});
    } catch(err) {
      alert("Error: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-1"><OptionsPanel form={form} setForm={setForm} onGenerate={handleGenerate} /></div>
        <div className="col-span-2">
          <div className="mb-4">
            {loading ? <span className="text-indigo-600">Generating images — this can take 10–30s...</span> :
              <span className="text-gray-700 font-medium">Results</span>}
          </div>
          <Gallery images={images} />
        </div>
      </div>
    </div>
  );
}
