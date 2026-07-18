import { useState } from 'react';
import {
  FileDown, RefreshCw, Code, CheckCircle2, XCircle, AlertTriangle,
  ExternalLink, Globe, Smartphone, Monitor
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

interface WebDevWeeklySnapshot {
  Week_Start: string;
  Week_End: string;
  Campaign_Name: string;
  Target_Pages: number;
  Actual_Pages: number;
  Completion_Percent: number;
  QC_Passed: number;
  Pages_Published: number;
  Errors_Corrected: number;
  At_Risk_Flag: boolean;
  Owner_Name: string;
}

interface WebDevPage {
  Page_ID: string;
  Page_Name: string;
  Service: string;
  Sub_Service: string;
  QC_Status: string;
  Publish_Status: string;
  Error_Type: string;
  Fixed_On: string;
  Created_On: string;
  Responsive: boolean;
  SEO_Optimized: boolean;
}

export default function WebDevEffortDashboard() {
  const [selectedWeek, setSelectedWeek] = useState('2024-10-28_2024-11-03');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const [snapshot] = useState<WebDevWeeklySnapshot>({
    Week_Start: '2024-10-28',
    Week_End: '2024-11-03',
    Campaign_Name: 'Website Development Q4',
    Target_Pages: 12,
    Actual_Pages: 10,
    Completion_Percent: 83.3,
    QC_Passed: 8,
    Pages_Published: 7,
    Errors_Corrected: 15,
    At_Risk_Flag: false,
    Owner_Name: 'David Martinez'
  });

  const [pages] = useState<WebDevPage[]>([
    {
      Page_ID: 'PAGE001',
      Page_Name: 'Cloud Migration Services Landing Page',
      Service: 'Cloud Migration',
      Sub_Service: 'AWS Migration',
      QC_Status: 'Pass',
      Publish_Status: 'Published',
      Error_Type: '',
      Fixed_On: '',
      Created_On: '2024-10-28',
      Responsive: true,
      SEO_Optimized: true
    },
    {
      Page_ID: 'PAGE002',
      Page_Name: 'AI & ML Solutions Page',
      Service: 'AI & ML',
      Sub_Service: 'Machine Learning',
      QC_Status: 'Pass',
      Publish_Status: 'Published',
      Error_Type: '',
      Fixed_On: '',
      Created_On: '2024-10-29',
      Responsive: true,
      SEO_Optimized: true
    },
    {
      Page_ID: 'PAGE003',
      Page_Name: 'DevOps Automation Services',
      Service: 'DevOps',
      Sub_Service: 'CI/CD',
      QC_Status: 'Rework',
      Publish_Status: 'In QC',
      Error_Type: 'Mobile Responsive Issues',
      Fixed_On: '2024-10-31',
      Created_On: '2024-10-30',
      Responsive: false,
      SEO_Optimized: true
    },
    {
      Page_ID: 'PAGE004',
      Page_Name: 'Cybersecurity Services Overview',
      Service: 'Cybersecurity',
      Sub_Service: 'Security Audit',
      QC_Status: 'Pass',
      Publish_Status: 'Published',
      Error_Type: '',
      Fixed_On: '',
      Created_On: '2024-10-31',
      Responsive: true,
      SEO_Optimized: true
    },
    {
      Page_ID: 'PAGE005',
      Page_Name: 'Data Analytics Dashboard Demo',
      Service: 'Data Analytics',
      Sub_Service: 'Business Intelligence',
      QC_Status: 'Fail',
      Publish_Status: 'In Development',
      Error_Type: 'Performance Issues, SEO Missing',
      Fixed_On: '',
      Created_On: '2024-11-01',
      Responsive: true,
      SEO_Optimized: false
    }
  ]);

  const pagesVsErrorsData = [
    { week: 'Week 40', pages: 8, errors: 12 },
    { week: 'Week 41', pages: 10, errors: 18 },
    { week: 'Week 42', pages: 11, errors: 14 },
    { week: 'Week 43', pages: 9, errors: 10 },
    { week: 'Week 44', pages: 10, errors: 15 }
  ];

  const statusDistribution = [
    { name: 'Published', value: snapshot.Pages_Published, color: '#10b981' },
    { name: 'In QC', value: snapshot.QC_Passed - snapshot.Pages_Published, color: '#f59e0b' },
    { name: 'In Development', value: snapshot.Actual_Pages - snapshot.QC_Passed, color: '#3b82f6' }
  ];

  const errorTypes = [
    { type: 'Mobile Responsive', count: 5 },
    { type: 'SEO Missing', count: 3 },
    { type: 'Performance', count: 4 },
    { type: 'Accessibility', count: 2 },
    { type: 'Browser Compatibility', count: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#7A1C46]">💻 Web Developer Effort Summary</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track web page development, QC status, publishing, and error correction
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
              <Label className="text-xs">Campaign</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="CMP001">Website Development Q4</SelectItem>
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
              <div className="text-2xl text-[#7A1C46]">{snapshot.Target_Pages}</div>
              <div className="text-xs text-gray-600 mt-1">Target Pages</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-blue-600">{snapshot.Actual_Pages}</div>
              <div className="text-xs text-gray-600 mt-1">Pages Created</div>
              <div className="text-xs text-gray-500 mt-1">({snapshot.Completion_Percent.toFixed(0)}%)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-green-600">{snapshot.QC_Passed}</div>
              <div className="text-xs text-gray-600 mt-1">QC Passed</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-purple-600">{snapshot.Pages_Published}</div>
              <div className="text-xs text-gray-600 mt-1">Published</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-orange-600">{snapshot.Errors_Corrected}</div>
              <div className="text-xs text-gray-600 mt-1">Errors Fixed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Alert */}
      {!snapshot.At_Risk_Flag && (
        <Alert className="border-green-300 bg-green-50">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <AlertDescription>
            <strong>On Track:</strong> Web development at {snapshot.Completion_Percent.toFixed(0)}% with {snapshot.QC_Passed} pages passing QC.
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="pages">📋 Page Tracker</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pages vs Errors Chart */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Pages Created vs Errors Corrected</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pagesVsErrorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pages" stroke="#3b82f6" strokeWidth={2} name="Pages Created" />
                    <Line type="monotone" dataKey="errors" stroke="#f59e0b" strokeWidth={2} name="Errors Fixed" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Error Types */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Common Error Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={errorTypes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} style={{ fontSize: '10px' }} />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="count" fill="#f59e0b" name="Error Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Campaign Info */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Development Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-gray-600">Campaign</div>
                    <div>{snapshot.Campaign_Name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Developer</div>
                    <div>{snapshot.Owner_Name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Week Period</div>
                    <div>{new Date(snapshot.Week_Start).toLocaleDateString()} - {new Date(snapshot.Week_End).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Daily Target</div>
                    <div>{Math.round(snapshot.Target_Pages / 5)} pages/day</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Development Progress</div>
                  <Progress value={snapshot.Completion_Percent} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span>{snapshot.Actual_Pages} / {snapshot.Target_Pages}</span>
                    <span className="text-blue-600">{snapshot.Completion_Percent.toFixed(0)}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-600">QC Pass Rate</div>
                  <Progress value={(snapshot.QC_Passed / snapshot.Actual_Pages) * 100} className="h-2 [&>div]:bg-green-600" />
                  <div className="flex justify-between text-xs">
                    <span>{snapshot.QC_Passed} / {snapshot.Actual_Pages}</span>
                    <span className="text-green-600">
                      {((snapshot.QC_Passed / snapshot.Actual_Pages) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Publishing Rate</div>
                  <Progress value={(snapshot.Pages_Published / snapshot.Actual_Pages) * 100} className="h-2 [&>div]:bg-purple-600" />
                  <div className="flex justify-between text-xs">
                    <span>{snapshot.Pages_Published} / {snapshot.Actual_Pages}</span>
                    <span className="text-purple-600">
                      {((snapshot.Pages_Published / snapshot.Actual_Pages) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Page Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {statusDistribution.map((status, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{status.name}</span>
                      <Badge style={{ backgroundColor: status.color, color: 'white' }}>
                        {status.value}
                      </Badge>
                    </div>
                    <Progress 
                      value={(status.value / snapshot.Actual_Pages) * 100} 
                      className="h-2"
                      style={{ ['--progress-background' as string]: status.color } as React.CSSProperties}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle>Page QC & Publishing Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page Name</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Sub-Service</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>QC Status</TableHead>
                      <TableHead>Publish Status</TableHead>
                      <TableHead>Responsive</TableHead>
                      <TableHead>SEO</TableHead>
                      <TableHead>Error Type</TableHead>
                      <TableHead>Fixed On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map((page) => (
                      <TableRow key={page.Page_ID}>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="flex items-center gap-2 text-sm">
                              <Code className="w-4 h-4 text-gray-400" />
                              {page.Page_Name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{page.Service}</TableCell>
                        <TableCell className="text-xs text-gray-600">{page.Sub_Service}</TableCell>
                        <TableCell className="text-xs">
                          {new Date(page.Created_On).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            page.QC_Status === 'Pass' ? 'bg-green-100 text-green-800' :
                            page.QC_Status === 'Rework' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {page.QC_Status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            page.Publish_Status === 'Published' ? 'bg-purple-100 text-purple-800' :
                            page.Publish_Status === 'In QC' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {page.Publish_Status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {page.Responsive ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </TableCell>
                        <TableCell>
                          {page.SEO_Optimized ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                        </TableCell>
                        <TableCell>
                          {page.Error_Type ? (
                            <div className="max-w-xs">
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                                {page.Error_Type}
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-gray-600">
                          {page.Fixed_On ? new Date(page.Fixed_On).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
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
