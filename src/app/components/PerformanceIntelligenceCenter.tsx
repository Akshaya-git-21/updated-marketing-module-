import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Target, Award, Download, Upload, Calendar, PlusCircle, Filter, Users, BarChart3, LineChart, Activity, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import TeamLeaderboard from './TeamLeaderboard';
import { toast } from 'sonner@2.0.3';

interface PerformanceIntelligenceCenterProps {
  onNavigate: (route: string) => void;
}

interface PerformanceMetric {
  Perf_ID: string;
  Category: string;
  Frequency: string;
  Metric_Name: string;
  Metric_Definition: string;
  Gold_Standard_Value: number;
  Target_Value: number;
  Actual_Value: number;
  Unit: string;
  Variance: number;
  Variance_Percent: number;
  Trend: string;
  Responsible_User: string;
  Responsible_User_Name: string;
  Reporting_Date: string;
  Linked_Service_ID: string | null;
  Linked_Service_Name: string | null;
  Linked_Industry: string | null;
  Competitor_ID: string | null;
  Competitor_Name: string | null;
  Campaign_ID: string | null;
  Campaign_Name: string | null;
  Action_Plan_NextWeek: string;
  QC_Notes: string;
  Status: string;
}

interface ActionLog {
  Action_ID: string;
  Perf_ID: string;
  Metric_Name: string;
  Category: string;
  Action_Taken: string;
  Owner: string;
  Due_Date: string;
  Completion_Status: string;
  Remarks: string;
}

