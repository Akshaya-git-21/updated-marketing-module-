import { useState } from 'react';
import { FilePlus2, FastForward, Gauge, AlertTriangle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface WorkingRepositoryHubProps {
  onNavigate: (route: string) => void;
}

export default function WorkingRepositoryHub({ onNavigate }: WorkingRepositoryHubProps) {
  const [activeTab, setActiveTab] = useState('Content_Repository');

  const contentRepositoryData = [
    {
      Content_ID: 'CNT001',
      Title: 'Complete Guide to Cloud Migration',
      Content_Type: 'Blog Post',
      Keyword_ID: 'KW001',
      Service_ID: 'SRV001',
      Stage_of_Buyer: 'Awareness',
      Status: 'Published',
      Owner: 'John Doe',
      Due_Date: '2024-10-15',
      Publish_Date: '2024-10-18',
      URL: '/blog/cloud-migration-guide',
      SEO_Score: 85,
      Language_Score: 92,
    },
    {
      Content_ID: 'CNT002',
      Title: 'AI Implementation Case Study',
      Content_Type: 'Case Studies',
      Keyword_ID: 'KW002',
      Service_ID: 'SRV002',
      Stage_of_Buyer: 'Evaluation',
      Status: 'Review',
      Owner: 'Jane Smith',
      Due_Date: '2024-11-05',
      Publish_Date: null,
      URL: null,
      SEO_Score: 78,
      Language_Score: 88,
    },
  ];

  const errorURLsData = [
    {
      Error_ID: 'ERR001',
      URL: '/old-services/outdated-page',
      Error_Type: '404 Not Found',
      Severity: 'High',
      Service_ID: 'SRV001',
      Found_Date: '2024-10-20',
      Owner: 'Tech Team',
      Fix_Due: '2024-11-03',
      Status: 'In Progress',
      Fixed_On: null,
    },
    {
      Error_ID: 'ERR002',
      URL: '/blog/broken-link',
      Error_Type: '500 Server Error',
      Severity: 'Critical',
      Service_ID: 'SRV002',
      Found_Date: '2024-10-22',
      Owner: 'Tech Team',
      Fix_Due: '2024-10-30',
      Status: 'Open',
      Fixed_On: null,
    },
  ];

  const toxicBacklinksData = [
    {
      Toxic_ID: 'TOX001',
      Backlink_ID: 'BL025',
      Reason: 'Low quality spam site',
      Toxicity_Score: 85,
      Status: 'Disavowed',
      Action_Taken: 'Added to disavow file',
      Reviewed_On: '2024-10-15',
    },
    {
      Toxic_ID: 'TOX002',
      Backlink_ID: 'BL037',
      Reason: 'Suspicious anchor text',
      Toxicity_Score: 72,
      Status: 'Under Review',
      Action_Taken: null,
      Reviewed_On: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
      case 'disavowed':
        return 'bg-green-100 text-green-800';
      case 'review':
      case 'in progress':
      case 'under review':
        return 'bg-yellow-100 text-yellow-800';
      case 'open':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'Content_Repository':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Content Repository</h3>
              <div className="flex gap-2">
                <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                  <FilePlus2 className="w-4 h-4 mr-2" />
                  New Content
                </Button>
                <Button variant="outline">
                  <FastForward className="w-4 h-4 mr-2" />
                  Bulk Move Stage
                </Button>
                <Button variant="outline">
                  <Gauge className="w-4 h-4 mr-2" />
                  Score Sync
                </Button>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>SEO Score</TableHead>
                    <TableHead>Lang Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentRepositoryData.map((content) => (
                    <TableRow key={content.Content_ID}>
                      <TableCell>{content.Content_ID}</TableCell>
                      <TableCell className="max-w-xs">{content.Title}</TableCell>
                      <TableCell>{content.Content_Type}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{content.Stage_of_Buyer}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(content.Status)}>{content.Status}</Badge>
                      </TableCell>
                      <TableCell>{content.Owner}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#7A1C46] h-2 rounded-full"
                              style={{ width: `${content.SEO_Score}%` }}
                            />
                          </div>
                          <span className="text-sm">{content.SEO_Score}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${content.Language_Score}%` }}
                            />
                          </div>
                          <span className="text-sm">{content.Language_Score}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'Error_URLs':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Error URLs</h3>
              <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                <AlertTriangle className="w-4 h-4 mr-2" />
                New Error
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Error ID</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Error Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Service ID</TableHead>
                    <TableHead>Found Date</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {errorURLsData.map((error) => (
                    <TableRow key={error.Error_ID}>
                      <TableCell>{error.Error_ID}</TableCell>
                      <TableCell className="max-w-xs truncate">{error.URL}</TableCell>
                      <TableCell>{error.Error_Type}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(error.Severity)}>{error.Severity}</Badge>
                      </TableCell>
                      <TableCell>{error.Service_ID}</TableCell>
                      <TableCell>{error.Found_Date}</TableCell>
                      <TableCell>{error.Owner}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(error.Status)}>{error.Status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'Toxic_Backlinks':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3>Toxic Backlinks</h3>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Import from Tool
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Toxic ID</TableHead>
                    <TableHead>Backlink ID</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Toxicity Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action Taken</TableHead>
                    <TableHead>Reviewed On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {toxicBacklinksData.map((toxic) => (
                    <TableRow key={toxic.Toxic_ID}>
                      <TableCell>{toxic.Toxic_ID}</TableCell>
                      <TableCell>{toxic.Backlink_ID}</TableCell>
                      <TableCell>{toxic.Reason}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${toxic.Toxicity_Score}%` }}
                            />
                          </div>
                          <span className="text-sm">{toxic.Toxicity_Score}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(toxic.Status)}>{toxic.Status}</Badge>
                      </TableCell>
                      <TableCell>{toxic.Action_Taken || '-'}</TableCell>
                      <TableCell>{toxic.Reviewed_On || '-'}</TableCell>
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
    <div className="max-w-7xl mx-auto">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Working Repository</CardTitle>
          <p className="text-gray-600">Active content, issues, and ongoing work items</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="Content_Repository">Content</TabsTrigger>
              <TabsTrigger value="Error_URLs">Error URLs</TabsTrigger>
              <TabsTrigger value="Toxic_Backlinks">Toxic Backlinks</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {renderTable()}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
