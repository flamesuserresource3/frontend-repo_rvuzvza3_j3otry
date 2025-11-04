import React from "react";
import Spline from "@splinetool/react-spline";
import HeaderBar from "./components/HeaderBar";
import Dashboard from "./components/Dashboard";
import Appointment from "./components/Appointment";
import Reports from "./components/Reports";

export default function App() {
  const [screen, setScreen] = React.useState("dashboard");

  const nextScreen = () => {
    if (screen === "dashboard") setScreen("appointment");
    else if (screen === "appointment") setScreen("report");
    else setScreen("dashboard");
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Hero with Spline cover */}
      <section className="relative h-[340px] w-full overflow-hidden">
        <Spline
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
        {/* Gradient overlay for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">Clinical Bot — Patient Portal</h2>
            <p className="mt-2 text-slate-200 max-w-2xl">
              Dark background with a 3D heart — a modern, healthcare-focused experience.
              Manage your health, appointments, and reports in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 pb-10 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-sky-100 p-4">
          <HeaderBar screen={screen} onNext={nextScreen} />
          <main className="py-2">
            {screen === "dashboard" && <Dashboard />}
            {screen === "appointment" && <Appointment />}
            {screen === "report" && <Reports />}
          </main>
        </div>
      </div>
    </div>
  );
}
