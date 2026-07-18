import { useState } from 'react';
import { Plus, Save, Upload, Download, Shield, Users, ChevronDown, Edit, Trash2, X, Info, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import UserManagement from './UserManagement';
import OKRManagement from './OKRManagement';
import { toast } from 'sonner';

interface AdminConfigProps {
  onNavigate: (route: string) => void;
}

export default function AdminConfig({ onNavigate }: AdminConfigProps) {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedCategory, setSelectedCategory] = useState('Services');
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [newValueCode, setNewValueCode] = useState('');
  const [newValueDescription, setNewValueDescription] = useState('');
  const [newValueStatus, setNewValueStatus] = useState(true);
  const [newValueListType, setNewValueListType] = useState('Services');
  const [variables, setVariables] = useState<Record<string, string[]>>({
    Services: ['Consulting', 'Technology', 'Implementation', 'Professional Services'],
    Industries: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'],
    Countries: ['USA', 'UK', 'Canada', 'Germany', 'France', 'Australia'],
    Regulations: ['GDPR', 'HIPAA', 'SOC2', 'ISO27001', 'PCI-DSS'],
    Asset_Type: [],
    Knowledge_Hub: [],
    Fiscal_Year: [],
    Modifier_Keywords: [],
    Outsourcing_Keywords: [],
    Promotion_Type: [],
    Content_Type: [
      'Blog Post',
      'Case Studies',
      'Checklists',
      'E-books',
      'Guides & How-Tos',
      'Infographics',
      'White Paper',
      'Service Page',
      'Video',
    ],
    Stage_of_Buyer: ['Awareness', 'Evaluation', 'Conversion', 'Retention'],
  });

  const variableCategories = [
    'Services',
    'Industries',
    'Countries',
    'Regulations',
    'Asset_Type',
    'Knowledge_Hub',
    'Fiscal_Year',
    'Modifier_Keywords',
    'Outsourcing_Keywords',
    'Promotion_Type',
    'Content_Type',
    'Stage_of_Buyer',
  ];

  const defaultKPITemplate = {
    'New Service Development': { target: 100, unit: 'completion %' },
    'Content Promotion (Insights)': { target: 50, unit: 'pieces' },
    'Content Optimization': { target: 40, unit: 'pages' },
    'Web Designing': { target: 20, unit: 'designs' },
    'Backlink Campaign': { target: 30, unit: 'backlinks' },
    'Error URLs': { target: 0, unit: 'open errors' },
    'Toxic Backlink': { target: 0, unit: 'toxic count' },
    'Data Security & Governance': { target: 100, unit: 'compliance %' },
  };

  const permissions = [
    { module: 'Master Data', admin: true, editor: true, viewer: true },
    { module: 'Working Repository', admin: true, editor: true, viewer: true },
    { module: 'Projects & Campaigns', admin: true, editor: true, viewer: false },
    { module: 'Dashboard', admin: true, editor: true, viewer: true },
    { module: 'Admin & Config', admin: true, editor: false, viewer: false },
  ];

  // Handler functions
  const handleAddValue = () => {
    if (!newValue.trim()) return;
    
    setVariables(prev => ({
      ...prev,
      [selectedCategory]: [...(prev[selectedCategory] || []), newValue.trim()]
    }));
    
    setShowAddPanel(false);
    setNewValue('');
    setNewValueCode('');
    setNewValueDescription('');
  };

  const handleDeleteValue = (category: string, value: string) => {
    if (confirm(`Are you sure you want to delete "${value}"? This may affect existing records.`)) {
      setVariables(prev => ({
        ...prev,
        [category]: prev[category].filter(v => v !== value)
      }));
    }
  };

  const openAddPanel = (category: string) => {
    setSelectedCategory(category);
    setShowAddPanel(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Admin & Configuration</CardTitle>
          <CardDescription>Manage system settings, variables, and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="okr">OKR Management</TabsTrigger>
              <TabsTrigger value="variables">Dropdown Variables</TabsTrigger>
              <TabsTrigger value="template">Project Template</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="backup">Backups & Refresh</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="okr" className="mt-6">
              <OKRManagement />
            </TabsContent>

            <TabsContent value="variables" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Category List */}
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="border rounded-lg p-2 space-y-1" style={{ borderRadius: '12px' }}>
                    {variableCategories.map((category) => {
                      const categoryVars = variables[category] || [];
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center justify-between ${
                            selectedCategory === category
                              ? 'bg-[#7A1C46] text-white'
                              : 'hover:bg-gray-100'
                          }`}
                          style={{ borderRadius: '12px' }}
                        >
                          <span>{category.replace(/_/g, ' ')}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              selectedCategory === category 
                                ? 'bg-white text-[#7A1C46] border-white' 
                                : 'bg-gray-100'
                            }`}
                            style={{ borderRadius: '12px' }}
                          >
                            {categoryVars.length}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Values List */}
                <div className="md:col-span-3 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3>{selectedCategory.replace(/_/g, ' ')}</h3>
                      <p className="text-sm text-gray-600">
                        Manage values for {selectedCategory.replace(/_/g, ' ').toLowerCase()}
                      </p>
                    </div>
                    {/* Simple Add Value Button */}
                    <Button 
                      className="bg-[#7A1C46] hover:bg-[#5A1434]" 
                      style={{ borderRadius: '12px' }}
                      onClick={() => setShowAddPanel(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Value
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 min-h-[100px]" style={{ borderRadius: '12px' }}>
                    {(variables[selectedCategory] || []).length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {(variables[selectedCategory] || []).map((value, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="px-3 py-2 hover:bg-gray-100"
                            style={{ borderRadius: '12px' }}
                          >
                            {value}
                            <button
                              className="ml-2 text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteValue(selectedCategory, value)}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        No values added yet. Click "Add Value" to get started.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Add Value Dialog */}
              {showAddPanel && (
                <div className="fixed inset-0 z-50 flex items-start justify-end">
                  <div 
                    className="absolute inset-0 bg-black/20"
                    onClick={() => setShowAddPanel(false)}
                  />
                  <div 
                    className="relative bg-white h-full w-[400px] shadow-2xl overflow-y-auto animate-in slide-in-from-right"
                    style={{ borderRadius: '0' }}
                  >
                    {/* Panel Header */}
                    <div className="sticky top-0 bg-white border-b p-6 z-10">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                            ➕ Add New Dropdown Value
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Add a new value to dropdown list - affects all forms platform-wide
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddPanel(false)}
                          style={{ borderRadius: '12px' }}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Panel Content */}
                    <div className="p-6 space-y-6">
                      {/* Dropdown List Type */}
                      <div className="space-y-2">
                        <Label htmlFor="listType">
                          Dropdown List Type <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          value={selectedCategory} 
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger style={{ borderRadius: '12px' }}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {variableCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.replace(/_/g, ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500">
                          Select which dropdown list to add this value to
                        </p>
                      </div>

                      {/* New Value */}
                      <div className="space-y-2">
                        <Label htmlFor="newValue">
                          New Value <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="newValue"
                          placeholder="e.g., Manufacturing, Singapore, Q1 2025"
                          value={newValue}
                          onChange={(e) => setNewValue(e.target.value)}
                          style={{ borderRadius: '12px' }}
                        />
                      </div>

                      {/* Code / Short Name */}
                      <div className="space-y-2">
                        <Label htmlFor="code">Code / Short Name (Optional)</Label>
                        <Input
                          id="code"
                          placeholder="e.g., MANUF, SG, Q1-25"
                          value={newValueCode}
                          onChange={(e) => setNewValueCode(e.target.value.toUpperCase())}
                          style={{ borderRadius: '12px' }}
                        />
                        <p className="text-xs text-gray-500">
                          Optional technical identifier for API/database use
                        </p>
                      </div>

                      {/* Status Toggle */}
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <div className="flex items-center gap-3 p-3 border rounded-lg" style={{ borderRadius: '12px' }}>
                          <Switch
                            id="status"
                            checked={newValueStatus}
                            onCheckedChange={setNewValueStatus}
                          />
                          <div>
                            <div className="text-sm">
                              {newValueStatus ? 'Active' : 'Inactive'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {newValueStatus 
                                ? 'Value will be visible in all dropdowns' 
                                : 'Value will be hidden from dropdowns'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Description (Why Added)</Label>
                        <Textarea
                          id="description"
                          placeholder="Add context: Why was this value added? When should it be used?"
                          value={newValueDescription}
                          onChange={(e) => setNewValueDescription(e.target.value)}
                          rows={4}
                          style={{ borderRadius: '12px' }}
                        />
                        <p className="text-xs text-gray-500">
                          Optional notes for audit trail and team reference
                        </p>
                      </div>

                      {/* Governance Rules Info Box */}
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg" style={{ borderRadius: '12px' }}>
                        <div className="flex items-start gap-2">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-900">
                            <strong>Governance Rules:</strong>
                            <ul className="mt-2 space-y-1 list-disc list-inside text-xs">
                              <li>Only Admin/Manager can add or edit dropdown values</li>
                              <li>Changes sync to global cache immediately</li>
                              <li>All modifications are logged in Change History</li>
                              <li>Forms auto-refresh every 12 hours or on manual sync</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Panel Footer */}
                    <div className="sticky bottom-0 bg-white border-t p-6">
                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            if (!newValue.trim()) {
                              toast.error('Please enter a value');
                              return;
                            }
                            
                            setVariables(prev => ({
                              ...prev,
                              [selectedCategory]: [...(prev[selectedCategory] || []), newValue.trim()]
                            }));
                            
                            toast.success(`✅ ${newValue} added to ${selectedCategory.replace(/_/g, ' ')} successfully`);
                            
                            setShowAddPanel(false);
                            setNewValue('');
                            setNewValueCode('');
                            setNewValueDescription('');
                            setNewValueStatus(true);
                          }}
                          style={{ 
                            backgroundColor: '#0052CC', 
                            color: 'white',
                            borderRadius: '12px',
                            flex: 1,
                          }}
                          disabled={!newValue.trim()}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowAddPanel(false);
                            setNewValue('');
                            setNewValueCode('');
                            setNewValueDescription('');
                            setNewValueStatus(true);
                          }}
                          style={{ borderRadius: '12px' }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="template" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3>Default Campaign KPIs</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Set default KPI targets for the 8 standard campaigns
                  </p>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign Type</TableHead>
                          <TableHead>Default Target</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(defaultKPITemplate).map(([campaign, data]) => (
                          <TableRow key={campaign}>
                            <TableCell>{campaign}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                defaultValue={data.target}
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>{data.unit}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Save className="w-3 h-3 mr-1" />
                                Save
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3>Auto Task Flow Configuration</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Define default task stages and workflows
                  </p>
                  <div className="border rounded-lg p-4">
                    <Textarea
                      rows={10}
                      defaultValue={JSON.stringify(
                        {
                          'Content Development': [
                            'Ideation',
                            'Draft',
                            'Review',
                            'Approved',
                            'Published',
                          ],
                          Designing: ['Planned', 'In Progress', 'Review', 'Approved'],
                          'Backlink Submission': ['Queued', 'Submitted', 'Indexed'],
                        },
                        null,
                        2
                      )}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                      <Save className="w-4 h-4 mr-2" />
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h3>Access Control Matrix</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage role-based permissions for each module
                  </p>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Module</TableHead>
                        <TableHead className="text-center">Admin</TableHead>
                        <TableHead className="text-center">Editor</TableHead>
                        <TableHead className="text-center">Viewer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissions.map((perm) => (
                        <TableRow key={perm.module}>
                          <TableCell>{perm.module}</TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={perm.admin}
                              className="w-4 h-4 accent-[#7A1C46]"
                              readOnly
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={perm.editor}
                              className="w-4 h-4 accent-[#7A1C46]"
                              readOnly
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={perm.viewer}
                              className="w-4 h-4 accent-[#7A1C46]"
                              readOnly
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                    <Shield className="w-4 h-4 mr-2" />
                    Update Permissions
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="backup" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-[#7A1C46]" />
                      Data Backup
                    </CardTitle>
                    <CardDescription>Export all data for backup purposes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Last backup: October 25, 2024</p>
                      <Button className="w-full bg-[#7A1C46] hover:bg-[#5A1434]">
                        <Download className="w-4 h-4 mr-2" />
                        Run Full Backup
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded p-3">
                      💡 Backups include all master data, working repository, and projects
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-[#7A1C46]" />
                      Restore Data
                    </CardTitle>
                    <CardDescription>Import data from a previous backup</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Backup File</Label>
                      <Input type="file" accept=".json,.zip" />
                      <Button className="w-full" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Restore from Backup
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 bg-red-50 border border-red-200 rounded p-3">
                      ⚠️ Warning: Restoring will overwrite existing data
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-[#7A1C46]" />
                      Refresh Masters
                    </CardTitle>
                    <CardDescription>Sync data from external sources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Last refresh: October 31, 2024</p>
                      <Button className="w-full" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Refresh All Masters
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current system health</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database</span>
                        <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Connections</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Sync</span>
                        <span className="text-sm text-gray-600">2 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}