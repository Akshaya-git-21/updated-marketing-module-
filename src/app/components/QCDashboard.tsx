import { useState } from 'react';
import { Eye, Check, FileDown, CheckCircle, RotateCcw, Clock, TrendingUp, GraduationCap, ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import TrainingTicketsView from './TrainingTicketsView';
import QCChecklistSection from './QCChecklistSection';
import { toast } from 'sonner@2.0.3';

interface QCTask {
  Task_ID: string;
  Task_Name: string;
  Milestone_ID: string;
  Milestone_Name: string;
  Project_ID: string;
  Project_Name: string;
  Assigned_To: string;
  Assigned_To_Name: string;
  QC_Status: string;
  QC_Approved_By: string | null;
  QC_Approved_By_Name: string | null;
  QC_Date: string | null;
  QC_Comments: string;
  Progress: number;
  Submitted_For_QC_Date: string;
  Asset_Name: string | null;
  Version_No: number;
  Priority: string;
}

export default function QCDashboard() {
  const [filters, setFilters] = useState({
    qc_status: 'all',
    milestone: 'all',
    assigned_to: 'all',
    priority: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showQCDialog, setShowQCDialog] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const qcTasksData: QCTask[] = [
    {
      Task_ID: 'TSK006',
      Task_Name: 'Write Conclusion',
      Milestone_ID: 'MS002',
      Milestone_Name: 'Drafting',
      Project_ID: 'PRJ001',
      Project_Name: 'Cloud Content Strategy Q4',
      Assigned_To: 'USR003',
      Assigned_To_Name: 'Carol Smith',
      QC_Status: 'Pending',
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      QC_Comments: '',
      Progress: 80,
      Submitted_For_QC_Date: '2024-11-12',
      Asset_Name: 'Article Draft v3',
      Version_No: 1,
      Priority: 'High',
    },
    {
      Task_ID: 'TSK007',
      Task_Name: 'Add Case Studies',
      Milestone_ID: 'MS002',
      Milestone_Name: 'Drafting',
      Project_ID: 'PRJ001',
      Project_Name: 'Cloud Content Strategy Q4',
      Assigned_To: 'USR001',
      Assigned_To_Name: 'Alice Johnson',
      QC_Status: 'Pending',
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      QC_Comments: '',
      Progress: 30,
      Submitted_For_QC_Date: '2024-11-11',
      Asset_Name: null,
      Version_No: 1,
      Priority: 'Medium',
    },
    {
      Task_ID: 'TSK009',
      Task_Name: 'Editorial Review',
      Milestone_ID: 'MS003',
      Milestone_Name: 'QC Review',
      Project_ID: 'PRJ001',
      Project_Name: 'Cloud Content Strategy Q4',
      Assigned_To: 'USR002',
      Assigned_To_Name: 'Bob Wilson',
      QC_Status: 'Rework',
      QC_Approved_By: 'USR001',
      QC_Approved_By_Name: 'Alice Johnson',
      QC_Date: '2024-11-13',
      QC_Comments: 'Need to update statistics in section 3, add more examples',
      Progress: 70,
      Submitted_For_QC_Date: '2024-11-13',
      Asset_Name: 'Article Draft v4',
      Version_No: 1,
      Priority: 'High',
    },
    {
      Task_ID: 'TSK010',
      Task_Name: 'Fact Check',
      Milestone_ID: 'MS003',
      Milestone_Name: 'QC Review',
      Project_ID: 'PRJ001',
      Project_Name: 'Cloud Content Strategy Q4',
      Assigned_To: 'USR001',
      Assigned_To_Name: 'Alice Johnson',
      QC_Status: 'Pending',
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      QC_Comments: '',
      Progress: 0,
      Submitted_For_QC_Date: '2024-11-13',
      Asset_Name: 'Article Draft v4',
      Version_No: 1,
      Priority: 'Critical',
    },
    {
      Task_ID: 'TSK001',
      Task_Name: 'Market Research',
      Milestone_ID: 'MS001',
      Milestone_Name: 'Ideation',
      Project_ID: 'PRJ001',
      Project_Name: 'Cloud Content Strategy Q4',
      Assigned_To: 'USR001',
      Assigned_To_Name: 'Alice Johnson',
      QC_Status: 'Pass',
      QC_Approved_By: 'USR002',
      QC_Approved_By_Name: 'Bob Wilson',
      QC_Date: '2024-11-02',
      QC_Comments: 'Excellent research quality',
      Progress: 100,
      Submitted_For_QC_Date: '2024-11-01',
      Asset_Name: null,
      Version_No: 1,
      Priority: 'Medium',
    },
    {
      Task_ID: 'TSK002',
      Task_Name: 'Competitor Analysis',
      Milestone_ID: 'MS001',
      Milestone_Name: 'Ideation',
      Project_ID: 'PRJ001',
      Project_Name: 'Cloud Content Strategy Q4',
      Assigned_To: 'USR002',
      Assigned_To_Name: 'Bob Wilson',
      QC_Status: 'Pass',
      QC_Approved_By: 'USR001',
      QC_Approved_By_Name: 'Alice Johnson',
      QC_Date: '2024-11-03',
      QC_Comments: 'Comprehensive analysis',
      Progress: 100,
      Submitted_For_QC_Date: '2024-11-02',
      Asset_Name: null,
      Version_No: 1,
      Priority: 'Medium',
    },
    {
      Task_ID: 'TSK004',
      Task_Name: 'Write Introduction',
      Milestone_ID: 'MS002',
      Milestone_Name: 'Drafting',
      Project_ID: 'PRJ001',
      Project_Name: 'Cloud Content Strategy Q4',
      Assigned_To: 'USR003',
      Assigned_To_Name: 'Carol Smith',
      QC_Status: 'Pass',
      QC_Approved_By: 'USR001',
      QC_Approved_By_Name: 'Alice Johnson',
      QC_Date: '2024-11-07',
      QC_Comments: 'Strong introduction',
      Progress: 100,
      Submitted_For_QC_Date: '2024-11-07',
      Asset_Name: 'Article Draft v1',
      Version_No: 1,
      Priority: 'High',
    },
  ];

  const filteredTasks = qcTasksData.filter((task) => {
    if (filters.qc_status !== 'all' && task.QC_Status !== filters.qc_status) return false;
    if (filters.milestone !== 'all' && task.Milestone_ID !== filters.milestone) return false;
    if (filters.assigned_to !== 'all' && task.Assigned_To !== filters.assigned_to) return false;
    if (filters.priority !== 'all' && task.Priority !== filters.priority) return false;
    if (searchTerm && !task.Task_Name.toLowerCase().includes(searchTerm.toLowerCase()) && !task.Project_Name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const selectedTaskData = qcTasksData.find(t => t.Task_ID === selectedTask);

  const getQCStatusColor = (status: string) => {
    switch (status) {
      case 'Pass': return 'bg-green-100 text-green-800';
      case 'Fail': return 'bg-red-100 text-red-800';
      case 'Rework': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApproveBatch = () => {
    if (selectedTasks.length === 0) {
      toast.error('Please select tasks to approve');
      return;
    }
    toast.success(`${selectedTasks.length} tasks approved`);
    setSelectedTasks([]);
  };

  const handleExport = () => {
    toast.success('QC log exported successfully');
  };

  const toggleTaskSelection = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(t => t.Task_ID));
    }
  };

  // Calculate metrics
  const totalQCPending = qcTasksData.filter(t => t.QC_Status === 'Pending').length;
  const totalApproved = qcTasksData.filter(t => t.QC_Status === 'Pass').length;
  const totalRework = qcTasksData.filter(t => t.QC_Status === 'Rework' || t.QC_Status === 'Fail').length;
  const reworkPercent = qcTasksData.length > 0 ? Math.round((totalRework / qcTasksData.length) * 100) : 0;
  
  // Calculate average QC turnaround (mock calculation)
  const avgQCTurnaround = 18; // hours

  return (
    <div className="space-y-6">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">🧮 QC Tracker & Training</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="qc_tasks" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="qc_tasks" className="flex-1">QC Tasks</TabsTrigger>
              <TabsTrigger value="training" className="flex-1">
                <GraduationCap className="w-4 h-4 mr-2" />
                Training Tickets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qc_tasks" className="mt-6 space-y-6">
          {/* Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div className="text-2xl text-yellow-600">{totalQCPending}</div>
                </div>
                <div className="text-xs text-gray-600">Total QC Pending</div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="text-2xl text-green-600">{totalApproved}</div>
                </div>
                <div className="text-xs text-gray-600">Total Approved</div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div className="text-2xl text-blue-600">{avgQCTurnaround}h</div>
                </div>
                <div className="text-xs text-gray-600">Avg QC Turnaround</div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <RotateCcw className="w-5 h-5 text-orange-600" />
                  <div className="text-2xl text-orange-600">{reworkPercent}%</div>
                </div>
                <div className="text-xs text-gray-600">Rework Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={filters.qc_status} onValueChange={(value) => setFilters({ ...filters, qc_status: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
                  <SelectItem value="Rework">Rework</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.milestone} onValueChange={(value) => setFilters({ ...filters, milestone: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Milestones</SelectItem>
                  <SelectItem value="MS001">Ideation</SelectItem>
                  <SelectItem value="MS002">Drafting</SelectItem>
                  <SelectItem value="MS003">QC Review</SelectItem>
                  <SelectItem value="MS004">Design</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.assigned_to} onValueChange={(value) => setFilters({ ...filters, assigned_to: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  <SelectItem value="USR001">Alice Johnson</SelectItem>
                  <SelectItem value="USR002">Bob Wilson</SelectItem>
                  <SelectItem value="USR003">Carol Smith</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priority} onValueChange={(value) => setFilters({ ...filters, priority: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-[200px]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleApproveBatch}
                disabled={selectedTasks.length === 0}
              >
                <Check className="w-4 h-4 mr-2" />
                Approve Batch ({selectedTasks.length})
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <FileDown className="w-4 h-4 mr-2" />
                Export QC Log
              </Button>
            </div>
          </div>

          {/* QC Tasks Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                        onChange={toggleSelectAll}
                        className="cursor-pointer"
                      />
                    </TableHead>
                    <TableHead>Task Name</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>QC Status</TableHead>
                    <TableHead>QC Approved By</TableHead>
                    <TableHead>QC Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.Task_ID}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.Task_ID)}
                          onChange={() => toggleTaskSelection(task.Task_ID)}
                          className="cursor-pointer"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="min-w-[180px]">
                          <div className="text-sm">{task.Task_Name}</div>
                          {task.Asset_Name && (
                            <div className="text-xs text-gray-500 mt-1">{task.Asset_Name}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {task.Project_Name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {task.Milestone_Name}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {task.Assigned_To_Name}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.Priority)}>
                          {task.Priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getQCStatusColor(task.QC_Status)}>
                          {task.QC_Status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {task.QC_Approved_By_Name || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {task.QC_Date || '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <Progress value={task.Progress} className="flex-1" />
                          <span className="text-xs text-gray-600">{task.Progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedTask(task.Task_ID);
                            setShowQCDialog(true);
                          }}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-blue-800 text-sm">
              QC pending tasks require review. Use batch approval for multiple tasks with similar QC outcomes. Export logs for reporting and audits.
            </AlertDescription>
          </Alert>
            </TabsContent>

            <TabsContent value="training" className="mt-6">
              <TrainingTicketsView />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* QC Task Detail Dialog */}
      <Dialog open={showQCDialog} onOpenChange={setShowQCDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>QC Task Review</DialogTitle>
            <DialogDescription>
              {selectedTaskData ? selectedTaskData.Task_Name : 'Task Details'}
            </DialogDescription>
          </DialogHeader>
          {selectedTaskData && (
            <QCTaskReview task={selectedTaskData} onClose={() => setShowQCDialog(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function QCTaskReview({ task, onClose }: { task: QCTask; onClose: () => void }) {
  const [qcStatus, setQCStatus] = useState(task.QC_Status);
  const [qcComments, setQCComments] = useState(task.QC_Comments);

  const handleApprove = () => {
    toast.success('Task approved successfully');
    onClose();
  };

  const handleReject = () => {
    toast.success('Task sent for rework');
    onClose();
  };

  return (
    <Tabs defaultValue="review" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="review" className="flex-1">QC Review</TabsTrigger>
        <TabsTrigger value="checklist" className="flex-1">
          <ListChecks className="w-4 h-4 mr-2" />
          QC Checklist
        </TabsTrigger>
      </TabsList>

      <TabsContent value="review" className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Task Name</Label>
          <Input value={task.Task_Name} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Project</Label>
          <Input value={task.Project_Name} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Milestone</Label>
          <Input value={task.Milestone_Name} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Assigned To</Label>
          <Input value={task.Assigned_To_Name} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Priority</Label>
          <Badge className={
            task.Priority === 'Critical' ? 'bg-red-100 text-red-800' :
            task.Priority === 'High' ? 'bg-orange-100 text-orange-800' :
            task.Priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }>
            {task.Priority}
          </Badge>
        </div>

        <div className="space-y-2">
          <Label>Submitted For QC</Label>
          <Input value={task.Submitted_For_QC_Date} readOnly className="bg-gray-50" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Asset</Label>
        <Input value={task.Asset_Name || 'No asset attached'} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <Label>Progress</Label>
        <div className="flex items-center gap-2">
          <Progress value={task.Progress} className="flex-1" />
          <span className="text-sm text-gray-600">{task.Progress}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>QC Status *</Label>
        <Select value={qcStatus} onValueChange={setQCStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Pass">Pass</SelectItem>
            <SelectItem value="Fail">Fail</SelectItem>
            <SelectItem value="Rework">Rework</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>QC Comments</Label>
        <Textarea
          value={qcComments}
          onChange={(e) => setQCComments(e.target.value)}
          placeholder="Add QC feedback..."
          rows={4}
        />
      </div>

      {task.QC_Approved_By_Name && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Previously Approved By</Label>
            <Input value={task.QC_Approved_By_Name} readOnly className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label>Previous QC Date</Label>
            <Input value={task.QC_Date || ''} readOnly className="bg-gray-50" />
          </div>
        </div>
      )}

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertDescription className="text-yellow-800 text-sm">
          Approving this task will move it to the next milestone. Rejecting will send it back to the assignee for rework.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleReject} variant="outline" className="flex-1 bg-orange-50">
          <RotateCcw className="w-4 h-4 mr-2" />
          Send for Rework
        </Button>
        <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700">
          <CheckCircle className="w-4 h-4 mr-2" />
          Approve
        </Button>
      </div>
      </TabsContent>

      <TabsContent value="checklist" className="mt-4">
        <QCChecklistSection taskId={task.Task_ID} assetType="Content" />
      </TabsContent>
    </Tabs>
  );
}
