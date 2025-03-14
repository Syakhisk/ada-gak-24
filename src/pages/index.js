import axios from "axios";
import { useState } from "react";

function Home() {
  const [found, setFound] = useState(null);
  const [checked, setChecked] = useState(false);
  const [current, setCurrent] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const params = new URLSearchParams();
    current.forEach((n, idx) => {
      params.append(`n${idx + 1}`, n.toString());
    });

    const res = await axios.get("/api/check", { params });
    const { count, url } = res.data;
    setUrl(url);
    setChecked(true);
    setFound(count > 0 ? count : null);
    setLoading(false);
  };

  const handleButtonClick = (e) => {
    const value = parseInt(e.currentTarget.textContent || "0");
    const newCurrent = [...current];
    const index = newCurrent.findIndex((n) => n === 0);
    if (index !== -1) {
      newCurrent[index] = value;
      setCurrent(newCurrent);
    }
  };

  const handleDelete = () => {
    setCurrent([0, 0, 0, 0]);
  };

  const handleReset = () => {
    setChecked(false);
    setFound(null);
    setCurrent([0, 0, 0, 0]);
    setUrl("");
  };

  return (
    <div className="min-h-[100svh] w-full flex flex-col items-center justify-center relative">
      <h1 className="text-3xl mb-12 font-bold">Ada Gak 24?</h1>

      {loading && (
        <div className="absolute inset-0 h-full w-full bg-black/50 grid place-items-center">
          <div className="text-4xl animate-pulse">Loading...</div>
        </div>
      )}

      {checked && (
        <div className="flex gap-2 mb-12">
          {current.map((n, i) => (
            <div
              key={i}
              className="text-3xl p-2 px-4 border border-gray-400 rounded"
            >
              {n}
            </div>
          ))}
        </div>
      )}

      {checked &&
        (found != null ? (
          <div className="text-3xl p-2 px-4 border border-green-400 rounded">
            Ada {found} jawaban
          </div>
        ) : (
          <div className="text-3xl p-2 px-4 border border-red-400 rounded">
            Gak ada jawaban
          </div>
        ))}

      {checked && (
        <>
          <div className="flex flex-col items-center">
            <div className="text-center mt-8">
              <div>Lihat Hasil</div>
              <a
                target="_blank"
                href={url}
                className="underline text-blue-500 mb-12 mt-8"
              >
                {url}
              </a>
            </div>

            <button
              className="bg-blue-500 text-white rounded px-4 p-1 mt-4 w-fit"
              onClick={handleReset}
            >
              Coba Lagi
            </button>
          </div>
        </>
      )}

      {!checked && (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            {current.map((n, i) => (
              <input
                key={i}
                className={`w-12 h-12 border border-white rounded text-center text-black`}
                type="number"
                value={n}
                onFocus={() => setFocus(i)}
                onChange={(e) => {
                  const value = parseInt(e.currentTarget.value);
                  const newCurrent = [...current];
                  newCurrent[i] = value;
                  setCurrent(newCurrent);
                }}
              />
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-2 w-fit">
            {Array.from({ length: 11 }).map((_, i) => (
              <button
                key={i}
                className="w-12 h-12 border border-white rounded flex items-center justify-center"
                type="button"
                onClick={handleButtonClick}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="w-full h-12 border rounded flex items-center justify-center border-red-400 col-span-2"
              type="button"
              onClick={handleDelete}
            >
              Hapus
            </button>
          </div>

          <div className="w-full flex justify-center mt-12">
            <button
              className="bg-blue-500 text-white rounded px-4 p-1"
              type="submit"
            >
              Cek
            </button>
          </div>
        </form>
      )}

      <div className="fixed bottom-10 text-white/50">
        Built with ❤️  by sakis
      </div>
    </div>
  );
}

export default Home;
