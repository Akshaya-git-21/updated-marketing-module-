import { useState } from 'react';
import {
  FileDown, Table as TableIcon, RefreshCw, Target, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle2, Clock, FileText, Calendar, Users, BarChart3,
  PieChart, Download, Upload, Edit2, Eye, ExternalLink, Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface WeeklySnapshot {
  Snapshot_ID: string;
  Week_Start: string;
  Week_End: string;
  Campaign_ID: string;
  Campaign_Name: string;
  Service_ID: string;
  Service_Name: string;
  Industry: string;
  Owner_User_ID: string;
  Owner_Name: string;
  Word_Target_Per_Day: number;
  Weekly_Word_Target: number;
  Weekly_Word_Actual: number;
  Assets_Target_Count: number;
  Assets_Completed_Count: number;
  Completion_Percent: number;
  Planned_Days: string;
  Target_Keywords: string[];
  Keywords_Used: string[];
  Total_URLs_Planned: number;
  URLs_Published: number;
  QC_Grammar_Score_Avg: number;
  QC_Content_Quality_Score_Avg: number;
  QC_Keyword_Usage_Score_Avg: number;
  QC_Repetition_Score_Avg: number;
  QC_Competitor_Parity_Score_Avg: number;
  QC_SEO_Score_Avg: number;
  QC_Writing_Quality_Score_Avg: number;
  Overall_QC_Score: number;
  At_Risk_Flag: boolean;
  Notes_Action_Next_Week: string;
}

interface AssetEffort {
  Row_ID: string;
  Snapshot_ID: string;
  Asset_Name: string;
  Asset_Type: string;
  Planned_Word_Count: number;
  Actual_Word_Count: number;
  Planned_Publish_Days: string;
  Completion_Status: 'Not Started' | 'In Progress' | 'Completed';
  Keywords_Used: string[];
  Posted_URL: string;
  QC_Pass_Flag: boolean;
  QC_Score: number;
  SEO_Score: number;
  Language_Score: number;
  Reviewer_Comments: string;
}

interface DailyLog {
  Log_ID: string;
  Date: string;
  Owner_User_ID: string;
  Owner_Name: string;
  Campaign_ID: string;
  Word_Count_Done: number;
  Assets_Completed: number;
  QC_Avg_Score: number;
  URLs_Published: number;
}

export default function ContentEffortDashboard() {
  const [selectedWeek, setSelectedWeek] = useState('2024-10-28_2024-11-03');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedOwner, setSelectedOwner] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const [snapshot, setSnapshot] = useState<WeeklySnapshot>(getMockSnapshot());
  const [assets, setAssets] = useState<AssetEffort[]>(getMockAssets());
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(getMockDailyLogs());
  const [historicalData, setHistoricalData] = useState(getMockHistoricalData());

  function getMockSnapshot(): WeeklySnapshot {
    return {
      Snapshot_ID: 'SNAP001',
      Week_Start: '2024-10-28',
      Week_End: '2024-11-03',
      Campaign_ID: 'CMP001',
      Campaign_Name: 'Cloud Migration Content Campaign Q4',
      Service_ID: 'SRV001',
      Service_Name: 'Cloud Migration',
      Industry: 'Technology',
      Owner_User_ID: 'USR001',
      Owner_Name: 'Sarah Johnson',
      Word_Target_Per_Day: 2000,
      Weekly_Word_Target: 14000,
      Weekly_Word_Actual: 11850,
      Assets_Target_Count: 7,
      Assets_Completed_Count: 5,
      Completion_Percent: 71.4,
      Planned_Days: 'Mon, Wed, Thu, Fri',
      Target_Keywords: ['cloud migration', 'enterprise cloud', 'AWS migration', 'cloud strategy', 'hybrid cloud'],
      Keywords_Used: ['cloud migration', 'enterprise cloud', 'AWS migration', 'cloud strategy'],
      Total_URLs_Planned: 7,
      URLs_Published: 5,
      QC_Grammar_Score_Avg: 9.2,
      QC_Content_Quality_Score_Avg: 8.5,
      QC_Keyword_Usage_Score_Avg: 7.8,
      QC_Repetition_Score_Avg: 8.9,
      QC_Competitor_Parity_Score_Avg: 8.3,
      QC_SEO_Score_Avg: 8.7,
      QC_Writing_Quality_Score_Avg: 9.0,
      Overall_QC_Score: 8.6,
      At_Risk_Flag: false,
      Notes_Action_Next_Week: 'Increase keyword diversity usage. Target 2 additional infographics.'
    };
  }

  function getMockAssets(): AssetEffort[] {
    return [
      {
        Row_ID: 'ASSET001',
        Snapshot_ID: 'SNAP001',
        Asset_Name: 'Complete Guide to Enterprise Cloud Migration',
        Asset_Type: 'Article',
        Planned_Word_Count: 2500,
        Actual_Word_Count: 2650,
        Planned_Publish_Days: 'Monday',
        Completion_Status: 'Completed',
        Keywords_Used: ['cloud migration', 'enterprise cloud', 'AWS migration'],
        Posted_URL: 'https://blog.example.com/cloud-migration-guide',
        QC_Pass_Flag: true,
        QC_Score: 9.2,
        SEO_Score: 9.0,
        Language_Score: 9.5,
        Reviewer_Comments: 'Excellent quality, comprehensive coverage'
      },
      {
        Row_ID: 'ASSET002',
        Snapshot_ID: 'SNAP001',
        Asset_Name: 'Cloud Migration Checklist 2024',
        Asset_Type: 'Blog',
        Planned_Word_Count: 1500,
        Actual_Word_Count: 1480,
        Planned_Publish_Days: 'Wednesday',
        Completion_Status: 'Completed',
        Keywords_Used: ['cloud migration', 'cloud strategy'],
        Posted_URL: 'https://blog.example.com/migration-checklist',
        QC_Pass_Flag: true,
        QC_Score: 8.5,
        SEO_Score: 8.8,
        Language_Score: 8.7,
        Reviewer_Comments: 'Good structure, minor SEO improvements made'
      },
      {
        Row_ID: 'ASSET003',
        Snapshot_ID: 'SNAP001',
        Asset_Name: 'AWS vs Azure Migration Comparison',
        Asset_Type: 'Article',
        Planned_Word_Count: 3000,
        Actual_Word_Count: 2850,
        Planned_Publish_Days: 'Thursday',
        Completion_Status: 'Completed',
        Keywords_Used: ['AWS migration', 'cloud migration', 'enterprise cloud'],
        Posted_URL: 'https://blog.example.com/aws-azure-comparison',
        QC_Pass_Flag: true,
        QC_Score: 8.9,
        SEO_Score: 9.2,
        Language_Score: 9.0,
        Reviewer_Comments: 'Strong technical depth, excellent keyword integration'
      },
      {
        Row_ID: 'ASSET004',
        Snapshot_ID: 'SNAP001',
        Asset_Name: 'Cloud Cost Optimization Strategies',
        Asset_Type: 'Infographic',
        Planned_Word_Count: 800,
        Actual_Word_Count: 750,
        Planned_Publish_Days: 'Friday',
        Completion_Status: 'Completed',
        Keywords_Used: ['cloud strategy'],
        Posted_URL: 'https://resources.example.com/infographic-cost-optimization',
        QC_Pass_Flag: true,
        QC_Score: 8.0,
        SEO_Score: 7.8,
        Language_Score: 8.5,
        Reviewer_Comments: 'Visual quality excellent, text needs keyword density improvement'
      },
      {
        Row_ID: 'ASSET005',
        Snapshot_ID: 'SNAP001',
        Asset_Name: 'Cloud Security Best Practices E-book',
        Asset_Type: 'E-book',
        Planned_Word_Count: 5000,
        Actual_Word_Count: 4120,
        Planned_Publish_Days: 'Friday',
        Completion_Status: 'Completed',
        Keywords_Used: ['enterprise cloud', 'cloud migration'],
        Posted_URL: 'https://resources.example.com/ebook-cloud-security',
        QC_Pass_Flag: true,
        QC_Score: 8.3,
        SEO_Score: 8.5,
        Language_Score: 8.8,
        Reviewer_Comments: 'Comprehensive content, good technical accuracy'
      },
      {
        Row_ID: 'ASSET006',
        Snapshot_ID: 'SNAP001',
        Asset_Name: 'Hybrid Cloud Architecture Guide',
        Asset_Type: 'Article',
        Planned_Word_Count: 2200,
        Actual_Word_Count: 1800,
        Planned_Publish_Days: 'Monday',
        Completion_Status: 'In Progress',
        Keywords_Used: ['hybrid cloud', 'cloud strategy'],
        Posted_URL: '',
        QC_Pass_Flag: false,
        QC_Score: 0,
        SEO_Score: 0,
        Language_Score: 0,
        Reviewer_Comments: 'In progress - 80% complete'
      },
      {
        Row_ID: 'ASSET007',
        Snapshot_ID: 'SNAP001',
        Asset_Name: 'Multi-Cloud Management Video Script',
        Asset_Type: 'Video',
        Planned_Word_Count: 1000,
        Actual_Word_Count: 0,
        Planned_Publish_Days: 'Thursday',
        Completion_Status: 'Not Started',
        Keywords_Used: [],
        Posted_URL: '',
        QC_Pass_Flag: false,
        QC_Score: 0,
        SEO_Score: 0,
        Language_Score: 0,
        Reviewer_Comments: ''
      }
    ];
  }

  function getMockDailyLogs(): DailyLog[] {
    return [
      {
        Log_ID: 'LOG001',
        Date: '2024-10-28',
        Owner_User_ID: 'USR001',
        Owner_Name: 'Sarah Johnson',
        Campaign_ID: 'CMP001',
        Word_Count_Done: 2650,
        Assets_Completed: 1,
        QC_Avg_Score: 9.2,
        URLs_Published: 1
      },
      {
        Log_ID: 'LOG002',
        Date: '2024-10-29',
        Owner_User_ID: 'USR001',
        Owner_Name: 'Sarah Johnson',
        Campaign_ID: 'CMP001',
        Word_Count_Done: 0,
        Assets_Completed: 0,
        QC_Avg_Score: 0,
        URLs_Published: 0
      },
      {
        Log_ID: 'LOG003',
        Date: '2024-10-30',
        Owner_User_ID: 'USR001',
        Owner_Name: 'Sarah Johnson',
        Campaign_ID: 'CMP001',
        Word_Count_Done: 1480,
        Assets_Completed: 1,
        QC_Avg_Score: 8.5,
        URLs_Published: 1
      },
      {
        Log_ID: 'LOG004',
        Date: '2024-10-31',
        Owner_User_ID: 'USR001',
        Owner_Name: 'Sarah Johnson',
        Campaign_ID: 'CMP001',
        Word_Count_Done: 3600,
        Assets_Completed: 2,
        QC_Avg_Score: 8.45,
        URLs_Published: 2
      },
      {
        Log_ID: 'LOG005',
        Date: '2024-11-01',
        Owner_User_ID: 'USR001',
        Owner_Name: 'Sarah Johnson',
        Campaign_ID: 'CMP001',
        Word_Count_Done: 4120,
        Assets_Completed: 1,
        QC_Avg_Score: 8.3,
        URLs_Published: 1
      }
    ];
  }

  function getMockHistoricalData() {
    return [
      { week: 'Sep 9-15', actual: 12500, target: 14000 },
      { week: 'Sep 16-22', actual: 13200, target: 14000 },
      { week: 'Sep 23-29', actual: 14500, target: 14000 },
      { week: 'Sep 30-Oct 6', actual: 13800, target: 14000 },
      { week: 'Oct 7-13', actual: 11200, target: 14000 },
      { week: 'Oct 14-20', actual: 14200, target: 14000 },
      { week: 'Oct 21-27', actual: 13600, target: 14000 },
      { week: 'Oct 28-Nov 3', actual: 11850, target: 14000 }
    ];
  }

  const handleExportPDF = () => {
    toast.success('Exporting dashboard to PDF...');
  };

  const handleExportExcel = () => {
    toast.success('Exporting data to Excel...');
  };

  const handleRecomputeSnapshot = () => {
    toast.info('Recomputing weekly snapshot from daily logs...');
    setTimeout(() => {
      toast.success('Snapshot recomputed successfully!');
    }, 1500);
  };

  const handleRebaselineTarget = () => {
    toast.info('Opening target rebaseline dialog...');
  };

  const handleUpdateNotes = () => {
    toast.success('Action plan notes updated');
  };

  const keywordUtilizationPercent = (snapshot.Keywords_Used.length / snapshot.Target_Keywords.length) * 100;
  const isKeywordUtilizationLow = keywordUtilizationPercent < 90;

  const qcComponentData = [
    { name: 'Grammar', value: snapshot.QC_Grammar_Score_Avg, color: '#10b981' },
    { name: 'Content Quality', value: snapshot.QC_Content_Quality_Score_Avg, color: '#3b82f6' },
    { name: 'Keyword Usage', value: snapshot.QC_Keyword_Usage_Score_Avg, color: '#f59e0b' },
    { name: 'SEO', value: snapshot.QC_SEO_Score_Avg, color: '#8b5cf6' },
    { name: 'Writing Quality', value: snapshot.QC_Writing_Quality_Score_Avg, color: '#ec4899' }
  ];

  const assetWordCountData = assets.map(asset => ({
    name: asset.Asset_Name.substring(0, 25) + '...',
    planned: asset.Planned_Word_Count,
    actual: asset.Actual_Word_Count
  }));

  const getCompletionColor = (percent: number) => {
    if (percent >= 90) return 'text-green-600';
    if (percent >= 80) return 'text-blue-600';
    if (percent >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#7A1C46]">📝 Content Campaign Weekly Effort Summary</h2>
          <p className="text-sm text-gray-600 mt-1">
            Track weekly content production targets, actuals, QC scores, and asset-level progress
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <FileDown className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <TableIcon className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={handleRecomputeSnapshot}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Recompute
          </Button>
          <Button className="bg-[#7A1C46] hover:bg-[#5A1434]" onClick={handleRebaselineTarget}>
            <Target className="w-4 h-4 mr-2" />
            Rebaseline Target
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Week</Label>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-10-28_2024-11-03">Oct 28 - Nov 3, 2024</SelectItem>
                  <SelectItem value="2024-10-21_2024-10-27">Oct 21 - Oct 27, 2024</SelectItem>
                  <SelectItem value="2024-10-14_2024-10-20">Oct 14 - Oct 20, 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Campaign</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="CMP001">Cloud Migration Content Q4</SelectItem>
                  <SelectItem value="CMP002">AI/ML Thought Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Service</Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="SRV001">Cloud Migration</SelectItem>
                  <SelectItem value="SRV002">AI & ML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Industry</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Owner</Label>
              <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  <SelectItem value="USR001">Sarah Johnson</SelectItem>
                  <SelectItem value="USR002">Mike Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-[#7A1C46]">
                {snapshot.Weekly_Word_Target.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 mt-1">Weekly Word Target</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className={`text-2xl ${snapshot.Weekly_Word_Actual >= snapshot.Weekly_Word_Target ? 'text-green-600' : 'text-orange-600'}`}>
                {snapshot.Weekly_Word_Actual.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600 mt-1">Actual Word Count</div>
              <div className="text-xs text-gray-500 mt-1">
                ({((snapshot.Weekly_Word_Actual / snapshot.Weekly_Word_Target) * 100).toFixed(0)}%)
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-blue-600">
                {snapshot.Assets_Completed_Count}/{snapshot.Assets_Target_Count}
              </div>
              <div className="text-xs text-gray-600 mt-1">Assets Completed</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className={`text-2xl ${getCompletionColor(snapshot.Completion_Percent)}`}>
                {snapshot.Completion_Percent.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600 mt-1">Completion %</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className={`text-2xl ${snapshot.Overall_QC_Score >= 8 ? 'text-green-600' : 'text-orange-600'}`}>
                {snapshot.Overall_QC_Score.toFixed(1)}
              </div>
              <div className="text-xs text-gray-600 mt-1">QC Avg Score</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-purple-600">
                {snapshot.URLs_Published}/{snapshot.Total_URLs_Planned}
              </div>
              <div className="text-xs text-gray-600 mt-1">URLs Published</div>
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${snapshot.At_Risk_Flag ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
          <CardContent className="py-4">
            <div className="text-center">
              <div className={`text-2xl ${snapshot.At_Risk_Flag ? 'text-red-600' : 'text-green-600'}`}>
                {snapshot.At_Risk_Flag ? (
                  <AlertCircle className="w-8 h-8 mx-auto" />
                ) : (
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                )}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {snapshot.At_Risk_Flag ? 'At Risk' : 'On Track'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* At-Risk Alert */}
      {snapshot.At_Risk_Flag && (
        <Alert className="border-red-300 bg-red-50">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <AlertDescription>
            <strong>Campaign At Risk:</strong> Completion below 80% or QC score below 8.0. 
            Review asset-level details and update action plan for next week.
          </AlertDescription>
        </Alert>
      )}

      {/* Keyword Utilization Alert */}
      {isKeywordUtilizationLow && (
        <Alert className="border-yellow-300 bg-yellow-50">
          <AlertCircle className="w-4 h-4 text-yellow-600" />
          <AlertDescription>
            <strong>Keyword Utilization Low:</strong> Only {snapshot.Keywords_Used.length} of {snapshot.Target_Keywords.length} target keywords used ({keywordUtilizationPercent.toFixed(0)}%). 
            Missing: {snapshot.Target_Keywords.filter(kw => !snapshot.Keywords_Used.includes(kw)).join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="assets">📄 Asset Details</TabsTrigger>
          <TabsTrigger value="trends">📈 Trends</TabsTrigger>
          <TabsTrigger value="daily">📅 Daily Log</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Word Count Chart */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Assets — Word Count Target vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={assetWordCountData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} style={{ fontSize: '10px' }} />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="planned" fill="#7A1C46" name="Planned" />
                    <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* QC Component Breakdown */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">QC Component Breakdown (Weighted)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={qcComponentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {qcComponentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {qcComponentData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <Badge variant="outline">{item.value.toFixed(1)}/10</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Campaign Info */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Campaign Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-gray-600">Campaign</div>
                    <div>{snapshot.Campaign_Name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Service</div>
                    <div>{snapshot.Service_Name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Industry</div>
                    <div>{snapshot.Industry}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Owner</div>
                    <div>{snapshot.Owner_Name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Week Period</div>
                    <div>{new Date(snapshot.Week_Start).toLocaleDateString()} - {new Date(snapshot.Week_End).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Planned Days</div>
                    <div>{snapshot.Planned_Days}</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-xs text-gray-600 mb-2">Daily Target</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{snapshot.Word_Target_Per_Day.toLocaleString()} words/day</span>
                    <Badge className="bg-[#7A1C46] text-white">
                      {Math.round(snapshot.Weekly_Word_Actual / 5).toLocaleString()} actual avg
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Keyword Utilization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Keywords Used: {snapshot.Keywords_Used.length} / {snapshot.Target_Keywords.length}</span>
                    <Badge className={isKeywordUtilizationLow ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                      {keywordUtilizationPercent.toFixed(0)}%
                    </Badge>
                  </div>
                  <Progress value={keywordUtilizationPercent} className={`h-2 ${isKeywordUtilizationLow ? '[&>div]:bg-yellow-600' : '[&>div]:bg-green-600'}`} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Target Keywords</div>
                  <div className="flex flex-wrap gap-1">
                    {snapshot.Target_Keywords.map((kw, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline"
                        className={snapshot.Keywords_Used.includes(kw) ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-600'}
                      >
                        {kw} {snapshot.Keywords_Used.includes(kw) && '✓'}
                      </Badge>
                    ))}
                  </div>
                </div>
                {isKeywordUtilizationLow && (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertCircle className="w-3 h-3 text-yellow-600" />
                    <AlertDescription className="text-xs">
                      Missing keywords: {snapshot.Target_Keywords.filter(kw => !snapshot.Keywords_Used.includes(kw)).join(', ')}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle>Asset-Level Effort & QC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Planned Words</TableHead>
                      <TableHead>Actual Words</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Keywords</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>QC Score</TableHead>
                      <TableHead>SEO</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Pass</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => (
                      <TableRow key={asset.Row_ID}>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="text-sm">{asset.Asset_Name}</div>
                            {asset.Reviewer_Comments && (
                              <div className="text-xs text-gray-500 mt-1">{asset.Reviewer_Comments}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{asset.Asset_Type}</Badge>
                        </TableCell>
                        <TableCell>{asset.Planned_Word_Count.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <span className={
                              asset.Actual_Word_Count >= asset.Planned_Word_Count 
                                ? 'text-green-600' 
                                : asset.Actual_Word_Count >= asset.Planned_Word_Count * 0.9 
                                ? 'text-blue-600' 
                                : 'text-orange-600'
                            }>
                              {asset.Actual_Word_Count.toLocaleString()}
                            </span>
                            {asset.Actual_Word_Count > 0 && (
                              <span className="text-xs text-gray-500">
                                ({((asset.Actual_Word_Count / asset.Planned_Word_Count) * 100).toFixed(0)}%)
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(asset.Completion_Status)}>
                            {asset.Completion_Status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {asset.Keywords_Used.length > 0 ? (
                              asset.Keywords_Used.slice(0, 2).map((kw, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {kw}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                            {asset.Keywords_Used.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{asset.Keywords_Used.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {asset.Posted_URL ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(asset.Posted_URL, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {asset.QC_Score > 0 ? (
                            <Badge className={asset.QC_Score >= 8 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                              {asset.QC_Score.toFixed(1)}
                            </Badge>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {asset.SEO_Score > 0 ? (
                            <Badge variant="outline">{asset.SEO_Score.toFixed(1)}</Badge>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {asset.Language_Score > 0 ? (
                            <Badge variant="outline">{asset.Language_Score.toFixed(1)}</Badge>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Checkbox checked={asset.QC_Pass_Flag} disabled />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle>Word Count Progress (8-Week Trend)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual Words" />
                  <Line type="monotone" dataKey="target" stroke="#7A1C46" strokeWidth={2} strokeDasharray="5 5" name="Target Words" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Weeks On Target:</span>
                  <Badge className="bg-green-100 text-green-800">4/8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weeks Below Target:</span>
                  <Badge className="bg-orange-100 text-orange-800">4/8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Week:</span>
                  <span>Sep 23-29 (104%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Worst Week:</span>
                  <span>Oct 7-13 (80%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Achievement:</span>
                  <span>93%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">QC Trend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Avg:</span>
                  <Badge className="bg-green-100 text-green-800">{snapshot.Overall_QC_Score.toFixed(1)}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">8-Week Avg:</span>
                  <span>8.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Score:</span>
                  <span>9.1 (Sep 16-22)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trend:</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+2.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Asset Completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week:</span>
                  <span>{snapshot.Assets_Completed_Count}/{snapshot.Assets_Target_Count} ({snapshot.Completion_Percent.toFixed(0)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">8-Week Total:</span>
                  <span>52/56 (93%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Articles:</span>
                  <span>28 completed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Blogs:</span>
                  <span>16 completed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Other:</span>
                  <span>8 completed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Daily Log Tab */}
        <TabsContent value="daily">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle>Daily Log Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Word Count</TableHead>
                      <TableHead>Assets Completed</TableHead>
                      <TableHead>QC Avg Score</TableHead>
                      <TableHead>URLs Published</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyLogs.map((log) => (
                      <TableRow key={log.Log_ID}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(log.Date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </div>
                        </TableCell>
                        <TableCell>{log.Owner_Name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={log.Word_Count_Done >= snapshot.Word_Target_Per_Day ? 'text-green-600' : log.Word_Count_Done > 0 ? 'text-orange-600' : 'text-gray-400'}>
                              {log.Word_Count_Done.toLocaleString()}
                            </span>
                            {log.Word_Count_Done > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {((log.Word_Count_Done / snapshot.Word_Target_Per_Day) * 100).toFixed(0)}%
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.Assets_Completed}</Badge>
                        </TableCell>
                        <TableCell>
                          {log.QC_Avg_Score > 0 ? (
                            <Badge className={log.QC_Avg_Score >= 8 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                              {log.QC_Avg_Score.toFixed(1)}
                            </Badge>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.URLs_Published}</Badge>
                        </TableCell>
                        <TableCell>
                          {log.Word_Count_Done >= snapshot.Word_Target_Per_Day ? (
                            <Badge className="bg-green-100 text-green-800">✓ On Target</Badge>
                          ) : log.Word_Count_Done > 0 ? (
                            <Badge className="bg-orange-100 text-orange-800">⚠ Below Target</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">No Activity</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Daily Summary Stats */}
              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <div className="text-2xl text-[#7A1C46]">
                    {dailyLogs.reduce((sum, log) => sum + log.Word_Count_Done, 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Total Words</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <div className="text-2xl text-[#7A1C46]">
                    {dailyLogs.reduce((sum, log) => sum + log.Assets_Completed, 0)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Total Assets</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <div className="text-2xl text-[#7A1C46]">
                    {dailyLogs.reduce((sum, log) => sum + log.URLs_Published, 0)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Total URLs</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 text-center">
                  <div className="text-2xl text-[#7A1C46]">
                    {dailyLogs.filter(log => log.Word_Count_Done >= snapshot.Word_Target_Per_Day).length}/{dailyLogs.length}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Days On Target</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Plan for Next Week */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle>📝 Action Plan for Next Week</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={snapshot.Notes_Action_Next_Week}
            onChange={(e) => {
              const updated = { ...snapshot, Notes_Action_Next_Week: e.target.value };
              setSnapshot(updated);
            }}
            placeholder="Add improvement actions, resource reallocations, or strategic adjustments for the upcoming week..."
            rows={4}
          />
          <div className="flex justify-end">
            <Button onClick={handleUpdateNotes} className="bg-[#7A1C46] hover:bg-[#5A1434]">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Update Action Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
