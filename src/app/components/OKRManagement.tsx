import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import OKRFramework from './OKRFramework';
import OKRConfiguration from './OKRConfiguration';
import OKRProgress from './OKRProgress';
import OKRAlignmentMap from './OKRAlignmentMap';

export default function OKRManagement() {
  const [activeTab, setActiveTab] = useState('framework');

  return (
    <div className="space-y-4">
      <Card style={{ borderRadius: '12px' }}>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start" style={{ borderRadius: '12px' }}>
              <TabsTrigger value="framework" style={{ borderRadius: '12px' }}>
                🎯 OKR Framework
              </TabsTrigger>
              <TabsTrigger value="configuration" style={{ borderRadius: '12px' }}>
                ⚙️ OKR Configuration
              </TabsTrigger>
              <TabsTrigger value="progress" style={{ borderRadius: '12px' }}>
                📊 OKR Progress
              </TabsTrigger>
              <TabsTrigger value="alignment" style={{ borderRadius: '12px' }}>
                🧩 Alignment Map
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="framework" className="mt-0">
                <OKRFramework />
              </TabsContent>

              <TabsContent value="configuration" className="mt-0">
                <OKRConfiguration />
              </TabsContent>

              <TabsContent value="progress" className="mt-0">
                <OKRProgress />
              </TabsContent>

              <TabsContent value="alignment" className="mt-0">
                <OKRAlignmentMap />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}