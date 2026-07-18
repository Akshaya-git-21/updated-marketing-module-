import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BarChart3, TrendingUp, TrendingDown, Target } from 'lucide-react';

export default function OKRProgress() {
  const progressData = [
    {
      id: '1',
      objective: 'Increase Organic Traffic by 50%',
      owner: 'Sarah Johnson',
      cycle: 'Q1 2025',
      progress: 68,
      trend: 'up',
      keyResults: [
        { title: 'Organic visitors to 100K/month', progress: 68, status: 'On Track' },
        { title: 'Rank for 50 keywords in top 10', progress: 68, status: 'On Track' },
        { title: 'Build 200 quality backlinks', progress: 67, status: 'On Track' },
      ],
    },
    {
      id: '2',
      objective: 'Launch 30 High-Quality Content Pieces',
      owner: 'Mike Chen',
      cycle: 'Q1 2025',
      progress: 43,
      trend: 'down',
      keyResults: [
        { title: 'Publish 30 blog posts', progress: 43, status: 'At Risk' },
        { title: 'Achieve 50K avg views per article', progress: 42, status: 'At Risk' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card style={{ borderRadius: '12px' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-3xl mt-2" style={{ color: '#7A1C46' }}>
                  56%
                </p>
              </div>
              <BarChart3 className="w-10 h-10 text-gray-300" />
            </div>
            <Progress value={56} className="mt-4" />
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">On Track</p>
                <p className="text-3xl mt-2 text-green-600">72%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-300" />
            </div>
            <p className="text-sm text-gray-600 mt-2">18 of 25 objectives</p>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">At Risk</p>
                <p className="text-3xl mt-2 text-red-600">28%</p>
              </div>
              <TrendingDown className="w-10 h-10 text-red-300" />
            </div>
            <p className="text-sm text-gray-600 mt-2">7 of 25 objectives</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Details */}
      <div className="space-y-4">
        {progressData.map((okr) => (
          <Card key={okr.id} style={{ borderRadius: '12px' }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-medium">{okr.objective}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Owner: {okr.owner} • {okr.cycle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{okr.progress}%</span>
                  {okr.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>

              <Progress value={okr.progress} className="mb-4" />

              <div className="space-y-3">
                {okr.keyResults.map((kr, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm">{kr.title}</p>
                      <Progress value={kr.progress} className="mt-2 h-2" />
                    </div>
                    <div className="ml-4 flex items-center gap-3">
                      <span className="text-sm">{kr.progress}%</span>
                      <Badge
                        className={
                          kr.status === 'On Track'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                        style={{ borderRadius: '12px' }}
                      >
                        {kr.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
