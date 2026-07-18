import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Download, Upload, RefreshCw, Search, Filter, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';

interface Variable {
  Variable_ID: string;
  Variable_Category: string;
  Variable_Value: string;
  Variable_Code?: string;
  Display_Order?: number;
  Is_Active: boolean;
  Parent_Variable_ID?: string | null;
  Description?: string;
  Created_Date: string;
  Updated_Date: string;
  Updated_By: string;
}

export default function SystemVariablesHub() {
  const [activeTab, setActiveTab] = useState('Industries');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Form state for adding/editing
  const [formData, setFormData] = useState({
    category: 'Industries',
    value: '',
    code: '',
    description: '',
    displayOrder: '',
    isActive: true,
  });

  // State for variables (making it stateful so we can add/edit/delete)
  const [variables, setVariables] = useState<Variable[]>([
    // Industries
    { Variable_ID: 'VAR001', Variable_Category: 'Industries', Variable_Value: 'Technology', Variable_Code: 'TECH', Display_Order: 1, Is_Active: true, Parent_Variable_ID: null, Description: 'Technology and IT services', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR002', Variable_Category: 'Industries', Variable_Value: 'Healthcare', Variable_Code: 'HEALTH', Display_Order: 2, Is_Active: true, Parent_Variable_ID: null, Description: 'Healthcare and medical services', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR003', Variable_Category: 'Industries', Variable_Value: 'Finance', Variable_Code: 'FIN', Display_Order: 3, Is_Active: true, Parent_Variable_ID: null, Description: 'Financial services and banking', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR004', Variable_Category: 'Industries', Variable_Value: 'Retail', Variable_Code: 'RETAIL', Display_Order: 4, Is_Active: true, Parent_Variable_ID: null, Description: 'Retail and e-commerce', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR005', Variable_Category: 'Industries', Variable_Value: 'Education', Variable_Code: 'EDU', Display_Order: 5, Is_Active: true, Parent_Variable_ID: null, Description: 'Education and training', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    
    // Countries
    { Variable_ID: 'VAR101', Variable_Category: 'Countries', Variable_Value: 'United States', Variable_Code: 'US', Display_Order: 1, Is_Active: true, Parent_Variable_ID: null, Description: 'United States of America', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR102', Variable_Category: 'Countries', Variable_Value: 'United Kingdom', Variable_Code: 'UK', Display_Order: 2, Is_Active: true, Parent_Variable_ID: null, Description: 'United Kingdom', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR103', Variable_Category: 'Countries', Variable_Value: 'India', Variable_Code: 'IN', Display_Order: 3, Is_Active: true, Parent_Variable_ID: null, Description: 'Republic of India', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR104', Variable_Category: 'Countries', Variable_Value: 'Canada', Variable_Code: 'CA', Display_Order: 4, Is_Active: true, Parent_Variable_ID: null, Description: 'Canada', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR105', Variable_Category: 'Countries', Variable_Value: 'Australia', Variable_Code: 'AU', Display_Order: 5, Is_Active: true, Parent_Variable_ID: null, Description: 'Australia', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    
    // Service Categories
    { Variable_ID: 'VAR201', Variable_Category: 'Service_Categories', Variable_Value: 'SEO Services', Variable_Code: 'SEO', Display_Order: 1, Is_Active: true, Parent_Variable_ID: null, Description: 'Search Engine Optimization', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR202', Variable_Category: 'Service_Categories', Variable_Value: 'Content Marketing', Variable_Code: 'CONTENT', Display_Order: 2, Is_Active: true, Parent_Variable_ID: null, Description: 'Content creation and marketing', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR203', Variable_Category: 'Service_Categories', Variable_Value: 'Social Media Marketing', Variable_Code: 'SMM', Display_Order: 3, Is_Active: true, Parent_Variable_ID: null, Description: 'Social media management', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR204', Variable_Category: 'Service_Categories', Variable_Value: 'PPC Advertising', Variable_Code: 'PPC', Display_Order: 4, Is_Active: true, Parent_Variable_ID: null, Description: 'Pay-per-click advertising', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    
    // Campaign Types
    { Variable_ID: 'VAR301', Variable_Category: 'Campaign_Types', Variable_Value: 'SEO On-Page', Variable_Code: 'SEO_ONPAGE', Display_Order: 1, Is_Active: true, Parent_Variable_ID: null, Description: 'On-page SEO optimization', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR302', Variable_Category: 'Campaign_Types', Variable_Value: 'Link Building', Variable_Code: 'LINKBUILD', Display_Order: 2, Is_Active: true, Parent_Variable_ID: null, Description: 'Backlink acquisition', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR303', Variable_Category: 'Campaign_Types', Variable_Value: 'Content Creation', Variable_Code: 'CONTENT_CREATE', Display_Order: 3, Is_Active: true, Parent_Variable_ID: null, Description: 'Content writing and production', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR304', Variable_Category: 'Campaign_Types', Variable_Value: 'Social Media Campaign', Variable_Code: 'SOCIAL_CAMP', Display_Order: 4, Is_Active: true, Parent_Variable_ID: null, Description: 'Social media campaigns', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    
    // Regulations
    { Variable_ID: 'VAR401', Variable_Category: 'Regulations', Variable_Value: 'GDPR', Variable_Code: 'GDPR', Display_Order: 1, Is_Active: true, Parent_Variable_ID: null, Description: 'General Data Protection Regulation', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR402', Variable_Category: 'Regulations', Variable_Value: 'HIPAA', Variable_Code: 'HIPAA', Display_Order: 2, Is_Active: true, Parent_Variable_ID: null, Description: 'Health Insurance Portability Act', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR403', Variable_Category: 'Regulations', Variable_Value: 'SOC2', Variable_Code: 'SOC2', Display_Order: 3, Is_Active: true, Parent_Variable_ID: null, Description: 'Service Organization Control 2', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    
    // Status Types
    { Variable_ID: 'VAR501', Variable_Category: 'Status', Variable_Value: 'Active', Variable_Code: 'ACTIVE', Display_Order: 1, Is_Active: true, Parent_Variable_ID: null, Description: 'Active status', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR502', Variable_Category: 'Status', Variable_Value: 'Inactive', Variable_Code: 'INACTIVE', Display_Order: 2, Is_Active: true, Parent_Variable_ID: null, Description: 'Inactive status', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR503', Variable_Category: 'Status', Variable_Value: 'Pending', Variable_Code: 'PENDING', Display_Order: 3, Is_Active: true, Parent_Variable_ID: null, Description: 'Pending status', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
    { Variable_ID: 'VAR504', Variable_Category: 'Status', Variable_Value: 'Completed', Variable_Code: 'COMPLETED', Display_Order: 4, Is_Active: true, Parent_Variable_ID: null, Description: 'Completed status', Created_Date: '2024-01-15', Updated_Date: '2024-10-28', Updated_By: 'Admin' },
  ]);

  const categories = [
    'Industries',
    'Countries',
    'Service_Categories',
    'Campaign_Types',
    'Regulations',
    'Status',
    'Priority_Levels',
    'Content_Types',
    'Asset_Types',
  ];

  const filteredVariables = variables
    .filter(v => v.Variable_Category === activeTab)
    .filter(v => v.Variable_Value.toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  // Handler functions
  const handleAddVariable = () => {
    if (!formData.value || !formData.category) return;

    const newVariable: Variable = {
      Variable_ID: `VAR${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      Variable_Category: formData.category,
      Variable_Value: formData.value,
      Variable_Code: formData.code || formData.value.substring(0, 5).toUpperCase(),
      Display_Order: parseInt(formData.displayOrder) || variables.filter(v => v.Variable_Category === formData.category).length + 1,
      Is_Active: formData.isActive,
      Parent_Variable_ID: null,
      Description: formData.description,
      Created_Date: new Date().toISOString().split('T')[0],
      Updated_Date: new Date().toISOString().split('T')[0],
      Updated_By: 'Team Lead Demo'
    };

    setVariables([...variables, newVariable]);
    setShowAddDialog(false);
    setFormData({
      category: 'Industries',
      value: '',
      code: '',
      description: '',
      displayOrder: '',
      isActive: true,
    });
    setActiveTab(formData.category); // Switch to the tab where we added the variable
  };

  const handleEditVariable = (variable: Variable) => {
    setEditingId(variable.Variable_ID);
    setFormData({
      category: variable.Variable_Category,
      value: variable.Variable_Value,
      code: variable.Variable_Code || '',
      description: variable.Description || '',
      displayOrder: variable.Display_Order?.toString() || '',
      isActive: variable.Is_Active,
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    setVariables(variables.map(v => 
      v.Variable_ID === editingId
        ? {
            ...v,
            Variable_Value: formData.value,
            Variable_Code: formData.code,
            Description: formData.description,
            Display_Order: parseInt(formData.displayOrder) || v.Display_Order,
            Is_Active: formData.isActive,
            Updated_Date: new Date().toISOString().split('T')[0],
            Updated_By: 'Team Lead Demo'
          }
        : v
    ));

    setShowEditDialog(false);
    setEditingId(null);
    setFormData({
      category: 'Industries',
      value: '',
      code: '',
      description: '',
      displayOrder: '',
      isActive: true,
    });
  };

  const handleDeleteVariable = (variableId: string) => {
    if (confirm('Are you sure you want to delete this variable? This may affect existing records that use this value.')) {
      setVariables(variables.filter(v => v.Variable_ID !== variableId));
    }
  };

  const handleToggleActive = (variableId: string) => {
    setVariables(variables.map(v => 
      v.Variable_ID === variableId
        ? { ...v, Is_Active: !v.Is_Active, Updated_Date: new Date().toISOString().split('T')[0], Updated_By: 'Team Lead Demo' }
        : v
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#7A1C46]">System Variables & Dropdown Configuration</CardTitle>
              <p className="text-gray-600 mt-1">Manage all dropdown values used across the marketing system</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              {/* Add Value Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]" style={{ borderRadius: '12px' }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Value
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={{ borderRadius: '12px' }} className="w-56">
                  <div className="px-2 py-2 text-xs text-gray-500">Select Category to Add Variable:</div>
                  <DropdownMenuSeparator />
                  {categories.map((cat) => {
                    const categoryVariables = variables.filter(v => v.Variable_Category === cat);
                    return (
                      <DropdownMenuItem
                        key={cat}
                        onClick={() => {
                          setFormData({ ...formData, category: cat, value: '', code: '', description: '', displayOrder: '' });
                          setShowAddDialog(true);
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{cat.replace(/_/g, ' ')}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {categoryVariables.length}
                          </Badge>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogContent style={{ borderRadius: '12px' }}>
                  <DialogHeader>
                    <DialogTitle>Add New Variable</DialogTitle>
                    <DialogDescription>Create a new system variable for dropdown menus</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger style={{ borderRadius: '12px' }}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat.replace(/_/g, ' ')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Variable Value *</Label>
                      <Input 
                        placeholder="Enter value (e.g., Manufacturing)" 
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        style={{ borderRadius: '12px' }} 
                      />
                    </div>
                    <div>
                      <Label>Variable Code</Label>
                      <Input 
                        placeholder="Enter code (e.g., MANUF)" 
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        style={{ borderRadius: '12px' }} 
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate from value</p>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input 
                        placeholder="Enter description" 
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        style={{ borderRadius: '12px' }} 
                      />
                    </div>
                    <div>
                      <Label>Display Order</Label>
                      <Input 
                        type="number" 
                        placeholder="Auto-assigned if blank" 
                        value={formData.displayOrder}
                        onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                        style={{ borderRadius: '12px' }} 
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="isActiveAdd"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="isActiveAdd" className="cursor-pointer">Active (visible in dropdowns)</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="bg-[#7A1C46] hover:bg-[#5A1434]" 
                        style={{ borderRadius: '12px' }}
                        onClick={handleAddVariable}
                        disabled={!formData.value}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddDialog(false)} style={{ borderRadius: '12px' }}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Edit Variable Dialog */}
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent style={{ borderRadius: '12px' }}>
                  <DialogHeader>
                    <DialogTitle>Edit Variable</DialogTitle>
                    <DialogDescription>Update the variable details</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Category</Label>
                      <Input 
                        value={formData.category.replace(/_/g, ' ')}
                        disabled
                        style={{ borderRadius: '12px', backgroundColor: '#f5f5f5' }} 
                      />
                      <p className="text-xs text-gray-500 mt-1">Category cannot be changed after creation</p>
                    </div>
                    <div>
                      <Label>Variable Value *</Label>
                      <Input 
                        placeholder="Enter value" 
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        style={{ borderRadius: '12px' }} 
                      />
                    </div>
                    <div>
                      <Label>Variable Code</Label>
                      <Input 
                        placeholder="Enter code" 
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                        style={{ borderRadius: '12px' }} 
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input 
                        placeholder="Enter description" 
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        style={{ borderRadius: '12px' }} 
                      />
                    </div>
                    <div>
                      <Label>Display Order</Label>
                      <Input 
                        type="number" 
                        placeholder="Display order" 
                        value={formData.displayOrder}
                        onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                        style={{ borderRadius: '12px' }} 
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="isActive" className="cursor-pointer">Active</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="bg-[#7A1C46] hover:bg-[#5A1434]" 
                        style={{ borderRadius: '12px' }}
                        onClick={handleSaveEdit}
                        disabled={!formData.value}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setShowEditDialog(false);
                        setEditingId(null);
                      }} style={{ borderRadius: '12px' }}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat}>
                  {cat.replace('_', ' ')}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-6 space-y-4">
              {/* Search and Filter */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search variables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    style={{ borderRadius: '12px' }}
                  />
                </div>
                <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-[#7A1C46]">{filteredVariables.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Total Variables</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-green-600">{filteredVariables.filter(v => v.Is_Active).length}</div>
                      <div className="text-xs text-gray-600 mt-1">Active</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-gray-600">{filteredVariables.filter(v => !v.Is_Active).length}</div>
                      <div className="text-xs text-gray-600 mt-1">Inactive</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-blue-600">{categories.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Categories</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Variables Table */}
              {categories.map(category => (
                <TabsContent key={category} value={category}>
                  <Alert className="mb-4">
                    <AlertDescription>
                      These variables are used in dropdown menus across Services, Projects, Campaigns, and other modules. 
                      Changes here will affect all related forms and filters.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="border rounded-lg overflow-hidden" style={{ borderRadius: '12px' }}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Order</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredVariables.length > 0 ? (
                          filteredVariables
                            .sort((a, b) => (a.Display_Order || 0) - (b.Display_Order || 0))
                            .map((variable) => (
                              <TableRow key={variable.Variable_ID}>
                                <TableCell className="font-mono text-xs">{variable.Variable_ID}</TableCell>
                                <TableCell>{variable.Variable_Value}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{variable.Variable_Code}</Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                                  {variable.Description}
                                </TableCell>
                                <TableCell>{variable.Display_Order}</TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(variable.Is_Active)}>
                                    {variable.Is_Active ? 'Active' : 'Inactive'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">{variable.Updated_Date}</TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" onClick={() => handleEditVariable(variable)}>
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteVariable(variable.Variable_ID)}>
                                      <Trash2 className="w-3 h-3 text-red-600" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                              No variables found in this category
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Usage Information */}
      <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46] text-base">Variable Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm">Where Variables Are Used:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Service Master forms (Industries, Countries, Service Categories)</li>
                <li>• Project & Campaign creation wizards</li>
                <li>• Working Repository filters and search</li>
                <li>• Target Planner configurations</li>
                <li>• Resource Management role assignments</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm">Best Practices:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use clear, descriptive variable values</li>
                <li>• Keep codes short and uppercase (e.g., TECH, US)</li>
                <li>• Set display order for logical sorting</li>
                <li>• Mark as inactive instead of deleting (preserves history)</li>
                <li>• Add descriptions for clarity</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}