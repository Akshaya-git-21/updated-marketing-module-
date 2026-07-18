import { useState } from 'react';
import {
  Plus, Download, Search, ChevronDown, ChevronRight, Edit, Trash2,
  BarChart3, X, XCircle, Calendar, Fragment
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import React from 'react';

interface KeyResult {
  id: string;
  title: string;
  metricType: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  weight: number;
  assignedTo: string;
  status: 'Draft' | 'Active' | 'Done';
  baseline?: number;
  frequency: string;
}

interface OKR {
  id: string;
  objectiveTitle: string;
  objectiveDescription: string;
  owner: string;
  team: string[];
  cycle: string;
  department: string;
  category: string;
  progress: number;
  dueDate: string;
  startDate: string;
  status: 'Draft' | 'In Progress' | 'Completed' | 'Archived';
  weight: number;
  keyResults: KeyResult[];
  parentObjective?: string;
  linkedCampaigns: string[];
  reviewer?: string;
  qcNotes?: string;
  versionCode?: string;
}

export default function OKRConfiguration() {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingOKR, setEditingOKR] = useState<OKR | null>(null);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCycle, setFilterCycle] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    objectiveTitle: '',
    objectiveDescription: '',
    cycle: '',
    department: '',
    category: '',
    owner: '',
    team: [] as string[],
    weight: 25,
    startDate: '',
    endDate: '',
    keyResults: [] as Partial<KeyResult>[],
    parentObjective: '',
    linkedCampaigns: [] as string[],
    reviewer: '',
    qcNotes: '',
    status: 'Draft' as OKR['status'],
  });

  // Mock data
  const [okrs, setOkrs] = useState<OKR[]>([
    {
      id: '1',
      objectiveTitle: 'Increase Organic Traffic by 50%',
      objectiveDescription: 'Drive significant growth in organic search visitors through SEO optimization',
      owner: 'Sarah Johnson',
      team: ['Sarah Johnson', 'Mike Chen'],
      cycle: 'Q1 2025',
      department: 'Marketing',
      category: 'SEO',
      progress: 68,
      dueDate: '2025-03-31',
      startDate: '2025-01-01',
      status: 'In Progress',
      weight: 30,
      keyResults: [
        {
          id: 'kr1',
          title: 'Increase organic visitors to 100K/month',
          metricType: 'Visitors',
          targetValue: 100000,
          currentValue: 68000,
          unit: 'visitors',
          weight: 40,
          assignedTo: 'Sarah Johnson',
          status: 'Active',
          frequency: 'Monthly',
        },
        {
          id: 'kr2',
          title: 'Rank for 50 high-volume keywords in top 10',
          metricType: 'Keywords Ranked',
          targetValue: 50,
          currentValue: 34,
          unit: 'keywords',
          weight: 30,
          assignedTo: 'Mike Chen',
          status: 'Active',
          frequency: 'Weekly',
        },
        {
          id: 'kr3',
          title: 'Build 200 quality backlinks',
          metricType: 'Backlinks',
          targetValue: 200,
          currentValue: 135,
          unit: 'backlinks',
          weight: 30,
          assignedTo: 'Sarah Johnson',
          status: 'Active',
          frequency: 'Monthly',
        },
      ],
      linkedCampaigns: ['CAM-001', 'CAM-003'],
      reviewer: 'John Smith',
      versionCode: 'OKR-Q1-2025-V1.2',
    },
    {
      id: '2',
      objectiveTitle: 'Launch 30 High-Quality Content Pieces',
      objectiveDescription: 'Create comprehensive content across all service categories',
      owner: 'Mike Chen',
      team: ['Mike Chen', 'Emily Davis'],
      cycle: 'Q1 2025',
      department: 'Content',
      category: 'Content',
      progress: 43,
      dueDate: '2025-03-31',
      startDate: '2025-01-01',
      status: 'In Progress',
      weight: 25,
      keyResults: [
        {
          id: 'kr4',
          title: 'Publish 30 blog posts',
          metricType: 'Content Pieces',
          targetValue: 30,
          currentValue: 13,
          unit: 'articles',
          weight: 50,
          assignedTo: 'Mike Chen',
          status: 'Active',
          frequency: 'Weekly',
        },
        {
          id: 'kr5',
          title: 'Achieve 50K avg views per article',
          metricType: 'Engagement',
          targetValue: 50000,
          currentValue: 21000,
          unit: 'views',
          weight: 50,
          assignedTo: 'Emily Davis',
          status: 'Active',
          frequency: 'Monthly',
        },
      ],
      linkedCampaigns: ['CAM-002'],
      reviewer: 'John Smith',
      versionCode: 'OKR-Q1-2025-V1.0',
    },
    {
      id: '3',
      objectiveTitle: 'Optimize Website Performance',
      objectiveDescription: 'Improve site speed and user experience metrics',
      owner: 'Alex Martinez',
      team: ['Alex Martinez'],
      cycle: 'Q2 2025',
      department: 'Tech',
      category: 'Web',
      progress: 15,
      dueDate: '2025-06-30',
      startDate: '2025-04-01',
      status: 'Draft',
      weight: 20,
      keyResults: [
        {
          id: 'kr6',
          title: 'Reduce page load time to under 2s',
          metricType: 'Performance',
          targetValue: 2,
          currentValue: 3.5,
          unit: 'seconds',
          weight: 60,
          assignedTo: 'Alex Martinez',
          status: 'Draft',
          frequency: 'Weekly',
        },
        {
          id: 'kr7',
          title: 'Achieve 95+ Lighthouse score',
          metricType: 'Performance',
          targetValue: 95,
          currentValue: 78,
          unit: 'score',
          weight: 40,
          assignedTo: 'Alex Martinez',
          status: 'Draft',
          frequency: 'Weekly',
        },
      ],
      linkedCampaigns: [],
      reviewer: 'John Smith',
      versionCode: 'OKR-Q2-2025-V1.0',
    },
  ]);

  const metricTypes = [
    'Visitors',
    'Keywords Ranked',
    'Backlinks',
    'Content Pieces',
    'Leads',
    'Engagement',
    'Performance',
    'Conversions',
  ];

  const units = ['%', '#', '₹', 'visitors', 'keywords', 'backlinks', 'articles', 'views', 'seconds', 'score'];

  const toggleRowExpand = (okrId: string) => {
    setExpandedRows(prev =>
      prev.includes(okrId) ? prev.filter(id => id !== okrId) : [...prev, okrId]
    );
  };

  const filteredOKRs = okrs.filter(okr => {
    const matchesSearch =
      okr.objectiveTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      okr.owner.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCycle = filterCycle === 'all' || okr.cycle === filterCycle;
    const matchesDepartment = filterDepartment === 'all' || okr.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || okr.status === filterStatus;

    return matchesSearch && matchesCycle && matchesDepartment && matchesStatus;
  });

  const handleAddNewOKR = () => {
    setEditingOKR(null);
    setFormData({
      objectiveTitle: '',
      objectiveDescription: '',
      cycle: '',
      department: '',
      category: '',
      owner: '',
      team: [],
      weight: 25,
      startDate: '',
      endDate: '',
      keyResults: [
        {
          title: '',
          metricType: 'Visitors',
          targetValue: 0,
          currentValue: 0,
          unit: 'visitors',
          weight: 100,
          assignedTo: '',
          status: 'Draft',
          frequency: 'Monthly',
        },
      ],
      parentObjective: '',
      linkedCampaigns: [],
      reviewer: '',
      qcNotes: '',
      status: 'Draft',
    });
    setShowSidePanel(true);
  };

  const handleEditOKR = (okr: OKR) => {
    setEditingOKR(okr);
    setFormData({
      objectiveTitle: okr.objectiveTitle,
      objectiveDescription: okr.objectiveDescription,
      cycle: okr.cycle,
      department: okr.department,
      category: okr.category,
      owner: okr.owner,
      team: okr.team,
      weight: okr.weight,
      startDate: okr.startDate,
      endDate: okr.dueDate,
      keyResults: okr.keyResults,
      parentObjective: okr.parentObjective || '',
      linkedCampaigns: okr.linkedCampaigns,
      reviewer: okr.reviewer || '',
      qcNotes: okr.qcNotes || '',
      status: okr.status,
    });
    setShowSidePanel(true);
  };

  const handleSaveOKR = () => {
    if (!formData.objectiveTitle || !formData.cycle) {
      toast.error('Please fill in all required fields');
      return;
    }

    const totalKRWeight = formData.keyResults.reduce((sum, kr) => sum + (kr.weight || 0), 0);
    if (totalKRWeight !== 100) {
      toast.error(`Key Results weight must total 100% (currently ${totalKRWeight}%)`);
      return;
    }

    if (editingOKR) {
      // Update
      setOkrs(okrs.map(o =>
        o.id === editingOKR.id
          ? {
              ...o,
              ...formData,
              dueDate: formData.endDate,
              keyResults: formData.keyResults as KeyResult[],
            }
          : o
      ));
      toast.success('✅ OKR Updated Successfully');
    } else {
      // Create
      const newOKR: OKR = {
        id: `${okrs.length + 1}`,
        ...formData,
        dueDate: formData.endDate,
        progress: 0,
        keyResults: formData.keyResults as KeyResult[],
        versionCode: `OKR-${formData.cycle.replace(' ', '-')}-V1.0`,
      };
      setOkrs([...okrs, newOKR]);
      toast.success('✅ OKR Created Successfully');
    }

    setShowSidePanel(false);
  };

  const handleAddKeyResult = () => {
    setFormData({
      ...formData,
      keyResults: [
        ...formData.keyResults,
        {
          title: '',
          metricType: 'Visitors',
          targetValue: 0,
          currentValue: 0,
          unit: 'visitors',
          weight: 0,
          assignedTo: '',
          status: 'Draft',
          frequency: 'Monthly',
        },
      ],
    });
  };

  const handleRemoveKeyResult = (index: number) => {
    setFormData({
      ...formData,
      keyResults: formData.keyResults.filter((_, i) => i !== index),
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterCycle('all');
    setFilterDepartment('all');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const hasActiveFilters =
    searchQuery || filterCycle !== 'all' || filterDepartment !== 'all' || filterStatus !== 'all';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Archived':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Dashboard stats
  const totalObjectives = okrs.length;
  const activeKRs = okrs.reduce((sum, okr) => sum + okr.keyResults.length, 0);
  const avgProgress = Math.round(okrs.reduce((sum, okr) => sum + okr.progress, 0) / okrs.length);
  const onTrack = okrs.filter(okr => okr.progress >= 50).length;

  return (
    <div className="space-y-4">
      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card style={{ borderRadius: '12px' }}>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Objectives</div>
            <div className="text-3xl mt-2" style={{ color: '#7A1C46' }}>
              {totalObjectives}
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Active Key Results</div>
            <div className="text-3xl mt-2" style={{ color: '#0052CC' }}>
              {activeKRs}
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Avg Progress</div>
            <div className="text-3xl mt-2" style={{ color: '#12B76A' }}>
              {avgProgress}%
            </div>
          </CardContent>
        </Card>

        <Card style={{ borderRadius: '12px' }}>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">On Track</div>
            <div className="text-3xl mt-2" style={{ color: '#F79009' }}>
              {Math.round((onTrack / totalObjectives) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl" style={{ fontFamily: 'Inter', fontWeight: 500 }}>
            🎯 OKR Configuration
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Define and manage Objectives and Key Results
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowImportDialog(true)}
            style={{ borderRadius: '12px', fontFamily: 'Inter' }}
          >
            <Download className="w-4 h-4 mr-2" />
            Import from Previous Cycle
          </Button>
          <Button
            onClick={handleAddNewOKR}
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
            New OKR Cycle
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
                  placeholder="Search objectives, owner, keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>

            {/* Cycle Filter */}
            <Select value={filterCycle} onValueChange={setFilterCycle}>
              <SelectTrigger className="w-[130px]" style={{ borderRadius: '12px' }}>
                <SelectValue placeholder="Cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cycles</SelectItem>
                <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                <SelectItem value="Q2 2025">Q2 2025</SelectItem>
                <SelectItem value="Q3 2025">Q3 2025</SelectItem>
                <SelectItem value="Q4 2025">Q4 2025</SelectItem>
              </SelectContent>
            </Select>

            {/* Department Filter */}
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[150px]" style={{ borderRadius: '12px' }}>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="SEO">SEO</SelectItem>
                <SelectItem value="Content">Content</SelectItem>
                <SelectItem value="Web">Web</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px]" style={{ borderRadius: '12px' }}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
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

      {/* OKR Table */}
      <Card style={{ borderRadius: '12px' }}>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-4 text-left w-12">
                    <Checkbox />
                  </th>
                  <th className="p-4 text-left w-12"></th>
                  <th className="p-4 text-left">Objective Title</th>
                  <th className="p-4 text-left">Owner / Team</th>
                  <th className="p-4 text-left">Cycle</th>
                  <th className="p-4 text-left">Progress</th>
                  <th className="p-4 text-left">Due Date</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOKRs.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 text-gray-300" />
                        <p>No OKRs found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOKRs.map((okr) => (
                    <React.Fragment key={okr.id}>
                      {/* Main OKR Row */}
                      <tr
                        className="border-b hover:bg-gray-50 transition-colors group"
                      >
                        <td className="p-4">
                          <Checkbox />
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleRowExpand(okr.id)}
                            className="text-gray-600 hover:text-[#0052CC] transition-colors"
                          >
                            {expandedRows.includes(okr.id) ? (
                              <ChevronDown className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </button>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="cursor-pointer hover:text-[#0052CC] transition-colors">
                              {okr.objectiveTitle}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {okr.keyResults.length} Key Results
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="text-sm">{okr.owner}</div>
                            {okr.team.length > 1 && (
                              <div className="text-xs text-gray-500">
                                +{okr.team.length - 1} more
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" style={{ borderRadius: '12px' }}>
                            {okr.cycle}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={okr.progress}
                                className="flex-1"
                                style={{ height: '8px' }}
                              />
                              <span className="text-sm font-medium">{okr.progress}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {new Date(okr.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(okr.status)} style={{ borderRadius: '12px' }}>
                            {okr.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditOKR(okr)}
                              style={{ borderRadius: '12px' }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              style={{ borderRadius: '12px' }}
                            >
                              <BarChart3 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingOKR(okr);
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

                      {/* Expanded Key Results */}
                      {expandedRows.includes(okr.id) && (
                        <tr className="bg-gray-50">
                          <td colSpan={9} className="p-0">
                            <div className="p-4 pl-20">
                              <h4 className="text-sm mb-3" style={{ color: '#7A1C46' }}>
                                Key Results
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead className="border-b">
                                    <tr className="text-xs text-gray-600">
                                      <th className="p-2 text-left">KR #</th>
                                      <th className="p-2 text-left">Key Result Title</th>
                                      <th className="p-2 text-left">Metric Type</th>
                                      <th className="p-2 text-left">Target</th>
                                      <th className="p-2 text-left">Current</th>
                                      <th className="p-2 text-left">Weight %</th>
                                      <th className="p-2 text-left">Assigned To</th>
                                      <th className="p-2 text-left">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {okr.keyResults.map((kr, index) => (
                                      <tr key={kr.id} className="border-b">
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{kr.title}</td>
                                        <td className="p-2">
                                          <Badge variant="outline" style={{ borderRadius: '12px', fontSize: '11px' }}>
                                            {kr.metricType}
                                          </Badge>
                                        </td>
                                        <td className="p-2">
                                          {kr.targetValue.toLocaleString()} {kr.unit}
                                        </td>
                                        <td className="p-2">
                                          {kr.currentValue.toLocaleString()} {kr.unit}
                                        </td>
                                        <td className="p-2">{kr.weight}%</td>
                                        <td className="p-2">{kr.assignedTo}</td>
                                        <td className="p-2">
                                          <Badge
                                            className={getStatusColor(kr.status)}
                                            style={{ borderRadius: '12px', fontSize: '11px' }}
                                          >
                                            {kr.status}
                                          </Badge>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Right Side Panel - Add/Edit OKR */}
      {showSidePanel && (
        <div className="fixed inset-0 z-50 flex items-start justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowSidePanel(false)} />
          <div
            className="relative bg-white h-full w-[480px] shadow-2xl overflow-y-auto animate-in slide-in-from-right"
            style={{ borderRadius: '0' }}
          >
            {/* Panel Header */}
            <div className="sticky top-0 bg-white border-b p-6 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                    {editingOKR ? '✏️ Edit OKR' : '➕ Create New OKR'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Define Objectives and Key Results aligned with campaign targets
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
              {/* Section A - Objective Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">SECTION A — Objective Details</h4>

                <div className="space-y-2">
                  <Label htmlFor="objectiveTitle">
                    Objective Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="objectiveTitle"
                    value={formData.objectiveTitle}
                    onChange={(e) => setFormData({ ...formData, objectiveTitle: e.target.value })}
                    placeholder="e.g., Increase Organic Traffic by 50%"
                    style={{ borderRadius: '12px' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectiveDescription">Objective Description</Label>
                  <Textarea
                    id="objectiveDescription"
                    value={formData.objectiveDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, objectiveDescription: e.target.value })
                    }
                    placeholder="Why this objective matters and expected outcome..."
                    rows={3}
                    style={{ borderRadius: '12px' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="cycle">
                      Cycle <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.cycle}
                      onValueChange={(value) => setFormData({ ...formData, cycle: value })}
                    >
                      <SelectTrigger style={{ borderRadius: '12px' }}>
                        <SelectValue placeholder="Select cycle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                        <SelectItem value="Q2 2025">Q2 2025</SelectItem>
                        <SelectItem value="Q3 2025">Q3 2025</SelectItem>
                        <SelectItem value="Q4 2025">Q4 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger style={{ borderRadius: '12px' }}>
                        <SelectValue placeholder="Select dept" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="SEO">SEO</SelectItem>
                        <SelectItem value="Content">Content</SelectItem>
                        <SelectItem value="Web">Web</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Tech">Tech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Content">Content</SelectItem>
                      <SelectItem value="SEO">SEO</SelectItem>
                      <SelectItem value="SMM">SMM</SelectItem>
                      <SelectItem value="Web">Web</SelectItem>
                      <SelectItem value="Competitor">Competitor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Select
                    value={formData.owner}
                    onValueChange={(value) => setFormData({ ...formData, owner: value })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                      <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                      <SelectItem value="Alex Martinez">Alex Martinez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight % (Default = 25%)</Label>
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[formData.weight]}
                      onValueChange={(value) => setFormData({ ...formData, weight: value[0] })}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm w-12 text-right">{formData.weight}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      style={{ borderRadius: '12px' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      style={{ borderRadius: '12px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Section B - Key Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[#7A1C46]">SECTION B — Key Results</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddKeyResult}
                    style={{ borderRadius: '12px' }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add KR
                  </Button>
                </div>

                {formData.keyResults.map((kr, index) => (
                  <Card key={index} style={{ borderRadius: '12px', backgroundColor: '#F9FAFB' }}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Key Result #{index + 1}</span>
                        {formData.keyResults.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveKeyResult(index)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>KR Title</Label>
                        <Input
                          value={kr.title}
                          onChange={(e) => {
                            const updated = [...formData.keyResults];
                            updated[index] = { ...updated[index], title: e.target.value };
                            setFormData({ ...formData, keyResults: updated });
                          }}
                          placeholder="e.g., Increase organic visitors to 100K/month"
                          style={{ borderRadius: '12px' }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Metric Type</Label>
                          <Select
                            value={kr.metricType}
                            onValueChange={(value) => {
                              const updated = [...formData.keyResults];
                              updated[index] = { ...updated[index], metricType: value };
                              setFormData({ ...formData, keyResults: updated });
                            }}
                          >
                            <SelectTrigger style={{ borderRadius: '12px' }}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {metricTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Unit</Label>
                          <Select
                            value={kr.unit}
                            onValueChange={(value) => {
                              const updated = [...formData.keyResults];
                              updated[index] = { ...updated[index], unit: value };
                              setFormData({ ...formData, keyResults: updated });
                            }}
                          >
                            <SelectTrigger style={{ borderRadius: '12px' }}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {units.map((unit) => (
                                <SelectItem key={unit} value={unit}>
                                  {unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Target Value</Label>
                          <Input
                            type="number"
                            value={kr.targetValue}
                            onChange={(e) => {
                              const updated = [...formData.keyResults];
                              updated[index] = {
                                ...updated[index],
                                targetValue: parseInt(e.target.value) || 0,
                              };
                              setFormData({ ...formData, keyResults: updated });
                            }}
                            style={{ borderRadius: '12px' }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Current Value</Label>
                          <Input
                            type="number"
                            value={kr.currentValue}
                            onChange={(e) => {
                              const updated = [...formData.keyResults];
                              updated[index] = {
                                ...updated[index],
                                currentValue: parseInt(e.target.value) || 0,
                              };
                              setFormData({ ...formData, keyResults: updated });
                            }}
                            style={{ borderRadius: '12px' }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Weight % (Total must = 100%)</Label>
                        <Input
                          type="number"
                          value={kr.weight}
                          onChange={(e) => {
                            const updated = [...formData.keyResults];
                            updated[index] = {
                              ...updated[index],
                              weight: parseInt(e.target.value) || 0,
                            };
                            setFormData({ ...formData, keyResults: updated });
                          }}
                          style={{ borderRadius: '12px' }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Assigned To</Label>
                        <Select
                          value={kr.assignedTo}
                          onValueChange={(value) => {
                            const updated = [...formData.keyResults];
                            updated[index] = { ...updated[index], assignedTo: value };
                            setFormData({ ...formData, keyResults: updated });
                          }}
                        >
                          <SelectTrigger style={{ borderRadius: '12px' }}>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="John Smith">John Smith</SelectItem>
                            <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                            <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                            <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                            <SelectItem value="Alex Martinez">Alex Martinez</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Frequency</Label>
                          <Select
                            value={kr.frequency}
                            onValueChange={(value) => {
                              const updated = [...formData.keyResults];
                              updated[index] = { ...updated[index], frequency: value };
                              setFormData({ ...formData, keyResults: updated });
                            }}
                          >
                            <SelectTrigger style={{ borderRadius: '12px' }}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Weekly">Weekly</SelectItem>
                              <SelectItem value="Monthly">Monthly</SelectItem>
                              <SelectItem value="Quarterly">Quarterly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select
                            value={kr.status}
                            onValueChange={(value: any) => {
                              const updated = [...formData.keyResults];
                              updated[index] = { ...updated[index], status: value };
                              setFormData({ ...formData, keyResults: updated });
                            }}
                          >
                            <SelectTrigger style={{ borderRadius: '12px' }}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Draft">Draft</SelectItem>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Section C - OKR Alignment */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">SECTION C — OKR Alignment</h4>

                <div className="space-y-2">
                  <Label>Parent Objective</Label>
                  <Select
                    value={formData.parentObjective}
                    onValueChange={(value) =>
                      setFormData({ ...formData, parentObjective: value })
                    }
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue placeholder="Select parent objective" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Top Level)</SelectItem>
                      {okrs.map((okr) => (
                        <SelectItem key={okr.id} value={okr.id}>
                          {okr.objectiveTitle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Linked Campaigns</Label>
                  <Input
                    placeholder="Search campaigns..."
                    style={{ borderRadius: '12px' }}
                  />
                  <div className="text-xs text-gray-500">
                    Selected: {formData.linkedCampaigns.length} campaigns
                  </div>
                </div>
              </div>

              {/* Section D - Validation & Governance */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#7A1C46]">
                  SECTION D — Validation & Governance
                </h4>

                <div className="space-y-2">
                  <Label>Reviewer</Label>
                  <Select
                    value={formData.reviewer}
                    onValueChange={(value) => setFormData({ ...formData, reviewer: value })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue placeholder="Select reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Smith">John Smith (Admin)</SelectItem>
                      <SelectItem value="Sarah Johnson">Sarah Johnson (Manager)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>QC Notes</Label>
                  <Textarea
                    value={formData.qcNotes}
                    onChange={(e) => setFormData({ ...formData, qcNotes: e.target.value })}
                    placeholder="Review notes and remarks..."
                    rows={3}
                    style={{ borderRadius: '12px' }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger style={{ borderRadius: '12px' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {editingOKR && (
                  <div className="p-3 bg-gray-50 rounded-lg" style={{ borderRadius: '12px' }}>
                    <div className="text-xs text-gray-600">Version Code</div>
                    <div className="text-sm mt-1">{editingOKR.versionCode}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Panel Footer */}
            <div className="sticky bottom-0 bg-white border-t p-6">
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveOKR}
                  style={{
                    backgroundColor: '#0052CC',
                    color: 'white',
                    borderRadius: '12px',
                    flex: 1,
                  }}
                >
                  ✅ Save & Activate
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

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent style={{ borderRadius: '12px' }}>
          <DialogHeader>
            <DialogTitle>Import from Previous Cycle</DialogTitle>
            <DialogDescription>
              Select a previous OKR cycle to copy objectives and key results
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Previous Cycle</Label>
              <Select>
                <SelectTrigger style={{ borderRadius: '12px' }}>
                  <SelectValue placeholder="Select cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q4-2024">Q4 2024</SelectItem>
                  <SelectItem value="q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="q2-2024">Q2 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Cycle</Label>
              <Select>
                <SelectTrigger style={{ borderRadius: '12px' }}>
                  <SelectValue placeholder="Select target cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                  <SelectItem value="Q2 2025">Q2 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: '#0052CC', color: 'white' }}>Import OKRs</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent style={{ borderRadius: '12px' }}>
          <DialogHeader>
            <DialogTitle>Delete OKR?</DialogTitle>
            <DialogDescription>
              This will permanently delete <strong>{editingOKR?.objectiveTitle}</strong> and all
              associated key results. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: '#D92D20', color: 'white' }}
              onClick={() => {
                if (editingOKR) {
                  setOkrs(okrs.filter((o) => o.id !== editingOKR.id));
                  toast.success('OKR deleted successfully');
                  setShowDeleteConfirm(false);
                }
              }}
            >
              Delete OKR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}