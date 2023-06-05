import { ChangeEvent, FormEvent, useState } from "react";
import useStorage from "../hooks/useStorage";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { startUpload, progress } = useStorage();

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedFile) {
      // start upload image
      startUpload(selectedFile);
    }
    setSelectedFile(null);
  }

  return (
    <div className="text-center mt-10">
      <form
        className="flex items-center flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        <button
          className={`btn btn-primary ${Boolean(progress) && "loading"}`}
          disabled={!selectedFile}
        >
          Upload
        </button>
      </form>
    </div>
  );
}
