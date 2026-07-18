import { useState } from 'react';
import { Plus, ExternalLink, Search, RefreshCw, Link2, Network, FileDown, Wand2, Camera, Eye, Edit, Trash2, TrendingUp, BarChart3, X, Save, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';
import CompetitorDetailsView from './CompetitorDetailsView';
import { toast } from 'sonner@2.0.3';

interface Competitor {
  Competitor_ID: string;
  Competitor_Code: string;
  Competitor_Name: string;
  Main_URL: string;
  Root_Domain: string;
  Countries: string[];
  Industry_IDs: string[];
  Industry_Names: string[];
  Mapped_Service_IDs: string[];
  Mapped_Service_Names: string[];
  Domain_Authority: number;
  Backlinks_Total: number;
  Referring_Domains_Total: number;
  Referring_IPs_Total: number;
  Follow_Links: number;
  NoFollow_Links: number;
  Text_Links: number;
  Image_Links: number;
  Form_Links: number;
  Frame_Links: number;
  Estimated_Traffic_Month: number;
  Status: string;
  Retain_In_List: boolean;
  Last_Reviewed: string;
  Last_Updated: string;
  Updated_By: string;
  Updated_By_Name: string;
  Notes: string;
}

interface CompetitorSubservice {
  Subservice_ID: string;
  Competitor_ID: string;
  Competitor_Name: string;
  Subservice_Name: string;
  Subservice_URL: string;
  Countries: string[];
  Industry_IDs: string[];
  Industry_Names: string[];
  Mapped_Service_IDs: string[];
  Mapped_Service_Names: string[];
  DA_Snapshot: number;
  Backlinks_Total: number;
  Referring_Domains_Total: number;
  Referring_IPs_Total: number;
  Follow_Links: number;
  NoFollow_Links: number;
  Text_Links: number;
  Image_Links: number;
  Form_Links: number;
  Frame_Links: number;
  Estimated_Traffic_Month: number;
  Status: string;
  Last_Reviewed: string;
  Last_Updated: string;
  Updated_By: string;
  Updated_By_Name: string;
  Notes: string;
}

interface CompetitorServiceMap {
  Map_ID: string;
  Competitor_ID: string;
  Competitor_Name: string;
  Service_ID: string;
  Service_Name: string;
  Confidence_Score: number;
  Evidence_URL: string;
  Mapped_By: string;
  Mapped_By_Name: string;
  Mapped_On: string;
  Notes: string;
}

interface CompetitorMetricsHistory {
  History_ID: string;
  Competitor_ID: string;
  Competitor_Name: string;
  Subservice_ID: string | null;
  Subservice_Name: string | null;
  Capture_Date: string;
  Domain_Authority: number;
  Backlinks_Total: number;
  Referring_Domains_Total: number;
  Referring_IPs_Total: number;
  Follow_Links: number;
  NoFollow_Links: number;
  Text_Links: number;
  Image_Links: number;
  Form_Links: number;
  Frame_Links: number;
  Estimated_Traffic_Month: number;
  Source: string;
  Captured_By: string;
  Captured_By_Name: string;
}

export default function CompetitorHub() {
  const [activeTab, setActiveTab] = useState('Competitors');
  const [filters, setFilters] = useState({
    countries: 'all',
    industry: 'all',
    service: 'all',
    status: 'all',
    daMin: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [selectedSubservice, setSelectedSubservice] = useState<string | null>(null);
  const [showCompetitorPanel, setShowCompetitorPanel] = useState(false);
  const [showSubserviceDialog, setShowSubserviceDialog] = useState(false);
  const [showMappingDialog, setShowMappingDialog] = useState(false);

  const competitorsData: Competitor[] = [
    {
      Competitor_ID: 'COMP001',
      Competitor_Code: 'COMP-000123',
      Competitor_Name: 'CloudTech Solutions',
      Main_URL: 'https://cloudtech.example.com',
      Root_Domain: 'cloudtech.example.com',
      Countries: ['US', 'GB', 'AU'],
      Industry_IDs: ['IND001', 'IND002'],
      Industry_Names: ['Technology', 'SaaS'],
      Mapped_Service_IDs: ['SRV001', 'SRV002'],
      Mapped_Service_Names: ['SEO Services', 'Content Marketing'],
      Domain_Authority: 78,
      Backlinks_Total: 1450000,
      Referring_Domains_Total: 28500,
      Referring_IPs_Total: 24300,
      Follow_Links: 985000,
      NoFollow_Links: 465000,
      Text_Links: 1320000,
      Image_Links: 125000,
      Form_Links: 3200,
      Frame_Links: 1800,
      Estimated_Traffic_Month: 850000,
      Status: 'Active',
      Retain_In_List: true,
      Last_Reviewed: '2024-10-28',
      Last_Updated: '2024-10-30',
      Updated_By: 'USR002',
      Updated_By_Name: 'Bob Wilson',
      Notes: 'Primary competitor in enterprise cloud space. Strong content strategy.',
    },
    {
      Competitor_ID: 'COMP002',
      Competitor_Code: 'COMP-000124',
      Competitor_Name: 'Digital Transform Inc',
      Main_URL: 'https://digitaltransform.example.com',
      Root_Domain: 'digitaltransform.example.com',
      Countries: ['US', 'IN'],
      Industry_IDs: ['IND001', 'IND006'],
      Industry_Names: ['Technology', 'FinTech'],
      Mapped_Service_IDs: ['SRV001'],
      Mapped_Service_Names: ['SEO Services'],
      Domain_Authority: 65,
      Backlinks_Total: 820000,
      Referring_Domains_Total: 15200,
      Referring_IPs_Total: 13100,
      Follow_Links: 580000,
      NoFollow_Links: 240000,
      Text_Links: 750000,
      Image_Links: 68000,
      Form_Links: 1500,
      Frame_Links: 500,
      Estimated_Traffic_Month: 420000,
      Status: 'Active',
      Retain_In_List: true,
      Last_Reviewed: '2024-10-25',
      Last_Updated: '2024-10-28',
      Updated_By: 'USR001',
      Updated_By_Name: 'Alice Johnson',
      Notes: 'Growing competitor with strong FinTech focus.',
    },
    {
      Competitor_ID: 'COMP003',
      Competitor_Code: 'COMP-000125',
      Competitor_Name: 'Enterprise Cloud Partners',
      Main_URL: 'https://ecp.example.com',
      Root_Domain: 'ecp.example.com',
      Countries: ['US', 'EU'],
      Industry_IDs: ['IND001'],
      Industry_Names: ['Technology'],
      Mapped_Service_IDs: ['SRV001', 'SRV005'],
      Mapped_Service_Names: ['SEO Services', 'E-commerce Marketing'],
      Domain_Authority: 72,
      Backlinks_Total: 1120000,
      Referring_Domains_Total: 19800,
      Referring_IPs_Total: 17200,
      Follow_Links: 720000,
      NoFollow_Links: 400000,
      Text_Links: 980000,
      Image_Links: 135000,
      Form_Links: 3800,
      Frame_Links: 1200,
      Estimated_Traffic_Month: 620000,
      Status: 'Monitor',
      Retain_In_List: true,
      Last_Reviewed: '2024-10-20',
      Last_Updated: '2024-10-25',
      Updated_By: 'USR002',
      Updated_By_Name: 'Bob Wilson',
      Notes: 'Mid-tier competitor. Watch for new service launches.',
    },
    {
      Competitor_ID: 'COMP004',
      Competitor_Code: 'COMP-000126',
      Competitor_Name: 'SaaS Growth Lab',
      Main_URL: 'https://saasgrowth.example.com',
      Root_Domain: 'saasgrowth.example.com',
      Countries: ['US'],
      Industry_IDs: ['IND002'],
      Industry_Names: ['SaaS'],
      Mapped_Service_IDs: ['SRV002', 'SRV003'],
      Mapped_Service_Names: ['Content Marketing', 'Social Media Marketing'],
      Domain_Authority: 58,
      Backlinks_Total: 380000,
      Referring_Domains_Total: 8500,
      Referring_IPs_Total: 7200,
      Follow_Links: 250000,
      NoFollow_Links: 130000,
      Text_Links: 340000,
      Image_Links: 38000,
      Form_Links: 1200,
      Frame_Links: 800,
      Estimated_Traffic_Month: 180000,
      Status: 'Active',
      Retain_In_List: true,
      Last_Reviewed: '2024-10-22',
      Last_Updated: '2024-10-27',
      Updated_By: 'USR003',
      Updated_By_Name: 'Carol Smith',
      Notes: 'SaaS-focused competitor with strong social presence.',
    },
  ];

  const subservicesData: CompetitorSubservice[] = [
    {
      Subservice_ID: 'CSUB001',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Subservice_Name: 'Enterprise SEO Services',
      Subservice_URL: 'https://cloudtech.example.com/seo',
      Countries: ['US', 'GB'],
      Industry_IDs: ['IND001'],
      Industry_Names: ['Technology'],
      Mapped_Service_IDs: ['SRV001'],
      Mapped_Service_Names: ['SEO Services'],
      DA_Snapshot: 76,
      Backlinks_Total: 285000,
      Referring_Domains_Total: 5800,
      Referring_IPs_Total: 4900,
      Follow_Links: 195000,
      NoFollow_Links: 90000,
      Text_Links: 260000,
      Image_Links: 24000,
      Form_Links: 800,
      Frame_Links: 200,
      Estimated_Traffic_Month: 125000,
      Status: 'Active',
      Last_Reviewed: '2024-10-28',
      Last_Updated: '2024-10-30',
      Updated_By: 'USR002',
      Updated_By_Name: 'Bob Wilson',
      Notes: 'Strong SEO service page with comprehensive content.',
    },
    {
      Subservice_ID: 'CSUB002',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Subservice_Name: 'Content Strategy',
      Subservice_URL: 'https://cloudtech.example.com/content',
      Countries: ['US', 'AU'],
      Industry_IDs: ['IND002'],
      Industry_Names: ['SaaS'],
      Mapped_Service_IDs: ['SRV002'],
      Mapped_Service_Names: ['Content Marketing'],
      DA_Snapshot: 74,
      Backlinks_Total: 198000,
      Referring_Domains_Total: 4200,
      Referring_IPs_Total: 3600,
      Follow_Links: 145000,
      NoFollow_Links: 53000,
      Text_Links: 180000,
      Image_Links: 17000,
      Form_Links: 900,
      Frame_Links: 100,
      Estimated_Traffic_Month: 89000,
      Status: 'Active',
      Last_Reviewed: '2024-10-26',
      Last_Updated: '2024-10-28',
      Updated_By: 'USR002',
      Updated_By_Name: 'Bob Wilson',
      Notes: 'Content-focused subservice with blog integration.',
    },
    {
      Subservice_ID: 'CSUB003',
      Competitor_ID: 'COMP002',
      Competitor_Name: 'Digital Transform Inc',
      Subservice_Name: 'FinTech SEO',
      Subservice_URL: 'https://digitaltransform.example.com/fintech-seo',
      Countries: ['US', 'IN'],
      Industry_IDs: ['IND006'],
      Industry_Names: ['FinTech'],
      Mapped_Service_IDs: ['SRV001'],
      Mapped_Service_Names: ['SEO Services'],
      DA_Snapshot: 63,
      Backlinks_Total: 142000,
      Referring_Domains_Total: 2850,
      Referring_IPs_Total: 2400,
      Follow_Links: 98000,
      NoFollow_Links: 44000,
      Text_Links: 130000,
      Image_Links: 11500,
      Form_Links: 400,
      Frame_Links: 100,
      Estimated_Traffic_Month: 58000,
      Status: 'Active',
      Last_Reviewed: '2024-10-25',
      Last_Updated: '2024-10-28',
      Updated_By: 'USR001',
      Updated_By_Name: 'Alice Johnson',
      Notes: 'Niche FinTech SEO offering. Monitor for expansion.',
    },
    {
      Subservice_ID: 'CSUB004',
      Competitor_ID: 'COMP004',
      Competitor_Name: 'SaaS Growth Lab',
      Subservice_Name: 'SaaS Content Marketing',
      Subservice_URL: 'https://saasgrowth.example.com/content-marketing',
      Countries: ['US'],
      Industry_IDs: ['IND002'],
      Industry_Names: ['SaaS'],
      Mapped_Service_IDs: ['SRV002'],
      Mapped_Service_Names: ['Content Marketing'],
      DA_Snapshot: 56,
      Backlinks_Total: 95000,
      Referring_Domains_Total: 1980,
      Referring_IPs_Total: 1650,
      Follow_Links: 68000,
      NoFollow_Links: 27000,
      Text_Links: 88000,
      Image_Links: 6800,
      Form_Links: 180,
      Frame_Links: 20,
      Estimated_Traffic_Month: 42000,
      Status: 'Active',
      Last_Reviewed: '2024-10-22',
      Last_Updated: '2024-10-27',
      Updated_By: 'USR003',
      Updated_By_Name: 'Carol Smith',
      Notes: 'SaaS-specific content marketing service.',
    },
  ];

  const serviceMappingData: CompetitorServiceMap[] = [
    {
      Map_ID: 'MAP001',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      Confidence_Score: 95,
      Evidence_URL: 'https://cloudtech.example.com/seo',
      Mapped_By: 'USR002',
      Mapped_By_Name: 'Bob Wilson',
      Mapped_On: '2024-10-15',
      Notes: 'Clear service offering with dedicated page and case studies',
    },
    {
      Map_ID: 'MAP002',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Service_ID: 'SRV002',
      Service_Name: 'Content Marketing',
      Confidence_Score: 88,
      Evidence_URL: 'https://cloudtech.example.com/content',
      Mapped_By: 'USR002',
      Mapped_By_Name: 'Bob Wilson',
      Mapped_On: '2024-10-15',
      Notes: 'Strong content strategy offering, integrated with SEO services',
    },
    {
      Map_ID: 'MAP003',
      Competitor_ID: 'COMP002',
      Competitor_Name: 'Digital Transform Inc',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      Confidence_Score: 92,
      Evidence_URL: 'https://digitaltransform.example.com/services/seo',
      Mapped_By: 'USR001',
      Mapped_By_Name: 'Alice Johnson',
      Mapped_On: '2024-10-18',
      Notes: 'Comprehensive SEO offering with FinTech specialization',
    },
    {
      Map_ID: 'MAP004',
      Competitor_ID: 'COMP004',
      Competitor_Name: 'SaaS Growth Lab',
      Service_ID: 'SRV002',
      Service_Name: 'Content Marketing',
      Confidence_Score: 98,
      Evidence_URL: 'https://saasgrowth.example.com/content-marketing',
      Mapped_By: 'USR003',
      Mapped_By_Name: 'Carol Smith',
      Mapped_On: '2024-10-20',
      Notes: 'Primary offering - SaaS-focused content strategy and execution',
    },
    {
      Map_ID: 'MAP005',
      Competitor_ID: 'COMP004',
      Competitor_Name: 'SaaS Growth Lab',
      Service_ID: 'SRV003',
      Service_Name: 'Social Media Marketing',
      Confidence_Score: 85,
      Evidence_URL: 'https://saasgrowth.example.com/social-media',
      Mapped_By: 'USR003',
      Mapped_By_Name: 'Carol Smith',
      Mapped_On: '2024-10-20',
      Notes: 'Social media services integrated with content marketing',
    },
  ];

  const metricsHistoryData: CompetitorMetricsHistory[] = [
    {
      History_ID: 'HIST001',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Subservice_ID: null,
      Subservice_Name: null,
      Capture_Date: '2024-09-30',
      Domain_Authority: 76,
      Backlinks_Total: 1380000,
      Referring_Domains_Total: 27200,
      Referring_IPs_Total: 23100,
      Follow_Links: 940000,
      NoFollow_Links: 440000,
      Text_Links: 1260000,
      Image_Links: 118000,
      Form_Links: 1500,
      Frame_Links: 1000,
      Estimated_Traffic_Month: 810000,
      Source: 'Ahrefs',
      Captured_By: 'SYS001',
      Captured_By_Name: 'System Auto-Sync',
    },
    {
      History_ID: 'HIST002',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Subservice_ID: null,
      Subservice_Name: null,
      Capture_Date: '2024-10-30',
      Domain_Authority: 78,
      Backlinks_Total: 1450000,
      Referring_Domains_Total: 28500,
      Referring_IPs_Total: 24300,
      Follow_Links: 985000,
      NoFollow_Links: 465000,
      Text_Links: 1320000,
      Image_Links: 125000,
      Form_Links: 3200,
      Frame_Links: 1800,
      Estimated_Traffic_Month: 850000,
      Source: 'Ahrefs',
      Captured_By: 'SYS001',
      Captured_By_Name: 'System Auto-Sync',
    },
    {
      History_ID: 'HIST003',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Subservice_ID: 'CSUB001',
      Subservice_Name: 'Enterprise SEO Services',
      Capture_Date: '2024-10-30',
      Domain_Authority: 76,
      Backlinks_Total: 285000,
      Referring_Domains_Total: 5800,
      Referring_IPs_Total: 4900,
      Follow_Links: 195000,
      NoFollow_Links: 90000,
      Text_Links: 260000,
      Image_Links: 24000,
      Form_Links: 800,
      Frame_Links: 200,
      Estimated_Traffic_Month: 125000,
      Source: 'Semrush',
      Captured_By: 'USR002',
      Captured_By_Name: 'Bob Wilson',
    },
    {
      History_ID: 'HIST004',
      Competitor_ID: 'COMP002',
      Competitor_Name: 'Digital Transform Inc',
      Subservice_ID: null,
      Subservice_Name: null,
      Capture_Date: '2024-10-28',
      Domain_Authority: 65,
      Backlinks_Total: 820000,
      Referring_Domains_Total: 15200,
      Referring_IPs_Total: 13100,
      Follow_Links: 580000,
      NoFollow_Links: 240000,
      Text_Links: 750000,
      Image_Links: 68000,
      Form_Links: 1500,
      Frame_Links: 500,
      Estimated_Traffic_Month: 420000,
      Source: 'Ahrefs',
      Captured_By: 'SYS001',
      Captured_By_Name: 'System Auto-Sync',
    },
    {
      History_ID: 'HIST005',
      Competitor_ID: 'COMP004',
      Competitor_Name: 'SaaS Growth Lab',
      Subservice_ID: 'CSUB004',
      Subservice_Name: 'SaaS Content Marketing',
      Capture_Date: '2024-10-27',
      Domain_Authority: 56,
      Backlinks_Total: 95000,
      Referring_Domains_Total: 1980,
      Referring_IPs_Total: 1650,
      Follow_Links: 68000,
      NoFollow_Links: 27000,
      Text_Links: 88000,
      Image_Links: 6800,
      Form_Links: 180,
      Frame_Links: 20,
      Estimated_Traffic_Month: 42000,
      Source: 'Manual',
      Captured_By: 'USR003',
      Captured_By_Name: 'Carol Smith',
    },
  ];

  const filteredCompetitors = competitorsData.filter((comp) => {
    if (filters.countries !== 'all' && !comp.Countries.includes(filters.countries)) return false;
    if (filters.industry !== 'all' && !comp.Industry_IDs.includes(filters.industry)) return false;
    if (filters.service !== 'all' && !comp.Mapped_Service_IDs.includes(filters.service)) return false;
    if (filters.status !== 'all' && comp.Status !== filters.status) return false;
    if (filters.daMin && comp.Domain_Authority < parseInt(filters.daMin)) return false;
    if (searchTerm && !comp.Competitor_Name.toLowerCase().includes(searchTerm.toLowerCase()) && !comp.Root_Domain.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const filteredSubservices = selectedCompetitor
    ? subservicesData.filter(sub => sub.Competitor_ID === selectedCompetitor)
    : subservicesData;

  const selectedCompetitorData = competitorsData.find(c => c.Competitor_ID === selectedCompetitor);
  const selectedSubserviceData = subservicesData.find(s => s.Subservice_ID === selectedSubservice);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Monitor': return 'bg-yellow-100 text-yellow-800';
      case 'Ignore': return 'bg-gray-100 text-gray-800';
      case 'Blacklist': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDAColor = (da: number) => {
    if (da >= 70) return 'bg-green-100 text-green-800';
    if (da >= 50) return 'bg-yellow-100 text-yellow-800';
    if (da >= 30) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Competitor Intelligence Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="Competitors">Competitors</TabsTrigger>
              <TabsTrigger value="Details">Competitor Details</TabsTrigger>
              <TabsTrigger value="Subservices">Subservices</TabsTrigger>
              <TabsTrigger value="ServiceMapping">Service Mapping</TabsTrigger>
              <TabsTrigger value="AuditHistory">Audit & History</TabsTrigger>
            </TabsList>

            {/* Competitors Tab */}
            <TabsContent value="Competitors" className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={filters.countries} onValueChange={(value) => setFilters({ ...filters, countries: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="GB">UK</SelectItem>
                      <SelectItem value="EU">EU</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.industry} onValueChange={(value) => setFilters({ ...filters, industry: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="IND001">Technology</SelectItem>
                      <SelectItem value="IND002">SaaS</SelectItem>
                      <SelectItem value="IND004">Healthcare</SelectItem>
                      <SelectItem value="IND006">FinTech</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.service} onValueChange={(value) => setFilters({ ...filters, service: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="SRV001">SEO Services</SelectItem>
                      <SelectItem value="SRV002">Content Marketing</SelectItem>
                      <SelectItem value="SRV003">Social Media</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Monitor">Monitor</SelectItem>
                      <SelectItem value="Ignore">Ignore</SelectItem>
                      <SelectItem value="Blacklist">Blacklist</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="Min DA"
                    value={filters.daMin}
                    onChange={(e) => setFilters({ ...filters, daMin: e.target.value })}
                    className="w-24"
                  />

                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search competitors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Metrics
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link2 className="w-4 h-4 mr-2" />
                    Map to Services
                  </Button>
                  <Button variant="outline" size="sm">
                    <Network className="w-4 h-4 mr-2" />
                    View Subservices
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileDown className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#7A1C46] hover:bg-[#5A1434]"
                    onClick={() => setShowCompetitorPanel(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Competitor
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Competitor</TableHead>
                        <TableHead>Countries</TableHead>
                        <TableHead>Industries</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead>DA</TableHead>
                        <TableHead>Backlinks</TableHead>
                        <TableHead>Ref Domains</TableHead>
                        <TableHead>Traffic/Mo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Reviewed</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompetitors.map((comp) => (
                        <TableRow key={comp.Competitor_ID}>
                          <TableCell>
                            <Badge variant="outline" className="text-xs font-mono">{comp.Competitor_Code}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="min-w-[180px]">
                              <div className="text-sm">{comp.Competitor_Name}</div>
                              <a 
                                href={comp.Main_URL} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                              >
                                {comp.Root_Domain}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {comp.Countries.slice(0, 2).map(country => (
                                <Badge key={country} variant="outline" className="text-xs">{country}</Badge>
                              ))}
                              {comp.Countries.length > 2 && (
                                <Badge variant="outline" className="text-xs">+{comp.Countries.length - 2}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-[150px]">
                              {comp.Industry_Names.slice(0, 2).map((ind, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{ind}</Badge>
                              ))}
                              {comp.Industry_Names.length > 2 && (
                                <Badge variant="outline" className="text-xs">+{comp.Industry_Names.length - 2}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-[150px]">
                              {comp.Mapped_Service_Names.slice(0, 1).map((srv, idx) => (
                                <Badge key={idx} className="bg-purple-100 text-purple-800 text-xs">{srv}</Badge>
                              ))}
                              {comp.Mapped_Service_Names.length > 1 && (
                                <Badge className="bg-purple-100 text-purple-800 text-xs">+{comp.Mapped_Service_Names.length - 1}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getDAColor(comp.Domain_Authority)}>
                              {comp.Domain_Authority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{formatNumber(comp.Backlinks_Total)}</TableCell>
                          <TableCell className="text-sm">{formatNumber(comp.Referring_Domains_Total)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">{formatNumber(comp.Estimated_Traffic_Month)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(comp.Status)}>{comp.Status}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{comp.Last_Reviewed}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedCompetitor(comp.Competitor_ID);
                                  setActiveTab('Details');
                                }}
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Competitor Details Tab */}
            <TabsContent value="Details" className="space-y-4">
              {selectedCompetitorData ? (
                <CompetitorDetailsView competitor={selectedCompetitorData} />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Select a competitor from the Competitors tab to view details
                </div>
              )}
            </TabsContent>

            {/* Subservices Tab */}
            <TabsContent value="Subservices" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Subservices Table */}
                <Card className="border-[#E2E8F0]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Competitor Subservices</CardTitle>
                      <Dialog open={showSubserviceDialog} onOpenChange={setShowSubserviceDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Plus className="w-4 h-4 mr-2" />
                            Add
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Add Subservice</DialogTitle>
                            <DialogDescription>Track competitor subservice with detailed metrics</DialogDescription>
                          </DialogHeader>
                          <SubserviceForm onClose={() => setShowSubserviceDialog(false)} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                      {filteredSubservices.map((sub) => (
                        <div
                          key={sub.Subservice_ID}
                          className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                            selectedSubservice === sub.Subservice_ID ? 'bg-[#7A1C46]/5 border-[#7A1C46]' : ''
                          }`}
                          onClick={() => setSelectedSubservice(sub.Subservice_ID)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="text-sm">{sub.Subservice_Name}</div>
                              <div className="text-xs text-gray-500 mt-1">{sub.Competitor_Name}</div>
                              <a 
                                href={sub.Subservice_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-1"
                              >
                                View page
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <div className="flex gap-2 mt-2">
                                <Badge className={getDAColor(sub.DA_Snapshot)} variant="outline">
                                  DA: {sub.DA_Snapshot}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {formatNumber(sub.Backlinks_Total)} BL
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {formatNumber(sub.Referring_Domains_Total)} RD
                                </Badge>
                              </div>
                            </div>
                            <Badge className={getStatusColor(sub.Status)}>{sub.Status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Right: Subservice Details Form */}
                <Card className="border-[#E2E8F0]">
                  <CardHeader>
                    <CardTitle className="text-sm">Subservice Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSubserviceData ? (
                      <SubserviceDetailsView subservice={selectedSubserviceData} />
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        Select a subservice to view details
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Service Mapping Tab */}
            <TabsContent value="ServiceMapping" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Map competitor offerings to your service catalog
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Auto-Suggest Mapping
                  </Button>
                  <Dialog open={showMappingDialog} onOpenChange={setShowMappingDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Mapping
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Add Service Mapping</DialogTitle>
                        <DialogDescription>Map competitor service to your service catalog</DialogDescription>
                      </DialogHeader>
                      <ServiceMappingForm onClose={() => setShowMappingDialog(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Competitor</TableHead>
                      <TableHead>Our Service</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Evidence URL</TableHead>
                      <TableHead>Mapped By</TableHead>
                      <TableHead>Mapped On</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceMappingData.map((map) => (
                      <TableRow key={map.Map_ID}>
                        <TableCell className="text-sm">{map.Competitor_Name}</TableCell>
                        <TableCell>
                          <Badge className="bg-[#7A1C46] text-white">{map.Service_Name}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getConfidenceColor(map.Confidence_Score)}>
                            {map.Confidence_Score}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <a 
                            href={map.Evidence_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 max-w-[200px]"
                          >
                            <span className="truncate">{map.Evidence_URL}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </TableCell>
                        <TableCell className="text-sm">{map.Mapped_By_Name}</TableCell>
                        <TableCell className="text-sm text-gray-600">{map.Mapped_On}</TableCell>
                        <TableCell className="text-xs text-gray-600 max-w-[200px] line-clamp-2">
                          {map.Notes}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Audit & History Tab */}
            <TabsContent value="AuditHistory" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Historical metrics snapshots for trend analysis
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileDown className="w-4 h-4 mr-2" />
                    Export History
                  </Button>
                  <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Snapshot Now
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Capture Date</TableHead>
                      <TableHead>Competitor</TableHead>
                      <TableHead>Subservice</TableHead>
                      <TableHead>DA</TableHead>
                      <TableHead>Backlinks</TableHead>
                      <TableHead>Ref Domains</TableHead>
                      <TableHead>Ref IPs</TableHead>
                      <TableHead>Traffic/Mo</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Captured By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metricsHistoryData.map((hist) => (
                      <TableRow key={hist.History_ID}>
                        <TableCell className="text-sm">{hist.Capture_Date}</TableCell>
                        <TableCell className="text-sm">{hist.Competitor_Name}</TableCell>
                        <TableCell className="text-xs text-gray-600">
                          {hist.Subservice_Name || <span className="text-gray-400">Root Domain</span>}
                        </TableCell>
                        <TableCell>
                          <Badge className={getDAColor(hist.Domain_Authority)}>
                            {hist.Domain_Authority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{formatNumber(hist.Backlinks_Total)}</TableCell>
                        <TableCell className="text-sm">{formatNumber(hist.Referring_Domains_Total)}</TableCell>
                        <TableCell className="text-sm">{formatNumber(hist.Referring_IPs_Total)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-gray-400" />
                            <span className="text-sm">{formatNumber(hist.Estimated_Traffic_Month)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{hist.Source}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{hist.Captured_By_Name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800 text-sm">
                  Metrics are automatically synced nightly from Ahrefs/Semrush when integrations are enabled. Manual snapshots can be captured anytime.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Slide-In Right Panel for Add Competitor */}
      {showCompetitorPanel && (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
          <div 
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowCompetitorPanel(false)}
          />
          <div 
            className="relative bg-white h-full w-[600px] shadow-2xl overflow-y-auto animate-in slide-in-from-right"
            style={{ borderRadius: '0' }}
          >
            {/* Panel Header */}
            <div className="sticky top-0 bg-white border-b p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    ➕ Add New Competitor
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Add competitor with comprehensive link profile metrics and service mapping
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCompetitorPanel(false)}
                  style={{ borderRadius: '12px' }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="p-6">
              <CompetitorForm onClose={() => setShowCompetitorPanel(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CompetitorForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    autoCode: `COMP-${Date.now().toString().slice(-6)}`,
    competitorName: '',
    mainURL: '',
    rootDomain: '',
    countries: [] as string[],
    industries: [] as string[],
    services: [] as string[],
    domainAuthority: '',
    backlinksTotal: '',
    referringDomains: '',
    referringIPs: '',
    followLinks: '',
    noFollowLinks: '',
    textLinks: '',
    imageLinks: '',
    formLinks: '',
    frameLinks: '',
    estimatedTraffic: '',
    status: 'Active',
    retainInList: true,
    notes: '',
  });

  const countriesList = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Singapore', 'India', 'Japan'];
  const industriesList = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'SaaS', 'E-commerce', 'Consulting'];
  const servicesList = ['SEO Services', 'Content Marketing', 'Social Media Marketing', 'PPC Advertising', 'Email Marketing', 'Web Development', 'Branding', 'Consulting'];

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const handleURLChange = (url: string) => {
    setFormData({ ...formData, mainURL: url });
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      setFormData(prev => ({ ...prev, mainURL: url, rootDomain: domain }));
    } catch {
      setFormData(prev => ({ ...prev, mainURL: url }));
    }
  };

  const handleSave = () => {
    if (!formData.competitorName || !formData.mainURL) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success(`✅ ${formData.competitorName} added successfully`);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h4 className="font-semibold text-[#7A1C46]">Basic Information</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Auto Code</Label>
            <Input
              value={formData.autoCode}
              disabled
              style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}
            />
            <p className="text-xs text-gray-500">Auto-generated unique identifier</p>
          </div>

          <div className="space-y-2">
            <Label>Competitor Name <span className="text-red-500">*</span></Label>
            <Input
              value={formData.competitorName}
              onChange={(e) => setFormData({ ...formData, competitorName: e.target.value })}
              placeholder="e.g., CloudTech Solutions"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Main URL <span className="text-red-500">*</span></Label>
            <Input
              type="url"
              value={formData.mainURL}
              onChange={(e) => handleURLChange(e.target.value)}
              placeholder="https://example.com"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Root Domain</Label>
            <Input
              value={formData.rootDomain}
              disabled
              style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}
              placeholder="Auto-derived from URL"
            />
          </div>
        </div>
      </div>

      {/* Geographic & Industry */}
      <div className="space-y-4">
        <h4 className="font-semibold text-[#7A1C46]">Geographic & Industry Details</h4>
        
        <div className="space-y-2">
          <Label>Countries (Multi-select)</Label>
          <div className="border rounded-lg p-3" style={{ borderRadius: '12px' }}>
            <div className="flex flex-wrap gap-2">
              {countriesList.map(country => (
                <Badge
                  key={country}
                  variant={formData.countries.includes(country) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  style={{ 
                    borderRadius: '12px',
                    backgroundColor: formData.countries.includes(country) ? '#7A1C46' : 'transparent',
                    color: formData.countries.includes(country) ? 'white' : 'inherit'
                  }}
                  onClick={() => setFormData({ ...formData, countries: toggleArrayItem(formData.countries, country) })}
                >
                  {country}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Industries (Multi-select)</Label>
          <div className="border rounded-lg p-3" style={{ borderRadius: '12px' }}>
            <div className="flex flex-wrap gap-2">
              {industriesList.map(industry => (
                <Badge
                  key={industry}
                  variant={formData.industries.includes(industry) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  style={{ 
                    borderRadius: '12px',
                    backgroundColor: formData.industries.includes(industry) ? '#0052CC' : 'transparent',
                    color: formData.industries.includes(industry) ? 'white' : 'inherit'
                  }}
                  onClick={() => setFormData({ ...formData, industries: toggleArrayItem(formData.industries, industry) })}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Services / Offerings (Multi-select)</Label>
          <div className="border rounded-lg p-3" style={{ borderRadius: '12px' }}>
            <div className="flex flex-wrap gap-2">
              {servicesList.map(service => (
                <Badge
                  key={service}
                  variant={formData.services.includes(service) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  style={{ 
                    borderRadius: '12px',
                    backgroundColor: formData.services.includes(service) ? '#12B76A' : 'transparent',
                    color: formData.services.includes(service) ? 'white' : 'inherit'
                  }}
                  onClick={() => setFormData({ ...formData, services: toggleArrayItem(formData.services, service) })}
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Metrics */}
      <div className="space-y-4">
        <h4 className="font-semibold text-[#7A1C46]">SEO & Link Profile Metrics</h4>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Domain Authority (DA)</Label>
            <Input
              type="number"
              value={formData.domainAuthority}
              onChange={(e) => setFormData({ ...formData, domainAuthority: e.target.value })}
              placeholder="0-100"
              min="0"
              max="100"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Total Backlinks</Label>
            <Input
              type="number"
              value={formData.backlinksTotal}
              onChange={(e) => setFormData({ ...formData, backlinksTotal: e.target.value })}
              placeholder="e.g., 1450000"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Referring Domains</Label>
            <Input
              type="number"
              value={formData.referringDomains}
              onChange={(e) => setFormData({ ...formData, referringDomains: e.target.value })}
              placeholder="e.g., 28500"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Referring IPs</Label>
            <Input
              type="number"
              value={formData.referringIPs}
              onChange={(e) => setFormData({ ...formData, referringIPs: e.target.value })}
              placeholder="e.g., 24300"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Follow Links</Label>
            <Input
              type="number"
              value={formData.followLinks}
              onChange={(e) => setFormData({ ...formData, followLinks: e.target.value })}
              placeholder="e.g., 985000"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>NoFollow Links</Label>
            <Input
              type="number"
              value={formData.noFollowLinks}
              onChange={(e) => setFormData({ ...formData, noFollowLinks: e.target.value })}
              placeholder="e.g., 465000"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Text Links</Label>
            <Input
              type="number"
              value={formData.textLinks}
              onChange={(e) => setFormData({ ...formData, textLinks: e.target.value })}
              placeholder="e.g., 1320000"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Image Links</Label>
            <Input
              type="number"
              value={formData.imageLinks}
              onChange={(e) => setFormData({ ...formData, imageLinks: e.target.value })}
              placeholder="e.g., 125000"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Form Links</Label>
            <Input
              type="number"
              value={formData.formLinks}
              onChange={(e) => setFormData({ ...formData, formLinks: e.target.value })}
              placeholder="e.g., 3200"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Frame Links</Label>
            <Input
              type="number"
              value={formData.frameLinks}
              onChange={(e) => setFormData({ ...formData, frameLinks: e.target.value })}
              placeholder="e.g., 1800"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Estimated Monthly Traffic</Label>
          <Input
            type="number"
            value={formData.estimatedTraffic}
            onChange={(e) => setFormData({ ...formData, estimatedTraffic: e.target.value })}
            placeholder="e.g., 850000"
            style={{ borderRadius: '12px' }}
          />
        </div>
      </div>

      {/* Status & Notes */}
      <div className="space-y-4">
        <h4 className="font-semibold text-[#7A1C46]">Status & Additional Info</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger style={{ borderRadius: '12px' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active - Actively monitoring</SelectItem>
                <SelectItem value="Monitor">Monitor - Watch periodically</SelectItem>
                <SelectItem value="Ignore">Ignore - Not relevant</SelectItem>
                <SelectItem value="Blacklist">Blacklist - Do not track</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Retain in List</Label>
            <div className="flex items-center gap-3 p-3 border rounded-lg" style={{ borderRadius: '12px' }}>
              <Switch
                checked={formData.retainInList}
                onCheckedChange={(checked) => setFormData({ ...formData, retainInList: checked })}
              />
              <div className="text-sm">
                {formData.retainInList ? 'Keep in active list' : 'Archive after review'}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Notes</Label>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add competitor analysis notes, key differentiators, or observations..."
            rows={4}
            style={{ borderRadius: '12px' }}
          />
        </div>
      </div>

      <Alert className="border-blue-200 bg-blue-50" style={{ borderRadius: '12px' }}>
        <Info className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          <strong>Tip:</strong> After creating the competitor, you can sync metrics automatically from Ahrefs/Semrush using the "Sync Metrics" button, or update them manually in the Details view.
        </AlertDescription>
      </Alert>

      <div className="flex gap-3 pt-4">
        <Button 
          onClick={handleSave} 
          style={{ 
            backgroundColor: '#0052CC', 
            color: 'white',
            borderRadius: '12px',
            flex: 1,
          }}
          disabled={!formData.competitorName || !formData.mainURL}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Competitor
        </Button>
        <Button 
          onClick={onClose} 
          variant="outline" 
          style={{ borderRadius: '12px' }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

// Old CompetitorDetailsView removed - now using separate component from CompetitorDetailsView.tsx

function SubserviceForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    competitor_id: '',
    subservice_name: '',
    subservice_url: '',
    status: 'Active',
    notes: '',
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Competitor *</Label>
        <Select value={formData.competitor_id} onValueChange={(value) => setFormData({ ...formData, competitor_id: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select competitor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMP001">CloudTech Solutions</SelectItem>
            <SelectItem value="COMP002">Digital Transform Inc</SelectItem>
            <SelectItem value="COMP003">Enterprise Cloud Partners</SelectItem>
            <SelectItem value="COMP004">SaaS Growth Lab</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Subservice Name *</Label>
          <Input
            value={formData.subservice_name}
            onChange={(e) => setFormData({ ...formData, subservice_name: e.target.value })}
            placeholder="e.g., Enterprise SEO Services"
          />
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Monitor">Monitor</SelectItem>
              <SelectItem value="Ignore">Ignore</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Subservice URL *</Label>
        <Input
          type="url"
          value={formData.subservice_url}
          onChange={(e) => setFormData({ ...formData, subservice_url: e.target.value })}
          placeholder="https://example.com/seo"
        />
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add subservice notes..."
          rows={3}
        />
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          Use "Sync Metrics" to pull link profile data for this specific URL/section from Ahrefs/Semrush.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Add Subservice
        </Button>
      </div>
    </div>
  );
}

function SubserviceDetailsView({ subservice }: { subservice: CompetitorSubservice }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs text-gray-500">Subservice Name</Label>
        <div className="text-sm">{subservice.Subservice_Name}</div>
      </div>
      <div>
        <Label className="text-xs text-gray-500">URL</Label>
        <a 
          href={subservice.Subservice_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          {subservice.Subservice_URL}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <div>
        <Label className="text-xs text-gray-500">Countries</Label>
        <div className="flex flex-wrap gap-1 mt-1">
          {subservice.Countries.map(country => (
            <Badge key={country} variant="outline" className="text-xs">{country}</Badge>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-xs text-gray-500">Mapped Services</Label>
        <div className="flex flex-wrap gap-1 mt-1">
          {subservice.Mapped_Service_Names.map((srv, idx) => (
            <Badge key={idx} className="bg-purple-100 text-purple-800 text-xs">{srv}</Badge>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <Label className="text-xs text-gray-500 mb-2 block">Link Profile Metrics</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-gray-500">DA Snapshot</Label>
            <div className="mt-1">
              <Badge className={
                subservice.DA_Snapshot >= 70 ? 'bg-green-100 text-green-800' :
                subservice.DA_Snapshot >= 50 ? 'bg-yellow-100 text-yellow-800' :
                'bg-orange-100 text-orange-800'
              }>
                {subservice.DA_Snapshot}
              </Badge>
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Backlinks</Label>
            <div className="text-sm">{subservice.Backlinks_Total.toLocaleString()}</div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Ref Domains</Label>
            <div className="text-sm">{subservice.Referring_Domains_Total.toLocaleString()}</div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Ref IPs</Label>
            <div className="text-sm">{subservice.Referring_IPs_Total.toLocaleString()}</div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Follow</Label>
            <div className="text-sm text-green-600">{subservice.Follow_Links.toLocaleString()}</div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">NoFollow</Label>
            <div className="text-sm text-gray-600">{subservice.NoFollow_Links.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <Label className="text-xs text-gray-500 mb-2 block">Link Types</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-gray-500">Text</Label>
            <div className="text-sm">{subservice.Text_Links.toLocaleString()}</div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Image</Label>
            <div className="text-sm">{subservice.Image_Links.toLocaleString()}</div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Form</Label>
            <div className="text-sm">{subservice.Form_Links.toLocaleString()}</div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Frame</Label>
            <div className="text-sm">{subservice.Frame_Links.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div>
        <Label className="text-xs text-gray-500">Est. Monthly Traffic</Label>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{subservice.Estimated_Traffic_Month.toLocaleString()}</span>
        </div>
      </div>

      {subservice.Notes && (
        <div>
          <Label className="text-xs text-gray-500">Notes</Label>
          <p className="text-sm text-gray-600 mt-1">{subservice.Notes}</p>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button variant="outline" size="sm" className="flex-1">
          <Edit className="w-3 h-3 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <RefreshCw className="w-3 h-3 mr-2" />
          Sync
        </Button>
      </div>
    </div>
  );
}

function ServiceMappingForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    competitor_id: '',
    service_id: '',
    confidence_score: '90',
    evidence_url: '',
    notes: '',
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Competitor *</Label>
          <Select value={formData.competitor_id} onValueChange={(value) => setFormData({ ...formData, competitor_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select competitor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COMP001">CloudTech Solutions</SelectItem>
              <SelectItem value="COMP002">Digital Transform Inc</SelectItem>
              <SelectItem value="COMP003">Enterprise Cloud Partners</SelectItem>
              <SelectItem value="COMP004">SaaS Growth Lab</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Our Service *</Label>
          <Select value={formData.service_id} onValueChange={(value) => setFormData({ ...formData, service_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SRV001">SEO Services</SelectItem>
              <SelectItem value="SRV002">Content Marketing</SelectItem>
              <SelectItem value="SRV003">Social Media Marketing</SelectItem>
              <SelectItem value="SRV005">E-commerce Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Confidence Score (0-100) *</Label>
        <Input
          type="number"
          min="0"
          max="100"
          value={formData.confidence_score}
          onChange={(e) => setFormData({ ...formData, confidence_score: e.target.value })}
        />
        <p className="text-xs text-gray-500">How confident are you in this mapping? 90+ = strong evidence, 70-90 = moderate, &lt;70 = weak</p>
      </div>

      <div className="space-y-2">
        <Label>Evidence URL</Label>
        <Input
          type="url"
          value={formData.evidence_url}
          onChange={(e) => setFormData({ ...formData, evidence_url: e.target.value })}
          placeholder="https://competitor.com/service-page"
        />
        <p className="text-xs text-gray-500">Link to competitor's service page or proof of offering</p>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add notes about this mapping..."
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Add Mapping
        </Button>
      </div>
    </div>
  );
}
