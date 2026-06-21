import {
  Menu,
  FolderKanban,
  BadgeCheck,
  Clock3,
  CheckCheck,
  Users,
  Workflow,
  Search,
  ArrowRight,
  LayoutDashboard,
  FileCheck,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto w-full max-w-[1800px] overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl shadow-slate-200/70">
        {/* Navbar */}
        <header className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-10 sm:py-6 bg-white/90 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/20">
              <FolderKanban className="h-5 w-5 text-white" />
            </div>

            <span className="text-lg font-bold text-slate-800 sm:text-xl">
              AssetFlow
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Asset Submission
            </a>

            <a href="#" className="text-slate-600 hover:text-slate-900">
              Review Queue
            </a>

            <a href="#" className="text-slate-600 hover:text-slate-900">
              Approval Workflow
            </a>

            <a href="#" className="text-slate-600 hover:text-slate-900">
              Version Control
            </a>

            <a href="#" className="text-slate-600 hover:text-slate-900">
              Analytics
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2 lg:hidden">
              <Menu className="h-5 w-5 text-slate-600" />
            </button>

            <button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-white transition hover:opacity-95">
              <a href="/login">Login</a>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center px-4 py-10 text-center sm:px-6 lg:px-10 lg:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.14),transparent_28%)]" />

          {/* Info Strip */}
          <div className="relative z-10 mb-8 flex flex-col items-center gap-4 rounded-full border border-orange-100 bg-white px-5 py-3 shadow-lg shadow-slate-200/70 backdrop-blur sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              Secure asset management
            </div>

            <div className="hidden h-4 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock3 className="h-4 w-4 text-orange-400" />
              Faster approval cycles
            </div>

            <div className="hidden h-4 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4 text-sky-400" />
              Built for teams & stakeholders
            </div>
          </div>

          {/* Hero Heading */}
          <h1 className="relative z-10 max-w-5xl text-4xl font-bold leading-tight text-slate-800 md:text-6xl">
            Streamline Digital Asset Reviews,
            <br />
            Approvals & Publishing
          </h1>

          {/* Hero Description */}
          <p className="relative z-10 mt-6 max-w-3xl text-lg text-slate-600">
            Manage creative assets, marketing materials, documents, and media
            files through automated approval workflows, stakeholder reviews, and
            complete lifecycle tracking from a single platform.
          </p>

          {/* CTA Buttons */}
          <div className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:opacity-95">
              <LayoutDashboard className="h-5 w-5" />
              Open Workspace
            </button>

            <button className="flex items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-4 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              <CheckCheck className="h-5 w-5" />
              View Approval Process
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative z-10 mt-16 w-full">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=2160&q=80"
              alt="Digital Asset Approval Workflow"
              className="mx-auto h-[450px] w-full max-w-5xl rounded-3xl object-cover shadow-2xl shadow-slate-200/70"
            />

            {/* Left Card */}
            <div className="absolute left-10 top-20 hidden w-64 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl lg:block">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
                  <Workflow className="h-5 w-5 text-white" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Workflow Automation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Approval orchestration
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Automatically route assets to reviewers and approvers based on
                predefined business workflows.
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-orange-600">
                <CheckCheck className="h-4 w-4" />
                Reduce approval bottlenecks
              </div>
            </div>

            {/* Right Card */}
            <div className="absolute right-10 top-32 hidden w-60 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl lg:block">
              <div className="mb-3 flex justify-between">
                <span className="text-xs uppercase text-slate-500">
                  Version Control
                </span>

                <BadgeCheck className="h-4 w-4 text-orange-500" />
              </div>

              <h3 className="font-bold text-slate-800">
                Approval Monitoring
              </h3>

              <p className="text-sm text-slate-500">
                Pending Review • Under Approval • Published
              </p>

              <div className="mt-4 text-sm text-orange-600">
                Complete revision history available
              </div>
            </div>

            {/* Search Box */}
            <div className="absolute left-1/2 -bottom-8 w-[90%] max-w-md -translate-x-1/2">
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-2xl">
                <Search className="h-5 w-5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search assets, campaigns, approvals..."
                  className="flex-1 px-3 outline-none"
                />

                <button className="rounded-xl bg-orange-500 p-2 text-white">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grid gap-4 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-3 lg:px-10">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-100">
            <div className="flex items-center gap-3 text-slate-800">
              <FileCheck className="h-5 w-5 text-orange-400" />
              <h3 className="text-lg font-semibold">Asset Visibility</h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Track submitted, under-review, approved, rejected, and published
              assets through a centralized dashboard.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-100">
            <div className="flex items-center gap-3 text-slate-800">
              <BadgeCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold">
                Multi-Level Approvals
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Configure review and approval chains involving managers, legal
              teams, marketing leads, and stakeholders.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-100">
            <div className="flex items-center gap-3 text-slate-800">
              <Users className="h-5 w-5 text-sky-400" />
              <h3 className="text-lg font-semibold">
                Collaboration & Feedback
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Share comments, request revisions, and maintain approval history
              for transparent decision-making.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;