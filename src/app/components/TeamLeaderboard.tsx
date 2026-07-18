import { useState } from 'react';
import { Award, TrendingUp, TrendingDown, Minus, Trophy, Star, Zap, Target, RefreshCcw, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface UserPerformanceScore {
  Score_ID: string;
  User_ID: string;
  User_Name: string;
  Reporting_Period: string;
  Category: string;
  Total_Metrics_Assigned: number;
  Metrics_Met: number;
  Metrics_Exceeded: number;
  Weighted_Achievement_Percent: number;
  Overall_Score: number;
  Rank_Position: number;
  Performance_Trend: string;
  Badges: string[];
  Remarks: string;
  Last_Updated: string;
}

export default function TeamLeaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock Performance Score Data
  const performanceScores: UserPerformanceScore[] = [
    {
      Score_ID: 'SCR001',
      User_ID: 'USR001',
      User_Name: 'Alice Johnson',
      Reporting_Period: 'Week 44, 2024',
      Category: 'Content',
      Total_Metrics_Assigned: 12,
      Metrics_Met: 10,
      Metrics_Exceeded: 5,
      Weighted_Achievement_Percent: 0.96,
      Overall_Score: 96,
      Rank_Position: 1,
      Performance_Trend: 'Up',
      Badges: ['🏆 Top Performer', '🌟 Consistency Star', '⚡ Speed Champion'],
      Remarks: 'Outstanding performance across all content KPIs',
      Last_Updated: '2024-11-01',
    },
    {
      Score_ID: 'SCR002',
      User_ID: 'USR002',
      User_Name: 'Bob Wilson',
      Reporting_Period: 'Week 44, 2024',
      Category: 'SEO',
      Total_Metrics_Assigned: 10,
      Metrics_Met: 8,
      Metrics_Exceeded: 3,
      Weighted_Achievement_Percent: 0.84,
      Overall_Score: 84,
      Rank_Position: 2,
      Performance_Trend: 'Up',
      Badges: ['🌟 Consistent Performer'],
      Remarks: 'Strong SEO performance, keyword rankings improving',
      Last_Updated: '2024-11-01',
    },
    {
      Score_ID: 'SCR003',
      User_ID: 'USR003',
      User_Name: 'Charlie Davis',
      Reporting_Period: 'Week 44, 2024',
      Category: 'SEO',
      Total_Metrics_Assigned: 8,
      Metrics_Met: 7,
      Metrics_Exceeded: 4,
      Weighted_Achievement_Percent: 0.91,
      Overall_Score: 91,
      Rank_Position: 3,
      Performance_Trend: 'Up',
      Badges: ['🏆 Top Performer', '🎯 Goal Crusher'],
      Remarks: 'Excellent backlink acquisition and quality',
      Last_Updated: '2024-11-01',
    },
    {
      Score_ID: 'SCR004',
      User_ID: 'USR004',
      User_Name: 'Diana Smith',
      Reporting_Period: 'Week 44, 2024',
      Category: 'Content',
      Total_Metrics_Assigned: 11,
      Metrics_Met: 8,
      Metrics_Exceeded: 2,
      Weighted_Achievement_Percent: 0.76,
      Overall_Score: 76,
      Rank_Position: 4,
      Performance_Trend: 'Stable',
      Badges: ['🌟 Consistent Performer'],
      Remarks: 'Good performance, focus on engagement metrics',
      Last_Updated: '2024-11-01',
    },
    {
      Score_ID: 'SCR005',
      User_ID: 'USR005',
      User_Name: 'Emily Chen',
      Reporting_Period: 'Week 44, 2024',
      Category: 'Lead Gen',
      Total_Metrics_Assigned: 9,
      Metrics_Met: 9,
      Metrics_Exceeded: 6,
      Weighted_Achievement_Percent: 0.98,
      Overall_Score: 98,
      Rank_Position: 5,
      Performance_Trend: 'Up',
      Badges: ['🏆 Top Performer', '💎 Quality Leader', '⚡ Speed Champion'],
      Remarks: 'Exceptional lead generation and conversion rates',
      Last_Updated: '2024-11-01',
    },
    {
      Score_ID: 'SCR006',
      User_ID: 'USR006',
      User_Name: 'Frank Miller',
      Reporting_Period: 'Week 44, 2024',
      Category: 'SMM',
      Total_Metrics_Assigned: 10,
      Metrics_Met: 7,
      Metrics_Exceeded: 2,
      Weighted_Achievement_Percent: 0.72,
      Overall_Score: 72,
      Rank_Position: 6,
      Performance_Trend: 'Down',
      Badges: ['⚙️ Needs Support'],
      Remarks: 'Engagement rates below target, needs strategy review',
      Last_Updated: '2024-11-01',
    },
    {
      Score_ID: 'SCR007',
      User_ID: 'USR007',
      User_Name: 'Grace Lee',
      Reporting_Period: 'Week 44, 2024',
      Category: 'Design',
      Total_Metrics_Assigned: 7,
      Metrics_Met: 6,
      Metrics_Exceeded: 3,
      Weighted_Achievement_Percent: 0.88,
      Overall_Score: 88,
      Rank_Position: 7,
      Performance_Trend: 'Up',
      Badges: ['🏆 Top Performer', '🎨 Creative Excellence'],
      Remarks: 'High-quality design assets, excellent turnaround time',
      Last_Updated: '2024-11-01',
    },
    {
      Score_ID: 'SCR008',
      User_ID: 'USR008',
      User_Name: 'Henry Park',
      Reporting_Period: 'Week 44, 2024',
      Category: 'Technical',
      Total_Metrics_Assigned: 6,
      Metrics_Met: 4,
      Metrics_Exceeded: 1,
      Weighted_Achievement_Percent: 0.58,
      Overall_Score: 58,
      Rank_Position: 8,
      Performance_Trend: 'Down',
      Badges: ['🚨 Review Required'],
      Remarks: 'Technical debt accumulating, needs immediate attention',
      Last_Updated: '2024-11-01',
    },
  ];

  // Sort by rank
  const sortedScores = [...performanceScores].sort((a, b) => b.Overall_Score - a.Overall_Score);

  // Category-wise averages
  const categoryData = performanceScores.reduce((acc, score) => {
    if (!acc[score.Category]) {
      acc[score.Category] = { total: 0, count: 0 };
    }
    acc[score.Category].total += score.Overall_Score;
    acc[score.Category].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const categoryChartData = Object.entries(categoryData).map(([category, data]) => ({
    category,
    average: Math.round(data.total / data.count),
  }));

  // Performance distribution
  const distributionData = [
    { range: '90-100', count: sortedScores.filter(s => s.Overall_Score >= 90).length },
    { range: '75-89', count: sortedScores.filter(s => s.Overall_Score >= 75 && s.Overall_Score < 90).length },
    { range: '60-74', count: sortedScores.filter(s => s.Overall_Score >= 60 && s.Overall_Score < 75).length },
    { range: '0-59', count: sortedScores.filter(s => s.Overall_Score < 60).length },
  ];

  // Historical trend (mock data)
  const trendData = [
    { period: 'Week 40', Alice: 92, Bob: 81, Charlie: 88, Diana: 74, Emily: 95 },
    { period: 'Week 41', Alice: 94, Bob: 82, Charlie: 89, Diana: 75, Emily: 96 },
    { period: 'Week 42', Alice: 95, Bob: 83, Charlie: 90, Diana: 75, Emily: 97 },
    { period: 'Week 43', Alice: 95, Bob: 84, Charlie: 90, Diana: 76, Emily: 97 },
    { period: 'Week 44', Alice: 96, Bob: 84, Charlie: 91, Diana: 76, Emily: 98 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'Stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3: return <Trophy className="w-5 h-5 text-orange-500" />;
      default: return <span className="text-sm text-gray-600">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600">Top Performer</div>
                <div className="text-lg font-medium text-[#7A1C46]">
                  {sortedScores[0]?.User_Name}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600">Team Average</div>
                <div className="text-lg font-medium text-[#7A1C46]">
                  {Math.round(sortedScores.reduce((sum, s) => sum + s.Overall_Score, 0) / sortedScores.length)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600">Above 90%</div>
                <div className="text-lg font-medium text-[#7A1C46]">
                  {sortedScores.filter(s => s.Overall_Score >= 90).length} members
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xs text-gray-600">Total Badges</div>
                <div className="text-lg font-medium text-[#7A1C46]">
                  {sortedScores.reduce((sum, s) => sum + s.Badges.length, 0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Content">Content</SelectItem>
            <SelectItem value="SEO">SEO</SelectItem>
            <SelectItem value="SMM">SMM</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Recompute
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="leaderboard">
        <TabsList>
          <TabsTrigger value="leaderboard">🏆 Leaderboard</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          <TabsTrigger value="badges">🎖️ Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="mt-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {sortedScores.slice(0, 3).map((score, index) => (
              <Card 
                key={score.Score_ID} 
                className={`border-2 ${
                  index === 0 ? 'border-yellow-400' : 
                  index === 1 ? 'border-gray-400' : 
                  'border-orange-400'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    {getRankIcon(index + 1)}
                  </div>
                  <div className="font-medium text-lg mb-1">{score.User_Name}</div>
                  <div className="text-xs text-gray-600 mb-3">{score.Category}</div>
                  <div className={`text-4xl font-medium mb-2 ${getScoreColor(score.Overall_Score)}`}>
                    {score.Overall_Score}%
                  </div>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {getTrendIcon(score.Performance_Trend)}
                    <span className="text-xs text-gray-600">
                      {score.Metrics_Exceeded} exceeded
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {score.Badges.slice(0, 2).map((badge, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {badge.split(' ')[0]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard Table */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#7A1C46]">Full Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Metrics</TableHead>
                      <TableHead>Badges</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedScores.map((score, index) => (
                      <TableRow key={score.Score_ID}>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {getRankIcon(index + 1)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{score.User_Name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{score.Category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`text-lg font-medium ${getScoreColor(score.Overall_Score)}`}>
                              {score.Overall_Score}%
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-32">
                            <Progress value={score.Overall_Score} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{getTrendIcon(score.Performance_Trend)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-green-600">{score.Metrics_Exceeded} exceeded</div>
                            <div className="text-blue-600">{score.Metrics_Met} met</div>
                            <div className="text-gray-600 text-xs">of {score.Total_Metrics_Assigned} total</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {score.Badges.map((badge, i) => (
                              <span key={i} className="text-xs">
                                {badge.split(' ')[0]}
                              </span>
                            ))}
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

        <TabsContent value="analytics" className="mt-6 space-y-6">
          {/* Score Distribution */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#7A1C46]">Overall Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#7A1C46" name="Number of Users" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Averages */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#7A1C46]">Category-wise Average Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="#10B981" name="Average Score %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Personal Progress Tracker */}
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#7A1C46]">Personal Progress Tracker (Top 5)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Alice" stroke="#7A1C46" strokeWidth={2} />
                  <Line type="monotone" dataKey="Bob" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Charlie" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Diana" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="Emily" stroke="#8B5CF6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <Card className="border-[#E2E8F0]">
            <CardHeader>
              <CardTitle className="text-[#7A1C46]">Badges & Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedScores.filter(s => s.Badges.length > 0).map((score) => (
                  <Card key={score.Score_ID} className="border-[#E2E8F0]">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-medium">{score.User_Name}</div>
                          <div className="text-xs text-gray-600">{score.Category}</div>
                        </div>
                        <div className={`text-xl font-medium ${getScoreColor(score.Overall_Score)}`}>
                          {score.Overall_Score}%
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {score.Badges.map((badge, i) => (
                          <Badge key={i} className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600 border-t pt-2">
                        {score.Remarks}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
