import { Plus, Rocket, TrendingUp, FileText, Link2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

type Route = 'Master_Hub' | 'WR_Hub' | 'PM_Hub' | 'DB_Weekly' | 'Admin_Config' | 'Integrations_Hub' | 'Wizard_NewService';

interface HomeOverviewProps {
  onNavigate: (route: Route) => void;
}

export default function HomeOverview({ onNavigate }: HomeOverviewProps) {
  const metrics = {
    active_projects: 12,
    active_campaigns: 34,
    content_progress_pct: 68,
    avg_seo: 82,
    avg_lang: 89,
    toxic_pct: 3.2,
  };

  const kpiCards = [
    { title: 'Active Projects', value: metrics.active_projects, icon: Rocket, color: '#7A1C46' },
    { title: 'Active Campaigns', value: metrics.active_campaigns, icon: TrendingUp, color: '#7A1C46' },
    { title: 'Content Progress %', value: `${metrics.content_progress_pct}%`, icon: FileText, color: '#10B981' },
    { title: 'Avg SEO Score', value: metrics.avg_seo, icon: TrendingUp, color: '#3B82F6' },
    { title: 'Avg Language Score', value: metrics.avg_lang, icon: FileText, color: '#8B5CF6' },
    { title: 'Toxic Backlink %', value: `${metrics.toxic_pct}%`, icon: AlertTriangle, color: '#EF4444' },
  ];

  const navCards = [
    { 
      label: 'Master Data', 
      route: 'Master_Hub' as Route, 
      description: 'Services, Keywords, Backlinks, Competitors',
      icon: '📊'
    },
    { 
      label: 'Working Repository', 
      route: 'WR_Hub' as Route, 
      description: 'Content, Error URLs, Toxic Backlinks',
      icon: '📁'
    },
    { 
      label: 'Projects & Campaigns', 
      route: 'PM_Hub' as Route, 
      description: 'Manage marketing projects and campaigns',
      icon: '🚀'
    },
    { 
      label: 'Dashboard (Weekly)', 
      route: 'DB_Weekly' as Route, 
      description: 'Weekly performance snapshots',
      icon: '📈'
    },
    { 
      label: 'Admin & Variables', 
      route: 'Admin_Config' as Route, 
      description: 'Configuration and dropdown management',
      icon: '⚙️'
    },
    { 
      label: 'Integrations', 
      route: 'Integrations_Hub' as Route, 
      description: 'Connect external tools and APIs',
      icon: '🔌'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2>Marketing Control Center</h2>
          <p className="text-gray-600 mt-1">
            Master Data → Working Repo → Projects/Campaigns → Weekly Dashboard
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onNavigate('Wizard_NewService')} className="bg-[#7A1C46] hover:bg-[#5A1434]">
            <Plus className="w-4 h-4 mr-2" />
            Create New Service
          </Button>
          <Button onClick={() => onNavigate('PM_Hub')} variant="outline">
            <Rocket className="w-4 h-4 mr-2" />
            New Project (Template)
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">{kpi.title}</CardTitle>
                <Icon className="w-5 h-5" style={{ color: kpi.color }} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl" style={{ color: kpi.color }}>
                  {kpi.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation Cards */}
      <div>
        <h3 className="mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navCards.map((card) => (
            <Card 
              key={card.route}
              className="border-[#E2E8F0] cursor-pointer hover:border-[#7A1C46] transition-colors"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
              onClick={() => onNavigate(card.route)}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{card.icon}</div>
                  <div>
                    <CardTitle className="text-[#7A1C46]">{card.label}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
