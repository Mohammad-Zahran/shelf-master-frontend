import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { FaDollarSign, FaUsers, FaUtensils } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { GiTrophiesShelf } from "react-icons/gi";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminStats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orderStats");
      return res.data;
    },
  });

  const { data: mostOrderedProducts = [] } = useQuery({
    queryKey: ["most-ordered-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/mostOrderedProducts");
      return res.data;
    },
  });

  const COLORS = [
    "#0D2535", // Dark blue
    "#5388D8", // Soft blue
    "#F4BE37", // Bright yellow
    "#FF9F40", // Warm orange
    "#1E3A5F", // Deep navy
    "#73A3E8", // Light sky blue
    "#FFD700", // Gold
    "#FF7F50", // Coral orange
    "#2A9D8F", // Teal green
    "#E76F51", // Terracotta
    "#F2C14E", // Honey yellow
    "#90BE6D", // Soft green
    "#577590", // Muted blue-gray
    "#B5838D", // Dusty rose
    "#F4A261", // Sandy orange
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const PieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });

  console.log(mostOrderedProducts);

  return (
    <div className="w-full md:w-[1250px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Hi, <span className="text-steelBlue">{user.displayName}</span>
      </h2>

      <div className="stats stats-vertical w-full lg:stats-horizontal shadow">
        <div className="stat bg-emerald-200">
          <div className="stat-figure text-secondary text-3xl">
            <FaDollarSign />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-orange-200">
          <div className="stat-figure text-secondary text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-indigo-400">
          <div className="stat-figure text-secondary text-3xl">
            <GiTrophiesShelf />
          </div>
          <div className="stat-title">Shelf Items</div>
          <div className="stat-value">{stats.menuItems}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat bg-purple-300">
          <div className="stat-figure text-secondary text-3xl">
            <FaShoppingCart />
          </div>
          <div className="stat-title">All Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      {/* charts and graphs */}
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-between">
        {/* Bar Chart */}
        <div className="sm:w-1/2 w-full">
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="sm:w-1/2 w-full">
          <div style={{ width: "100%", height: 400 }}>
            {" "}
            {/* Adjusted height */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={500} height={500}>
                {" "}
                {/* Increased dimensions */}
                <Pie
                  data={PieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {PieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Most Ordered Products */}
      <div className="mt-16">
        <h3 className="text-lg font-semibold mb-4">Most Ordered Products</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={mostOrderedProducts}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* Minimalistic Grid */}
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

              {/* Axes */}
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#666" }}
                interval={0} // Ensures all labels are shown
              />
              <YAxis tick={{ fontSize: 12, fill: "#666" }} />

              {/* Custom Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  border: "1px solid #ddd",
                }}
                itemStyle={{ color: "#333" }}
                labelStyle={{ fontWeight: "bold", color: "#888" }}
              />

              {/* Bars with rounded corners */}
              <Bar dataKey="quantity" fill="#8884d8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
