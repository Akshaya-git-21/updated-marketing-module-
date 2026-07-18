import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Palette, Image, Layers, Sparkles } from 'lucide-react';

interface GraphicDesignerDashboardProps {
  userEmail: string;
  userName: string;
  userId: string;
}

export default function GraphicDesignerDashboard({ userEmail, userName, userId }: GraphicDesignerDashboardProps) {
  const myTasks = [
    { id: '1', title: 'Social Media Graphics Pack', type: 'Social Media', status: 'in_progress', priority: 'high', dueDate: '2024-01-21' },
    { id: '2', title: 'Logo Design - Client Rebrand', type: 'Branding', status: 'pending', priority: 'medium', dueDate: '2024-01-23' },
    { id: '3', title: 'Infographic - Industry Report', type: 'Infographic', status: 'review', priority: 'high', dueDate: '2024-01-19' },
  ];

  const stats = { pending: 2, inProgress: 5, completed: 31, revisions: 1 };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#7A1C46]">Graphic Designer Dashboard</h1>
          <p className="text-gray-500">Welcome back, {userName}! 🎨</p>
        </div>
        <div className="bg-pink-600 text-white px-4 py-2 rounded-lg">
          <span className="text-sm">Graphic Designer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: stats.pending, icon: Palette, color: 'text-gray-600' },
          { label: 'In Progress', value: stats.inProgress, icon: Layers, color: 'text-blue-600' },
          { label: 'Completed', value: stats.completed, icon: Sparkles, color: 'text-green-600' },
          { label: 'Revisions', value: stats.revisions, icon: Image, color: 'text-yellow-600' },
        ].map((stat, index) => (
          <Card key={index} style={{ borderRadius: '12px' }}>
            <CardHeader className="pb-3">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`flex items-center gap-2 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
                <span className="text-sm">{stat.label === 'Revisions' ? 'Need updates' : 'Projects'}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>My Design Tasks</CardTitle>
          <CardDescription>Design projects assigned to you</CardDescription>
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
