import { useState } from 'react';
import { Plus, Upload, Download, Calculator, Link2, UserPlus, Users, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';

interface TargetPlanner {
  Target_ID: string;
  Quarter: string;
  Week_Of_Quarter: number;
  Month: string;
  Day: string;
  Unit_Granularity: string;
  Asset_ID: string;
  Asset_Name: string;
  Asset_Format: string;
  Asset_Code: string;
  Target_Quantity: number;
  Word_Count_Target: number | null;
  Service_ID: string;
  Service_Path: string;
  Owner_Resource_ID: string;
  Owner_Resource_Name: string;
  Co_Owner_Resource_ID: string | null;
  Planned_Internal_Hours: number;
  Planned_SEO_Hours: number;
  Planned_Design_Hours: number;
  Outsource_Flag: boolean;
  Freelancer_ID: string | null;
  Freelancer_Name: string | null;
  Outsource_Model: string | null;
  Outsource_Budget: number | null;
  Priority: string;
  Status: string;
  Updated_At: string;
}

interface CapacityDerived {
  Derived_ID: string;
  Target_ID: string;
  Asset_Name: string;
  Quarter: string;
  Derived_Per_Day_Quantity: number;
  Derived_Per_Day_Hours: number;
  Start_Date: string;
  End_Date: string;
  Working_Days_Count: number;
  Resource_Name: string;
  Max_Hours_Per_Day: number;
  Capacity_Flag: string;
}

export default function TargetPlannerHub() {
  const [filters, setFilters] = useState({
    quarter: 'all',
    unit: 'all',
    service: 'all',
    format: 'all',
    owner: 'all',
    outsource: 'all',
    status: 'all',
    priority: 'all',
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const targetPlannerData: TargetPlanner[] = [
    {
      Target_ID: 'TGT001',
      Quarter: 'FY2025-Q4',
      Week_Of_Quarter: 1,
      Month: 'October',
      Day: '',
      Unit_Granularity: 'Week',
      Asset_ID: 'AST001',
      Asset_Name: 'Blog Article - Technical',
      Asset_Format: 'Article',
      Asset_Code: 'CNT-ART-00045',
      Target_Quantity: 3,
      Word_Count_Target: 1500,
      Service_ID: 'SRV001',
      Service_Path: 'Services > Cloud Migration',
      Owner_Resource_ID: 'RES001',
      Owner_Resource_Name: 'John Doe',
      Co_Owner_Resource_ID: null,
      Planned_Internal_Hours: 6.4,
      Planned_SEO_Hours: 2.0,
      Planned_Design_Hours: 1.5,
      Outsource_Flag: false,
      Freelancer_ID: null,
      Freelancer_Name: null,
      Outsource_Model: null,
      Outsource_Budget: null,
      Priority: 'High',
      Status: 'In Progress',
      Updated_At: '2024-10-28',
    },
    {
      Target_ID: 'TGT002',
      Quarter: 'FY2025-Q4',
      Week_Of_Quarter: 2,
      Month: 'October',
      Day: '',
      Unit_Granularity: 'Week',
      Asset_ID: 'AST002',
      Asset_Name: 'Infographic',
      Asset_Format: 'Infographic',
      Asset_Code: 'CNT-INF-00012',
      Target_Quantity: 2,
      Word_Count_Target: null,
      Service_ID: 'SRV002',
      Service_Path: 'Services > AI Implementation',
      Owner_Resource_ID: 'RES002',
      Owner_Resource_Name: 'Jane Smith',
      Co_Owner_Resource_ID: null,
      Planned_Internal_Hours: 4.0,
      Planned_SEO_Hours: 1.0,
      Planned_Design_Hours: 8.0,
      Outsource_Flag: false,
      Freelancer_ID: null,
      Freelancer_Name: null,
      Outsource_Model: null,
      Outsource_Budget: null,
      Priority: 'Medium',
      Status: 'Planned',
      Updated_At: '2024-10-25',
    },
    {
      Target_ID: 'TGT003',
      Quarter: 'FY2025-Q4',
      Week_Of_Quarter: 1,
      Month: 'October',
      Day: '',
      Unit_Granularity: 'Week',
      Asset_ID: 'AST001',
      Asset_Name: 'Blog Article - Technical',
      Asset_Format: 'Article',
      Asset_Code: 'CNT-ART-00046',
      Target_Quantity: 5,
      Word_Count_Target: 2000,
      Service_ID: 'SRV001-1',
      Service_Path: 'Services > Cloud Migration > AWS',
      Owner_Resource_ID: 'RES003',
      Owner_Resource_Name: 'Bob Wilson',
      Co_Owner_Resource_ID: null,
      Planned_Internal_Hours: 14.3,
      Planned_SEO_Hours: 3.5,
      Planned_Design_Hours: 2.5,
      Outsource_Flag: true,
      Freelancer_ID: 'FRL001',
      Freelancer_Name: 'Sarah Content Writer',
      Outsource_Model: 'Per Word',
      Outsource_Budget: 500,
      Priority: 'High',
      Status: 'Scheduled',
      Updated_At: '2024-10-27',
    },
    {
      Target_ID: 'TGT004',
      Quarter: 'FY2025-Q4',
      Week_Of_Quarter: 3,
      Month: 'October',
      Day: '',
      Unit_Granularity: 'Week',
      Asset_ID: 'AST003',
      Asset_Name: 'Video - Explainer',
      Asset_Format: 'Video',
      Asset_Code: 'CNT-VID-00008',
      Target_Quantity: 1,
      Word_Count_Target: null,
      Service_ID: 'SRV002',
      Service_Path: 'Services > AI Implementation',
      Owner_Resource_ID: 'RES004',
      Owner_Resource_Name: 'Alice Designer',
      Co_Owner_Resource_ID: 'RES002',
      Planned_Internal_Hours: 16.0,
      Planned_SEO_Hours: 2.0,
      Planned_Design_Hours: 24.0,
      Outsource_Flag: true,
      Freelancer_ID: 'FRL002',
      Freelancer_Name: 'Mike Video Producer',
      Outsource_Model: 'Per Deliverable',
      Outsource_Budget: 2500,
      Priority: 'High',
      Status: 'Planned',
      Updated_At: '2024-10-20',
    },
  ];

  const capacityData: CapacityDerived[] = [
    {
      Derived_ID: 'CAP001',
      Target_ID: 'TGT001',
      Asset_Name: 'Blog Article - Technical',
      Quarter: 'FY2025-Q4',
      Derived_Per_Day_Quantity: 0.6,
      Derived_Per_Day_Hours: 1.98,
      Start_Date: '2024-10-01',
      End_Date: '2024-10-05',
      Working_Days_Count: 5,
      Resource_Name: 'John Doe',
      Max_Hours_Per_Day: 8,
      Capacity_Flag: '🟢 OK',
    },
    {
      Derived_ID: 'CAP002',
      Target_ID: 'TGT002',
      Asset_Name: 'Infographic',
      Quarter: 'FY2025-Q4',
      Derived_Per_Day_Quantity: 0.4,
      Derived_Per_Day_Hours: 2.6,
      Start_Date: '2024-10-08',
      End_Date: '2024-10-12',
      Working_Days_Count: 5,
      Resource_Name: 'Jane Smith',
      Max_Hours_Per_Day: 8,
      Capacity_Flag: '🟢 OK',
    },
    {
      Derived_ID: 'CAP003',
      Target_ID: 'TGT003',
      Asset_Name: 'Blog Article - Technical',
      Quarter: 'FY2025-Q4',
      Derived_Per_Day_Quantity: 1.0,
      Derived_Per_Day_Hours: 4.06,
      Start_Date: '2024-10-01',
      End_Date: '2024-10-05',
      Working_Days_Count: 5,
      Resource_Name: 'Bob Wilson',
      Max_Hours_Per_Day: 8,
      Capacity_Flag: '🟢 OK',
    },
    {
      Derived_ID: 'CAP004',
      Target_ID: 'TGT004',
      Asset_Name: 'Video - Explainer',
      Quarter: 'FY2025-Q4',
      Derived_Per_Day_Quantity: 0.2,
      Derived_Per_Day_Hours: 8.4,
      Start_Date: '2024-10-15',
      End_Date: '2024-10-19',
      Working_Days_Count: 5,
      Resource_Name: 'Alice Designer',
      Max_Hours_Per_Day: 8,
      Capacity_Flag: '🟠 Tight',
    },
  ];

  const outsourcedTargets = targetPlannerData.filter((t) => t.Outsource_Flag);

  const filteredTargets = targetPlannerData.filter((target) => {
    if (filters.quarter !== 'all' && target.Quarter !== filters.quarter) return false;
    if (filters.unit !== 'all' && target.Unit_Granularity !== filters.unit) return false;
    if (filters.service !== 'all' && target.Service_ID !== filters.service) return false;
    if (filters.format !== 'all' && target.Asset_Format !== filters.format) return false;
    if (filters.owner !== 'all' && target.Owner_Resource_ID !== filters.owner) return false;
    if (filters.outsource !== 'all') {
      if (filters.outsource === 'yes' && !target.Outsource_Flag) return false;
      if (filters.outsource === 'no' && target.Outsource_Flag) return false;
    }
    if (filters.status !== 'all' && target.Status !== filters.status) return false;
    if (filters.priority !== 'all' && target.Priority !== filters.priority) return false;
    return true;
  });

  const toggleTargetSelection = (targetId: string) => {
    if (selectedTargets.includes(targetId)) {
      setSelectedTargets(selectedTargets.filter((id) => id !== targetId));
    } else {
      setSelectedTargets([...selectedTargets, targetId]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'deferred':
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

  const getCapacityBadgeColor = (flag: string) => {
    if (flag.includes('🟢')) return 'bg-green-100 text-green-800';
    if (flag.includes('🟠')) return 'bg-yellow-100 text-yellow-800';
    if (flag.includes('🔴')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left: Filters */}
      <Card className="border-[#E2E8F0] lg:col-span-1" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Quarter</Label>
            <Select value={filters.quarter} onValueChange={(value) => setFilters({ ...filters, quarter: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quarters</SelectItem>
                <SelectItem value="FY2025-Q4">FY2025-Q4</SelectItem>
                <SelectItem value="FY2025-Q3">FY2025-Q3</SelectItem>
                <SelectItem value="FY2026-Q1">FY2026-Q1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Unit Granularity</Label>
            <Select value={filters.unit} onValueChange={(value) => setFilters({ ...filters, unit: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Units</SelectItem>
                <SelectItem value="Quarter">Quarter</SelectItem>
                <SelectItem value="Month">Month</SelectItem>
                <SelectItem value="Week">Week</SelectItem>
                <SelectItem value="Day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Asset Format</Label>
            <Select value={filters.format} onValueChange={(value) => setFilters({ ...filters, format: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="Infographic">Infographic</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Carousel">Carousel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="Deferred">Deferred</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Outsource</Label>
            <Select value={filters.outsource} onValueChange={(value) => setFilters({ ...filters, outsource: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Outsourced</SelectItem>
                <SelectItem value="no">Internal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              setFilters({
                quarter: 'all',
                unit: 'all',
                service: 'all',
                format: 'all',
                owner: 'all',
                outsource: 'all',
                status: 'all',
                priority: 'all',
              })
            }
          >
            Clear All Filters
          </Button>
        </CardContent>
      </Card>

      {/* Right: Main Content */}
      <Card className="border-[#E2E8F0] lg:col-span-3" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#7A1C46]">Target Planner</CardTitle>
              <p className="text-gray-600 mt-1">
                {filteredTargets.length} targets | {selectedTargets.length} selected
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Target
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Target</DialogTitle>
                    <DialogDescription>Create a new target plan for content production</DialogDescription>
                  </DialogHeader>
                  <TargetPlannerForm onClose={() => setShowAddDialog(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="planner">
            <TabsList>
              <TabsTrigger value="planner">Planner Table</TabsTrigger>
              <TabsTrigger value="capacity">Capacity View</TabsTrigger>
              <TabsTrigger value="outsource">Outsource Panel</TabsTrigger>
            </TabsList>

            <TabsContent value="planner" className="mt-6 space-y-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calculator className="w-4 h-4 mr-2" />
                  Recompute Per-Day
                </Button>
                <Button variant="outline" size="sm">
                  <Link2 className="w-4 h-4 mr-2" />
                  Link Service
                </Button>
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign Resource
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Quarter</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Week/Month</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Words</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTargets.map((target) => (
                        <TableRow key={target.Target_ID}>
                          <TableCell>
                            <Checkbox
                              checked={selectedTargets.includes(target.Target_ID)}
                              onCheckedChange={() => toggleTargetSelection(target.Target_ID)}
                            />
                          </TableCell>
                          <TableCell>{target.Quarter}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{target.Unit_Granularity}</Badge>
                          </TableCell>
                          <TableCell>
                            {target.Unit_Granularity === 'Week' && `W${target.Week_Of_Quarter}`}
                            {target.Unit_Granularity === 'Month' && target.Month}
                            {target.Unit_Granularity === 'Day' && target.Day}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{target.Asset_Name}</div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {target.Asset_Format}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">{target.Asset_Code}</TableCell>
                          <TableCell>{target.Target_Quantity}</TableCell>
                          <TableCell>{target.Word_Count_Target || '-'}</TableCell>
                          <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                            {target.Service_Path}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {target.Owner_Resource_Name}
                              {target.Outsource_Flag && (
                                <Badge className="bg-purple-100 text-purple-800 text-xs ml-1">
                                  Outsourced
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <div>Int: {target.Planned_Internal_Hours}h</div>
                              <div>SEO: {target.Planned_SEO_Hours}h</div>
                              <div>Des: {target.Planned_Design_Hours}h</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(target.Status)}>{target.Status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(target.Priority)}>{target.Priority}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="capacity" className="mt-6 space-y-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Rebalance Workload
                </Button>
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Co-Owner
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Outsource Excess
                </Button>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Capacity flags: 🟢 OK (within limits) | 🟠 Tight (near max) | 🔴 Overload (exceeds capacity)
                </AlertDescription>
              </Alert>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Date Range</TableHead>
                      <TableHead>Working Days</TableHead>
                      <TableHead>Per Day Qty</TableHead>
                      <TableHead>Per Day Hours</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Max Hours/Day</TableHead>
                      <TableHead>Capacity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capacityData.map((capacity) => (
                      <TableRow key={capacity.Derived_ID}>
                        <TableCell>{capacity.Asset_Name}</TableCell>
                        <TableCell>{capacity.Quarter}</TableCell>
                        <TableCell className="text-sm">
                          {capacity.Start_Date} to {capacity.End_Date}
                        </TableCell>
                        <TableCell>{capacity.Working_Days_Count}</TableCell>
                        <TableCell>{capacity.Derived_Per_Day_Quantity.toFixed(1)}</TableCell>
                        <TableCell>{capacity.Derived_Per_Day_Hours.toFixed(2)}h</TableCell>
                        <TableCell>{capacity.Resource_Name}</TableCell>
                        <TableCell>{capacity.Max_Hours_Per_Day}h</TableCell>
                        <TableCell>
                          <Badge className={getCapacityBadgeColor(capacity.Capacity_Flag)}>
                            {capacity.Capacity_Flag}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="outsource" className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3>{outsourcedTargets.length} outsourced targets</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    🔎 Match Freelancer
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Brief PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    🧾 Generate PO Draft
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Target ID</TableHead>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Word Count</TableHead>
                      <TableHead>Freelancer</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outsourcedTargets.map((target) => (
                      <TableRow key={target.Target_ID}>
                        <TableCell>{target.Target_ID}</TableCell>
                        <TableCell>{target.Quarter}</TableCell>
                        <TableCell>{target.Asset_Name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{target.Asset_Format}</Badge>
                        </TableCell>
                        <TableCell>{target.Word_Count_Target || '-'}</TableCell>
                        <TableCell>{target.Freelancer_Name || 'Not Assigned'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{target.Outsource_Model}</Badge>
                        </TableCell>
                        <TableCell>${target.Outsource_Budget}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(target.Status)}>{target.Status}</Badge>
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
    </div>
  );
}

function TargetPlannerForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    quarter: 'FY2025-Q4',
    unit_granularity: 'Week',
    week_of_quarter: '1',
    asset_format: 'Article',
    target_quantity: '1',
    word_count: '1500',
    outsource_flag: false,
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Quarter</Label>
          <Select value={formData.quarter} onValueChange={(value) => setFormData({ ...formData, quarter: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FY2025-Q4">FY2025-Q4</SelectItem>
              <SelectItem value="FY2025-Q3">FY2025-Q3</SelectItem>
              <SelectItem value="FY2026-Q1">FY2026-Q1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Unit Granularity</Label>
          <Select value={formData.unit_granularity} onValueChange={(value) => setFormData({ ...formData, unit_granularity: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Quarter">Quarter</SelectItem>
              <SelectItem value="Month">Month</SelectItem>
              <SelectItem value="Week">Week</SelectItem>
              <SelectItem value="Day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Week of Quarter</Label>
        <Input
          type="number"
          value={formData.week_of_quarter}
          onChange={(e) => setFormData({ ...formData, week_of_quarter: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Asset Format</Label>
        <Select value={formData.asset_format} onValueChange={(value) => setFormData({ ...formData, asset_format: value })}>
          <SelectTrigger>
            <SelectValue />
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
          <Label>Target Quantity</Label>
          <Input
            type="number"
            value={formData.target_quantity}
            onChange={(e) => setFormData({ ...formData, target_quantity: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Word Count Target</Label>
          <Input
            type="number"
            value={formData.word_count}
            onChange={(e) => setFormData({ ...formData, word_count: e.target.value })}
            disabled={formData.asset_format !== 'Article'}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="outsource"
          checked={formData.outsource_flag}
          onCheckedChange={(checked) => setFormData({ ...formData, outsource_flag: checked as boolean })}
        />
        <Label htmlFor="outsource">Outsource to Freelancer</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Save
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Save & Compute
        </Button>
      </div>
    </div>
  );
}
