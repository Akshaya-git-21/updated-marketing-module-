import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import ContentEffortDashboard from './ContentEffortDashboard';
import SEOEffortDashboard from './SEOEffortDashboard';
import SMMEffortDashboard from './SMMEffortDashboard';
import DesignerEffortDashboard from './DesignerEffortDashboard';
import WebDevEffortDashboard from './WebDevEffortDashboard';

export default function EffortTrackingCenter() {
  const [activeTab, setActiveTab] = useState('content');

  // Mock risk flags - in real app, these would come from API
  const riskFlags = {
    content: false,
    seo: true,
    smm: false,
    designer: true,
    webdev: false
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[#7A1C46]">⚙️ Effort Tracking Center</h2>
        <p className="text-sm text-gray-600 mt-1">
          Comprehensive effort tracking across all marketing functions with targets, actuals, and QC metrics
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="content" className="flex items-center gap-2 py-3">
            <span>📝 Content Effort</span>
            {riskFlags.content && (
              <Badge className="bg-red-600 text-white text-xs">!</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2 py-3">
            <span>🔗 SEO Effort</span>
            {riskFlags.seo && (
              <Badge className="bg-red-600 text-white text-xs">!</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="smm" className="flex items-center gap-2 py-3">
            <span>📱 SMM Effort</span>
            {riskFlags.smm && (
              <Badge className="bg-red-600 text-white text-xs">!</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="designer" className="flex items-center gap-2 py-3">
            <span>🎨 Designer Effort</span>
            {riskFlags.designer && (
              <Badge className="bg-red-600 text-white text-xs">!</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="webdev" className="flex items-center gap-2 py-3">
            <span>💻 Web Dev Effort</span>
            {riskFlags.webdev && (
              <Badge className="bg-red-600 text-white text-xs">!</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <ContentEffortDashboard />
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <SEOEffortDashboard />
        </TabsContent>

        <TabsContent value="smm" className="mt-6">
          <SMMEffortDashboard />
        </TabsContent>

        <TabsContent value="designer" className="mt-6">
          <DesignerEffortDashboard />
        </TabsContent>

        <TabsContent value="webdev" className="mt-6">
          <WebDevEffortDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
