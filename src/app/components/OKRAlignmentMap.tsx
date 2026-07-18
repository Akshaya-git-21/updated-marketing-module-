import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowDown } from 'lucide-react';

export default function OKRAlignmentMap() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl mb-2">OKR Alignment Map</h3>
        <p className="text-sm text-gray-600">
          Visual hierarchy showing how objectives cascade from company goals to individual tasks
        </p>
      </div>

      {/* Company Goal Level */}
      <div className="flex justify-center">
        <Card
          style={{
            borderRadius: '12px',
            backgroundColor: '#7A1C46',
            color: 'white',
            minWidth: '400px',
          }}
        >
          <CardContent className="p-6 text-center">
            <div className="text-xs opacity-80 mb-2">COMPANY GOAL</div>
            <div className="text-lg">Achieve $10M ARR by End of 2025</div>
            <Progress value={45} className="mt-3 bg-white/20" />
            <div className="text-sm mt-2">45% Complete</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </div>

      {/* Department Level */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card style={{ borderRadius: '12px', borderColor: '#0052CC', borderWidth: '2px' }}>
          <CardContent className="p-5">
            <Badge className="bg-blue-100 text-blue-800 mb-3" style={{ borderRadius: '12px' }}>
              Marketing Dept
            </Badge>
            <div className="text-sm mb-2">Increase Organic Traffic by 50%</div>
            <Progress value={68} className="mt-2" />
            <div className="text-xs text-gray-600 mt-2">68% Complete</div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px', borderColor: '#12B76A', borderWidth: '2px' }}>
          <CardContent className="p-5">
            <Badge className="bg-green-100 text-green-800 mb-3" style={{ borderRadius: '12px' }}>
              Content Dept
            </Badge>
            <div className="text-sm mb-2">Launch 30 High-Quality Content Pieces</div>
            <Progress value={43} className="mt-2" />
            <div className="text-xs text-gray-600 mt-2">43% Complete</div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px', borderColor: '#F79009', borderWidth: '2px' }}>
          <CardContent className="p-5">
            <Badge className="bg-orange-100 text-orange-800 mb-3" style={{ borderRadius: '12px' }}>
              Tech Dept
            </Badge>
            <div className="text-sm mb-2">Optimize Website Performance</div>
            <Progress value={15} className="mt-2" />
            <div className="text-xs text-gray-600 mt-2">15% Complete</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </div>

      {/* Team Key Results Level */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card style={{ borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
          <CardContent className="p-4">
            <div className="text-xs text-gray-600 mb-2">TEAM KR</div>
            <div className="text-sm mb-2">100K Organic Visitors</div>
            <Progress value={68} className="mt-2 h-2" />
            <div className="text-xs mt-2">68K / 100K</div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
          <CardContent className="p-4">
            <div className="text-xs text-gray-600 mb-2">TEAM KR</div>
            <div className="text-sm mb-2">50 Keywords Top 10</div>
            <Progress value={68} className="mt-2 h-2" />
            <div className="text-xs mt-2">34 / 50</div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
          <CardContent className="p-4">
            <div className="text-xs text-gray-600 mb-2">TEAM KR</div>
            <div className="text-sm mb-2">200 Quality Backlinks</div>
            <Progress value={67} className="mt-2 h-2" />
            <div className="text-xs mt-2">135 / 200</div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
          <CardContent className="p-4">
            <div className="text-xs text-gray-600 mb-2">TEAM KR</div>
            <div className="text-sm mb-2">30 Blog Posts</div>
            <Progress value={43} className="mt-2 h-2" />
            <div className="text-xs mt-2">13 / 30</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </div>

      {/* Individual Task Level */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {[
          { title: 'SEO Audit', assignee: 'Sarah', progress: 100 },
          { title: 'Content Calendar', assignee: 'Mike', progress: 75 },
          { title: 'Keyword Research', assignee: 'Sarah', progress: 80 },
          { title: 'Link Building', assignee: 'Team', progress: 60 },
          { title: 'Performance Test', assignee: 'Alex', progress: 40 },
        ].map((task, index) => (
          <Card key={index} style={{ borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-1">TASK</div>
              <div className="text-xs mb-1">{task.title}</div>
              <div className="text-xs text-gray-500 mb-2">{task.assignee}</div>
              <Progress value={task.progress} className="h-1" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card style={{ borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: '#7A1C46' }}
              />
              <span>Company Goal</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border-2"
                style={{ borderColor: '#0052CC' }}
              />
              <span>Department Objective</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}
              />
              <span>Team Key Result</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-white border" />
              <span>Individual Task</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
