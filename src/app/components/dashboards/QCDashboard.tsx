import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface QCDashboardProps {
  userEmail: string;
  userName: string;
  userId: string;
}

export default function QCDashboard({ userEmail, userName, userId }: QCDashboardProps) {
  const myTasks = [
    { id: '1', title: 'Blog Post - SEO Best Practices', type: 'Content', submittedBy: 'John Doe', status: 'pending_review', priority: 'high', submittedAt: '2024-01-19' },
    { id: '2', title: 'Instagram Campaign Graphics', type: 'Design', submittedBy: 'Jane Smith', status: 'pending_review', priority: 'medium', submittedAt: '2024-01-20' },
    { id: '3', title: 'Landing Page Update', type: 'Web Dev', submittedBy: 'Mike Johnson', status: 'in_review', priority: 'high', submittedAt: '2024-01-20' },
  ];

  const stats = { pendingReview: 8, inReview: 3, approved: 45, rejected: 2 };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#7A1C46]">QC Person Dashboard</h1>
          <p className="text-gray-500">Welcome back, {userName}! 🔍</p>
        </div>
        <div className="bg-cyan-600 text-white px-4 py-2 rounded-lg">
          <span className="text-sm">QC Person</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Pending Review</CardDescription>
            <CardTitle className="text-3xl">{stats.pendingReview}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-yellow-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Awaiting QC</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>In Review</CardDescription>
            <CardTitle className="text-3xl">{stats.inReview}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-blue-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">Checking now</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-3xl">{stats.approved}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Rejected</CardDescription>
            <CardTitle className="text-3xl">{stats.rejected}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-red-600">
              <XCircle className="w-4 h-4" />
              <span className="text-sm">Needs revision</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>Items for Quality Check</CardTitle>
          <CardDescription>Tasks assigned to you for review</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" style={{ borderRadius: '12px' }}>
                      {task.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.submittedBy}</TableCell>
                  <TableCell>
                    <Badge style={{ borderRadius: '12px' }}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'} 
                      style={{ borderRadius: '12px' }}
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.submittedAt}</TableCell>
                  <TableCell>
                    <Button size="sm" style={{ backgroundColor: '#7A1C46', borderRadius: '12px' }}>
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button style={{ backgroundColor: '#7A1C46', borderRadius: '12px' }}>
            View QC Checklist
          </Button>
          <Button variant="outline" style={{ borderRadius: '12px' }}>
            QC Guidelines
          </Button>
          <Button variant="outline" style={{ borderRadius: '12px' }}>
            My QC History
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
