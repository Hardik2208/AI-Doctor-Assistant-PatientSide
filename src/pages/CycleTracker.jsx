import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../assets/component/Header";
import Footer from "../assets/component/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  Droplet,
  Smile,
  Frown,
  Heart,
  Zap,
  Activity,
  Bed,
  AlertCircle,
  Cloud,
  Bike,
  Dumbbell,
  Footprints,
  MapPin,
  Store,
  Search,
  NotebookPen,
  CalendarDays,
  Info,
  Leaf,
  ShieldQuestion,
} from "lucide-react";

// ------------ Helpers
const fmt = (d) => d.toISOString().slice(0, 10);
const parse = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const daysBetween = (a, b) => Math.round((b - a) / 86400000);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ------------ Colors & styles
const COLORS = ["#8B5CF6", "#3B82F6", "#EC4899", "#F87171"];
const PHASE_COLORS = {
  menstrual: "bg-rose-200 text-rose-800",
  follicular: "bg-blue-200 text-blue-800",
  ovulation: "bg-pink-200 text-pink-800",
  luteal: "bg-violet-200 text-violet-800",
  none: "bg-gray-100 text-gray-500",
};
const borderForPhase = {
  menstrual: "ring-2 ring-rose-400",
  follicular: "ring-2 ring-blue-400",
  ovulation: "ring-2 ring-pink-400",
  luteal: "ring-2 ring-violet-400",
  none: "ring-1 ring-gray-200",
};

// ------------ Defaults
const today = new Date();
const defaultStart = fmt(addDays(today, -10)); // sane default if user didn't select yet

// ------------ Nearby Stores (mock data for demo)
const MOCK_STORES = [
  {
    id: 1,
    name: "CareMart Pharmacy",
    area: "Indore",
    distanceKm: 1.2,
    items: [
      { brand: "Whisper Ultra", price: 85, stock: "In Stock" },
      { brand: "Stayfree Secure", price: 72, stock: "Low Stock" },
    ],
  },
  {
    id: 2,
    name: "Health+ Medicals",
    area: "Bhopal",
    distanceKm: 3.5,
    items: [
      { brand: "Sofy Antibacteria", price: 95, stock: "In Stock" },
      { brand: "Nua Pads", price: 159, stock: "Out of Stock" },
    ],
  },
  {
    id: 3,
    name: "Apna Store",
    area: "Jaipur",
    distanceKm: 0.8,
    items: [
      { brand: "Whisper Choice", price: 52, stock: "In Stock" },
      { brand: "Stayfree Dry-Max", price: 98, stock: "In Stock" },
    ],
  },
  {
    id: 4,
    name: "City Chemists",
    area: "Mumbai",
    distanceKm: 2.1,
    items: [
      { brand: "Paree Super", price: 89, stock: "Low Stock" },
      { brand: "Kotex Overnight", price: 120, stock: "In Stock" },
    ],
  },
];

