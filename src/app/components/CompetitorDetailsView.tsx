import { ExternalLink, Link2, TrendingUp, Target, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

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
  Estimated_Traffic_Month: number;
  Status: string;
  Last_Reviewed: string;
  Last_Updated: string;
  Notes: string;
}

interface CompetitorBacklink {
  Backlink_ID: string;
  Competitor_ID: string;
  Source_Domain: string;
  Source_URL: string;
  Target_URL: string;
  Anchor_Text: string;
  Link_Type: string;
  DA_Score: number;
  PA_Score: number;
  Spam_Score: number;
  First_Seen: string;
  Last_Checked: string;
  Status: string;
  Notes: string;
}

interface CompetitorKeyword {
  Keyword_ID: string;
  Competitor_ID: string;
  Keyword: string;
  Ranking_Position: number;
  Search_Volume: number;
  Keyword_Difficulty: number;
  CPC: number;
  Traffic_Estimate: number;
  Landing_URL: string;
  Intent: string;
  Priority: string;
  Our_Position: number | null;
  Gap_Type: string;
  Last_Updated: string;
}

interface CompetitorDetailsViewProps {
  competitor: Competitor | null;
}

export default function CompetitorDetailsView({ competitor }: CompetitorDetailsViewProps) {
  if (!competitor) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Select a competitor from the list to view details</p>
      </div>
    );
  }

  // Mock data for competitor backlinks
  const competitorBacklinks: CompetitorBacklink[] = [
    {
      Backlink_ID: 'CBL001',
      Competitor_ID: competitor.Competitor_ID,
      Source_Domain: 'techcrunch.com',
      Source_URL: 'https://techcrunch.com/2024/10/cloud-trends',
      Target_URL: `${competitor.Main_URL}/seo-services`,
      Anchor_Text: 'enterprise SEO solutions',
      Link_Type: 'DoFollow',
      DA_Score: 93,
      PA_Score: 88,
      Spam_Score: 1,
      First_Seen: '2024-08-15',
      Last_Checked: '2024-10-28',
      Status: 'Active',
      Notes: 'High authority editorial link'
    },
    {
      Backlink_ID: 'CBL002',
      Competitor_ID: competitor.Competitor_ID,
      Source_Domain: 'forbes.com',
      Source_URL: 'https://forbes.com/digital-marketing-trends',
      Target_URL: `${competitor.Main_URL}/content-marketing`,
      Anchor_Text: 'content marketing experts',
      Link_Type: 'DoFollow',
      DA_Score: 95,
      PA_Score: 90,
      Spam_Score: 1,
      First_Seen: '2024-09-10',
      Last_Checked: '2024-10-29',
      Status: 'Active',
      Notes: 'Featured in Forbes article'
    },
    {
      Backlink_ID: 'CBL003',
      Competitor_ID: competitor.Competitor_ID,
      Source_Domain: 'medium.com',
      Source_URL: 'https://medium.com/@marketingguru/seo-tools-2024',
      Target_URL: `${competitor.Main_URL}/tools`,
      Anchor_Text: 'SEO tools',
      Link_Type: 'DoFollow',
      DA_Score: 95,
      PA_Score: 72,
      Spam_Score: 2,
      First_Seen: '2024-07-20',
      Last_Checked: '2024-10-27',
      Status: 'Active',
      Notes: 'Blog mention'
    },
    {
      Backlink_ID: 'CBL004',
      Competitor_ID: competitor.Competitor_ID,
      Source_Domain: 'reddit.com',
      Source_URL: 'https://reddit.com/r/SEO/comments/best-agencies',
      Target_URL: competitor.Main_URL,
      Anchor_Text: competitor.Competitor_Name,
      Link_Type: 'NoFollow',
      DA_Score: 91,
      PA_Score: 85,
      Spam_Score: 2,
      First_Seen: '2024-09-05',
      Last_Checked: '2024-10-28',
      Status: 'Active',
      Notes: 'Community recommendation'
    },
    {
      Backlink_ID: 'CBL005',
      Competitor_ID: competitor.Competitor_ID,
      Source_Domain: 'entrepreneur.com',
      Source_URL: 'https://entrepreneur.com/marketing-agencies-guide',
      Target_URL: `${competitor.Main_URL}/case-studies`,
      Anchor_Text: 'successful digital marketing campaigns',
      Link_Type: 'DoFollow',
      DA_Score: 89,
      PA_Score: 82,
      Spam_Score: 1,
      First_Seen: '2024-06-12',
      Last_Checked: '2024-10-30',
      Status: 'Active',
      Notes: 'Case study feature'
    }
  ];

  // Mock data for competitor keywords
  const competitorKeywords: CompetitorKeyword[] = [
    {
      Keyword_ID: 'CKW001',
      Competitor_ID: competitor.Competitor_ID,
      Keyword: 'enterprise seo services',
      Ranking_Position: 2,
      Search_Volume: 4800,
      Keyword_Difficulty: 72,
      CPC: 15.50,
      Traffic_Estimate: 1920,
      Landing_URL: `${competitor.Main_URL}/seo-services`,
      Intent: 'Commercial',
      Priority: 'High',
      Our_Position: 8,
      Gap_Type: 'We Rank Lower',
      Last_Updated: '2024-10-30'
    },
    {
      Keyword_ID: 'CKW002',
      Competitor_ID: competitor.Competitor_ID,
      Keyword: 'b2b content marketing',
      Ranking_Position: 5,
      Search_Volume: 3200,
      Keyword_Difficulty: 65,
      CPC: 12.80,
      Traffic_Estimate: 960,
      Landing_URL: `${competitor.Main_URL}/content-marketing`,
      Intent: 'Commercial',
      Priority: 'High',
      Our_Position: null,
      Gap_Type: 'Not Ranking',
      Last_Updated: '2024-10-29'
    },
    {
      Keyword_ID: 'CKW003',
      Competitor_ID: competitor.Competitor_ID,
      Keyword: 'technical seo audit',
      Ranking_Position: 1,
      Search_Volume: 2400,
      Keyword_Difficulty: 68,
      CPC: 18.20,
      Traffic_Estimate: 1440,
      Landing_URL: `${competitor.Main_URL}/seo-audit`,
      Intent: 'Commercial',
      Priority: 'High',
      Our_Position: 15,
      Gap_Type: 'We Rank Lower',
      Last_Updated: '2024-10-30'
    },
    {
      Keyword_ID: 'CKW004',
      Competitor_ID: competitor.Competitor_ID,
      Keyword: 'saas marketing strategy',
      Ranking_Position: 3,
      Search_Volume: 1900,
      Keyword_Difficulty: 58,
      CPC: 14.30,
      Traffic_Estimate: 760,
      Landing_URL: `${competitor.Main_URL}/saas-marketing`,
      Intent: 'Informational',
      Priority: 'Medium',
      Our_Position: 5,
      Gap_Type: 'Competitive',
      Last_Updated: '2024-10-28'
    },
    {
      Keyword_ID: 'CKW005',
      Competitor_ID: competitor.Competitor_ID,
      Keyword: 'local seo services',
      Ranking_Position: 7,
      Search_Volume: 5200,
      Keyword_Difficulty: 55,
      CPC: 11.90,
      Traffic_Estimate: 1040,
      Landing_URL: `${competitor.Main_URL}/local-seo`,
      Intent: 'Commercial',
      Priority: 'Medium',
      Our_Position: 4,
      Gap_Type: 'We Rank Higher',
      Last_Updated: '2024-10-29'
    },
    {
      Keyword_ID: 'CKW006',
      Competitor_ID: competitor.Competitor_ID,
      Keyword: 'content marketing roi',
      Ranking_Position: 4,
      Search_Volume: 1600,
      Keyword_Difficulty: 52,
      CPC: 10.50,
      Traffic_Estimate: 560,
      Landing_URL: `${competitor.Main_URL}/blog/content-roi`,
      Intent: 'Informational',
      Priority: 'Low',
      Our_Position: null,
      Gap_Type: 'Not Ranking',
      Last_Updated: '2024-10-27'
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getDAColor = (da: number) => {
    if (da >= 80) return 'bg-green-100 text-green-800';
    if (da >= 60) return 'bg-blue-100 text-blue-800';
    if (da >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'Commercial': return 'bg-purple-100 text-purple-800';
      case 'Transactional': return 'bg-green-100 text-green-800';
      case 'Informational': return 'bg-blue-100 text-blue-800';
      case 'Navigational': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGapTypeColor = (gapType: string) => {
    switch (gapType) {
      case 'Not Ranking': return 'bg-red-100 text-red-800';
      case 'We Rank Lower': return 'bg-orange-100 text-orange-800';
      case 'Competitive': return 'bg-yellow-100 text-yellow-800';
      case 'We Rank Higher': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLinkTypeColor = (linkType: string) => {
    return linkType === 'DoFollow' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Competitor Overview Card */}
      <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-[#7A1C46] text-xl">{competitor.Competitor_Name}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{competitor.Root_Domain}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Site
              </Button>
              <Badge className={getDAColor(competitor.Domain_Authority)}>
                DA: {competitor.Domain_Authority}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Total Backlinks</p>
              <p className="text-2xl">{formatNumber(competitor.Backlinks_Total)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Referring Domains</p>
              <p className="text-2xl">{formatNumber(competitor.Referring_Domains_Total)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Est. Traffic/Month</p>
              <p className="text-2xl">{formatNumber(competitor.Estimated_Traffic_Month)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Follow Links</p>
              <p className="text-2xl">{formatNumber(competitor.Follow_Links)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Backlinks and Keywords */}
      <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardContent className="pt-6">
          <Tabs defaultValue="backlinks">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="backlinks">Mapped Backlinks</TabsTrigger>
              <TabsTrigger value="keywords">Mapped Keywords</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            {/* Backlinks Tab */}
            <TabsContent value="backlinks" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#7A1C46]">Competitor Backlinks</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Tracked backlinks from the Backlink Master Database
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                    <Link2 className="w-4 h-4 mr-2" />
                    Map New Backlink
                  </Button>
                  <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                    <Search className="w-4 h-4 mr-2" />
                    Find More
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-[#7A1C46]">{competitorBacklinks.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Total Mapped</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-green-600">
                        {competitorBacklinks.filter(b => b.Link_Type === 'DoFollow').length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">DoFollow Links</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-blue-600">
                        {Math.round(competitorBacklinks.reduce((sum, b) => sum + b.DA_Score, 0) / competitorBacklinks.length)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Avg DA Score</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-green-600">
                        {competitorBacklinks.filter(b => b.Status === 'Active').length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Active Links</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Backlinks Table */}
              <div className="border rounded-lg overflow-hidden" style={{ borderRadius: '12px' }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source Domain</TableHead>
                      <TableHead>Target URL</TableHead>
                      <TableHead>Anchor Text</TableHead>
                      <TableHead>Link Type</TableHead>
                      <TableHead>DA</TableHead>
                      <TableHead>Spam</TableHead>
                      <TableHead>First Seen</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorBacklinks.map((backlink) => (
                      <TableRow key={backlink.Backlink_ID}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link2 className="w-4 h-4 text-gray-400" />
                            <span>{backlink.Source_Domain}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-gray-600">
                          {backlink.Target_URL}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          <span className="text-sm">{backlink.Anchor_Text}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getLinkTypeColor(backlink.Link_Type)}>
                            {backlink.Link_Type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getDAColor(backlink.DA_Score)}>
                            {backlink.DA_Score}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={backlink.Spam_Score > 3 ? 'text-red-600' : 'text-green-600'}>
                            {backlink.Spam_Score}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{backlink.First_Seen}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">{backlink.Status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Keywords Tab */}
            <TabsContent value="keywords" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#7A1C46]">Competitor Keywords</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Tracked keywords from the Keyword Master Database
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                    <Target className="w-4 h-4 mr-2" />
                    Map New Keyword
                  </Button>
                  <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Track Rankings
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-5 gap-4">
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-[#7A1C46]">{competitorKeywords.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Total Keywords</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-green-600">
                        {competitorKeywords.filter(k => k.Ranking_Position <= 3).length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Top 3 Rankings</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-orange-600">
                        {competitorKeywords.filter(k => k.Gap_Type === 'Not Ranking').length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Not Ranking</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-blue-600">
                        {formatNumber(competitorKeywords.reduce((sum, k) => sum + k.Traffic_Estimate, 0))}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Est. Traffic</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-purple-600">
                        {competitorKeywords.filter(k => k.Priority === 'High').length}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">High Priority</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Keywords Table */}
              <div className="border rounded-lg overflow-hidden" style={{ borderRadius: '12px' }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Their Rank</TableHead>
                      <TableHead>Our Rank</TableHead>
                      <TableHead>Gap Type</TableHead>
                      <TableHead>Search Volume</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Intent</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Traffic Est.</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorKeywords.map((keyword) => (
                      <TableRow key={keyword.Keyword_ID}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{keyword.Keyword}</span>
                            <span className="text-xs text-gray-500 truncate max-w-xs">
                              {keyword.Landing_URL}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-blue-600">
                              #{keyword.Ranking_Position}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          {keyword.Our_Position ? (
                            <Badge variant="outline" className="text-purple-600">
                              #{keyword.Our_Position}
                            </Badge>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getGapTypeColor(keyword.Gap_Type)}>
                            {keyword.Gap_Type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{keyword.Search_Volume.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={
                              keyword.Keyword_Difficulty >= 70 ? 'text-red-600' :
                              keyword.Keyword_Difficulty >= 40 ? 'text-yellow-600' : 'text-green-600'
                            }>
                              {keyword.Keyword_Difficulty}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getIntentColor(keyword.Intent)}>
                            {keyword.Intent}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(keyword.Priority)}>
                            {keyword.Priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{keyword.Traffic_Estimate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Link Profile Summary */}
                <Card style={{ borderRadius: '12px' }}>
                  <CardHeader>
                    <CardTitle className="text-[#7A1C46] text-base">Link Profile Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>DoFollow Links</span>
                        <span>{Math.round((competitor.Follow_Links / competitor.Backlinks_Total) * 100)}%</span>
                      </div>
                      <Progress value={(competitor.Follow_Links / competitor.Backlinks_Total) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Text Links</span>
                        <span>{Math.round((competitor.Follow_Links / competitor.Backlinks_Total) * 91)}%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-600">Referring IPs</p>
                        <p className="text-lg">{formatNumber(competitor.Referring_IPs_Total)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">NoFollow Links</p>
                        <p className="text-lg">{formatNumber(competitor.NoFollow_Links)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Keyword Performance */}
                <Card style={{ borderRadius: '12px' }}>
                  <CardHeader>
                    <CardTitle className="text-[#7A1C46] text-base">Keyword Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Avg. Position</p>
                        <p className="text-2xl">{(competitorKeywords.reduce((sum, k) => sum + k.Ranking_Position, 0) / competitorKeywords.length).toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Total Traffic</p>
                        <p className="text-2xl">{formatNumber(competitorKeywords.reduce((sum, k) => sum + k.Traffic_Estimate, 0))}</p>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Commercial Intent</span>
                        <span>{competitorKeywords.filter(k => k.Intent === 'Commercial').length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Informational Intent</span>
                        <span>{competitorKeywords.filter(k => k.Intent === 'Informational').length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Info */}
              <Card style={{ borderRadius: '12px' }}>
                <CardHeader>
                  <CardTitle className="text-[#7A1C46] text-base">Competitor Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{competitor.Notes}</p>
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Reviewed:</span>
                      <span>{competitor.Last_Reviewed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Updated:</span>
                      <span>{competitor.Last_Updated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
