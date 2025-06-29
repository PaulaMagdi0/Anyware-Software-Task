import { useState, useMemo } from "react";
import {
  Search,
  Bell,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Menu as MenuIcon,
  X,
  TrendingUp,
} from "lucide-react";
import {
  useGetQuizzesQuery,
  useGetAnnouncementsQuery,
} from "../services/apiSlice";
import Navbar from "../components/Navbar";
import { IconButton } from "@mui/material";

const Dashboard = ({
  mode,
  setMode,
}: {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}) => {
  const [activeView, setActiveView] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // API calls
  const {
    data: quizzes = [],
    isLoading: quizzesLoading,
    isError: quizzesError,
  } = useGetQuizzesQuery({});

  const {
    data: announcements = [],
    isLoading: announcementsLoading,
    isError: announcementsError,
  } = useGetAnnouncementsQuery({});

  const darkMode = mode === "dark";

  // Calculate stats from real data
  const stats = useMemo(() => {
    const uniqueCourses = new Set(quizzes.map((q) => q.courseName)).size;
    const totalQuizzes = quizzes.length;
    const totalAnnouncements = announcements.length;

    return [
      {
        label: "Courses",
        value: uniqueCourses,
        icon: BookOpen,
        color: "bg-blue-500",
      },
      {
        label: "Active Quizzes",
        value: totalQuizzes,
        icon: Clock,
        color: "bg-orange-500",
      },
      {
        label: "Announcements",
        value: totalAnnouncements,
        icon: Bell,
        color: "bg-green-500",
      },
      {
        label: "Total Items",
        value: totalQuizzes + totalAnnouncements,
        icon: TrendingUp,
        color: "bg-purple-500",
      },
    ];
  }, [quizzes, announcements]);

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let filtered = [];

    if (activeView === "all" || activeView === "announcements") {
      filtered = [
        ...filtered,
        ...announcements.map((a) => ({ ...a, type: "announcement" })),
      ];
    }

    if (activeView === "all" || activeView === "quizzes") {
      filtered = [...filtered, ...quizzes.map((q) => ({ ...q, type: "quiz" }))];
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.topic?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date || a.dueDate);
        const dateB = new Date(b.date || b.dueDate);
        return dateB - dateA;
      }
      return 0;
    });
  }, [activeView, searchTerm, sortBy, announcements, quizzes]);

  // Loading and error states
  if (quizzesLoading || announcementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (quizzesError || announcementsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load dashboard
          </h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    {
      id: "all",
      label: "All",
      icon: MenuIcon,
      count: announcements.length + quizzes.length,
    },
    {
      id: "announcements",
      label: "Announcements",
      icon: Bell,
      count: announcements.length,
    },
    { id: "quizzes", label: "Quizzes", icon: BookOpen, count: quizzes.length },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navbar with sidebar controls */}
      <Navbar
        mode={mode}
        setMode={setMode}
        sidebarToggle={true}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:relative lg:translate-x-0 z-40 w-64 h-screen transition-transform duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border-r`}
        >
          <div className="p-4 h-full flex flex-col">
            {/* Close button for mobile sidebar */}
            <div className="lg:hidden p-2 mb-2 flex justify-end">
              <IconButton
                onClick={() => setSidebarOpen(false)}
                className={darkMode ? "text-white" : "text-black"}
                sx={{ p: 1 }}
              >
                <X size={20} />
              </IconButton>
            </div>

            <nav className="space-y-2 flex-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      activeView === item.id
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-600 border border-blue-200"
                        : darkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activeView === item.id
                          ? darkMode
                            ? "bg-blue-500"
                            : "bg-blue-100"
                          : darkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {/* Stats Cards */}
          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } border rounded-xl p-4 hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search
                  size={20}
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search announcements and quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="date">Sort by Date</option>
              </select>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item) => (
                <div
                  key={`${item.type}-${item._id}`}
                  className={`${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  } border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  {item.type === "announcement" ? (
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Bell size={16} className="text-blue-500" />
                          <span className="text-sm font-medium text-blue-600">
                            Announcement
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mb-3">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.teacherName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <h3 className="font-bold text-lg">
                          {item.teacherName}
                        </h3>
                      </div>
                      <p
                        className={`text-sm mb-4 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <BookOpen size={16} className="text-purple-500" />
                          <span className="text-sm font-medium text-purple-600">
                            Quiz
                          </span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p
                        className={`text-sm mb-3 ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {item.courseName} • {item.topic}
                      </p>
                      <div className="flex items-center space-x-1 mb-4">
                        <Calendar
                          size={14}
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <a
                        href={item.quizLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 text-decoration-none"
                      >
                        <span>Start Quiz</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <Search
                    size={24}
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
