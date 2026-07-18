import { useState } from 'react';
import {
  FileDown, RefreshCw, Target, Image as ImageIcon, Video, FileText,
  Palette, AlertCircle, CheckCircle2, ExternalLink
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

interface DesignerWeeklySnapshot {
  Week_Start: string;
  Week_End: string;
  Campaign_Name: string;
  Target_Assets: number;
  Actual_Assets: number;
  Completion_Percent: number;
  Assets_Posted: number;
  QC_Pass_Percent: number;
  At_Risk_Flag: boolean;
  Owner_Name: string;
}

interface AssetTypeSnapshot {
  Asset_Type: string;
  Target_Count: number;
  Actual_Count: number;
  QC_Passed: number;
  Posted: number;
}

interface DesignerAsset {
  Date: string;
  Asset_Name: string;
  Asset_Type: string;
  QC_Score: number;
  QC_Status: string;
  Posted_URL: string;
  Campaign: string;
  Dimensions: string;
}

export default function DesignerEffortDashboard() {
  const [selectedWeek, setSelectedWeek] = useState('2024-10-28_2024-11-03');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const [snapshot] = useState<DesignerWeeklySnapshot>({
    Week_Start: '2024-10-28',
    Week_End: '2024-11-03',
    Campaign_Name: 'Cloud Migration Design Assets',
    Target_Assets: 25,
    Actual_Assets: 18,
    Completion_Percent: 72,
    Assets_Posted: 15,
    QC_Pass_Percent: 83.3,
    At_Risk_Flag: true,
    Owner_Name: 'Emma Wilson'
  });

  const [assetTypeData] = useState<AssetTypeSnapshot[]>([
    { Asset_Type: 'Infographic', Target_Count: 8, Actual_Count: 6, QC_Passed: 5, Posted: 5 },
    { Asset_Type: 'Social Media Graphics', Target_Count: 10, Actual_Count: 8, QC_Passed: 7, Posted: 6 },
    { Asset_Type: 'Banner Ads', Target_Count: 3, Actual_Count: 2, QC_Passed: 2, Posted: 2 },
    { Asset_Type: 'Thumbnail', Target_Count: 4, Actual_Count: 2, QC_Passed: 1, Posted: 2 }
  ]);

  const [assets] = useState<DesignerAsset[]>([
    {
      Date: '2024-10-28',
      Asset_Name: 'Cloud Migration Infographic',
      Asset_Type: 'Infographic',
      QC_Score: 9.2,
      QC_Status: 'Pass',
      Posted_URL: 'https://cdn.example.com/infographic-001.png',
      Campaign: 'Cloud Migration',
      Dimensions: '1200x3600'
    },
    {
      Date: '2024-10-29',
      Asset_Name: 'LinkedIn Post - Best Practices',
      Asset_Type: 'Social Media Graphics',
      QC_Score: 8.8,
      QC_Status: 'Pass',
      Posted_URL: 'https://cdn.example.com/social-002.jpg',
      Campaign: 'Cloud Migration',
      Dimensions: '1200x1200'
    },
    {
      Date: '2024-10-30',
      Asset_Name: 'Twitter Header - Cloud Security',
      Asset_Type: 'Social Media Graphics',
      QC_Score: 7.5,
      QC_Status: 'Rework',
      Posted_URL: '',
      Campaign: 'Cloud Migration',
      Dimensions: '1500x500'
    },
    {
      Date: '2024-10-31',
      Asset_Name: 'Banner Ad - Enterprise Cloud',
      Asset_Type: 'Banner Ads',
      QC_Score: 9.0,
      QC_Status: 'Pass',
      Posted_URL: 'https://cdn.example.com/banner-003.jpg',
      Campaign: 'Cloud Migration',
      Dimensions: '728x90'
    },
    {
      Date: '2024-11-01',
      Asset_Name: 'Video Thumbnail - Migration Guide',
      Asset_Type: 'Thumbnail',
      QC_Score: 8.5,
      QC_Status: 'Pass',
      Posted_URL: 'https://cdn.example.com/thumb-004.png',
      Campaign: 'Cloud Migration',
      Dimensions: '1280x720'
    }
  ]);

  const assetTypeChartData = assetTypeData.map(a => ({
    name: a.Asset_Type,
    target: a.Target_Count,
    actual: a.Actual_Count
  }));

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'Infographic': return <FileText className="w-4 h-4 text-purple-500" />;
      case 'Social Media Graphics': return <ImageIcon className="w-4 h-4 text-blue-500" />;
      case 'Banner Ads': return <Palette className="w-4 h-4 text-green-500" />;
      case 'Thumbnail': return <Video className="w-4 h-4 text-red-500" />;
      default: return <ImageIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[#7A1C46]">🎨 Designer Effort Summary</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track design asset creation, QC pass rates, and asset type distribution
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
                  <SelectItem value="CMP001">Cloud Migration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-[#7A1C46]">{snapshot.Target_Assets}</div>
              <div className="text-xs text-gray-600 mt-1">Target Assets</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className={`text-2xl ${snapshot.Actual_Assets >= snapshot.Target_Assets * 0.8 ? 'text-blue-600' : 'text-red-600'}`}>
                {snapshot.Actual_Assets}
              </div>
              <div className="text-xs text-gray-600 mt-1">Assets Created</div>
              <div className="text-xs text-gray-500 mt-1">({snapshot.Completion_Percent}%)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="py-4">
            <div className="text-center">
              <div className="text-2xl text-green-600">{snapshot.Assets_Posted}</div>
              <div className="text-xs text-gray-600 mt-1">Assets Posted</div>
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

      {/* At-Risk Alert */}
      {snapshot.At_Risk_Flag && (
        <Alert className="border-red-300 bg-red-50">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <AlertDescription>
            <strong>Design Assets At Risk:</strong> Completion at {snapshot.Completion_Percent}% (below 80% threshold).
            Need to increase production rate to meet weekly targets.
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="assets">📋 Asset Tracker</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Type Distribution */}
            <Card className="border-[#E2E8F0]">
              <CardHeader>
                <CardTitle className="text-sm">Asset Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={assetTypeChartData}>
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
                    <div className="text-xs text-gray-600">Designer</div>
                    <div>{snapshot.Owner_Name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Week Period</div>
                    <div>{new Date(snapshot.Week_Start).toLocaleDateString()} - {new Date(snapshot.Week_End).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Daily Target</div>
                    <div>{Math.round(snapshot.Target_Assets / 5)} assets/day</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Completion Progress</div>
                  <Progress value={snapshot.Completion_Percent} className={`h-2 ${snapshot.Completion_Percent >= 80 ? '' : '[&>div]:bg-red-600'}`} />
                  <div className="flex justify-between text-xs">
                    <span>{snapshot.Actual_Assets} / {snapshot.Target_Assets}</span>
                    <span className={snapshot.Completion_Percent >= 80 ? 'text-green-600' : 'text-red-600'}>
                      {snapshot.Completion_Percent}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Publishing Rate</div>
                  <Progress 
                    value={(snapshot.Assets_Posted / snapshot.Actual_Assets) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between text-xs">
                    <span>{snapshot.Assets_Posted} / {snapshot.Actual_Assets} posted</span>
                    <span className="text-blue-600">
                      {((snapshot.Assets_Posted / snapshot.Actual_Assets) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Asset Type Summary Table */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-sm">Asset Type Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Type</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>QC Passed</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetTypeData.map((type, idx) => {
                      const completion = (type.Actual_Count / type.Target_Count) * 100;
                      const qcRate = type.Actual_Count > 0 ? (type.QC_Passed / type.Actual_Count) * 100 : 0;
                      const isAtRisk = completion < 80;

                      return (
                        <TableRow key={idx}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getAssetIcon(type.Asset_Type)}
                              {type.Asset_Type}
                            </div>
                          </TableCell>
                          <TableCell>{type.Target_Count}</TableCell>
                          <TableCell>
                            <span className={completion >= 80 ? 'text-green-600' : 'text-orange-600'}>
                              {type.Actual_Count}
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
                            <div className="flex items-center gap-2">
                              <span>{type.QC_Passed}</span>
                              <Badge variant="outline" className="text-xs">
                                {qcRate.toFixed(0)}%
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>{type.Posted}</TableCell>
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

        {/* Assets Tab */}
        <TabsContent value="assets">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle>Asset QC Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Dimensions</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>QC Score</TableHead>
                      <TableHead>QC Status</TableHead>
                      <TableHead>Posted URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs">
                          {new Date(asset.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="text-sm">{asset.Asset_Name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getAssetIcon(asset.Asset_Type)}
                            <Badge variant="outline" className="text-xs">{asset.Asset_Type}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-gray-600">{asset.Dimensions}</TableCell>
                        <TableCell className="text-xs">{asset.Campaign}</TableCell>
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
                          <Badge className={asset.QC_Status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                            {asset.QC_Status}
                          </Badge>
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
