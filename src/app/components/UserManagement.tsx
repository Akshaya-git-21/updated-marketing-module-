import { useState } from 'react';
import { 
  Plus, Upload, Search, X, Edit, Trash2, Power, ChevronDown, 
  ChevronUp, Filter, XCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

// Role configuration with colors
const ROLE_CONFIG = {
  admin: { label: 'Admin', color: 'bg-red-100 text-red-800', department: 'Management' },
  manager: { label: 'Manager', color: 'bg-teal-100 text-teal-800', department: 'Management' },
  seo_specialist: { label: 'SEO Specialist', color: 'bg-blue-100 text-blue-800', department: 'Marketing' },
  smm_specialist: { label: 'SMM Specialist', color: 'bg-purple-100 text-purple-800', department: 'Marketing' },
  content_writer: { label: 'Content Writer', color: 'bg-green-100 text-green-800', department: 'Marketing' },
  web_developer: { label: 'Web Developer', color: 'bg-orange-100 text-orange-800', department: 'Tech' },
  graphic_designer: { label: 'Graphic Designer', color: 'bg-pink-100 text-pink-800', department: 'Design' },
  qc_person: { label: 'QC Person', color: 'bg-gray-100 text-gray-800', department: 'Quality Control' },
};

interface User {
  id: string;
  name: string;
  email: string;
  role: keyof typeof ROLE_CONFIG;
  department: string;
  lastLogin: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdDate: string;
  permissions: string[];
  okrTargets?: {
    visitors?: number;
    backlinks?: number;
    contentPieces?: number;
  };
  notes?: string;
}

export default function UserManagement() {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showBulkImportDialog, setShowBulkImportDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('name_asc');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'content_writer' as keyof typeof ROLE_CONFIG,
    department: '',
    status: true,
    permissions: [] as string[],
    okrCycle: '',
    okrTargets: {
      visitors: 0,
      backlinks: 0,
      contentPieces: 0,
    },
    notes: '',
  });

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@beetloop.com',
      role: 'admin',
      department: 'Management',
      lastLogin: '13 Nov 2024, 10:30 AM',
      status: 'Active',
      createdDate: '2024-01-15',
      permissions: ['Campaign Create/Edit', 'View Repositories', 'QC Approvals', 'Edit OKR Targets'],
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@beetloop.com',
      role: 'seo_specialist',
      department: 'Marketing',
      lastLogin: '12 Nov 2024, 03:45 PM',
      status: 'Active',
      createdDate: '2024-02-20',
      permissions: ['Campaign Create/Edit', 'View Repositories'],
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@beetloop.com',
      role: 'content_writer',
      department: 'Marketing',
      lastLogin: '10 Nov 2024, 09:15 AM',
      status: 'Active',
      createdDate: '2024-03-10',
      permissions: ['View Repositories', 'QC Approvals'],
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@beetloop.com',
      role: 'smm_specialist',
      department: 'Marketing',
      lastLogin: '08 Nov 2024, 02:20 PM',
      status: 'Inactive',
      createdDate: '2024-03-25',
      permissions: ['Campaign Create/Edit'],
    },
    {
      id: '5',
      name: 'Alex Martinez',
      email: 'alex.martinez@beetloop.com',
      role: 'web_developer',
      department: 'Tech',
      lastLogin: '13 Nov 2024, 11:00 AM',
      status: 'Active',
      createdDate: '2024-04-05',
      permissions: ['Campaign Create/Edit', 'View Repositories'],
    },
  ]);

  const availablePermissions = [
    'Campaign Create/Edit',
    'View Repositories',
    'QC Approvals',
    'Edit OKR Targets',
  ];

  // Filtering and sorting logic
  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
      const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment;
      
      return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'date_asc':
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        case 'date_desc':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'role':
          return a.role.localeCompare(b.role);
        default:
          return 0;
      }
    });

  const handleAddNewUser = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'content_writer',
      department: '',
      status: true,
      permissions: ['View Repositories'],
      okrCycle: '',
      okrTargets: { visitors: 0, backlinks: 0, contentPieces: 0 },
      notes: '',
    });
    setShowSidePanel(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: '',
      role: user.role,
      department: user.department,
      status: user.status === 'Active',
      permissions: user.permissions,
      okrCycle: '',
      okrTargets: user.okrTargets || { visitors: 0, backlinks: 0, contentPieces: 0 },
      notes: user.notes || '',
    });
    setShowSidePanel(true);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? {
              ...u,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              department: formData.department || ROLE_CONFIG[formData.role].department,
              status: formData.status ? 'Active' : 'Inactive',
              permissions: formData.permissions,
              okrTargets: formData.okrTargets,
              notes: formData.notes,
            }
          : u
      ));
      toast.success('✅ User Updated Successfully');
    } else {
      // Add new user
      const newUser: User = {
        id: `${users.length + 1}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department || ROLE_CONFIG[formData.role].department,
        lastLogin: 'Never',
        status: formData.status ? 'Active' : 'Inactive',
        createdDate: new Date().toISOString().split('T')[0],
        permissions: formData.permissions,
        okrTargets: formData.okrTargets,
        notes: formData.notes,
      };
      setUsers([...users, newUser]);
      toast.success('✅ User Created Successfully');
    }

    setShowSidePanel(false);
  };

  const handleDeactivateUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
        : u
    ));
    toast.success('User status updated');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    setShowDeleteConfirm(false);
    toast.success('User deleted successfully');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterRole('all');
    setFilterStatus('all');
    setFilterDepartment('all');
    setSortBy('name_asc');
  };

  const hasActiveFilters = searchQuery || filterRole !== 'all' || filterStatus !== 'all' || filterDepartment !== 'all';

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            👤 User Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">Manage team members and their access permissions</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowBulkImportDialog(true)}
            style={{ borderRadius: '12px', fontFamily: 'Inter' }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import (CSV)
          </Button>
          <Button
            onClick={handleAddNewUser}
            style={{ 
              backgroundColor: '#0052CC', 
              color: 'white',
              borderRadius: '12px',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '16px',
            }}
            className="hover:shadow-md transition-shadow"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card style={{ borderRadius: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>

            {/* Role Filter */}
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-[150px]" style={{ borderRadius: '12px' }}>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px]" style={{ borderRadius: '12px' }}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            {/* Department Filter */}
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[150px]" style={{ borderRadius: '12px' }}>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Quality Control">Quality Control</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]" style={{ borderRadius: '12px' }}>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name_asc">Name ↑</SelectItem>
                <SelectItem value="name_desc">Name ↓</SelectItem>
                <SelectItem value="date_asc">Created Date ↑</SelectItem>
                <SelectItem value="date_desc">Created Date ↓</SelectItem>
                <SelectItem value="role">Role</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                style={{ borderRadius: '12px' }}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card style={{ borderRadius: '12px' }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4 text-left w-12">
                    <Checkbox />
                  </th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Last Login</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 text-gray-300" />
                        <p>No users found</p>
                        {hasActiveFilters && (
                          <Button variant="link" onClick={handleClearFilters}>
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedUsers.map((user) => (
                    <tr 
                      key={user.id}
                      className="border-b hover:bg-gray-50 transition-colors group"
                    >
                      <td className="p-4">
                        <Checkbox />
                      </td>
                      <td className="p-4">
                        <div>
                          <div 
                            className="cursor-pointer hover:text-[#0052CC] transition-colors"
                            onClick={() => handleEditUser(user)}
                          >
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={ROLE_CONFIG[user.role].color} style={{ borderRadius: '12px' }}>
                          {ROLE_CONFIG[user.role].label}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{user.lastLogin}</td>
                      <td className="p-4">
                        <Switch
                          checked={user.status === 'Active'}
                          onCheckedChange={() => handleDeactivateUser(user.id)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditUser(user)}
                            style={{ borderRadius: '12px' }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeactivateUser(user.id)}
                            style={{ borderRadius: '12px' }}
                          >
                            <Power className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingUser(user);
                              setShowDeleteConfirm(true);
                            }}
                            style={{ borderRadius: '12px' }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredAndSortedUsers.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {filteredAndSortedUsers.length} of {users.length} users
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <Select defaultValue="10">
                  <SelectTrigger className="w-[70px]" style={{ borderRadius: '12px' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600 ml-4">Page 1 of 1</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right Side Panel - Add/Edit User */}
      {showSidePanel && (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
          <div 
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowSidePanel(false)}
          />
          <div 
            className="relative bg-white h-full w-[480px] shadow-2xl overflow-y-auto animate-in slide-in-from-right"
            style={{ borderRadius: '0' }}
          >
            {/* Panel Header */}
            <div className="sticky top-0 bg-white border-b p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    {editingUser ? '✏️ Edit User' : '➕ Add New User'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Assign roles and targets for campaign visibility
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSidePanel(false)}
                  style={{ borderRadius: '12px' }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">Basic Information</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    style={{ borderRadius: '12px' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john.doe@company.com"
                    style={{ borderRadius: '12px' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </div>

              {/* Role & Department Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">Role & Department</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="role">
                    Role <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => {
                      const role = value as keyof typeof ROLE_CONFIG;
                      setFormData({ 
                        ...formData, 
                        role,
                        department: ROLE_CONFIG[role].department,
                      });
                    }}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department || ROLE_CONFIG[formData.role].department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{ borderRadius: '12px' }}
                    disabled
                  />
                </div>
              </div>

              {/* Access Permissions Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">Access Permissions</h4>
                
                <div className="space-y-3">
                  {availablePermissions.map((permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <Checkbox
                        id={permission}
                        checked={formData.permissions.includes(permission)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              permissions: [...formData.permissions, permission],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              permissions: formData.permissions.filter(p => p !== permission),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={permission} className="cursor-pointer">
                        {permission}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* OKR Target Linking Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">OKR Target Linking</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="okrCycle">OKR Cycle</Label>
                  <Select 
                    value={formData.okrCycle} 
                    onValueChange={(value) => setFormData({ ...formData, okrCycle: value })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue placeholder="Select OKR cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q4-2024">Q4 2024</SelectItem>
                      <SelectItem value="q1-2025">Q1 2025</SelectItem>
                      <SelectItem value="q2-2025">Q2 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="visitors">Visitors Target</Label>
                    <Input
                      id="visitors"
                      type="number"
                      value={formData.okrTargets.visitors}
                      onChange={(e) => setFormData({
                        ...formData,
                        okrTargets: { ...formData.okrTargets, visitors: parseInt(e.target.value) || 0 }
                      })}
                      style={{ borderRadius: '12px' }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backlinks">Backlinks Target</Label>
                    <Input
                      id="backlinks"
                      type="number"
                      value={formData.okrTargets.backlinks}
                      onChange={(e) => setFormData({
                        ...formData,
                        okrTargets: { ...formData.okrTargets, backlinks: parseInt(e.target.value) || 0 }
                      })}
                      style={{ borderRadius: '12px' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contentPieces">Content Pieces Target</Label>
                  <Input
                    id="contentPieces"
                    type="number"
                    value={formData.okrTargets.contentPieces}
                    onChange={(e) => setFormData({
                      ...formData,
                      okrTargets: { ...formData.okrTargets, contentPieces: parseInt(e.target.value) || 0 }
                    })}
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">Status</h4>
                
                <div className="flex items-center gap-3">
                  <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                  />
                  <Label htmlFor="status" className="cursor-pointer">
                    {formData.status ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">Notes</h4>
                
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Optional remarks..."
                  rows={4}
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>

            {/* Panel Footer */}
            <div className="sticky bottom-0 bg-white border-t p-6">
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveUser}
                  style={{ 
                    backgroundColor: '#0052CC', 
                    color: 'white',
                    borderRadius: '12px',
                    flex: 1,
                  }}
                >
                  Save & Assign
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSidePanel(false)}
                  style={{ borderRadius: '12px' }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Dialog */}
      <Dialog open={showBulkImportDialog} onOpenChange={setShowBulkImportDialog}>
        <DialogContent style={{ borderRadius: '12px' }}>
          <DialogHeader>
            <DialogTitle>Bulk Import Users (CSV)</DialogTitle>
            <DialogDescription>
              Upload a CSV file with user information to create multiple users at once
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your CSV file here, or click to browse
              </p>
              <Button variant="outline" style={{ borderRadius: '12px' }}>
                Choose File
              </Button>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>CSV Format: name, email, role, department, status</p>
              <p>Example: John Doe, john@company.com, seo_specialist, Marketing, Active</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkImportDialog(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: '#0052CC', color: 'white' }}>
              Import Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent style={{ borderRadius: '12px' }}>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the user account for{' '}
              <strong>{editingUser?.name}</strong>. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button 
              style={{ backgroundColor: '#D92D20', color: 'white' }}
              onClick={() => editingUser && handleDeleteUser(editingUser.id)}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
