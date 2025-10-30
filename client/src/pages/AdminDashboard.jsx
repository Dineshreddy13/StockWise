import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UserTable from "@/components/admin/UserTable";
import AddUserDialog from "@/components/admin/AddUserDialog";
import StatCards from "@/components/admin/StatCards";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    topWatchlisted: [],
    totalWatchlists: 0,
  });
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTAzNDE2NmJhNDVlNWUxY2JlNzhhOWEiLCJpYXQiOjE3NjE4Mjk0NjUsImV4cCI6MTc2MTkxNTg2NX0.IuRuXY-0yyaQ-veB0k--eX4W22f0f12PuF36sEcFqFY"

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUsers(res.data.data);
      setStats((prev) => ({ ...prev, totalUsers: res.data.data.length }));
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch watchlist stats
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setStats(res.data.data);
      console.log(stats);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  return (
    <section className="p-8 bg-neutral-950 min-h-screen text-white max-w-[90vw] m-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => setOpenAdd(true)} className="bg-yellow-500">
          <PlusCircle className="mr-2 h-4 w-4" /> Add User
        </Button>
      </header>

      {/* Stats */}
      <StatCards stats={stats} />

      {/* User Table */}
      <div className="mt-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <UserTable users={users} refresh={fetchUsers} />
          </CardContent>
        </Card>
      </div>

      <AddUserDialog open={openAdd} onClose={() => setOpenAdd(false)} refresh={fetchUsers} />
    </section>
  );
};

export default AdminDashboard;