export default function PerformanceIntelligenceCenter({ onNavigate }: PerformanceIntelligenceCenterProps) {
  const [activeTab, setActiveTab] = useState('Backlink');
  const [showEntryDialog, setShowEntryDialog] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [dateRange, setDateRange] = useState('weekly');
  const [selectedMetric, setSelectedMetric] = useState<PerformanceMetric | null>(null);

  // Mock Performance Data
  const performanceData: PerformanceMetric[] = [
    // Backlink Metrics
    {
      Perf_ID: 'PERF001',
      Category: 'Backlink',
      Frequency: 'Weekly',
      Metric_Name: 'Total Backlinks',
      Metric_Definition: 'Total number of active backlinks',
      Gold_Standard_Value: 500,
      Target_Value: 450,
      Actual_Value: 468,
      Unit: 'links',
      Variance: 18,
      Variance_Percent: 4.0,
      Trend: 'Up',
      Responsible_User: 'USR003',
      Responsible_User_Name: 'Charlie Davis',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Industry: 'Technology',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'TechCorp',
      Campaign_ID: 'CMP001',
      Campaign_Name: 'Q4 Link Building',
      Action_Plan_NextWeek: 'Target 15 high-DA tech blogs for guest posting',
      QC_Notes: 'Quality improving, average DA up to 42',
      Status: 'On Track',
    },
    {
      Perf_ID: 'PERF002',
      Category: 'Backlink',
      Frequency: 'Weekly',
      Metric_Name: 'Earned Backlinks',
      Metric_Definition: 'New backlinks acquired this period',
      Gold_Standard_Value: 30,
      Target_Value: 25,
      Actual_Value: 28,
      Unit: 'links',
      Variance: 3,
      Variance_Percent: 12.0,
      Trend: 'Up',
      Responsible_User: 'USR003',
      Responsible_User_Name: 'Charlie Davis',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Industry: 'Technology',
      Competitor_ID: null,
      Competitor_Name: null,
      Campaign_ID: 'CMP001',
      Campaign_Name: 'Q4 Link Building',
      Action_Plan_NextWeek: 'Continue outreach to industry publications',
      QC_Notes: 'Excellent conversion rate from outreach',
      Status: 'On Track',
    },
    {
      Perf_ID: 'PERF003',
      Category: 'Backlink',
      Frequency: 'Weekly',
      Metric_Name: 'Average Domain Authority',
      Metric_Definition: 'Mean DA score of linking domains',
      Gold_Standard_Value: 50,
      Target_Value: 40,
      Actual_Value: 42,
      Unit: 'DA score',
      Variance: 2,
      Variance_Percent: 5.0,
      Trend: 'Up',
      Responsible_User: 'USR003',
      Responsible_User_Name: 'Charlie Davis',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Industry: 'Technology',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'TechCorp',
      Campaign_ID: 'CMP001',
      Campaign_Name: 'Q4 Link Building',
      Action_Plan_NextWeek: 'Focus on DA 50+ prospects',
      QC_Notes: 'Quality focus paying off',
      Status: 'On Track',
    },
    // Keyword Metrics
    {
      Perf_ID: 'PERF004',
      Category: 'Keyword',
      Frequency: 'Weekly',
      Metric_Name: 'Keywords in Top 10',
      Metric_Definition: 'Number of keywords ranking in positions 1-10',
      Gold_Standard_Value: 150,
      Target_Value: 120,
      Actual_Value: 105,
      Unit: 'keywords',
      Variance: -15,
      Variance_Percent: -12.5,
      Trend: 'Down',
      Responsible_User: 'USR002',
      Responsible_User_Name: 'Bob Wilson',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Industry: 'Technology',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'TechCorp',
      Campaign_ID: 'CMP002',
      Campaign_Name: 'Keyword Optimization',
      Action_Plan_NextWeek: 'Analyze dropped keywords and update content',
      QC_Notes: 'Recent algorithm update impact',
      Status: 'At Risk',
    },
    {
      Perf_ID: 'PERF005',
      Category: 'Keyword',
      Frequency: 'Weekly',
      Metric_Name: 'Average Keyword Position',
      Metric_Definition: 'Mean ranking position across all tracked keywords',
      Gold_Standard_Value: 8,
      Target_Value: 12,
      Actual_Value: 14,
      Unit: 'position',
      Variance: 2,
      Variance_Percent: 16.7,
      Trend: 'Down',
      Responsible_User: 'USR002',
      Responsible_User_Name: 'Bob Wilson',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Industry: 'Technology',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'TechCorp',
      Campaign_ID: 'CMP002',
      Campaign_Name: 'Keyword Optimization',
      Action_Plan_NextWeek: 'Optimize underperforming pages',
      QC_Notes: 'Need content refresh on key landing pages',
      Status: 'Off Track',
    },
    // Visitor Metrics
    {
      Perf_ID: 'PERF006',
      Category: 'Visitor',
      Frequency: 'Weekly',
      Metric_Name: 'Organic Visitors',
      Metric_Definition: 'Total organic search traffic',
      Gold_Standard_Value: 50000,
      Target_Value: 45000,
      Actual_Value: 47200,
      Unit: 'visitors',
      Variance: 2200,
      Variance_Percent: 4.9,
      Trend: 'Up',
      Responsible_User: 'USR002',
      Responsible_User_Name: 'Bob Wilson',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Industry: 'Technology',
      Competitor_ID: null,
      Competitor_Name: null,
      Campaign_ID: null,
      Campaign_Name: null,
      Action_Plan_NextWeek: 'Maintain momentum with new content',
      QC_Notes: 'Strong growth trend',
      Status: 'On Track',
    },
    {
      Perf_ID: 'PERF007',
      Category: 'Visitor',
      Frequency: 'Weekly',
      Metric_Name: 'Bounce Rate',
      Metric_Definition: 'Percentage of single-page sessions',
      Gold_Standard_Value: 40,
      Target_Value: 50,
      Actual_Value: 52,
      Unit: '%',
      Variance: 2,
      Variance_Percent: 4.0,
      Trend: 'Stable',
      Responsible_User: 'USR004',
      Responsible_User_Name: 'Diana Smith',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV002',
      Linked_Service_Name: 'Content Marketing',
      Linked_Industry: 'Technology',
      Competitor_ID: null,
      Competitor_Name: null,
      Campaign_ID: null,
      Campaign_Name: null,
      Action_Plan_NextWeek: 'Improve internal linking and CTAs',
      QC_Notes: 'Slightly above target, needs attention',
      Status: 'At Risk',
    },
    // Lead Metrics
    {
      Perf_ID: 'PERF008',
      Category: 'Lead',
      Frequency: 'Weekly',
      Metric_Name: 'Marketing Qualified Leads',
      Metric_Definition: 'Total MQLs generated',
      Gold_Standard_Value: 200,
      Target_Value: 150,
      Actual_Value: 168,
      Unit: 'leads',
      Variance: 18,
      Variance_Percent: 12.0,
      Trend: 'Up',
      Responsible_User: 'USR005',
      Responsible_User_Name: 'Emily Chen',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV003',
      Linked_Service_Name: 'Lead Generation',
      Linked_Industry: 'Technology',
      Competitor_ID: null,
      Competitor_Name: null,
      Campaign_ID: 'CMP004',
      Campaign_Name: 'Lead Gen Q4',
      Action_Plan_NextWeek: 'Launch new landing page variants',
      QC_Notes: 'Excellent conversion from organic traffic',
      Status: 'On Track',
    },
    {
      Perf_ID: 'PERF009',
      Category: 'Lead',
      Frequency: 'Weekly',
      Metric_Name: 'MQL to SQL Conversion',
      Metric_Definition: 'Percentage of MQLs converting to SQLs',
      Gold_Standard_Value: 40,
      Target_Value: 30,
      Actual_Value: 35,
      Unit: '%',
      Variance: 5,
      Variance_Percent: 16.7,
      Trend: 'Up',
      Responsible_User: 'USR005',
      Responsible_User_Name: 'Emily Chen',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV003',
      Linked_Service_Name: 'Lead Generation',
      Linked_Industry: 'Technology',
      Competitor_ID: null,
      Competitor_Name: null,
      Campaign_ID: 'CMP004',
      Campaign_Name: 'Lead Gen Q4',
      Action_Plan_NextWeek: 'Enhance lead nurturing workflows',
      QC_Notes: 'Quality of leads improving',
      Status: 'On Track',
    },
    // SMM Metrics
    {
      Perf_ID: 'PERF010',
      Category: 'SMM',
      Frequency: 'Weekly',
      Metric_Name: 'Engagement Rate',
      Metric_Definition: 'Average engagement rate across platforms',
      Gold_Standard_Value: 5.0,
      Target_Value: 3.5,
      Actual_Value: 4.2,
      Unit: '%',
      Variance: 0.7,
      Variance_Percent: 20.0,
      Trend: 'Up',
      Responsible_User: 'USR006',
      Responsible_User_Name: 'Frank Miller',
      Reporting_Date: '2024-11-01',
      Linked_Service_ID: 'SRV004',
      Linked_Service_Name: 'Social Media Marketing',
      Linked_Industry: 'Technology',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'TechCorp',
      Campaign_ID: 'CMP005',
      Campaign_Name: 'SMM Campaign',
      Action_Plan_NextWeek: 'Launch video content series',
      QC_Notes: 'Excellent performance on LinkedIn',
      Status: 'On Track',
    },
  ];

  const actionLogs: ActionLog[] = [
    {
      Action_ID: 'ACT001',
      Perf_ID: 'PERF004',
      Metric_Name: 'Keywords in Top 10',
      Category: 'Keyword',
      Action_Taken: 'Content refresh for 15 underperforming pages',
      Owner: 'Bob Wilson',
      Due_Date: '2024-11-08',
      Completion_Status: 'In Progress',
      Remarks: '8/15 pages updated, showing initial improvements',
    },
    {
      Action_ID: 'ACT002',
      Perf_ID: 'PERF005',
      Metric_Name: 'Average Keyword Position',
      Category: 'Keyword',
      Action_Taken: 'Technical SEO audit and fixes',
      Owner: 'Bob Wilson',
      Due_Date: '2024-11-10',
      Completion_Status: 'Pending',
      Remarks: 'Scheduled with tech team',
    },
    {
      Action_ID: 'ACT003',
      Perf_ID: 'PERF007',
      Metric_Name: 'Bounce Rate',
      Category: 'Visitor',
      Action_Taken: 'Improve internal linking and add related content sections',
      Owner: 'Diana Smith',
      Due_Date: '2024-11-05',
      Completion_Status: 'In Progress',
      Remarks: 'Templates updated, rolling out',
    },
    {
      Action_ID: 'ACT004',
      Perf_ID: 'PERF001',
      Metric_Name: 'Total Backlinks',
      Category: 'Backlink',
      Action_Taken: 'Outreach to 50 high-DA tech blogs',
      Owner: 'Charlie Davis',
      Due_Date: '2024-11-15',
      Completion_Status: 'Completed',
      Remarks: 'Secured 12 guest post opportunities',
    },
  ];

  const getCategoryData = (category: string) => {
    return performanceData.filter(m => m.Category === category);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'At Risk': return 'bg-orange-100 text-orange-800';
      case 'Off Track': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'Stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCompletionColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddEntry = () => {
    toast.success('Performance entry added successfully');
    setShowEntryDialog(false);
  };

  const handleAddAction = () => {
    toast.success('Action plan added successfully');
    setShowActionDialog(false);
  };

  const renderCategoryDashboard = (category: string) => {
    const categoryMetrics = getCategoryData(category);
    
    // Prepare chart data
    const chartData = categoryMetrics.map(m => ({
      name: m.Metric_Name.length > 15 ? m.Metric_Name.substring(0, 15) + '...' : m.Metric_Name,
      fullName: m.Metric_Name,
      Target: m.Target_Value,
      Actual: m.Actual_Value,
      Gold: m.Gold_Standard_Value,
      status: m.Status,
    }));

    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categoryMetrics.slice(0, 4).map((metric) => (
            <Card key={metric.Perf_ID} className="border-[#E2E8F0]">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{metric.Metric_Name}</span>
                    {getTrendIcon(metric.Trend)}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-[#7A1C46]">{metric.Actual_Value}</span>
                    <span className="text-xs text-gray-500">{metric.Unit}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Target: {metric.Target_Value}</span>
                    <Badge className={metric.Variance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {metric.Variance > 0 ? '+' : ''}{metric.Variance}
                    </Badge>
                  </div>
                  <Progress 
                    value={(metric.Actual_Value / metric.Target_Value) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Target vs Actual vs Gold Standard Chart */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#7A1C46]">📈 Target vs Actual vs Gold Standard</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow-lg">
                        <p className="font-medium">{data.fullName}</p>
                        <p className="text-sm text-blue-600">Target: {data.Target}</p>
                        <p className="text-sm text-green-600">Actual: {data.Actual}</p>
                        <p className="text-sm text-purple-600">Gold Std: {data.Gold}</p>
                        <Badge className={getStatusColor(data.status)} size="sm">
                          {data.status}
                        </Badge>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Legend />
                <Bar dataKey="Target" fill="#3B82F6" />
                <Bar dataKey="Actual" fill="#10B981" />
                <Bar dataKey="Gold" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Metrics Table */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-[#7A1C46]">📊 Detailed Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryMetrics.map((metric) => (
                    <TableRow key={metric.Perf_ID}>
                      <TableCell className="font-medium">{metric.Metric_Name}</TableCell>
                      <TableCell>{metric.Target_Value} {metric.Unit}</TableCell>
                      <TableCell>{metric.Actual_Value} {metric.Unit}</TableCell>
                      <TableCell>
                        <Badge className={metric.Variance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {metric.Variance > 0 ? '+' : ''}{metric.Variance} ({metric.Variance_Percent.toFixed(1)}%)
                        </Badge>
                      </TableCell>
                      <TableCell>{getTrendIcon(metric.Trend)}</TableCell>
                      <TableCell>{metric.Responsible_User_Name}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(metric.Status)}>{metric.Status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedMetric(metric);
                            setShowActionDialog(true);
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Action Plans */}
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#7A1C46]">🧭 Action Plans & Next Steps</CardTitle>
              <Button size="sm" onClick={() => setShowActionDialog(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Action
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Action Taken</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actionLogs.filter(a => a.Category === category).map((action) => (
                    <TableRow key={action.Action_ID}>
                      <TableCell className="font-medium">{action.Metric_Name}</TableCell>
                      <TableCell>{action.Action_Taken}</TableCell>
                      <TableCell>{action.Owner}</TableCell>
                      <TableCell>{action.Due_Date}</TableCell>
                      <TableCell>
                        <Badge className={getCompletionColor(action.Completion_Status)}>
                          {action.Completion_Status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{action.Remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#7A1C46]">📊 Performance Intelligence Center</CardTitle>
              <p className="text-gray-600 mt-1">Track KPIs, analyze trends, and drive growth with data-driven insights</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowLeaderboard(true)}>
                <Award className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-[#7A1C46] hover:bg-[#5A1434]" onClick={() => setShowEntryDialog(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer">All Services</Badge>
              <Badge variant="outline" className="cursor-pointer">All Users</Badge>
              <Badge variant="outline" className="cursor-pointer">All Campaigns</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="Backlink">🔗 Backlink</TabsTrigger>
              <TabsTrigger value="Keyword">🔑 Keyword</TabsTrigger>
              <TabsTrigger value="Visitor">👥 Visitor</TabsTrigger>
              <TabsTrigger value="Lead">📧 Lead</TabsTrigger>
              <TabsTrigger value="SMM">📱 SMM</TabsTrigger>
              <TabsTrigger value="Content">📝 Content</TabsTrigger>
              <TabsTrigger value="OnPage">⚙️ OnPage</TabsTrigger>
              <TabsTrigger value="Technical">🔧 Technical</TabsTrigger>
            </TabsList>

            <TabsContent value="Backlink" className="mt-6">
              {renderCategoryDashboard('Backlink')}
            </TabsContent>

            <TabsContent value="Keyword" className="mt-6">
              {renderCategoryDashboard('Keyword')}
            </TabsContent>

            <TabsContent value="Visitor" className="mt-6">
              {renderCategoryDashboard('Visitor')}
            </TabsContent>

            <TabsContent value="Lead" className="mt-6">
              {renderCategoryDashboard('Lead')}
            </TabsContent>

            <TabsContent value="SMM" className="mt-6">
              {renderCategoryDashboard('SMM')}
            </TabsContent>

            <TabsContent value="Content" className="mt-6">
              <div className="text-center py-12 text-gray-500">
                No content performance data available. Add entries to get started.
              </div>
            </TabsContent>

            <TabsContent value="OnPage" className="mt-6">
              <div className="text-center py-12 text-gray-500">
                No on-page performance data available. Add entries to get started.
              </div>
            </TabsContent>

            <TabsContent value="Technical" className="mt-6">
              <div className="text-center py-12 text-gray-500">
                No technical performance data available. Add entries to get started.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Entry Dialog */}
      <Dialog open={showEntryDialog} onOpenChange={setShowEntryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>📝 Add Performance Entry</DialogTitle>
            <DialogDescription>Record a new performance metric</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Backlink">Backlink</SelectItem>
                    <SelectItem value="Keyword">Keyword</SelectItem>
                    <SelectItem value="Visitor">Visitor</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="SMM">SMM</SelectItem>
                    <SelectItem value="Content">Content</SelectItem>
                    <SelectItem value="OnPage">OnPage</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Frequency *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Metric Name *</Label>
              <Input placeholder="e.g., Total Backlinks" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Gold Standard</Label>
                <Input type="number" placeholder="500" />
              </div>
              <div className="space-y-2">
                <Label>Target Value *</Label>
                <Input type="number" placeholder="450" />
              </div>
              <div className="space-y-2">
                <Label>Actual Value *</Label>
                <Input type="number" placeholder="468" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Unit</Label>
                <Input placeholder="e.g., links, %, visitors" />
              </div>
              <div className="space-y-2">
                <Label>Responsible User *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USR001">Alice Johnson</SelectItem>
                    <SelectItem value="USR002">Bob Wilson</SelectItem>
                    <SelectItem value="USR003">Charlie Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Action Plan for Next Week</Label>
              <Textarea placeholder="Describe planned actions..." rows={3} />
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={() => setShowEntryDialog(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleAddEntry} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
                Save Entry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Metric Detail Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>📊 Metric Details & Actions</DialogTitle>
            <DialogDescription>
              {selectedMetric ? selectedMetric.Metric_Name : 'View detailed metric information and action plans'}
            </DialogDescription>
          </DialogHeader>
          {selectedMetric && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-[#E2E8F0]">
                  <CardContent className="p-4 text-center">
                    <div className="text-xs text-gray-600">Gold Standard</div>
                    <div className="text-xl text-purple-600 font-medium mt-1">
                      {selectedMetric.Gold_Standard_Value} {selectedMetric.Unit}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#E2E8F0]">
                  <CardContent className="p-4 text-center">
                    <div className="text-xs text-gray-600">Target</div>
                    <div className="text-xl text-blue-600 font-medium mt-1">
                      {selectedMetric.Target_Value} {selectedMetric.Unit}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#E2E8F0]">
                  <CardContent className="p-4 text-center">
                    <div className="text-xs text-gray-600">Actual</div>
                    <div className="text-xl text-green-600 font-medium mt-1">
                      {selectedMetric.Actual_Value} {selectedMetric.Unit}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label>Action Plan for Next Week</Label>
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  {selectedMetric.Action_Plan_NextWeek}
                </div>
              </div>

              <div className="space-y-2">
                <Label>QC Notes</Label>
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  {selectedMetric.QC_Notes}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Responsible User</Label>
                  <div className="text-sm">{selectedMetric.Responsible_User_Name}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Status</Label>
                  <Badge className={getStatusColor(selectedMetric.Status)}>{selectedMetric.Status}</Badge>
                </div>
              </div>

              <Button onClick={() => setShowActionDialog(false)} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Leaderboard Dialog */}
      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>🏁 Team Performance Leaderboard</DialogTitle>
            <DialogDescription>View team rankings and individual performance scores</DialogDescription>
          </DialogHeader>
          <TeamLeaderboard />
        </DialogContent>
      </Dialog>
    </div>
  );
}
