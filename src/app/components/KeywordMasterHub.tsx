import { useState } from 'react';
import { Plus, Upload, Link2, ExternalLink, Filter, TrendingUp, FileUp, BarChart3, Globe2, ClipboardList, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';

interface Keyword {
  Keyword_ID: string;
  Keyword_Code: string;
  Keyword: string;
  Keyword_Type: string;
  Parent_Keyword_ID: string | null;
  Parent_Keyword: string | null;
  Keyword_SubCategory: string;
  Synonyms: string[];
  Technical_Terms: string[];
  Intent: string;
  Search_Volume: number;
  Keyword_Difficulty: number;
  CPC: number;
  SERP_Features: string[];
  Language: string;
  Country: string;
  Industry_ID: string | null;
  Industry_Name: string | null;
  Service_ID: string | null;
  Service_Name: string | null;
  Page_ID: string | null;
  Page_Name: string | null;
  Competitor_IDs: string[];
  Used_In_Campaign_Flag: boolean;
  Campaign_Usage_Count: number;
  Campaign_Last_Used_Date: string | null;
  Campaign_List: string[];
  Content_Usage_Count: number;
  Content_Last_Used_Date: string | null;
  Quoted_By_Users: string[];
  Last_Audited_By: string | null;
  Last_Audited_Date: string | null;
  Status: string;
  Notes: string;
  Created_At: string;
  Updated_At: string;
}

interface KeywordUsageLog {
  Usage_ID: string;
  Keyword_ID: string;
  Keyword: string;
  Usage_Type: string;
  Linked_ID: string;
  Linked_Name: string;
  Used_By_User_ID: string;
  Used_By_User_Name: string;
  Usage_Date: string;
  Count: number;
  Context_Excerpt: string;
  Notes: string;
}

interface CompetitorKeywordMap {
  Map_ID: string;
  Keyword_ID: string;
  Keyword: string;
  Competitor_ID: string;
  Competitor_Name: string;
  Competitor_URL: string;
  Rank_Position: number;
  Search_Volume: number;
  Last_Checked: string;
}

export default function KeywordMasterHub() {
  const [activeTab, setActiveTab] = useState('Keywords');
  const [filters, setFilters] = useState({
    keywordType: 'all',
    intent: 'all',
    country: 'all',
    language: 'all',
    service: 'all',
    industry: 'all',
    status: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [showKeywordDialog, setShowKeywordDialog] = useState(false);
  const [showUsageLogDialog, setShowUsageLogDialog] = useState(false);

  const keywordsData: Keyword[] = [
    {
      Keyword_ID: 'KW001',
      Keyword_Code: 'KW-TECH-00123',
      Keyword: 'enterprise cloud migration',
      Keyword_Type: 'Main',
      Parent_Keyword_ID: null,
      Parent_Keyword: null,
      Keyword_SubCategory: 'Cloud Services',
      Synonyms: ['enterprise cloud transformation', 'business cloud migration', 'corporate cloud transition'],
      Technical_Terms: ['lift-and-shift migration', 'cloud replatforming', 'hybrid cloud deployment'],
      Intent: 'Commercial',
      Search_Volume: 8200,
      Keyword_Difficulty: 68,
      CPC: 12.50,
      SERP_Features: ['Featured Snippet', 'People Also Ask', 'Video'],
      Language: 'en-US',
      Country: 'US',
      Industry_ID: 'IND001',
      Industry_Name: 'Technology',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      Page_ID: 'PAGE001',
      Page_Name: 'Enterprise Cloud Migration Guide',
      Competitor_IDs: ['COMP001', 'COMP002'],
      Used_In_Campaign_Flag: true,
      Campaign_Usage_Count: 5,
      Campaign_Last_Used_Date: '2024-10-28',
      Campaign_List: ['CMP001', 'CMP003', 'CMP008'],
      Content_Usage_Count: 12,
      Content_Last_Used_Date: '2024-10-30',
      Quoted_By_Users: ['USR001', 'USR003'],
      Last_Audited_By: 'USR002',
      Last_Audited_Date: '2024-10-25',
      Status: 'Active',
      Notes: 'High-value keyword for enterprise segment. Focus on content depth.',
      Created_At: '2024-09-15',
      Updated_At: '2024-10-30',
    },
    {
      Keyword_ID: 'KW002',
      Keyword_Code: 'KW-TECH-00124',
      Keyword: 'cloud migration services',
      Keyword_Type: 'Primary',
      Parent_Keyword_ID: 'KW001',
      Parent_Keyword: 'enterprise cloud migration',
      Keyword_SubCategory: 'Cloud Services',
      Synonyms: ['cloud transition services', 'cloud relocation services'],
      Technical_Terms: ['IaaS migration', 'PaaS migration', 'SaaS migration'],
      Intent: 'Transactional',
      Search_Volume: 12400,
      Keyword_Difficulty: 72,
      CPC: 18.75,
      SERP_Features: ['Local Pack', 'Sitelinks', 'People Also Ask'],
      Language: 'en-US',
      Country: 'US',
      Industry_ID: 'IND001',
      Industry_Name: 'Technology',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      Page_ID: null,
      Page_Name: null,
      Competitor_IDs: ['COMP001', 'COMP003'],
      Used_In_Campaign_Flag: true,
      Campaign_Usage_Count: 8,
      Campaign_Last_Used_Date: '2024-10-29',
      Campaign_List: ['CMP001', 'CMP002', 'CMP005', 'CMP008'],
      Content_Usage_Count: 15,
      Content_Last_Used_Date: '2024-10-29',
      Quoted_By_Users: ['USR001', 'USR002', 'USR003'],
      Last_Audited_By: 'USR002',
      Last_Audited_Date: '2024-10-28',
      Status: 'Active',
      Notes: 'Strong transactional intent. Priority for paid campaigns.',
      Created_At: '2024-09-15',
      Updated_At: '2024-10-29',
    },
    {
      Keyword_ID: 'KW003',
      Keyword_Code: 'KW-FIN-00045',
      Keyword: 'fintech seo strategies',
      Keyword_Type: 'Long-tail',
      Parent_Keyword_ID: null,
      Parent_Keyword: null,
      Keyword_SubCategory: 'SEO Strategy',
      Synonyms: ['fintech search optimization', 'financial technology seo'],
      Technical_Terms: ['YMYL content optimization', 'E-A-T for fintech', 'fintech structured data'],
      Intent: 'Informational',
      Search_Volume: 1200,
      Keyword_Difficulty: 45,
      CPC: 8.20,
      SERP_Features: ['FAQ', 'People Also Ask'],
      Language: 'en-US',
      Country: 'US',
      Industry_ID: 'IND006',
      Industry_Name: 'FinTech',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      Page_ID: 'PAGE003',
      Page_Name: 'FinTech SEO Guide',
      Competitor_IDs: ['COMP002'],
      Used_In_Campaign_Flag: true,
      Campaign_Usage_Count: 3,
      Campaign_Last_Used_Date: '2024-10-20',
      Campaign_List: ['CMP010'],
      Content_Usage_Count: 7,
      Content_Last_Used_Date: '2024-10-25',
      Quoted_By_Users: ['USR003'],
      Last_Audited_By: 'USR001',
      Last_Audited_Date: '2024-10-15',
      Status: 'Active',
      Notes: 'Niche keyword with good opportunity. Create pillar content.',
      Created_At: '2024-09-20',
      Updated_At: '2024-10-25',
    },
    {
      Keyword_ID: 'KW004',
      Keyword_Code: 'KW-TECH-00089',
      Keyword: 'saas content marketing',
      Keyword_Type: 'Secondary',
      Parent_Keyword_ID: null,
      Parent_Keyword: null,
      Keyword_SubCategory: 'Content Marketing',
      Synonyms: ['software content marketing', 'saas marketing content'],
      Technical_Terms: ['PLG content', 'bottom-up SaaS content', 'freemium content strategy'],
      Intent: 'Commercial',
      Search_Volume: 4800,
      Keyword_Difficulty: 58,
      CPC: 14.30,
      SERP_Features: ['Featured Snippet', 'Video', 'Image Pack'],
      Language: 'en-US',
      Country: 'US',
      Industry_ID: 'IND002',
      Industry_Name: 'SaaS',
      Service_ID: 'SRV002',
      Service_Name: 'Content Marketing',
      Page_ID: 'PAGE003',
      Page_Name: 'Complete Guide to SaaS Content Marketing',
      Competitor_IDs: ['COMP001', 'COMP004'],
      Used_In_Campaign_Flag: false,
      Campaign_Usage_Count: 0,
      Campaign_Last_Used_Date: null,
      Campaign_List: [],
      Content_Usage_Count: 18,
      Content_Last_Used_Date: '2024-10-30',
      Quoted_By_Users: ['USR003'],
      Last_Audited_By: 'USR003',
      Last_Audited_Date: '2024-10-22',
      Status: 'Active',
      Notes: 'High content usage. Consider creating dedicated campaign.',
      Created_At: '2024-09-18',
      Updated_At: '2024-10-30',
    },
    {
      Keyword_ID: 'KW005',
      Keyword_Code: 'KW-TECH-00201',
      Keyword: 'legacy cloud migration tools',
      Keyword_Type: 'Technical',
      Parent_Keyword_ID: 'KW001',
      Parent_Keyword: 'enterprise cloud migration',
      Keyword_SubCategory: 'Cloud Services',
      Synonyms: [],
      Technical_Terms: ['CloudEndure', 'AWS MGN', 'Azure Migrate', 'VMware HCX'],
      Intent: 'Informational',
      Search_Volume: 890,
      Keyword_Difficulty: 52,
      CPC: 9.80,
      SERP_Features: ['People Also Ask'],
      Language: 'en-US',
      Country: 'US',
      Industry_ID: 'IND001',
      Industry_Name: 'Technology',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      Page_ID: null,
      Page_Name: null,
      Competitor_IDs: ['COMP002'],
      Used_In_Campaign_Flag: false,
      Campaign_Usage_Count: 0,
      Campaign_Last_Used_Date: null,
      Campaign_List: [],
      Content_Usage_Count: 3,
      Content_Last_Used_Date: '2024-10-18',
      Quoted_By_Users: ['USR001'],
      Last_Audited_By: null,
      Last_Audited_Date: null,
      Status: 'Active',
      Notes: 'Technical variant. Good for how-to content.',
      Created_At: '2024-10-05',
      Updated_At: '2024-10-18',
    },
    {
      Keyword_ID: 'KW006',
      Keyword_Code: 'KW-BRND-00012',
      Keyword: 'beetloop marketing services',
      Keyword_Type: 'Branded',
      Parent_Keyword_ID: null,
      Parent_Keyword: null,
      Keyword_SubCategory: 'Brand',
      Synonyms: ['beetloop seo', 'beetloop digital marketing'],
      Technical_Terms: [],
      Intent: 'Navigational',
      Search_Volume: 320,
      Keyword_Difficulty: 15,
      CPC: 2.10,
      SERP_Features: ['Sitelinks', 'Knowledge Panel'],
      Language: 'en-US',
      Country: 'US',
      Industry_ID: null,
      Industry_Name: null,
      Service_ID: null,
      Service_Name: null,
      Page_ID: null,
      Page_Name: null,
      Competitor_IDs: [],
      Used_In_Campaign_Flag: true,
      Campaign_Usage_Count: 2,
      Campaign_Last_Used_Date: '2024-10-25',
      Campaign_List: ['CMP020'],
      Content_Usage_Count: 5,
      Content_Last_Used_Date: '2024-10-27',
      Quoted_By_Users: [],
      Last_Audited_By: 'USR002',
      Last_Audited_Date: '2024-10-20',
      Status: 'Active',
      Notes: 'Brand protection keyword. Monitor consistently.',
      Created_At: '2024-09-10',
      Updated_At: '2024-10-27',
    },
  ];

  const usageLogData: KeywordUsageLog[] = [
    {
      Usage_ID: 'LOG001',
      Keyword_ID: 'KW001',
      Keyword: 'enterprise cloud migration',
      Usage_Type: 'Campaign',
      Linked_ID: 'CMP001',
      Linked_Name: 'Q4 Enterprise SEO Campaign',
      Used_By_User_ID: 'USR001',
      Used_By_User_Name: 'Alice Johnson',
      Usage_Date: '2024-10-28',
      Count: 3,
      Context_Excerpt: 'Used in ad copy and landing page optimization',
      Notes: 'High-performing keyword in campaign',
    },
    {
      Usage_ID: 'LOG002',
      Keyword_ID: 'KW001',
      Keyword: 'enterprise cloud migration',
      Usage_Type: 'Content',
      Linked_ID: 'CNT015',
      Linked_Name: 'Cloud Migration Best Practices Guide',
      Used_By_User_ID: 'USR003',
      Used_By_User_Name: 'Carol Smith',
      Usage_Date: '2024-10-30',
      Count: 8,
      Context_Excerpt: 'Primary keyword in H1, H2, and throughout body content',
      Notes: 'Pillar content piece',
    },
    {
      Usage_ID: 'LOG003',
      Keyword_ID: 'KW002',
      Keyword: 'cloud migration services',
      Usage_Type: 'SEO',
      Linked_ID: 'PAGE001',
      Linked_Name: 'Cloud Migration Services Page',
      Used_By_User_ID: 'USR001',
      Used_By_User_Name: 'Alice Johnson',
      Usage_Date: '2024-10-29',
      Count: 5,
      Context_Excerpt: 'Optimized meta title, description, and on-page content',
      Notes: 'Main service page optimization',
    },
    {
      Usage_ID: 'LOG004',
      Keyword_ID: 'KW003',
      Keyword: 'fintech seo strategies',
      Usage_Type: 'Content',
      Linked_ID: 'CNT042',
      Linked_Name: 'FinTech Marketing Trends 2024',
      Used_By_User_ID: 'USR003',
      Used_By_User_Name: 'Carol Smith',
      Usage_Date: '2024-10-25',
      Count: 4,
      Context_Excerpt: 'Featured in section about SEO best practices for fintech',
      Notes: 'Industry-specific content',
    },
    {
      Usage_ID: 'LOG005',
      Keyword_ID: 'KW002',
      Keyword: 'cloud migration services',
      Usage_Type: 'Paid',
      Linked_ID: 'CMP002',
      Linked_Name: 'Google Ads - Cloud Services',
      Used_By_User_ID: 'USR002',
      Used_By_User_Name: 'Bob Wilson',
      Usage_Date: '2024-10-27',
      Count: 2,
      Context_Excerpt: 'Exact match ad group with high CTR',
      Notes: 'Top performing paid keyword',
    },
  ];

  const competitorMapData: CompetitorKeywordMap[] = [
    {
      Map_ID: 'MAP001',
      Keyword_ID: 'KW001',
      Keyword: 'enterprise cloud migration',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Competitor_URL: 'https://cloudtech.example.com/migration',
      Rank_Position: 3,
      Search_Volume: 8200,
      Last_Checked: '2024-10-30',
    },
    {
      Map_ID: 'MAP002',
      Keyword_ID: 'KW001',
      Keyword: 'enterprise cloud migration',
      Competitor_ID: 'COMP002',
      Competitor_Name: 'Digital Transform Inc',
      Competitor_URL: 'https://digitaltransform.example.com/cloud',
      Rank_Position: 7,
      Search_Volume: 8200,
      Last_Checked: '2024-10-30',
    },
    {
      Map_ID: 'MAP003',
      Keyword_ID: 'KW002',
      Keyword: 'cloud migration services',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Competitor_URL: 'https://cloudtech.example.com/services',
      Rank_Position: 2,
      Search_Volume: 12400,
      Last_Checked: '2024-10-30',
    },
    {
      Map_ID: 'MAP004',
      Keyword_ID: 'KW002',
      Keyword: 'cloud migration services',
      Competitor_ID: 'COMP003',
      Competitor_Name: 'Enterprise Cloud Partners',
      Competitor_URL: 'https://ecp.example.com/migration-services',
      Rank_Position: 5,
      Search_Volume: 12400,
      Last_Checked: '2024-10-30',
    },
    {
      Map_ID: 'MAP005',
      Keyword_ID: 'KW003',
      Keyword: 'fintech seo strategies',
      Competitor_ID: 'COMP002',
      Competitor_Name: 'Digital Transform Inc',
      Competitor_URL: 'https://digitaltransform.example.com/fintech-seo',
      Rank_Position: 4,
      Search_Volume: 1200,
      Last_Checked: '2024-10-29',
    },
    {
      Map_ID: 'MAP006',
      Keyword_ID: 'KW004',
      Keyword: 'saas content marketing',
      Competitor_ID: 'COMP001',
      Competitor_Name: 'CloudTech Solutions',
      Competitor_URL: 'https://cloudtech.example.com/blog/saas-marketing',
      Rank_Position: 6,
      Search_Volume: 4800,
      Last_Checked: '2024-10-30',
    },
    {
      Map_ID: 'MAP007',
      Keyword_ID: 'KW004',
      Keyword: 'saas content marketing',
      Competitor_ID: 'COMP004',
      Competitor_Name: 'SaaS Growth Lab',
      Competitor_URL: 'https://saasgrowth.example.com/content-marketing',
      Rank_Position: 1,
      Search_Volume: 4800,
      Last_Checked: '2024-10-30',
    },
  ];

  const filteredKeywords = keywordsData.filter((kw) => {
    if (filters.keywordType !== 'all' && kw.Keyword_Type !== filters.keywordType) return false;
    if (filters.intent !== 'all' && kw.Intent !== filters.intent) return false;
    if (filters.country !== 'all' && kw.Country !== filters.country) return false;
    if (filters.language !== 'all' && kw.Language !== filters.language) return false;
    if (filters.service !== 'all' && kw.Service_ID !== filters.service) return false;
    if (filters.industry !== 'all' && kw.Industry_ID !== filters.industry) return false;
    if (filters.status !== 'all' && kw.Status !== filters.status) return false;
    if (searchTerm && !kw.Keyword.toLowerCase().includes(searchTerm.toLowerCase()) && !kw.Keyword_Code.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const selectedKeywordData = keywordsData.find(kw => kw.Keyword_ID === selectedKeyword);

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'Informational': return 'bg-blue-100 text-blue-800';
      case 'Navigational': return 'bg-purple-100 text-purple-800';
      case 'Commercial': return 'bg-yellow-100 text-yellow-800';
      case 'Transactional': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKeywordTypeColor = (type: string) => {
    switch (type) {
      case 'Main': return 'bg-[#7A1C46] text-white';
      case 'Primary': return 'bg-pink-100 text-pink-800';
      case 'Secondary': return 'bg-purple-100 text-purple-800';
      case 'Long-tail': return 'bg-blue-100 text-blue-800';
      case 'Short-tail': return 'bg-orange-100 text-orange-800';
      case 'Technical': return 'bg-gray-100 text-gray-800';
      case 'Branded': return 'bg-green-100 text-green-800';
      case 'Synonym': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Deprecated': return 'bg-red-100 text-red-800';
      case 'Merge Candidate': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'bg-green-100 text-green-800';
    if (difficulty <= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return 'bg-green-100 text-green-800';
    if (rank <= 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Keyword Master</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="Keywords">Keywords</TabsTrigger>
              <TabsTrigger value="Details">Keyword Details</TabsTrigger>
              <TabsTrigger value="UsageLog">Usage Log</TabsTrigger>
              <TabsTrigger value="CompetitorMap">Competitor Map</TabsTrigger>
            </TabsList>

            {/* Keywords Tab */}
            <TabsContent value="Keywords" className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={filters.keywordType} onValueChange={(value) => setFilters({ ...filters, keywordType: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Main">Main</SelectItem>
                      <SelectItem value="Primary">Primary</SelectItem>
                      <SelectItem value="Secondary">Secondary</SelectItem>
                      <SelectItem value="Long-tail">Long-tail</SelectItem>
                      <SelectItem value="Short-tail">Short-tail</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Branded">Branded</SelectItem>
                      <SelectItem value="Synonym">Synonym</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.intent} onValueChange={(value) => setFilters({ ...filters, intent: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Intents</SelectItem>
                      <SelectItem value="Informational">Informational</SelectItem>
                      <SelectItem value="Navigational">Navigational</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Transactional">Transactional</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="GB">UK</SelectItem>
                      <SelectItem value="AE">UAE</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Deprecated">Deprecated</SelectItem>
                      <SelectItem value="Merge Candidate">Merge Candidate</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search keywords or codes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <FileUp className="w-4 h-4 mr-2" />
                    Import CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link2 className="w-4 h-4 mr-2" />
                    Link to Service/CMS
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Usage Stats
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe2 className="w-4 h-4 mr-2" />
                    Competitor Map
                  </Button>
                  <Dialog open={showKeywordDialog} onOpenChange={setShowKeywordDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Keyword
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add New Keyword</DialogTitle>
                        <DialogDescription>Create a new keyword with complete metadata and mapping</DialogDescription>
                      </DialogHeader>
                      <KeywordForm onClose={() => setShowKeywordDialog(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Keyword</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>SubCategory</TableHead>
                        <TableHead>Intent</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>CPC</TableHead>
                        <TableHead>Service/Page</TableHead>
                        <TableHead>Campaign Usage</TableHead>
                        <TableHead>Content Usage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKeywords.map((kw) => (
                        <TableRow key={kw.Keyword_ID}>
                          <TableCell>
                            <Badge variant="outline" className="text-xs font-mono">{kw.Keyword_Code}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="min-w-[200px]">
                              <div className="text-sm">{kw.Keyword}</div>
                              {kw.Parent_Keyword && (
                                <div className="text-xs text-gray-500 mt-1">
                                  ↳ {kw.Parent_Keyword}
                                </div>
                              )}
                              {kw.SERP_Features.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {kw.SERP_Features.slice(0, 2).map(feature => (
                                    <Badge key={feature} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                  {kw.SERP_Features.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{kw.SERP_Features.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getKeywordTypeColor(kw.Keyword_Type)}>{kw.Keyword_Type}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{kw.Keyword_SubCategory}</TableCell>
                          <TableCell>
                            <Badge className={getIntentColor(kw.Intent)}>{kw.Intent}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">{formatNumber(kw.Search_Volume)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getDifficultyColor(kw.Keyword_Difficulty)} variant="outline">
                              {kw.Keyword_Difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">${kw.CPC.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="text-xs space-y-0.5 min-w-[120px]">
                              {kw.Service_Name && (
                                <div className="text-[#7A1C46]">{kw.Service_Name}</div>
                              )}
                              {kw.Page_Name && (
                                <div className="text-gray-600">→ {kw.Page_Name}</div>
                              )}
                              {!kw.Service_Name && !kw.Page_Name && (
                                <span className="text-gray-400">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {kw.Used_In_Campaign_Flag ? (
                              <div className="flex flex-col gap-1">
                                <Badge className="bg-green-100 text-green-800">{kw.Campaign_Usage_Count}x</Badge>
                                {kw.Campaign_Last_Used_Date && (
                                  <span className="text-xs text-gray-500">{kw.Campaign_Last_Used_Date}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {kw.Content_Usage_Count > 0 ? (
                              <div className="flex flex-col gap-1">
                                <Badge className="bg-blue-100 text-blue-800">{kw.Content_Usage_Count}x</Badge>
                                {kw.Content_Last_Used_Date && (
                                  <span className="text-xs text-gray-500">{kw.Content_Last_Used_Date}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(kw.Status)}>{kw.Status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedKeyword(kw.Keyword_ID);
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

            {/* Keyword Details Tab */}
            <TabsContent value="Details" className="space-y-4">
              {selectedKeywordData ? (
                <KeywordDetailsView keyword={selectedKeywordData} />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Select a keyword from the Keywords tab to view details
                </div>
              )}
            </TabsContent>

            {/* Usage Log Tab */}
            <TabsContent value="UsageLog" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Track keyword usage across campaigns, content, and SEO activities
                </p>
                <Dialog open={showUsageLogDialog} onOpenChange={setShowUsageLogDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Add Log Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Add Usage Log Entry</DialogTitle>
                      <DialogDescription>Record keyword usage in campaigns, content, or other activities</DialogDescription>
                    </DialogHeader>
                    <UsageLogForm onClose={() => setShowUsageLogDialog(false)} />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Usage Type</TableHead>
                      <TableHead>Linked To</TableHead>
                      <TableHead>Used By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Context</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageLogData.map((log) => (
                      <TableRow key={log.Usage_ID}>
                        <TableCell className="text-sm">{log.Keyword}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.Usage_Type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>{log.Linked_Name}</div>
                            <div className="text-gray-500">{log.Linked_ID}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{log.Used_By_User_Name}</TableCell>
                        <TableCell className="text-sm text-gray-600">{log.Usage_Date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.Count}x</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-gray-600 max-w-[200px] line-clamp-2">
                          {log.Context_Excerpt}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Competitor Map Tab */}
            <TabsContent value="CompetitorMap" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Track competitor rankings and search volumes for target keywords
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Globe2 className="w-4 h-4 mr-2" />
                    Sync from Ahrefs/Semrush
                  </Button>
                  <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Manual Map
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Competitor</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Rank Position</TableHead>
                      <TableHead>Search Volume</TableHead>
                      <TableHead>Last Checked</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorMapData.map((map) => (
                      <TableRow key={map.Map_ID}>
                        <TableCell className="text-sm">{map.Keyword}</TableCell>
                        <TableCell className="text-sm">{map.Competitor_Name}</TableCell>
                        <TableCell>
                          <a 
                            href={map.Competitor_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 max-w-[200px]"
                          >
                            <span className="truncate">{map.Competitor_URL}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRankColor(map.Rank_Position)}>
                            #{map.Rank_Position}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-gray-400" />
                            <span className="text-sm">{formatNumber(map.Search_Volume)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{map.Last_Checked}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function KeywordForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    keyword_code: '',
    keyword: '',
    keyword_type: 'Main',
    subcategory: '',
    synonyms: '',
    technical_terms: '',
    intent: 'Informational',
    search_volume: '',
    difficulty: '',
    cpc: '',
    serp_features: [] as string[],
    language: 'en-US',
    country: 'US',
    industry: '',
    service: '',
    page: '',
    used_in_campaign: false,
    status: 'Active',
    notes: '',
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Keyword Code *</Label>
          <Input
            value={formData.keyword_code}
            onChange={(e) => setFormData({ ...formData, keyword_code: e.target.value })}
            placeholder="e.g., KW-TECH-00123"
          />
        </div>

        <div className="space-y-2">
          <Label>Keyword *</Label>
          <Input
            value={formData.keyword}
            onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
            placeholder="e.g., enterprise cloud migration"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Keyword Type *</Label>
          <Select value={formData.keyword_type} onValueChange={(value) => setFormData({ ...formData, keyword_type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Main">Main</SelectItem>
              <SelectItem value="Primary">Primary</SelectItem>
              <SelectItem value="Secondary">Secondary</SelectItem>
              <SelectItem value="Long-tail">Long-tail</SelectItem>
              <SelectItem value="Short-tail">Short-tail</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Branded">Branded</SelectItem>
              <SelectItem value="Synonym">Synonym</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>SubCategory</Label>
          <Input
            value={formData.subcategory}
            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            placeholder="e.g., Cloud Services"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Synonyms (comma-separated)</Label>
        <Textarea
          value={formData.synonyms}
          onChange={(e) => setFormData({ ...formData, synonyms: e.target.value })}
          placeholder="e.g., enterprise cloud transformation, business cloud migration"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Technical Terms (comma-separated)</Label>
        <Textarea
          value={formData.technical_terms}
          onChange={(e) => setFormData({ ...formData, technical_terms: e.target.value })}
          placeholder="e.g., lift-and-shift migration, cloud replatforming"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Intent *</Label>
          <Select value={formData.intent} onValueChange={(value) => setFormData({ ...formData, intent: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Informational">Informational</SelectItem>
              <SelectItem value="Navigational">Navigational</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Transactional">Transactional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Search Volume</Label>
          <Input
            type="number"
            value={formData.search_volume}
            onChange={(e) => setFormData({ ...formData, search_volume: e.target.value })}
            placeholder="e.g., 8200"
          />
        </div>

        <div className="space-y-2">
          <Label>Difficulty (0-100)</Label>
          <Input
            type="number"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            placeholder="e.g., 68"
          />
        </div>

        <div className="space-y-2">
          <Label>CPC ($)</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.cpc}
            onChange={(e) => setFormData({ ...formData, cpc: e.target.value })}
            placeholder="e.g., 12.50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-IN">English (India)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Country</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">US</SelectItem>
              <SelectItem value="IN">India</SelectItem>
              <SelectItem value="GB">UK</SelectItem>
              <SelectItem value="AE">UAE</SelectItem>
              <SelectItem value="SG">Singapore</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Industry</Label>
          <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="IND001">Technology</SelectItem>
              <SelectItem value="IND002">SaaS</SelectItem>
              <SelectItem value="IND004">Healthcare</SelectItem>
              <SelectItem value="IND005">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Service</Label>
          <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="SRV001">SEO Services</SelectItem>
              <SelectItem value="SRV002">Content Marketing</SelectItem>
              <SelectItem value="SRV003">Social Media Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Page (CMS)</Label>
          <Select value={formData.page} onValueChange={(value) => setFormData({ ...formData, page: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="PAGE001">Technical SEO - Site Speed</SelectItem>
              <SelectItem value="PAGE002">Healthcare SEO Compliance</SelectItem>
              <SelectItem value="PAGE003">SaaS Content Marketing Guide</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.used_in_campaign}
          onCheckedChange={(checked) => setFormData({ ...formData, used_in_campaign: checked })}
        />
        <Label>Used in Campaign</Label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Deprecated">Deprecated</SelectItem>
              <SelectItem value="Merge Candidate">Merge Candidate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add notes about this keyword..."
          rows={3}
        />
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          Keyword usage will be tracked automatically when used in campaigns or content. Ensure Keyword_Code is unique.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Add Keyword
        </Button>
      </div>
    </div>
  );
}

function KeywordDetailsView({ keyword }: { keyword: Keyword }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500">Keyword Code</Label>
              <div className="font-mono text-sm">{keyword.Keyword_Code}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Keyword</Label>
              <div className="text-sm">{keyword.Keyword}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Type</Label>
              <div className="mt-1">
                <Badge className={keyword.Keyword_Type === 'Main' ? 'bg-[#7A1C46] text-white' : 'bg-gray-100 text-gray-800'}>
                  {keyword.Keyword_Type}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">SubCategory</Label>
              <div className="text-sm">{keyword.Keyword_SubCategory}</div>
            </div>
            {keyword.Parent_Keyword && (
              <div>
                <Label className="text-xs text-gray-500">Parent Keyword</Label>
                <div className="text-sm text-gray-600">↳ {keyword.Parent_Keyword}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm">Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500">Intent</Label>
              <div className="mt-1">
                <Badge className={
                  keyword.Intent === 'Transactional' ? 'bg-green-100 text-green-800' :
                  keyword.Intent === 'Commercial' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }>
                  {keyword.Intent}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Search Volume</Label>
              <div className="text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-gray-400" />
                {keyword.Search_Volume.toLocaleString()}
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Keyword Difficulty</Label>
              <div className="mt-1">
                <Badge className={
                  keyword.Keyword_Difficulty <= 30 ? 'bg-green-100 text-green-800' :
                  keyword.Keyword_Difficulty <= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                } variant="outline">
                  {keyword.Keyword_Difficulty}
                </Badge>
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">CPC</Label>
              <div className="text-sm">${keyword.CPC.toFixed(2)}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">SERP Features</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {keyword.SERP_Features.map(feature => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm">Usage Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500">Campaign Usage</Label>
              <div className="flex items-center gap-2 mt-1">
                {keyword.Used_In_Campaign_Flag ? (
                  <>
                    <Badge className="bg-green-100 text-green-800">{keyword.Campaign_Usage_Count}x</Badge>
                    {keyword.Campaign_Last_Used_Date && (
                      <span className="text-xs text-gray-500">{keyword.Campaign_Last_Used_Date}</span>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-gray-500">Not used in campaigns</span>
                )}
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Content Usage</Label>
              <div className="flex items-center gap-2 mt-1">
                {keyword.Content_Usage_Count > 0 ? (
                  <>
                    <Badge className="bg-blue-100 text-blue-800">{keyword.Content_Usage_Count}x</Badge>
                    {keyword.Content_Last_Used_Date && (
                      <span className="text-xs text-gray-500">{keyword.Content_Last_Used_Date}</span>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-gray-500">Not used in content</span>
                )}
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Status</Label>
              <div className="mt-1">
                <Badge className={
                  keyword.Status === 'Active' ? 'bg-green-100 text-green-800' :
                  keyword.Status === 'Deprecated' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }>
                  {keyword.Status}
                </Badge>
              </div>
            </div>
            {keyword.Last_Audited_By && (
              <div>
                <Label className="text-xs text-gray-500">Last Audited</Label>
                <div className="text-xs text-gray-600">{keyword.Last_Audited_Date}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm">Synonyms & Technical Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Synonyms</Label>
              {keyword.Synonyms.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {keyword.Synonyms.map((syn, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {syn}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-500">No synonyms defined</span>
              )}
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Technical Terms</Label>
              {keyword.Technical_Terms.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {keyword.Technical_Terms.map((term, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                      {term}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-500">No technical terms defined</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm">Mapping & Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-gray-500">Country & Language</Label>
              <div className="flex gap-1 mt-1">
                <Badge variant="outline" className="text-xs">{keyword.Country}</Badge>
                <Badge variant="outline" className="text-xs">{keyword.Language}</Badge>
              </div>
            </div>
            {keyword.Industry_Name && (
              <div>
                <Label className="text-xs text-gray-500">Industry</Label>
                <div className="text-sm">{keyword.Industry_Name}</div>
              </div>
            )}
            {keyword.Service_Name && (
              <div>
                <Label className="text-xs text-gray-500">Service</Label>
                <div className="text-sm text-[#7A1C46]">{keyword.Service_Name}</div>
              </div>
            )}
            {keyword.Page_Name && (
              <div>
                <Label className="text-xs text-gray-500">CMS Page</Label>
                <div className="text-sm flex items-center gap-1">
                  {keyword.Page_Name}
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            )}
            {keyword.Competitor_IDs.length > 0 && (
              <div>
                <Label className="text-xs text-gray-500">Tracked Competitors</Label>
                <div className="text-sm">{keyword.Competitor_IDs.length} competitors</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {keyword.Notes && (
        <Card className="border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{keyword.Notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-2" />
          Edit Keyword
        </Button>
        <Button variant="outline">
          <ClipboardList className="w-4 h-4 mr-2" />
          Log Usage
        </Button>
        <Button variant="outline">
          <Globe2 className="w-4 h-4 mr-2" />
          View Competitor Map
        </Button>
      </div>
    </div>
  );
}

function UsageLogForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    keyword_id: '',
    usage_type: 'Campaign',
    linked_id: '',
    linked_name: '',
    count: '1',
    context: '',
    notes: '',
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Keyword *</Label>
        <Select value={formData.keyword_id} onValueChange={(value) => setFormData({ ...formData, keyword_id: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select keyword" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="KW001">enterprise cloud migration</SelectItem>
            <SelectItem value="KW002">cloud migration services</SelectItem>
            <SelectItem value="KW003">fintech seo strategies</SelectItem>
            <SelectItem value="KW004">saas content marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Usage Type *</Label>
        <Select value={formData.usage_type} onValueChange={(value) => setFormData({ ...formData, usage_type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Campaign">Campaign</SelectItem>
            <SelectItem value="Content">Content</SelectItem>
            <SelectItem value="SEO">SEO / On-Page</SelectItem>
            <SelectItem value="Paid">Paid Advertising</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Linked ID</Label>
          <Input
            value={formData.linked_id}
            onChange={(e) => setFormData({ ...formData, linked_id: e.target.value })}
            placeholder="e.g., CMP001, CNT015"
          />
        </div>

        <div className="space-y-2">
          <Label>Linked Name</Label>
          <Input
            value={formData.linked_name}
            onChange={(e) => setFormData({ ...formData, linked_name: e.target.value })}
            placeholder="e.g., Q4 SEO Campaign"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Usage Count</Label>
        <Input
          type="number"
          value={formData.count}
          onChange={(e) => setFormData({ ...formData, count: e.target.value })}
          placeholder="Number of times used"
        />
      </div>

      <div className="space-y-2">
        <Label>Context / Excerpt</Label>
        <Textarea
          value={formData.context}
          onChange={(e) => setFormData({ ...formData, context: e.target.value })}
          placeholder="Where/how was the keyword used?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes..."
          rows={2}
        />
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          This log entry will increment the keyword's usage count and update last used date automatically.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Add Log Entry
        </Button>
      </div>
    </div>
  );
}
