import { useState } from 'react';
import { 
  PlusCircle, BarChart2, ArrowRight, Check, RefreshCw, ClipboardCheck, 
  Link2, FileText, Image as ImageIcon, Video, Bookmark, MessageSquare,
  Filter, Search, Calendar, TrendingUp, TrendingDown, AlertCircle,
  ExternalLink, Eye, Edit2, Trash2, Download, Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Alert, AlertDescription } from './ui/alert';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface SEOEntry {
  SEO_ID: string;
  Campaign_ID: string;
  Milestone_Stage: 'Posting' | 'InReview' | 'Approved' | 'Rejected';
  SEO_Category: string;
  Asset_Type: string;
  Target_Count: number;
  Actual_This_Week: number;
  Cumulative_Actual: number;
  Effort_Target_Per_Day: number;
  Start_Date: string;
  End_Date: string;
  SEO_Code: string;
  Link_Name: string;
  Anchor_Text: string;
  Title: string;
  Description: string;
  Keywords: string;
  DA_Score: number;
  Industry: string;
  Service: string;
  Sub_Service: string;
  Target_URL: string;
  Posted_URL: string;
  Posted_On: string;
  QC_Checked: boolean;
  QC_Score: number;
  QC_Status: 'Pass' | 'Rework' | 'Fail' | 'Pending';
  Approval_Status: 'Approved' | 'Rejected' | 'Pending';
  Reviewer_Comments: string;
  Posted_By: string;
  Posted_By_Name: string;
  Last_Updated: string;
}

interface QCChecklistItem {
  Item: string;
  Score: number;
  Comment: string;
  Gold_Standard: string;
}

interface SEOSubmissionViewProps {
  projectId: string;
  campaignId?: string;
}

const SEO_CATEGORIES = [
  'Classified', 'Forum', 'Blog', 'PDF', 'Video', 'Social Bookmark',
  'Image Submission', 'Article Directory', 'Guest Post', 'Press Release',
  'Infographic', 'Document Sharing', 'Q&A Sites', 'Social Media'
];

const ASSET_TYPES = [
  'Image', 'Video', 'Article', 'Infographic', 'PDF Document', 
  'Presentation', 'Ebook', 'Whitepaper', 'Case Study', 'Blog Post'
];

