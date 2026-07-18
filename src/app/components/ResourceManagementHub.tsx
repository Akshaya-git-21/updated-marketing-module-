import { useState } from 'react';
import { Plus, Edit, Trash2, Users, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';

interface Asset {
  Asset_ID: string;
  Asset_Name: string;
  Asset_Format: string;
  Avg_Word_Count: number | null;
  Avg_Design_Hours: number | null;
  Avg_SEO_Hours: number;
  Default_Service_ID: string | null;
  Is_Active: boolean;
}

interface Resource {
  Resource_ID: string;
  Resource_Name: string;
  Role: string;
  Employment_Type: string;
  Skill_Tags: string[];
  Max_Hours_Per_Day: number;
  Rate_Per_Hour: number;
  Is_Active: boolean;
}

interface Freelancer {
  Freelancer_ID: string;
  Name: string;
  Speciality: string;
  Country: string;
  Rate_Per_Word: number | null;
  Rate_Per_Hour: number | null;
  Portfolio_URL: string;
  Verified: boolean;
  Status: string;
  Notes: string;
}

export default function ResourceManagementHub() {
  const [showAssetDialog, setShowAssetDialog] = useState(false);
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const [showFreelancerDialog, setShowFreelancerDialog] = useState(false);

  const assetsData: Asset[] = [
    {
      Asset_ID: 'AST001',
      Asset_Name: 'Blog Article - Technical',
      Asset_Format: 'Article',
      Avg_Word_Count: 1500,
      Avg_Design_Hours: null,
      Avg_SEO_Hours: 2.0,
      Default_Service_ID: 'SRV001',
      Is_Active: true,
    },
    {
      Asset_ID: 'AST002',
      Asset_Name: 'Infographic',
      Asset_Format: 'Infographic',
      Avg_Word_Count: null,
      Avg_Design_Hours: 8.0,
      Avg_SEO_Hours: 1.0,
      Default_Service_ID: null,
      Is_Active: true,
    },
    {
      Asset_ID: 'AST003',
      Asset_Name: 'Video - Explainer',
      Asset_Format: 'Video',
      Avg_Word_Count: null,
      Avg_Design_Hours: 24.0,
      Avg_SEO_Hours: 2.0,
      Default_Service_ID: null,
      Is_Active: true,
    },
    {
      Asset_ID: 'AST004',
      Asset_Name: 'Social Media Carousel',
      Asset_Format: 'Carousel',
      Avg_Word_Count: 300,
      Avg_Design_Hours: 3.0,
      Avg_SEO_Hours: 0.5,
      Default_Service_ID: null,
      Is_Active: true,
    },
    {
      Asset_ID: 'AST005',
      Asset_Name: 'Case Study',
      Asset_Format: 'Case Study',
      Avg_Word_Count: 2500,
      Avg_Design_Hours: 4.0,
      Avg_SEO_Hours: 3.0,
      Default_Service_ID: null,
      Is_Active: true,
    },
  ];

  const resourcesData: Resource[] = [
    {
      Resource_ID: 'RES001',
      Resource_Name: 'John Doe',
      Role: 'Writer',
      Employment_Type: 'Internal',
      Skill_Tags: ['Technical Writing', 'SEO', 'Cloud Computing'],
      Max_Hours_Per_Day: 8,
      Rate_Per_Hour: 50,
      Is_Active: true,
    },
    {
      Resource_ID: 'RES002',
      Resource_Name: 'Jane Smith',
      Role: 'Designer',
      Employment_Type: 'Internal',
      Skill_Tags: ['Graphic Design', 'Infographics', 'Brand Identity'],
      Max_Hours_Per_Day: 8,
      Rate_Per_Hour: 55,
      Is_Active: true,
    },
    {
      Resource_ID: 'RES003',
      Resource_Name: 'Bob Wilson',
      Role: 'SEO',
      Employment_Type: 'Internal',
      Skill_Tags: ['SEO', 'Content Strategy', 'Analytics'],
      Max_Hours_Per_Day: 8,
      Rate_Per_Hour: 60,
      Is_Active: true,
    },
    {
      Resource_ID: 'RES004',
      Resource_Name: 'Alice Designer',
      Role: 'Designer',
      Employment_Type: 'Internal',
      Skill_Tags: ['Video Production', 'Motion Graphics', 'Animation'],
      Max_Hours_Per_Day: 8,
      Rate_Per_Hour: 65,
      Is_Active: true,
    },
    {
      Resource_ID: 'RES005',
      Resource_Name: 'Mike Content',
      Role: 'Writer',
      Employment_Type: 'External',
      Skill_Tags: ['Content Writing', 'Blogging', 'Copywriting'],
      Max_Hours_Per_Day: 6,
      Rate_Per_Hour: 40,
      Is_Active: true,
    },
  ];

  const freelancersData: Freelancer[] = [
    {
      Freelancer_ID: 'FRL001',
      Name: 'Sarah Content Writer',
      Speciality: 'Writer',
      Country: 'USA',
      Rate_Per_Word: 0.10,
      Rate_Per_Hour: null,
      Portfolio_URL: 'https://sarah-writer.com',
      Verified: true,
      Status: 'Available',
      Notes: 'Expert in technical content, cloud computing',
    },
    {
      Freelancer_ID: 'FRL002',
      Name: 'Mike Video Producer',
      Speciality: 'Designer',
      Country: 'UK',
      Rate_Per_Word: null,
      Rate_Per_Hour: 75,
      Portfolio_URL: 'https://mikevideo.pro',
      Verified: true,
      Status: 'Busy',
      Notes: 'Specializes in explainer videos and motion graphics',
    },
    {
      Freelancer_ID: 'FRL003',
      Name: 'Anna SEO Expert',
      Speciality: 'SEO',
      Country: 'Canada',
      Rate_Per_Word: null,
      Rate_Per_Hour: 65,
      Portfolio_URL: 'https://anna-seo.com',
      Verified: true,
      Status: 'Available',
      Notes: 'Technical SEO and content optimization',
    },
    {
      Freelancer_ID: 'FRL004',
      Name: 'Tom Designer',
      Speciality: 'Designer',
      Country: 'Australia',
      Rate_Per_Word: null,
      Rate_Per_Hour: 50,
      Portfolio_URL: 'https://tomdesigns.io',
      Verified: false,
      Status: 'Available',
      Notes: 'Infographics and social media graphics',
    },
  ];

  const getEmploymentTypeColor = (type: string) => {
    return type === 'Internal' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'blacklisted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[#7A1C46]">Resource Management</CardTitle>
            <p className="text-gray-600 mt-1">Manage assets, internal resources, and freelancers</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assets">
          <TabsList>
            <TabsTrigger value="assets">Asset Master</TabsTrigger>
            <TabsTrigger value="resources">Resource Master</TabsTrigger>
            <TabsTrigger value="freelancers">Freelancer Master</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3>Content Asset Templates</h3>
              <Dialog open={showAssetDialog} onOpenChange={setShowAssetDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Asset
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Asset Template</DialogTitle>
                    <DialogDescription>Define a new content asset type with default parameters</DialogDescription>
                  </DialogHeader>
                  <AssetForm onClose={() => setShowAssetDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Avg Word Count</TableHead>
                    <TableHead>Avg Design Hours</TableHead>
                    <TableHead>Avg SEO Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assetsData.map((asset) => (
                    <TableRow key={asset.Asset_ID}>
                      <TableCell>{asset.Asset_ID}</TableCell>
                      <TableCell>{asset.Asset_Name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{asset.Asset_Format}</Badge>
                      </TableCell>
                      <TableCell>{asset.Avg_Word_Count || '-'}</TableCell>
                      <TableCell>{asset.Avg_Design_Hours ? `${asset.Avg_Design_Hours}h` : '-'}</TableCell>
                      <TableCell>{asset.Avg_SEO_Hours}h</TableCell>
                      <TableCell>
                        <Badge className={asset.Is_Active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {asset.Is_Active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3>Internal & External Resources</h3>
              <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Resource</DialogTitle>
                    <DialogDescription>Add an internal or external team member</DialogDescription>
                  </DialogHeader>
                  <ResourceForm onClose={() => setShowResourceDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resource ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Employment Type</TableHead>
                    <TableHead>Skill Tags</TableHead>
                    <TableHead>Max Hours/Day</TableHead>
                    <TableHead>Rate/Hour</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resourcesData.map((resource) => (
                    <TableRow key={resource.Resource_ID}>
                      <TableCell>{resource.Resource_ID}</TableCell>
                      <TableCell>{resource.Resource_Name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.Role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEmploymentTypeColor(resource.Employment_Type)}>
                          {resource.Employment_Type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {resource.Skill_Tags.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {resource.Skill_Tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{resource.Skill_Tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{resource.Max_Hours_Per_Day}h</TableCell>
                      <TableCell>${resource.Rate_Per_Hour}/h</TableCell>
                      <TableCell>
                        <Badge className={resource.Is_Active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {resource.Is_Active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="freelancers" className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3>Freelancer Database</h3>
              <Dialog open={showFreelancerDialog} onOpenChange={setShowFreelancerDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                    <Users className="w-4 h-4 mr-2" />
                    Add Freelancer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Freelancer</DialogTitle>
                    <DialogDescription>Add a freelancer to your database</DialogDescription>
                  </DialogHeader>
                  <FreelancerForm onClose={() => setShowFreelancerDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Freelancer ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Speciality</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Portfolio</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freelancersData.map((freelancer) => (
                    <TableRow key={freelancer.Freelancer_ID}>
                      <TableCell>{freelancer.Freelancer_ID}</TableCell>
                      <TableCell>{freelancer.Name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{freelancer.Speciality}</Badge>
                      </TableCell>
                      <TableCell>{freelancer.Country}</TableCell>
                      <TableCell>
                        {freelancer.Rate_Per_Word && `$${freelancer.Rate_Per_Word}/word`}
                        {freelancer.Rate_Per_Hour && `$${freelancer.Rate_Per_Hour}/h`}
                      </TableCell>
                      <TableCell>
                        <a
                          href={freelancer.Portfolio_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View Portfolio
                        </a>
                      </TableCell>
                      <TableCell>
                        {freelancer.Verified ? (
                          <Badge className="bg-green-100 text-green-800">✓ Verified</Badge>
                        ) : (
                          <Badge variant="outline">Not Verified</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(freelancer.Status)}>{freelancer.Status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function AssetForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Asset Name</Label>
        <Input placeholder="e.g., Blog Article - Technical" />
      </div>
      <div className="space-y-2">
        <Label>Asset Format</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Article">Article</SelectItem>
            <SelectItem value="Infographic">Infographic</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Carousel">Carousel</SelectItem>
            <SelectItem value="Case Study">Case Study</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Avg Word Count</Label>
          <Input type="number" placeholder="1500" />
        </div>
        <div className="space-y-2">
          <Label>Avg Design Hours</Label>
          <Input type="number" placeholder="0" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Avg SEO Hours</Label>
        <Input type="number" placeholder="2.0" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Save Asset
        </Button>
      </div>
    </div>
  );
}

function ResourceForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Resource Name</Label>
        <Input placeholder="e.g., John Doe" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Role</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Writer">Writer</SelectItem>
              <SelectItem value="Designer">Designer</SelectItem>
              <SelectItem value="SEO">SEO</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Employment Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Internal">Internal</SelectItem>
              <SelectItem value="External">External</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Max Hours/Day</Label>
          <Input type="number" placeholder="8" />
        </div>
        <div className="space-y-2">
          <Label>Rate Per Hour</Label>
          <Input type="number" placeholder="50" />
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Save Resource
        </Button>
      </div>
    </div>
  );
}

function FreelancerForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input placeholder="e.g., Sarah Content Writer" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Speciality</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select speciality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Writer">Writer</SelectItem>
              <SelectItem value="Designer">Designer</SelectItem>
              <SelectItem value="SEO">SEO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Country</Label>
          <Input placeholder="USA" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Rate Per Word</Label>
          <Input type="number" step="0.01" placeholder="0.10" />
        </div>
        <div className="space-y-2">
          <Label>Rate Per Hour</Label>
          <Input type="number" placeholder="50" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Portfolio URL</Label>
        <Input placeholder="https://..." />
      </div>
      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea placeholder="Add any relevant notes..." rows={3} />
      </div>
      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Save Freelancer
        </Button>
      </div>
    </div>
  );
}
