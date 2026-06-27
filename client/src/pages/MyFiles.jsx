import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserLayout from "../layouts/UserLayout";
import { FileText } from "lucide-react";


function MyFiles() {

  const [files, setFiles] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(
    () => async () => {
      if (!currentUser?.userId) return;

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/document/my-files/${currentUser.userId}`,
        );

        const data = await response.json();

        console.log(data);

        setFiles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    },
    [currentUser],
  );

  return (
    <>
    <UserLayout>
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex bg-orange-500 text-white text-center rounded-3xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold flex items-center  gap-2">
            My Uploaded Documents
          </h1>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-slate-500">Total Documents</p>

          <h2 className="text-3xl font-bold text-orange-500">{files.length}</h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-slate-500">Pending</p>

          <h2 className="text-3xl font-bold text-yellow-500">
            {files.filter((f) => f.status === "PENDING").length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <p className="text-slate-500">Approved</p>

          <h2 className="text-3xl font-bold text-green-500">
            {files.filter((f) => f.status === "APPROVED").length}
          </h2>
        </div>
      </div>

      <div className="space-y-6 max-w-7xl mx-auto mt-6 ">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl"><FileText className="text-orange-500" /></span>
              <h1 className="text-4xl font-bold">My Documents</h1>
            </div>

            <p className="mt-3 text-orange-600 max-w-2xl">
              View and manage all uploaded digital assets.
            </p>
          </div>

          <div className="relative w-full lg:w-96 ">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full px-5 py-4 rounded-2xl bg-gray-200 border border-black/20 text-black placeholder:text-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto mt-6 p-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-2xl">
                <button
                  onClick={() =>
                    setPreviewFile(previewFile?.id === file.id ? null : file)
                  }
                >
                  📄
                </button>{" "}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  file.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : file.status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {file.status}
              </span>
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-800">
              {file.title}
            </h2>

            <p className="text-sm text-slate-500 mt-1">{file.fileName}</p>

            <div className="mt-4 space-y-1">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Type:</span> {file.fileType}
              </p>

              <p className="text-sm text-slate-600">
                <span className="font-semibold">Uploaded:</span>{" "}
                {new Date(file.uploadedDate).toLocaleDateString()}
              </p>

              <p className="text-sm text-slate-600">
                <span className="font-semibold">Owner:</span>{" "}
                {file.uploadedBy?.name}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedFile(file);
              }}
              className="mt-5 w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => setSelectedFile(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center text-4xl">
                📄
              </div>

              <div>
                <h2 className="text-2xl font-bold">{selectedFile.title}</h2>

                <p className="text-gray-500">{selectedFile.fileName}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">File Type</p>
                <p className="font-medium">{selectedFile.fileType}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{selectedFile.status}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Uploaded By</p>
                <p className="font-medium">{selectedFile.uploadedBy?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedFile.uploadedBy?.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Uploaded Date</p>
                <p className="font-medium">
                  {new Date(selectedFile.uploadedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      </UserLayout>
    </>
  );
}

export default MyFiles;
