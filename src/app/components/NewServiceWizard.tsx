import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

type Route = 'MM_Home' | 'PM_Hub' | 'Master_Hub';

interface NewServiceWizardProps {
  onNavigate: (route: Route) => void;
}

export default function NewServiceWizard({ onNavigate }: NewServiceWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    Service_Name: '',
    Service_Category: '',
    Service_Type: '',
    Industry: [] as string[],
    Country: [] as string[],
    Regulation: [] as string[],
    Fiscal_Year: 'FY2025',
    Primary_Keywords: [] as string[],
    Outsourcing_Keywords: [] as string[],
    Modifier_Keywords: [] as string[],
    Primary_URL: '',
    Create_Project_Now: true,
    Quarter: 'Q1',
    Owner: '',
    Start_Date: '',
    End_Date: '',
  });

  const steps = ['Basics', 'Targeting', 'Link Site Pages', 'Kickoff Project'];

  const serviceCategories = ['Consulting', 'Technology', 'Professional Services', 'Implementation'];
  const serviceTypes = ['Service', 'Product', 'Solution'];
  const industries = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'];
  const countries = ['USA', 'UK', 'Canada', 'Germany', 'France'];
  const regulations = ['GDPR', 'HIPAA', 'SOC2', 'ISO27001'];
  const fiscalYears = ['FY2024', 'FY2025', 'FY2026'];
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const owners = ['John Doe', 'Jane Smith', 'Bob Johnson'];
  const keywords = ['cloud migration', 'AI implementation', 'digital transformation', 'data analytics'];
  const sitePages = ['/services/new-service', '/solutions/custom-solution', '/products/enterprise'];

  const toggleArrayValue = (field: keyof typeof formData, value: string) => {
    const current = formData[field] as string[];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter((v) => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success('Service & Project created successfully!');
    setTimeout(() => {
      onNavigate('PM_Hub');
    }, 1000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basics
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Service Name *</Label>
              <Input
                value={formData.Service_Name}
                onChange={(e) => setFormData({ ...formData, Service_Name: e.target.value })}
                placeholder="Enter service name"
              />
            </div>

            <div className="space-y-2">
              <Label>Service Category</Label>
              <Select
                value={formData.Service_Category}
                onValueChange={(value) => setFormData({ ...formData, Service_Category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select
                value={formData.Service_Type}
                onValueChange={(value) => setFormData({ ...formData, Service_Type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Industry *</Label>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Badge
                    key={industry}
                    className={`cursor-pointer ${
                      formData.Industry.includes(industry)
                        ? 'bg-[#7A1C46] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => toggleArrayValue('Industry', industry)}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Country *</Label>
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <Badge
                    key={country}
                    className={`cursor-pointer ${
                      formData.Country.includes(country)
                        ? 'bg-[#7A1C46] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => toggleArrayValue('Country', country)}
                  >
                    {country}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Regulation</Label>
              <div className="flex flex-wrap gap-2">
                {regulations.map((regulation) => (
                  <Badge
                    key={regulation}
                    className={`cursor-pointer ${
                      formData.Regulation.includes(regulation)
                        ? 'bg-[#7A1C46] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => toggleArrayValue('Regulation', regulation)}
                  >
                    {regulation}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Fiscal Year</Label>
              <Select
                value={formData.Fiscal_Year}
                onValueChange={(value) => setFormData({ ...formData, Fiscal_Year: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fiscalYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1: // Targeting
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Primary Keywords</Label>
              <p className="text-sm text-gray-600">Select keywords to target for this service</p>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    className={`cursor-pointer ${
                      formData.Primary_Keywords.includes(keyword)
                        ? 'bg-[#7A1C46] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => toggleArrayValue('Primary_Keywords', keyword)}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Outsourcing Keywords</Label>
              <div className="flex flex-wrap gap-2">
                {['outsourcing', 'offshore', 'nearshore', 'managed services'].map((keyword) => (
                  <Badge
                    key={keyword}
                    className={`cursor-pointer ${
                      formData.Outsourcing_Keywords.includes(keyword)
                        ? 'bg-[#7A1C46] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => toggleArrayValue('Outsourcing_Keywords', keyword)}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Modifier Keywords</Label>
              <div className="flex flex-wrap gap-2">
                {['best', 'top', 'professional', 'enterprise', 'affordable'].map((keyword) => (
                  <Badge
                    key={keyword}
                    className={`cursor-pointer ${
                      formData.Modifier_Keywords.includes(keyword)
                        ? 'bg-[#7A1C46] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => toggleArrayValue('Modifier_Keywords', keyword)}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Link Site Pages
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Primary URL</Label>
              <p className="text-sm text-gray-600">Select or create the main page for this service</p>
              <Select
                value={formData.Primary_URL}
                onValueChange={(value) => setFormData({ ...formData, Primary_URL: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select page URL" />
                </SelectTrigger>
                <SelectContent>
                  {sitePages.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              Create Placeholder Page
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 Tip: You can create a new placeholder page if the service doesn't have an existing URL yet.
              </p>
            </div>
          </div>
        );

      case 3: // Kickoff Project
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900">
                ✓ Creates a Project with 8 standard campaigns & quarterly plan
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.Create_Project_Now}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, Create_Project_Now: checked as boolean })
                }
              />
              <Label>Create Project Now</Label>
            </div>

            {formData.Create_Project_Now && (
              <>
                <div className="space-y-2">
                  <Label>Quarter</Label>
                  <Select
                    value={formData.Quarter}
                    onValueChange={(value) => setFormData({ ...formData, Quarter: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {quarters.map((q) => (
                        <SelectItem key={q} value={q}>
                          {q}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Owner</Label>
                  <Select
                    value={formData.Owner}
                    onValueChange={(value) => setFormData({ ...formData, Owner: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      {owners.map((owner) => (
                        <SelectItem key={owner} value={owner}>
                          {owner}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.Start_Date}
                      onChange={(e) => setFormData({ ...formData, Start_Date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.End_Date}
                      onChange={(e) => setFormData({ ...formData, End_Date: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Create New Service</CardTitle>
          <div className="flex items-center gap-4 mt-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep
                      ? 'bg-[#7A1C46] text-white'
                      : index < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={index === currentStep ? 'text-[#7A1C46]' : 'text-gray-600'}>
                  {step}
                </span>
                {index < steps.length - 1 && <div className="w-8 h-px bg-gray-300" />}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px]">{renderStepContent()}</div>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="ghost" onClick={() => onNavigate('MM_Home')}>
              Cancel
            </Button>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button onClick={handleNext} className="bg-[#7A1C46] hover:bg-[#5A1434]">
                {currentStep === steps.length - 1 ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Create Service & Project
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
