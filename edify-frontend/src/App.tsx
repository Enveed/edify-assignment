import { useEffect, useState } from "react";
import { Bell, ChevronRight, Menu, X } from "lucide-react";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import OngoingCourse from "./components/OngoingCourse";
import Login from "./pages/Login";
import Course from "./interfaces/Course.interface";
import Session from "./interfaces/Session.interface";

function App() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ongoingCourses, setOngoingCourses] = useState<Course[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/dashboard`
        );
        if (!res.ok) throw Error("API call failed!");
        const jsonRes = await res.json();
        setOngoingCourses(jsonRes.ongoingCourses);
        setUpcomingSessions(jsonRes.upcomingSessions);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login handleLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <button
          title="menu-button"
          type="button"
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {leftSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <h1 className="text-xl font-bold">
          <span className="text-[#48515f]">edify</span>
          <span className="text-[#19b5ea]">ello</span>
        </h1>
        <button
          title="notification-button"
          type="button"
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {rightSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Bell className="w-6 h-6" />
          )}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div
          className={`
            fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-30
            transform transition-transform duration-300 ease-in-out w-[60%] lg:w-[20%]
            ${leftSidebarOpen ? "translate-x-0" : "-translate-x-[200%]"}
          `}
        >
          <LeftSidebar
            onClose={() => setLeftSidebarOpen(false)}
            handleLogout={() => setIsAuthenticated(false)}
          />
        </div>

        {/* Background overlay for mobile when sidebar is open */}
        {(leftSidebarOpen || rightSidebarOpen) && (
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-20 lg:hidden"
            onClick={() => {
              setLeftSidebarOpen(false);
              setRightSidebarOpen(false);
            }}
          />
        )}

        {/* Center content */}
        <main className="flex-1 min-h-screen bg-white p-6 overflow-y-auto w-[55%]">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-black mb-4">
              My dashboard
            </h2>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Ongoing courses
                </h3>
                <a
                  href="#"
                  className="text-[#646464] text-sm hover:text-[#19b5ea] flex items-center gap-1"
                >
                  View all courses
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ongoingCourses.length > 0 &&
                  ongoingCourses.map((course) => (
                    <OngoingCourse
                      title={course.name}
                      unit={course.currentUnit}
                      progress={course.progress}
                      icon={course.icon}
                      key={course.id}
                    />
                  ))}
              </div>
            </section>
          </div>
        </main>

        {/* Right Sidebar */}
        <div
          className={`
            fixed lg:relative lg:translate-x-0 inset-y-0 right-0 z-30
            transform transition-transform duration-300 ease-in-out w-[60%] lg:w-[25%]
            ${rightSidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <RightSidebar
            onClose={() => setRightSidebarOpen(false)}
            upcomingSessions={upcomingSessions}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
