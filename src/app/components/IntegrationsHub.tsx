import { Settings, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface IntegrationsHubProps {
  onNavigate: (route: string) => void;
}

export default function IntegrationsHub({ onNavigate }: IntegrationsHubProps) {
  const integrations = [
    {
      title: 'Google Analytics / Search Console',
      description: 'Track website traffic, search performance, and keyword rankings',
      status: 'planned',
      icon: '📊',
      features: [
        'Real-time traffic monitoring',
        'Search query analysis',
        'Performance metrics',
        'Keyword ranking tracking',
      ],
    },
    {
      title: 'Ahrefs / Semrush',
      description: 'SEO analysis, backlink monitoring, and competitor research',
      status: 'planned',
      icon: '🔍',
      features: [
        'Backlink analysis',
        'Domain authority tracking',
        'Competitor analysis',
        'Keyword research',
      ],
    },
    {
      title: 'CMS/Crawler',
      description: 'Automated website crawling and content management',
      status: 'planned',
      icon: '🕷️',
      features: [
        'Automated site crawling',
        'Page status monitoring',
        'Broken link detection',
        'Content inventory',
      ],
    },
    {
      title: 'Sheets / Power BI',
      description: 'Data export and visualization for reporting',
      status: 'planned',
      icon: '📈',
      features: [
        'Automated data export',
        'Custom dashboards',
        'Report generation',
        'Data visualization',
      ],
    },
    {
      title: 'Email Marketing (Mailchimp)',
      description: 'Sync campaign performance with email marketing tools',
      status: 'planned',
      icon: '📧',
      features: [
        'Campaign tracking',
        'Subscriber analytics',
        'Email performance',
        'Automation workflows',
      ],
    },
    {
      title: 'Social Media APIs',
      description: 'Track social media performance across platforms',
      status: 'planned',
      icon: '📱',
      features: [
        'Post scheduling',
        'Engagement metrics',
        'Audience insights',
        'Multi-platform support',
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'planned':
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Planned
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Clock className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Integrations Hub</CardTitle>
          <CardDescription>
            Connect external tools and services to enhance your marketing workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              🚀 <strong>Phase 2 Feature:</strong> Integrations will be available in the next release.
              Configure connections to external APIs and sync data automatically.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration, index) => (
          <Card
            key={index}
            className="border-[#E2E8F0] hover:border-[#7A1C46] transition-colors"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-[#7A1C46]">{integration.title}</CardTitle>
                    <CardDescription className="mt-1">{integration.description}</CardDescription>
                  </div>
                </div>
                {getStatusBadge(integration.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm mb-2">Features:</h4>
                <ul className="space-y-1">
                  {integration.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-[#7A1C46] mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className="w-full"
                variant={integration.status === 'active' ? 'default' : 'outline'}
                disabled={integration.status === 'planned'}
              >
                <Settings className="w-4 h-4 mr-2" />
                {integration.status === 'planned' ? 'Coming Soon' : 'Configure'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Documentation */}
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Learn how to integrate your own tools and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-[#7A1C46] pl-4 py-2">
              <h4>REST API Endpoints</h4>
              <p className="text-sm text-gray-600 mt-1">
                Access marketing data programmatically via our REST API
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-4 py-2">
              <h4>Webhooks</h4>
              <p className="text-sm text-gray-600 mt-1">
                Receive real-time notifications for events and updates
              </p>
            </div>

            <div className="border-l-4 border-green-600 pl-4 py-2">
              <h4>Data Export</h4>
              <p className="text-sm text-gray-600 mt-1">
                Export data in JSON, CSV, or Excel formats for external processing
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">View API Docs</Button>
              <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">Generate API Key</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Request */}
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle>Request an Integration</CardTitle>
          <CardDescription>
            Need an integration that's not listed? Let us know what you need!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm">
                Can't find the integration you're looking for? Submit a request and we'll consider it
                for future releases.
              </p>
            </div>
            <Button className="bg-[#7A1C46] hover:bg-[#5A1434] whitespace-nowrap">
              Submit Request
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
