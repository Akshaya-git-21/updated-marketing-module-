import { useState } from 'react';
import { Plus, Link2, Rocket, Upload, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import CompetitorHub from './CompetitorHub';
import KeywordMasterHub from './KeywordMasterHub';
import TargetPlannerHub from './TargetPlannerHub';
import ResourceManagementHub from './ResourceManagementHub';
import BacklinkMasterHub from './BacklinkMasterHub';

type Route = 'Wizard_NewService' | 'PM_Hub';

interface MasterDataHubProps {
  onNavigate: (route: Route) => void;
}

export default function MasterDataHub({ onNavigate }: MasterDataHubProps) {
  const [activeTab, setActiveTab] = useState('Keyword_Master');

  const serviceMasterData = [
    {
      Service_ID: 'SRV001',
      Service_Name: 'Cloud Migration Consulting',
      Service_Category: 'Consulting',
      Service_Type: 'Professional Services',
      Industry: 'Technology, Finance',
      Country: 'USA, UK',
      Regulation: 'GDPR, SOC2',
      Asset_Type: 'Service',
      Fiscal_Year: 'FY2025',
      Primary_URL: '/services/cloud-migration',
      Status: 'Active',
    },
    {
      Service_ID: 'SRV002',
      Service_Name: 'AI/ML Implementation',
      Service_Category: 'Technology',
      Service_Type: 'Implementation',
      Industry: 'Healthcare, Retail',
      Country: 'USA, Canada',
      Regulation: 'HIPAA',
      Asset_Type: 'Service',
      Fiscal_Year: 'FY2025',
      Primary_URL: '/services/ai-ml',
      Status: 'Active',
    },
  ];

  const keywordMasterData = [
    {
      Keyword_ID: 'KW001',
      Keyword: 'cloud migration services',
      Keyword_Type: 'Primary',
      Intent: 'Commercial',
      Priority: 'High',
      Target_Service_ID: 'SRV001',
      Target_Industry: 'Technology',
      Target_Country: 'USA',
    },
    {
      Keyword_ID: 'KW002',
      Keyword: 'AI implementation consulting',
      Keyword_Type: 'Primary',
      Intent: 'Commercial',
      Priority: 'High',
      Target_Service_ID: 'SRV002',
      Target_Industry: 'Healthcare',
      Target_Country: 'USA',
    },
  ];

  const backlinkMasterData = [
    {
      Backlink_ID: 'BL001',
      Source_URL: 'https://techblog.example.com/cloud-trends',
      Target_URL: '/services/cloud-migration',
      Domain_Authority: 72,
      Source_Type: 'Blog',
      Competitor_ID: null,
      Toxic_Flag: false,
      Notes: 'Guest post',
    },
    {
      Backlink_ID: 'BL002',
      Source_URL: 'https://industry-news.example.com/ai-guide',
      Target_URL: '/services/ai-ml',
      Domain_Authority: 65,
      Source_Type: 'Article',
      Competitor_ID: null,
      Toxic_Flag: false,
      Notes: 'Mentioned in roundup',
    },
  ];

  const siteServiceMasterData = [
    {
      Page_ID: 'PG001',
      URL: '/services/cloud-migration',
      Service_ID: 'SRV001',
      Status: 'Published',
      Last_Updated: '2024-10-28',
    },
    {
      Page_ID: 'PG002',
      URL: '/services/ai-ml',
      Service_ID: 'SRV002',
      Status: 'Published',
      Last_Updated: '2024-10-25',
    },
  ];

  const competitorMasterData = [
    {
      Competitor_ID: 'COMP001',
      Competitor_Name: 'TechConsult Inc',
      Website: 'https://techconsult.example.com',
      Industry: 'Technology',
      Notes: 'Main competitor in cloud space',
    },
    {
      Competitor_ID: 'COMP002',
      Competitor_Name: 'AI Solutions Group',
      Website: 'https://aisolutions.example.com',
      Industry: 'Technology',
      Notes: 'Focus on AI/ML services',
    },
  ];

  const variableMasterData = [
    { Variable_ID: 'VAR001', Variable_Category: 'Industries', Variable_Value: 'Technology' },
    { Variable_ID: 'VAR002', Variable_Category: 'Industries', Variable_Value: 'Healthcare' },
    { Variable_ID: 'VAR003', Variable_Category: 'Countries', Variable_Value: 'USA' },
    { Variable_ID: 'VAR004', Variable_Category: 'Countries', Variable_Value: 'UK' },
  ];

  const renderTable = () => {
    switch (activeTab) {
      case 'Service_Master':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Services Master Data</h3>
              <div className="flex gap-2">
                <Button onClick={() => onNavigate('Wizard_NewService')} className="bg-[#7A1C46] hover:bg-[#5A1434]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
                <Button variant="outline">
                  <Link2 className="w-4 h-4 mr-2" />
                  Link Pages
                </Button>
                <Button variant="outline" onClick={() => onNavigate('PM_Hub')}>
                  <Rocket className="w-4 h-4 mr-2" />
                  Open in Projects
                </Button>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service ID</TableHead>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceMasterData.map((service) => (
                    <TableRow key={service.Service_ID}>
                      <TableCell>{service.Service_ID}</TableCell>
                      <TableCell>{service.Service_Name}</TableCell>
                      <TableCell>{service.Service_Category}</TableCell>
                      <TableCell>{service.Industry}</TableCell>
                      <TableCell>{service.Country}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{service.Status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'Keyword_Master':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Keywords Master Data</h3>
              <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                <Plus className="w-4 h-4 mr-2" />
                Add Keyword
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword ID</TableHead>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Intent</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Target Service</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywordMasterData.map((keyword) => (
                    <TableRow key={keyword.Keyword_ID}>
                      <TableCell>{keyword.Keyword_ID}</TableCell>
                      <TableCell>{keyword.Keyword}</TableCell>
                      <TableCell>{keyword.Keyword_Type}</TableCell>
                      <TableCell>{keyword.Intent}</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">{keyword.Priority}</Badge>
                      </TableCell>
                      <TableCell>{keyword.Target_Service_ID}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'Backlink_Master':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Backlinks Master Data</h3>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Backlink ID</TableHead>
                    <TableHead>Source URL</TableHead>
                    <TableHead>Target URL</TableHead>
                    <TableHead>DA</TableHead>
                    <TableHead>Source Type</TableHead>
                    <TableHead>Toxic</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backlinkMasterData.map((backlink) => (
                    <TableRow key={backlink.Backlink_ID}>
                      <TableCell>{backlink.Backlink_ID}</TableCell>
                      <TableCell className="max-w-xs truncate">{backlink.Source_URL}</TableCell>
                      <TableCell>{backlink.Target_URL}</TableCell>
                      <TableCell>{backlink.Domain_Authority}</TableCell>
                      <TableCell>{backlink.Source_Type}</TableCell>
                      <TableCell>
                        <Badge className={backlink.Toxic_Flag ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          {backlink.Toxic_Flag ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'Site_Service_Master':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Site Services (CMS)</h3>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Crawl & Refresh
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page ID</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Service ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {siteServiceMasterData.map((page) => (
                    <TableRow key={page.Page_ID}>
                      <TableCell>{page.Page_ID}</TableCell>
                      <TableCell>{page.URL}</TableCell>
                      <TableCell>{page.Service_ID}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{page.Status}</Badge>
                      </TableCell>
                      <TableCell>{page.Last_Updated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'Competitor_Master':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Competitors Master Data</h3>
              <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                <Plus className="w-4 h-4 mr-2" />
                Add Competitor
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Competitor ID</TableHead>
                    <TableHead>Competitor Name</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitorMasterData.map((competitor) => (
                    <TableRow key={competitor.Competitor_ID}>
                      <TableCell>{competitor.Competitor_ID}</TableCell>
                      <TableCell>{competitor.Competitor_Name}</TableCell>
                      <TableCell>{competitor.Website}</TableCell>
                      <TableCell>{competitor.Industry}</TableCell>
                      <TableCell>{competitor.Notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'Variable_Master':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Dropdown Variables</h3>
              <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                <Plus className="w-4 h-4 mr-2" />
                Add Variable
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variable ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variableMasterData.map((variable) => (
                    <TableRow key={variable.Variable_ID}>
                      <TableCell>{variable.Variable_ID}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{variable.Variable_Category}</Badge>
                      </TableCell>
                      <TableCell>{variable.Variable_Value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Master Data Hub</CardTitle>
          <p className="text-gray-600">Central repository for all marketing data entities</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="Keyword_Master">Keywords</TabsTrigger>
              <TabsTrigger value="Backlink_Master">Backlinks</TabsTrigger>
              <TabsTrigger value="Competitor_Master">Competitors</TabsTrigger>
              <TabsTrigger value="Target_Planner">Target Planner</TabsTrigger>
              <TabsTrigger value="Resource_Management">Resources</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {activeTab === 'Keyword_Master' && <KeywordMasterHub />}
              {activeTab === 'Backlink_Master' && <BacklinkMasterHub />}
              {activeTab === 'Competitor_Master' && <CompetitorHub />}
              {activeTab === 'Target_Planner' && <TargetPlannerHub />}
              {activeTab === 'Resource_Management' && <ResourceManagementHub />}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}