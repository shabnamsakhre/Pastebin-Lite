import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

import axios from "../config/axios";

export default function ModelDialog({ id, open, setOpen }) {
  const [paste, setPaste] = useState("");

  useEffect(() => {
    if (!id || !open) return;

    async function getPaste() {
      try {
        const res = await axios.get(`/api/pastes/${id}`);
        setPaste(res.data);
      } catch (err) {
        setOpen(false);
        console.log(err);
      }
    }

    getPaste();
  }, [id, open]);

  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex mt-30 justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-gray-800 px-4 py-5 sm:p-6">
                <div className=" sm:flex sm:items-start justify-between">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-white"
                    >
                      Paste Content
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-white">{paste.content}</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setOpen(false)}
                    className="flex cursor-pointer size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10"
                  >
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:px-6">
                <div className="inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5  sm:mt-0  flex-col items-center">
                  <h5>Expires At</h5>
                  <p>{paste.expires_at ?? 0}</p>
                </div>
                <div className="mt-3 ml-2 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5  sm:mt-0 flex-col items-center">
                  <h5>Remaining Views</h5>
                  <p>{paste.remaining_views ?? 0}</p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