// =========================================================
const MenstrualTracker = () => {
  // ----------- Inputs
  const [lastStart, setLastStart] = useState(defaultStart);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  // ----------- Calendar view month (defaults to current)
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-index

  // ----------- Selected day logs
  // logs[yyyy-mm-dd] = { flow, moods:[], activities:[], other:[], signs:[], energy, notes }
  const [logs, setLogs] = useState({});
  const [selectedDate, setSelectedDate] = useState(fmt(today));

  // ----------- Stores search
  const [q, setQ] = useState("");
  const [storeArea, setStoreArea] = useState("");

  // Scroll helpers
  const storesRef = useRef(null);
  const educationRef = useRef(null);

  // ----------- Derived phase schedule for ~6 months horizon
  const schedule = useMemo(() => {
    if (!lastStart) return {};
    const start = parse(lastStart);
    const horizonDays = 31 * 6;
    const map = {};
    for (let i = 0; i < horizonDays; i++) {
      const d = addDays(start, i);
      const dayIdx = i % cycleLength; // 0..cycleLength-1
      let phase = "none";

      // Menstrual: day 0..periodLength-1
      if (dayIdx >= 0 && dayIdx < periodLength) phase = "menstrual";

      // Ovulation day estimation (cycleLength - 14)
      const ovuIdx = clamp(cycleLength - 14, 10, 20); // typical range
      if (dayIdx === ovuIdx) phase = "ovulation";

      // Follicular: end of bleeding up to day before ovulation
      if (dayIdx >= periodLength && dayIdx < ovuIdx) phase = "follicular";

      // Luteal: after ovulation to end of cycle
      if (dayIdx > ovuIdx) phase = "luteal";

      map[fmt(d)] = phase;
    }
    return map;
  }, [lastStart, cycleLength, periodLength]);

  // ----------- Next predicted cycle info
  const predictions = useMemo(() => {
    if (!lastStart) return null;
    const start = parse(lastStart);
    const nextStart = addDays(start, cycleLength);
    const ovulation = addDays(start, cycleLength - 14);
    const fertileStart = addDays(ovulation, -2);
    const fertileEnd = addDays(ovulation, 1);
    const periodEnd = addDays(start, periodLength - 1);
    return {
      current: {
        start,
        end: periodEnd,
      },
      next: {
        start: nextStart,
        end: addDays(nextStart, periodLength - 1),
      },
      ovulation,
      fertileStart,
      fertileEnd,
    };
  }, [lastStart, cycleLength, periodLength]);

  // ----------- Phase pie data (dynamic)
  const phaseData = useMemo(() => {
    const ovIdx = clamp(cycleLength - 14, 10, 20);
    const menstrual = clamp(periodLength, 1, 10);
    const ovulation = 1;
    const follicular = Math.max(0, ovIdx - menstrual);
    const lutealFixed = Math.max(0, cycleLength - (menstrual + follicular + ovulation));
    return [
      { name: "Menstrual", value: menstrual },
      { name: "Follicular", value: follicular },
      { name: "Ovulation", value: ovulation },
      { name: "Luteal", value: lutealFixed },
    ];
  }, [cycleLength, periodLength]);

  // ----------- Month grid
  const monthGrid = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startDay = (first.getDay() + 6) % 7; // make Monday=0
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    // Leading blanks
    for (let i = 0; i < startDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d);
      cells.push(date);
    }
    // trailing to fill 6 rows grid (42 cells)
    while (cells.length < 42) cells.push(null);
    return cells;
  }, [viewMonth, viewYear]);

  // ----------- Selection ensure in-view month
  useEffect(() => {
    const sd = parse(selectedDate);
    setViewYear(sd.getFullYear());
    setViewMonth(sd.getMonth());
  }, []); // only on mount

  // ----------- Handlers
  const setLog = (dateStr, updater) =>
    setLogs((prev) => {
      const base = prev[dateStr] ?? {
        flow: "",
        moods: [],
        activities: [],
        other: [],
        signs: [],
        energy: "",
        notes: "",
      };
      const next = typeof updater === "function" ? updater(base) : updater;
      return { ...prev, [dateStr]: next };
    });

  // ----------- Derived store results
  const filteredStores = useMemo(() => {
    const text = (q || "").toLowerCase().trim();
    const area = (storeArea || "").toLowerCase().trim();
    return MOCK_STORES.filter(
      (s) =>
        (!text ||
          s.name.toLowerCase().includes(text) ||
          s.items.some((i) => i.brand.toLowerCase().includes(text))) &&
        (!area || s.area.toLowerCase().includes(area))
    ).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [q, storeArea]);

  // =========================================================
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Track Your Menstrual Cycle
          </h1>
          <p className="text-gray-600 mt-2">
            Inputs → Calendar highlights → Predictions → Daily logs → Stores & education.
          </p>
          <div className="mt-4 flex gap-3 justify-center flex-wrap">
            <JumpButton
              icon={<CalendarDays size={16} />}
              label="Go to Calendar"
              onClick={() => {
                document.getElementById("calendar-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <JumpButton
              icon={<NotebookPen size={16} />}
              label="Go to Logs"
              onClick={() => {
                document.getElementById("logs-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <JumpButton
              icon={<Store size={16} />}
              label="Nearby Stores"
              onClick={() => storesRef.current?.scrollIntoView({ behavior: "smooth" })}
            />
            <JumpButton
              icon={<Info size={16} />}
              label="Health Education"
              onClick={() => educationRef.current?.scrollIntoView({ behavior: "smooth" })}
            />
          </div>
        </div>

        {/* Inputs + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" id="calendar-section">
          {/* Inputs */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-6 space-y-5">
            <InputRow label="Last period start date">
              <input
                type="date"
                value={lastStart}
                onChange={(e) => {
                  setLastStart(e.target.value);
                  // adjust selected date into this cycle window for better UX
                  setSelectedDate(e.target.value);
                }}
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </InputRow>

            <InputRow label="Average cycle length (days)">
              <input
                type="number"
                min={20}
                max={40}
                value={cycleLength}
                onChange={(e) => setCycleLength(clamp(Number(e.target.value || 28), 20, 40))}
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </InputRow>

            <InputRow label="Period length (days)">
              <input
                type="number"
                min={2}
                max={10}
                value={periodLength}
                onChange={(e) => setPeriodLength(clamp(Number(e.target.value || 5), 2, 10))}
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </InputRow>

            {/* Predictions */}
            {predictions && (
              <div className="rounded-xl bg-gray-50 border p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Predictions</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    Current period:{" "}
                    <span className="font-medium">
                      {predictions.current.start.toDateString()} → {predictions.current.end.toDateString()}
                    </span>
                  </li>
                  <li>
                    Ovulation: <span className="font-medium">{predictions.ovulation.toDateString()}</span>
                  </li>
                  <li>
                    Fertile window:{" "}
                    <span className="font-medium">
                      {predictions.fertileStart.toDateString()} → {predictions.fertileEnd.toDateString()}
                    </span>
                  </li>
                  <li>
                    Next period:{" "}
                    <span className="font-medium">
                      {predictions.next.start.toDateString()} → {predictions.next.end.toDateString()}
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* Pie chart (with bottom spacing) */}
            <div className="flex flex-col items-center mb-6">
              <h4 className="font-semibold text-gray-700 mb-3px">Cycle Overview</h4>
              <div className="flex justify-center mb-2"></div>
              <PieChart width={280} height={280}>
                <Pie
                  data={phaseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {phaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Calendar */}
          <div className="lg:col-span-3 bg-white shadow-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <CalendarDays size={18} />{" "}
                {new Date(viewYear, viewMonth, 1).toLocaleString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded-lg border hover:bg-gray-50"
                  onClick={() => {
                    const d = new Date(viewYear, viewMonth - 1, 1);
                    setViewYear(d.getFullYear());
                    setViewMonth(d.getMonth());
                  }}
                >
                  ←
                </button>
                <button
                  className="px-3 py-1 rounded-lg border hover:bg-gray-50"
                  onClick={() => {
                    const d = new Date(viewYear, viewMonth + 1, 1);
                    setViewYear(d.getFullYear());
                    setViewMonth(d.getMonth());
                  }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 text-xs mt-6 ">
              
              <LegendPill colorClass={PHASE_COLORS.menstrual} label="Menstrual" />
              <LegendPill colorClass={PHASE_COLORS.follicular} label="Follicular" />
              <LegendPill colorClass={PHASE_COLORS.ovulation} label="Ovulation" />
              <LegendPill colorClass={PHASE_COLORS.luteal} label="Luteal" />
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-gray-700 text-sm">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
                <div key={i} className="font-semibold">
                  {d}
                </div>
              ))}

              {monthGrid.map((dateObj, i) => {
                if (!dateObj) return <div key={i} className="p-3 rounded-lg bg-gray-50" />;
                const ds = fmt(dateObj);
                const phase = schedule[ds] ?? "none";
                const isSelected = ds === selectedDate;
                const isToday = fmt(today) === ds;

                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(ds)}
                    className={[
                      "p-2 rounded-lg transition text-sm flex flex-col items-center gap-1",
                      isSelected ? "bg-gray-900 text-white" : "hover:bg-gray-50 bg-white border",
                      isSelected ? "" : borderForPhase[phase],
                    ].join(" ")}
                    title={phase}
                  >
                    <span className="font-medium">{dateObj.getDate()}</span>
                    <span
                      className={[
                        "px-2 py-0.5 rounded-full text-[10px] leading-4",
                        isSelected ? "bg-white/20" : PHASE_COLORS[phase],
                      ].join(" ")}
                    >
                      {phase === "none" ? "" : phase}
                    </span>
                    {isToday && !isSelected && (
                      <span className="text-[9px] text-emerald-600">today</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Symptoms & Daily Logs */}
        <div id="logs-section" className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LogCard title={`Logs: ${selectedDate}`}>
            <div className="text-xs text-gray-500 mb-3">
              Select a date from calendar, then tap chips to record. Auto-saved.
            </div>

            {/* Flow (single) */}
            <ChipGroup
              title="Menstruation Flow"
              type="single"
              value={logs[selectedDate]?.flow || ""}
              onChange={(val) =>
                setLog(selectedDate, (b) => ({ ...b, flow: val === b.flow ? "" : val }))
              }
              items={[
                { label: "Light", icon: <Droplet size={16} /> },
                { label: "Medium", icon: <Droplet size={16} /> },
                { label: "Heavy", icon: <Droplet size={16} /> },
                { label: "Spotting", icon: <Droplet size={16} /> },
              ]}
              color="red"
            />

            {/* Moods (multi) */}
            <ChipGroup
              title="Moods"
              type="multi"
              value={logs[selectedDate]?.moods || []}
              onChange={(arr) => setLog(selectedDate, (b) => ({ ...b, moods: arr }))}
              items={[
                { label: "Neutral", icon: <Smile size={16} /> },
                { label: "Happy", icon: <Smile size={16} /> },
                { label: "Sad", icon: <Frown size={16} /> },
                { label: "Sensitive", icon: <Heart size={16} /> },
              ]}
              color="pink"
            />

            {/* Activities (multi) */}
            <ChipGroup
              title="Physical Activity"
              type="multi"
              value={logs[selectedDate]?.activities || []}
              onChange={(arr) => setLog(selectedDate, (b) => ({ ...b, activities: arr }))}
              items={[
                { label: "Gym", icon: <Dumbbell size={16} /> },
                { label: "Walking", icon: <Footprints size={16} /> },
                { label: "Running", icon: <Activity size={16} /> },
                { label: "Cycling", icon: <Bike size={16} /> },
              ]}
              color="purple"
            />

            {/* Other body symptoms (multi) */}
            <ChipGroup
              title="Other Body Symptoms"
              type="multi"
              value={logs[selectedDate]?.other || []}
              onChange={(arr) => setLog(selectedDate, (b) => ({ ...b, other: arr }))}
              items={[
                { label: "Bloating", icon: <Cloud size={16} /> },
                { label: "Fatigue", icon: <Bed size={16} /> },
                { label: "Nausea", icon: <AlertCircle size={16} /> },
                { label: "Insomnia", icon: <Bed size={16} /> },
              ]}
              color="blue"
            />

            {/* Signs (multi) */}
            <ChipGroup
              title="Signs"
              type="multi"
              value={logs[selectedDate]?.signs || []}
              onChange={(arr) => setLog(selectedDate, (b) => ({ ...b, signs: arr }))}
              items={[
                { label: "All Good", icon: <Smile size={16} /> },
                { label: "Cramps", icon: <AlertCircle size={16} /> },
                { label: "Headache", icon: <Frown size={16} /> },
                { label: "Acne", icon: <AlertCircle size={16} /> },
              ]}
              color="violet"
            />

            {/* Energy (single) */}
            <ChipGroup
              title="Energy Levels"
              type="single"
              value={logs[selectedDate]?.energy || ""}
              onChange={(val) =>
                setLog(selectedDate, (b) => ({ ...b, energy: val === b.energy ? "" : val }))
              }
              items={[
                { label: "High", icon: <Zap size={16} /> },
                { label: "Medium", icon: <Zap size={16} /> },
                { label: "Low", icon: <Zap size={16} /> },
                { label: "Exhausted", icon: <Bed size={16} /> },
              ]}
              color="gray"
            />

            {/* Notes */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Add Personal Notes
              </label>
              <textarea
                rows="4"
                value={logs[selectedDate]?.notes || ""}
                onChange={(e) =>
                  setLog(selectedDate, (b) => ({ ...b, notes: e.target.value }))
                }
                placeholder="Write your notes here..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </LogCard>

          {/* Compact summary of today's log */}
          <LogCard title="Today at a glance">
            <SummaryBlock dateStr={selectedDate} logs={logs} schedule={schedule} />
          </LogCard>

          {/* Education + Phases */}
          <div className="bg-white shadow-md rounded-2xl p-6" ref={educationRef}>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Phases & Health Education</h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <PhaseCard title="Menstrual" text="Day 1–5 • Bleeding • Low energy" color="purple" />
              <PhaseCard title="Follicular" text="Day 5–13 • High energy • Estrogen rising" color="blue" />
              <PhaseCard title="Ovulation" text="Day 14 • Peak fertility" color="pink" />
              <PhaseCard title="Luteal" text="Day 15–28 • PMS likely" color="rose" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              <InfoCard
                icon={<Leaf />}
                title="Healthy Period Practices"
                bullets={[
                  "Change pads every 4–6 hours",
                  "Stay hydrated, eat iron-rich foods",
                  "Gentle movement helps cramps",
                ]}
              />
              <InfoCard
                icon={<ShieldQuestion />}
                title="Breaking Myths"
                bullets={[
                  "Periods ≠ impurity",
                  "Exercising is safe",
                  "Pain isn’t ‘normal’ if severe—consult a doctor",
                ]}
              />
              <InfoCard
                icon={<Store />}
                title="Nearby Stores Availability"
                bullets={[
                  "Search by brand or area",
                  "Compare price & stock",
                  "Sort by distance (auto)",
                ]}
              />
            </div>

          </div>
        </div>

        {/* Nearby Stores Availability */}
        <div ref={storesRef} className="mt-10 bg-white shadow-md rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Store size={18} /> Nearby Stores Availability
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border">
                <Search size={16} className="shrink-0" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search brand / store..."
                  className="outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border">
                <MapPin size={16} className="shrink-0" />
                <input
                  value={storeArea}
                  onChange={(e) => setStoreArea(e.target.value)}
                  placeholder="Area / City"
                  className="outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map((s) => (
              <div key={s.id} className="border rounded-xl p-4 hover:shadow-sm transition">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> {s.area} • {s.distanceKm} km
                    </div>
                  </div>
                </div>
                <div className="mt-3 border-t pt-3 space-y-2">
                  {s.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{it.brand}</span>
                      <span className="text-gray-600">₹{it.price}</span>
                      <span
                        className={
                          "text-xs px-2 py-0.5 rounded-full " +
                          (it.stock === "In Stock"
                            ? "bg-emerald-100 text-emerald-700"
                            : it.stock === "Low Stock"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-rose-100 text-rose-700")
                        }
                      >
                        {it.stock}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {filteredStores.length === 0 && (
              <div className="col-span-full text-center text-gray-500">No matches found.</div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              storesRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-3 rounded-full bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition"
          >
            Nearby Stores Availability
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              educationRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-3 rounded-full bg-pink-500 text-white font-medium shadow hover:bg-pink-600 transition"
          >
            Healthy Period Practices
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              educationRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-3 rounded-full bg-purple-500 text-white font-medium shadow hover:bg-purple-600 transition"
          >
            Breaking Myths (Stigma Busting)
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

// ====================== UI Subcomponents ======================
const JumpButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-3 py-2 rounded-full border bg-white hover:bg-gray-50"
  >
    {icon} <span className="text-sm">{label}</span>
  </button>
);

const InputRow = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    {children}
  </div>
);

const LegendPill = ({ colorClass, label }) => (
  <span className={`px-2 py-1 rounded-full ${colorClass}`}>{label}</span>
);

// Reusable chip / pills
const colorMap = {
  red: "bg-red-100 text-red-700 hover:bg-red-200",
  pink: "bg-pink-100 text-pink-700 hover:bg-pink-200",
  purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  violet: "bg-violet-100 text-violet-700 hover:bg-violet-200",
  gray: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  rose: "bg-rose-100 text-rose-700 hover:bg-rose-200",
};

const Chip = ({ active, onClick, children, color = "gray" }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition ${active ? "bg-gray-900 text-white" : colorMap[color]
      }`}
  >
    {children}
  </button>
);

const ChipGroup = ({ title, type, value, onChange, items, color }) => {
  const handleClick = (label) => {
    if (type === "single") {
      onChange(label);
      return;
    }
    // multi
    const set = new Set(value || []);
    if (set.has(label)) set.delete(label);
    else set.add(label);
    onChange([...set]);
  };

  return (
    <div className="mb-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((it, idx) => {
          const active = type === "single" ? value === it.label : (value || []).includes(it.label);
          return (
            <Chip key={idx} active={active} color={color} onClick={() => handleClick(it.label)}>
              {it.icon} {it.label}
            </Chip>
          );
        })}
      </div>
    </div>
  );
};

const LogCard = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-2xl p-6">
    <h3 className="text-md font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

const PhaseCard = ({ title, text, color }) => (
  <div className={`rounded-xl border-l-4 p-4 ${colorMap[color]}`}>
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{text}</p>
  </div>
);

// ===== InfoCard with click-to-toggle =====
const InfoCard = ({ icon, title, bullets }) => {
  return (
    <div
      className="rounded-xl border p-4 cursor-pointer shadow-sm hover:shadow-md transition bg-white group"
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-800 font-semibold mb-2">
        {icon} {title}
      </div>

      {/* Details - hidden by default, show on hover of this card only */}
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 hidden group-hover:block">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
};


const SummaryBlock = ({ dateStr, logs, schedule }) => {
  const l = logs[dateStr];
  const phase = schedule[dateStr] ?? "none";
  return (
    <div className="text-sm text-gray-700 space-y-2">
      <div>
        <span className="text-gray-500">Phase: </span>
        <span className="font-medium capitalize">{phase === "none" ? "—" : phase}</span>
      </div>
      <div>
        <span className="text-gray-500">Flow: </span>
        <span className="font-medium">{l?.flow || "—"}</span>
      </div>
      <RowList label="Moods" items={l?.moods} />
      <RowList label="Activities" items={l?.activities} />
      <RowList label="Symptoms" items={l?.other} />
      <RowList label="Signs" items={l?.signs} />
      <div>
        <span className="text-gray-500">Energy: </span>
        <span className="font-medium">{l?.energy || "—"}</span>
      </div>
      <div className="border-t pt-2">
        <div className="text-gray-500">Notes</div>
        <div className="text-gray-800">{l?.notes?.trim() || "—"}</div>
      </div>
    </div>
  );
};

const RowList = ({ label, items }) => (
  <div>
    <span className="text-gray-500">{label}: </span>
    <span className="font-medium">{items?.length ? items.join(", ") : "—"}</span>
  </div>
);

export default MenstrualTracker;
