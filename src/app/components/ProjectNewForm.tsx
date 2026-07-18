import { useState } from 'react';
import { ArrowLeft, Rocket, Flag, Workflow, Paperclip } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

type Route = 'PM_Hub';

interface ProjectNewFormProps {
  onNavigate: (route: Route) => void;
  onClose: () => void;
}

const PROJECT_TYPES = [
  'Content Campaign',
  'SEO Campaign',
  'On-Page Campaign',
  'SMM Campaign',
  'New Service Campaign',
];

const ASSET_TYPES = [
  'Article',
  'Video',
  'Image',
  'Infographic',
  'eBook',
  'Guide',
  'Podcast',
  'Case Study',
  'Whitepaper',
];

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const WEEKS = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'];

const MILESTONE_TEMPLATES = {
  'Content Campaign': [
    { name: 'Ideation', order: 1, qc_required: false },
    { name: 'Draft', order: 2, qc_required: false },
    { name: 'QC', order: 3, qc_required: true },
    { name: 'Design', order: 4, qc_required: false },
    { name: 'Publish', order: 5, qc_required: true },
    { name: 'SEO Promotion', order: 6, qc_required: false },
  ],
  'SEO Campaign': [
    { name: 'Content Selection', order: 1, qc_required: false },
    { name: 'Link Submission', order: 2, qc_required: false },
    { name: 'Follow-up', order: 3, qc_required: false },
    { name: 'Verification', order: 4, qc_required: true },
    { name: 'Index Check', order: 5, qc_required: false },
    { name: 'Reporting', order: 6, qc_required: false },
  ],
  'On-Page Campaign': [
    { name: 'Audit & Discovery', order: 1, qc_required: false },
    { name: 'Assignment', order: 2, qc_required: false },
    { name: 'Implementation', order: 3, qc_required: false },
    { name: 'QC Review', order: 4, qc_required: true },
    { name: 'Verification', order: 5, qc_required: true },
    { name: 'Deployment', order: 6, qc_required: false },
  ],
  'SMM Campaign': [
    { name: 'Calendar Planning', order: 1, qc_required: false },
    { name: 'Content Creation', order: 2, qc_required: false },
    { name: 'Design & Graphics', order: 3, qc_required: false },
    { name: 'QC & Compliance', order: 4, qc_required: true },
    { name: 'Scheduling', order: 5, qc_required: false },
    { name: 'Posting & Reporting', order: 6, qc_required: false },
  ],
  'New Service Campaign': [
    { name: 'Service Definition', order: 1, qc_required: false },
    { name: 'Page Creation', order: 2, qc_required: false },
    { name: 'Content & Design', order: 3, qc_required: false },
    { name: 'Pre-Publish QC', order: 4, qc_required: true },
    { name: 'Publish', order: 5, qc_required: true },
    { name: 'SEO Promotion', order: 6, qc_required: false },
  ],
};

