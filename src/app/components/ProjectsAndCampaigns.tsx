import { useState } from 'react';
import { Plus, Rocket, FastForward, Link2, Target, CheckCircle2, Clock, Kanban, List, ChevronRight, Undo2, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import ProjectNewForm from './ProjectNewForm';
import ProjectKanbanView from './ProjectKanbanView';
import SMMCalendarView from './SMMCalendarView';
import SEOSubmissionView from './SEOSubmissionView';
import QCDashboard from './QCDashboard';
import AssetLibrary from './AssetLibrary';

interface ProjectsAndCampaignsProps {
  onNavigate: (route: string) => void;
}

export default function ProjectsAndCampaigns({ onNavigate }: ProjectsAndCampaignsProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>('PRJ001');
  const [activeTab, setActiveTab] = useState('Campaigns');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  const projectsData = [
    {
      Project_ID: 'PRJ001',
      Project_Name: 'Cloud Content Strategy Q4',
      Project_Type: 'Content Campaign',
      Service_ID: 'SRV001',
      Owner: 'John Doe',
      Start: '2024-10-01',
      End: '2024-12-31',
      Status: 'Active',
      Weekly_Score: 85,
      Stage: 'In Progress',
      Calendar_Start: '2024-10-01',
      Calendar_End: '2024-12-31',
      Daily_Quota: '2 articles/day',
      Wordcount_Target_Month: 50000,
    },
    {
      Project_ID: 'PRJ002',
      Project_Name: 'AI Social Media Blitz',
      Project_Type: 'SMM Campaign',
      Service_ID: 'SRV002',
      Owner: 'Jane Smith',
      Start: '2024-11-01',
      End: '2025-01-31',
      Status: 'Active',
      Weekly_Score: 78,
      Stage: 'In Progress',
      Calendar_Start: '2024-11-01',
      Calendar_End: '2025-01-31',
      Daily_Quota: '5 posts/day',
    },
    {
      Project_ID: 'PRJ003',
      Project_Name: 'Enterprise SEO Outreach',
      Project_Type: 'SEO Campaign (Off-page)',
      Service_ID: 'SRV001',
      Owner: 'Bob Johnson',
      Start: '2024-10-15',
      End: '2024-12-15',
      Status: 'Active',
      Weekly_Score: 92,
      Stage: 'Plan & Scope',
      Calendar_Start: '2024-10-15',
      Calendar_End: '2024-12-15',
      Daily_Quota: '100 backlinks/day',
    },
  ];

  const campaignsData = [
    {
      Campaign_ID: 'CMP001',
      Campaign_Type: 'New Service Development',
      Quarter: 'Q4',
      Fiscal_Year: 'FY2025',
      Start: '2024-10-01',
      End: '2024-10-31',
      Status: 'Completed',
      KPI_Target: 100,
      KPI_Actual: 95,
    },
    {
      Campaign_ID: 'CMP002',
      Campaign_Type: 'Content Promotion (Insights)',
      Quarter: 'Q4',
      Fiscal_Year: 'FY2025',
      Start: '2024-11-01',
      End: '2024-11-30',
      Status: 'In Progress',
      KPI_Target: 50,
      KPI_Actual: 32,
    },
    {
      Campaign_ID: 'CMP003',
      Campaign_Type: 'Backlink Campaign',
      Quarter: 'Q4',
      Fiscal_Year: 'FY2025',
      Start: '2024-11-01',
      End: '2024-12-15',
      Status: 'In Progress',
      KPI_Target: 30,
      KPI_Actual: 18,
    },
  ];

  const tasksData = [
    {
      Task_ID: 'TSK001',
      Campaign_ID: 'CMP002',
      Task_Type: 'Content Development',
      Stage: 'Published',
      Title: 'Cloud Migration Best Practices Blog',
      Assignee: 'Alice Brown',
      Priority: 'High',
      Planned_Start: '2024-11-01',
      Planned_End: '2024-11-05',
      Status: 'Completed',
      QC_Status: 'Pass',
      Rework_Count: 0,
      Outcome_URL: '/blog/cloud-migration-practices',
    },
    {
      Task_ID: 'TSK002',
      Campaign_ID: 'CMP002',
      Task_Type: 'Content Development',
      Stage: 'Review',
      Title: 'Case Study: Enterprise Cloud Success',
      Assignee: 'Bob Wilson',
      Priority: 'Medium',
      Planned_Start: '2024-11-05',
      Planned_End: '2024-11-10',
      Status: 'In Progress',
      QC_Status: 'Pending',
      Rework_Count: 1,
      Outcome_URL: null,
    },
    {
      Task_ID: 'TSK003',
      Campaign_ID: 'CMP003',
      Task_Type: 'Backlink Submission',
      Stage: 'Submitted',
      Title: 'Submit to TechCrunch Directory',
      Assignee: 'Charlie Davis',
      Priority: 'High',
      Planned_Start: '2024-11-01',
      Planned_End: '2024-11-03',
      Status: 'In Progress',
      QC_Status: 'Pending',
      Rework_Count: 0,
      Outcome_URL: null,
    },
  ];

  const stagesData = [
    {
      Stage: 'Plan & Scope',
      Owner: 'John Doe',
      SLA_Days: 7,
      Start: '2024-10-01',
      Due: '2024-10-08',
      QC_Status: 'Pass',
      Rework_Count: 0,
      Completion: 100,
      Notes: 'Brief completed and approved',
    },
    {
      Stage: 'Write',
      Owner: 'Alice Brown',
      SLA_Days: 5,
      Start: '2024-10-08',
      Due: '2024-10-13',
      QC_Status: 'Pass',
      Rework_Count: 1,
      Completion: 100,
      Notes: 'Wordcount met, plagiarism check passed',
    },
    {
      Stage: 'Editorial Review',
      Owner: 'Jane Smith',
      SLA_Days: 2,
      Start: '2024-10-13',
      Due: '2024-10-15',
      QC_Status: 'Pass',
      Rework_Count: 0,
      Completion: 100,
      Notes: 'Grammar and style approved',
    },
    {
      Stage: 'Design',
      Owner: 'Design Team',
      SLA_Days: 3,
      Start: '2024-10-15',
      Due: '2024-10-18',
      QC_Status: 'Pending',
      Rework_Count: 0,
      Completion: 60,
      Notes: 'Visual assets in progress',
    },
  ];

  const errorURLsData = [
    {
      Error_ID: 'ERR001',
      URL: '/old-services/outdated-page',
      Issue_Category: 'Content',
      Severity: 'High',
      Owner: 'Tech Team',
      Fix_Due: '2024-11-03',
      Status: 'In Progress',
      QC_Status: 'Pending',
      Fixed_On: null,
    },
    {
      Error_ID: 'ERR002',
      URL: '/blog/broken-link',
      Issue_Category: 'Code/Technical',
      Severity: 'Critical',
      Owner: 'Tech Team',
      Fix_Due: '2024-10-30',
      Status: 'Open',
      QC_Status: 'Pending',
      Fixed_On: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'active':
      case 'in progress':
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'rework':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
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

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedProjectData = projectsData.find((p) => p.Project_ID === selectedProject);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Projects List */}
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#7A1C46]">Projects & Campaigns</CardTitle>
              <p className="text-gray-600 mt-1">Manage marketing projects with pipeline workflows</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                onClick={() => setViewMode('kanban')}
              >
                <Kanban className="w-4 h-4 mr-2" />
                Kanban
              </Button>
              <Button
                className="bg-[#7A1C46] hover:bg-[#5A1434]"
                onClick={() => setShowNewProjectDialog(true)}
              >
                <Rocket className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'kanban' ? (
            <ProjectKanbanView projects={projectsData} onProjectClick={setSelectedProject} />
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project ID</TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Weekly Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectsData.map((project) => (
                    <TableRow
                      key={project.Project_ID}
                      className={`cursor-pointer ${
                        selectedProject === project.Project_ID ? 'bg-purple-50' : ''
                      }`}
                      onClick={() => setSelectedProject(project.Project_ID)}
                    >
                      <TableCell>{project.Project_ID}</TableCell>
                      <TableCell>{project.Project_Name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.Project_Type}</Badge>
                      </TableCell>
                      <TableCell>{project.Owner}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.Stage}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(project.Status)}>{project.Status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.Weekly_Score} className="w-16" />
                          <span className="text-sm">{project.Weekly_Score}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Detail */}
      {selectedProject && selectedProjectData && (
        <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <CardHeader>
            <CardTitle className="text-[#7A1C46]">{selectedProjectData.Project_Name}</CardTitle>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Owner: {selectedProjectData.Owner}</span>
              <span>•</span>
              <span>Type: {selectedProjectData.Project_Type}</span>
              <span>•</span>
              <span>
                {selectedProjectData.Start} to {selectedProjectData.End}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="Campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="Stages">Pipeline Stages</TabsTrigger>
                <TabsTrigger value="Tasks">Tasks</TabsTrigger>
                <TabsTrigger value="QC_Tracker">🧮 QC Tracker</TabsTrigger>
                <TabsTrigger value="Assets">📁 Assets</TabsTrigger>
                {selectedProjectData.Project_Type === 'SMM Campaign' && (
                  <TabsTrigger value="SMM_Calendar">SMM Calendar</TabsTrigger>
                )}
                {selectedProjectData.Project_Type === 'SEO Campaign (Off-page)' && (
                  <TabsTrigger value="SEO_Submit">SEO Submissions</TabsTrigger>
                )}
                {selectedProjectData.Project_Type === 'On-page Campaign' && (
                  <TabsTrigger value="Onpage_Issues">On-page Issues</TabsTrigger>
                )}
                <TabsTrigger value="KPI">KPI</TabsTrigger>
                <TabsTrigger value="Audit">Audit</TabsTrigger>
              </TabsList>

              <TabsContent value="Campaigns" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3>Campaigns</h3>
                    <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Campaign
                    </Button>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign ID</TableHead>
                          <TableHead>Campaign Type</TableHead>
                          <TableHead>Quarter</TableHead>
                          <TableHead>Start</TableHead>
                          <TableHead>End</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Target</TableHead>
                          <TableHead>Actual</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {campaignsData.map((campaign) => (
                          <TableRow key={campaign.Campaign_ID}>
                            <TableCell>{campaign.Campaign_ID}</TableCell>
                            <TableCell>{campaign.Campaign_Type}</TableCell>
                            <TableCell>{campaign.Quarter}</TableCell>
                            <TableCell>{campaign.Start}</TableCell>
                            <TableCell>{campaign.End}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(campaign.Status)}>{campaign.Status}</Badge>
                            </TableCell>
                            <TableCell>{campaign.KPI_Target}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{campaign.KPI_Actual}</span>
                                <span className="text-xs text-gray-500">
                                  ({Math.round((campaign.KPI_Actual / campaign.KPI_Target) * 100)}%)
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="Stages" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3>Pipeline Stages</h3>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <ChevronRight className="w-4 h-4 mr-2" />
                        Move to Next Stage
                      </Button>
                      <Button variant="outline">
                        <Undo2 className="w-4 h-4 mr-2" />
                        Send to Rework
                      </Button>
                      <Button variant="outline">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Add QC Result
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stage</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>SLA Days</TableHead>
                          <TableHead>Start</TableHead>
                          <TableHead>Due</TableHead>
                          <TableHead>QC Status</TableHead>
                          <TableHead>Rework Count</TableHead>
                          <TableHead>Completion %</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stagesData.map((stage, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{stage.Stage}</TableCell>
                            <TableCell>{stage.Owner}</TableCell>
                            <TableCell>{stage.SLA_Days}</TableCell>
                            <TableCell>{stage.Start}</TableCell>
                            <TableCell>{stage.Due}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(stage.QC_Status)}>{stage.QC_Status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{stage.Rework_Count}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={stage.Completion} className="w-16" />
                                <span className="text-sm">{stage.Completion}%</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="Tasks" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3>Tasks</h3>
                    <div className="flex gap-2">
                      <Button className="bg-[#7A1C46] hover:bg-[#5A1434]">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Task
                      </Button>
                      <Button variant="outline">
                        <FastForward className="w-4 h-4 mr-2" />
                        Bulk Stage Move
                      </Button>
                      <Button variant="outline">
                        <Link2 className="w-4 h-4 mr-2" />
                        Link Content
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Stage</TableHead>
                          <TableHead>Assignee</TableHead>
                          <TableHead>QC Status</TableHead>
                          <TableHead>Rework</TableHead>
                          <TableHead>Priority</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasksData.map((task) => (
                          <TableRow key={task.Task_ID}>
                            <TableCell>{task.Task_ID}</TableCell>
                            <TableCell className="max-w-xs">{task.Title}</TableCell>
                            <TableCell>{task.Task_Type}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{task.Stage}</Badge>
                            </TableCell>
                            <TableCell>{task.Assignee}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(task.QC_Status)}>{task.QC_Status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{task.Rework_Count}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getPriorityColor(task.Priority)}>{task.Priority}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              {selectedProjectData.Project_Type === 'SMM Campaign' && (
                <TabsContent value="SMM_Calendar" className="mt-6">
                  <SMMCalendarView projectId={selectedProject} />
                </TabsContent>
              )}

              {selectedProjectData.Project_Type === 'SEO Campaign (Off-page)' && (
                <TabsContent value="SEO_Submit" className="mt-6">
                  <SEOSubmissionView projectId={selectedProject} />
                </TabsContent>
              )}

              {selectedProjectData.Project_Type === 'On-page Campaign' && (
                <TabsContent value="Onpage_Issues" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3>On-page Issues</h3>
                      <div className="flex gap-2">
                        <Button variant="outline">Assign</Button>
                        <Button variant="outline">Move to QC</Button>
                        <Button variant="outline">Verify & Close</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Error ID</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Issue Category</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Fix Due</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>QC Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {errorURLsData.map((error) => (
                            <TableRow key={error.Error_ID}>
                              <TableCell>{error.Error_ID}</TableCell>
                              <TableCell className="max-w-xs truncate">{error.URL}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{error.Issue_Category}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={getSeverityColor(error.Severity)}>{error.Severity}</Badge>
                              </TableCell>
                              <TableCell>{error.Owner}</TableCell>
                              <TableCell>{error.Fix_Due}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(error.Status)}>{error.Status}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(error.QC_Status)}>{error.QC_Status}</Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              )}

              <TabsContent value="KPI" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#7A1C46]" />
                        SEO Score (Avg)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#7A1C46"
                              strokeWidth="8"
                              strokeDasharray={`${2 * Math.PI * 40 * 0.82} ${
                                2 * Math.PI * 40 * 0.18
                              }`}
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl">82</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        Language Score (Avg)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="8"
                              strokeDasharray={`${2 * Math.PI * 40 * 0.89} ${
                                2 * Math.PI * 40 * 0.11
                              }`}
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl">89</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        Campaign Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="8"
                              strokeDasharray={`${2 * Math.PI * 40 * 0.65} ${
                                2 * Math.PI * 40 * 0.35
                              }`}
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl">65%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="QC_Tracker" className="mt-6">
                <QCDashboard />
              </TabsContent>

              <TabsContent value="Assets" className="mt-6">
                <AssetLibrary />
              </TabsContent>

              <TabsContent value="Audit" className="mt-6">
                <div className="space-y-4">
                  <h3>Activity Log</h3>
                  <div className="space-y-3">
                    {[
                      {
                        action: 'Stage moved to "Design"',
                        user: 'John Doe',
                        timestamp: '2024-11-01 09:30 AM',
                      },
                      {
                        action: 'QC Status set to Pass for Editorial Review',
                        user: 'Jane Smith',
                        timestamp: '2024-11-01 08:15 AM',
                      },
                      {
                        action: 'Task TSK001 completed and published',
                        user: 'Alice Brown',
                        timestamp: '2024-10-31 04:20 PM',
                      },
                    ].map((log, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-[#7A1C46] rounded-full mt-2" />
                        <div className="flex-1">
                          <p className="text-sm">{log.action}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {log.user} • {log.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* New Project Dialog */}
      <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Set up a new marketing project with pipeline stages
            </DialogDescription>
          </DialogHeader>
          <ProjectNewForm
            onNavigate={onNavigate}
            onClose={() => setShowNewProjectDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
