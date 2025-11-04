import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import PatientCard from "./components/PatientCard";
import ChatPanel from "./components/ChatPanel";
import TriageSummary from "./components/TriageSummary";

function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function analyze(symptoms, complaint) {
  const text = (complaint + " " + symptoms.join(" ")).toLowerCase();
  let risk = "Low";
  const conditions = new Set();
  const steps = new Set([
    "Clarify onset, duration, and severity",
    "Review relevant medical history",
  ]);

  const flag = (kws, cond, r = null) => {
    if (kws.some((k) => text.includes(k))) {
      conditions.add(cond);
      if (r) risk = r;
    }
  };

  flag(["fever", "chills"], "Viral upper respiratory infection");
  flag(["cough", "sore throat"], "Pharyngitis");
  flag(["shortness of breath", "sob", "dyspnea"], "Possible lower respiratory involvement", "Moderate");
  flag(["chest pain"], "Consider cardiac etiologies", "High");
  flag(["headache"], "Tension or migraine headache");

  if (risk === "High") {
    steps.add("Initiate urgent evaluation and consider ECG, troponin");
  } else if (risk === "Moderate") {
    steps.add("Order vitals, pulse oximetry, and consider CXR if warranted");
  } else {
    steps.add("Symptomatic management; provide return precautions");
  }

  return {
    riskLevel: risk,
    conditions: Array.from(conditions),
    nextSteps: Array.from(steps),
  };
}

export default function App() {
  const [patient] = useState({
    name: "Alex Johnson",
    age: 34,
    sex: "Male",
    id: "PT-10482",
    allergies: "Penicillin",
  });

  const [symptoms, setSymptoms] = useState([]);
  const [complaint, setComplaint] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello, I'm your clinical assistant. What brings you in today?",
      time: nowTime(),
    },
  ]);

  const summary = useMemo(() => analyze(symptoms, complaint), [symptoms, complaint]);

  const suggestions = [
    "Summarize current case",
    "List differential diagnoses",
    "Recommend next steps",
  ];

  const onAddSymptom = (s) => {
    setSymptoms((prev) => (prev.includes(s) ? prev : [...prev, s]));
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `Symptom added: ${s}`, time: nowTime() },
      { role: "bot", text: botAutoResponse(s, complaint), time: nowTime() },
    ]);
  };

  const onSetComplaint = (c) => {
    setComplaint(c);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: c, time: nowTime() },
      { role: "bot", text: botAutoResponse(c, c), time: nowTime() },
    ]);
  };

  const onSend = (text) => {
    setMessages((prev) => [...prev, { role: "user", text, time: nowTime() }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: botAutoResponse(text, complaint), time: nowTime() },
      ]);
    }, 500);
  };

  const onFinalize = () => {
    const note = makeNote({ patient, symptoms, complaint, summary });
    window.alert(note);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <Header patient={patient} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <PatientCard
              patient={patient}
              symptoms={symptoms}
              onAddSymptom={onAddSymptom}
              onSetComplaint={onSetComplaint}
            />
          </div>

          <div className="lg:col-span-6 h-[70vh]">
            <ChatPanel messages={messages} onSend={onSend} suggestions={suggestions} />
          </div>

          <div className="lg:col-span-3">
            <TriageSummary
              symptoms={symptoms}
              riskLevel={summary.riskLevel}
              conditions={summary.conditions}
              nextSteps={summary.nextSteps}
              onFinalize={onFinalize}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function botAutoResponse(text, context = "") {
  const t = text.toLowerCase();
  if (t.includes("summarize")) return summarize(context);
  if (t.includes("differential") || t.includes("list")) return listDifferential(context);
  if (t.includes("next step") || t.includes("recommend")) return recommendNextSteps(context);
  if (t.includes("fever")) return "Fever noted. Any associated cough, sore throat, or body aches?";
  if (t.includes("cough")) return "Is the cough dry or productive? Any shortness of breath or chest pain?";
  if (t.includes("headache")) return "Headache acknowledged. Please rate severity (0-10) and note any photophobia or aura.";
  return "Got it. Please share onset, duration, severity, and any aggravating or relieving factors.";
}

function summarize(context) {
  return `Summary: Patient reports ${context || "symptoms"}. Will assess severity, duration, and associated features to refine differential.`;
}

function listDifferential(context) {
  return `Differential: Viral URI, Pharyngitis, Migraine/Tension headache, and others depending on exam findings. Context: ${context || "N/A"}.`;
}

function recommendNextSteps(context) {
  return `Next steps: Obtain vitals, focused exam, consider symptomatic treatment. If red flags (e.g., chest pain, SOB), escalate. Context: ${context || "N/A"}.`;
}

function makeNote({ patient, symptoms, complaint, summary }) {
  return (
    `Clinical Note\n` +
    `Patient: ${patient.name} (${patient.age}, ${patient.sex})\n` +
    `ID: ${patient.id}\n` +
    `Chief Complaint: ${complaint || "-"}\n` +
    `Symptoms: ${symptoms.join(", ") || "-"}\n` +
    `Risk Level: ${summary.riskLevel}\n` +
    `Probable Conditions: ${summary.conditions.join(", ") || "-"}\n` +
    `Next Steps: ${summary.nextSteps.join(" | ") || "-"}`
  );
}
