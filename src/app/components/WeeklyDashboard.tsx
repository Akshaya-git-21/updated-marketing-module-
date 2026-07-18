import { useState } from 'react';
import { FileDown, Table as TableIcon, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import PerformanceIntelligenceCenter from './PerformanceIntelligenceCenter';
import EffortTrackingCenter from './EffortTrackingCenter';

interface WeeklyDashboardProps {
  onNavigate: (route: string) => void;
}

export default function WeeklyDashboard({ onNavigate }: WeeklyDashboardProps) {
  const [filters, setFilters] = useState({
    fiscal_year: 'FY2025',
    quarter: 'Q4',
    service: 'all',
    campaign_type: 'all',
    owner: 'all',
  });

  const weeklyActiveProjects = [
    { week: 'Week 40', value: 10 },
    { week: 'Week 41', value: 11 },
    { week: 'Week 42', value: 12 },
    { week: 'Week 43', value: 12 },
    { week: 'Week 44', value: 12 },
  ];

  const weeklyActiveCampaigns = [
    { week: 'Week 40', value: 28 },
    { week: 'Week 41', value: 30 },
    { week: 'Week 42', value: 32 },
    { week: 'Week 43', value: 34 },
    { week: 'Week 44', value: 34 },
  ];

  const weeklySEOScore = [
    { week: 'Week 40', value: 78 },
    { week: 'Week 41', value: 80 },
    { week: 'Week 42', value: 81 },
    { week: 'Week 43', value: 82 },
    { week: 'Week 44', value: 82 },
  ];

  const weeklyLanguageScore = [
    { week: 'Week 40', value: 85 },
    { week: 'Week 41', value: 87 },
    { week: 'Week 42', value: 88 },
    { week: 'Week 43', value: 89 },
    { week: 'Week 44', value: 89 },
  ];

  const weeklyContentProgress = [
    { week: 'Week 40', value: 58 },
    { week: 'Week 41', value: 62 },
    { week: 'Week 42', value: 65 },
    { week: 'Week 43', value: 66 },
    { week: 'Week 44', value: 68 },
  ];

  const weeklyToxicPct = [
    { week: 'Week 40', value: 4.5 },
    { week: 'Week 41', value: 4.2 },
    { week: 'Week 42', value: 3.8 },
    { week: 'Week 43', value: 3.5 },
    { week: 'Week 44', value: 3.2 },
  ];

  const campaignKPIData = [
    {
      campaign: 'Content Promotion',
      target: 50,
      actual: 42,
      variance: -8,
    },
    {
      campaign: 'Backlink Campaign',
      target: 30,
      actual: 28,
      variance: -2,
    },
    {
      campaign: 'Content Optimization',
      target: 40,
      actual: 45,
      variance: 5,
    },
    {
      campaign: 'Web Designing',
      target: 20,
      actual: 22,
      variance: 2,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Filters */}
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#7A1C46]">Weekly Snapshot</CardTitle>
              <p className="text-gray-600 mt-1">Performance metrics and trends</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FileDown className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline">
                <TableIcon className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Fiscal Year</Label>
              <Select
                value={filters.fiscal_year}
                onValueChange={(value) => setFilters({ ...filters, fiscal_year: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FY2024">FY2024</SelectItem>
                  <SelectItem value="FY2025">FY2025</SelectItem>
                  <SelectItem value="FY2026">FY2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quarter</Label>
              <Select
                value={filters.quarter}
                onValueChange={(value) => setFilters({ ...filters, quarter: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1</SelectItem>
                  <SelectItem value="Q2">Q2</SelectItem>
                  <SelectItem value="Q3">Q3</SelectItem>
                  <SelectItem value="Q4">Q4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Service</Label>
              <Select
                value={filters.service}
                onValueChange={(value) => setFilters({ ...filters, service: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="SRV001">Cloud Migration</SelectItem>
                  <SelectItem value="SRV002">AI Implementation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Campaign Type</Label>
              <Select
                value={filters.campaign_type}
                onValueChange={(value) => setFilters({ ...filters, campaign_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="content">Content Promotion</SelectItem>
                  <SelectItem value="backlink">Backlink Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Owner</Label>
              <Select
                value={filters.owner}
                onValueChange={(value) => setFilters({ ...filters, owner: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Weekly Analytics and Performance */}
      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">📊 Weekly Analytics</TabsTrigger>
          <TabsTrigger value="performance">🎯 Performance Intelligence</TabsTrigger>
          <TabsTrigger value="effort">⚙️ Effort Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-6">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Projects */}
        <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#7A1C46]" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyActiveProjects}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#7A1C46" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#7A1C46]" />
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyActiveCampaigns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#7A1C46" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Avg SEO Score */}
        <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Avg SEO Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklySEOScore}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Avg Language Score */}
        <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Avg Language Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyLanguageScore}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Progress */}
        <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Content Progress %
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyContentProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Toxic Backlink % */}
        <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Toxic Backlink %
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyToxicPct}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign KPI Table */}
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle>Campaign KPI vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Variance</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignKPIData.map((row) => (
                  <TableRow key={row.campaign}>
                    <TableCell>{row.campaign}</TableCell>
                    <TableCell>{row.target}</TableCell>
                    <TableCell>{row.actual}</TableCell>
                    <TableCell>
                      <span className={row.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {row.variance > 0 ? '+' : ''}
                        {row.variance}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#7A1C46] h-2 rounded-full"
                            style={{ width: `${Math.min((row.actual / row.target) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm">{Math.round((row.actual / row.target) * 100)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceIntelligenceCenter onNavigate={onNavigate} />
        </TabsContent>

        <TabsContent value="effort" className="mt-6">
          <EffortTrackingCenter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
