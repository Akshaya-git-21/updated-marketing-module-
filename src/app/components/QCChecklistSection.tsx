import { useState } from 'react';
import { Save, History, AlertTriangle, CheckCircle, XCircle, Clock, TrendingUp, Book, ArrowRight, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner@2.0.3';

interface QCChecklistItem {
  QC_Task_ID: string;
  Task_ID: string;
  Template_ID: string;
  Asset_Type: string;
  Checklist_Item: string;
  Description: string;
  Gold_Standard_Reference: string;
  Max_Score: number;
  Pass_Threshold: number;
  Score: number;
  Weight: number;
  Weighted_Score: number;
  QC_Comment: string;
  QC_Reference_Link: string | null;
  QC_Reference_Title: string | null;
  QC_Checked_By: string | null;
  QC_Checked_By_Name: string | null;
  QC_Checked_On: string | null;
  QC_Result: string;
  Auto_Move_Next: boolean;
  Auto_Move_Next_Triggered: boolean;
}

interface GoldStandard {
  Standard_ID: string;
  Asset_Type: string;
  Checklist_Item: string;
  Benchmark: string;
  Measurement_Method: string;
  Example_Reference_URL: string;
}

interface QCChecklistSectionProps {
  taskId: string;
  assetType: string;
}

export default function QCChecklistSection({ taskId, assetType }: QCChecklistSectionProps) {
  const [checklistItems, setChecklistItems] = useState<QCChecklistItem[]>(getChecklistItems(taskId, assetType));
  const [showGoldStandard, setShowGoldStandard] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  function getChecklistItems(taskId: string, assetType: string): QCChecklistItem[] {
    // Mock data - in real app, this would be fetched from API based on Asset_Type
    const contentChecklist: QCChecklistItem[] = [
      {
        QC_Task_ID: 'QCTSK001',
        Task_ID: taskId,
        Template_ID: 'TMPL001',
        Asset_Type: 'Content',
        Checklist_Item: 'Grammar & Spelling',
        Description: 'Check for grammatical errors, spelling mistakes, and punctuation',
        Gold_Standard_Reference: 'Zero grammatical errors, 100% spell-check accuracy',
        Max_Score: 10,
        Pass_Threshold: 8,
        Score: 10,
        Weight: 1.0,
        Weighted_Score: 10,
        QC_Comment: 'Perfect grammar, no errors detected',
        QC_Reference_Link: null,
        QC_Reference_Title: null,
        QC_Checked_By: 'USR001',
        QC_Checked_By_Name: 'Alice Johnson',
        QC_Checked_On: '2024-11-12 10:30:00',
        QC_Result: 'Pass',
        Auto_Move_Next: true,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK002',
        Task_ID: taskId,
        Template_ID: 'TMPL002',
        Asset_Type: 'Content',
        Checklist_Item: 'Brand Tone & Voice',
        Description: 'Ensure content aligns with brand guidelines and maintains consistent voice',
        Gold_Standard_Reference: 'Matches brand voice guide 100%, appropriate formality level',
        Max_Score: 10,
        Pass_Threshold: 8,
        Score: 9,
        Weight: 1.5,
        Weighted_Score: 13.5,
        QC_Comment: 'Excellent brand alignment with strong voice consistency',
        QC_Reference_Link: 'CNT001',
        QC_Reference_Title: 'Brand Voice Guidelines 2024',
        QC_Checked_By: 'USR001',
        QC_Checked_By_Name: 'Alice Johnson',
        QC_Checked_On: '2024-11-12 10:35:00',
        QC_Result: 'Pass',
        Auto_Move_Next: true,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK003',
        Task_ID: taskId,
        Template_ID: 'TMPL003',
        Asset_Type: 'Content',
        Checklist_Item: 'Fact-Checking & Accuracy',
        Description: 'Verify all statistics, claims, citations, and data points',
        Gold_Standard_Reference: 'All facts verified from primary sources, citations included',
        Max_Score: 10,
        Pass_Threshold: 8,
        Score: 6,
        Weight: 2.0,
        Weighted_Score: 12,
        QC_Comment: 'Need to update 2023 statistics to 2024, verify claim in paragraph 3 about market share',
        QC_Reference_Link: null,
        QC_Reference_Title: null,
        QC_Checked_By: 'USR002',
        QC_Checked_By_Name: 'Bob Wilson',
        QC_Checked_On: '2024-11-12 11:15:00',
        QC_Result: 'Rework',
        Auto_Move_Next: false,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK004',
        Task_ID: taskId,
        Template_ID: 'TMPL004',
        Asset_Type: 'Content',
        Checklist_Item: 'Readability Score',
        Description: 'Flesch-Kincaid readability score and sentence complexity',
        Gold_Standard_Reference: 'Target: 60-70 (Standard), avg sentence 15-20 words',
        Max_Score: 10,
        Pass_Threshold: 7,
        Score: 8,
        Weight: 1.0,
        Weighted_Score: 8,
        QC_Comment: 'Score: 68 - Good readability, well-structured paragraphs',
        QC_Reference_Link: null,
        QC_Reference_Title: null,
        QC_Checked_By: 'USR001',
        QC_Checked_By_Name: 'Alice Johnson',
        QC_Checked_On: '2024-11-12 10:40:00',
        QC_Result: 'Pass',
        Auto_Move_Next: true,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK005',
        Task_ID: taskId,
        Template_ID: 'TMPL005',
        Asset_Type: 'Content',
        Checklist_Item: 'Originality & Plagiarism',
        Description: 'Run through plagiarism detector, check for duplicate content',
        Gold_Standard_Reference: 'Similarity < 5%, all quotes properly attributed',
        Max_Score: 10,
        Pass_Threshold: 9,
        Score: 10,
        Weight: 2.0,
        Weighted_Score: 20,
        QC_Comment: 'Similarity: 2% - All clear, 100% original content',
        QC_Reference_Link: null,
        QC_Reference_Title: null,
        QC_Checked_By: 'USR001',
        QC_Checked_By_Name: 'Alice Johnson',
        QC_Checked_On: '2024-11-12 10:45:00',
        QC_Result: 'Pass',
        Auto_Move_Next: true,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK006',
        Task_ID: taskId,
        Template_ID: 'TMPL006',
        Asset_Type: 'Content',
        Checklist_Item: 'Content Structure',
        Description: 'Logical flow, proper headings (H1-H6), paragraph length',
        Gold_Standard_Reference: '1 H1, 3-5 H2s, proper hierarchy, para < 150 words',
        Max_Score: 10,
        Pass_Threshold: 8,
        Score: 9,
        Weight: 1.0,
        Weighted_Score: 9,
        QC_Comment: 'Excellent structure with clear hierarchy and balanced sections',
        QC_Reference_Link: null,
        QC_Reference_Title: null,
        QC_Checked_By: 'USR002',
        QC_Checked_By_Name: 'Bob Wilson',
        QC_Checked_On: '2024-11-12 11:00:00',
        QC_Result: 'Pass',
        Auto_Move_Next: true,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK007',
        Task_ID: taskId,
        Template_ID: 'TMPL007',
        Asset_Type: 'SEO',
        Checklist_Item: 'Target Keywords Integration',
        Description: 'Primary and secondary keywords naturally integrated',
        Gold_Standard_Reference: 'Primary keyword: 3-5 times, LSI keywords: 2-3 times each',
        Max_Score: 10,
        Pass_Threshold: 8,
        Score: 9,
        Weight: 2.0,
        Weighted_Score: 18,
        QC_Comment: 'Natural keyword integration, excellent semantic relevance',
        QC_Reference_Link: 'KW001',
        QC_Reference_Title: 'Keyword Strategy Doc',
        QC_Checked_By: 'USR002',
        QC_Checked_By_Name: 'Bob Wilson',
        QC_Checked_On: '2024-11-12 11:10:00',
        QC_Result: 'Pass',
        Auto_Move_Next: true,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK008',
        Task_ID: taskId,
        Template_ID: 'TMPL008',
        Asset_Type: 'SEO',
        Checklist_Item: 'Meta Title & Description',
        Description: 'Optimized meta tags with proper character limits',
        Gold_Standard_Reference: 'Title: 50-60 chars with keyword, Description: 150-160 chars',
        Max_Score: 10,
        Pass_Threshold: 8,
        Score: 4,
        Weight: 1.5,
        Weighted_Score: 6,
        QC_Comment: 'Meta description is 185 characters - exceeds limit, needs shortening',
        QC_Reference_Link: null,
        QC_Reference_Title: null,
        QC_Checked_By: 'USR002',
        QC_Checked_By_Name: 'Bob Wilson',
        QC_Checked_On: '2024-11-12 11:20:00',
        QC_Result: 'Fail',
        Auto_Move_Next: false,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK009',
        Task_ID: taskId,
        Template_ID: 'TMPL009',
        Asset_Type: 'SEO',
        Checklist_Item: 'Internal Linking',
        Description: 'Relevant internal links with descriptive anchor text',
        Gold_Standard_Reference: '3-5 contextual internal links, varied anchor text',
        Max_Score: 10,
        Pass_Threshold: 7,
        Score: 6,
        Weight: 1.0,
        Weighted_Score: 6,
        QC_Comment: 'Only 2 internal links found, need to add 2-3 more relevant links',
        QC_Reference_Link: null,
        QC_Reference_Title: null,
        QC_Checked_By: 'USR002',
        QC_Checked_By_Name: 'Bob Wilson',
        QC_Checked_On: '2024-11-12 11:25:00',
        QC_Result: 'Rework',
        Auto_Move_Next: false,
        Auto_Move_Next_Triggered: false,
      },
      {
        QC_Task_ID: 'QCTSK010',
        Task_ID: taskId,
        Template_ID: 'TMPL010',
        Asset_Type: 'SEO',
        Checklist_Item: 'Image Alt Tags & Optimization',
        Description: 'All images have descriptive alt tags and are optimized',
        Gold_Standard_Reference: 'All images < 200KB, alt text includes keywords naturally',
        Max_Score: 10,
        Pass_Threshold: 8,
        Score: 0,
        Weight: 1.0,
        Weighted_Score: 0,
        QC_Comment: '',
        QC_Reference_Link: null,
        QC_Reference_Title: null,
        QC_Checked_By: null,
        QC_Checked_By_Name: null,
        QC_Checked_On: null,
        QC_Result: 'Pending',
        Auto_Move_Next: false,
        Auto_Move_Next_Triggered: false,
      },
    ];

    return contentChecklist;
  }

  const goldStandardsData: GoldStandard[] = [
    {
      Standard_ID: 'STD001',
      Asset_Type: 'Content',
      Checklist_Item: 'Grammar & Spelling',
      Benchmark: 'Zero grammatical errors, 100% spell-check accuracy',
      Measurement_Method: 'Automated (Grammarly Premium) + Manual review',
      Example_Reference_URL: '/docs/grammar-standards',
    },
    {
      Standard_ID: 'STD002',
      Asset_Type: 'Content',
      Checklist_Item: 'Brand Tone & Voice',
      Benchmark: 'Matches brand voice guide 100%, appropriate formality level',
      Measurement_Method: 'Manual review against brand guidelines',
      Example_Reference_URL: '/docs/brand-voice-guide',
    },
    {
      Standard_ID: 'STD003',
      Asset_Type: 'Content',
      Checklist_Item: 'Fact-Checking & Accuracy',
      Benchmark: 'All facts verified from primary sources, citations included',
      Measurement_Method: 'Manual verification with source documentation',
      Example_Reference_URL: '/docs/fact-checking-protocol',
    },
    {
      Standard_ID: 'STD007',
      Asset_Type: 'SEO',
      Checklist_Item: 'Target Keywords Integration',
      Benchmark: 'Primary keyword: 3-5 times, LSI keywords: 2-3 times each, density 1-2%',
      Measurement_Method: 'Automated (SEO tools) + Manual context check',
      Example_Reference_URL: '/docs/keyword-integration-best-practices',
    },
    {
      Standard_ID: 'STD008',
      Asset_Type: 'SEO',
      Checklist_Item: 'Meta Title & Description',
      Benchmark: 'Title: 50-60 chars with primary keyword, Description: 150-160 chars with CTA',
      Measurement_Method: 'Automated character count + Manual relevance check',
      Example_Reference_URL: '/docs/meta-tag-optimization',
    },
  ];

  const updateScore = (itemId: string, newScore: number) => {
    setChecklistItems(items =>
      items.map(item => {
        if (item.QC_Task_ID === itemId) {
          const weightedScore = newScore * item.Weight;
          let qcResult = 'Pending';
          
          if (newScore >= item.Pass_Threshold) {
            qcResult = 'Pass';
          } else if (newScore >= item.Pass_Threshold - 2 && newScore < item.Pass_Threshold) {
            qcResult = 'Rework';
          } else {
            qcResult = 'Fail';
          }

          return {
            ...item,
            Score: newScore,
            Weighted_Score: weightedScore,
            QC_Result: qcResult,
            QC_Checked_By: 'USR001',
            QC_Checked_By_Name: 'Alice Johnson',
            QC_Checked_On: new Date().toISOString(),
          };
        }
        return item;
      })
    );
  };

  const updateComment = (itemId: string, comment: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.QC_Task_ID === itemId
          ? { ...item, QC_Comment: comment }
          : item
      )
    );
  };

  const handleSaveAll = () => {
    // Check if overall score meets threshold
    const canAutoMove = calculateOverallScore() >= calculateOverallThreshold();
    if (canAutoMove) {
      toast.success('QC scores saved! Overall score meets threshold - ready to auto-move to next milestone.');
    } else {
      toast.success('QC scores saved successfully');
    }
  };

  const handleAutoMove = () => {
    toast.success('Task approved! Moving to next milestone...');
  };

  const handleViewGoldStandard = (itemId: string) => {
    setSelectedItem(itemId);
    setShowGoldStandard(true);
  };

  // Calculate metrics
  const totalItems = checklistItems.length;
  const scoredItems = checklistItems.filter(i => i.Score > 0).length;
  
  const calculateAverageScore = () => {
    const scored = checklistItems.filter(i => i.Score > 0);
    if (scored.length === 0) return 0;
    return Math.round((scored.reduce((sum, i) => sum + i.Score, 0) / scored.length) * 10) / 10;
  };

  const calculateOverallThreshold = () => {
    if (checklistItems.length === 0) return 0;
    const totalPossible = checklistItems.reduce((sum, i) => sum + (i.Pass_Threshold * i.Weight), 0);
    const totalMaxWeighted = checklistItems.reduce((sum, i) => sum + (i.Max_Score * i.Weight), 0);
    return Math.round((totalPossible / totalMaxWeighted) * 100);
  };

  const calculateOverallScore = () => {
    const totalWeightedScore = checklistItems.reduce((sum, i) => sum + i.Weighted_Score, 0);
    const totalMaxWeighted = checklistItems.reduce((sum, i) => sum + (i.Max_Score * i.Weight), 0);
    if (totalMaxWeighted === 0) return 0;
    return Math.round((totalWeightedScore / totalMaxWeighted) * 100);
  };

  const getOverallResult = () => {
    const score = calculateOverallScore();
    const threshold = calculateOverallThreshold();
    if (score >= threshold) return 'Pass';
    if (score >= threshold - 10) return 'Rework';
    return 'Fail';
  };

  const avgScore = calculateAverageScore();
  const overallThreshold = calculateOverallThreshold();
  const overallScore = calculateOverallScore();
  const overallResult = getOverallResult();

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Pass': return 'bg-green-100 text-green-800';
      case 'Fail': return 'bg-red-100 text-red-800';
      case 'Rework': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number, threshold: number) => {
    if (score >= threshold) return 'text-green-600';
    if (score >= threshold - 2) return 'text-orange-600';
    return 'text-red-600';
  };

  // Group by asset type
  const groupedItems = checklistItems.reduce((acc, item) => {
    if (!acc[item.Asset_Type]) {
      acc[item.Asset_Type] = [];
    }
    acc[item.Asset_Type].push(item);
    return acc;
  }, {} as Record<string, QCChecklistItem[]>);

  const selectedGoldStandard = selectedItem 
    ? goldStandardsData.find(gs => 
        gs.Checklist_Item === checklistItems.find(i => i.QC_Task_ID === selectedItem)?.Checklist_Item
      )
    : null;

  return (
    <div className="space-y-4">
      {/* Metrics Bar */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl text-[#7A1C46]">{scoredItems}/{totalItems}</div>
              <div className="text-xs text-gray-600">Items Scored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-blue-600">{avgScore}</div>
              <div className="text-xs text-gray-600">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-gray-600">{overallThreshold}%</div>
              <div className="text-xs text-gray-600">Pass Threshold</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl ${overallScore >= overallThreshold ? 'text-green-600' : 'text-orange-600'}`}>
                {overallScore}%
              </div>
              <div className="text-xs text-gray-600">Overall Weighted Score</div>
            </div>
            <div className="text-center">
              <Badge className={getResultColor(overallResult)}>
                {overallResult}
              </Badge>
              <div className="text-xs text-gray-600 mt-1">QC Result</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QC Scoring Panel */}
      <Card className="border-[#E2E8F0]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#7A1C46]">🎯 QC Evaluation & Scoring</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowGoldStandard(true)}>
                <Book className="w-4 h-4 mr-2" />
                View Gold Standards
              </Button>
              <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]" onClick={handleSaveAll}>
                <Save className="w-4 h-4 mr-2" />
                Save Scores
              </Button>
              {overallScore >= overallThreshold && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleAutoMove}>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Approve & Auto-Move
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-2">
            {Object.entries(groupedItems).map(([assetType, items]) => {
              const typeWeightedScore = items.reduce((sum, i) => sum + i.Weighted_Score, 0);
              const typeMaxWeighted = items.reduce((sum, i) => sum + (i.Max_Score * i.Weight), 0);
              const typeProgress = typeMaxWeighted > 0 ? (typeWeightedScore / typeMaxWeighted) * 100 : 0;

              return (
                <AccordionItem key={assetType} value={assetType} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{assetType} QC</span>
                        <Badge variant="outline" className="text-xs">
                          {items.filter(i => i.Score > 0).length}/{items.length}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32">
                          <Progress value={typeProgress} className="h-2" />
                        </div>
                        <span className="text-xs text-gray-600">{Math.round(typeProgress)}%</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {items.map((item) => (
                        <Card key={item.QC_Task_ID} className="border-[#E2E8F0]">
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              {/* Header */}
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{item.Checklist_Item}</span>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Badge variant="outline" className="text-xs cursor-help">
                                            ℹ️
                                          </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs">
                                          <p className="text-xs">{item.Description}</p>
                                          <p className="text-xs mt-2 text-[#7A1C46]">
                                            <strong>Gold Standard:</strong> {item.Gold_Standard_Reference}
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">{item.Description}</div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  <Badge className={getResultColor(item.QC_Result)}>
                                    {item.QC_Result}
                                  </Badge>
                                  <div className="text-xs text-gray-500">
                                    Weight: {item.Weight}x
                                  </div>
                                </div>
                              </div>

                              {/* Score Slider */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-xs">Score (0-{item.Max_Score})</Label>
                                  <div className="flex items-center gap-3">
                                    <span className={`text-sm font-medium ${getScoreColor(item.Score, item.Pass_Threshold)}`}>
                                      {item.Score}/{item.Max_Score}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      Threshold: {item.Pass_Threshold}
                                    </Badge>
                                  </div>
                                </div>
                                <Slider
                                  value={[item.Score]}
                                  onValueChange={(value) => updateScore(item.QC_Task_ID, value[0])}
                                  max={item.Max_Score}
                                  step={1}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>0</span>
                                  <span className="text-orange-600">Pass: {item.Pass_Threshold}</span>
                                  <span>{item.Max_Score}</span>
                                </div>
                              </div>

                              {/* Weighted Score Display */}
                              <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <Label className="text-xs">Weighted Score</Label>
                                  <span className="text-sm font-medium text-[#7A1C46]">
                                    {item.Weighted_Score.toFixed(1)}/{(item.Max_Score * item.Weight).toFixed(1)}
                                  </span>
                                </div>
                                <Progress 
                                  value={(item.Weighted_Score / (item.Max_Score * item.Weight)) * 100} 
                                  className="h-2"
                                />
                              </div>

                              {/* QC Comment */}
                              <div className="space-y-2">
                                <Label className="text-xs">QC Comment</Label>
                                <Textarea
                                  value={item.QC_Comment}
                                  onChange={(e) => updateComment(item.QC_Task_ID, e.target.value)}
                                  placeholder="Add reviewer notes, improvement suggestions..."
                                  rows={2}
                                  className="text-xs"
                                />
                              </div>

                              {/* Reference Link */}
                              {item.QC_Reference_Title && (
                                <div className="flex items-center gap-2 text-xs text-blue-600">
                                  <Book className="w-3 h-3" />
                                  <span>Reference: {item.QC_Reference_Title}</span>
                                </div>
                              )}

                              {/* Actions & Metadata */}
                              <div className="flex items-center justify-between text-xs border-t pt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewGoldStandard(item.QC_Task_ID)}
                                >
                                  <Book className="w-3 h-3 mr-1" />
                                  View Gold Standard
                                </Button>
                                {item.QC_Checked_By_Name && (
                                  <div className="text-gray-500">
                                    Checked by {item.QC_Checked_By_Name} • {item.QC_Checked_On}
                                  </div>
                                )}
                              </div>

                              {/* Auto-move indicator */}
                              {item.Auto_Move_Next && item.Score >= item.Pass_Threshold && (
                                <Alert className="border-green-200 bg-green-50">
                                  <AlertDescription className="text-green-800 text-xs flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Score meets threshold - eligible for auto-move to next milestone
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <Alert className="border-blue-200 bg-blue-50 mt-4">
            <AlertDescription className="text-blue-800 text-sm">
              <strong>Scoring Guide:</strong> Each item scored 0-10. Weighted scores calculate overall performance. 
              When Overall Weighted Score ≥ Pass Threshold, task auto-moves to next milestone.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Gold Standard Dialog */}
      <Dialog open={showGoldStandard} onOpenChange={setShowGoldStandard}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📘 QC Gold Standards</DialogTitle>
            <DialogDescription>
              Benchmark standards and measurement methods for quality assessment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {goldStandardsData.map((standard) => (
              <Card key={standard.Standard_ID} className="border-[#E2E8F0]">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#7A1C46]" />
                    {standard.Checklist_Item}
                    <Badge variant="outline" className="text-xs ml-auto">
                      {standard.Asset_Type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-600">Benchmark</Label>
                    <p className="text-sm mt-1">{standard.Benchmark}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Measurement Method</Label>
                    <p className="text-sm mt-1">{standard.Measurement_Method}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Reference Documentation</Label>
                    <a 
                      href={standard.Example_Reference_URL} 
                      className="text-sm text-blue-600 hover:underline mt-1 flex items-center gap-1"
                    >
                      <Book className="w-3 h-3" />
                      {standard.Example_Reference_URL}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
