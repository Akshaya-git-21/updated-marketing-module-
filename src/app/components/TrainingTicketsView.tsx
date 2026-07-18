import { useState } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, Clock, TrendingUp, Eye, X } from 'lucide-react';
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
import { toast } from 'sonner@2.0.3';

interface TrainingTicket {
  Ticket_ID: string;
  User_ID: string;
  User_Name: string;
  QC_Category: string;
  Total_Fails: number;
  Escalation_Level: string;
  Ticket_Status: string;
  Assigned_Trainer: string | null;
  Assigned_Trainer_Name: string | null;
  Remarks: string;
  Created_On: string;
  Closed_On: string | null;
  Training_Plan: string;
  Progress: number;
}

export default function TrainingTicketsView() {
  const [filters, setFilters] = useState({
    qc_category: 'all',
    ticket_status: 'all',
    escalation_level: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  const trainingTicketsData: TrainingTicket[] = [
    {
      Ticket_ID: 'TRN001',
      User_ID: 'USR003',
      User_Name: 'Carol Smith',
      QC_Category: 'SEO',
      Total_Fails: 5,
      Escalation_Level: 'L2',
      Ticket_Status: 'In Training',
      Assigned_Trainer: 'USR002',
      Assigned_Trainer_Name: 'Bob Wilson',
      Remarks: 'Recurring issues with meta descriptions - length and keyword placement',
      Created_On: '2024-10-28',
      Closed_On: null,
      Training_Plan: 'SEO Meta Tag Optimization Workshop',
      Progress: 60,
    },
    {
      Ticket_ID: 'TRN002',
      User_ID: 'USR004',
      User_Name: 'David Lee',
      QC_Category: 'Content',
      Total_Fails: 3,
      Escalation_Level: 'L1',
      Ticket_Status: 'Open',
      Assigned_Trainer: 'USR001',
      Assigned_Trainer_Name: 'Alice Johnson',
      Remarks: 'Fact-checking issues - needs training on source verification',
      Created_On: '2024-11-05',
      Closed_On: null,
      Training_Plan: 'Content Verification & Fact-Checking Best Practices',
      Progress: 20,
    },
    {
      Ticket_ID: 'TRN003',
      User_ID: 'USR005',
      User_Name: 'Emma Davis',
      QC_Category: 'Design',
      Total_Fails: 8,
      Escalation_Level: 'L3',
      Ticket_Status: 'In Training',
      Assigned_Trainer: 'USR003',
      Assigned_Trainer_Name: 'Carol Smith',
      Remarks: 'Critical design issues - visual hierarchy and mobile responsiveness',
      Created_On: '2024-10-15',
      Closed_On: null,
      Training_Plan: 'Advanced Design Principles & Responsive Design Certification',
      Progress: 85,
    },
    {
      Ticket_ID: 'TRN004',
      User_ID: 'USR006',
      User_Name: 'Frank Martinez',
      QC_Category: 'SEO',
      Total_Fails: 4,
      Escalation_Level: 'L1',
      Ticket_Status: 'Closed',
      Assigned_Trainer: 'USR002',
      Assigned_Trainer_Name: 'Bob Wilson',
      Remarks: 'Internal linking structure - resolved after training',
      Created_On: '2024-10-20',
      Closed_On: '2024-11-08',
      Training_Plan: 'SEO Internal Linking Strategy',
      Progress: 100,
    },
    {
      Ticket_ID: 'TRN005',
      User_ID: 'USR007',
      User_Name: 'Grace Kim',
      QC_Category: 'Content',
      Total_Fails: 3,
      Escalation_Level: 'L1',
      Ticket_Status: 'In Training',
      Assigned_Trainer: 'USR001',
      Assigned_Trainer_Name: 'Alice Johnson',
      Remarks: 'Brand tone consistency - improving but needs more practice',
      Created_On: '2024-11-01',
      Closed_On: null,
      Training_Plan: 'Brand Voice & Tone Guidelines Workshop',
      Progress: 45,
    },
    {
      Ticket_ID: 'TRN006',
      User_ID: 'USR008',
      User_Name: 'Henry Brown',
      QC_Category: 'Technical',
      Total_Fails: 6,
      Escalation_Level: 'L2',
      Ticket_Status: 'Open',
      Assigned_Trainer: null,
      Assigned_Trainer_Name: null,
      Remarks: 'Page load time optimization - needs technical training',
      Created_On: '2024-11-10',
      Closed_On: null,
      Training_Plan: 'Technical SEO & Performance Optimization',
      Progress: 0,
    },
  ];

  const filteredTickets = trainingTicketsData.filter((ticket) => {
    if (filters.qc_category !== 'all' && ticket.QC_Category !== filters.qc_category) return false;
    if (filters.ticket_status !== 'all' && ticket.Ticket_Status !== filters.ticket_status) return false;
    if (filters.escalation_level !== 'all' && ticket.Escalation_Level !== filters.escalation_level) return false;
    if (searchTerm && !ticket.User_Name.toLowerCase().includes(searchTerm.toLowerCase()) && !ticket.QC_Category.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const selectedTicketData = trainingTicketsData.find(t => t.Ticket_ID === selectedTicket);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-yellow-100 text-yellow-800';
      case 'In Training': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEscalationColor = (level: string) => {
    switch (level) {
      case 'L1': return 'bg-yellow-100 text-yellow-800';
      case 'L2': return 'bg-orange-100 text-orange-800';
      case 'L3': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCloseTicket = (ticketId: string) => {
    toast.success('Training ticket closed successfully');
  };

  const handleOpenTrainingPlan = (ticketId: string) => {
    toast.success('Training plan opened');
  };

  // Calculate metrics
  const totalOpen = trainingTicketsData.filter(t => t.Ticket_Status === 'Open').length;
  const totalInTraining = trainingTicketsData.filter(t => t.Ticket_Status === 'In Training').length;
  const totalClosed = trainingTicketsData.filter(t => t.Ticket_Status === 'Closed').length;
  const avgProgress = trainingTicketsData.filter(t => t.Ticket_Status !== 'Closed').length > 0
    ? Math.round(
        trainingTicketsData
          .filter(t => t.Ticket_Status !== 'Closed')
          .reduce((sum, t) => sum + t.Progress, 0) /
          trainingTicketsData.filter(t => t.Ticket_Status !== 'Closed').length
      )
    : 0;

  return (
    <div className="space-y-6">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">🎓 QC Training Escalations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div className="text-2xl text-yellow-600">{totalOpen}</div>
                </div>
                <div className="text-xs text-gray-600">Open Tickets</div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div className="text-2xl text-blue-600">{totalInTraining}</div>
                </div>
                <div className="text-xs text-gray-600">In Training</div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="text-2xl text-green-600">{totalClosed}</div>
                </div>
                <div className="text-xs text-gray-600">Closed</div>
              </CardContent>
            </Card>

            <Card className="border-[#E2E8F0]">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-[#7A1C46]" />
                  <div className="text-2xl text-[#7A1C46]">{avgProgress}%</div>
                </div>
                <div className="text-xs text-gray-600">Avg Progress</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={filters.qc_category} onValueChange={(value) => setFilters({ ...filters, qc_category: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Content">Content</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                  <SelectItem value="SMM">SMM</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.ticket_status} onValueChange={(value) => setFilters({ ...filters, ticket_status: value })}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Training">In Training</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.escalation_level} onValueChange={(value) => setFilters({ ...filters, escalation_level: value })}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="L1">Level 1</SelectItem>
                  <SelectItem value="L2">Level 2</SelectItem>
                  <SelectItem value="L3">Level 3</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Search by user or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 min-w-[200px]"
              />
            </div>
          </div>

          {/* Training Tickets Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>QC Category</TableHead>
                    <TableHead>Total Fails</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trainer</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.Ticket_ID}>
                      <TableCell>
                        <Badge variant="outline" className="text-xs font-mono">
                          {ticket.Ticket_ID}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {ticket.User_Name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {ticket.QC_Category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800">
                          {ticket.Total_Fails} fails
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEscalationColor(ticket.Escalation_Level)}>
                          {ticket.Escalation_Level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(ticket.Ticket_Status)}>
                          {ticket.Ticket_Status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {ticket.Assigned_Trainer_Name || (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#7A1C46] h-2 rounded-full"
                              style={{ width: `${ticket.Progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{ticket.Progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {ticket.Created_On}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTicket(ticket.Ticket_ID);
                              setShowTicketDialog(true);
                            }}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenTrainingPlan(ticket.Ticket_ID)}
                          >
                            <BookOpen className="w-3 h-3" />
                          </Button>
                          {ticket.Ticket_Status !== 'Closed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCloseTicket(ticket.Ticket_ID)}
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <Alert className="border-orange-200 bg-orange-50">
            <AlertDescription className="text-orange-800 text-sm">
              <strong>Escalation Levels:</strong> L1 (3 fails) → Basic Training, L2 (5+ fails) → Advanced Training, L3 (8+ fails) → Intensive Coaching + Performance Review
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Training Ticket Detail Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Training Ticket Details</DialogTitle>
            <DialogDescription>
              {selectedTicketData ? `${selectedTicketData.Ticket_ID} - ${selectedTicketData.User_Name}` : 'Training Ticket'}
            </DialogDescription>
          </DialogHeader>
          {selectedTicketData && (
            <TrainingTicketDetail ticket={selectedTicketData} onClose={() => setShowTicketDialog(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TrainingTicketDetail({ ticket, onClose }: { ticket: TrainingTicket; onClose: () => void }) {
  const handleAssignTrainer = () => {
    toast.success('Trainer assigned successfully');
  };

  const handleUpdateProgress = () => {
    toast.success('Progress updated');
  };

  const handleCloseTicket = () => {
    toast.success('Training ticket closed');
    onClose();
  };

  const getEscalationColor = (level: string) => {
    switch (level) {
      case 'L1': return 'bg-yellow-100 text-yellow-800';
      case 'L2': return 'bg-orange-100 text-orange-800';
      case 'L3': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Ticket ID</Label>
          <Input value={ticket.Ticket_ID} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>User</Label>
          <Input value={ticket.User_Name} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>QC Category</Label>
          <Badge variant="outline" className="text-sm p-2 w-full justify-center">
            {ticket.QC_Category}
          </Badge>
        </div>

        <div className="space-y-2">
          <Label>Total Fails</Label>
          <Badge className="bg-red-100 text-red-800 text-sm p-2 w-full justify-center">
            {ticket.Total_Fails} failures
          </Badge>
        </div>

        <div className="space-y-2">
          <Label>Escalation Level</Label>
          <Badge className={`${getEscalationColor(ticket.Escalation_Level)} text-sm p-2 w-full justify-center`}>
            {ticket.Escalation_Level}
          </Badge>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Badge className="bg-blue-100 text-blue-800 text-sm p-2 w-full justify-center">
            {ticket.Ticket_Status}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Training Plan</Label>
        <Input value={ticket.Training_Plan} readOnly className="bg-gray-50" />
      </div>

      <div className="space-y-2">
        <Label>Assigned Trainer</Label>
        <Select defaultValue={ticket.Assigned_Trainer || 'none'}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Not assigned</SelectItem>
            <SelectItem value="USR001">Alice Johnson</SelectItem>
            <SelectItem value="USR002">Bob Wilson</SelectItem>
            <SelectItem value="USR003">Carol Smith</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Progress ({ticket.Progress}%)</Label>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#7A1C46] h-3 rounded-full transition-all"
              style={{ width: `${ticket.Progress}%` }}
            />
          </div>
          <Input
            type="number"
            min="0"
            max="100"
            defaultValue={ticket.Progress}
            className="w-20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Remarks</Label>
        <Textarea
          defaultValue={ticket.Remarks}
          rows={3}
          className="bg-gray-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Created On</Label>
          <Input value={ticket.Created_On} readOnly className="bg-gray-50" />
        </div>

        <div className="space-y-2">
          <Label>Closed On</Label>
          <Input value={ticket.Closed_On || 'Not closed'} readOnly className="bg-gray-50" />
        </div>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          Training completion criteria: Progress ≥ 90%, no new QC fails for 14 days, trainer approval.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleAssignTrainer} variant="outline" className="flex-1">
          <BookOpen className="w-4 h-4 mr-2" />
          Assign Trainer
        </Button>
        <Button onClick={handleUpdateProgress} variant="outline" className="flex-1">
          Update Progress
        </Button>
        {ticket.Ticket_Status !== 'Closed' && (
          <Button onClick={handleCloseTicket} className="flex-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Close Ticket
          </Button>
        )}
      </div>
    </div>
  );
}
