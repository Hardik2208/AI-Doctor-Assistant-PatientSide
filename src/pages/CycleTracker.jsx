import React from "react";
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
} from "lucide-react"; // ✅ icons

const MenstrualTracker = () => {
  const phaseData = [
    { name: "Menstrual", value: 5 },
    { name: "Follicular", value: 9 },
    { name: "Ovulation", value: 1 },
    { name: "Luteal", value: 13 },
  ];

  const COLORS = ["#8B5CF6", "#3B82F6", "#EC4899", "#F87171"];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Track Your Menstrual Cycle
          </h1>
          <p className="text-gray-600 mt-2">
            Take care of your cycle using symptoms and predictions. <br />
            We will help you understand your body.
          </p>
        </div>

        {/* Inputs + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Left: Inputs */}
          <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last period started on
              </label>
              <input
                type="date"
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Average Cycle Length
              </label>
              <input
                type="number"
                defaultValue="28"
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Period Length
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full mt-2 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Right: Calendar */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">May</h2>
            <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
                <div key={i} className="font-semibold">
                  {d}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg ${
                    [13, 14, 15, 16, 17].includes(i + 1)
                      ? "bg-pink-200 text-pink-800 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Symptoms Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card
            title="Menstruation Flow"
            items={[
              { label: "Light", icon: <Droplet size={16} /> },
              { label: "Medium", icon: <Droplet size={16} /> },
              { label: "Heavy", icon: <Droplet size={16} /> },
              { label: "Spotting", icon: <Droplet size={16} /> },
            ]}
            color="red"
          />
          <Card
            title="Moods"
            items={[
              { label: "Neutral", icon: <Smile size={16} /> },
              { label: "Happy", icon: <Smile size={16} /> },
              { label: "Sad", icon: <Frown size={16} /> },
              { label: "Sensitive", icon: <Heart size={16} /> },
            ]}
            color="pink"
          />
          <Card
            title="Physical Activity"
            items={[
              { label: "Gym", icon: <Dumbbell size={16} /> },
              { label: "Walking", icon: <Footprints size={16} /> },
              { label: "Running", icon: <Activity size={16} /> },
              { label: "Cycling", icon: <Bike size={16} /> },
            ]}
            color="purple"
          />
          <Card
            title="Other Body Symptoms"
            items={[
              { label: "Bloating", icon: <Cloud size={16} /> },
              { label: "Fatigue", icon: <Bed size={16} /> },
              { label: "Nausea", icon: <AlertCircle size={16} /> },
              { label: "Insomnia", icon: <Bed size={16} /> },
            ]}
            color="blue"
          />
          <Card
            title="Signs"
            items={[
              { label: "All Good", icon: <Smile size={16} /> },
              { label: "Cramps", icon: <AlertCircle size={16} /> },
              { label: "Headache", icon: <Frown size={16} /> },
              { label: "Acne", icon: <AlertCircle size={16} /> },
            ]}
            color="violet"
          />
          <Card
            title="Energy Levels"
            items={[
              { label: "High", icon: <Zap size={16} /> },
              { label: "Medium", icon: <Zap size={16} /> },
              { label: "Low", icon: <Zap size={16} /> },
              { label: "Exhausted", icon: <Bed size={16} /> },
            ]}
            color="gray"
          />
        </div>

        {/* Notes */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Add Notes
          </label>
          <textarea
            rows="4"
            placeholder="Write your notes here..."
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Phases Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Phases</h2>
            <div className="grid grid-cols-2 gap-4">
              <PhaseCard
                title="Menstrual"
                text="Day 1-5 Bleeding • Low Energy"
                color="purple"
              />
              <PhaseCard
                title="Follicular"
                text="Day 5-13 • High Energy • Rising Estrogen"
                color="blue"
              />
              <PhaseCard
                title="Ovulation"
                text="Day 14 • Peak Fertility"
                color="pink"
              />
              <PhaseCard
                title="Luteal"
                text="Day 15-28 • PMS Symptoms • After egg release"
                color="rose"
              />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Cycle Overview
            </h2>
            <PieChart width={320} height={320}>
              <Pie
                data={phaseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
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
      </div>

      {/* Extra Buttons Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 flex flex-wrap gap-4 justify-center">
        <button className="px-6 py-3 rounded-full bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition">
          Nearby Stores Availability
        </button>
        <button className="px-6 py-3 rounded-full bg-pink-500 text-white font-medium shadow hover:bg-pink-600 transition">
          Health Period Practices
        </button>
        <button className="px-6 py-3 rounded-full bg-purple-500 text-white font-medium shadow hover:bg-purple-600 transition">
          Breaking Myths (Stigma Busting)
        </button>
      </div>

      <Footer />
    </>
  );
};

// ✅ Reusable Card Component
const colorMap = {
  red: "bg-red-100 text-red-700 hover:bg-red-200",
  pink: "bg-pink-100 text-pink-700 hover:bg-pink-200",
  purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  violet: "bg-violet-100 text-violet-700 hover:bg-violet-200",
  gray: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  rose: "bg-rose-100 text-rose-700 hover:bg-rose-200",
};

const Card = ({ title, items, color }) => (
  <div className="bg-white shadow-md rounded-2xl p-6">
    <h3 className="text-md font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition ${colorMap[color]}`}
        >
          {item.icon} {item.label}
        </span>
      ))}
    </div>
  </div>
);

const PhaseCard = ({ title, text, color }) => (
  <div className={`rounded-xl border-l-4 p-4 ${colorMap[color]}`}>
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{text}</p>
  </div>
);

export default MenstrualTracker;
