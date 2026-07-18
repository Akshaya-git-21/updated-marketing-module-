import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Instagram, Facebook, Twitter, Linkedin, Calendar, TrendingUp } from 'lucide-react';

interface SMMDashboardProps {
  userEmail: string;
  userName: string;
  userId: string;
}

export default function SMMDashboard({ userEmail, userName, userId }: SMMDashboardProps) {
  // Mock SMM tasks
  const myTasks = [
    {
      id: '1',
      title: 'Instagram Post - Product Launch Teaser',
      platform: 'Instagram',
      status: 'scheduled',
      scheduledDate: '2024-01-20 10:00 AM',
      engagement: '2.3K',
    },
    {
      id: '2',
      title: 'LinkedIn Article - Industry Insights',
      platform: 'LinkedIn',
      status: 'draft',
      scheduledDate: '2024-01-22 02:00 PM',
      engagement: '-',
    },
    {
      id: '3',
      title: 'Facebook Campaign - Holiday Sale',
      platform: 'Facebook',
      status: 'pending_approval',
      scheduledDate: '2024-01-18 12:00 PM',
      engagement: '-',
    },
  ];

  const stats = {
    scheduled: 5,
    pending: 3,
    published: 28,
    avgEngagement: '3.2K',
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="w-4 h-4" />;
      case 'Facebook': return <Facebook className="w-4 h-4" />;
      case 'Twitter': return <Twitter className="w-4 h-4" />;
      case 'LinkedIn': return <Linkedin className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-700';
      case 'published': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#7A1C46]">SMM Specialist Dashboard</h1>
          <p className="text-gray-500">Welcome back, {userName}! 📱</p>
        </div>
        <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
          <span className="text-sm">SMM Specialist</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Scheduled Posts</CardDescription>
            <CardTitle className="text-3xl">{stats.scheduled}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-blue-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Ready to publish</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Pending Approval</CardDescription>
            <CardTitle className="text-3xl">{stats.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-yellow-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Awaiting review</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Published (Month)</CardDescription>
            <CardTitle className="text-3xl">{stats.published}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+12% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader className="pb-3">
            <CardDescription>Avg Engagement</CardDescription>
            <CardTitle className="text-3xl">{stats.avgEngagement}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-purple-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Likes + Comments</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My SMM Tasks */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>My Social Media Tasks</CardTitle>
          <CardDescription>Posts and campaigns assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(task.platform)}
                      <span>{task.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" style={{ borderRadius: '12px' }}>
                      {task.platform}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)} style={{ borderRadius: '12px' }}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.scheduledDate}</TableCell>
                  <TableCell>{task.engagement}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      style={{ backgroundColor: '#7A1C46', borderRadius: '12px' }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Calendar Preview */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
          <CardDescription>Upcoming posts this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center">
                <p className="text-sm text-gray-600 mb-2">{day}</p>
                <div className="bg-blue-100 rounded-lg p-2 text-xs text-blue-700">
                  {Math.floor(Math.random() * 3) + 1} posts
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button style={{ backgroundColor: '#7A1C46', borderRadius: '12px' }}>
            Create New Post
          </Button>
          <Button variant="outline" style={{ borderRadius: '12px' }}>
            View Full Calendar
          </Button>
          <Button variant="outline" style={{ borderRadius: '12px' }}>
            Analytics Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
