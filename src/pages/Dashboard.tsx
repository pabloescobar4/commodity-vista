import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Sample Data
const trendData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2024, 11, i + 1); // Last 30 days of Dec 2024
  return {
    date: date.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
    earnings: Math.floor(Math.random() * 5000) + 100000,
    sales: Math.floor(Math.random() * 5000) + 100000,
    views: Math.floor(Math.random() * 5000) + 100000,
  };
});

const subscriberData = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(2024, i, 1); 
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    followers: Math.floor(Math.random() * 100) + 400,
  };
});

const topSalesData = [
  { id: 1, product: "MacBook Pro", sales: 100, image: "📓" },
  { id: 2, product: "iPhone Pro", sales: 100, image: "📱" },
  { id: 3, product: "MacBook M3 Pro", sales: 100, image: "📓" },
  { id: 4, product: "iPhone 2024", sales: 100, image: "📱" },
  { id: 5, product: "iPad 2024", sales: 100, image: "📱" },
];

const paymentHistoryData = [
  { id: 1, email: "yourname@email.com", amount: 100, status: "Success" },
  { id: 2, email: "yourname@email.com", amount: 100, status: "Success" },
  { id: 3, email: "yourname@email.com", amount: 100, status: "Success" },
  { id: 4, email: "yourname@email.com", amount: 100, status: "Success" },
  { id: 5, email: "yourname@email.com", amount: 100, status: "Success" },
];

const sampleRecentSales = [
  { id: 1, customer: { name: "John Doe", email: "john@example.com" }, amount: 199.99 },
  { id: 2, customer: { name: "Jane Smith", email: "jane@example.com" }, amount: 249.99 },
  { id: 3, customer: { name: "Bob Johnson", email: "bob@example.com" }, amount: 149.99 },
];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-2">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-sm text-gray-500">
          {payload[0].name}:{" "}
          <span className="font-medium text-green-500">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [yearFilter, setYearFilter] = useState("2023");
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null); // Track hovered bar

  const stats = [
    {
      title: "Total Earning",
      value: "112,893.00",
      trend: 13.2,
      prefix: "$",
      suffix: "",
    },
    {
      title: "Views",
      value: "112,893",
      trend: 24.5,
      prefix: "+",
      suffix: "",
    },
    {
      title: "Total Sales",
      value: "112,893",
      trend: 33.1,
      prefix: "+",
      suffix: "",
    },
    {
      title: "Subscriptions",
      value: "112,893",
      trend: 25.8,
      prefix: "+",
      suffix: "",
    },
  ];

  return (
    <div className="space-y-8 p-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Trend Charts (Total Earnings, Total Sales, Total Views) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Earnings */}
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              +${(trendData[trendData.length - 1].earnings).toLocaleString()}
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    hide={true}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              +{(trendData[trendData.length - 1].sales).toLocaleString()}
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    hide={true}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Total Views */}
        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              +{(trendData[trendData.length - 1].views).toLocaleString()}
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    hide={true}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriber Performance, Top Sales, Payment History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscriber Performance (Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriber Performance</CardTitle>
            <p className="text-sm text-gray-500">Follower This Year +500</p>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              {subscriberData && subscriberData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subscriberData}>
                  <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip cursor={{ stroke: 'none',fill:"none", strokeWidth: 1 }} content={<CustomTooltip />} />
                    <Bar
                      dataKey="followers"
                      fill="#82ca9d"
                      radius={[4, 4, 0, 0]}
                      onMouseEnter={(data, index) => setHoveredBarIndex(index)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                    >
                      {subscriberData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill="url(#colorUv)"
                          stroke={hoveredBarIndex === index ? "#10b981" : "none"}
                          strokeWidth={hoveredBarIndex === index ? 2 : 0}
                         
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500">No data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Sales Product */}
        <Card>
          <CardHeader>
            <CardTitle>Top Sales Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSalesData.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="h-9 w-9 flex items-center justify-center mr-4">
                    <span className="text-2xl">{item.image}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product}</p>
                  </div>
                  <div className="text-sm font-medium">${item.sales}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <p className="text-sm text-gray-500">Manage your payments.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistoryData.map((payment) => (
                <div key={payment.id} className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{payment.email}</p>
                    <p className="text-xs text-gray-500">{payment.status}</p>
                  </div>
                  <div className="text-sm font-medium">${payment.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Sales</CardTitle>
            <p className="text-sm text-gray-500">You made 350 sales this month</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sampleRecentSales.map((sale) => (
                <div key={sale.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{sale.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium">{sale.customer.name}</p>
                    <p className="text-xs text-gray-500">{sale.customer.email}</p>
                  </div>
                  <div className="text-sm font-medium">+${sale.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Stats</CardTitle>
            <div className="flex items-center space-x-2">
              <Select defaultValue="yearly">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="previous">
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Compared to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="previous">Previous</SelectItem>
                  <SelectItem value="lastYear">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-2">
                  <h3 className="text-lg font-medium">Total Earning</h3>
                  <p className="text-3xl font-bold">$112,893.00</p>
                  <p className="text-xs text-gray-500">
                    Trend
                    <span className="inline-block ml-1 text-green-500">+8.5%</span>
                  </p>
                </div>
                <p className="text-sm text-gray-500">This Week</p>
              </div>

              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData.slice(0, 6)}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      hide={true}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      hide={true}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;