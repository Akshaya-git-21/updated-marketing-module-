import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Check, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SMMPost {
  Post_ID: string;
  Platform: string;
  Content_ID: string;
  Copy_Variant: string;
  Scheduled_Time: string;
  Status: string;
  Proof_URL?: string;
}

interface SMMCalendarViewProps {
  projectId: string;
}

const PLATFORMS = ['LinkedIn', 'X', 'Instagram', 'YouTube', 'Facebook', 'Pinterest'];

export default function SMMCalendarView({ projectId }: SMMCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1)); // November 2024
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const smmPosts: SMMPost[] = [
    {
      Post_ID: 'POST001',
      Platform: 'LinkedIn',
      Content_ID: 'CNT001',
      Copy_Variant: 'Professional tone with CTA',
      Scheduled_Time: '2024-11-05 09:00',
      Status: 'Posted',
      Proof_URL: 'https://linkedin.com/posts/...',
    },
    {
      Post_ID: 'POST002',
      Platform: 'X',
      Content_ID: 'CNT001',
      Copy_Variant: 'Short engaging tweet',
      Scheduled_Time: '2024-11-05 14:00',
      Status: 'Posted',
    },
    {
      Post_ID: 'POST003',
      Platform: 'Instagram',
      Content_ID: 'CNT002',
      Copy_Variant: 'Visual storytelling',
      Scheduled_Time: '2024-11-08 11:00',
      Status: 'Scheduled',
    },
    {
      Post_ID: 'POST004',
      Platform: 'LinkedIn',
      Content_ID: 'CNT003',
      Copy_Variant: 'Thought leadership',
      Scheduled_Time: '2024-11-12 10:00',
      Status: 'Planned',
    },
    {
      Post_ID: 'POST005',
      Platform: 'Facebook',
      Content_ID: 'CNT002',
      Copy_Variant: 'Community engagement',
      Scheduled_Time: '2024-11-15 16:00',
      Status: 'Planned',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'posted':
        return <Check className="w-3 h-3" />;
      case 'scheduled':
        return <Clock className="w-3 h-3" />;
      case 'failed':
        return <XCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'posted':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn':
        return 'bg-blue-600';
      case 'X':
        return 'bg-black';
      case 'Instagram':
        return 'bg-pink-600';
      case 'YouTube':
        return 'bg-red-600';
      case 'Facebook':
        return 'bg-blue-500';
      case 'Pinterest':
        return 'bg-red-500';
      default:
        return 'bg-gray-600';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getPostsForDate = (date: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return smmPosts.filter((post) => post.Scheduled_Time.startsWith(dateStr));
  };

  const renderMonthView = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const postsOnDay = getPostsForDate(day);
      days.push(
        <div key={day} className="h-24 border border-gray-200 bg-white p-2 overflow-y-auto">
          <div className="text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {postsOnDay.map((post) => (
              <div
                key={post.Post_ID}
                className="text-xs p-1 rounded cursor-pointer hover:shadow-sm"
                style={{ backgroundColor: getPlatformColor(post.Platform) + '20' }}
              >
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getPlatformColor(post.Platform)}`} />
                  <span className="truncate">{post.Platform}</span>
                </div>
                <div className="text-xs text-gray-600 truncate">{post.Copy_Variant}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center border border-gray-300 bg-gray-100">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="space-y-3">
        {smmPosts.map((post) => (
          <Card key={post.Post_ID} className="border-[#E2E8F0]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getPlatformColor(post.Platform)}`} />
                    <span>{post.Platform}</span>
                    <Badge className={getStatusColor(post.Status)}>
                      {getStatusIcon(post.Status)}
                      <span className="ml-1">{post.Status}</span>
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <strong>Copy:</strong> {post.Copy_Variant}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Scheduled:</strong> {post.Scheduled_Time}
                  </div>
                  {post.Proof_URL && (
                    <div className="text-sm text-blue-600 mt-1">
                      <a href={post.Proof_URL} target="_blank" rel="noopener noreferrer">
                        View Post →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3>
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={(v) => setView(v as 'month' | 'week' | 'day')}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
            <Plus className="w-4 h-4 mr-2" />
            Add Post
          </Button>
        </div>
      </div>

      {/* Platform Legend */}
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((platform) => (
          <div key={platform} className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded">
            <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform)}`} />
            <span className="text-sm">{platform}</span>
          </div>
        ))}
      </div>

      {view === 'month' ? renderMonthView() : renderListView()}
    </div>
  );
}
