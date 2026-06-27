import { useEffect, useState } from "react";
import { AlertCircle, Clock, Search, Ticket, User, X ,AtSign } from "lucide-react";
import UserLayout from "../layouts/UserLayout";
import { useSelector } from "react-redux";
//import { toast } from "react-toastify";

const statusColor = {
  Open: "bg-orange-100 text-orange-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Resolved: "bg-amber-100 text-amber-700",
  Closed: "bg-green-100 text-green-600",
};

const priorityColor = {
  High: "text-red-500",
  Medium: "text-yellow-500",
  Low: "text-green-500",
};

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];

function AssignedFiles () {


 const { currentUser } = useSelector(state => state.user);


  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedfile, setSelectedfile] = useState(null);
  const [statusDrafts, setStatusDrafts] = useState({});
  const [commentText, setCommentText] = useState("");
  const [savingTicketId, setSavingTicketId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

 useEffect(() => {
  if (!currentUser?.userId) return;


  fetch(`${BACKEND_URL}/api/document/assigned-files/${currentUser.userId}`)
    .then((res) => res.json())
    .then((data) => {
      setFiles(data);
      setLoading(false);
      console.log("Assigned files : ", data);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [currentUser?.userId]);



  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <Ticket size={36} />
                <h1 className="text-4xl font-bold">Assigned Files</h1>
              </div>
              <p className="mt-3 text-orange-100 max-w-2xl">
                Files currently assigned to you are shown here.
              </p>
            </div>

            <div className="relative w-full lg:w-96">
              <Search
                className="absolute left-4 top-4 text-orange-200"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by file name, description, category, or uploader"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-orange-100 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-2xl p-5 shadow">
            <p className="text-slate-500">Open Files</p>
            <h2 className="text-3xl font-bold text-orange-500">{files.length}</h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <p className="text-slate-500">In Progress</p>
            <h2 className="text-3xl font-bold text-blue-500">
              {statusOptions.filter((status) => status === "In Progress").length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <p className="text-slate-500">Closed</p>
            <h2 className="text-3xl font-bold text-green-500">closedCount</h2>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center text-slate-500">
            Loading assigned tickets...
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center">
            <AlertCircle className="mx-auto text-red-400" size={56} />
            <h2 className="mt-4 text-2xl font-bold text-slate-700">
              Could not load assigned tickets
            </h2>
            <p className="mt-2 text-slate-500">{error}</p>
          </div>
        ) : files.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-16 text-center">
            <Ticket size={60} className="mx-auto text-orange-300" />
            <h2 className="mt-4 text-2xl font-bold text-gray-700">
              No Assigned Tickets Found
            </h2>
            <p className="text-gray-500 mt-2">
              {search
                ? "Try a different search term."
                : "There are no tickets assigned to your account yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <span className="font-bold text-orange-500">
                      {file.id}
                    </span>
                    <h2 className="text-lg font-semibold mt-3 text-gray-800 line-clamp-2">
                      {file.title}
                    </h2>
                  </div>

                  <span
                     className={`text-xs px-3 py-1 rounded-full  bg-slate-100 font-semibold ${
                        file.status === "APPROVED"
                          ? "text-green-600"
                          : file.status === "PENDING"
                            ? "text-yellow-500"
                            : file.status === "REJECTED"
                              ? "text-red-600"
                              : "text-slate-500"
                      }`} 
                  >
                    {file.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
                    {file.fileType}
                  </span>
                  <span className="inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs">
                    {file.fileName}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock  className="text-orange-500" size={15} />
                    {new Date(file.uploadedDate).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <User  className="text-orange-500" size={15} />
                    <span className="truncate">{file.uploadedBy.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AtSign 
                      size={15}
                      className="text-orange-500"   
                    />
                    <span className="text-slate-500">
                      {file.uploadedBy.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedfile(file)}
                  className="w-full mt-5 bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedfile && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedfile(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
              >
                <X size={22} />
              </button>

              <div className="pr-8">
                <p className="text-orange-500 font-semibold">
                  {selectedfile.id}
                </p>
                <h2 className="text-2xl font-bold text-slate-800 mt-2">
                  {selectedfile.title}
                </h2>
                <p className="text-slate-500 mt-2">{selectedfile.fileName}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Status</p>
                  <p
                    className={`font-semibold ${
                      selectedfile.status === "APPROVED"
                        ? "text-green-600"
                        : selectedfile.status === "PENDING"
                          ? "text-yellow-500"
                          : selectedfile.status === "REJECTED"
                            ? "text-red-600"
                            : "text-slate-500"
                    }`}                  >
                    {selectedfile.status}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Primary Email</p>
                  <p
                    className="mt-1 font-semibold text-slate-700"
                  >
                    {selectedfile.uploadedBy?.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Requester</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedfile.uploadedBy.name}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Created On</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {selectedfile.uploadedDate
                      ? new Date(selectedfile.uploadedDate).toLocaleString()
                      : "Unknown"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-slate-500 mb-2">Description</p>
                <div className="rounded-2xl bg-slate-50 p-4 text-slate-700 whitespace-pre-line leading-6">
                  {selectedfile.description}
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t pt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Change Status
                  </label>

                  <select
                    value={
                      statusDrafts[selectedfile.id] ?? selectedfile.status
                    }
                    // onChange={(e) =>
                    //   handleStatusChange(selectedfile.id, e.target.value)
                    // }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  // onClick={() => handleUpdateStatus(selectedfile)}
                  //disabled={savingFileId === selectedfile.id}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  Update
                </button>

                <div className="pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Add Comment
                  </label>

                  <textarea
                    rows="4"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment for the user..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  />

                  <button
                    type="button"
                    //onClick={handleAddComment}
                    disabled={
                      !commentText.trim() 
                    }
                    className="w-full mt-3 bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default AssignedFiles;
