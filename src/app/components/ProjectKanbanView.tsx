import { useState } from 'react';
import { GripVertical, Calendar, Target, TrendingUp, Plus, Check, ArrowRight, Upload, Lock, FolderOpen, Eye, Edit, RefreshCw, CheckCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import QCChecklistSection from './QCChecklistSection';
import { toast } from 'sonner@2.0.3';

interface Milestone {
  Milestone_ID: string;
  Project_ID: string;
  Milestone_Name: string;
  Stage_Order: number;
  Owner_User_ID: string;
  Owner_Name: string;
  Start_Date: string;
  End_Date: string;
  Status: string;
  QC_Required: boolean;
  QC_Approved_By: string | null;
  QC_Approved_By_Name: string | null;
  QC_Date: string | null;
  Next_Milestone_ID: string | null;
  Tasks_Count: number;
  Completed_Tasks: number;
  Notes: string;
}

interface Task {
  Task_ID: string;
  Milestone_ID: string;
  Milestone_Name: string;
  Task_Name: string;
  Asset_ID: string | null;
  Asset_Name: string | null;
  Keyword_IDs: string[];
  Assigned_To: string;
  Assigned_To_Name: string;
  Planned_Hours: number;
  Actual_Hours: number;
  Start_Date: string;
  End_Date: string;
  Progress: number;
  QC_Status: string;
  QC_Comments: string;
  QC_Approved_By: string | null;
  QC_Approved_By_Name: string | null;
  QC_Date: string | null;
  Version_No: number;
  Locked: boolean;
  Outcome_URL: string;
  Notes: string;
  Last_Updated: string;
}

interface ProjectKanbanViewProps {
  projectId: string;
  projectName: string;
}

const MILESTONE_STAGES = ['Ideation', 'Drafting', 'QC Review', 'Design', 'Publish', 'SEO Promotion'];

const STAGE_COLORS = {
  'Ideation': '#d9d9d9',
  'Drafting': '#f5b041',
  'QC Review': '#5dade2',
  'Design': '#48c9b0',
  'Publish': '#58d68d',
  'SEO Promotion': '#a569bd',
};

export default function ProjectKanbanView({ projectId, projectName }: ProjectKanbanViewProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showTaskDetailsDialog, setShowTaskDetailsDialog] = useState(false);
  const [showQCDialog, setShowQCDialog] = useState(false);

  const milestonesData: Milestone[] = [
    {
      Milestone_ID: 'MS001',
      Project_ID: projectId,
      Milestone_Name: 'Ideation',
      Stage_Order: 1,
      Owner_User_ID: 'USR001',
      Owner_Name: 'Alice Johnson',
      Start_Date: '2024-11-01',
      End_Date: '2024-11-05',
      Status: 'Completed',
      QC_Required: false,
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Next_Milestone_ID: 'MS002',
      Tasks_Count: 3,
      Completed_Tasks: 3,
      Notes: 'Initial ideation and research phase completed',
    },
    {
      Milestone_ID: 'MS002',
      Project_ID: projectId,
      Milestone_Name: 'Drafting',
      Stage_Order: 2,
      Owner_User_ID: 'USR003',
      Owner_Name: 'Carol Smith',
      Start_Date: '2024-11-06',
      End_Date: '2024-11-12',
      Status: 'In Progress',
      QC_Required: false,
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Next_Milestone_ID: 'MS003',
      Tasks_Count: 5,
      Completed_Tasks: 3,
      Notes: 'Writing first draft of content',
    },
    {
      Milestone_ID: 'MS003',
      Project_ID: projectId,
      Milestone_Name: 'QC Review',
      Stage_Order: 3,
      Owner_User_ID: 'USR002',
      Owner_Name: 'Bob Wilson',
      Start_Date: '2024-11-13',
      End_Date: '2024-11-15',
      Status: 'Under QC',
      QC_Required: true,
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Next_Milestone_ID: 'MS004',
      Tasks_Count: 2,
      Completed_Tasks: 0,
      Notes: '',
    },
    {
      Milestone_ID: 'MS004',
      Project_ID: projectId,
      Milestone_Name: 'Design',
      Stage_Order: 4,
      Owner_User_ID: 'USR003',
      Owner_Name: 'Carol Smith',
      Start_Date: '2024-11-16',
      End_Date: '2024-11-20',
      Status: 'Not Started',
      QC_Required: false,
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Next_Milestone_ID: 'MS005',
      Tasks_Count: 0,
      Completed_Tasks: 0,
      Notes: '',
    },
    {
      Milestone_ID: 'MS005',
      Project_ID: projectId,
      Milestone_Name: 'Publish',
      Stage_Order: 5,
      Owner_User_ID: 'USR001',
      Owner_Name: 'Alice Johnson',
      Start_Date: '2024-11-21',
      End_Date: '2024-11-22',
      Status: 'Not Started',
      QC_Required: true,
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Next_Milestone_ID: 'MS006',
      Tasks_Count: 0,
      Completed_Tasks: 0,
      Notes: '',
    },
    {
      Milestone_ID: 'MS006',
      Project_ID: projectId,
      Milestone_Name: 'SEO Promotion',
      Stage_Order: 6,
      Owner_User_ID: 'USR002',
      Owner_Name: 'Bob Wilson',
      Start_Date: '2024-11-23',
      End_Date: '2024-11-30',
      Status: 'Not Started',
      QC_Required: false,
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Next_Milestone_ID: null,
      Tasks_Count: 0,
      Completed_Tasks: 0,
      Notes: '',
    },
  ];

  const tasksData: Task[] = [
    {
      Task_ID: 'TSK001',
      Milestone_ID: 'MS001',
      Milestone_Name: 'Ideation',
      Task_Name: 'Market Research',
      Asset_ID: null,
      Asset_Name: null,
      Keyword_IDs: ['KW001', 'KW002'],
      Assigned_To: 'USR001',
      Assigned_To_Name: 'Alice Johnson',
      Planned_Hours: 8,
      Actual_Hours: 7,
      Start_Date: '2024-11-01',
      End_Date: '2024-11-02',
      Progress: 100,
      QC_Status: 'Pass',
      QC_Comments: 'Excellent research quality',
      QC_Approved_By: 'USR002',
      QC_Approved_By_Name: 'Bob Wilson',
      QC_Date: '2024-11-02',
      Version_No: 1,
      Locked: true,
      Outcome_URL: '',
      Notes: 'Research completed on target audience',
      Last_Updated: '2024-11-02',
    },
    {
      Task_ID: 'TSK002',
      Milestone_ID: 'MS001',
      Milestone_Name: 'Ideation',
      Task_Name: 'Competitor Analysis',
      Asset_ID: null,
      Asset_Name: null,
      Keyword_IDs: ['KW001'],
      Assigned_To: 'USR002',
      Assigned_To_Name: 'Bob Wilson',
      Planned_Hours: 6,
      Actual_Hours: 6,
      Start_Date: '2024-11-01',
      End_Date: '2024-11-03',
      Progress: 100,
      QC_Status: 'Pass',
      QC_Comments: 'Comprehensive analysis',
      QC_Approved_By: 'USR001',
      QC_Approved_By_Name: 'Alice Johnson',
      QC_Date: '2024-11-03',
      Version_No: 1,
      Locked: true,
      Outcome_URL: '',
      Notes: 'Analyzed 5 competitors',
      Last_Updated: '2024-11-03',
    },
    {
      Task_ID: 'TSK003',
      Milestone_ID: 'MS001',
      Milestone_Name: 'Ideation',
      Task_Name: 'Content Outline',
      Asset_ID: 'AST010',
      Asset_Name: 'Content Outline Document',
      Keyword_IDs: ['KW001', 'KW002', 'KW003'],
      Assigned_To: 'USR003',
      Assigned_To_Name: 'Carol Smith',
      Planned_Hours: 4,
      Actual_Hours: 5,
      Start_Date: '2024-11-04',
      End_Date: '2024-11-05',
      Progress: 100,
      QC_Status: 'Pass',
      QC_Comments: 'Well-structured outline',
      QC_Approved_By: 'USR002',
      QC_Approved_By_Name: 'Bob Wilson',
      QC_Date: '2024-11-05',
      Version_No: 2,
      Locked: true,
      Outcome_URL: '',
      Notes: 'Outline approved by team',
      Last_Updated: '2024-11-05',
    },
    {
      Task_ID: 'TSK004',
      Milestone_ID: 'MS002',
      Milestone_Name: 'Drafting',
      Task_Name: 'Write Introduction',
      Asset_ID: 'AST011',
      Asset_Name: 'Article Draft v1',
      Keyword_IDs: ['KW001'],
      Assigned_To: 'USR003',
      Assigned_To_Name: 'Carol Smith',
      Planned_Hours: 6,
      Actual_Hours: 5,
      Start_Date: '2024-11-06',
      End_Date: '2024-11-07',
      Progress: 100,
      QC_Status: 'Pass',
      QC_Comments: 'Strong introduction',
      QC_Approved_By: 'USR001',
      QC_Approved_By_Name: 'Alice Johnson',
      QC_Date: '2024-11-07',
      Version_No: 1,
      Locked: true,
      Outcome_URL: '',
      Notes: 'Introduction completed',
      Last_Updated: '2024-11-07',
    },
    {
      Task_ID: 'TSK005',
      Milestone_ID: 'MS002',
      Milestone_Name: 'Drafting',
      Task_Name: 'Write Body Content',
      Asset_ID: 'AST011',
      Asset_Name: 'Article Draft v2',
      Keyword_IDs: ['KW001', 'KW002'],
      Assigned_To: 'USR003',
      Assigned_To_Name: 'Carol Smith',
      Planned_Hours: 12,
      Actual_Hours: 10,
      Start_Date: '2024-11-08',
      End_Date: '2024-11-11',
      Progress: 100,
      QC_Status: 'Pass',
      QC_Comments: 'Great content depth',
      QC_Approved_By: 'USR002',
      QC_Approved_By_Name: 'Bob Wilson',
      QC_Date: '2024-11-11',
      Version_No: 2,
      Locked: true,
      Outcome_URL: '',
      Notes: 'Main body completed',
      Last_Updated: '2024-11-11',
    },
    {
      Task_ID: 'TSK006',
      Milestone_ID: 'MS002',
      Milestone_Name: 'Drafting',
      Task_Name: 'Write Conclusion',
      Asset_ID: 'AST011',
      Asset_Name: 'Article Draft v3',
      Keyword_IDs: ['KW001'],
      Assigned_To: 'USR003',
      Assigned_To_Name: 'Carol Smith',
      Planned_Hours: 4,
      Actual_Hours: 3,
      Start_Date: '2024-11-11',
      End_Date: '2024-11-12',
      Progress: 80,
      QC_Status: 'Pending',
      QC_Comments: '',
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Version_No: 1,
      Locked: false,
      Outcome_URL: '',
      Notes: 'Almost done, final edits pending',
      Last_Updated: '2024-11-12',
    },
    {
      Task_ID: 'TSK007',
      Milestone_ID: 'MS002',
      Milestone_Name: 'Drafting',
      Task_Name: 'Add Case Studies',
      Asset_ID: null,
      Asset_Name: null,
      Keyword_IDs: ['KW003'],
      Assigned_To: 'USR001',
      Assigned_To_Name: 'Alice Johnson',
      Planned_Hours: 8,
      Actual_Hours: 0,
      Start_Date: '2024-11-11',
      End_Date: '2024-11-13',
      Progress: 30,
      QC_Status: 'Pending',
      QC_Comments: '',
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Version_No: 1,
      Locked: false,
      Outcome_URL: '',
      Notes: 'Gathering case study data',
      Last_Updated: '2024-11-11',
    },
    {
      Task_ID: 'TSK008',
      Milestone_ID: 'MS002',
      Milestone_Name: 'Drafting',
      Task_Name: 'SEO Optimization',
      Asset_ID: null,
      Asset_Name: null,
      Keyword_IDs: ['KW001', 'KW002', 'KW003'],
      Assigned_To: 'USR002',
      Assigned_To_Name: 'Bob Wilson',
      Planned_Hours: 4,
      Actual_Hours: 0,
      Start_Date: '2024-11-12',
      End_Date: '2024-11-13',
      Progress: 0,
      QC_Status: 'Pending',
      QC_Comments: '',
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Version_No: 1,
      Locked: false,
      Outcome_URL: '',
      Notes: '',
      Last_Updated: '2024-11-11',
    },
    {
      Task_ID: 'TSK009',
      Milestone_ID: 'MS003',
      Milestone_Name: 'QC Review',
      Task_Name: 'Editorial Review',
      Asset_ID: 'AST011',
      Asset_Name: 'Article Draft v4',
      Keyword_IDs: ['KW001', 'KW002'],
      Assigned_To: 'USR002',
      Assigned_To_Name: 'Bob Wilson',
      Planned_Hours: 3,
      Actual_Hours: 2,
      Start_Date: '2024-11-13',
      End_Date: '2024-11-14',
      Progress: 70,
      QC_Status: 'Rework',
      QC_Comments: 'Need to update statistics in section 3, add more examples',
      QC_Approved_By: 'USR001',
      QC_Approved_By_Name: 'Alice Johnson',
      QC_Date: '2024-11-13',
      Version_No: 1,
      Locked: false,
      Outcome_URL: '',
      Notes: 'Initial QC round',
      Last_Updated: '2024-11-13',
    },
    {
      Task_ID: 'TSK010',
      Milestone_ID: 'MS003',
      Milestone_Name: 'QC Review',
      Task_Name: 'Fact Check',
      Asset_ID: 'AST011',
      Asset_Name: 'Article Draft v4',
      Keyword_IDs: ['KW001'],
      Assigned_To: 'USR001',
      Assigned_To_Name: 'Alice Johnson',
      Planned_Hours: 2,
      Actual_Hours: 0,
      Start_Date: '2024-11-14',
      End_Date: '2024-11-14',
      Progress: 0,
      QC_Status: 'Pending',
      QC_Comments: '',
      QC_Approved_By: null,
      QC_Approved_By_Name: null,
      QC_Date: null,
      Version_No: 1,
      Locked: false,
      Outcome_URL: '',
      Notes: '',
      Last_Updated: '2024-11-13',
    },
  ];

  const getTasksByMilestone = (milestoneId: string) => {
    return tasksData.filter(t => t.Milestone_ID === milestoneId);
  };

  const getAllTasks = () => tasksData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Under QC': return 'bg-yellow-100 text-yellow-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rework': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQCStatusColor = (status: string) => {
    switch (status) {
      case 'Pass': return 'bg-green-100 text-green-800';
      case 'Fail': return 'bg-red-100 text-red-800';
      case 'Rework': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQCApprove = (taskId: string) => {
    toast.success('Task approved. Moving to next stage...');
  };

  const handleSendForRework = (taskId: string) => {
    toast.success('Task sent for rework. Assignee notified.');
  };

  const handleMoveToNext = (milestoneId: string) => {
    toast.success('Tasks moved to next milestone');
  };

  const handleUploadAsset = () => {
    toast.success('Asset upload dialog opened');
  };

  const handleLockVersion = (taskId: string) => {
    toast.success('Task version locked');
  };

  const selectedTaskData = tasksData.find(t => t.Task_ID === selectedTask);

  // Calculate metrics
  const allTasks = getAllTasks();
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(t => t.QC_Status === 'Pass').length;
  const completedPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const pendingQC = allTasks.filter(t => t.QC_Status === 'Pending').length;
  const approvedTasks = allTasks.filter(t => t.QC_Status === 'Pass').length;
  const reworkTasks = allTasks.filter(t => t.QC_Status === 'Rework').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#7A1C46] text-xl">📈 {projectName} - Stage Pipeline</h2>
          <p className="text-sm text-gray-600">Milestone & Task Workflow with QC Tracking</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>Create a task within a milestone</DialogDescription>
              </DialogHeader>
              <AddTaskForm onClose={() => setShowTaskDialog(false)} milestones={milestonesData} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Metrics Bar */}
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardContent className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl text-[#7A1C46]">{totalTasks}</div>
              <div className="text-xs text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-green-600">{completedPercent}%</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-yellow-600">{pendingQC}</div>
              <div className="text-xs text-gray-600">Pending QC</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-green-600">{approvedTasks}</div>
              <div className="text-xs text-gray-600">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-orange-600">{reworkTasks}</div>
              <div className="text-xs text-gray-600">Rework</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {MILESTONE_STAGES.map((stageName) => {
          const milestone = milestonesData.find(m => m.Milestone_Name === stageName);
          const tasks = milestone ? getTasksByMilestone(milestone.Milestone_ID) : [];
          const progress = milestone ? (milestone.Completed_Tasks / (milestone.Tasks_Count || 1)) * 100 : 0;
          const stageColor = STAGE_COLORS[stageName as keyof typeof STAGE_COLORS];

          return (
            <Card key={stageName} className="border-[#E2E8F0]" style={{ borderTopColor: stageColor, borderTopWidth: '4px' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{stageName}</CardTitle>
                  {milestone?.QC_Required && (
                    <Badge variant="outline" className="text-xs">QC</Badge>
                  )}
                </div>
                {milestone && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{milestone.Owner_Name}</span>
                      <Badge className={getStatusColor(milestone.Status)} variant="outline">
                        {milestone.Status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900">{milestone.Completed_Tasks}/{milestone.Tasks_Count}</span>
                      </div>
                      <Progress value={progress} className="h-1" />
                    </div>
                    {milestone.QC_Required && milestone.QC_Approved_By_Name && (
                      <div className="text-xs text-green-600">
                        ✓ Approved by {milestone.QC_Approved_By_Name}
                      </div>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-2">
                {tasks.length === 0 ? (
                  <div className="text-center py-4 text-xs text-gray-400">
                    No tasks yet
                  </div>
                ) : (
                  tasks.map((task) => {
                    let cardBgColor = 'bg-white';
                    if (task.QC_Status === 'Pass') cardBgColor = 'bg-green-50';
                    else if (task.QC_Status === 'Rework') cardBgColor = 'bg-orange-50';
                    else if (task.QC_Status === 'Fail') cardBgColor = 'bg-red-50';
                    else if (task.QC_Status === 'Pending') cardBgColor = 'bg-gray-50';

                    return (
                      <Card 
                        key={task.Task_ID} 
                        className={`border-[#E2E8F0] cursor-pointer hover:shadow-md transition-shadow ${cardBgColor}`}
                        onClick={() => {
                          setSelectedTask(task.Task_ID);
                          setShowTaskDetailsDialog(true);
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="text-xs truncate">{task.Task_Name}</div>
                                <div className="text-xs text-gray-500">{task.Assigned_To_Name}</div>
                              </div>
                              <GripVertical className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            </div>
                            
                            {task.Asset_Name && (
                              <div className="flex items-center gap-1 text-xs text-[#7A1C46]">
                                <FolderOpen className="w-3 h-3" />
                                <span className="truncate">{task.Asset_Name}</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <Badge className={getQCStatusColor(task.QC_Status)} variant="outline">
                                {task.QC_Status}
                              </Badge>
                              <div className="flex gap-1">
                                {task.Locked && (
                                  <Badge variant="outline" className="text-xs">
                                    <Lock className="w-3 h-3" />
                                  </Badge>
                                )}
                                {task.Version_No > 1 && (
                                  <Badge variant="outline" className="text-xs">
                                    v{task.Version_No}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">Progress</span>
                                <span className="text-gray-900">{task.Progress}%</span>
                              </div>
                              <Progress value={task.Progress} className="h-1" />
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{task.End_Date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                <span>{task.Actual_Hours}/{task.Planned_Hours}h</span>
                              </div>
                            </div>

                            {task.QC_Comments && (
                              <div className="text-xs text-gray-600 italic border-t pt-2">
                                "{task.QC_Comments}"
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}

                {milestone && (milestone.Status === 'In Progress' || milestone.Status === 'Under QC') && (
                  <div className="flex flex-col gap-1 pt-2">
                    {milestone.Next_Milestone_ID && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveToNext(milestone.Milestone_ID);
                        }}
                      >
                        <ArrowRight className="w-3 h-3 mr-1" />
                        Move to Next
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUploadAsset();
                      }}
                    >
                      <Upload className="w-3 h-3 mr-1" />
                      Upload Asset
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Task Details Dialog */}
      <Dialog open={showTaskDetailsDialog} onOpenChange={setShowTaskDetailsDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>🧱 Task Details & QC Workflow</DialogTitle>
            <DialogDescription>
              {selectedTaskData ? selectedTaskData.Task_Name : 'Task Details'}
            </DialogDescription>
          </DialogHeader>
          {selectedTaskData && (
            <TaskDetailsView 
              task={selectedTaskData} 
              onClose={() => setShowTaskDetailsDialog(false)}
              onQCApprove={handleQCApprove}
              onSendForRework={handleSendForRework}
              onLockVersion={handleLockVersion}
            />
          )}
        </DialogContent>
      </Dialog>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          QC-required milestones need approval before tasks can move to the next stage. Click any task card to view full details and manage QC workflow.
        </AlertDescription>
      </Alert>
    </div>
  );
}

function TaskDetailsView({ 
  task, 
  onClose, 
  onQCApprove, 
  onSendForRework, 
  onLockVersion 
}: { 
  task: Task; 
  onClose: () => void;
  onQCApprove: (taskId: string) => void;
  onSendForRework: (taskId: string) => void;
  onLockVersion: (taskId: string) => void;
}) {
  const [formData, setFormData] = useState({
    progress: task.Progress,
    qc_status: task.QC_Status,
    qc_comments: task.QC_Comments,
    notes: task.Notes,
  });

  const handleSave = () => {
    toast.success('Task updated successfully');
    onClose();
  };

  const handleQCApproveAndClose = () => {
    onQCApprove(task.Task_ID);
    onClose();
  };

  const handleReturnForRework = () => {
    onSendForRework(task.Task_ID);
    onClose();
  };

  const handleLock = () => {
    onLockVersion(task.Task_ID);
  };

  const STAGE_COLORS_STATUS = [
    { label: 'Ideation', color: '#d9d9d9' },
    { label: 'Drafting', color: '#f5b041' },
    { label: 'QC Review', color: '#5dade2' },
    { label: 'Design', color: '#48c9b0' },
    { label: 'Publish', color: '#58d68d' },
    { label: 'SEO Promotion', color: '#a569bd' },
  ];

  const currentStageIndex = STAGE_COLORS_STATUS.findIndex(s => s.label === task.Milestone_Name);

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="flex items-center gap-2">
        {STAGE_COLORS_STATUS.map((stage, idx) => (
          <div key={stage.label} className="flex-1">
            <div 
              className={`h-2 rounded-full ${idx <= currentStageIndex ? '' : 'opacity-30'}`}
              style={{ backgroundColor: stage.color }}
            />
            <div className="text-xs text-center mt-1 text-gray-600">{stage.label}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">Task Details</TabsTrigger>
          <TabsTrigger value="qc_checklist" className="flex-1">✅ QC Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Task Name</Label>
            <Input value={task.Task_Name} readOnly className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label>Milestone</Label>
            <Input value={task.Milestone_Name} readOnly className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label>Assigned To</Label>
            <Input value={task.Assigned_To_Name} readOnly className="bg-gray-50" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" value={task.Start_Date} readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={task.End_Date} readOnly className="bg-gray-50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Progress</Label>
            <div className="flex items-center gap-2">
              <Progress value={formData.progress} className="flex-1" />
              <span className="text-sm text-gray-600">{formData.progress}%</span>
            </div>
            <Input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Planned Hours</Label>
              <Input value={task.Planned_Hours} readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label>Actual Hours</Label>
              <Input value={task.Actual_Hours} readOnly className="bg-gray-50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Asset</Label>
            <div className="flex gap-2">
              <Input 
                value={task.Asset_Name || 'No asset attached'} 
                readOnly 
                className="bg-gray-50 flex-1" 
              />
              {task.Asset_Name && (
                <Button variant="outline" size="sm">
                  <FolderOpen className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - QC Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>QC Status *</Label>
            <Select 
              value={formData.qc_status} 
              onValueChange={(value) => setFormData({ ...formData, qc_status: value })}
            >
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
              value={formData.qc_comments}
              onChange={(e) => setFormData({ ...formData, qc_comments: e.target.value })}
              placeholder="Add QC feedback..."
              rows={4}
            />
          </div>

          {task.QC_Approved_By_Name && (
            <div className="space-y-2">
              <Label>QC Approved By</Label>
              <Input value={task.QC_Approved_By_Name} readOnly className="bg-gray-50" />
            </div>
          )}

          {task.QC_Date && (
            <div className="space-y-2">
              <Label>QC Date</Label>
              <Input value={task.QC_Date} readOnly className="bg-gray-50" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Version No</Label>
              <Input value={`v${task.Version_No}`} readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2 flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Label>Locked</Label>
                <Badge className={task.Locked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                  {task.Locked ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Outcome URL</Label>
            <Input
              type="url"
              value={task.Outcome_URL}
              placeholder="https://..."
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add task notes..."
              rows={3}
            />
          </div>
        </div>
      </div>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertDescription className="text-yellow-800 text-sm">
          <strong>QC Workflow:</strong> If QC Status = Pass → task auto-progresses to next milestone. If Rework/Fail → task reopens and assignee is notified.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        <Button onClick={handleSave} className="bg-[#7A1C46] hover:bg-[#5A1434]">
          💾 Save Progress
        </Button>
        {task.Asset_Name && (
          <Button variant="outline">
            <FolderOpen className="w-4 h-4 mr-2" />
            View Asset
          </Button>
        )}
        {formData.qc_status === 'Pass' && (
          <Button variant="outline" onClick={handleQCApproveAndClose} className="bg-green-50">
            <CheckCircle className="w-4 h-4 mr-2" />
            QC Approve & Close
          </Button>
        )}
        {(formData.qc_status === 'Rework' || formData.qc_status === 'Fail') && (
          <Button variant="outline" onClick={handleReturnForRework} className="bg-orange-50">
            <RotateCcw className="w-4 h-4 mr-2" />
            Return for Rework
          </Button>
        )}
        {!task.Locked && (
          <Button variant="outline" onClick={handleLock}>
            <Lock className="w-4 h-4 mr-2" />
            Lock & Archive
          </Button>
        )}
      </div>
        </TabsContent>

        <TabsContent value="qc_checklist" className="mt-6">
          <QCChecklistSection taskId={task.Task_ID} assetType="Content" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AddTaskForm({ onClose, milestones }: { onClose: () => void; milestones: Milestone[] }) {
  const [formData, setFormData] = useState({
    milestone_id: '',
    task_name: '',
    assigned_to: '',
    planned_hours: '',
    start_date: '',
    end_date: '',
    notes: '',
  });

  const handleSubmit = () => {
    toast.success('Task created successfully');
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Milestone *</Label>
        <Select value={formData.milestone_id} onValueChange={(value) => setFormData({ ...formData, milestone_id: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select milestone" />
          </SelectTrigger>
          <SelectContent>
            {milestones.map((m) => (
              <SelectItem key={m.Milestone_ID} value={m.Milestone_ID}>
                {m.Milestone_Name} ({m.Status})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Task Name *</Label>
        <Input
          value={formData.task_name}
          onChange={(e) => setFormData({ ...formData, task_name: e.target.value })}
          placeholder="e.g., Write Introduction"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Assigned To *</Label>
          <Select value={formData.assigned_to} onValueChange={(value) => setFormData({ ...formData, assigned_to: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USR001">Alice Johnson</SelectItem>
              <SelectItem value="USR002">Bob Wilson</SelectItem>
              <SelectItem value="USR003">Carol Smith</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Planned Hours</Label>
          <Input
            type="number"
            value={formData.planned_hours}
            onChange={(e) => setFormData({ ...formData, planned_hours: e.target.value })}
            placeholder="e.g., 8"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>End Date</Label>
          <Input
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add task notes..."
          rows={3}
        />
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          Tasks will automatically track progress and hours. Attach assets and manage QC after creation.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Create Task
        </Button>
      </div>
    </div>
  );
}
