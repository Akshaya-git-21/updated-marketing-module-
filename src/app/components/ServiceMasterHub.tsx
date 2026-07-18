import { useState } from 'react';
import { Plus, ExternalLink, ChevronRight, ChevronDown, Globe, Link2, FileText, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

interface Service {
  Service_ID: string;
  Service_Name: string;
  Slug: string;
  Parent_Service_ID: string | null;
  Hierarchy_Level: number;
  Breadcrumb_Path: string;
  Primary_URL: string;
  Page_Status: string;
  Title_Tag: string;
  Meta_Description: string;
  H1: string;
  Target_Industries: string[];
  Target_Countries: string[];
  Primary_Keywords: string[];
  SEO_Score: number;
  Language_Score: number;
  Content_Owner: string;
  Tech_Owner: string;
  Last_Updated: string;
}

interface ServiceURL {
  Map_ID: string;
  Service_ID: string;
  URL: string;
  URL_Type: string;
  Title_Tag: string;
  Meta_Description: string;
  Is_Canonical: boolean;
  Locale: string;
  Country: string;
  Language: string;
  Status: string;
  Last_Updated: string;
}

interface Keyword {
  Keyword_ID: string;
  Keyword: string;
  Intent: string;
  Search_Volume: number;
  Keyword_Difficulty: number;
  CPC: number;
  Priority: string;
  Target_URL: string;
  Competitor_Name: string;
  Competitor_URL: string;
  Country: string;
  Language: string;
  Last_Updated: string;
}

interface ServiceMasterHubProps {
  onNavigate?: (route: string) => void;
}

export default function ServiceMasterHub({ onNavigate }: ServiceMasterHubProps) {
  const [selectedService, setSelectedService] = useState<string | null>('SRV001');
  const [expandedServices, setExpandedServices] = useState<string[]>(['SRV001', 'SRV002']);
  const [showAddServiceDialog, setShowAddServiceDialog] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: '',
    slug: '',
    category: '',
    serviceType: '',
    industries: '',
    countries: '',
    regulations: '',
    primaryURL: '',
    titleTag: '',
    metaDescription: '',
    h1: '',
    keywords: '',
    contentOwner: '',
    techOwner: '',
  });

  const servicesData: Service[] = [
    {
      Service_ID: 'SRV001',
      Service_Name: 'Cloud Migration Services',
      Slug: 'cloud-migration',
      Parent_Service_ID: null,
      Hierarchy_Level: 0,
      Breadcrumb_Path: 'Services > Cloud Migration',
      Primary_URL: '/services/cloud-migration',
      Page_Status: 'Live',
      Title_Tag: 'Enterprise Cloud Migration Services | Beetloop',
      Meta_Description: 'Seamless cloud migration services for enterprises',
      H1: 'Cloud Migration Services',
      Target_Industries: ['Technology', 'Finance', 'Healthcare'],
      Target_Countries: ['USA', 'UK', 'Canada'],
      Primary_Keywords: ['cloud migration', 'enterprise cloud', 'cloud transformation'],
      SEO_Score: 87,
      Language_Score: 92,
      Content_Owner: 'John Doe',
      Tech_Owner: 'Tech Team',
      Last_Updated: '2024-10-28',
    },
    {
      Service_ID: 'SRV001-1',
      Service_Name: 'AWS Migration',
      Slug: 'cloud-migration/aws',
      Parent_Service_ID: 'SRV001',
      Hierarchy_Level: 1,
      Breadcrumb_Path: 'Services > Cloud Migration > AWS Migration',
      Primary_URL: '/services/cloud-migration/aws',
      Page_Status: 'Live',
      Title_Tag: 'AWS Cloud Migration Services | Beetloop',
      Meta_Description: 'Expert AWS migration and optimization services',
      H1: 'AWS Migration Services',
      Target_Industries: ['Technology', 'Finance'],
      Target_Countries: ['USA', 'UK'],
      Primary_Keywords: ['aws migration', 'aws cloud', 'migrate to aws'],
      SEO_Score: 85,
      Language_Score: 90,
      Content_Owner: 'Jane Smith',
      Tech_Owner: 'Tech Team',
      Last_Updated: '2024-10-25',
    },
    {
      Service_ID: 'SRV001-2',
      Service_Name: 'Azure Migration',
      Slug: 'cloud-migration/azure',
      Parent_Service_ID: 'SRV001',
      Hierarchy_Level: 1,
      Breadcrumb_Path: 'Services > Cloud Migration > Azure Migration',
      Primary_URL: '/services/cloud-migration/azure',
      Page_Status: 'Live',
      Title_Tag: 'Azure Cloud Migration Services | Beetloop',
      Meta_Description: 'Professional Azure migration and modernization',
      H1: 'Azure Migration Services',
      Target_Industries: ['Technology', 'Enterprise'],
      Target_Countries: ['USA', 'UK', 'Germany'],
      Primary_Keywords: ['azure migration', 'azure cloud', 'migrate to azure'],
      SEO_Score: 83,
      Language_Score: 88,
      Content_Owner: 'Jane Smith',
      Tech_Owner: 'Tech Team',
      Last_Updated: '2024-10-26',
    },
    {
      Service_ID: 'SRV002',
      Service_Name: 'AI Implementation',
      Slug: 'ai-implementation',
      Parent_Service_ID: null,
      Hierarchy_Level: 0,
      Breadcrumb_Path: 'Services > AI Implementation',
      Primary_URL: '/services/ai-implementation',
      Page_Status: 'Live',
      Title_Tag: 'AI Implementation Services | Beetloop',
      Meta_Description: 'End-to-end AI implementation and integration services',
      H1: 'AI Implementation Services',
      Target_Industries: ['Technology', 'Retail', 'Manufacturing'],
      Target_Countries: ['USA', 'UK', 'Singapore'],
      Primary_Keywords: ['ai implementation', 'artificial intelligence', 'ai integration'],
      SEO_Score: 78,
      Language_Score: 85,
      Content_Owner: 'Bob Johnson',
      Tech_Owner: 'Tech Team',
      Last_Updated: '2024-10-20',
    },
  ];

  const serviceURLsData: ServiceURL[] = [
    {
      Map_ID: 'MAP001',
      Service_ID: 'SRV001',
      URL: '/services/cloud-migration',
      URL_Type: 'Main',
      Title_Tag: 'Enterprise Cloud Migration Services | Beetloop',
      Meta_Description: 'Seamless cloud migration services for enterprises',
      Is_Canonical: true,
      Locale: 'en-US',
      Country: 'USA',
      Language: 'English',
      Status: 'Live',
      Last_Updated: '2024-10-28',
    },
    {
      Map_ID: 'MAP002',
      Service_ID: 'SRV001',
      URL: '/en-uk/services/cloud-migration',
      URL_Type: 'Main',
      Title_Tag: 'Enterprise Cloud Migration Services | Beetloop UK',
      Meta_Description: 'Seamless cloud migration services for UK enterprises',
      Is_Canonical: false,
      Locale: 'en-GB',
      Country: 'UK',
      Language: 'English',
      Status: 'Live',
      Last_Updated: '2024-10-28',
    },
    {
      Map_ID: 'MAP003',
      Service_ID: 'SRV001',
      URL: '/blog/cloud-migration-guide',
      URL_Type: 'Blog',
      Title_Tag: 'Complete Guide to Cloud Migration | Beetloop',
      Meta_Description: 'Learn everything about cloud migration strategies',
      Is_Canonical: false,
      Locale: 'en-US',
      Country: 'USA',
      Language: 'English',
      Status: 'Live',
      Last_Updated: '2024-10-15',
    },
  ];

  const keywordsData: Keyword[] = [
    {
      Keyword_ID: 'KW001',
      Keyword: 'enterprise cloud migration',
      Intent: 'Commercial',
      Search_Volume: 2400,
      Keyword_Difficulty: 68,
      CPC: 12.5,
      Priority: 'High',
      Target_URL: '/services/cloud-migration',
      Competitor_Name: 'CloudTech Inc',
      Competitor_URL: 'cloudtech.com/migration',
      Country: 'USA',
      Language: 'English',
      Last_Updated: '2024-10-28',
    },
    {
      Keyword_ID: 'KW002',
      Keyword: 'aws cloud migration',
      Intent: 'Commercial',
      Search_Volume: 1800,
      Keyword_Difficulty: 65,
      CPC: 10.2,
      Priority: 'High',
      Target_URL: '/services/cloud-migration/aws',
      Competitor_Name: 'CloudTech Inc',
      Competitor_URL: 'cloudtech.com/aws',
      Country: 'USA',
      Language: 'English',
      Last_Updated: '2024-10-25',
    },
    {
      Keyword_ID: 'KW003',
      Keyword: 'cloud migration strategy',
      Intent: 'Informational',
      Search_Volume: 3200,
      Keyword_Difficulty: 45,
      CPC: 5.8,
      Priority: 'Medium',
      Target_URL: '/blog/cloud-migration-guide',
      Competitor_Name: 'TechBlog',
      Competitor_URL: 'techblog.com/cloud-guide',
      Country: 'USA',
      Language: 'English',
      Last_Updated: '2024-10-20',
    },
  ];

  const toggleExpand = (serviceId: string) => {
    if (expandedServices.includes(serviceId)) {
      setExpandedServices(expandedServices.filter((id) => id !== serviceId));
    } else {
      setExpandedServices([...expandedServices, serviceId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'deprecated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent.toLowerCase()) {
      case 'commercial':
        return 'bg-purple-100 text-purple-800';
      case 'transactional':
        return 'bg-green-100 text-green-800';
      case 'informational':
        return 'bg-blue-100 text-blue-800';
      case 'navigational':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderServiceTree = (parentId: string | null, level: number = 0) => {
    const childServices = servicesData.filter((s) => s.Parent_Service_ID === parentId);

    return childServices.map((service) => {
      const hasChildren = servicesData.some((s) => s.Parent_Service_ID === service.Service_ID);
      const isExpanded = expandedServices.includes(service.Service_ID);
      const isSelected = selectedService === service.Service_ID;

      return (
        <div key={service.Service_ID}>
          <div
            className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-100 ${
              isSelected ? 'bg-purple-50 border-l-4 border-[#7A1C46]' : ''
            }`}
            style={{ paddingLeft: `${level * 24 + 8}px` }}
            onClick={() => setSelectedService(service.Service_ID)}
          >
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(service.Service_ID);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-6" />}
            <FileText className="w-4 h-4 text-[#7A1C46]" />
            <span className="flex-1">{service.Service_Name}</span>
            <Badge className={getStatusColor(service.Page_Status)}>{service.Page_Status}</Badge>
            <Badge variant="outline" className="text-xs">
              SEO: {service.SEO_Score}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Lang: {service.Language_Score}
            </Badge>
          </div>
          {hasChildren && isExpanded && renderServiceTree(service.Service_ID, level + 1)}
        </div>
      );
    });
  };

  const selectedServiceData = servicesData.find((s) => s.Service_ID === selectedService);
  const selectedServiceURLs = serviceURLsData.filter((u) => u.Service_ID === selectedService);
  const selectedKeywords = keywordsData.filter((k) =>
    k.Target_URL.includes(selectedServiceData?.Slug || '')
  );

  const handleAddService = () => {
    // Validate required fields
    if (!newService.serviceName || !newService.slug) {
      toast.error('Please fill in required fields (Service Name, Slug)');
      return;
    }

    // Here you would typically save to database
    toast.success(`Service "${newService.serviceName}" added successfully!`);
    
    // Reset form and close dialog
    setNewService({
      serviceName: '',
      slug: '',
      category: '',
      serviceType: '',
      industries: '',
      countries: '',
      regulations: '',
      primaryURL: '',
      titleTag: '',
      metaDescription: '',
      h1: '',
      keywords: '',
      contentOwner: '',
      techOwner: '',
    });
    setShowAddServiceDialog(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Service Tree */}
        <Card className="border-[#E2E8F0] lg:col-span-1" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#7A1C46]">Service Tree</CardTitle>
              <Button 
                size="sm" 
                className="bg-[#7A1C46] hover:bg-[#5A1434]"
                style={{ borderRadius: '12px' }}
                onClick={() => setShowAddServiceDialog(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 max-h-[600px] overflow-y-auto">{renderServiceTree(null)}</div>
          </CardContent>
        </Card>

        {/* Right: Service Details */}
        {selectedServiceData && (
          <Card className="border-[#E2E8F0] lg:col-span-2" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[#7A1C46]">{selectedServiceData.Service_Name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedServiceData.Breadcrumb_Path}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                    Create Subservice
                  </Button>
                  <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]" style={{ borderRadius: '12px' }}>
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="details">Service Details</TabsTrigger>
                  <TabsTrigger value="urls">Service URLs</TabsTrigger>
                  <TabsTrigger value="keywords">Linked Keywords</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Service Name</Label>
                      <Input value={selectedServiceData.Service_Name} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug</Label>
                      <Input value={selectedServiceData.Slug} readOnly />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary URL</Label>
                      <div className="flex gap-2">
                        <Input value={selectedServiceData.Primary_URL} readOnly />
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Page Status</Label>
                      <Select value={selectedServiceData.Page_Status} onValueChange={() => {}}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Live">Live</SelectItem>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Deprecated">Deprecated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Title Tag</Label>
                    <Input value={selectedServiceData.Title_Tag} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea value={selectedServiceData.Meta_Description} rows={3} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label>H1</Label>
                    <Input value={selectedServiceData.H1} readOnly />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Industries</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedServiceData.Target_Industries.map((industry) => (
                          <Badge key={industry} variant="outline">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Countries</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedServiceData.Target_Countries.map((country) => (
                          <Badge key={country} variant="outline">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Keywords</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedServiceData.Primary_Keywords.map((keyword) => (
                        <Badge key={keyword} className="bg-[#7A1C46] text-white">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Content Owner</Label>
                      <Input value={selectedServiceData.Content_Owner} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Tech Owner</Label>
                      <Input value={selectedServiceData.Tech_Owner} readOnly />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>SEO Score</Label>
                      <div className="flex items-center gap-2">
                        <Input value={selectedServiceData.SEO_Score} readOnly />
                        <Badge
                          className={
                            selectedServiceData.SEO_Score >= 80
                              ? 'bg-green-100 text-green-800'
                              : selectedServiceData.SEO_Score >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {selectedServiceData.SEO_Score >= 80
                            ? 'Good'
                            : selectedServiceData.SEO_Score >= 60
                            ? 'Fair'
                            : 'Poor'}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Language Score</Label>
                      <div className="flex items-center gap-2">
                        <Input value={selectedServiceData.Language_Score} readOnly />
                        <Badge
                          className={
                            selectedServiceData.Language_Score >= 80
                              ? 'bg-green-100 text-green-800'
                              : selectedServiceData.Language_Score >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {selectedServiceData.Language_Score >= 80
                            ? 'Good'
                            : selectedServiceData.Language_Score >= 60
                            ? 'Fair'
                            : 'Poor'}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Last Updated</Label>
                      <Input value={selectedServiceData.Last_Updated} readOnly />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="urls" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3>Service URL Mappings</h3>
                      <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add URL
                      </Button>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>URL Type</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Locale</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Canonical</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedServiceURLs.map((url) => (
                            <TableRow key={url.Map_ID}>
                              <TableCell>
                                <Badge variant="outline">{url.URL_Type}</Badge>
                              </TableCell>
                              <TableCell className="max-w-xs truncate">
                                <div className="flex items-center gap-2">
                                  <Globe className="w-4 h-4 text-gray-400" />
                                  {url.URL}
                                </div>
                              </TableCell>
                              <TableCell>{url.Locale}</TableCell>
                              <TableCell>{url.Country}</TableCell>
                              <TableCell>
                                {url.Is_Canonical ? (
                                  <Badge className="bg-green-100 text-green-800">Yes</Badge>
                                ) : (
                                  <Badge variant="outline">No</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(url.Status)}>{url.Status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="keywords" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3>Linked Keywords</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Link2 className="w-4 h-4 mr-2" />
                          Link to Service URL
                        </Button>
                        <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Keyword
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Keyword</TableHead>
                            <TableHead>Intent</TableHead>
                            <TableHead>Volume</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>CPC</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Target URL</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedKeywords.map((keyword) => (
                            <TableRow key={keyword.Keyword_ID}>
                              <TableCell>{keyword.Keyword}</TableCell>
                              <TableCell>
                                <Badge className={getIntentColor(keyword.Intent)}>{keyword.Intent}</Badge>
                              </TableCell>
                              <TableCell>{keyword.Search_Volume.toLocaleString()}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    keyword.Keyword_Difficulty >= 70
                                      ? 'text-red-600'
                                      : keyword.Keyword_Difficulty >= 40
                                      ? 'text-yellow-600'
                                      : 'text-green-600'
                                  }
                                >
                                  {keyword.Keyword_Difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell>${keyword.CPC.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge className={getPriorityColor(keyword.Priority)}>
                                  {keyword.Priority}
                                </Badge>
                              </TableCell>
                              <TableCell className="max-w-xs truncate text-sm text-gray-600">
                                {keyword.Target_URL}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Service Dialog */}
      <Dialog open={showAddServiceDialog} onOpenChange={setShowAddServiceDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ borderRadius: '12px' }}>
          <DialogHeader>
            <DialogTitle className="text-[#7A1C46]">Add New Service</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new service.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Service Name *</Label>
                <Input
                  placeholder="e.g., Cloud Migration Services"
                  value={newService.serviceName}
                  onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                  style={{ borderRadius: '12px' }}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug *</Label>
                <Input
                  placeholder="e.g., cloud-migration"
                  value={newService.slug}
                  onChange={(e) => setNewService({ ...newService, slug: e.target.value })}
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Service Category</Label>
                <Select value={newService.category} onValueChange={(val) => setNewService({ ...newService, category: val })}>
                  <SelectTrigger style={{ borderRadius: '12px' }}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Implementation">Implementation</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select value={newService.serviceType} onValueChange={(val) => setNewService({ ...newService, serviceType: val })}>
                  <SelectTrigger style={{ borderRadius: '12px' }}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional Services">Professional Services</SelectItem>
                    <SelectItem value="Managed Services">Managed Services</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Industries</Label>
                <Input
                  placeholder="e.g., Technology, Finance, Healthcare"
                  value={newService.industries}
                  onChange={(e) => setNewService({ ...newService, industries: e.target.value })}
                  style={{ borderRadius: '12px' }}
                />
                <p className="text-xs text-gray-500">Comma-separated values</p>
              </div>
              <div className="space-y-2">
                <Label>Target Countries</Label>
                <Input
                  placeholder="e.g., USA, UK, Canada"
                  value={newService.countries}
                  onChange={(e) => setNewService({ ...newService, countries: e.target.value })}
                  style={{ borderRadius: '12px' }}
                />
                <p className="text-xs text-gray-500">Comma-separated values</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Regulations</Label>
              <Input
                placeholder="e.g., GDPR, SOC2, HIPAA"
                value={newService.regulations}
                onChange={(e) => setNewService({ ...newService, regulations: e.target.value })}
                style={{ borderRadius: '12px' }}
              />
              <p className="text-xs text-gray-500">Comma-separated values</p>
            </div>

            <div className="space-y-2">
              <Label>Primary URL</Label>
              <Input
                placeholder="/services/cloud-migration"
                value={newService.primaryURL}
                onChange={(e) => setNewService({ ...newService, primaryURL: e.target.value })}
                style={{ borderRadius: '12px' }}
              />
            </div>

            <div className="space-y-2">
              <Label>Title Tag</Label>
              <Input
                placeholder="e.g., Cloud Migration Services | Beetloop"
                value={newService.titleTag}
                onChange={(e) => setNewService({ ...newService, titleTag: e.target.value })}
                style={{ borderRadius: '12px' }}
              />
            </div>

            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea
                placeholder="Brief description for search engines (150-160 characters)"
                value={newService.metaDescription}
                onChange={(e) => setNewService({ ...newService, metaDescription: e.target.value })}
                rows={3}
                style={{ borderRadius: '12px' }}
              />
            </div>

            <div className="space-y-2">
              <Label>H1 Heading</Label>
              <Input
                placeholder="e.g., Cloud Migration Services"
                value={newService.h1}
                onChange={(e) => setNewService({ ...newService, h1: e.target.value })}
                style={{ borderRadius: '12px' }}
              />
            </div>

            <div className="space-y-2">
              <Label>Primary Keywords</Label>
              <Input
                placeholder="e.g., cloud migration, enterprise cloud, cloud transformation"
                value={newService.keywords}
                onChange={(e) => setNewService({ ...newService, keywords: e.target.value })}
                style={{ borderRadius: '12px' }}
              />
              <p className="text-xs text-gray-500">Comma-separated keywords</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Content Owner</Label>
                <Input
                  placeholder="Assigned content writer"
                  value={newService.contentOwner}
                  onChange={(e) => setNewService({ ...newService, contentOwner: e.target.value })}
                  style={{ borderRadius: '12px' }}
                />
              </div>
              <div className="space-y-2">
                <Label>Tech Owner</Label>
                <Input
                  placeholder="Assigned developer"
                  value={newService.techOwner}
                  onChange={(e) => setNewService({ ...newService, techOwner: e.target.value })}
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAddServiceDialog(false)}
              style={{ borderRadius: '12px' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddService} 
              className="bg-[#7A1C46] hover:bg-[#5A1434]"
              style={{ borderRadius: '12px' }}
            >
              <Save className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}