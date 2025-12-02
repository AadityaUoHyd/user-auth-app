// AnalyticsPage.jsx - Place this in src/pages or similar, and route to /dashboard/analytics
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePicker } from "@/components/ui/date-picker"; // Assume or add shadcn date-picker
import { Calendar, TrendingUp, Users, LogIn, Shield } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Install recharts if needed
import { useAuthStore } from "@/utils/auth";
import { getAnalyticsData } from "@/services/auth.service"; // Assume this fetches mock/real analytics
import toast from "react-hot-toast";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({ from: new Date('2025-11-01'), to: new Date() });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const analytics = await getAnalyticsData(dateRange);
      setData(analytics);
    } catch (error) {
      toast.error("Failed to load analytics");
    }
    setLoading(false);
  };

  // Mock data for charts/tables; replace with real
  const chartData = [
    { date: '2025-11-01', signups: 12, logins: 45 },
    { date: '2025-11-02', signups: 15, logins: 52 },
    { date: '2025-11-03', signups: 8, logins: 48 },
    { date: '2025-11-04', signups: 20, logins: 60 },
    { date: '2025-11-05', signups: 18, logins: 55 },
    { date: '2025-11-06', signups: 25, logins: 70 },
    { date: '2025-11-07', signups: 22, logins: 65 },
  ];

  const recentActivity = [
    { id: 1, action: "User Registered", user: "Amit Mishra", timestamp: "2h ago", type: "signup" },
    { id: 2, action: "Login Attempt", user: "Jai Bhagat", timestamp: "4h ago", type: "login" },
    { id: 3, action: "Password Reset", user: "Bobby Gupta", timestamp: "1d ago", type: "security" },
    { id: 4, action: "OAuth Login", user: "Sony Jaiswal", timestamp: "1d ago", type: "oauth" },
  ];

  return (
    <div className="min-h-full bg-background p-6">
      <div className="mx-auto max-w-screen-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <div className="flex items-center gap-2">
            <DatePicker date={dateRange.from} onDateChange={(date) => setDateRange({ ...dateRange, from: date })} />
            <DatePicker date={dateRange.to} onDateChange={(date) => setDateRange({ ...dateRange, to: date })} />
            <Button onClick={fetchData} disabled={loading} variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <LogIn className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
              <p className="text-xs text-muted-foreground">+5% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Under threshold</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">OAuth Usage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42%</div>
              <p className="text-xs text-muted-foreground">Of total logins</p>
            </CardContent>
          </Card>
        </section>

        {/* Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Signups vs Logins Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="signups" stroke="#8884d8" />
                <Line type="monotone" dataKey="logins" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>{activity.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={activity.type === "signup" ? "default" : activity.type === "login" ? "secondary" : "destructive"}>
                        {activity.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}