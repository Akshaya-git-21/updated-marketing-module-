import { useState } from 'react';
import {
  FileDown, RefreshCw, Target, TrendingUp, ExternalLink,
  Share2, Heart, MessageCircle, Eye, AlertCircle, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface SMMWeeklySnapshot {
  Week_Start: string;
  Week_End: string;
  Campaign_Name: string;
  Target_Posts: number;
  Actual_Posts: number;
  Completion_Percent: number;
  Avg_Engagement: number;
  CTR: number;
  QC_Pass_Percent: number;
  At_Risk_Flag: boolean;
  Owner_Name: string;
}

interface PlatformSnapshot {
  Platform: string;
  Target_Posts: number;
  Actual_Posts: number;
  Engagement_Rate: number;
  CTR: number;
  Reach: number;
}

interface SMMPost {
  Date: string;
  Platform: string;
  Asset_Type: string;
  Post_Title: string;
  Target_URL: string;
  QC_Score: number;
  QC_Status: string;
  Engagement_Rate: number;
  CTR: number;
  Likes: number;
  Comments: number;
  Shares: number;
}

export default function SMMEffortDashboard() {
  const [selectedWeek, setSelectedWeek] = useState('2024-10-28_2024-11-03');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const [snapshot] = useState<SMMWeeklySnapshot>({
    Week_Start: '2024-10-28',
    Week_End: '2024-11-03',
    Campaign_Name: 'Cloud Migration Social Campaign',
    Target_Posts: 35,
    Actual_Posts: 32,
    Completion_Percent: 91.4,
    Avg_Engagement: 4.2,
    CTR: 2.8,
    QC_Pass_Percent: 87.5,
    At_Risk_Flag: false,
    Owner_Name: 'Sarah Johnson'
  });

  const [platformData] = useState<PlatformSnapshot[]>([
    { Platform: 'LinkedIn', Target_Posts: 10, Actual_Posts: 10, Engagement_Rate: 5.2, CTR: 3.5, Reach: 15420 },
    { Platform: 'Twitter', Target_Posts: 15, Actual_Posts: 14, Engagement_Rate: 3.8, CTR: 2.4, Reach: 28340 },
    { Platform: 'Facebook', Target_Posts: 5, Actual_Posts: 5, Engagement_Rate: 4.5, CTR: 3.1, Reach: 12580 },
    { Platform: 'Instagram', Target_Posts: 5, Actual_Posts: 3, Engagement_Rate: 6.2, CTR: 1.8, Reach: 8960 }
  ]);

  const [posts] = useState<SMMPost[]>([
    {
      Date: '2024-10-28',
      Platform: 'LinkedIn',
      Asset_Type: 'Infographic',
      Post_Title: 'Cloud Migration Best Practices 2024',
      Target_URL: 'https://blog.example.com/cloud-migration',
      QC_Score: 9.2,
      QC_Status: 'Pass',
      Engagement_Rate: 5.8,
      CTR: 3.9,
      Likes: 245,
      Comments: 18,
      Shares: 42
    },
    {
      Date: '2024-10-29',
      Platform: 'Twitter',
      Asset_Type: 'Video',
      Post_Title: '5 Signs Your Business Needs Cloud Migration',
      Target_URL: 'https://blog.example.com/cloud-signs',
      QC_Score: 8.5,
      QC_Status: 'Pass',
      Engagement_Rate: 4.2,
      CTR: 2.8,
      Likes: 182,
      Comments: 12,
      Shares: 28
    },
    {
      Date: '2024-10-30',
      Platform: 'LinkedIn',
      Asset_Type: 'Article',
      Post_Title: 'Enterprise Cloud Security Checklist',
      Target_URL: 'https://blog.example.com/security',
      QC_Score: 9.0,
      QC_Status: 'Pass',
      Engagement_Rate: 6.1,
      CTR: 4.2,
      Likes: 312,
      Comments: 24,
      Shares: 56
    },
    {
      Date: '2024-10-31',
      Platform: 'Instagram',
      Asset_Type: 'Image',
      Post_Title: 'Cloud Architecture Infographic',
      Target_URL: 'https://resources.example.com/architecture',
      QC_Score: 7.2,
      QC_Status: 'Rework',
      Engagement_Rate: 5.4,
      CTR: 1.5,
      Likes: 428,
      Comments: 8,
      Shares: 15
    },
    {
      Date: '2024-11-01',
      Platform: 'Facebook',
      Asset_Type: 'Video',
      Post_Title: 'Customer Success Story: ABC Corp Migration',
      Target_URL: 'https://blog.example.com/case-study',
      QC_Score: 8.8,
      QC_Status: 'Pass',
      Engagement_Rate: 4.9,
      CTR: 3.6,
      Likes: 156,
      Comments: 14,
      Shares: 32
    }
  ]);

  const platformChartData = platformData.map(p => ({
    name: p.Platform,
    target: p.Target_Posts,
    actual: p.Actual_Posts
  }));

  const engagementChartData = platformData.map(p => ({
    name: p.Platform,
    engagement: p.Engagement_Rate,
    ctr: p.CTR
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#7A1C46]">📱 Social Media Marketing Effort Summary</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track social media posts, engagement rates, CTR, and platform-wise performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success('Exporting...')}>
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => toast.info('Recomputing...')}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Recompute
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Week</Label>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-10-28_2024-11-03">Oct 28 - Nov 3, 2024</SelectItem>
                  <SelectItem value="2024-10-21_2024-10-27">Oct 21 - Oct 27, 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Platform</Label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-[#7A1C46]">{snapshot.Target_Posts}</div>
              <div className="text-xs text-gray-600 mt-1">Target Posts</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-blue-600">{snapshot.Actual_Posts}</div>
              <div className="text-xs text-gray-600 mt-1">Posts Published</div>
              <div className="text-xs text-gray-500 mt-1">({snapshot.Completion_Percent.toFixed(0)}%)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-purple-600">{snapshot.Avg_Engagement}%</div>
              <div className="text-xs text-gray-600 mt-1">Avg Engagement</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-green-600">{snapshot.CTR}%</div>
              <div className="text-xs text-gray-600 mt-1">CTR</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className={`text-2xl ${snapshot.QC_Pass_Percent >= 85 ? 'text-green-600' : 'text-orange-600'}`}>
                {snapshot.QC_Pass_Percent}%
              </div>
              <div className="text-xs text-gray-600 mt-1">QC Pass Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Alert */}
      {!snapshot.At_Risk_Flag && (
        <Alert className="border-green-300 bg-green-50">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <AlertDescription>
            <strong>On Track:</strong> SMM campaign performing well with {snapshot.Completion_Percent.toFixed(0)}% completion and {snapshot.Avg_Engagement}% avg engagement.
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="posts">📋 Post Details</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Posts */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Platform-wise Post Count (Target vs Actual)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="target" fill="#7A1C46" name="Target" />
                    <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement & CTR */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Engagement Rate & CTR by Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="engagement" fill="#8b5cf6" name="Engagement %" />
                    <Bar dataKey="ctr" fill="#10b981" name="CTR %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Platform Summary Table */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-sm">Platform Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Reach</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {platformData.map((platform, idx) => {
                      const completion = (platform.Actual_Posts / platform.Target_Posts) * 100;
                      return (
                        <TableRow key={idx}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Share2 className="w-4 h-4 text-gray-400" />
                              {platform.Platform}
                            </div>
                          </TableCell>
                          <TableCell>{platform.Target_Posts}</TableCell>
                          <TableCell>
                            <span className={completion >= 80 ? 'text-green-600' : 'text-orange-600'}>
                              {platform.Actual_Posts}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge className={completion >= 80 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                                {completion.toFixed(0)}%
                              </Badge>
                              <Progress value={completion} className={`h-1 ${completion >= 80 ? '' : '[&>div]:bg-orange-600'}`} />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-purple-100 text-purple-800">{platform.Engagement_Rate}%</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">{platform.CTR}%</Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">{platform.Reach.toLocaleString()}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Posts Tab */}
        <TabsContent value="posts">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle>Post-level QC & Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Asset Type</TableHead>
                      <TableHead>Post Title</TableHead>
                      <TableHead>QC Score</TableHead>
                      <TableHead>QC Status</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Interactions</TableHead>
                      <TableHead>URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs">
                          {new Date(post.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{post.Platform}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{post.Asset_Type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate text-sm">{post.Post_Title}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={post.QC_Score >= 8 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                            {post.QC_Score.toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={post.QC_Status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                            {post.QC_Status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-800">{post.Engagement_Rate}%</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">{post.CTR}%</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 text-xs">
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-500" />
                              {post.Likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3 text-blue-500" />
                              {post.Comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Share2 className="w-3 h-3 text-green-500" />
                              {post.Shares}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(post.Target_URL, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
