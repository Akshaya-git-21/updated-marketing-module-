import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Code, Globe, Bug, Zap } from 'lucide-react';

interface WebDeveloperDashboardProps {
  userEmail: string;
  userName: string;
  userId: string;
}

export default function WebDeveloperDashboard({ userEmail, userName, userId }: WebDeveloperDashboardProps) {
  const myTasks = [
    { id: '1', title: 'Build Landing Page - Product Launch', type: 'Development', status: 'in_progress', priority: 'high', dueDate: '2024-01-22' },
    { id: '2', title: 'Fix Mobile Responsiveness - Homepage', type: 'Bug Fix', status: 'pending', priority: 'medium', dueDate: '2024-01-20' },
    { id: '3', title: 'Integrate Payment Gateway', type: 'Feature', status: 'review', priority: 'high', dueDate: '2024-01-25' },
  ];

  const stats = { pending: 3, inProgress: 4, completed: 22, bugs: 1 };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#7A1C46]">Web Developer Dashboard</h1>
          <p className="text-gray-500">Welcome back, {userName}! 💻</p>
        </div>
        <div className="bg-purple-600 text-white px-4 py-2 rounded-lg">
          <span className="text-sm">Web Developer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: stats.pending, icon: Code, color: 'text-gray-600' },
          { label: 'In Progress', value: stats.inProgress, icon: Zap, color: 'text-blue-600' },
          { label: 'Completed', value: stats.completed, icon: Globe, color: 'text-green-600' },
          { label: 'Bugs', value: stats.bugs, icon: Bug, color: 'text-red-600' },
        ].map((stat, index) => (
          <Card key={index} style={{ borderRadius: '12px' }}>
            <CardHeader className="pb-3">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`flex items-center gap-2 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
                <span className="text-sm">{stat.label === 'Bugs' ? 'Open issues' : 'Tasks'}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>My Development Tasks</CardTitle>
          <CardDescription>Web development projects assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell><Badge variant="outline" style={{ borderRadius: '12px' }}>{task.type}</Badge></TableCell>
                  <TableCell><Badge style={{ borderRadius: '12px' }}>{task.status.replace('_', ' ')}</Badge></TableCell>
                  <TableCell><Badge style={{ borderRadius: '12px' }}>{task.priority}</Badge></TableCell>
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
