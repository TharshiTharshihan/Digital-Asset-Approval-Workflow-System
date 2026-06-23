import { useMemo, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const STATUS_COLORS = {
  Open: "#f97316",
  "In Progress": "#3b82f6",
  Resolved: "#f59e0b",
  Closed: "#22c55e",
};

// const ROLE_TITLES = {
//   admin: "Admin Dashboard",
//   agent: "Dashboard Agent",
//   user: "My Dashboard",
// };

const Dashboard = () => {
  
  const { currentUser } = useSelector((state) => state.user);

  console.log("currentUser is: ", currentUser);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusCounts = useMemo(() => {
    return [
      { name: "Open", value: 1 },
      { name: "In Progress", value: 1 },
      { name: "Resolved", value: 1 },
      { name: "Closed", value: 1 },
    ];
  }, []);

  const statusBarData = useMemo(() => {
    return [
      { name: "Open", value: 1 },
      { name: "In Progress", value: 1 },
      { name: "Resolved", value: 1 },
      { name: "Closed", value: 1 },
    ];
  }, []);
  //    localStorage.setItem("role");

  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="bg-linear-to-r from-green-500 to-green-600 rounded-3xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            {currentUser?.role === "ADMIN"
              ? "Admin Dashboard"
              : currentUser?.role === "MANAGER"
                ? "Manager Dashboard"
                : "Employee Dashboard"}
          </h1>
          <p className="mt-3 text-green-100">
            Welcome back, {currentUser?.name || "User"}. Here is your live
            ticket summary.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center text-slate-500">
            Loading dashboard...
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-slate-500">Total Tickets</p>
                <h2 className="text-4xl font-bold text-orange-500">1 </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-slate-500">Open</p>
                <h2 className="text-4xl font-bold text-orange-500">1 </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-slate-500">In Progress</p>
                <h2 className="text-4xl font-bold text-blue-500">1 </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-slate-500">Resolved</p>
                <h2 className="text-4xl font-bold text-amber-500">1 </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <p className="text-slate-500">Closed</p>
                <h2 className="text-4xl font-bold text-green-500">1</h2>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="bg-slate-100 rounded-3xl shadow p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Ticket Status Breakdown
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Pie chart of ticket statuses
                  </p>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusCounts}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={65}
                        paddingAngle={3}
                      >
                        {statusCounts.map((entry) => (
                          <Cell
                            key={entry.name}
                            fill={STATUS_COLORS[entry.name] || "#cbd5e1"}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-100 rounded-3xl shadow p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Status Graph
                  </h2>
                  <p className="text-slate-500 mt-1">
                    Bar graph of the same ticket summary
                  </p>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusBarData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {statusBarData.map((entry) => (
                          <Cell
                            key={entry.name}
                            fill={STATUS_COLORS[entry.name] || "#94a3b8"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Recent Tickets
              </h2>

              {/* {recentTickets.length === 0 ? (
                <p className="text-slate-500">No tickets available.</p>
              ) : (
                <div className="space-y-4">
                  {recentTickets.map((ticket) => (
                    <div
                      key={ticket._id}
                      className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {ticket.title}
                        </h3>
                        <p className="text-slate-500 text-sm">
                          {ticket.ticketNumber} • {ticket.category}
                        </p>
                      </div>

                      <span
                        className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium ${
                          ticket.status === "Open"
                            ? "bg-orange-100 text-orange-600"
                            : ticket.status === "In Progress"
                              ? "bg-blue-100 text-blue-600"
                              : ticket.status === "Resolved"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-green-100 text-green-600"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default Dashboard;
