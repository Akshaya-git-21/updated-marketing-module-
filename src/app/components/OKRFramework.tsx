import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Target, TrendingUp, Users, Award, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OKRFramework() {
  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <Card style={{ borderRadius: '12px', borderColor: '#7A1C46', borderWidth: '2px' }}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#7A1C46] flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">What is OKR?</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Objectives and Key Results - A goal-setting framework for defining and tracking objectives
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg" style={{ borderRadius: '12px' }}>
              <h4 className="font-semibold mb-2 text-[#0052CC]">📋 Objectives</h4>
              <p className="text-sm text-gray-700">
                Qualitative, inspirational goals that describe <strong>what you want to achieve</strong>.
                They should be ambitious, actionable, and motivating.
              </p>
              <div className="mt-3 text-sm">
                <strong>Example:</strong> "Become the leading SEO agency in our market"
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg" style={{ borderRadius: '12px' }}>
              <h4 className="font-semibold mb-2 text-[#12B76A]">🎯 Key Results</h4>
              <p className="text-sm text-gray-700">
                Quantitative, measurable outcomes that define <strong>how you'll achieve the objective</strong>.
                They track progress with specific metrics.
              </p>
              <div className="mt-3 text-sm">
                <strong>Example:</strong> "Increase organic traffic by 50% to 100K visitors/month"
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OKR Structure */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>OKR Structure & Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Level 1 - Company */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <Badge className="bg-purple-100 text-purple-800 mb-2" style={{ borderRadius: '12px' }}>
                    Level 1: Company OKRs
                  </Badge>
                  <h4 className="font-semibold mb-1">Strategic Company Goals</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    High-level objectives that define the company's direction and vision
                  </p>
                  <div className="p-3 bg-gray-50 rounded-lg" style={{ borderRadius: '12px' }}>
                    <div className="text-sm">
                      <strong>Example O:</strong> Achieve $10M ARR by end of 2025
                    </div>
                    <div className="text-xs text-gray-600 mt-1 ml-4">
                      <strong>KR1:</strong> Acquire 500 new enterprise customers<br />
                      <strong>KR2:</strong> Increase average deal size to $20K<br />
                      <strong>KR3:</strong> Achieve 95% customer retention rate
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-6 mt-2 mb-2">
                <div className="w-0.5 h-8 bg-gray-300"></div>
              </div>
            </div>

            {/* Level 2 - Department */}
            <div className="relative ml-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <Badge className="bg-blue-100 text-blue-800 mb-2" style={{ borderRadius: '12px' }}>
                    Level 2: Department OKRs
                  </Badge>
                  <h4 className="font-semibold mb-1">Department Objectives</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Aligned with company goals, focused on department-specific outcomes
                  </p>
                  <div className="p-3 bg-gray-50 rounded-lg" style={{ borderRadius: '12px' }}>
                    <div className="text-sm">
                      <strong>Example O:</strong> Increase organic traffic by 50%
                    </div>
                    <div className="text-xs text-gray-600 mt-1 ml-4">
                      <strong>KR1:</strong> Reach 100K organic visitors/month<br />
                      <strong>KR2:</strong> Rank for 50 keywords in top 10<br />
                      <strong>KR3:</strong> Build 200 quality backlinks
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-6 mt-2 mb-2">
                <div className="w-0.5 h-8 bg-gray-300"></div>
              </div>
            </div>

            {/* Level 3 - Team */}
            <div className="relative ml-16">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <Badge className="bg-green-100 text-green-800 mb-2" style={{ borderRadius: '12px' }}>
                    Level 3: Team/Individual OKRs
                  </Badge>
                  <h4 className="font-semibold mb-1">Team & Individual Objectives</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Personal contributions aligned with department goals
                  </p>
                  <div className="p-3 bg-gray-50 rounded-lg" style={{ borderRadius: '12px' }}>
                    <div className="text-sm">
                      <strong>Example O:</strong> Execute comprehensive SEO audit
                    </div>
                    <div className="text-xs text-gray-600 mt-1 ml-4">
                      <strong>KR1:</strong> Audit 100% of website pages<br />
                      <strong>KR2:</strong> Fix 50 critical SEO errors<br />
                      <strong>KR3:</strong> Implement 30 optimization recommendations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card style={{ borderRadius: '12px' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Keep it simple:</strong> 3-5 Objectives per cycle, 3-5 Key Results per Objective
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Make KRs measurable:</strong> Use specific numbers, percentages, or metrics
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Set ambitious goals:</strong> Target 70-80% achievement (stretch goals)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Review regularly:</strong> Weekly check-ins for teams, monthly for leadership
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Ensure alignment:</strong> All OKRs should ladder up to company goals
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Public & transparent:</strong> Share OKRs across the organization
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              Common Pitfalls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Too many OKRs:</strong> Having 10+ objectives dilutes focus
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Vague Key Results:</strong> "Improve SEO" instead of "Increase traffic by 50%"
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Setting tasks as KRs:</strong> "Publish blog posts" vs "Achieve 50K views/article"
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>No accountability:</strong> KRs without clear owners
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Set and forget:</strong> Not reviewing progress regularly
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></div>
                <div>
                  <strong>Sandbagging:</strong> Setting easy goals to guarantee 100% achievement
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* OKR Cycle Timeline */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>OKR Cycle Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-600">Week 1-2</div>
              <div className="flex-1 p-3 bg-blue-50 rounded-lg" style={{ borderRadius: '12px' }}>
                <strong className="text-blue-800">Planning & Setting</strong>
                <p className="text-sm text-gray-700 mt-1">
                  Leadership sets company OKRs, departments cascade down to teams
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-600">Week 3-11</div>
              <div className="flex-1 p-3 bg-green-50 rounded-lg" style={{ borderRadius: '12px' }}>
                <strong className="text-green-800">Execution & Tracking</strong>
                <p className="text-sm text-gray-700 mt-1">
                  Weekly team check-ins, monthly progress reviews, adjust as needed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-gray-600">Week 12-13</div>
              <div className="flex-1 p-3 bg-purple-50 rounded-lg" style={{ borderRadius: '12px' }}>
                <strong className="text-purple-800">Review & Retrospective</strong>
                <p className="text-sm text-gray-700 mt-1">
                  Score final results, celebrate wins, learn from misses, prepare next cycle
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scoring Guide */}
      <Card style={{ borderRadius: '12px' }}>
        <CardHeader>
          <CardTitle>OKR Scoring Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-red-200 rounded-lg" style={{ borderRadius: '12px' }}>
              <div className="text-3xl mb-2">0.0 - 0.3</div>
              <Badge className="bg-red-100 text-red-800 mb-2" style={{ borderRadius: '12px' }}>
                Needs Attention
              </Badge>
              <p className="text-sm text-gray-700">
                Major blockers or wrong direction. Requires immediate action and replanning.
              </p>
            </div>

            <div className="p-4 border-2 border-yellow-200 rounded-lg" style={{ borderRadius: '12px' }}>
              <div className="text-3xl mb-2">0.4 - 0.6</div>
              <Badge className="bg-yellow-100 text-yellow-800 mb-2" style={{ borderRadius: '12px' }}>
                Making Progress
              </Badge>
              <p className="text-sm text-gray-700">
                On track but needs focus. Review priorities and remove blockers.
              </p>
            </div>

            <div className="p-4 border-2 border-green-200 rounded-lg" style={{ borderRadius: '12px' }}>
              <div className="text-3xl mb-2">0.7 - 1.0</div>
              <Badge className="bg-green-100 text-green-800 mb-2" style={{ borderRadius: '12px' }}>
                On Track / Exceeded
              </Badge>
              <p className="text-sm text-gray-700">
                Excellent progress! 0.7-0.8 is ideal for stretch goals. 1.0 may mean goal wasn't ambitious enough.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start */}
      <Card style={{ borderRadius: '12px', borderColor: '#0052CC', borderWidth: '2px' }}>
        <CardHeader>
          <CardTitle>🚀 Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0052CC] text-white flex items-center justify-center flex-shrink-0 text-sm">
                1
              </div>
              <div>
                <strong>Define Your Objective</strong>
                <p className="text-sm text-gray-600">
                  Start with "What do we want to achieve this quarter?" Make it inspiring and qualitative.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0052CC] text-white flex items-center justify-center flex-shrink-0 text-sm">
                2
              </div>
              <div>
                <strong>Set 3-5 Key Results</strong>
                <p className="text-sm text-gray-600">
                  Ask "How will we know we achieved it?" Use specific metrics and targets.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0052CC] text-white flex items-center justify-center flex-shrink-0 text-sm">
                3
              </div>
              <div>
                <strong>Assign Owners</strong>
                <p className="text-sm text-gray-600">
                  Every KR needs a clear owner who's accountable for the outcome.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0052CC] text-white flex items-center justify-center flex-shrink-0 text-sm">
                4
              </div>
              <div>
                <strong>Track Weekly</strong>
                <p className="text-sm text-gray-600">
                  Update progress every week and adjust tactics (not goals) as needed.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#0052CC] text-white flex items-center justify-center flex-shrink-0 text-sm">
                5
              </div>
              <div>
                <strong>Review & Learn</strong>
                <p className="text-sm text-gray-600">
                  At cycle end, score results, celebrate wins, document learnings for next cycle.
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