export default function SEOSubmissionView({ projectId, campaignId }: SEOSubmissionViewProps) {
  const [activeTab, setActiveTab] = useState('board');
  const [seoEntries, setSeoEntries] = useState<SEOEntry[]>(getMockSEOEntries());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isQCDialogOpen, setIsQCDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<SEOEntry | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    stage: 'all',
    service: 'all',
    qcStatus: 'all',
    searchTerm: ''
  });

  function getMockSEOEntries(): SEOEntry[] {
    return [
      {
        SEO_ID: 'SEO001',
        Campaign_ID: 'CMP001',
        Milestone_Stage: 'Posting',
        SEO_Category: 'Classified',
        Asset_Type: 'Article',
        Target_Count: 100,
        Actual_This_Week: 45,
        Cumulative_Actual: 235,
        Effort_Target_Per_Day: 20,
        Start_Date: '2024-10-28',
        End_Date: '2024-11-08',
        SEO_Code: 'SEO-CLS-001',
        Link_Name: 'Cloud Migration Services',
        Anchor_Text: 'enterprise cloud migration',
        Title: 'Complete Guide to Enterprise Cloud Migration',
        Description: 'Learn how to migrate your enterprise infrastructure to the cloud efficiently',
        Keywords: 'cloud migration, enterprise cloud, infrastructure',
        DA_Score: 65,
        Industry: 'Technology',
        Service: 'Cloud Migration',
        Sub_Service: 'AWS Migration',
        Target_URL: 'https://example.com/services/cloud-migration',
        Posted_URL: 'https://classified-site.com/listings/12345',
        Posted_On: '2024-11-01 09:30:00',
        QC_Checked: true,
        QC_Score: 9,
        QC_Status: 'Pass',
        Approval_Status: 'Pending',
        Reviewer_Comments: '',
        Posted_By: 'USR001',
        Posted_By_Name: 'John Smith',
        Last_Updated: '2024-11-01 14:20:00'
      },
      {
        SEO_ID: 'SEO002',
        Campaign_ID: 'CMP001',
        Milestone_Stage: 'InReview',
        SEO_Category: 'Blog',
        Asset_Type: 'Blog Post',
        Target_Count: 50,
        Actual_This_Week: 28,
        Cumulative_Actual: 142,
        Effort_Target_Per_Day: 10,
        Start_Date: '2024-10-28',
        End_Date: '2024-11-08',
        SEO_Code: 'SEO-BLG-002',
        Link_Name: 'AI Implementation Best Practices',
        Anchor_Text: 'AI implementation guide',
        Title: 'Top 10 AI Implementation Best Practices for 2024',
        Description: 'Discover the best practices for implementing AI in your organization',
        Keywords: 'AI implementation, machine learning, artificial intelligence',
        DA_Score: 72,
        Industry: 'Technology',
        Service: 'AI & ML',
        Sub_Service: 'AI Strategy',
        Target_URL: 'https://example.com/services/ai-ml',
        Posted_URL: 'https://tech-blog.com/ai-best-practices-2024',
        Posted_On: '2024-10-30 11:15:00',
        QC_Checked: true,
        QC_Score: 8,
        QC_Status: 'Pass',
        Approval_Status: 'Pending',
        Reviewer_Comments: 'Good quality content, minor formatting adjustments needed',
        Posted_By: 'USR002',
        Posted_By_Name: 'Sarah Johnson',
        Last_Updated: '2024-10-31 16:45:00'
      },
      {
        SEO_ID: 'SEO003',
        Campaign_ID: 'CMP001',
        Milestone_Stage: 'Approved',
        SEO_Category: 'Forum',
        Asset_Type: 'Article',
        Target_Count: 75,
        Actual_This_Week: 62,
        Cumulative_Actual: 312,
        Effort_Target_Per_Day: 15,
        Start_Date: '2024-10-21',
        End_Date: '2024-11-01',
        SEO_Code: 'SEO-FRM-003',
        Link_Name: 'DevOps Automation Tools',
        Anchor_Text: 'DevOps automation solutions',
        Title: 'Essential DevOps Automation Tools for Modern Teams',
        Description: 'Explore the top DevOps automation tools that streamline your workflow',
        Keywords: 'DevOps, automation, CI/CD, tools',
        DA_Score: 58,
        Industry: 'Technology',
        Service: 'DevOps',
        Sub_Service: 'Automation',
        Target_URL: 'https://example.com/services/devops',
        Posted_URL: 'https://devforum.com/topic/automation-tools',
        Posted_On: '2024-10-25 14:20:00',
        QC_Checked: true,
        QC_Score: 9,
        QC_Status: 'Pass',
        Approval_Status: 'Approved',
        Reviewer_Comments: 'Excellent quality, approved for publication',
        Posted_By: 'USR003',
        Posted_By_Name: 'Mike Chen',
        Last_Updated: '2024-10-26 10:30:00'
      },
      {
        SEO_ID: 'SEO004',
        Campaign_ID: 'CMP001',
        Milestone_Stage: 'Posting',
        SEO_Category: 'Video',
        Asset_Type: 'Video',
        Target_Count: 30,
        Actual_This_Week: 12,
        Cumulative_Actual: 78,
        Effort_Target_Per_Day: 5,
        Start_Date: '2024-10-28',
        End_Date: '2024-11-08',
        SEO_Code: 'SEO-VID-004',
        Link_Name: 'Cybersecurity Training Video',
        Anchor_Text: 'cybersecurity best practices',
        Title: 'Cybersecurity Fundamentals: A Complete Video Guide',
        Description: 'Comprehensive video training on cybersecurity essentials',
        Keywords: 'cybersecurity, security training, data protection',
        DA_Score: 68,
        Industry: 'Technology',
        Service: 'Cybersecurity',
        Sub_Service: 'Security Training',
        Target_URL: 'https://example.com/services/cybersecurity',
        Posted_URL: '',
        Posted_On: '',
        QC_Checked: false,
        QC_Score: 0,
        QC_Status: 'Pending',
        Approval_Status: 'Pending',
        Reviewer_Comments: '',
        Posted_By: 'USR001',
        Posted_By_Name: 'John Smith',
        Last_Updated: '2024-11-01 08:00:00'
      },
      {
        SEO_ID: 'SEO005',
        Campaign_ID: 'CMP001',
        Milestone_Stage: 'InReview',
        SEO_Category: 'PDF',
        Asset_Type: 'PDF Document',
        Target_Count: 40,
        Actual_This_Week: 35,
        Cumulative_Actual: 156,
        Effort_Target_Per_Day: 8,
        Start_Date: '2024-10-28',
        End_Date: '2024-11-08',
        SEO_Code: 'SEO-PDF-005',
        Link_Name: 'Data Analytics Whitepaper',
        Anchor_Text: 'data analytics solutions',
        Title: 'Advanced Data Analytics: Strategic Implementation Guide',
        Description: 'Whitepaper covering strategic data analytics implementation',
        Keywords: 'data analytics, big data, business intelligence',
        DA_Score: 75,
        Industry: 'Technology',
        Service: 'Data Analytics',
        Sub_Service: 'Business Intelligence',
        Target_URL: 'https://example.com/services/data-analytics',
        Posted_URL: 'https://document-share.com/analytics-guide-2024',
        Posted_On: '2024-10-29 13:45:00',
        QC_Checked: true,
        QC_Score: 6,
        QC_Status: 'Rework',
        Approval_Status: 'Pending',
        Reviewer_Comments: 'Content quality good but needs better keyword integration',
        Posted_By: 'USR002',
        Posted_By_Name: 'Sarah Johnson',
        Last_Updated: '2024-10-30 09:15:00'
      },
      {
        SEO_ID: 'SEO006',
        Campaign_ID: 'CMP001',
        Milestone_Stage: 'Rejected',
        SEO_Category: 'Social Bookmark',
        Asset_Type: 'Article',
        Target_Count: 150,
        Actual_This_Week: 98,
        Cumulative_Actual: 512,
        Effort_Target_Per_Day: 30,
        Start_Date: '2024-10-21',
        End_Date: '2024-11-01',
        SEO_Code: 'SEO-SBM-006',
        Link_Name: 'IoT Solutions Overview',
        Anchor_Text: 'IoT implementation',
        Title: 'Internet of Things: Modern Implementation Strategies',
        Description: 'Understanding IoT implementation for modern businesses',
        Keywords: 'IoT, Internet of Things, smart devices',
        DA_Score: 42,
        Industry: 'Technology',
        Service: 'IoT Solutions',
        Sub_Service: 'IoT Strategy',
        Target_URL: 'https://example.com/services/iot',
        Posted_URL: 'https://social-bookmark.com/iot-strategies',
        Posted_On: '2024-10-24 10:00:00',
        QC_Checked: true,
        QC_Score: 4,
        QC_Status: 'Fail',
        Approval_Status: 'Rejected',
        Reviewer_Comments: 'Low DA score, poor content relevance, does not meet quality standards',
        Posted_By: 'USR003',
        Posted_By_Name: 'Mike Chen',
        Last_Updated: '2024-10-25 14:30:00'
      }
    ];
  }

  const handleDragStart = (e: React.DragEvent, entry: SEOEntry) => {
    e.dataTransfer.setData('seoEntryId', entry.SEO_ID);
  };

  const handleDrop = (e: React.DragEvent, newStage: SEOEntry['Milestone_Stage']) => {
    e.preventDefault();
    const seoEntryId = e.dataTransfer.getData('seoEntryId');
    
    setSeoEntries(entries =>
      entries.map(entry => {
        if (entry.SEO_ID === seoEntryId) {
          toast.success(`${entry.SEO_Code} moved to ${newStage}`);
          return { ...entry, Milestone_Stage: newStage, Last_Updated: new Date().toISOString() };
        }
        return entry;
      })
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMarkReviewed = (entry: SEOEntry) => {
    setSeoEntries(entries =>
      entries.map(e =>
        e.SEO_ID === entry.SEO_ID
          ? { ...e, QC_Checked: true, Last_Updated: new Date().toISOString() }
          : e
      )
    );
    toast.success('Entry marked as reviewed');
  };

  const handleSendForRework = (entry: SEOEntry) => {
    setSeoEntries(entries =>
      entries.map(e =>
        e.SEO_ID === entry.SEO_ID
          ? { ...e, Milestone_Stage: 'Posting', QC_Status: 'Rework', Last_Updated: new Date().toISOString() }
          : e
      )
    );
    toast.info('Entry sent back for rework');
  };

  const handleOpenQC = (entry: SEOEntry) => {
    setSelectedEntry(entry);
    setIsQCDialogOpen(true);
  };

  const handleQCSubmit = (qcScore: number, comments: string) => {
    if (!selectedEntry) return;

    const qcStatus: SEOEntry['QC_Status'] = 
      qcScore >= 8 ? 'Pass' : qcScore >= 6 ? 'Rework' : 'Fail';
    
    const newStage: SEOEntry['Milestone_Stage'] = 
      qcScore >= 8 ? 'InReview' : 'Posting';

    setSeoEntries(entries =>
      entries.map(e =>
        e.SEO_ID === selectedEntry.SEO_ID
          ? { 
              ...e, 
              QC_Checked: true,
              QC_Score: qcScore,
              QC_Status: qcStatus,
              Milestone_Stage: newStage,
              Reviewer_Comments: comments,
              Last_Updated: new Date().toISOString()
            }
          : e
      )
    );

    setIsQCDialogOpen(false);
    setSelectedEntry(null);
    
    if (qcScore >= 8) {
      toast.success('QC passed! Entry moved to In Review');
    } else {
      toast.warning('QC score below threshold. Entry remains in Posting stage');
    }
  };

  const handleApprove = (entry: SEOEntry) => {
    setSeoEntries(entries =>
      entries.map(e =>
        e.SEO_ID === entry.SEO_ID
          ? { ...e, Milestone_Stage: 'Approved', Approval_Status: 'Approved', Last_Updated: new Date().toISOString() }
          : e
      )
    );
    toast.success('Entry approved!');
  };

  const handleReject = (entry: SEOEntry) => {
    setSeoEntries(entries =>
      entries.map(e =>
        e.SEO_ID === entry.SEO_ID
          ? { ...e, Milestone_Stage: 'Rejected', Approval_Status: 'Rejected', Last_Updated: new Date().toISOString() }
          : e
      )
    );
    toast.error('Entry rejected');
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Posting': return 'bg-blue-100 text-blue-800';
      case 'InReview': return 'bg-orange-100 text-orange-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQCStatusColor = (status: string) => {
    switch (status) {
      case 'Pass': return 'bg-green-100 text-green-800';
      case 'Rework': return 'bg-orange-100 text-orange-800';
      case 'Fail': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Blog': return <FileText className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      case 'Social Bookmark': return <Bookmark className="w-4 h-4" />;
      case 'Forum': return <MessageSquare className="w-4 h-4" />;
      case 'Classified': case 'PDF': case 'Image Submission':
        return <ImageIcon className="w-4 h-4" />;
      default: return <Link2 className="w-4 h-4" />;
    }
  };

  const filteredEntries = seoEntries.filter(entry => {
    if (filters.category !== 'all' && entry.SEO_Category !== filters.category) return false;
    if (filters.stage !== 'all' && entry.Milestone_Stage !== filters.stage) return false;
    if (filters.service !== 'all' && entry.Service !== filters.service) return false;
    if (filters.qcStatus !== 'all' && entry.QC_Status !== filters.qcStatus) return false;
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      return (
        entry.SEO_Code.toLowerCase().includes(term) ||
        entry.Link_Name.toLowerCase().includes(term) ||
        entry.Title.toLowerCase().includes(term) ||
        entry.Keywords.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const groupByStage = (stage: SEOEntry['Milestone_Stage']) =>
    filteredEntries.filter(entry => entry.Milestone_Stage === stage);

  const getWeeklySummary = () => {
    const summary: Record<string, { target: number; actual: number; cumulative: number }> = {};
    
    seoEntries.forEach(entry => {
      if (!summary[entry.SEO_Category]) {
        summary[entry.SEO_Category] = { target: 0, actual: 0, cumulative: 0 };
      }
      summary[entry.SEO_Category].target += entry.Target_Count;
      summary[entry.SEO_Category].actual += entry.Actual_This_Week;
      summary[entry.SEO_Category].cumulative += entry.Cumulative_Actual;
    });

    return summary;
  };

  const weeklySummary = getWeeklySummary();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#7A1C46]">🔗 SEO Campaign Execution Board</h2>
          <p className="text-sm text-gray-600 mt-1">
            Track SEO submissions through posting, review, and approval stages
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#7A1C46] hover:bg-[#5A1434]"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add SEO Entry
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by code, name, keywords..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="pl-9"
              />
            </div>
            <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {SEO_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.stage} onValueChange={(value) => setFilters({ ...filters, stage: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Posting">Posting</SelectItem>
                <SelectItem value="InReview">In Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.service} onValueChange={(value) => setFilters({ ...filters, service: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Cloud Migration">Cloud Migration</SelectItem>
                <SelectItem value="AI & ML">AI & ML</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="Data Analytics">Data Analytics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.qcStatus} onValueChange={(value) => setFilters({ ...filters, qcStatus: value })}>
              <SelectTrigger>
                <SelectValue placeholder="QC Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All QC Status</SelectItem>
                <SelectItem value="Pass">Pass</SelectItem>
                <SelectItem value="Rework">Rework</SelectItem>
                <SelectItem value="Fail">Fail</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="board">📋 Board View</TabsTrigger>
          <TabsTrigger value="list">📊 List View</TabsTrigger>
          <TabsTrigger value="summary">📈 Weekly Summary</TabsTrigger>
        </TabsList>

        {/* Board View */}
        <TabsContent value="board" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Posting Column */}
            <div
              onDrop={(e) => handleDrop(e, 'Posting')}
              onDragOver={handleDragOver}
              className="space-y-3"
            >
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div>
                  <h3 className="text-blue-800">Posting</h3>
                  <p className="text-xs text-blue-600">{groupByStage('Posting').length} entries</p>
                </div>
              </div>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {groupByStage('Posting').map(entry => (
                    <Card
                      key={entry.SEO_ID}
                      draggable
                      onDragStart={(e) => handleDragStart(e, entry)}
                      className="border-[#E2E8F0] cursor-move hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(entry.SEO_Category)}
                              <span className="text-xs text-[#7A1C46]">{entry.SEO_Code}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">{entry.DA_Score}</Badge>
                          </div>
                          <h4 className="text-sm line-clamp-2">{entry.Link_Name}</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge className={getQCStatusColor(entry.QC_Status)} size="sm">
                              {entry.QC_Status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{entry.SEO_Category}</Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            <div>Service: {entry.Service}</div>
                            <div>Posted by: {entry.Posted_By_Name}</div>
                          </div>
                          <div className="flex gap-1 pt-2 border-t">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleOpenQC(entry)}
                            >
                              <ClipboardCheck className="w-3 h-3 mr-1" />
                              QC
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkReviewed(entry)}
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* In Review Column */}
            <div
              onDrop={(e) => handleDrop(e, 'InReview')}
              onDragOver={handleDragOver}
              className="space-y-3"
            >
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div>
                  <h3 className="text-orange-800">In Review</h3>
                  <p className="text-xs text-orange-600">{groupByStage('InReview').length} entries</p>
                </div>
              </div>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {groupByStage('InReview').map(entry => (
                    <Card
                      key={entry.SEO_ID}
                      draggable
                      onDragStart={(e) => handleDragStart(e, entry)}
                      className="border-[#E2E8F0] cursor-move hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(entry.SEO_Category)}
                              <span className="text-xs text-[#7A1C46]">{entry.SEO_Code}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">{entry.DA_Score}</Badge>
                          </div>
                          <h4 className="text-sm line-clamp-2">{entry.Link_Name}</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge className="bg-green-100 text-green-800" size="sm">
                              QC: {entry.QC_Score}/10
                            </Badge>
                            <Badge variant="outline" className="text-xs">{entry.SEO_Category}</Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            <div>Service: {entry.Service}</div>
                            {entry.Posted_URL && (
                              <div className="flex items-center gap-1 text-blue-600">
                                <ExternalLink className="w-3 h-3" />
                                <span className="truncate">View Post</span>
                              </div>
                            )}
                          </div>
                          {entry.Reviewer_Comments && (
                            <div className="text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                              {entry.Reviewer_Comments}
                            </div>
                          )}
                          <div className="flex gap-1 pt-2 border-t">
                            <Button
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(entry)}
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendForRework(entry)}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Approved Column */}
            <div
              onDrop={(e) => handleDrop(e, 'Approved')}
              onDragOver={handleDragOver}
              className="space-y-3"
            >
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-2 border-green-200">
                <div>
                  <h3 className="text-green-800">Approved</h3>
                  <p className="text-xs text-green-600">{groupByStage('Approved').length} entries</p>
                </div>
              </div>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {groupByStage('Approved').map(entry => (
                    <Card
                      key={entry.SEO_ID}
                      draggable
                      onDragStart={(e) => handleDragStart(e, entry)}
                      className="border-[#E2E8F0] cursor-move hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(entry.SEO_Category)}
                              <span className="text-xs text-[#7A1C46]">{entry.SEO_Code}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800" size="sm">✓</Badge>
                          </div>
                          <h4 className="text-sm line-clamp-2">{entry.Link_Name}</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge className="bg-blue-100 text-blue-800" size="sm">
                              DA: {entry.DA_Score}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{entry.Asset_Type}</Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            <div>✅ Approved</div>
                            <div>Posted: {new Date(entry.Posted_On).toLocaleDateString()}</div>
                          </div>
                          {entry.Posted_URL && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(entry.Posted_URL, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Post
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Rejected Column */}
            <div
              onDrop={(e) => handleDrop(e, 'Rejected')}
              onDragOver={handleDragOver}
              className="space-y-3"
            >
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-2 border-red-200">
                <div>
                  <h3 className="text-red-800">Rejected</h3>
                  <p className="text-xs text-red-600">{groupByStage('Rejected').length} entries</p>
                </div>
              </div>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {groupByStage('Rejected').map(entry => (
                    <Card
                      key={entry.SEO_ID}
                      draggable
                      onDragStart={(e) => handleDragStart(e, entry)}
                      className="border-[#E2E8F0] cursor-move hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(entry.SEO_Category)}
                              <span className="text-xs text-[#7A1C46]">{entry.SEO_Code}</span>
                            </div>
                            <Badge className="bg-red-100 text-red-800" size="sm">✗</Badge>
                          </div>
                          <h4 className="text-sm line-clamp-2">{entry.Link_Name}</h4>
                          <div className="flex flex-wrap gap-1">
                            <Badge className={getQCStatusColor(entry.QC_Status)} size="sm">
                              {entry.QC_Status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">DA: {entry.DA_Score}</Badge>
                          </div>
                          {entry.Reviewer_Comments && (
                            <div className="text-xs bg-red-50 p-2 rounded border border-red-200">
                              <strong>Reason:</strong> {entry.Reviewer_Comments}
                            </div>
                          )}
                          <div className="flex gap-1 pt-2 border-t">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleSendForRework(entry)}
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Retry
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle>📋 SEO Submission Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SEO Code</TableHead>
                      <TableHead>Link Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Asset Type</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>DA Score</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>QC Status</TableHead>
                      <TableHead>Posted URL</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.map(entry => (
                      <TableRow key={entry.SEO_ID}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(entry.SEO_Category)}
                            <span className="text-xs">{entry.SEO_Code}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm max-w-xs truncate">{entry.Link_Name}</div>
                            <div className="text-xs text-gray-500">{entry.Anchor_Text}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{entry.SEO_Category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{entry.Asset_Type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>{entry.Service}</div>
                            <div className="text-gray-500">{entry.Sub_Service}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              entry.DA_Score >= 70
                                ? 'bg-green-100 text-green-800'
                                : entry.DA_Score >= 50
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {entry.DA_Score}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStageColor(entry.Milestone_Stage)}>
                            {entry.Milestone_Stage}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={getQCStatusColor(entry.QC_Status)}>
                              {entry.QC_Status}
                            </Badge>
                            {entry.QC_Checked && (
                              <div className="text-xs text-gray-600">Score: {entry.QC_Score}/10</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {entry.Posted_URL ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(entry.Posted_URL, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenQC(entry)}
                              title="QC Evaluation"
                            >
                              <ClipboardCheck className="w-3 h-3" />
                            </Button>
                            {entry.Milestone_Stage === 'Posting' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkReviewed(entry)}
                                title="Mark as Reviewed"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            {entry.Milestone_Stage === 'InReview' && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApprove(entry)}
                                  title="Approve"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSendForRework(entry)}
                                  title="Send for Rework"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredEntries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No SEO entries found matching your filters
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weekly Summary */}
        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Summary by Category */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle>📊 Weekly Summary by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(weeklySummary).map(([category, data]) => {
                    const progress = (data.actual / data.target) * 100;
                    const isAtRisk = progress < 80;
                    
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category)}
                            <span className="text-sm">{category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {data.actual} / {data.target}
                            </Badge>
                            {isAtRisk ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress
                            value={progress}
                            className={`h-2 ${isAtRisk ? '[&>div]:bg-red-600' : '[&>div]:bg-green-600'}`}
                          />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>This Week: {data.actual}</span>
                            <span className={isAtRisk ? 'text-red-600' : 'text-green-600'}>
                              {progress.toFixed(0)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Cumulative: {data.cumulative}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle>🎯 Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl text-[#7A1C46]">
                        {seoEntries.reduce((sum, e) => sum + e.Actual_This_Week, 0)}
                      </div>
                      <div className="text-xs text-gray-600">Total This Week</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl text-[#7A1C46]">
                        {seoEntries.reduce((sum, e) => sum + e.Cumulative_Actual, 0)}
                      </div>
                      <div className="text-xs text-gray-600">Total Cumulative</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-2xl text-[#7A1C46]">
                        {groupByStage('Approved').length}
                      </div>
                      <div className="text-xs text-gray-600">Approved</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-2xl text-[#7A1C46]">
                        {groupByStage('InReview').length}
                      </div>
                      <div className="text-xs text-gray-600">In Review</div>
                    </div>
                  </div>

                  {/* Effort Tracking */}
                  <div className="border-t pt-4 space-y-3">
                    <h4 className="text-sm">Daily Effort Tracking</h4>
                    {SEO_CATEGORIES.slice(0, 5).map(category => {
                      const categoryEntries = seoEntries.filter(e => e.SEO_Category === category);
                      const totalEffort = categoryEntries.reduce((sum, e) => sum + e.Effort_Target_Per_Day, 0);
                      const actualToday = Math.floor(totalEffort * 0.85); // Mock: 85% of target
                      const progress = (actualToday / totalEffort) * 100;
                      const isAtRisk = progress < 80;
                      
                      return (
                        <div key={category} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{category}</span>
                            <span className={isAtRisk ? 'text-red-600' : 'text-green-600'}>
                              {actualToday} / {totalEffort} today
                            </span>
                          </div>
                          <Progress
                            value={progress}
                            className={`h-1 ${isAtRisk ? '[&>div]:bg-red-600' : '[&>div]:bg-green-600'}`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Alerts */}
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <AlertDescription className="text-xs">
                      <strong>At Risk:</strong> 2 categories below 80% daily target threshold
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* QC Summary */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle>✅ QC Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xl text-green-700">
                        {seoEntries.filter(e => e.QC_Status === 'Pass').length}
                      </div>
                      <div className="text-xs text-gray-600">Pass</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-xl text-orange-700">
                        {seoEntries.filter(e => e.QC_Status === 'Rework').length}
                      </div>
                      <div className="text-xs text-gray-600">Rework</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-xl text-red-700">
                        {seoEntries.filter(e => e.QC_Status === 'Fail').length}
                      </div>
                      <div className="text-xs text-gray-600">Fail</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xl text-gray-700">
                        {seoEntries.filter(e => e.QC_Status === 'Pending').length}
                      </div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <h4 className="text-sm">Average QC Scores by Category</h4>
                    {Object.keys(weeklySummary).map(category => {
                      const categoryEntries = seoEntries.filter(e => e.SEO_Category === category && e.QC_Checked);
                      if (categoryEntries.length === 0) return null;
                      
                      const avgScore = categoryEntries.reduce((sum, e) => sum + e.QC_Score, 0) / categoryEntries.length;
                      
                      return (
                        <div key={category} className="flex justify-between items-center text-xs">
                          <span>{category}</span>
                          <Badge
                            className={
                              avgScore >= 8
                                ? 'bg-green-100 text-green-800'
                                : avgScore >= 6
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            {avgScore.toFixed(1)}/10
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle>🏆 Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['John Smith', 'Sarah Johnson', 'Mike Chen'].map((name, idx) => {
                    const userEntries = seoEntries.filter(e => e.Posted_By_Name === name);
                    const totalSubmissions = userEntries.reduce((sum, e) => sum + e.Actual_This_Week, 0);
                    const avgQC = userEntries.filter(e => e.QC_Checked).length > 0
                      ? userEntries.filter(e => e.QC_Checked).reduce((sum, e) => sum + e.QC_Score, 0) / userEntries.filter(e => e.QC_Checked).length
                      : 0;
                    
                    return (
                      <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                            idx === 1 ? 'bg-gray-200 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {idx + 1}
                          </div>
                          <div>
                            <div className="text-sm">{name}</div>
                            <div className="text-xs text-gray-600">
                              {totalSubmissions} submissions
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-[#7A1C46] text-white">
                          QC: {avgQC.toFixed(1)}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Entry Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>➕ Add New SEO Entry</DialogTitle>
            <DialogDescription>
              Create a new SEO submission entry with all required details
            </DialogDescription>
          </DialogHeader>
          <AddSEOEntryForm onClose={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* QC Evaluation Dialog */}
      <Dialog open={isQCDialogOpen} onOpenChange={setIsQCDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>🧮 SEO QC Evaluation</DialogTitle>
            <DialogDescription>
              Evaluate the quality of this SEO submission
            </DialogDescription>
          </DialogHeader>
          {selectedEntry && (
            <QCEvaluationForm
              entry={selectedEntry}
              onSubmit={handleQCSubmit}
              onClose={() => setIsQCDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Add SEO Entry Form Component
function AddSEOEntryForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    seoCategory: 'Classified',
    assetType: 'Article',
    linkName: '',
    anchorText: '',
    title: '',
    description: '',
    keywords: '',
    industry: 'Technology',
    service: 'Cloud Migration',
    subService: '',
    targetURL: '',
    postedURL: '',
    daScore: 50,
    targetCount: 100,
    effortPerDay: 20,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('SEO entry added successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>SEO Category *</Label>
          <Select value={formData.seoCategory} onValueChange={(v) => setFormData({ ...formData, seoCategory: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SEO_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Asset Type *</Label>
          <Select value={formData.assetType} onValueChange={(v) => setFormData({ ...formData, assetType: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ASSET_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Link Name *</Label>
        <Input
          value={formData.linkName}
          onChange={(e) => setFormData({ ...formData, linkName: e.target.value })}
          placeholder="e.g., Cloud Migration Services"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Anchor Text *</Label>
          <Input
            value={formData.anchorText}
            onChange={(e) => setFormData({ ...formData, anchorText: e.target.value })}
            placeholder="e.g., enterprise cloud migration"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>DA Score *</Label>
          <Input
            type="number"
            value={formData.daScore}
            onChange={(e) => setFormData({ ...formData, daScore: parseInt(e.target.value) })}
            min={1}
            max={100}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Title *</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="SEO-optimized title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Description *</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description for the submission"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Keywords *</Label>
        <Input
          value={formData.keywords}
          onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
          placeholder="keyword1, keyword2, keyword3"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Industry *</Label>
          <Select value={formData.industry} onValueChange={(v) => setFormData({ ...formData, industry: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Service *</Label>
          <Input
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Sub-Service</Label>
          <Input
            value={formData.subService}
            onChange={(e) => setFormData({ ...formData, subService: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Target URL *</Label>
          <Input
            value={formData.targetURL}
            onChange={(e) => setFormData({ ...formData, targetURL: e.target.value })}
            placeholder="https://example.com/service"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Posted URL</Label>
          <Input
            value={formData.postedURL}
            onChange={(e) => setFormData({ ...formData, postedURL: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Target Count *</Label>
          <Input
            type="number"
            value={formData.targetCount}
            onChange={(e) => setFormData({ ...formData, targetCount: parseInt(e.target.value) })}
            min={1}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Effort/Day *</Label>
          <Input
            type="number"
            value={formData.effortPerDay}
            onChange={(e) => setFormData({ ...formData, effortPerDay: parseInt(e.target.value) })}
            min={1}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Start Date *</Label>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>End Date *</Label>
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Add Entry
        </Button>
      </div>
    </form>
  );
}

// QC Evaluation Form Component with Side-by-Side Comparison
function QCEvaluationForm({ 
  entry, 
  onSubmit, 
  onClose 
}: { 
  entry: SEOEntry; 
  onSubmit: (score: number, comments: string) => void;
  onClose: () => void;
}) {
  // Auto-fetch expected values from Keyword/Service Master
  const expectedData = {
    title: 'Complete Guide to Enterprise Cloud Migration - Best Practices 2024',
    description: 'Discover proven strategies for migrating your enterprise infrastructure to the cloud. Learn about planning, execution, and optimization techniques from industry experts.',
    keywords: ['cloud migration', 'enterprise cloud', 'infrastructure migration', 'AWS migration', 'cloud strategy'],
    url: 'https://example.com/services/cloud-migration',
    anchorText: 'enterprise cloud migration',
    metaTags: 'Title: 58 chars | Description: 155 chars | Keywords: 5 primary'
  };

  // Auto-fetch submitted values from SEO_Posting_Tracker
  const submittedData = {
    title: entry.Title,
    description: entry.Description,
    keywords: entry.Keywords.split(', '),
    url: entry.Posted_URL || 'Not yet posted',
    anchorText: entry.Anchor_Text,
    metaTags: `Title: ${entry.Title.length} chars | Description: ${entry.Description.length} chars`
  };

  const [qcScores, setQcScores] = useState({
    grammarQuality: 9,
    keywordPlacement: 8,
    titleRelevance: 7,
    metaTagAccuracy: 8,
    anchorTextAlignment: 9,
    daRelevance: entry.DA_Score >= 60 ? 9 : 6,
    readabilityScore: 8,
    languageScore: 9
  });

  const [comments, setComments] = useState(entry.Reviewer_Comments || '');
  const [isLocked, setIsLocked] = useState(entry.Approval_Status === 'Approved');

  // Auto-calculate overall QC score
  const overallQCScore = Math.round(
    (qcScores.grammarQuality +
     qcScores.keywordPlacement +
     qcScores.titleRelevance +
     qcScores.metaTagAccuracy +
     qcScores.anchorTextAlignment +
     qcScores.daRelevance +
     qcScores.readabilityScore +
     qcScores.languageScore) / 8 * 10
  ) / 10;

  const passThreshold = 8.0;

  const updateScore = (field: keyof typeof qcScores, value: number) => {
    if (!isLocked) {
      setQcScores({ ...qcScores, [field]: value });
    }
  };

  const handleSubmit = () => {
    onSubmit(Math.round(overallQCScore), comments);
  };

  const handleApprove = () => {
    setIsLocked(true);
    onSubmit(Math.round(overallQCScore), comments);
    toast.success('Entry approved and locked!');
  };

  const handleSendForRework = () => {
    onSubmit(Math.round(overallQCScore), comments + '\n[REWORK REQUIRED]');
    toast.warning('Entry sent for rework');
  };

  const getComparisonMatch = (expected: string, submitted: string) => {
    const similarity = expected.toLowerCase() === submitted.toLowerCase() ? 100 :
                      expected.toLowerCase().includes(submitted.toLowerCase()) ? 75 :
                      submitted.toLowerCase().includes(expected.toLowerCase()) ? 75 : 50;
    return similarity;
  };

  return (
    <div className="space-y-4">
      {/* Entry Info Header */}
      <div className="p-4 bg-gradient-to-r from-[#7A1C46] to-[#5A1434] text-white rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs opacity-80">SEO Code</div>
            <div>{entry.SEO_Code}</div>
          </div>
          <div>
            <div className="text-xs opacity-80">Category</div>
            <div>{entry.SEO_Category} - {entry.Asset_Type}</div>
          </div>
          <div>
            <div className="text-xs opacity-80">Service</div>
            <div>{entry.Service} → {entry.Sub_Service}</div>
          </div>
          <div>
            <div className="text-xs opacity-80">DA Score</div>
            <div>{entry.DA_Score}</div>
          </div>
        </div>
      </div>

      {/* QC Metrics Summary */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-[#7A1C46]">8</div>
              <div className="text-xs text-gray-600">QC Criteria</div>
            </div>
            <div>
              <div className="text-2xl text-blue-600">{overallQCScore.toFixed(1)}</div>
              <div className="text-xs text-gray-600">Overall Score</div>
            </div>
            <div>
              <Badge className={
                overallQCScore >= passThreshold 
                  ? 'bg-green-100 text-green-800' 
                  : overallQCScore >= passThreshold - 2 
                  ? 'bg-orange-100 text-orange-800' 
                  : 'bg-red-100 text-red-800'
              }>
                {overallQCScore >= passThreshold ? 'Pass' : overallQCScore >= passThreshold - 2 ? 'Rework' : 'Fail'}
              </Badge>
              <div className="text-xs text-gray-600 mt-1">
                Threshold: {passThreshold}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side-by-Side Comparison View */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-sm">📊 Expected vs Submitted Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Title Comparison */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div className="space-y-2">
                <Label className="text-xs text-green-700">✓ Expected Title</Label>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                  {expectedData.title}
                </div>
                <div className="text-xs text-gray-500">{expectedData.title.length} characters</div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-blue-700">📝 Submitted Title</Label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                  {submittedData.title}
                </div>
                <div className="text-xs text-gray-500">{submittedData.title.length} characters</div>
              </div>
            </div>

            {/* Description Comparison */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div className="space-y-2">
                <Label className="text-xs text-green-700">✓ Expected Description</Label>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm min-h-[80px]">
                  {expectedData.description}
                </div>
                <div className="text-xs text-gray-500">{expectedData.description.length} characters</div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-blue-700">📝 Submitted Description</Label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm min-h-[80px]">
                  {submittedData.description}
                </div>
                <div className="text-xs text-gray-500">{submittedData.description.length} characters</div>
              </div>
            </div>

            {/* Keywords Comparison */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div className="space-y-2">
                <Label className="text-xs text-green-700">✓ Expected Keywords</Label>
                <div className="flex flex-wrap gap-1">
                  {expectedData.keywords.map((kw, idx) => (
                    <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-blue-700">📝 Submitted Keywords</Label>
                <div className="flex flex-wrap gap-1">
                  {submittedData.keywords.map((kw, idx) => (
                    <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* URL & Anchor Text */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-green-700">✓ Expected Target URL</Label>
                  <div className="p-2 bg-green-50 border border-green-200 rounded text-xs flex items-center gap-2">
                    <Link2 className="w-3 h-3" />
                    {expectedData.url}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-green-700">✓ Expected Anchor Text</Label>
                  <div className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                    {expectedData.anchorText}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-blue-700">📝 Posted URL</Label>
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs flex items-center gap-2">
                    <ExternalLink className="w-3 h-3" />
                    {submittedData.url !== 'Not yet posted' ? (
                      <a href={submittedData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                        {submittedData.url}
                      </a>
                    ) : (
                      <span className="text-gray-400">{submittedData.url}</span>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-blue-700">📝 Submitted Anchor Text</Label>
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                    {submittedData.anchorText}
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Tags */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-green-700">✓ Expected Meta Tags</Label>
                <div className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                  {expectedData.metaTags}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-blue-700">📝 Submitted Meta Tags</Label>
                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                  {submittedData.metaTags}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QC Checklist Scoring */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle className="text-sm">🎯 QC Checklist Scoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Grammar Quality */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Grammar Quality</Label>
                <Badge variant="outline" className="text-xs">{qcScores.grammarQuality}/10</Badge>
              </div>
              <Slider
                value={[qcScores.grammarQuality]}
                onValueChange={(value) => updateScore('grammarQuality', value[0])}
                max={10}
                step={1}
                disabled={isLocked}
                className="w-full"
              />
            </div>

            {/* Keyword Placement */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Keyword Placement</Label>
                <Badge variant="outline" className="text-xs">{qcScores.keywordPlacement}/10</Badge>
              </div>
              <Slider
                value={[qcScores.keywordPlacement]}
                onValueChange={(value) => updateScore('keywordPlacement', value[0])}
                max={10}
                step={1}
                disabled={isLocked}
                className="w-full"
              />
            </div>

            {/* Title Relevance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Title Relevance</Label>
                <Badge variant="outline" className="text-xs">{qcScores.titleRelevance}/10</Badge>
              </div>
              <Slider
                value={[qcScores.titleRelevance]}
                onValueChange={(value) => updateScore('titleRelevance', value[0])}
                max={10}
                step={1}
                disabled={isLocked}
                className="w-full"
              />
            </div>

            {/* Meta Tag Accuracy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Meta Tag Accuracy</Label>
                <Badge variant="outline" className="text-xs">{qcScores.metaTagAccuracy}/10</Badge>
              </div>
              <Slider
                value={[qcScores.metaTagAccuracy]}
                onValueChange={(value) => updateScore('metaTagAccuracy', value[0])}
                max={10}
                step={1}
                disabled={isLocked}
                className="w-full"
              />
            </div>

            {/* Anchor Text Alignment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Anchor Text Alignment</Label>
                <Badge variant="outline" className="text-xs">{qcScores.anchorTextAlignment}/10</Badge>
              </div>
              <Slider
                value={[qcScores.anchorTextAlignment]}
                onValueChange={(value) => updateScore('anchorTextAlignment', value[0])}
                max={10}
                step={1}
                disabled={isLocked}
                className="w-full"
              />
            </div>

            {/* DA Relevance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">DA Relevance (Target DA: 60+)</Label>
                <Badge variant="outline" className="text-xs">{qcScores.daRelevance}/10</Badge>
              </div>
              <Slider
                value={[qcScores.daRelevance]}
                onValueChange={(value) => updateScore('daRelevance', value[0])}
                max={10}
                step={1}
                disabled={isLocked}
                className="w-full"
              />
            </div>

            {/* Readability Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Readability Score</Label>
                <Badge variant="outline" className="text-xs">{qcScores.readabilityScore}/10</Badge>
              </div>
              <Slider
                value={[qcScores.readabilityScore]}
                onValueChange={(value) => updateScore('readabilityScore', value[0])}
                max={10}
                step={1}
                disabled={isLocked}
                className="w-full"
              />
            </div>

            {/* Language Score */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Language Score</Label>
                <Badge variant="outline" className="text-xs">{qcScores.languageScore}/10</Badge>
              </div>
              <Slider
                value={[qcScores.languageScore]}
                onValueChange={(value) => updateScore('languageScore', value[0])}
                max={10}
                step={1}
                disabled={isLocked}
                className="w-full"
              />
            </div>

            {/* Overall Score Display */}
            <div className="p-4 bg-gradient-to-r from-[#7A1C46]/10 to-[#5A1434]/10 rounded-lg border-2 border-[#7A1C46]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-600">Overall QC Score (Auto-calculated)</div>
                  <div className="text-2xl text-[#7A1C46] mt-1">{overallQCScore.toFixed(1)}/10</div>
                </div>
                <Badge className={
                  overallQCScore >= passThreshold 
                    ? 'bg-green-600 text-white' 
                    : overallQCScore >= passThreshold - 2 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-red-600 text-white'
                }>
                  {overallQCScore >= passThreshold ? '✓ Pass' : overallQCScore >= passThreshold - 2 ? '⚠ Rework' : '✗ Fail'}
                </Badge>
              </div>
              <Progress 
                value={(overallQCScore / 10) * 100} 
                className="h-2 mt-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QC Comments */}
      <div className="space-y-2">
        <Label>QC Comments & Improvement Notes</Label>
        <Textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add improvement notes, mismatches, or specific feedback..."
          rows={3}
          disabled={isLocked}
        />
      </div>

      {/* Gold Reference Link */}
      {entry.Posted_URL && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(entry.Posted_URL, '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          🔗 Open Actual Asset / Posted URL
        </Button>
      )}

      {/* Threshold Alert */}
      {overallQCScore < passThreshold && !isLocked && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <AlertDescription className="text-xs">
            <strong>Below Threshold:</strong> Score is {overallQCScore.toFixed(1)}/10 (Threshold: {passThreshold}). 
            Entry will remain in Posting stage for rework.
          </AlertDescription>
        </Alert>
      )}

      {overallQCScore >= passThreshold && !isLocked && (
        <Alert className="border-green-200 bg-green-50">
          <Check className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-xs">
            <strong>Pass Threshold Met!</strong> Entry can be approved and will auto-move to In Review stage.
          </AlertDescription>
        </Alert>
      )}

      {isLocked && (
        <Alert className="border-blue-200 bg-blue-50">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-xs">
            <strong>Locked:</strong> This entry has been approved. Expected/Submitted fields are locked. 
            Only comments are editable.
          </AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        
        {!isLocked && (
          <>
            <Button 
              variant="outline" 
              onClick={handleSubmit} 
              className="flex-1"
            >
              <ClipboardCheck className="w-4 h-4 mr-2" />
              💾 Save QC
            </Button>
            
            {overallQCScore >= passThreshold && (
              <Button 
                onClick={handleApprove} 
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                ✅ Approve & Move Next
              </Button>
            )}
            
            {overallQCScore < passThreshold && (
              <Button 
                onClick={handleSendForRework} 
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                🚫 Send for Rework
              </Button>
            )}
          </>
        )}

        {isLocked && (
          <Button 
            onClick={() => {
              toast.info('Comments updated');
              onClose();
            }} 
            className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]"
          >
            Update Comments Only
          </Button>
        )}
      </div>
    </div>
  );
}
