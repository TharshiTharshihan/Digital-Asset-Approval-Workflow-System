import { useState, useRef } from "react";
import { FileText, Upload } from "lucide-react";
import UserLayout from "../layouts/UserLayout";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function FileUpload() {
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      return toast.error("Please enter title and file");
    }
    console.log("currentUser Id is: ", currentUser.userId);

    if (!currentUser?.userId) {
      return toast.error("User not found. Please login again.");
    }

    const userId = currentUser?.userId;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("title", title);
      formData.append("file", file);

      await fetch("http://localhost:8080/api/document/upload", {
        method: "POST",
        body: formData,
      });

      toast.success("Document uploaded successfully", { theme: "dark" });

      setTitle("");
      setFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed", {
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-orange-500 text-white rounded-3xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Upload /> Upload Document
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white mt-6 p-6 rounded-3xl shadow-lg space-y-5"
        >
          {/* Title */}
          <div>
            <label className="font-semibold">Title</label>
            <div className="relative mt-2">
              <FileText className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                className="w-full border p-3 pl-10 rounded-xl"
              />
            </div>
          </div>

          {/* File */}
          <div>
            <label className="font-semibold">File</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold cursor-pointer hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </div>
    </UserLayout>
  );
}
