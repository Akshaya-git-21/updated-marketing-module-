import { useState } from 'react';
import { Upload, Lock, Unlock, History, Send, Eye, Edit, Trash2, FileText, Video, Image as ImageIcon, File, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface Asset {
  Asset_ID: string;
  Asset_Name: string;
  Asset_Code: string;
  Version_No: number;
  Asset_Type: string;
  File_URL: string;
  File_Size_MB: number;
  Uploaded_By: string;
  Uploaded_By_Name: string;
  Locked: boolean;
  Accessible_To: string[];
  Linked_Service_ID: string | null;
  Linked_Service_Name: string | null;
  Linked_Project_ID: string | null;
  Linked_Project_Name: string | null;
  Linked_Task_ID: string | null;
  Linked_Task_Name: string | null;
  Created_At: string;
  Updated_At: string;
  Status: string;
}

interface AssetVersion {
  Version_ID: string;
  Asset_ID: string;
  Version_No: number;
  File_URL: string;
  File_Size_MB: number;
  Uploaded_By_Name: string;
  Upload_Date: string;
  Change_Notes: string;
  Status: string;
}

export default function AssetLibrary() {
  const [filters, setFilters] = useState({
    asset_type: 'all',
    status: 'all',
    locked: 'all',
    project: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showVersionDialog, setShowVersionDialog] = useState(false);

  const assetsData: Asset[] = [
    {
      Asset_ID: 'AST001',
      Asset_Name: 'Enterprise Cloud Migration Guide',
      Asset_Code: 'AST-DOC-001',
      Version_No: 3,
      Asset_Type: 'Article',
      File_URL: '/assets/cloud-migration-guide-v3.html',
      File_Size_MB: 0.8,
      Uploaded_By: 'USR003',
      Uploaded_By_Name: 'Carol Smith',
      Locked: true,
      Accessible_To: ['USR001', 'USR002', 'USR003'],
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Project_ID: 'PRJ001',
      Linked_Project_Name: 'Q4 Enterprise Content Campaign',
      Linked_Task_ID: 'TSK015',
      Linked_Task_Name: 'Write Cloud Migration Article',
      Created_At: '2024-10-15',
      Updated_At: '2024-10-30',
      Status: 'Published',
    },
    {
      Asset_ID: 'AST002',
      Asset_Name: 'FinTech SEO Best Practices Video',
      Asset_Code: 'AST-VID-002',
      Version_No: 1,
      Asset_Type: 'Video',
      File_URL: '/assets/fintech-seo-video.mp4',
      File_Size_MB: 125.4,
      Uploaded_By: 'USR002',
      Uploaded_By_Name: 'Bob Wilson',
      Locked: false,
      Accessible_To: ['USR001', 'USR002'],
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Project_ID: 'PRJ005',
      Linked_Project_Name: 'FinTech Video Series',
      Linked_Task_ID: 'TSK042',
      Linked_Task_Name: 'Produce FinTech Video',
      Created_At: '2024-10-25',
      Updated_At: '2024-10-28',
      Status: 'Under Review',
    },
    {
      Asset_ID: 'AST003',
      Asset_Name: 'SaaS Content Marketing Infographic',
      Asset_Code: 'AST-IMG-003',
      Version_No: 2,
      Asset_Type: 'Infographic',
      File_URL: '/assets/saas-marketing-infographic-v2.png',
      File_Size_MB: 3.2,
      Uploaded_By: 'USR003',
      Uploaded_By_Name: 'Carol Smith',
      Locked: true,
      Accessible_To: ['USR001', 'USR003'],
      Linked_Service_ID: 'SRV002',
      Linked_Service_Name: 'Content Marketing',
      Linked_Project_ID: 'PRJ008',
      Linked_Project_Name: 'SaaS Content Initiative',
      Linked_Task_ID: 'TSK089',
      Linked_Task_Name: 'Design Infographic',
      Created_At: '2024-10-18',
      Updated_At: '2024-10-29',
      Status: 'Approved',
    },
    {
      Asset_ID: 'AST004',
      Asset_Name: 'Complete Guide to E-commerce SEO',
      Asset_Code: 'AST-DOC-004',
      Version_No: 1,
      Asset_Type: 'eBook',
      File_URL: '/assets/ecommerce-seo-guide.pdf',
      File_Size_MB: 8.5,
      Uploaded_By: 'USR001',
      Uploaded_By_Name: 'Alice Johnson',
      Locked: false,
      Accessible_To: ['USR001', 'USR002', 'USR003'],
      Linked_Service_ID: 'SRV005',
      Linked_Service_Name: 'E-commerce Marketing',
      Linked_Project_ID: 'PRJ012',
      Linked_Project_Name: 'E-commerce Resources',
      Linked_Task_ID: null,
      Linked_Task_Name: null,
      Created_At: '2024-10-20',
      Updated_At: '2024-10-27',
      Status: 'Draft',
    },
    {
      Asset_ID: 'AST005',
      Asset_Name: 'Technical SEO Checklist',
      Asset_Code: 'AST-DOC-005',
      Version_No: 4,
      Asset_Type: 'Guide',
      File_URL: '/assets/technical-seo-checklist-v4.pdf',
      File_Size_MB: 1.2,
      Uploaded_By: 'USR002',
      Uploaded_By_Name: 'Bob Wilson',
      Locked: true,
      Accessible_To: ['USR001', 'USR002'],
      Linked_Service_ID: 'SRV001',
      Linked_Service_Name: 'SEO Services',
      Linked_Project_ID: 'PRJ003',
      Linked_Project_Name: 'Technical SEO Documentation',
      Linked_Task_ID: 'TSK028',
      Linked_Task_Name: 'Update Technical Guide',
      Created_At: '2024-09-10',
      Updated_At: '2024-10-30',
      Status: 'Published',
    },
  ];

  const versionHistoryData: AssetVersion[] = [
    {
      Version_ID: 'VER001',
      Asset_ID: 'AST001',
      Version_No: 1,
      File_URL: '/assets/cloud-migration-guide-v1.html',
      File_Size_MB: 0.6,
      Uploaded_By_Name: 'Carol Smith',
      Upload_Date: '2024-10-15',
      Change_Notes: 'Initial draft',
      Status: 'Archived',
    },
    {
      Version_ID: 'VER002',
      Asset_ID: 'AST001',
      Version_No: 2,
      File_URL: '/assets/cloud-migration-guide-v2.html',
      File_Size_MB: 0.7,
      Uploaded_By_Name: 'Carol Smith',
      Upload_Date: '2024-10-22',
      Change_Notes: 'Added case studies and updated statistics',
      Status: 'Archived',
    },
    {
      Version_ID: 'VER003',
      Asset_ID: 'AST001',
      Version_No: 3,
      File_URL: '/assets/cloud-migration-guide-v3.html',
      File_Size_MB: 0.8,
      Uploaded_By_Name: 'Carol Smith',
      Upload_Date: '2024-10-30',
      Change_Notes: 'Final review changes, SEO optimization',
      Status: 'Published',
    },
  ];

  const filteredAssets = assetsData.filter((asset) => {
    if (filters.asset_type !== 'all' && asset.Asset_Type !== filters.asset_type) return false;
    if (filters.status !== 'all' && asset.Status !== filters.status) return false;
    if (filters.locked !== 'all' && asset.Locked !== (filters.locked === 'true')) return false;
    if (filters.project !== 'all' && asset.Linked_Project_ID !== filters.project) return false;
    if (searchTerm && !asset.Asset_Name.toLowerCase().includes(searchTerm.toLowerCase()) && !asset.Asset_Code.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const selectedAssetData = assetsData.find(a => a.Asset_ID === selectedAsset);
  const selectedAssetVersions = versionHistoryData.filter(v => v.Asset_ID === selectedAsset);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'Article':
      case 'Guide':
      case 'eBook':
        return FileText;
      case 'Video':
        return Video;
      case 'Image':
      case 'Infographic':
        return ImageIcon;
      default:
        return File;
    }
  };

  const handleLockAsset = (assetId: string, lock: boolean) => {
    toast.success(`Asset ${lock ? 'locked' : 'unlocked'} successfully`);
  };

  const handlePublishToWeb = (assetId: string) => {
    toast.success('Asset sent to Web Developer queue');
  };

  return (
    <div className="space-y-6">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Asset Library</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={filters.asset_type} onValueChange={(value) => setFilters({ ...filters, asset_type: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Article">Article</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Image">Image</SelectItem>
                  <SelectItem value="Infographic">Infographic</SelectItem>
                  <SelectItem value="eBook">eBook</SelectItem>
                  <SelectItem value="Guide">Guide</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.locked} onValueChange={(value) => setFilters({ ...filters, locked: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assets</SelectItem>
                  <SelectItem value="true">Locked</SelectItem>
                  <SelectItem value="false">Unlocked</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.project} onValueChange={(value) => setFilters({ ...filters, project: value })}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="PRJ001">Q4 Enterprise Content Campaign</SelectItem>
                  <SelectItem value="PRJ005">FinTech Video Series</SelectItem>
                  <SelectItem value="PRJ008">SaaS Content Initiative</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-[200px]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Version
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Upload New Asset Version</DialogTitle>
                    <DialogDescription>Upload a new version of an existing asset or create a new asset</DialogDescription>
                  </DialogHeader>
                  <UploadAssetForm onClose={() => setShowUploadDialog(false)} />
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm">
                <Lock className="w-4 h-4 mr-2" />
                Lock Asset
              </Button>
              <Button variant="outline" size="sm">
                <Unlock className="w-4 h-4 mr-2" />
                Unlock
              </Button>
              <Dialog open={showVersionDialog} onOpenChange={setShowVersionDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <History className="w-4 h-4 mr-2" />
                    View Versions
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Version History</DialogTitle>
                    <DialogDescription>
                      {selectedAssetData ? selectedAssetData.Asset_Name : 'Select an asset to view versions'}
                    </DialogDescription>
                  </DialogHeader>
                  {selectedAssetData && (
                    <VersionHistoryView versions={selectedAssetVersions} />
                  )}
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Publish to Web Developer
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Project / Task</TableHead>
                    <TableHead>Lock Status</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => {
                    const Icon = getAssetIcon(asset.Asset_Type);
                    return (
                      <TableRow 
                        key={asset.Asset_ID}
                        className={selectedAsset === asset.Asset_ID ? 'bg-[#7A1C46]/5' : ''}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-[200px]">
                            <Icon className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm">{asset.Asset_Name}</div>
                              <div className="text-xs text-gray-500">by {asset.Uploaded_By_Name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs font-mono">
                            {asset.Asset_Code}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {asset.Asset_Type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-800">
                            v{asset.Version_No}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {asset.File_Size_MB.toFixed(1)} MB
                        </TableCell>
                        <TableCell>
                          <div className="text-xs space-y-0.5 min-w-[150px]">
                            {asset.Linked_Project_Name && (
                              <div className="text-[#7A1C46]">{asset.Linked_Project_Name}</div>
                            )}
                            {asset.Linked_Task_Name && (
                              <div className="text-gray-600">→ {asset.Linked_Task_Name}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {asset.Locked ? (
                            <Badge className="bg-red-100 text-red-800">
                              <Lock className="w-3 h-3 mr-1" />
                              Locked
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">
                              <Unlock className="w-3 h-3 mr-1" />
                              Unlocked
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(asset.Status)}>
                            {asset.Status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {asset.Updated_At}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedAsset(asset.Asset_ID)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleLockAsset(asset.Asset_ID, !asset.Locked)}
                            >
                              {asset.Locked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handlePublishToWeb(asset.Asset_ID)}
                            >
                              <Send className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-blue-800 text-sm">
              Locked assets cannot be modified except by Admin users. Assets marked as "Published" are automatically locked.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

function UploadAssetForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    asset_name: '',
    asset_type: '',
    linked_project: '',
    linked_task: '',
    notes: '',
  });

  const handleSubmit = () => {
    toast.success('Asset uploaded successfully');
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Asset Name *</Label>
        <Input
          value={formData.asset_name}
          onChange={(e) => setFormData({ ...formData, asset_name: e.target.value })}
          placeholder="e.g., Enterprise Cloud Migration Guide"
        />
      </div>

      <div className="space-y-2">
        <Label>Asset Type *</Label>
        <Select value={formData.asset_type} onValueChange={(value) => setFormData({ ...formData, asset_type: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Article">Article</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Image">Image</SelectItem>
            <SelectItem value="Infographic">Infographic</SelectItem>
            <SelectItem value="eBook">eBook</SelectItem>
            <SelectItem value="Guide">Guide</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>File Upload *</Label>
        <Input type="file" />
        <p className="text-xs text-gray-500">Max file size: 200MB</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Linked Project</Label>
          <Select value={formData.linked_project} onValueChange={(value) => setFormData({ ...formData, linked_project: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PRJ001">Q4 Enterprise Content Campaign</SelectItem>
              <SelectItem value="PRJ005">FinTech Video Series</SelectItem>
              <SelectItem value="PRJ008">SaaS Content Initiative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Linked Task</Label>
          <Select value={formData.linked_task} onValueChange={(value) => setFormData({ ...formData, linked_task: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TSK015">Write Cloud Migration Article</SelectItem>
              <SelectItem value="TSK042">Produce FinTech Video</SelectItem>
              <SelectItem value="TSK089">Design Infographic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Change Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Describe changes in this version..."
          rows={3}
        />
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          A unique Asset_Code will be auto-generated. Version number will increment automatically.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Upload Asset
        </Button>
      </div>
    </div>
  );
}

function VersionHistoryView({ versions }: { versions: AssetVersion[] }) {
  return (
    <div className="space-y-4">
      {versions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No version history available
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Version</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Change Notes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((version) => (
              <TableRow key={version.Version_ID}>
                <TableCell>
                  <Badge className="bg-purple-100 text-purple-800">
                    v{version.Version_No}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{version.Upload_Date}</TableCell>
                <TableCell className="text-sm">{version.Uploaded_By_Name}</TableCell>
                <TableCell className="text-sm">{version.File_Size_MB.toFixed(1)} MB</TableCell>
                <TableCell className="text-xs text-gray-600 max-w-[200px]">
                  {version.Change_Notes}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {version.Status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
