import { useState } from 'react';
import { Plus, ChevronRight, ChevronDown, Save, X, FileText, Globe, Link2, Image, CheckCircle, AlertCircle, Edit, Trash2, Eye, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface Service {
  id: string;
  serviceName: string;
  slug: string;
  parentCategory: string;
  industry: string[];
  description: string;
  countries: string[];
  status: 'Draft' | 'Published';
  hasMetadata: boolean;
  hasContent: boolean;
  subServices: SubService[];
  createdAt: string;
}

interface SubService {
  id: string;
  parentServiceId: string;
  title: string;
  slug: string;
  description: string;
  status: 'Draft' | 'Published';
  hasMetadata: boolean;
  hasContent: boolean;
  linkedAssets: number;
  createdAt: string;
}

interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  focusKeywords: string[];
  secondaryKeywords: string[];
  canonicalURL: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: string;
  robots: string;
  status: 'Draft' | 'Approved';
}

interface ContentBlock {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  body: string;
  internalLinks: string[];
  externalLinks: string[];
  images: { url: string; alt: string }[];
  faqSection: { question: string; answer: string }[];
}

interface ServiceHubProps {
  onNavigate?: (route: string) => void;
}

export default function ServiceHubNew({ onNavigate }: ServiceHubProps) {
  const [activeView, setActiveView] = useState<'list' | 'service' | 'subservice'>('list');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const [showServicePanel, setShowServicePanel] = useState(false);
  const [showSubServicePanel, setShowSubServicePanel] = useState(false);
  const [expandedServices, setExpandedServices] = useState<string[]>([]);

  // Sample data
  const [services, setServices] = useState<Service[]>([
    {
      id: 'SRV001',
      serviceName: 'Nutraceutical Product Development',
      slug: '/services/nutraceutical-product-development',
      parentCategory: 'Food & Nutraceuticals',
      industry: ['Healthcare', 'Manufacturing'],
      description: 'Comprehensive product development from formulation to market launch',
      countries: ['USA', 'Canada', 'UK'],
      status: 'Published',
      hasMetadata: true,
      hasContent: true,
      subServices: [
        {
          id: 'SUB001',
          parentServiceId: 'SRV001',
          title: 'Diabetes Formulation R&D',
          slug: '/services/nutraceutical-product-development/diabetes-formulation',
          description: 'Specialized formulations for diabetes management',
          status: 'Published',
          hasMetadata: true,
          hasContent: true,
          linkedAssets: 5,
          createdAt: '2024-10-20'
        }
      ],
      createdAt: '2024-10-15'
    }
  ]);

  const toggleExpanded = (serviceId: string) => {
    setExpandedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setActiveView('service');
  };

  const handleSubServiceClick = (service: Service, subService: SubService) => {
    setSelectedService(service);
    setSelectedSubService(subService);
    setActiveView('subservice');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#7A1C46]">Service Management Hub v2.0 ✨</CardTitle>
              <CardDescription>
                Service → Sub-Service → SEO Mapping Workflow (with Progress Tracking)
              </CardDescription>
            </div>
            {activeView === 'list' && (
              <Button
                className="bg-[#7A1C46] hover:bg-[#5A1434]"
                style={{ borderRadius: '12px' }}
                onClick={() => setShowServicePanel(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Service
              </Button>
            )}
            {activeView !== 'list' && (
              <Button
                variant="outline"
                style={{ borderRadius: '12px' }}
                onClick={() => {
                  setActiveView('list');
                  setSelectedService(null);
                  setSelectedSubService(null);
                }}
              >
                ← Back to List
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {activeView === 'list' && (
            <ServiceListView
              services={services}
              expandedServices={expandedServices}
              onToggleExpanded={toggleExpanded}
              onServiceClick={handleServiceClick}
              onSubServiceClick={handleSubServiceClick}
            />
          )}
          {activeView === 'service' && selectedService && (
            <ServiceDetailView
              service={selectedService}
              onAddSubService={() => setShowSubServicePanel(true)}
              onSubServiceClick={(sub) => handleSubServiceClick(selectedService, sub)}
            />
          )}
          {activeView === 'subservice' && selectedSubService && selectedService && (
            <SubServiceDetailView
              service={selectedService}
              subService={selectedSubService}
            />
          )}
        </CardContent>
      </Card>

      {/* Create Service Slide-In Panel */}
      {showServicePanel && (
        <ServiceFormPanel onClose={() => setShowServicePanel(false)} />
      )}

      {/* Create Sub-Service Slide-In Panel */}
      {showSubServicePanel && selectedService && (
        <SubServiceFormPanel
          parentService={selectedService}
          onClose={() => setShowSubServicePanel(false)}
        />
      )}
    </div>
  );
}

// Service List View Component
function ServiceListView({
  services,
  expandedServices,
  onToggleExpanded,
  onServiceClick,
  onSubServiceClick
}: {
  services: Service[];
  expandedServices: string[];
  onToggleExpanded: (id: string) => void;
  onServiceClick: (service: Service) => void;
  onSubServiceClick: (service: Service, subService: SubService) => void;
}) {
  return (
    <div className="space-y-2">
      {services.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No services created yet. Click "Create Service" to get started.</p>
        </div>
      ) : (
        services.map(service => (
          <div key={service.id} className="border rounded-lg" style={{ borderRadius: '12px' }}>
            {/* Parent Service Row */}
            <div className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => onToggleExpanded(service.id)}
                    className="mt-1"
                  >
                    {service.subServices.length > 0 && (
                      expandedServices.includes(service.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      )
                    )}
                    {service.subServices.length === 0 && (
                      <div className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="cursor-pointer hover:text-[#7A1C46]"
                        onClick={() => onServiceClick(service)}
                      >
                        {service.serviceName}
                      </h3>
                      <Badge
                        variant={service.status === 'Published' ? 'default' : 'outline'}
                        style={{
                          borderRadius: '12px',
                          backgroundColor: service.status === 'Published' ? '#12B76A' : 'transparent',
                          color: service.status === 'Published' ? 'white' : 'inherit'
                        }}
                      >
                        {service.status}
                      </Badge>
                      {service.hasMetadata && (
                        <Badge variant="outline" style={{ borderRadius: '12px' }} className="text-xs">
                          <Globe className="w-3 h-3 mr-1" />
                          SEO
                        </Badge>
                      )}
                      {service.hasContent && (
                        <Badge variant="outline" style={{ borderRadius: '12px' }} className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          Content
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Category: {service.parentCategory}</span>
                      <span>•</span>
                      <span>{service.subServices.length} Sub-Services</span>
                      <span>•</span>
                      <span>{service.countries.join(', ')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onServiceClick(service)}
                    style={{ borderRadius: '12px' }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sub-Services (Expanded) */}
            {expandedServices.includes(service.id) && service.subServices.length > 0 && (
              <div className="border-t bg-gray-50 p-4 space-y-2">
                {service.subServices.map(subService => (
                  <div
                    key={subService.id}
                    className="bg-white p-3 rounded-lg border hover:border-[#7A1C46] cursor-pointer"
                    style={{ borderRadius: '12px' }}
                    onClick={() => onSubServiceClick(service, subService)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <h4 className="text-sm">{subService.title}</h4>
                          <Badge
                            variant={subService.status === 'Published' ? 'default' : 'outline'}
                            className="text-xs"
                            style={{
                              borderRadius: '12px',
                              backgroundColor: subService.status === 'Published' ? '#12B76A' : 'transparent',
                              color: subService.status === 'Published' ? 'white' : 'inherit'
                            }}
                          >
                            {subService.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 ml-6">{subService.description}</p>
                        <div className="flex items-center gap-3 ml-6 mt-1 text-xs text-gray-500">
                          {subService.hasMetadata && <span>✓ SEO</span>}
                          {subService.hasContent && <span>✓ Content</span>}
                          <span>{subService.linkedAssets} Assets</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// Service Detail View Component (with Tabs)
function ServiceDetailView({
  service,
  onAddSubService,
  onSubServiceClick
}: {
  service: Service;
  onAddSubService: () => void;
  onSubServiceClick: (subService: SubService) => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const canAccessSEO = service.id !== ''; // Service must be saved first
  const canAccessContent = service.id !== '';

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl text-[#7A1C46]">{service.serviceName}</h2>
          <p className="text-gray-600 mt-1">{service.description}</p>
        </div>
        <Badge
          variant={service.status === 'Published' ? 'default' : 'outline'}
          style={{
            borderRadius: '12px',
            backgroundColor: service.status === 'Published' ? '#12B76A' : 'transparent',
            color: service.status === 'Published' ? 'white' : 'inherit',
            fontSize: '14px',
            padding: '6px 12px'
          }}
        >
          {service.status}
        </Badge>
      </div>

      {/* Test Alert - Confirm File is Loading */}
      <Alert className="border-purple-200 bg-purple-50" style={{ borderRadius: '12px' }}>
        <AlertDescription className="text-purple-800 text-sm">
          <strong>✨ NEW FEATURE:</strong> Progress tracking is now enabled! Track your completion below.
        </AlertDescription>
      </Alert>

      {/* Progress Status Bar */}
      <ProgressStatusBar
        steps={[
          { id: 'details', label: 'Service Details', completed: !!service.id, locked: false },
          { id: 'seo', label: 'SEO Metadata', completed: service.hasMetadata, locked: !service.id },
          { id: 'content', label: 'Content Block', completed: service.hasContent, locked: !service.id },
          { id: 'subservices', label: 'Sub-Services', completed: service.subServices.length > 0, locked: false },
          { id: 'publish', label: 'Publish', completed: service.status === 'Published', locked: false }
        ]}
        currentStep={activeTab}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Service Details</TabsTrigger>
          <TabsTrigger value="seo" disabled={!canAccessSEO}>
            <Globe className="w-4 h-4 mr-2" />
            SEO Metadata
            {!canAccessSEO && <span className="ml-2 text-xs">(Save first)</span>}
          </TabsTrigger>
          <TabsTrigger value="content" disabled={!canAccessContent}>
            <FileText className="w-4 h-4 mr-2" />
            Content Block
            {!canAccessContent && <span className="ml-2 text-xs">(Save first)</span>}
          </TabsTrigger>
          <TabsTrigger value="subservices">
            Sub-Services ({service.subServices.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ServiceOverviewTab service={service} />
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          {canAccessSEO ? (
            <SEOMetadataTab entityId={service.id} entityType="service" />
          ) : (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Please save the service first before adding SEO metadata.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          {canAccessContent ? (
            <ContentBlockTab entityId={service.id} entityType="service" />
          ) : (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Please save the service first before adding content blocks.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="subservices" className="mt-6">
          <SubServicesTab
            service={service}
            onAddSubService={onAddSubService}
            onSubServiceClick={onSubServiceClick}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Service Overview Tab
function ServiceOverviewTab({ service }: { service: Service }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Service Name</Label>
          <Input value={service.serviceName} disabled style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} />
        </div>
        <div className="space-y-2">
          <Label>Slug / URL</Label>
          <Input value={service.slug} disabled style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Parent Category</Label>
          <Input value={service.parentCategory} disabled style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} />
        </div>
        <div className="space-y-2">
          <Label>Industry</Label>
          <div className="flex flex-wrap gap-2 p-3 border rounded-lg" style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}>
            {service.industry.map(ind => (
              <Badge key={ind} variant="outline" style={{ borderRadius: '12px' }}>
                {ind}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={service.description} disabled rows={3} style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} />
      </div>

      <div className="space-y-2">
        <Label>Countries / Regions</Label>
        <div className="flex flex-wrap gap-2 p-3 border rounded-lg" style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}>
          {service.countries.map(country => (
            <Badge key={country} variant="outline" style={{ borderRadius: '12px' }}>
              {country}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" style={{ borderRadius: '12px' }}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Service
        </Button>
        <Button
          className="bg-[#0052CC] hover:bg-[#0047B3]"
          style={{ borderRadius: '12px' }}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// SEO Metadata Tab (Step 2 & 5)
function SEOMetadataTab({ entityId, entityType }: { entityId: string; entityType: 'service' | 'subservice' }) {
  const [seoData, setSeoData] = useState<SEOMetadata>({
    metaTitle: '',
    metaDescription: '',
    focusKeywords: [],
    secondaryKeywords: [],
    canonicalURL: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    schemaType: 'Service',
    robots: 'index, follow',
    status: 'Draft'
  });

  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          <strong>Tip:</strong> {entityType === 'subservice' ? 'Sub-service SEO metadata will inherit suggestions from the parent service for faster entry.' : 'This metadata will be used for on-page SEO and can be inherited by sub-services.'}
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Meta Title <span className="text-red-500">*</span></Label>
          <Input
            value={seoData.metaTitle}
            onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })}
            placeholder="e.g., Nutraceutical Product Development Services | Your Brand"
            maxLength={60}
            style={{ borderRadius: '12px' }}
          />
          <p className="text-xs text-gray-500">{seoData.metaTitle.length}/60 characters</p>
        </div>

        <div className="space-y-2">
          <Label>Meta Description <span className="text-red-500">*</span></Label>
          <Textarea
            value={seoData.metaDescription}
            onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
            placeholder="We help you design, develop, and commercialize functional nutraceutical products compliant with global regulations."
            maxLength={160}
            rows={3}
            style={{ borderRadius: '12px' }}
          />
          <p className="text-xs text-gray-500">{seoData.metaDescription.length}/160 characters</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Focus Keywords</Label>
            <Input
              placeholder="nutraceutical formulation, clinical trials, FDA compliance"
              style={{ borderRadius: '12px' }}
            />
            <p className="text-xs text-gray-500">Comma-separated primary keywords</p>
          </div>

          <div className="space-y-2">
            <Label>Secondary Keywords</Label>
            <Input
              placeholder="product development, regulatory support"
              style={{ borderRadius: '12px' }}
            />
            <p className="text-xs text-gray-500">Comma-separated secondary keywords</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Canonical URL</Label>
          <Input
            value={seoData.canonicalURL}
            disabled
            style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}
            placeholder="Auto-generated from slug"
          />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-[#7A1C46] mb-4">Open Graph (Social Media)</h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>OG Title</Label>
              <Input
                value={seoData.ogTitle}
                onChange={(e) => setSeoData({ ...seoData, ogTitle: e.target.value })}
                placeholder="Title for social media shares"
                style={{ borderRadius: '12px' }}
              />
            </div>

            <div className="space-y-2">
              <Label>OG Description</Label>
              <Textarea
                value={seoData.ogDescription}
                onChange={(e) => setSeoData({ ...seoData, ogDescription: e.target.value })}
                placeholder="Description for social media shares"
                rows={2}
                style={{ borderRadius: '12px' }}
              />
            </div>

            <div className="space-y-2">
              <Label>OG Image URL</Label>
              <Input
                value={seoData.ogImage}
                onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-[#7A1C46] mb-4">Technical SEO</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Schema Type</Label>
              <Select value={seoData.schemaType} onValueChange={(value) => setSeoData({ ...seoData, schemaType: value })}>
                <SelectTrigger style={{ borderRadius: '12px' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="FAQ">FAQ</SelectItem>
                  <SelectItem value="HowTo">HowTo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Robots</Label>
              <Select value={seoData.robots} onValueChange={(value) => setSeoData({ ...seoData, robots: value })}>
                <SelectTrigger style={{ borderRadius: '12px' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="index, follow">Index, Follow</SelectItem>
                  <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                  <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                  <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={seoData.status} onValueChange={(value: 'Draft' | 'Approved') => setSeoData({ ...seoData, status: value })}>
              <SelectTrigger style={{ borderRadius: '12px' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" style={{ borderRadius: '12px' }}>
          Cancel
        </Button>
        <Button
          className="bg-[#0052CC] hover:bg-[#0047B3]"
          style={{ borderRadius: '12px' }}
          onClick={() => toast.success('✅ SEO metadata saved successfully')}
        >
          <Save className="w-4 h-4 mr-2" />
          Save SEO Metadata
        </Button>
      </div>
    </div>
  );
}

// Content Block Tab (Step 3 & 6)
function ContentBlockTab({ entityId, entityType }: { entityId: string; entityType: 'service' | 'subservice' }) {
  const [contentData, setContentData] = useState<ContentBlock>({
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    h5: '',
    body: '',
    internalLinks: [],
    externalLinks: [],
    images: [],
    faqSection: []
  });

  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          <strong>Content Structure:</strong> Fill in H1-H5 headings and body content for on-page SEO optimization. This content will be stored in the content block table.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>H1 (Main Heading) <span className="text-red-500">*</span></Label>
          <Input
            value={contentData.h1}
            onChange={(e) => setContentData({ ...contentData, h1: e.target.value })}
            placeholder="e.g., Comprehensive Nutraceutical Product Development"
            style={{ borderRadius: '12px' }}
          />
        </div>

        <div className="space-y-2">
          <Label>H2 (Primary Subheading)</Label>
          <Input
            value={contentData.h2}
            onChange={(e) => setContentData({ ...contentData, h2: e.target.value })}
            placeholder="e.g., Formulation to Market Launch Support"
            style={{ borderRadius: '12px' }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>H3</Label>
            <Input
              value={contentData.h3}
              onChange={(e) => setContentData({ ...contentData, h3: e.target.value })}
              placeholder="Section heading"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>H4</Label>
            <Input
              value={contentData.h4}
              onChange={(e) => setContentData({ ...contentData, h4: e.target.value })}
              placeholder="Subsection heading"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>H5</Label>
            <Input
              value={contentData.h5}
              onChange={(e) => setContentData({ ...contentData, h5: e.target.value })}
              placeholder="Detail heading"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Body Content <span className="text-red-500">*</span></Label>
          <Textarea
            value={contentData.body}
            onChange={(e) => setContentData({ ...contentData, body: e.target.value })}
            placeholder="Full content body with detailed information..."
            rows={12}
            style={{ borderRadius: '12px' }}
          />
          <p className="text-xs text-gray-500">Rich text editor integration can be added here</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Internal Links</Label>
            <Textarea
              placeholder="Choose related services/pages (comma-separated)"
              rows={3}
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>External Links</Label>
            <Textarea
              placeholder="Industry references, citations (comma-separated)"
              rows={3}
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Images & Alt Text</Label>
          <div className="border rounded-lg p-4" style={{ borderRadius: '12px' }}>
            <Button variant="outline" style={{ borderRadius: '12px' }}>
              <Image className="w-4 h-4 mr-2" />
              Upload Images
            </Button>
            <p className="text-xs text-gray-500 mt-2">Upload banner, thumbnails with alt text</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-[#7A1C46] mb-4">FAQ Section (For Schema Snippet)</h4>
          <div className="space-y-3">
            <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ Item
            </Button>
            <p className="text-xs text-gray-500">FAQ items will generate structured data for rich snippets</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" style={{ borderRadius: '12px' }}>
          Cancel
        </Button>
        <Button
          className="bg-[#0052CC] hover:bg-[#0047B3]"
          style={{ borderRadius: '12px' }}
          onClick={() => toast.success('✅ Content block saved successfully')}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Content Block
        </Button>
      </div>
    </div>
  );
}

// Sub-Services Tab
function SubServicesTab({
  service,
  onAddSubService,
  onSubServiceClick
}: {
  service: Service;
  onAddSubService: () => void;
  onSubServiceClick: (subService: SubService) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Sub-Services</h4>
          <p className="text-sm text-gray-600">Child services under {service.serviceName}</p>
        </div>
        <Button
          className="bg-[#7A1C46] hover:bg-[#5A1434]"
          style={{ borderRadius: '12px' }}
          onClick={onAddSubService}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Sub-Service
        </Button>
      </div>

      {service.subServices.length === 0 ? (
        <div className="text-center py-12 border rounded-lg" style={{ borderRadius: '12px' }}>
          <p className="text-gray-400">No sub-services yet. Click "Add Sub-Service" to create one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {service.subServices.map(subService => (
            <div
              key={subService.id}
              className="border rounded-lg p-4 hover:border-[#7A1C46] cursor-pointer"
              style={{ borderRadius: '12px' }}
              onClick={() => onSubServiceClick(subService)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{subService.title}</h4>
                    <Badge
                      variant={subService.status === 'Published' ? 'default' : 'outline'}
                      style={{
                        borderRadius: '12px',
                        backgroundColor: subService.status === 'Published' ? '#12B76A' : 'transparent',
                        color: subService.status === 'Published' ? 'white' : 'inherit'
                      }}
                    >
                      {subService.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{subService.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    {subService.hasMetadata && <span className="text-green-600">✓ SEO Metadata</span>}
                    {subService.hasContent && <span className="text-green-600">✓ Content Block</span>}
                    <span>{subService.linkedAssets} Linked Assets</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" style={{ borderRadius: '12px' }}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sub-Service Detail View (similar structure to Service Detail View)
function SubServiceDetailView({
  service,
  subService
}: {
  service: Service;
  subService: SubService;
}) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            {service.serviceName} →
          </div>
          <h2 className="text-2xl text-[#7A1C46]">{subService.title}</h2>
          <p className="text-gray-600 mt-1">{subService.description}</p>
        </div>
        <Badge
          variant={subService.status === 'Published' ? 'default' : 'outline'}
          style={{
            borderRadius: '12px',
            backgroundColor: subService.status === 'Published' ? '#12B76A' : 'transparent',
            color: subService.status === 'Published' ? 'white' : 'inherit',
            fontSize: '14px',
            padding: '6px 12px'
          }}
        >
          {subService.status}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Sub-Service Details</TabsTrigger>
          <TabsTrigger value="seo">
            <Globe className="w-4 h-4 mr-2" />
            SEO Metadata
          </TabsTrigger>
          <TabsTrigger value="content">
            <FileText className="w-4 h-4 mr-2" />
            Content Block
          </TabsTrigger>
          <TabsTrigger value="assets">
            Linked Assets ({subService.linkedAssets})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sub-Service Title</Label>
                <Input value={subService.title} disabled style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} />
              </div>
              <div className="space-y-2">
                <Label>Slug / URL</Label>
                <Input value={subService.slug} disabled style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={subService.description} disabled rows={3} style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <SEOMetadataTab entityId={subService.id} entityType="subservice" />
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <ContentBlockTab entityId={subService.id} entityType="subservice" />
        </TabsContent>

        <TabsContent value="assets" className="mt-6">
          <div className="text-center py-12 border rounded-lg" style={{ borderRadius: '12px' }}>
            <p className="text-gray-400">Asset mapping feature coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Service Form Panel (Step 1)
function ServiceFormPanel({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    serviceName: '',
    slug: '',
    parentCategory: '',
    industry: [] as string[],
    description: '',
    countries: [] as string[],
    status: 'Draft' as 'Draft' | 'Published'
  });

  const categories = ['Food & Nutraceuticals', 'Cosmetics', 'Pharmaceuticals', 'Medical Devices', 'Technology'];
  const industries = ['Healthcare', 'Manufacturing', 'Technology', 'Finance', 'Retail', 'E-commerce'];
  const countriesList = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Singapore', 'India'];

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const handleServiceNameChange = (name: string) => {
    const slug = '/services/' + name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setFormData({ ...formData, serviceName: name, slug });
  };

  const handleSave = () => {
    if (!formData.serviceName || !formData.parentCategory) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.success('✅ Service created successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white h-full w-[600px] shadow-2xl overflow-y-auto animate-in slide-in-from-right">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                🆕 Create Service (Parent Layer)
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Step 1: Foundation node for grouping sub-services and assets
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} style={{ borderRadius: '12px' }}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Service Name <span className="text-red-500">*</span></Label>
            <Input
              value={formData.serviceName}
              onChange={(e) => handleServiceNameChange(e.target.value)}
              placeholder="e.g., Nutraceutical Product Development"
              style={{ borderRadius: '12px' }}
            />
            <p className="text-xs text-gray-500">Display name for the service</p>
          </div>

          <div className="space-y-2">
            <Label>Slug / URL</Label>
            <Input
              value={formData.slug}
              disabled
              style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}
            />
            <p className="text-xs text-gray-500">Auto-generated from service name</p>
          </div>

          <div className="space-y-2">
            <Label>Parent Category <span className="text-red-500">*</span></Label>
            <Select value={formData.parentCategory} onValueChange={(value) => setFormData({ ...formData, parentCategory: value })}>
              <SelectTrigger style={{ borderRadius: '12px' }}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">From Master Data dropdown</p>
          </div>

          <div className="space-y-2">
            <Label>Industry</Label>
            <div className="border rounded-lg p-3" style={{ borderRadius: '12px' }}>
              <div className="flex flex-wrap gap-2">
                {industries.map(industry => (
                  <Badge
                    key={industry}
                    variant={formData.industry.includes(industry) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    style={{
                      borderRadius: '12px',
                      backgroundColor: formData.industry.includes(industry) ? '#0052CC' : 'transparent',
                      color: formData.industry.includes(industry) ? 'white' : 'inherit'
                    }}
                    onClick={() => setFormData({ ...formData, industry: toggleArrayItem(formData.industry, industry) })}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">For filtering and targeting</p>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short overview that appears on listing pages"
              rows={4}
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Country / Region</Label>
            <div className="border rounded-lg p-3" style={{ borderRadius: '12px' }}>
              <div className="flex flex-wrap gap-2">
                {countriesList.map(country => (
                  <Badge
                    key={country}
                    variant={formData.countries.includes(country) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    style={{
                      borderRadius: '12px',
                      backgroundColor: formData.countries.includes(country) ? '#12B76A' : 'transparent',
                      color: formData.countries.includes(country) ? 'white' : 'inherit'
                    }}
                    onClick={() => setFormData({ ...formData, countries: toggleArrayItem(formData.countries, country) })}
                  >
                    {country}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">Multi-select for localization</p>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value: 'Draft' | 'Published') => setFormData({ ...formData, status: value })}>
              <SelectTrigger style={{ borderRadius: '12px' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft - Not published yet</SelectItem>
                <SelectItem value="Published">Published - Live on website</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Alert className="border-blue-200 bg-blue-50" style={{ borderRadius: '12px' }}>
            <AlertDescription className="text-blue-800 text-sm">
              <strong>Next Steps:</strong> After saving, you can add SEO Metadata (Step 2), Content Block (Step 3), and Sub-Services (Step 4) from the service detail page.
            </AlertDescription>
          </Alert>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              style={{
                backgroundColor: '#0052CC',
                color: 'white',
                borderRadius: '12px',
                flex: 1
              }}
              disabled={!formData.serviceName || !formData.parentCategory}
            >
              <Save className="w-4 h-4 mr-2" />
              Create Service
            </Button>
            <Button variant="outline" onClick={onClose} style={{ borderRadius: '12px' }}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Progress Status Bar Component
function ProgressStatusBar({
  steps,
  currentStep
}: {
  steps: { id: string; label: string; completed: boolean; locked: boolean }[];
  currentStep: string;
}) {
  const getStepStatus = (step: typeof steps[0], index: number) => {
    if (step.completed) return 'completed';
    if (step.locked) return 'locked';
    if (step.id === currentStep || (currentStep === 'overview' && step.id === 'details')) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border rounded-lg p-6" style={{ borderRadius: '12px' }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm text-gray-700">Service Creation Progress</h4>
        <span className="text-xs text-gray-500">
          {steps.filter(s => s.completed).length} of {steps.length} completed
        </span>
      </div>

      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full" />
        
        {/* Progress bar filled */}
        <div 
          className="absolute top-5 left-0 h-1 bg-[#12B76A] rounded-full transition-all duration-500"
          style={{ 
            width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%`
          }}
        />

        {/* Steps */}
        <div className="relative flex items-start justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step, index);
            
            return (
              <div key={step.id} className="flex flex-col items-center" style={{ flex: 1 }}>
                {/* Circle/Icon */}
                <div className="relative z-10 mb-2">
                  {status === 'completed' && (
                    <div 
                      className="w-10 h-10 rounded-full bg-[#12B76A] flex items-center justify-center shadow-md"
                      style={{ borderRadius: '50%' }}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {status === 'current' && (
                    <div 
                      className="w-10 h-10 rounded-full bg-[#0052CC] flex items-center justify-center shadow-lg ring-4 ring-blue-100"
                      style={{ borderRadius: '50%' }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    </div>
                  )}
                  {status === 'locked' && (
                    <div 
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300"
                      style={{ borderRadius: '50%' }}
                    >
                      <Lock className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  {status === 'pending' && (
                    <div 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-gray-300"
                      style={{ borderRadius: '50%' }}
                    >
                      <div className="w-3 h-3 bg-gray-300 rounded-full" />
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="text-center mt-2">
                  <p 
                    className={`text-xs ${
                      status === 'completed' ? 'text-[#12B76A] font-semibold' :
                      status === 'current' ? 'text-[#0052CC] font-semibold' :
                      status === 'locked' ? 'text-gray-400' :
                      'text-gray-600'
                    }`}
                  >
                    {step.label}
                  </p>
                  {status === 'completed' && (
                    <Badge 
                      variant="outline" 
                      className="mt-1 text-xs"
                      style={{ 
                        borderRadius: '12px',
                        backgroundColor: '#E8F8F2',
                        color: '#12B76A',
                        borderColor: '#12B76A'
                      }}
                    >
                      ✓ Done
                    </Badge>
                  )}
                  {status === 'current' && (
                    <Badge 
                      variant="outline" 
                      className="mt-1 text-xs"
                      style={{ 
                        borderRadius: '12px',
                        backgroundColor: '#EBF3FF',
                        color: '#0052CC',
                        borderColor: '#0052CC'
                      }}
                    >
                      In Progress
                    </Badge>
                  )}
                  {status === 'locked' && (
                    <Badge 
                      variant="outline" 
                      className="mt-1 text-xs"
                      style={{ 
                        borderRadius: '12px',
                        backgroundColor: '#F5F5F5',
                        color: '#999',
                        borderColor: '#E0E0E0'
                      }}
                    >
                      Locked
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion message */}
      {steps.every(s => s.completed) && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg" style={{ borderRadius: '12px' }}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#12B76A]" />
            <span className="text-sm text-green-800">
              🎉 All sections completed! Your service is ready to publish.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-Service Form Panel (Step 4)
function SubServiceFormPanel({ parentService, onClose }: { parentService: Service; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    status: 'Draft' as 'Draft' | 'Published'
  });

  const handleTitleChange = (title: string) => {
    const slug = `${parentService.slug}/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
    setFormData({ ...formData, title, slug });
  };

  const handleSave = () => {
    if (!formData.title) {
      toast.error('Please enter a sub-service title');
      return;
    }
    toast.success('✅ Sub-service created successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-white h-full w-[600px] shadow-2xl overflow-y-auto animate-in slide-in-from-right">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                ➕ Add Sub-Service (Child Layer)
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Step 4: Create sub-service under {parentService.serviceName}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} style={{ borderRadius: '12px' }}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label>Parent Service</Label>
            <Input
              value={parentService.serviceName}
              disabled
              style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Sub-Service Title <span className="text-red-500">*</span></Label>
            <Input
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g., Diabetes Formulation R&D"
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Slug / URL</Label>
            <Input
              value={formData.slug}
              disabled
              style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }}
            />
            <p className="text-xs text-gray-500">Auto-generated from parent + title</p>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short description of this sub-service"
              rows={4}
              style={{ borderRadius: '12px' }}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value: 'Draft' | 'Published') => setFormData({ ...formData, status: value })}>
              <SelectTrigger style={{ borderRadius: '12px' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Alert className="border-blue-200 bg-blue-50" style={{ borderRadius: '12px' }}>
            <AlertDescription className="text-blue-800 text-sm">
              <strong>SEO Inheritance:</strong> After saving, the SEO Metadata tab will auto-suggest values from the parent service for faster entry.
            </AlertDescription>
          </Alert>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6">
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              style={{
                backgroundColor: '#0052CC',
                color: 'white',
                borderRadius: '12px',
                flex: 1
              }}
              disabled={!formData.title}
            >
              <Save className="w-4 h-4 mr-2" />
              Create Sub-Service
            </Button>
            <Button variant="outline" onClick={onClose} style={{ borderRadius: '12px' }}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}