export default function ProjectNewForm({ onNavigate, onClose }: ProjectNewFormProps) {
  const [formData, setFormData] = useState({
    project_name: '',
    project_type: '',
    asset_type: '',
    service_id: '',
    industry_id: '',
    insight_category_id: '',
    keyword_ids: [] as string[],
    target_audience: '',
    storyline: '',
    description: '',
    seo_title: '',
    target_metrics_id: '',
    start_date: '',
    end_date: '',
    quarter: '',
    week: '',
    daily_quote_target: 0,
    remaining_quote: 0,
    created_by: 'USR001',
    status: 'Planning',
  });

  const [showMilestones, setShowMilestones] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.project_name || !formData.project_type || !formData.asset_type) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Project created successfully!');
    onClose();
  };

  const handleCreateMilestones = () => {
    if (!formData.project_type) {
      toast.error('Please select a project type first');
      return;
    }
    setShowMilestones(true);
    toast.success(`${MILESTONE_TEMPLATES[formData.project_type as keyof typeof MILESTONE_TEMPLATES].length} milestones generated`);
  };

  const currentMilestones = formData.project_type 
    ? MILESTONE_TEMPLATES[formData.project_type as keyof typeof MILESTONE_TEMPLATES] 
    : [];

  // Simulate fetching daily quote target based on asset type and week
  const fetchDailyQuote = () => {
    if (formData.asset_type && formData.week) {
      const mockQuotes: Record<string, number> = {
        'Article': 50,
        'Video': 10,
        'Image': 100,
        'Infographic': 20,
        'eBook': 5,
        'Guide': 15,
        'Podcast': 8,
      };
      const quote = mockQuotes[formData.asset_type] || 0;
      setFormData({ ...formData, daily_quote_target: quote, remaining_quote: quote });
      toast.success(`Daily quote target set to ${quote} for ${formData.asset_type}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => onNavigate('PM_Hub')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
        <h2 className="text-[#7A1C46]">Create New Project</h2>
      </div>

      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input
                    value={formData.project_name}
                    onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                    placeholder="e.g., Q4 Enterprise Content Campaign"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Type *</Label>
                  <Select 
                    value={formData.project_type} 
                    onValueChange={(value) => setFormData({ ...formData, project_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Asset Type *</Label>
                  <Select 
                    value={formData.asset_type} 
                    onValueChange={(value) => {
                      setFormData({ ...formData, asset_type: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSET_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Service</Label>
                  <Select 
                    value={formData.service_id} 
                    onValueChange={(value) => setFormData({ ...formData, service_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Optional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SRV001">SEO Services</SelectItem>
                      <SelectItem value="SRV002">Content Marketing</SelectItem>
                      <SelectItem value="SRV003">Social Media Marketing</SelectItem>
                      <SelectItem value="SRV005">E-commerce Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select 
                    value={formData.industry_id} 
                    onValueChange={(value) => setFormData({ ...formData, industry_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Optional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IND001">Technology</SelectItem>
                      <SelectItem value="IND002">SaaS</SelectItem>
                      <SelectItem value="IND004">Healthcare</SelectItem>
                      <SelectItem value="IND006">FinTech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Insight Category</Label>
                  <Select 
                    value={formData.insight_category_id} 
                    onValueChange={(value) => setFormData({ ...formData, insight_category_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Optional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IC001">How-to Guides</SelectItem>
                      <SelectItem value="IC002">Best Practices</SelectItem>
                      <SelectItem value="IC003">Case Studies</SelectItem>
                      <SelectItem value="IC004">Industry Trends</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Metrics</Label>
                  <Select 
                    value={formData.target_metrics_id} 
                    onValueChange={(value) => setFormData({ ...formData, target_metrics_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Optional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MET001">Page Visits</SelectItem>
                      <SelectItem value="MET002">CTR</SelectItem>
                      <SelectItem value="MET003">Conversions</SelectItem>
                      <SelectItem value="MET004">Leads Generated</SelectItem>
                      <SelectItem value="MET005">Engagement Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Textarea
                    value={formData.target_audience}
                    onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                    placeholder="Describe your target audience..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Storyline</Label>
                  <Textarea
                    value={formData.storyline}
                    onChange={(e) => setFormData({ ...formData, storyline: e.target.value })}
                    placeholder="Outline the project storyline..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a detailed description..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input
                    value={formData.seo_title}
                    onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                    placeholder="Optimized SEO title"
                  />
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quarter</Label>
                    <Select 
                      value={formData.quarter} 
                      onValueChange={(value) => setFormData({ ...formData, quarter: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select quarter" />
                      </SelectTrigger>
                      <SelectContent>
                        {QUARTERS.map((q) => (
                          <SelectItem key={q} value={q}>{q}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Week</Label>
                    <Select 
                      value={formData.week} 
                      onValueChange={(value) => {
                        setFormData({ ...formData, week: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select week" />
                      </SelectTrigger>
                      <SelectContent>
                        {WEEKS.map((w) => (
                          <SelectItem key={w} value={w}>{w}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Target Planning</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={fetchDailyQuote}
                      disabled={!formData.asset_type || !formData.week}
                    >
                      Fetch Daily Quote
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-500">Daily Quote Target</Label>
                      <Input
                        type="number"
                        value={formData.daily_quote_target}
                        readOnly
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">Auto-pulled from Target Planner</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-gray-500">Remaining Quote</Label>
                      <Input
                        type="number"
                        value={formData.remaining_quote}
                        readOnly
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">Updates dynamically</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Status *</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Milestones Preview */}
            {showMilestones && currentMilestones.length > 0 && (
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm">Project Milestones</h3>
                    <p className="text-xs text-gray-500">
                      These milestones will be created automatically
                    </p>
                  </div>
                  <Badge className="bg-[#7A1C46] text-white">
                    {currentMilestones.length} Stages
                  </Badge>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentMilestones.map((milestone, idx) => (
                    <Card key={idx} className="border-[#E2E8F0]">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm">{milestone.name}</div>
                            <div className="text-xs text-gray-500">Stage {milestone.order}</div>
                          </div>
                          {milestone.qc_required && (
                            <Badge variant="outline" className="text-xs">
                              QC
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription className="text-blue-800 text-sm">
                After creating the project, you can add tasks to milestones, attach assets, and configure SEO promotion workflows.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              <Button type="submit" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                Save Project
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={handleCreateMilestones}
              >
                <Flag className="w-4 h-4 mr-2" />
                Create Milestones
              </Button>
              <Button type="button" variant="outline">
                <Workflow className="w-4 h-4 mr-2" />
                Open Task Flow
              </Button>
              <Button type="button" variant="outline">
                <Paperclip className="w-4 h-4 mr-2" />
                Attach Assets
              </Button>
              <Button type="button" variant="outline">
                <Rocket className="w-4 h-4 mr-2" />
                Open SEO Module
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
