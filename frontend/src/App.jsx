import { useForm } from "react-hook-form";
import axios from "./config/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import ModelDialog from "./components/ModelDialog";

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [pastesList, setPastesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const submitHandler = async (pastes) => {
    try {
      const res = await axios.post("/api/pastes", pastes);

      toast.success("Paste created successfully.");

      setPastesList((prev) => [...prev, res.data]);
      reset();
    } catch (err) {
      toast.error("Enter valid input!");
    }
  };

  const handleDialog = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  return (
    <div className="w-screen h-screen bg-gray-900 text-white ">
      {/* TitleBar */}
      <h1 className="text-3xl font-semibold uppercase font-serif px-10 py-5 bg-gray-950 shadow shadow-gray-950">
        Pastebin Lite
      </h1>

      {/* Main Body */}
      <section className="w-full h-[90vh] flex gap-0 flex-col md:flex-row">
        <form
          action="#"
          onSubmit={handleSubmit(submitHandler)}
          className="flex w-full md:w-3/4 flex-col md:flex-row"
        >
          {/* Left side - For additional info */}
          <div id="left" className="w-full md:w-1/3 h-full py-5 px-8">
            <label htmlFor="#">Time Expiry (TTL)</label>
            <input
              {...register("ttl_seconds")}
              type="number"
              className="w-full bg-white outline-0 p-3 text-black rounded mt-1 mb-5 md:mb-8"
            />

            <label htmlFor="#">View‐count Limit</label>
            <input
              {...register("max_views")}
              type="number"
              className="w-full bg-white outline-0 p-3 text-black rounded mt-1"
            />
          </div>

          {/* Center - Pastebin textarea */}
          <div id="center" className="w-full h-full px-8 md:py-5">
            <label htmlFor="#">Content</label>
            <textarea
              {...register("content", { required: "Paste must not empty!" })}
              name="content"
              className="w-full bg-white outline-0 text-black rounded p-3 mt-1"
              rows={18}
            ></textarea>
            <small className="text-red-400">{errors?.content?.message}</small>

            <button className="w-full bg-emerald-800 mt-3 md:mt-6 p-3 rounded cursor-pointer active:scale-95">
              Create Paste
            </button>
          </div>
        </form>

        {/* Right side - Pastes list */}
        <div
          id="right"
          className="w-full mt-8 md:mt-0 md:w-1/4 h-full bg-neutral-800 px-8 py-5"
        >
          <h2 className="text-xl mb-2 font-serif font-medium">Paste List</h2>

          {pastesList.map((p, idx) => (
            <div key={idx} className="paste bg-sky-600 rounded px-4 py-2 mb-3">
              <p
                className="cursor-pointer hover:scale-105"
                onClick={() => handleDialog(p.id)}
              >
                {p.id}
              </p>
              <a href={p.url} target="_blank" className="text-[12px] underline">
                {p.url}
              </a>
            </div>
          ))}
        </div>
      </section>

      <ModelDialog id={selectedId} open={open} setOpen={setOpen} />
    </div>
  );
};

export default App;
