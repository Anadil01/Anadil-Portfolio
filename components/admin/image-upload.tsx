"use client";

import {
  ChangeEvent,
  useRef,
  useState,
} from "react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
}: ImageUploadProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] = useState("");

  async function handleUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, PNG, WebP and AVIF images are allowed."
      );

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image must be smaller than 5MB."
      );

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/admin/upload/image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to upload image."
        );
      }

      onChange(data.image.url);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to upload image."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>

      <div className="space-y-4">
        {value && (
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <img
              src={value}
              alt="Uploaded preview"
              className="max-h-72 w-full object-contain"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={uploading}
            onClick={() =>
              inputRef.current?.click()
            }
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-200 transition hover:border-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : value
                ? "Replace Image"
                : "Upload Image"}
          </button>

          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setError("");
              }}
              className="rounded-xl border border-red-900/60 px-4 py-3 text-sm text-red-400 transition hover:border-red-700 hover:bg-red-950/30"
            >
              Remove
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={handleUpload}
          className="hidden"
        />

        <p className="text-xs text-zinc-600">
          JPG, PNG, WebP or AVIF · Maximum 5MB
        </p>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}