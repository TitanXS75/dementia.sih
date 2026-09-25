import React, { useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { db, type MemoryAsset } from "../../lib/db";

export default function MemoriesPage() {
  const [assets, setAssets] = useState<MemoryAsset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<MemoryAsset | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.memoryAssets
      .toArray()
      .then((all) => {
        setAssets(all);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleAddPhoto = async () => {
    // Create a file input to pick an image
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      const newAsset: MemoryAsset = {
        patientId: 1,
        type: "photo",
        blob: file,
        url,
        label: file.name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "),
        relationship: "Family",
        createdAt: new Date(),
      };

      const id = await db.memoryAssets.add(newAsset);
      setAssets((prev) => [...prev, { ...newAsset, id: id as number }]);
    };
    input.click();
  };

  const photoAssets = assets.filter((a) => a.type === "photo" || a.type === "place");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl text-[#1B382B] font-medium">
            Family Memories
          </h1>
          <p className="text-sm text-[#1F1914]/50 font-sans mt-0.5">
            {photoAssets.length} photograph{photoAssets.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={handleAddPhoto}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1B382B] text-[#FAF7F2] font-sans text-xs font-semibold rounded-xl hover:bg-[#234335] transition-colors"
        >
          <ImagePlus className="w-3.5 h-3.5" />
          Add Photo
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#1B382B]/20 border-t-[#1B382B] rounded-full animate-spin" />
        </div>
      ) : photoAssets.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#1B382B]/5 flex items-center justify-center mx-auto">
            <ImagePlus className="w-7 h-7 text-[#1B382B]/30" />
          </div>
          <p className="text-sm text-[#1F1914]/40 font-sans">
            No photos yet. Add family photographs to build your memory album.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {photoAssets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="aspect-square rounded-none border border-[#1B382B]/10 overflow-hidden group"
            >
              <img
                src={asset.url || ""}
                alt={asset.label}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Full-screen photo viewer */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 bg-[#12241C]/95 flex flex-col items-center justify-center p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <button
            onClick={() => setSelectedAsset(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#FAF7F2]/10 flex items-center justify-center text-[#FAF7F2]/60 hover:text-[#FAF7F2] transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-none border border-[#FAF7F2]/10 overflow-hidden">
              <img
                src={selectedAsset.url || ""}
                alt={selectedAsset.label}
                className="w-full h-auto object-contain max-h-[60vh]"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-base font-sans text-[#FAF7F2]/90 font-medium">
                {selectedAsset.label}
              </p>
              {selectedAsset.relationship && (
                <p className="text-xs text-[#FAF7F2]/40 font-sans mt-1">
                  {selectedAsset.relationship}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
