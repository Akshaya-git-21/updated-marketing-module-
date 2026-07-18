import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Link2, TrendingUp, CheckCircle2 } from 'lucide-react';

interface SEODashboardProps {
  userEmail: string;
  userName: string;
  userId: string;
}

export default function SEODashboard({ userEmail, userName, userId }: SEODashboardProps) {
  const myTasks = [
    { id: '1', title: 'Keyword Research - Tech Industry', project: 'Client A', status: 'in_progress', keywords: 50, dueDate: '2024-01-20' },
    { id: '2', title: 'Build Backlinks for Homepage', project: 'Client B', status: 'pending', keywords: 0, dueDate: '2024-01-22' },
    { id: '3', title: 'SEO Audit - E-commerce Site', project: 'Client C', status: 'review', keywords: 120, dueDate: '2024-01-18' },
  ];

  const stats = { pending: 2, inProgress: 5, completed: 18, avgRanking: 12 };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#7A1C46]">SEO Specialist Dashboard</h1>
          <p className="text-gray-500">Welcome back, {userName}! 🔎</p>
        </div>
        <div className="bg-orange-600 text-white px-4 py-2 rounded-lg">
          <span className="text-sm">SEO Specialist</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Pending Tasks</CardDescription>
            <CardTitle className="text-3xl">{stats.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-gray-600">
              <Search className="w-4 h-4" />
              <span className="text-sm">Not started</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl">{stats.inProgress}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-blue-600">
              <Link2 className="w-4 h-4" />
              <span className="text-sm">Working on</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl">{stats.completed}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Avg Ranking</CardDescription>
            <CardTitle className="text-3xl">#{stats.avgRanking}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-purple-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Google SERP</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>My SEO Tasks</CardTitle>
          <CardDescription>SEO campaigns and tasks assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Keywords</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.project}</TableCell>
                  <TableCell>
                    <Badge style={{ borderRadius: '12px' }}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.keywords} keywords</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Button size="sm" style={{ backgroundColor: '#7A1C46', borderRadius: '12px' }}>
                      Work on it
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
