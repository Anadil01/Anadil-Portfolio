"use client";

import { ChangeEvent, useRef, useState } from "react";

type ImageUploadProps = {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImageUpload({
  value = "",
  onChange,
  label = "Upload image",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(
    null
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    // --------------------------------------------------
    // Validate file type
    // --------------------------------------------------

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );

      event.target.value = "";
      return;
    }

    // --------------------------------------------------
    // Validate file size
    // --------------------------------------------------

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image must be smaller than 5MB."
      );

      event.target.value = "";
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
            "Image upload failed."
        );
      }

      if (!data.url) {
        throw new Error(
          "Upload succeeded but no image URL was returned."
        );
      }

      onChange(data.url);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  function removeImage() {
    onChange("");
    setError("");
  }

  return (
    <div>
      {/* ==================================================
          LABEL
          ================================================== */}

      <div className="mb-3">
        <p className="text-sm font-medium text-zinc-200">
          {label}
        </p>

        <p className="mt-1 text-xs text-zinc-600">
          PNG, JPG, WEBP or GIF · Maximum 5MB
        </p>
      </div>

      {/* ==================================================
          HIDDEN INPUT
          ================================================== */}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* ==================================================
          UPLOAD AREA
          ================================================== */}

      {!value ? (
        <button
          type="button"
          onClick={openFilePicker}
          disabled={uploading}
          className="group flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-black/30 px-6 text-center transition duration-200 hover:border-orange-500/40 hover:bg-orange-500/[0.025] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-zinc-600 transition group-hover:border-orange-500/20 group-hover:bg-orange-500/10 group-hover:text-orange-500">
            {uploading ? (
              <Spinner />
            ) : (
              <UploadIcon />
            )}
          </div>

          <p className="mt-5 text-sm font-semibold text-zinc-300 transition group-hover:text-white">
            {uploading
              ? "Uploading image..."
              : "Choose an image"}
          </p>

          <p className="mt-1.5 text-xs text-zinc-700">
            {uploading
              ? "Please wait while the image is uploaded."
              : "Click here to select an image from your computer."}
          </p>
        </button>
      ) : (
        /* ==================================================
           IMAGE PREVIEW
           ================================================== */

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
          <div className="relative aspect-video">
            <img
              src={value}
              alt="Uploaded preview"
              className="h-full w-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

            {/* Actions */}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <button
                type="button"
                onClick={openFilePicker}
                disabled={uploading}
                className="rounded-xl border border-white/10 bg-black/70 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                {uploading
                  ? "Uploading..."
                  : "Replace image"}
              </button>

              <button
                type="button"
                onClick={removeImage}
                disabled={uploading}
                className="rounded-xl border border-red-400/20 bg-black/70 px-4 py-2.5 text-xs font-semibold text-red-300 backdrop-blur-md transition hover:bg-red-500 hover:text-white disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Uploaded state */}

          <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <CheckIcon />
              </span>

              <span className="truncate text-xs text-zinc-500">
                Image uploaded
              </span>
            </div>

            <span className="text-[10px] font-medium text-emerald-500/70">
              Ready
            </span>
          </div>
        </div>
      )}

      {/* ==================================================
          ERROR
          ================================================== */}

      {error && (
        <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-red-400">
              <WarningIcon />
            </span>

            <p className="text-xs leading-5 text-red-400/80">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* ==================================================
          CURRENT PATH
          ================================================== */}

      {value && (
        <div className="mt-3 rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-700">
            Stored image
          </p>

          <p className="truncate font-mono text-[10px] text-zinc-600">
            {value}
          </p>
        </div>
      )}
    </div>
  );
}

/* ==========================================================
   UPLOAD ICON
   ========================================================== */

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M12 16V5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M8 9L12 5L16 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M5 15V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ==========================================================
   CHECK ICON
   ========================================================== */

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M5 12.5L9.2 16.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ==========================================================
   WARNING ICON
   ========================================================== */

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M12 4L21 19H3L12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M12 9V13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M12 16H12.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ==========================================================
   SPINNER
   ========================================================== */

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 animate-spin"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="30 20"
        strokeLinecap="round"
      />
    </svg>
  );
}