import { useState } from 'react';
import {
  FileDown, Table as TableIcon, RefreshCw, Target, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle2, ExternalLink, Link2, Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
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

interface SEOWeeklySnapshot {
  Snapshot_ID: string;
  Week_Start: string;
  Week_End: string;
  Campaign_ID: string;
  Campaign_Name: string;
  Target_Submissions: number;
  Actual_Submissions: number;
  Completion_Percent: number;
  QC_Pass_Percent: number;
  Avg_DA_Score: number;
  URLs_Published: number;
  At_Risk_Flag: boolean;
  Owner_User_ID: string;
  Owner_Name: string;
  Notes: string;
}

interface SEOCategorySnapshot {
  Category: string;
  Target: number;
  Actual: number;
  QC_Pass: number;
  Avg_DA: number;
}

interface SEODailyLog {
  Date: string;
  Submissions_Done: number;
  QC_Passed: number;
  QC_Failed: number;
  Avg_DA: number;
}

export default function SEOEffortDashboard() {
  const [selectedWeek, setSelectedWeek] = useState('2024-10-28_2024-11-03');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [selectedOwner, setSelectedOwner] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const [snapshot, setSnapshot] = useState<SEOWeeklySnapshot>(getMockSnapshot());
  const [notes, setNotes] = useState(snapshot.Notes);
  const [categoryData] = useState<SEOCategorySnapshot[]>(getMockCategoryData());
  const [dailyLogs] = useState<SEODailyLog[]>(getMockDailyLogs());
  const [historicalData] = useState(getMockHistoricalData());

  function getMockSnapshot(): SEOWeeklySnapshot {
    return {
      Snapshot_ID: 'SEO_SNAP001',
      Week_Start: '2024-10-28',
      Week_End: '2024-11-03',
      Campaign_ID: 'CMP001',
      Campaign_Name: 'Cloud Migration SEO Campaign',
      Target_Submissions: 500,
      Actual_Submissions: 385,
      Completion_Percent: 77,
      QC_Pass_Percent: 82,
      Avg_DA_Score: 58,
      URLs_Published: 315,
      At_Risk_Flag: true,
      Owner_User_ID: 'USR001',
      Owner_Name: 'John Smith',
      Notes: 'Need to increase submission rate. Focus on high DA sites (60+).'
    };
  }

  function getMockCategoryData(): SEOCategorySnapshot[] {
    return [
      { Category: 'Classified', Target: 100, Actual: 85, QC_Pass: 72, Avg_DA: 52 },
      { Category: 'Forum', Target: 75, Actual: 62, QC_Pass: 54, Avg_DA: 48 },
      { Category: 'Blog', Target: 50, Actual: 48, QC_Pass: 45, Avg_DA: 68 },
      { Category: 'Video', Target: 30, Actual: 22, QC_Pass: 20, Avg_DA: 72 },
      { Category: 'PDF', Target: 40, Actual: 38, QC_Pass: 35, Avg_DA: 65 },
      { Category: 'Social Bookmark', Target: 150, Actual: 105, QC_Pass: 88, Avg_DA: 45 },
      { Category: 'Guest Post', Target: 25, Actual: 15, QC_Pass: 14, Avg_DA: 78 },
      { Category: 'Article Directory', Target: 30, Actual: 10, QC_Pass: 8, Avg_DA: 42 }
    ];
  }

  function getMockDailyLogs(): SEODailyLog[] {
    return [
      { Date: '2024-10-28', Submissions_Done: 85, QC_Passed: 72, QC_Failed: 13, Avg_DA: 56 },
      { Date: '2024-10-29', Submissions_Done: 78, QC_Passed: 65, QC_Failed: 13, Avg_DA: 58 },
      { Date: '2024-10-30', Submissions_Done: 92, QC_Passed: 78, QC_Failed: 14, Avg_DA: 59 },
      { Date: '2024-10-31', Submissions_Done: 68, QC_Passed: 54, QC_Failed: 14, Avg_DA: 57 },
      { Date: '2024-11-01', Submissions_Done: 62, QC_Passed: 46, QC_Failed: 16, Avg_DA: 60 }
    ];
  }

  function getMockHistoricalData() {
    return [
      { week: 'Sep 9-15', actual: 425, target: 500 },
      { week: 'Sep 16-22', actual: 480, target: 500 },
      { week: 'Sep 23-29', actual: 515, target: 500 },
      { week: 'Sep 30-Oct 6', actual: 460, target: 500 },
      { week: 'Oct 7-13', actual: 390, target: 500 },
      { week: 'Oct 14-20', actual: 505, target: 500 },
      { week: 'Oct 21-27', actual: 445, target: 500 },
      { week: 'Oct 28-Nov 3', actual: 385, target: 500 }
    ];
  }

  const handleUpdateNotes = () => {
    setSnapshot({ ...snapshot, Notes: notes });
    toast.success('Action notes updated');
  };

  const categoryChartData = categoryData.map(cat => ({
    name: cat.Category,
    target: cat.Target,
    actual: cat.Actual
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#7A1C46]">🔗 SEO Effort Summary</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track SEO submission targets, actuals, QC pass rates, and DA scores
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
          <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
            <Target className="w-4 h-4 mr-2" />
            Rebaseline
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  <SelectItem value="CMP001">Cloud Migration SEO</SelectItem>
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
                  <SelectItem value="USR001">John Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-[#7A1C46]">
                {snapshot.Target_Submissions}
              </div>
              <div className="text-xs text-gray-600 mt-1">Target Submissions</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className={`text-2xl ${snapshot.Actual_Submissions >= snapshot.Target_Submissions ? 'text-green-600' : 'text-orange-600'}`}>
                {snapshot.Actual_Submissions}
              </div>
              <div className="text-xs text-gray-600 mt-1">Actual Submissions</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className={`text-2xl ${snapshot.Completion_Percent >= 80 ? 'text-green-600' : 'text-red-600'}`}>
                {snapshot.Completion_Percent}%
              </div>
              <div className="text-xs text-gray-600 mt-1">Completion</div>
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

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-blue-600">
                {snapshot.Avg_DA_Score}
              </div>
              <div className="text-xs text-gray-600 mt-1">Avg DA Score</div>
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
            <strong>SEO Campaign At Risk:</strong> Completion at {snapshot.Completion_Percent}% (below 80% threshold).
            QC pass rate at {snapshot.QC_Pass_Percent}% (target: 85%+). Immediate action required.
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="categories">📋 By Category</TabsTrigger>
          <TabsTrigger value="trends">📈 Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Category-wise Target vs Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} style={{ fontSize: '10px' }} />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="target" fill="#7A1C46" name="Target" />
                    <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Campaign Info */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Campaign Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-gray-600">Campaign</div>
                    <div>{snapshot.Campaign_Name}</div>
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
                    <div className="text-xs text-gray-600">Daily Target</div>
                    <div>{Math.round(snapshot.Target_Submissions / 5)} submissions/day</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Completion Progress</div>
                  <Progress value={snapshot.Completion_Percent} className={`h-2 ${snapshot.Completion_Percent >= 80 ? '' : '[&>div]:bg-red-600'}`} />
                  <div className="flex justify-between text-xs">
                    <span>{snapshot.Actual_Submissions} / {snapshot.Target_Submissions}</span>
                    <span className={snapshot.Completion_Percent >= 80 ? 'text-green-600' : 'text-red-600'}>
                      {snapshot.Completion_Percent}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-600">QC Pass Rate</div>
                  <Progress value={snapshot.QC_Pass_Percent} className={`h-2 ${snapshot.QC_Pass_Percent >= 85 ? '[&>div]:bg-green-600' : '[&>div]:bg-orange-600'}`} />
                  <div className="flex justify-between text-xs">
                    <span>Pass Threshold: 85%</span>
                    <span className={snapshot.QC_Pass_Percent >= 85 ? 'text-green-600' : 'text-orange-600'}>
                      {snapshot.QC_Pass_Percent}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Summary */}
            <Card className="border-[#E2E8F0] lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm">Daily Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4 text-center">
                  {dailyLogs.map((log, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border">
                      <div className="text-xs text-gray-600 mb-2">
                        {new Date(log.Date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-lg text-[#7A1C46]">{log.Submissions_Done}</div>
                      <div className="text-xs text-gray-500 mt-1">submissions</div>
                      <div className="flex gap-1 justify-center mt-2">
                        <Badge className="bg-green-100 text-green-800 text-xs">{log.QC_Passed} ✓</Badge>
                        <Badge className="bg-red-100 text-red-800 text-xs">{log.QC_Failed} ✗</Badge>
                      </div>
                      <div className="text-xs text-blue-600 mt-2">DA: {log.Avg_DA}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle>Category-Level Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Completion %</TableHead>
                      <TableHead>QC Passed</TableHead>
                      <TableHead>QC Pass %</TableHead>
                      <TableHead>Avg DA</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryData.map((cat, idx) => {
                      const completionPercent = (cat.Actual / cat.Target) * 100;
                      const qcPassPercent = (cat.QC_Pass / cat.Actual) * 100;
                      const isAtRisk = completionPercent < 80 || qcPassPercent < 85;

                      return (
                        <TableRow key={idx}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Link2 className="w-4 h-4 text-gray-400" />
                              {cat.Category}
                            </div>
                          </TableCell>
                          <TableCell>{cat.Target}</TableCell>
                          <TableCell>
                            <span className={completionPercent >= 80 ? 'text-green-600' : 'text-orange-600'}>
                              {cat.Actual}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className={completionPercent >= 80 ? 'text-green-600' : 'text-red-600'}>
                                {completionPercent.toFixed(0)}%
                              </div>
                              <Progress value={completionPercent} className={`h-1 ${completionPercent >= 80 ? '' : '[&>div]:bg-red-600'}`} />
                            </div>
                          </TableCell>
                          <TableCell>{cat.QC_Pass}</TableCell>
                          <TableCell>
                            <Badge className={qcPassPercent >= 85 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                              {qcPassPercent.toFixed(0)}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              cat.Avg_DA >= 60 ? 'bg-green-100 text-green-800' :
                              cat.Avg_DA >= 50 ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {cat.Avg_DA}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {isAtRisk ? (
                              <Badge className="bg-red-100 text-red-800">At Risk</Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-800">On Track</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
              <CardTitle>8-Week Submission Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
                  <Line type="monotone" dataKey="target" stroke="#7A1C46" strokeWidth={2} strokeDasharray="5 5" name="Target" />
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
                  <Badge className="bg-green-100 text-green-800">3/8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weeks Below Target:</span>
                  <Badge className="bg-orange-100 text-orange-800">5/8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Best Week:</span>
                  <span>Sep 23-29 (103%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Worst Week:</span>
                  <span>Oct 28-Nov 3 (77%)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">QC Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Pass Rate:</span>
                  <Badge className="bg-orange-100 text-orange-800">{snapshot.QC_Pass_Percent}%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">8-Week Avg:</span>
                  <span>84.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target:</span>
                  <span>85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trend:</span>
                  <div className="flex items-center gap-1 text-red-600">
                    <TrendingDown className="w-4 h-4" />
                    <span>-2.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">DA Score Trend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Avg:</span>
                  <Badge className="bg-blue-100 text-blue-800">{snapshot.Avg_DA_Score}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">8-Week Avg:</span>
                  <span>56.8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target:</span>
                  <span>60+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trend:</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+2.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Notes */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <CardTitle>📝 Action Plan & Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add action items, strategies, or observations..."
            rows={3}
          />
          <div className="flex justify-end">
            <Button onClick={handleUpdateNotes} className="bg-[#7A1C46] hover:bg-[#5A1434]">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Update Notes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
