import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContentWriterDashboardProps {
  userEmail: string;
  userName: string;
  userId: string;
}

export default function ContentWriterDashboard({ userEmail, userName, userId }: ContentWriterDashboardProps) {
  // Mock data - will be replaced with real Supabase queries
  const myTasks = [
    {
      id: '1',
      title: 'Write Blog Post: Top 10 SEO Tips for 2024',
      project: 'Tech Startup SEO',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-01-20',
      wordCount: 1500,
    },
    {
      id: '2',
      title: 'Create Product Description - New SaaS Tool',
      project: 'Product Launch Campaign',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-22',
      wordCount: 500,
    },
    {
      id: '3',
      title: 'Social Media Content Pack - Week 3',
      project: 'SMM Monthly Campaign',
      status: 'review',
      priority: 'high',
      dueDate: '2024-01-18',
      wordCount: 800,
    },
  ];

  const stats = {
    pending: 1,
    inProgress: 1,
    inReview: 1,
    completed: 12,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#7A1C46]">Content Writer Dashboard</h1>
          <p className="text-gray-500">Welcome back, {userName}! ✍️</p>
        </div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          <span className="text-sm">Content Writer</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Pending Tasks</CardDescription>
            <CardTitle className="text-3xl">{stats.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
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
              <FileText className="w-4 h-4" />
              <span className="text-sm">Working on</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>In Review</CardDescription>
            <CardTitle className="text-3xl">{stats.inReview}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Awaiting QC</span>
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
      </div>

      {/* My Tasks Table */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>My Assigned Tasks</CardTitle>
          <CardDescription>Content writing tasks assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Word Count</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{task.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{task.project}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)} style={{ borderRadius: '12px' }}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)} style={{ borderRadius: '12px' }}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.wordCount} words</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      style={{ backgroundColor: '#7A1C46', borderRadius: '12px' }}
                    >
                      Work on it
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button style={{ backgroundColor: '#7A1C46', borderRadius: '12px' }}>
            Submit for Review
          </Button>
          <Button variant="outline" style={{ borderRadius: '12px' }}>
            View Content Guidelines
          </Button>
          <Button variant="outline" style={{ borderRadius: '12px' }}>
            My Performance
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
