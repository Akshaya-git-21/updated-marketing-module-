import { useState } from 'react';
import {
  Plus, Upload, Trash2, Edit, ExternalLink, AlertTriangle,
  User, Link, RefreshCw, CheckCircle2, UserPlus, KeyRound,
  Search, Eye, Copy, Download, Shield, Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface BacklinkMaster {
  Backlink_ID: string;
  Domain_Name: string;
  Platform_Type: string;
  Category: string;
  Industry: string;
  Country: string;
  DA_Score: number;
  PA_Score: number;
  Spam_Score: number;
  Status: 'Ready' | 'Pending Review' | 'Approved' | 'Rejected';
  Found_Date: string;
  Found_By: string;
  Notes: string;
}

interface CredentialAssignment {
  Assignment_ID: string;
  Backlink_ID: string;
  Domain_Name: string;
  Assigned_To: string;
  Assignment_Date: string;
  Username: string;
  Password: string;
  Recovery_Email: string;
  Account_Status: 'Pending' | 'Created' | 'Verified' | 'Failed';
  Created_Date: string;
  Last_Updated: string;
  Notes: string;
}

export default function BacklinkMasterHub() {
  const [activeTab, setActiveTab] = useState<'all_backlinks' | 'unpw_management'>('all_backlinks');
  const [showAddBacklinkDialog, setShowAddBacklinkDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showCreateCredentialDialog, setShowCreateCredentialDialog] = useState(false);
  const [selectedBacklinks, setSelectedBacklinks] = useState<string[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<CredentialAssignment | null>(null);

  // Filter states
  const [backlinkFilters, setBacklinkFilters] = useState({
    status: 'all',
    category: 'all',
    industry: 'all',
    platform: 'all',
  });

  const [credentialFilters, setCredentialFilters] = useState({
    accountStatus: 'all',
    assignedTo: 'all',
  });

  // Mock data for All Backlinks
  const [backlinks] = useState<BacklinkMaster[]>([
    {
      Backlink_ID: 'BL001',
      Domain_Name: 'medium.com',
      Platform_Type: 'Blog',
      Category: 'Publishing Platform',
      Industry: 'Technology',
      Country: 'USA',
      DA_Score: 95,
      PA_Score: 88,
      Spam_Score: 1,
      Status: 'Ready',
      Found_Date: '2024-10-15',
      Found_By: 'SEO Team',
      Notes: 'High authority platform, excellent for tech content'
    },
    {
      Backlink_ID: 'BL002',
      Domain_Name: 'reddit.com',
      Platform_Type: 'Forum',
      Category: 'Discussion Forum',
      Industry: 'General',
      Country: 'USA',
      DA_Score: 91,
      PA_Score: 85,
      Spam_Score: 2,
      Status: 'Ready',
      Found_Date: '2024-10-20',
      Found_By: 'SEO Team',
      Notes: 'Community-based platform with high engagement'
    },
    {
      Backlink_ID: 'BL003',
      Domain_Name: 'dev.to',
      Platform_Type: 'Blog',
      Category: 'Developer Community',
      Industry: 'Technology',
      Country: 'USA',
      DA_Score: 78,
      PA_Score: 72,
      Spam_Score: 1,
      Status: 'Pending Review',
      Found_Date: '2024-10-22',
      Found_By: 'Content Team',
      Notes: 'Developer-focused community'
    },
    {
      Backlink_ID: 'BL004',
      Domain_Name: 'quora.com',
      Platform_Type: 'Q&A',
      Category: 'Question & Answer',
      Industry: 'General',
      Country: 'USA',
      DA_Score: 93,
      PA_Score: 89,
      Spam_Score: 2,
      Status: 'Ready',
      Found_Date: '2024-10-25',
      Found_By: 'SEO Team',
      Notes: 'Good for thought leadership content'
    },
    {
      Backlink_ID: 'BL005',
      Domain_Name: 'hashnode.com',
      Platform_Type: 'Blog',
      Category: 'Developer Blogging',
      Industry: 'Technology',
      Country: 'India',
      DA_Score: 68,
      PA_Score: 65,
      Spam_Score: 1,
      Status: 'Approved',
      Found_Date: '2024-10-28',
      Found_By: 'Content Team',
      Notes: 'Growing developer community'
    }
  ]);

  // Mock data for UN/PW Management
  const [credentials] = useState<CredentialAssignment[]>([
    {
      Assignment_ID: 'ASG001',
      Backlink_ID: 'BL001',
      Domain_Name: 'medium.com',
      Assigned_To: 'John Smith',
      Assignment_Date: '2024-10-16',
      Username: 'techwriter_pro',
      Password: '••••••••',
      Recovery_Email: 'recovery@beetloop.com',
      Account_Status: 'Verified',
      Created_Date: '2024-10-17',
      Last_Updated: '2024-10-17',
      Notes: 'Account verified and ready for use'
    },
    {
      Assignment_ID: 'ASG002',
      Backlink_ID: 'BL002',
      Domain_Name: 'reddit.com',
      Assigned_To: 'Sarah Johnson',
      Assignment_Date: '2024-10-21',
      Username: 'tech_discussions',
      Password: '••••••••',
      Recovery_Email: 'recovery2@beetloop.com',
      Account_Status: 'Created',
      Created_Date: '2024-10-22',
      Last_Updated: '2024-10-22',
      Notes: 'Account created, pending email verification'
    },
    {
      Assignment_ID: 'ASG003',
      Backlink_ID: 'BL004',
      Domain_Name: 'quora.com',
      Assigned_To: 'Mike Chen',
      Assignment_Date: '2024-10-26',
      Username: '',
      Password: '',
      Recovery_Email: '',
      Account_Status: 'Pending',
      Created_Date: '',
      Last_Updated: '2024-10-26',
      Notes: 'Assigned but not yet created'
    },
    {
      Assignment_ID: 'ASG004',
      Backlink_ID: 'BL005',
      Domain_Name: 'hashnode.com',
      Assigned_To: 'Emily Davis',
      Assignment_Date: '2024-10-29',
      Username: 'beetloop_dev',
      Password: '••••••••',
      Recovery_Email: 'recovery4@beetloop.com',
      Account_Status: 'Verified',
      Created_Date: '2024-10-30',
      Last_Updated: '2024-10-30',
      Notes: 'Active account with good standing'
    }
  ]);

  const handleAddBacklink = () => {
    toast.success('Backlink added to master list successfully!');
    setShowAddBacklinkDialog(false);
  };

  const handleAssignBacklinks = () => {
    if (selectedBacklinks.length === 0) {
      toast.error('Please select at least one backlink');
      return;
    }
    toast.success(`${selectedBacklinks.length} backlink(s) assigned for UN/PW creation`);
    setSelectedBacklinks([]);
    setShowAssignDialog(false);
  };

  const handleCreateCredential = () => {
    toast.success('Credential created successfully!');
    setShowCreateCredentialDialog(false);
  };

  const toggleBacklinkSelection = (backlinkId: string) => {
    setSelectedBacklinks(prev =>
      prev.includes(backlinkId)
        ? prev.filter(id => id !== backlinkId)
        : [...prev, backlinkId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800';
      case 'Created': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDAColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-blue-100 text-blue-800';
    if (score >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#7A1C46]">🔗 Backlinks Master Hub</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage all backlink sources and their credentials
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all_backlinks">All Backlinks Master List</TabsTrigger>
          <TabsTrigger value="unpw_management">UN/PW Management</TabsTrigger>
        </TabsList>

        {/* Tab 1: All Backlinks Master List */}
        <TabsContent value="all_backlinks" className="space-y-4 mt-6">
          {/* Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button 
                className="bg-[#7A1C46] hover:bg-[#5A1434]"
                style={{ borderRadius: '12px' }}
                onClick={() => setShowAddBacklinkDialog(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Backlink
              </Button>
              <Button variant="outline" style={{ borderRadius: '12px' }}>
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
              {selectedBacklinks.length > 0 && (
                <Button 
                  variant="outline" 
                  style={{ borderRadius: '12px' }}
                  onClick={() => setShowAssignDialog(true)}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign for UN/PW Creation ({selectedBacklinks.length})
                </Button>
              )}
            </div>
            <Button variant="outline" style={{ borderRadius: '12px' }}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Filters */}
          <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
            <CardContent className="py-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Status</Label>
                  <Select 
                    value={backlinkFilters.status} 
                    onValueChange={(val) => setBacklinkFilters({ ...backlinkFilters, status: val })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Category</Label>
                  <Select 
                    value={backlinkFilters.category} 
                    onValueChange={(val) => setBacklinkFilters({ ...backlinkFilters, category: val })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="publishing">Publishing Platform</SelectItem>
                      <SelectItem value="forum">Discussion Forum</SelectItem>
                      <SelectItem value="developer">Developer Community</SelectItem>
                      <SelectItem value="qa">Question & Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Industry</Label>
                  <Select 
                    value={backlinkFilters.industry} 
                    onValueChange={(val) => setBacklinkFilters({ ...backlinkFilters, industry: val })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Platform Type</Label>
                  <Select 
                    value={backlinkFilters.platform} 
                    onValueChange={(val) => setBacklinkFilters({ ...backlinkFilters, platform: val })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="forum">Forum</SelectItem>
                      <SelectItem value="qa">Q&A</SelectItem>
                      <SelectItem value="social">Social Network</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
              <CardContent className="py-4">
                <div className="text-center">
                  <div className="text-2xl text-[#7A1C46]">{backlinks.length}</div>
                  <div className="text-xs text-gray-600 mt-1">Total Backlinks</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
              <CardContent className="py-4">
                <div className="text-center">
                  <div className="text-2xl text-green-600">{backlinks.filter(b => b.Status === 'Ready').length}</div>
                  <div className="text-xs text-gray-600 mt-1">Ready</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
              <CardContent className="py-4">
                <div className="text-center">
                  <div className="text-2xl text-yellow-600">{backlinks.filter(b => b.Status === 'Pending Review').length}</div>
                  <div className="text-xs text-gray-600 mt-1">Pending Review</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
              <CardContent className="py-4">
                <div className="text-center">
                  <div className="text-2xl text-blue-600">{backlinks.filter(b => b.Status === 'Approved').length}</div>
                  <div className="text-xs text-gray-600 mt-1">Approved</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Backlinks Table */}
          <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
            <CardHeader>
              <CardTitle className="text-[#7A1C46]">Backlinks Repository</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedBacklinks.length === backlinks.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBacklinks(backlinks.map(b => b.Backlink_ID));
                            } else {
                              setSelectedBacklinks([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>DA Score</TableHead>
                      <TableHead>Spam</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Found Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backlinks.map((backlink) => (
                      <TableRow key={backlink.Backlink_ID}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedBacklinks.includes(backlink.Backlink_ID)}
                            onCheckedChange={() => toggleBacklinkSelection(backlink.Backlink_ID)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span>{backlink.Domain_Name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{backlink.Platform_Type}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{backlink.Category}</TableCell>
                        <TableCell className="text-sm text-gray-600">{backlink.Industry}</TableCell>
                        <TableCell>
                          <Badge className={getDAColor(backlink.DA_Score)}>
                            {backlink.DA_Score}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={backlink.Spam_Score > 3 ? 'text-red-600' : 'text-green-600'}>
                            {backlink.Spam_Score}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(backlink.Status)}>
                            {backlink.Status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{backlink.Found_Date}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: UN/PW Management */}
        <TabsContent value="unpw_management" className="space-y-4 mt-6">
          {/* Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button 
                className="bg-[#7A1C46] hover:bg-[#5A1434]"
                style={{ borderRadius: '12px' }}
                onClick={() => setShowAssignDialog(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Assign New
              </Button>
            </div>
            <Button variant="outline" style={{ borderRadius: '12px' }}>
              <Download className="w-4 h-4 mr-2" />
              Export Credentials
            </Button>
          </div>

          {/* Filters */}
          <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
            <CardContent className="py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Account Status</Label>
                  <Select 
                    value={credentialFilters.accountStatus} 
                    onValueChange={(val) => setCredentialFilters({ ...credentialFilters, accountStatus: val })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="created">Created</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Assigned To</Label>
                  <Select 
                    value={credentialFilters.assignedTo} 
                    onValueChange={(val) => setCredentialFilters({ ...credentialFilters, assignedTo: val })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                      <SelectItem value="emily">Emily Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
              <CardContent className="py-4">
                <div className="text-center">
                  <div className="text-2xl text-[#7A1C46]">{credentials.length}</div>
                  <div className="text-xs text-gray-600 mt-1">Total Assignments</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
              <CardContent className="py-4">
                <div className="text-center">
                  <div className="text-2xl text-green-600">{credentials.filter(c => c.Account_Status === 'Verified').length}</div>
                  <div className="text-xs text-gray-600 mt-1">Verified</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
              <CardContent className="py-4">
                <div className="text-center">
                  <div className="text-2xl text-yellow-600">{credentials.filter(c => c.Account_Status === 'Pending').length}</div>
                  <div className="text-xs text-gray-600 mt-1">Pending</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
              <CardContent className="py-4">
                <div className="text-center">
                  <div className="text-2xl text-blue-600">{credentials.filter(c => c.Account_Status === 'Created').length}</div>
                  <div className="text-xs text-gray-600 mt-1">Created</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Credentials Table */}
          <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px' }}>
            <CardHeader>
              <CardTitle className="text-[#7A1C46]">Username & Password Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Password</TableHead>
                      <TableHead>Recovery Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {credentials.map((cred) => (
                      <TableRow key={cred.Assignment_ID}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <span>{cred.Domain_Name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{cred.Assigned_To}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {cred.Username ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{cred.Username}</span>
                              <Button size="sm" variant="ghost" onClick={() => toast.success('Username copied!')}>
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Not created</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {cred.Password ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{cred.Password}</span>
                              <Button size="sm" variant="ghost" onClick={() => toast.success('Password copied!')}>
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Not created</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{cred.Recovery_Email || '-'}</TableCell>
                        <TableCell>
                          <Badge className={getAccountStatusColor(cred.Account_Status)}>
                            {cred.Account_Status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{cred.Created_Date || '-'}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {cred.Account_Status === 'Pending' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedAssignment(cred);
                                  setShowCreateCredentialDialog(true);
                                }}
                              >
                                <KeyRound className="w-3 h-3 mr-1" />
                                Create
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Backlink Dialog */}
      <Dialog open={showAddBacklinkDialog} onOpenChange={setShowAddBacklinkDialog}>
        <DialogContent className="max-w-2xl" style={{ borderRadius: '12px' }}>
          <DialogHeader>
            <DialogTitle className="text-[#7A1C46]">Add New Backlink</DialogTitle>
            <DialogDescription>
              Add a new backlink source to the master repository
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Domain Name *</Label>
                <Input placeholder="e.g., medium.com" style={{ borderRadius: '12px' }} />
              </div>
              <div className="space-y-2">
                <Label>Platform Type *</Label>
                <Select>
                  <SelectTrigger style={{ borderRadius: '12px' }}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="forum">Forum</SelectItem>
                    <SelectItem value="qa">Q&A</SelectItem>
                    <SelectItem value="social">Social Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="e.g., Publishing Platform" style={{ borderRadius: '12px' }} />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select>
                  <SelectTrigger style={{ borderRadius: '12px' }}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>DA Score</Label>
                <Input type="number" placeholder="0-100" style={{ borderRadius: '12px' }} />
              </div>
              <div className="space-y-2">
                <Label>PA Score</Label>
                <Input type="number" placeholder="0-100" style={{ borderRadius: '12px' }} />
              </div>
              <div className="space-y-2">
                <Label>Spam Score</Label>
                <Input type="number" placeholder="0-17" style={{ borderRadius: '12px' }} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea 
                placeholder="Add any relevant notes about this backlink source" 
                rows={3}
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddBacklinkDialog(false)} style={{ borderRadius: '12px' }}>
              Cancel
            </Button>
            <Button onClick={handleAddBacklink} className="bg-[#7A1C46] hover:bg-[#5A1434]" style={{ borderRadius: '12px' }}>
              Add Backlink
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-md" style={{ borderRadius: '12px' }}>
          <DialogHeader>
            <DialogTitle className="text-[#7A1C46]">Assign for UN/PW Creation</DialogTitle>
            <DialogDescription>
              Assign selected backlinks to a user for account creation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Backlinks</Label>
              <Select>
                <SelectTrigger style={{ borderRadius: '12px' }}>
                  <SelectValue placeholder="Choose from ready backlinks" />
                </SelectTrigger>
                <SelectContent>
                  {backlinks.filter(b => b.Status === 'Ready').map(b => (
                    <SelectItem key={b.Backlink_ID} value={b.Backlink_ID}>
                      {b.Domain_Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Assign To *</Label>
              <Select>
                <SelectTrigger style={{ borderRadius: '12px' }}>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="mike">Mike Chen</SelectItem>
                  <SelectItem value="emily">Emily Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea 
                placeholder="Special instructions or requirements" 
                rows={3}
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)} style={{ borderRadius: '12px' }}>
              Cancel
            </Button>
            <Button onClick={handleAssignBacklinks} className="bg-[#7A1C46] hover:bg-[#5A1434]" style={{ borderRadius: '12px' }}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Credential Dialog */}
      <Dialog open={showCreateCredentialDialog} onOpenChange={setShowCreateCredentialDialog}>
        <DialogContent className="max-w-md" style={{ borderRadius: '12px' }}>
          <DialogHeader>
            <DialogTitle className="text-[#7A1C46]">Create Account Credentials</DialogTitle>
            <DialogDescription>
              Enter the username and password for {selectedAssignment?.Domain_Name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Username *</Label>
              <Input placeholder="Enter username" style={{ borderRadius: '12px' }} />
            </div>
            <div className="space-y-2">
              <Label>Password *</Label>
              <Input type="password" placeholder="Enter password" style={{ borderRadius: '12px' }} />
            </div>
            <div className="space-y-2">
              <Label>Recovery Email *</Label>
              <Input type="email" placeholder="recovery@beetloop.com" style={{ borderRadius: '12px' }} />
            </div>
            <div className="space-y-2">
              <Label>Account Status</Label>
              <Select defaultValue="created">
                <SelectTrigger style={{ borderRadius: '12px' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea 
                placeholder="Account details or verification notes" 
                rows={2}
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateCredentialDialog(false)} style={{ borderRadius: '12px' }}>
              Cancel
            </Button>
            <Button onClick={handleCreateCredential} className="bg-[#7A1C46] hover:bg-[#5A1434]" style={{ borderRadius: '12px' }}>
              <Shield className="w-4 h-4 mr-2" />
              Save Credential
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
