import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkoutPage from "./pages/WorkoutPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

const tabs = [
  { to: "/", label: "Главная", icon: "🏠" },
  { to: "/workout", label: "Тренировка", icon: "➕" },
  { to: "/reports", label: "Отчёты", icon: "📊" },
  { to: "/settings", label: "Настройки", icon: "⚙️" },
];

export default function App() {
  return (
    <div className="flex flex-col min-h-full">
      <main className="flex-1 pb-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>

      <nav className="fixed bottom-0 inset-x-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-4 max-w-lg mx-auto">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center py-2 text-xs ${
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500"
                }`
              }
            >
              <span className="text-lg">{t.icon}</span>
              {t.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}