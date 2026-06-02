"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  showTooltip?: boolean;
}

export function Sparkline({
  data,
  color = "#C05A38",
  height = 40,
  width = 120,
  showTooltip = false,
}: SparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
          <defs>
            <linearGradient id={`sparkGrad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                background: "#1A1A1A",
                border: "1px solid #2A2A2A",
                borderRadius: "6px",
                fontSize: "11px",
                color: "#E8E8E8",
              }}
              itemStyle={{ color: color }}
              labelStyle={{ display: "none" }}
            />
          )}
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#sparkGrad-${color.replace("#", "")})`}
            dot={false}
            activeDot={showTooltip ? { r: 3, fill: color } : false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
