import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import api from "../utils/api";

export default function JournalHeatmap() {
  const [data, setData] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    (async function load() {
      try {
        const res = await api.get("/api/heatmap");
        const map = res.data.heatmap || {};

        const arr = Object.entries(map).map(([date, count]) => ({
          date,
          count,
        }));

        setData(arr);
        setStreak(res.data.streak || 0);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const today = new Date();
  const start = new Date();
  start.setFullYear(today.getFullYear() - 1);

  return (
    <div className="mt-6 bg-white border rounded-lg p-5 shadow-sm">
      {/* TAILWIND COLOR STYLES FOR HEATMAP */}
      <style>
        {`
          .color-empty { fill: #e9f2ec; }
          .color-scale-1 { fill: #b9e4c9; }
          .color-scale-2 { fill: #7fbf9d; }
          .color-scale-3 { fill: #4f8f77; }
          
          .react-calendar-heatmap .color-empty { stroke: #e9f2ec; }
          .react-calendar-heatmap .color-scale-1 { stroke: #b9e4c9; }
          .react-calendar-heatmap .color-scale-2 { stroke: #7fbf9d; }
          .react-calendar-heatmap .color-scale-3 { stroke: #4f8f77; }
        `}
      </style>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#2f513f]">
          Writing Activity (Past Year)
        </h3>

        <div className="text-sm text-[#527964]">
          Streak: <strong>{streak}</strong>
        </div>
      </div>

      <CalendarHeatmap
        startDate={start}
        endDate={today}
        values={data}
        classForValue={(value) => {
          if (!value || !value.count) return "color-empty";
          if (value.count === 1) return "color-scale-1";
          if (value.count === 2) return "color-scale-2";
          return "color-scale-3";
        }}
        tooltipDataAttrs={(value) =>
          value.date
            ? {
                "data-tooltip-id": "heatmap-tip",
                "data-tooltip-content": `${value.date}: ${value.count} entr${
                  value.count === 1 ? "y" : "ies"
                }`,
              }
            : null
        }
      />

      <Tooltip id="heatmap-tip" />
    </div>
  );
}
