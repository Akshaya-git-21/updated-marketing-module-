import { useState } from 'react';
import { Plus, GitBranch, Clock, Rocket, Upload, Layers, ShieldCheck, ArrowRight, Check, MessageSquare, Globe, ExternalLink, Edit, Trash2, Eye, FileText, Search, BookOpen, Wand2, Workflow, PlusSquare, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';

interface SitePage {
  Page_ID: string;
  Service_ID: string;
  Service_Name: string;
  SubService_L1_ID: string | null;
  SubService_L1_Name: string | null;
  SubService_L2_ID: string | null;
  SubService_L2_Name: string | null;
  SubService_L3_ID: string | null;
  SubService_L3_Name: string | null;
  SubService_L4_ID: string | null;
  SubService_L4_Name: string | null;
  Industry_ID: string | null;
  Industry_Name: string | null;
  SubIndustry_L1_ID: string | null;
  SubIndustry_L1_Name: string | null;
  SubIndustry_L2_ID: string | null;
  SubIndustry_L2_Name: string | null;
  SubIndustry_L3_ID: string | null;
  SubIndustry_L3_Name: string | null;
  Page_Type: string;
  Page_Name: string;
  Title_SEO: string;
  H1: string;
  Slug: string;
  URL: string;
  Country: string | null;
  Language: string;
  Region: string;
  Status: string;
  Owner_User_ID: string;
  Owner_Name: string;
  Reviewer_User_ID: string | null;
  Reviewer_Name: string | null;
  Is_Knowledge_Linked: boolean;
  Primary_Insight_Category_ID: string | null;
  Primary_Insight_Category_Name: string | null;
  Scheduled_Publish_At: string | null;
  Template_ID: string;
  Template_Name: string;
  Primary_Keyword_ID: string | null;
  Primary_Keyword: string | null;
  CWV_LCP: number | null;
  CWV_CLS: number | null;
  A11y_Score: number | null;
  Last_Updated: string;
  Published_At: string | null;
}

interface Industry {
  Industry_ID: string;
  Industry_Name: string;
  Parent_Industry_ID: string | null;
  Depth_Level: number;
  Slug: string;
  Status: string;
}

interface InsightCategory {
  Category_ID: string;
  Category_Name: string;
  Category_Type: string;
  Is_Active: boolean;
}

interface InsightMap {
  Insight_Map_ID: string;
  Service_ID: string;
  Service_Name: string;
  SubService_L1_ID: string | null;
  SubService_L1_Name: string | null;
  SubService_L2_ID: string | null;
  SubService_L2_Name: string | null;
  SubService_L3_ID: string | null;
  SubService_L3_Name: string | null;
  SubService_L4_ID: string | null;
  SubService_L4_Name: string | null;
  Country: string;
  Category_ID: string;
  Category_Name: string;
  Linked_Content_IDs: string[];
  Linked_Content_Count: number;
  Notes: string;
  Last_Updated: string;
}

interface MediaAsset {
  asset_id: string;
  file_url: string;
  media_category: string;
  mime_type: string;
  file_size_bytes: number;
  width_px: number | null;
  height_px: number | null;
  duration_sec: number | null;
  dpi: number | null;
  alt_text: string;
  caption: string;
  tags: string[];
  status: string;
  Country: string | null;
  Industry_ID: string | null;
  Industry_Name: string | null;
  Service_ID: string | null;
  Service_Name: string | null;
  Page_ID: string | null;
  Page_Name: string | null;
  Owner_User_ID: string;
  Owner_Name: string;
  uploaded_at: string;
  last_used_at: string | null;
}

interface PublishingLink {
  Publishing_Link_ID: string;
  Page_ID: string;
  Page_Name: string;
  Project_ID: string;
  Project_Name: string;
  Campaign_ID: string;
  Campaign_Name: string;
  Task_ID: string;
  Task_Name: string;
  Flow_Status: string;
  Last_Updated: string;
}

interface SEOMeta {
  SEO_ID: string;
  Page_ID: string;
  Page_Name: string;
  Title_Tag: string;
  Meta_Description: string;
  H1: string;
  H2_List: string[];
  OG_Title: string;
  OG_Description: string;
  Twitter_Card: string;
  Focus_Questions_FAQ: string[];
  Alt_Coverage_Percent: number;
  Keyword_Density_Notes: string;
  Last_Audited: string;
}

interface Template {
  Template_ID: string;
  Template_Name: string;
  Allowed_Components: string[];
  Is_Default: boolean;
  CSS_Token_Set: string;
  Notes: string;
}

interface Component {
  Component_ID: string;
  Component_Name: string;
  Props_Schema_JSON: string;
  Is_Reusable: boolean;
  Version: string;
}

interface Redirect {
  Redirect_ID: string;
  From_URL: string;
  To_URL: string;
  Type: string;
  Reason: string;
  Created_By: string;
  Created_At: string;
  Is_Active: boolean;
}

interface LocalizationMap {
  Loc_ID: string;
  Page_ID: string;
  Page_Name: string;
  Language: string;
  Region: string;
  Localized_URL: string;
  Is_Canonical_Locale: boolean;
}

export default function CMSHub() {
  const [activeTab, setActiveTab] = useState('Pages');
  const [pageFilters, setPageFilters] = useState({
    pageType: 'all',
    language: 'all',
    region: 'all',
    status: 'all',
    service: 'all',
    country: 'all',
    industry: 'all',
  });
  const [selectedSEO, setSelectedSEO] = useState<string | null>(null);
  const [showPageDialog, setShowPageDialog] = useState(false);
  const [showMediaUploadDialog, setShowMediaUploadDialog] = useState(false);
  const [showInsightMapDialog, setShowInsightMapDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaFilters, setMediaFilters] = useState({
    category: 'all',
    country: 'all',
    industry: 'all',
    service: 'all',
    status: 'all',
  });

  // Mock data for industries
  const industriesData: Industry[] = [
    { Industry_ID: 'IND001', Industry_Name: 'Technology', Parent_Industry_ID: null, Depth_Level: 0, Slug: 'technology', Status: 'Active' },
    { Industry_ID: 'IND002', Industry_Name: 'SaaS', Parent_Industry_ID: 'IND001', Depth_Level: 1, Slug: 'saas', Status: 'Active' },
    { Industry_ID: 'IND003', Industry_Name: 'E-commerce', Parent_Industry_ID: 'IND001', Depth_Level: 1, Slug: 'ecommerce', Status: 'Active' },
    { Industry_ID: 'IND004', Industry_Name: 'Healthcare', Parent_Industry_ID: null, Depth_Level: 0, Slug: 'healthcare', Status: 'Active' },
    { Industry_ID: 'IND005', Industry_Name: 'Finance', Parent_Industry_ID: null, Depth_Level: 0, Slug: 'finance', Status: 'Active' },
    { Industry_ID: 'IND006', Industry_Name: 'FinTech', Parent_Industry_ID: 'IND005', Depth_Level: 1, Slug: 'fintech', Status: 'Active' },
  ];

  // Mock data for insight categories
  const insightCategoriesData: InsightCategory[] = [
    { Category_ID: 'CAT001', Category_Name: 'Regulations', Category_Type: 'Compliance', Is_Active: true },
    { Category_ID: 'CAT002', Category_Name: 'Pillar Pages', Category_Type: 'Content', Is_Active: true },
    { Category_ID: 'CAT003', Category_Name: 'How-To Guides', Category_Type: 'Educational', Is_Active: true },
    { Category_ID: 'CAT004', Category_Name: 'Case Studies', Category_Type: 'Social Proof', Is_Active: true },
    { Category_ID: 'CAT005', Category_Name: 'E-books', Category_Type: 'Lead Magnet', Is_Active: true },
    { Category_ID: 'CAT006', Category_Name: 'Templates & Samples', Category_Type: 'Resource', Is_Active: true },
    { Category_ID: 'CAT007', Category_Name: 'Research Reports', Category_Type: 'Thought Leadership', Is_Active: true },
  ];

  const sitePagesData: SitePage[] = [
    {
      Page_ID: 'PAGE001',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      SubService_L1_ID: 'SRV001-01',
      SubService_L1_Name: 'Technical SEO',
      SubService_L2_ID: 'SRV001-01-01',
      SubService_L2_Name: 'Site Speed Optimization',
      SubService_L3_ID: null,
      SubService_L3_Name: null,
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Industry_ID: 'IND001',
      Industry_Name: 'Technology',
      SubIndustry_L1_ID: 'IND002',
      SubIndustry_L1_Name: 'SaaS',
      SubIndustry_L2_ID: null,
      SubIndustry_L2_Name: null,
      SubIndustry_L3_ID: null,
      SubIndustry_L3_Name: null,
      Page_Type: 'Sub-Service',
      Page_Name: 'Technical SEO - Site Speed Optimization',
      Title_SEO: 'Site Speed Optimization Services | Technical SEO',
      H1: 'Site Speed Optimization for Better Rankings',
      Slug: 'site-speed-optimization',
      URL: '/seo-services/technical-seo/site-speed-optimization',
      Country: 'US',
      Language: 'en-US',
      Region: 'US',
      Status: 'Published',
      Owner_User_ID: 'USR001',
      Owner_Name: 'Alice Johnson',
      Reviewer_User_ID: 'USR002',
      Reviewer_Name: 'Bob Wilson',
      Is_Knowledge_Linked: true,
      Primary_Insight_Category_ID: 'CAT003',
      Primary_Insight_Category_Name: 'How-To Guides',
      Scheduled_Publish_At: null,
      Template_ID: 'TPL002',
      Template_Name: 'Sub-Service',
      Primary_Keyword_ID: 'KW001',
      Primary_Keyword: 'site speed optimization',
      CWV_LCP: 1200,
      CWV_CLS: 0.05,
      A11y_Score: 95,
      Last_Updated: '2024-10-28',
      Published_At: '2024-10-15',
    },
    {
      Page_ID: 'PAGE002',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      SubService_L1_ID: null,
      SubService_L1_Name: null,
      SubService_L2_ID: null,
      SubService_L2_Name: null,
      SubService_L3_ID: null,
      SubService_L3_Name: null,
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Industry_ID: 'IND004',
      Industry_Name: 'Healthcare',
      SubIndustry_L1_ID: null,
      SubIndustry_L1_Name: null,
      SubIndustry_L2_ID: null,
      SubIndustry_L2_Name: null,
      SubIndustry_L3_ID: null,
      SubIndustry_L3_Name: null,
      Page_Type: 'Country-Regulation',
      Page_Name: 'Healthcare SEO Compliance - US Regulations',
      Title_SEO: 'US Healthcare SEO Compliance Guide | HIPAA & Regulations',
      H1: 'Healthcare SEO Compliance for US Markets',
      Slug: 'healthcare-seo-compliance-us',
      URL: '/regulations/healthcare-seo-compliance-us',
      Country: 'US',
      Language: 'en-US',
      Region: 'US',
      Status: 'Published',
      Owner_User_ID: 'USR003',
      Owner_Name: 'Carol Smith',
      Reviewer_User_ID: 'USR002',
      Reviewer_Name: 'Bob Wilson',
      Is_Knowledge_Linked: true,
      Primary_Insight_Category_ID: 'CAT001',
      Primary_Insight_Category_Name: 'Regulations',
      Scheduled_Publish_At: null,
      Template_ID: 'TPL003',
      Template_Name: 'Blog',
      Primary_Keyword_ID: 'KW025',
      Primary_Keyword: 'healthcare seo compliance',
      CWV_LCP: 1450,
      CWV_CLS: 0.08,
      A11y_Score: 92,
      Last_Updated: '2024-10-25',
      Published_At: '2024-10-20',
    },
    {
      Page_ID: 'PAGE003',
      Service_ID: 'SRV002',
      Service_Name: 'Content Marketing',
      SubService_L1_ID: 'SRV002-01',
      SubService_L1_Name: 'Content Strategy',
      SubService_L2_ID: null,
      SubService_L2_Name: null,
      SubService_L3_ID: null,
      SubService_L3_Name: null,
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Industry_ID: 'IND001',
      Industry_Name: 'Technology',
      SubIndustry_L1_ID: 'IND002',
      SubIndustry_L1_Name: 'SaaS',
      SubIndustry_L2_ID: null,
      SubIndustry_L2_Name: null,
      SubIndustry_L3_ID: null,
      SubIndustry_L3_Name: null,
      Page_Type: 'Pillar',
      Page_Name: 'Complete Guide to SaaS Content Marketing',
      Title_SEO: 'SaaS Content Marketing: Complete Guide 2024',
      H1: 'The Ultimate Guide to SaaS Content Marketing',
      Slug: 'saas-content-marketing-guide',
      URL: '/content-marketing/saas-content-marketing-guide',
      Country: null,
      Language: 'en-US',
      Region: 'US',
      Status: 'Published',
      Owner_User_ID: 'USR003',
      Owner_Name: 'Carol Smith',
      Reviewer_User_ID: 'USR002',
      Reviewer_Name: 'Bob Wilson',
      Is_Knowledge_Linked: true,
      Primary_Insight_Category_ID: 'CAT002',
      Primary_Insight_Category_Name: 'Pillar Pages',
      Scheduled_Publish_At: null,
      Template_ID: 'TPL003',
      Template_Name: 'Blog',
      Primary_Keyword_ID: 'KW040',
      Primary_Keyword: 'saas content marketing',
      CWV_LCP: 1100,
      CWV_CLS: 0.04,
      A11y_Score: 98,
      Last_Updated: '2024-10-30',
      Published_At: '2024-10-25',
    },
    {
      Page_ID: 'PAGE004',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      SubService_L1_ID: null,
      SubService_L1_Name: null,
      SubService_L2_ID: null,
      SubService_L2_Name: null,
      SubService_L3_ID: null,
      SubService_L3_Name: null,
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Industry_ID: null,
      Industry_Name: null,
      SubIndustry_L1_ID: null,
      SubIndustry_L1_Name: null,
      SubIndustry_L2_ID: null,
      SubIndustry_L2_Name: null,
      SubIndustry_L3_ID: null,
      SubIndustry_L3_Name: null,
      Page_Type: 'HowTo',
      Page_Name: 'How to Optimize Meta Tags for SEO',
      Title_SEO: 'How to Optimize Meta Tags for SEO in 2024',
      H1: 'Meta Tag Optimization: Step-by-Step Guide',
      Slug: 'optimize-meta-tags-seo',
      URL: '/how-to/optimize-meta-tags-seo',
      Country: null,
      Language: 'en-US',
      Region: 'US',
      Status: 'Review',
      Owner_User_ID: 'USR003',
      Owner_Name: 'Carol Smith',
      Reviewer_User_ID: 'USR002',
      Reviewer_Name: 'Bob Wilson',
      Is_Knowledge_Linked: true,
      Primary_Insight_Category_ID: 'CAT003',
      Primary_Insight_Category_Name: 'How-To Guides',
      Scheduled_Publish_At: null,
      Template_ID: 'TPL003',
      Template_Name: 'Blog',
      Primary_Keyword_ID: 'KW055',
      Primary_Keyword: 'optimize meta tags',
      CWV_LCP: null,
      CWV_CLS: null,
      A11y_Score: null,
      Last_Updated: '2024-10-29',
      Published_At: null,
    },
    {
      Page_ID: 'PAGE005',
      Service_ID: 'SRV005',
      Service_Name: 'E-commerce Marketing',
      SubService_L1_ID: 'SRV005-01',
      SubService_L1_Name: 'Product SEO',
      SubService_L2_ID: 'SRV005-01-01',
      SubService_L2_Name: 'Product Schema',
      SubService_L3_ID: 'SRV005-01-01-01',
      SubService_L3_Name: 'Rich Snippets',
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Industry_ID: 'IND001',
      Industry_Name: 'Technology',
      SubIndustry_L1_ID: 'IND003',
      SubIndustry_L1_Name: 'E-commerce',
      SubIndustry_L2_ID: null,
      SubIndustry_L2_Name: null,
      SubIndustry_L3_ID: null,
      SubIndustry_L3_Name: null,
      Page_Type: 'Sub-Service',
      Page_Name: 'Product Schema Implementation - Rich Snippets',
      Title_SEO: 'Product Schema Rich Snippets | E-commerce SEO',
      H1: 'Implement Product Schema for Rich Snippets',
      Slug: 'product-schema-rich-snippets',
      URL: '/ecommerce/product-seo/product-schema/rich-snippets',
      Country: 'IN',
      Language: 'en-IN',
      Region: 'IN',
      Status: 'Draft',
      Owner_User_ID: 'USR001',
      Owner_Name: 'Alice Johnson',
      Reviewer_User_ID: null,
      Reviewer_Name: null,
      Is_Knowledge_Linked: false,
      Primary_Insight_Category_ID: null,
      Primary_Insight_Category_Name: null,
      Scheduled_Publish_At: null,
      Template_ID: 'TPL002',
      Template_Name: 'Sub-Service',
      Primary_Keyword_ID: 'KW062',
      Primary_Keyword: 'product schema rich snippets',
      CWV_LCP: null,
      CWV_CLS: null,
      A11y_Score: null,
      Last_Updated: '2024-10-30',
      Published_At: null,
    },
  ];

  const insightMapData: InsightMap[] = [
    {
      Insight_Map_ID: 'IM001',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      SubService_L1_ID: 'SRV001-01',
      SubService_L1_Name: 'Technical SEO',
      SubService_L2_ID: null,
      SubService_L2_Name: null,
      SubService_L3_ID: null,
      SubService_L3_Name: null,
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Country: 'US',
      Category_ID: 'CAT003',
      Category_Name: 'How-To Guides',
      Linked_Content_IDs: ['CNT001', 'CNT002', 'CNT003'],
      Linked_Content_Count: 3,
      Notes: 'Core technical SEO how-to guides for US market',
      Last_Updated: '2024-10-28',
    },
    {
      Insight_Map_ID: 'IM002',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      SubService_L1_ID: null,
      SubService_L1_Name: null,
      SubService_L2_ID: null,
      SubService_L2_Name: null,
      SubService_L3_ID: null,
      SubService_L3_Name: null,
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Country: 'US',
      Category_ID: 'CAT001',
      Category_Name: 'Regulations',
      Linked_Content_IDs: ['CNT010', 'CNT011'],
      Linked_Content_Count: 2,
      Notes: 'US-specific SEO compliance and regulations',
      Last_Updated: '2024-10-25',
    },
    {
      Insight_Map_ID: 'IM003',
      Service_ID: 'SRV002',
      Service_Name: 'Content Marketing',
      SubService_L1_ID: 'SRV002-01',
      SubService_L1_Name: 'Content Strategy',
      SubService_L2_ID: null,
      SubService_L2_Name: null,
      SubService_L3_ID: null,
      SubService_L3_Name: null,
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Country: 'IN',
      Category_ID: 'CAT002',
      Category_Name: 'Pillar Pages',
      Linked_Content_IDs: ['CNT020', 'CNT021', 'CNT022', 'CNT023'],
      Linked_Content_Count: 4,
      Notes: 'Content strategy pillar pages for Indian market',
      Last_Updated: '2024-10-27',
    },
    {
      Insight_Map_ID: 'IM004',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      SubService_L1_ID: null,
      SubService_L1_Name: null,
      SubService_L2_ID: null,
      SubService_L2_Name: null,
      SubService_L3_ID: null,
      SubService_L3_Name: null,
      SubService_L4_ID: null,
      SubService_L4_Name: null,
      Country: 'GB',
      Category_ID: 'CAT004',
      Category_Name: 'Case Studies',
      Linked_Content_IDs: ['CNT030', 'CNT031', 'CNT032'],
      Linked_Content_Count: 3,
      Notes: 'UK-specific SEO case studies',
      Last_Updated: '2024-10-26',
    },
  ];

  const mediaAssetsData: MediaAsset[] = [
    {
      asset_id: 'MDA001',
      file_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      media_category: 'Image',
      mime_type: 'image/jpeg',
      file_size_bytes: 245000,
      width_px: 1920,
      height_px: 1080,
      duration_sec: null,
      dpi: 72,
      alt_text: 'SEO analytics dashboard showing growth metrics',
      caption: 'SEO Performance Dashboard',
      tags: ['seo', 'analytics', 'dashboard', 'metrics'],
      status: 'Approved',
      Country: 'US',
      Industry_ID: 'IND001',
      Industry_Name: 'Technology',
      Service_ID: 'SRV001',
      Service_Name: 'SEO Services',
      Page_ID: 'PAGE001',
      Page_Name: 'Technical SEO - Site Speed Optimization',
      Owner_User_ID: 'USR001',
      Owner_Name: 'Alice Johnson',
      uploaded_at: '2024-10-15',
      last_used_at: '2024-10-28',
    },
    {
      asset_id: 'MDA002',
      file_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      media_category: 'Image',
      mime_type: 'image/jpeg',
      file_size_bytes: 310000,
      width_px: 1920,
      height_px: 1080,
      duration_sec: null,
      dpi: 72,
      alt_text: 'Digital marketing team analyzing data',
      caption: 'Marketing Analytics',
      tags: ['marketing', 'analytics', 'team', 'data'],
      status: 'Approved',
      Country: null,
      Industry_ID: 'IND001',
      Industry_Name: 'Technology',
      Service_ID: 'SRV002',
      Service_Name: 'Content Marketing',
      Page_ID: null,
      Page_Name: null,
      Owner_User_ID: 'USR003',
      Owner_Name: 'Carol Smith',
      uploaded_at: '2024-10-16',
      last_used_at: '2024-10-29',
    },
    {
      asset_id: 'MDA003',
      file_url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
      media_category: 'Video',
      mime_type: 'video/mp4',
      file_size_bytes: 5240000,
      width_px: 1280,
      height_px: 720,
      duration_sec: 45,
      dpi: null,
      alt_text: 'Social media marketing tutorial video',
      caption: 'Social Media Marketing Tutorial',
      tags: ['video', 'tutorial', 'social-media', 'marketing'],
      status: 'Approved',
      Country: 'US',
      Industry_ID: 'IND002',
      Industry_Name: 'SaaS',
      Service_ID: 'SRV003',
      Service_Name: 'Social Media Marketing',
      Page_ID: null,
      Page_Name: null,
      Owner_User_ID: 'USR002',
      Owner_Name: 'Bob Wilson',
      uploaded_at: '2024-10-18',
      last_used_at: '2024-10-27',
    },
    {
      asset_id: 'MDA004',
      file_url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c2e4?w=400',
      media_category: 'Document',
      mime_type: 'application/pdf',
      file_size_bytes: 1850000,
      width_px: null,
      height_px: null,
      duration_sec: null,
      dpi: null,
      alt_text: 'Content strategy whitepaper PDF',
      caption: 'Content Strategy Whitepaper 2024',
      tags: ['pdf', 'whitepaper', 'content-strategy', 'lead-magnet'],
      status: 'Approved',
      Country: 'IN',
      Industry_ID: 'IND002',
      Industry_Name: 'SaaS',
      Service_ID: 'SRV002',
      Service_Name: 'Content Marketing',
      Page_ID: 'PAGE003',
      Page_Name: 'Complete Guide to SaaS Content Marketing',
      Owner_User_ID: 'USR003',
      Owner_Name: 'Carol Smith',
      uploaded_at: '2024-10-20',
      last_used_at: '2024-10-30',
    },
  ];

  const publishingLinksData: PublishingLink[] = [
    {
      Publishing_Link_ID: 'PL001',
      Page_ID: 'PAGE004',
      Page_Name: 'How to Optimize Meta Tags for SEO',
      Project_ID: 'PRJ001',
      Project_Name: 'Q4 Content Strategy',
      Campaign_ID: 'CMP015',
      Campaign_Name: 'SEO Knowledge Base',
      Task_ID: 'TSK089',
      Task_Name: 'Meta Tags Guide - Content Review',
      Flow_Status: 'Review',
      Last_Updated: '2024-10-29',
    },
    {
      Publishing_Link_ID: 'PL002',
      Page_ID: 'PAGE005',
      Page_Name: 'Product Schema Implementation - Rich Snippets',
      Project_ID: 'PRJ003',
      Project_Name: 'E-commerce SEO Expansion',
      Campaign_ID: 'CMP024',
      Campaign_Name: 'Technical Documentation',
      Task_ID: 'TSK102',
      Task_Name: 'Product Schema Guide - Draft',
      Flow_Status: 'Content',
      Last_Updated: '2024-10-30',
    },
  ];

  const seoMetaData: SEOMeta[] = [
    {
      SEO_ID: 'SEO001',
      Page_ID: 'PAGE001',
      Page_Name: 'Technical SEO - Site Speed Optimization',
      Title_Tag: 'Site Speed Optimization Services | Technical SEO Excellence',
      Meta_Description: 'Boost your site speed and improve rankings with our expert technical SEO services. Comprehensive optimization for Core Web Vitals and performance.',
      H1: 'Site Speed Optimization for Better Rankings',
      H2_List: ['Why Site Speed Matters', 'Core Web Vitals', 'Optimization Techniques', 'Case Studies'],
      OG_Title: 'Site Speed Optimization Services | Beetloop',
      OG_Description: 'Expert technical SEO services for optimal site speed',
      Twitter_Card: 'summary_large_image',
      Focus_Questions_FAQ: [
        'What is site speed optimization?',
        'How does page speed affect SEO?',
        'What are Core Web Vitals?',
      ],
      Alt_Coverage_Percent: 95,
      Keyword_Density_Notes: 'Primary keyword appears 8 times. Good distribution.',
      Last_Audited: '2024-10-20',
    },
    {
      SEO_ID: 'SEO002',
      Page_ID: 'PAGE002',
      Page_Name: 'Healthcare SEO Compliance - US Regulations',
      Title_Tag: 'US Healthcare SEO Compliance Guide | HIPAA & Regulations',
      Meta_Description: 'Navigate US healthcare SEO compliance with our comprehensive guide. HIPAA requirements, regulations, and best practices for healthcare marketing.',
      H1: 'Healthcare SEO Compliance for US Markets',
      H2_List: ['HIPAA Requirements', 'SEO Best Practices', 'Compliance Checklist', 'Common Pitfalls'],
      OG_Title: 'Healthcare SEO Compliance | US Regulations Guide',
      OG_Description: 'Complete guide to healthcare SEO compliance in the US',
      Twitter_Card: 'summary',
      Focus_Questions_FAQ: [
        'What are HIPAA requirements for healthcare marketing?',
        'How to do SEO for healthcare websites?',
        'What are the compliance risks in healthcare SEO?',
      ],
      Alt_Coverage_Percent: 88,
      Keyword_Density_Notes: 'Healthcare compliance mentioned 6 times. Consider adding more variations.',
      Last_Audited: '2024-10-22',
    },
  ];

  const templatesData: Template[] = [
    {
      Template_ID: 'TPL001',
      Template_Name: 'Service Detail',
      Allowed_Components: ['Hero', 'RichText', 'FAQ', 'CTA', 'Stats', 'Cards', 'ComparisonTable'],
      Is_Default: true,
      CSS_Token_Set: 'default-theme',
      Notes: 'Main template for service pages',
    },
    {
      Template_ID: 'TPL002',
      Template_Name: 'Sub-Service',
      Allowed_Components: ['Hero', 'RichText', 'FAQ', 'CTA', 'Table'],
      Is_Default: false,
      CSS_Token_Set: 'default-theme',
      Notes: 'Simplified template for sub-service pages',
    },
    {
      Template_ID: 'TPL003',
      Template_Name: 'Blog',
      Allowed_Components: ['Hero', 'RichText', 'Quote', 'Gallery', 'CTA', 'RelatedPosts'],
      Is_Default: false,
      CSS_Token_Set: 'blog-theme',
      Notes: 'Blog post template with rich content options',
    },
  ];

  const componentsData: Component[] = [
    { Component_ID: 'CMP001', Component_Name: 'Hero', Props_Schema_JSON: '{"title":"string","subtitle":"string","cta":"object"}', Is_Reusable: true, Version: '2.1' },
    { Component_ID: 'CMP002', Component_Name: 'FAQ', Props_Schema_JSON: '{"questions":"array"}', Is_Reusable: true, Version: '1.5' },
    { Component_ID: 'CMP003', Component_Name: 'CTA', Props_Schema_JSON: '{"text":"string","link":"string","variant":"string"}', Is_Reusable: true, Version: '1.8' },
    { Component_ID: 'CMP004', Component_Name: 'Stats', Props_Schema_JSON: '{"metrics":"array"}', Is_Reusable: true, Version: '1.3' },
    { Component_ID: 'CMP005', Component_Name: 'Cards', Props_Schema_JSON: '{"items":"array","columns":"number"}', Is_Reusable: true, Version: '2.0' },
    { Component_ID: 'CMP006', Component_Name: 'RichText', Props_Schema_JSON: '{"content":"html"}', Is_Reusable: true, Version: '1.0' },
  ];

  const redirectsData: Redirect[] = [
    {
      Redirect_ID: 'RED001',
      From_URL: '/old-seo-services',
      To_URL: '/seo-services',
      Type: '301',
      Reason: 'URL consolidation',
      Created_By: 'Alice Johnson',
      Created_At: '2024-09-15',
      Is_Active: true,
    },
    {
      Redirect_ID: 'RED002',
      From_URL: '/content-services',
      To_URL: '/content-marketing',
      Type: '301',
      Reason: 'Service rebranding',
      Created_By: 'Bob Wilson',
      Created_At: '2024-10-01',
      Is_Active: true,
    },
  ];

  const localizationData: LocalizationMap[] = [
    {
      Loc_ID: 'LOC001',
      Page_ID: 'PAGE001',
      Page_Name: 'Technical SEO - Site Speed Optimization',
      Language: 'en-US',
      Region: 'US',
      Localized_URL: '/seo-services/technical-seo/site-speed-optimization',
      Is_Canonical_Locale: true,
    },
    {
      Loc_ID: 'LOC002',
      Page_ID: 'PAGE001',
      Page_Name: 'Technical SEO - Site Speed Optimization',
      Language: 'en-IN',
      Region: 'IN',
      Localized_URL: '/in/seo-services/technical-seo/site-speed-optimization',
      Is_Canonical_Locale: false,
    },
  ];

  const filteredPages = sitePagesData.filter((page) => {
    if (pageFilters.pageType !== 'all' && page.Page_Type !== pageFilters.pageType) return false;
    if (pageFilters.language !== 'all' && page.Language !== pageFilters.language) return false;
    if (pageFilters.region !== 'all' && page.Region !== pageFilters.region) return false;
    if (pageFilters.status !== 'all' && page.Status !== pageFilters.status) return false;
    if (pageFilters.service !== 'all' && page.Service_ID !== pageFilters.service) return false;
    if (pageFilters.country !== 'all' && page.Country !== pageFilters.country) return false;
    if (pageFilters.industry !== 'all' && page.Industry_ID !== pageFilters.industry) return false;
    if (searchTerm && !page.Page_Name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const filteredMedia = mediaAssetsData.filter((media) => {
    if (mediaFilters.category !== 'all' && media.media_category !== mediaFilters.category) return false;
    if (mediaFilters.country !== 'all' && media.Country !== mediaFilters.country) return false;
    if (mediaFilters.industry !== 'all' && media.Industry_ID !== mediaFilters.industry) return false;
    if (mediaFilters.service !== 'all' && media.Service_ID !== mediaFilters.service) return false;
    if (mediaFilters.status !== 'all' && media.status !== mediaFilters.status) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-purple-100 text-purple-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPageTypeColor = (type: string) => {
    switch (type) {
      case 'Service': return 'bg-[#7A1C46] text-white';
      case 'Sub-Service': return 'bg-pink-100 text-pink-800';
      case 'Landing': return 'bg-orange-100 text-orange-800';
      case 'Blog': return 'bg-blue-100 text-blue-800';
      case 'Pillar': return 'bg-purple-100 text-purple-800';
      case 'HowTo': return 'bg-green-100 text-green-800';
      case 'Country-Regulation': return 'bg-red-100 text-red-800';
      case 'Location': return 'bg-teal-100 text-teal-800';
      case 'Category': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFlowStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-purple-100 text-purple-800';
      case 'Review': return 'bg-yellow-100 text-yellow-800';
      case 'Design': return 'bg-pink-100 text-pink-800';
      case 'Content': return 'bg-orange-100 text-orange-800';
      case 'Ideation': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCWVColor = (metric: number | null, type: 'LCP' | 'CLS') => {
    if (metric === null) return 'bg-gray-100 text-gray-800';
    if (type === 'LCP') {
      if (metric <= 2500) return 'bg-green-100 text-green-800';
      if (metric <= 4000) return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    } else {
      if (metric <= 0.1) return 'bg-green-100 text-green-800';
      if (metric <= 0.25) return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const selectedSEOData = seoMetaData.find(seo => seo.SEO_ID === selectedSEO);

  return (
    <div className="space-y-6">
      <Card className="border-[#E2E8F0]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46]">Content Management System (CMS)</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
              <TabsTrigger value="Pages">Pages</TabsTrigger>
              <TabsTrigger value="SEO">SEO</TabsTrigger>
              <TabsTrigger value="Insights">Insights Map</TabsTrigger>
              <TabsTrigger value="Media">Media</TabsTrigger>
              <TabsTrigger value="Publishing">Publishing</TabsTrigger>
              <TabsTrigger value="Templates">Templates</TabsTrigger>
              <TabsTrigger value="Components">Components</TabsTrigger>
              <TabsTrigger value="Redirects">Redirects</TabsTrigger>
              <TabsTrigger value="Locales">Locales</TabsTrigger>
            </TabsList>

            {/* Pages Tab */}
            <TabsContent value="Pages" className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={pageFilters.pageType} onValueChange={(value) => setPageFilters({ ...pageFilters, pageType: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Sub-Service">Sub-Service</SelectItem>
                      <SelectItem value="Landing">Landing</SelectItem>
                      <SelectItem value="Blog">Blog</SelectItem>
                      <SelectItem value="Pillar">Pillar</SelectItem>
                      <SelectItem value="HowTo">How-To</SelectItem>
                      <SelectItem value="Country-Regulation">Country Regulation</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={pageFilters.status} onValueChange={(value) => setPageFilters({ ...pageFilters, status: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={pageFilters.country} onValueChange={(value) => setPageFilters({ ...pageFilters, country: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="GB">UK</SelectItem>
                      <SelectItem value="AE">UAE</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={pageFilters.industry} onValueChange={(value) => setPageFilters({ ...pageFilters, industry: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industriesData.filter(i => i.Depth_Level === 0).map(ind => (
                        <SelectItem key={ind.Industry_ID} value={ind.Industry_ID}>{ind.Industry_Name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search pages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <GitBranch className="w-4 h-4 mr-2" />
                    New Sub-Page
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Link Insights
                  </Button>
                  <Button variant="outline" size="sm">
                    <Workflow className="w-4 h-4 mr-2" />
                    Push to Project Mgmt
                  </Button>
                  <Dialog open={showPageDialog} onOpenChange={setShowPageDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                        <Plus className="w-4 h-4 mr-2" />
                        New Page
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create New Page</DialogTitle>
                        <DialogDescription>Add a new page with hierarchical service, industry, and insights mapping</DialogDescription>
                      </DialogHeader>
                      <PageEditorForm 
                        onClose={() => setShowPageDialog(false)} 
                        industries={industriesData}
                        insightCategories={insightCategoriesData}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-[600px] overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Page</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Service Hierarchy</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Knowledge</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>CWV</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPages.map((page) => (
                        <TableRow key={page.Page_ID}>
                          <TableCell>
                            <div className="min-w-[200px]">
                              <div className="text-sm">{page.Page_Name}</div>
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <ExternalLink className="w-3 h-3" />
                                <a href={page.URL} className="hover:text-[#7A1C46] line-clamp-1">
                                  {page.URL}
                                </a>
                              </div>
                              {page.Primary_Keyword && (
                                <div className="text-xs text-gray-500 mt-1">🎯 {page.Primary_Keyword}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPageTypeColor(page.Page_Type)}>{page.Page_Type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="min-w-[150px] text-xs space-y-0.5">
                              <div className="text-[#7A1C46]">{page.Service_Name}</div>
                              {page.SubService_L1_Name && (
                                <div className="pl-2 text-gray-600">→ {page.SubService_L1_Name}</div>
                              )}
                              {page.SubService_L2_Name && (
                                <div className="pl-4 text-gray-500">→ {page.SubService_L2_Name}</div>
                              )}
                              {page.SubService_L3_Name && (
                                <div className="pl-6 text-gray-400">→ {page.SubService_L3_Name}</div>
                              )}
                              {page.SubService_L4_Name && (
                                <div className="pl-8 text-gray-300">→ {page.SubService_L4_Name}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {page.Industry_Name ? (
                              <div className="min-w-[120px] text-xs space-y-0.5">
                                <div>{page.Industry_Name}</div>
                                {page.SubIndustry_L1_Name && (
                                  <div className="pl-2 text-gray-600">→ {page.SubIndustry_L1_Name}</div>
                                )}
                                {page.SubIndustry_L2_Name && (
                                  <div className="pl-4 text-gray-500">→ {page.SubIndustry_L2_Name}</div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {page.Country ? (
                              <Badge variant="outline" className="text-xs">{page.Country}</Badge>
                            ) : (
                              <span className="text-gray-400 text-xs">Global</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {page.Is_Knowledge_Linked ? (
                              <div className="flex items-center gap-1">
                                <Badge className="bg-purple-100 text-purple-800 text-xs">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  {page.Primary_Insight_Category_Name}
                                </Badge>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(page.Status)}>{page.Status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {page.CWV_LCP && (
                                <Badge className={getCWVColor(page.CWV_LCP, 'LCP')} variant="outline">
                                  LCP: {page.CWV_LCP}ms
                                </Badge>
                              )}
                              {page.CWV_CLS && (
                                <Badge className={getCWVColor(page.CWV_CLS, 'CLS')} variant="outline">
                                  CLS: {page.CWV_CLS.toFixed(2)}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="SEO" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-[#E2E8F0]">
                  <CardHeader>
                    <CardTitle className="text-sm">Pages SEO Metadata</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {seoMetaData.map((seo) => (
                        <div
                          key={seo.SEO_ID}
                          className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                            selectedSEO === seo.SEO_ID ? 'bg-[#7A1C46]/5 border-[#7A1C46]' : ''
                          }`}
                          onClick={() => setSelectedSEO(seo.SEO_ID)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="text-sm">{seo.Page_Name}</div>
                              <div className="text-xs text-gray-500 mt-1 line-clamp-1">{seo.Title_Tag}</div>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  Alt: {seo.Alt_Coverage_Percent}%
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {seo.Focus_Questions_FAQ.length} FAQs
                                </Badge>
                              </div>
                            </div>
                            <FileText className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#E2E8F0]">
                  <CardHeader>
                    <CardTitle className="text-sm">SEO Metadata Editor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSEOData ? (
                      <SEOMetaForm seoData={selectedSEOData} />
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        Select a page to edit SEO metadata
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Insights Map Tab */}
            <TabsContent value="Insights" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Map services and sub-services to knowledge hub categories per country
                </p>
                <Dialog open={showInsightMapDialog} onOpenChange={setShowInsightMapDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Mapping
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Create Insight Mapping</DialogTitle>
                      <DialogDescription>Map service hierarchy to knowledge hub content for specific countries</DialogDescription>
                    </DialogHeader>
                    <InsightMappingForm 
                      onClose={() => setShowInsightMapDialog(false)}
                      insightCategories={insightCategoriesData}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Hierarchy</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Linked Content</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insightMapData.map((insight) => (
                      <TableRow key={insight.Insight_Map_ID}>
                        <TableCell>
                          <div className="min-w-[180px] text-xs space-y-0.5">
                            <div className="text-[#7A1C46]">{insight.Service_Name}</div>
                            {insight.SubService_L1_Name && (
                              <div className="pl-2 text-gray-600">→ {insight.SubService_L1_Name}</div>
                            )}
                            {insight.SubService_L2_Name && (
                              <div className="pl-4 text-gray-500">→ {insight.SubService_L2_Name}</div>
                            )}
                            {insight.SubService_L3_Name && (
                              <div className="pl-6 text-gray-400">→ {insight.SubService_L3_Name}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{insight.Country}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-800">{insight.Category_Name}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{insight.Linked_Content_Count} items</Badge>
                            <Button variant="outline" size="sm">
                              <LinkIcon className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-gray-600 max-w-[200px]">
                          {insight.Notes}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">{insight.Last_Updated}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="Media" className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={mediaFilters.category} onValueChange={(value) => setMediaFilters({ ...mediaFilters, category: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Image">Image</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Document">Document</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                      <SelectItem value="Vector">Vector</SelectItem>
                      <SelectItem value="Presentation">Presentation</SelectItem>
                      <SelectItem value="PDF">PDF</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={mediaFilters.country} onValueChange={(value) => setMediaFilters({ ...mediaFilters, country: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="GB">UK</SelectItem>
                      <SelectItem value="AE">UAE</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={mediaFilters.status} onValueChange={(value) => setMediaFilters({ ...mediaFilters, status: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Layers className="w-4 h-4 mr-2" />
                    Bulk Assign Service/Page
                  </Button>
                  <Button variant="outline" size="sm">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Alt Text
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Compliance Check
                  </Button>
                  <Dialog open={showMediaUploadDialog} onOpenChange={setShowMediaUploadDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Upload Media Asset</DialogTitle>
                        <DialogDescription>Upload and categorize media with service, page, and country bindings</DialogDescription>
                      </DialogHeader>
                      <MediaUploadForm 
                        onClose={() => setShowMediaUploadDialog(false)}
                        industries={industriesData}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMedia.map((asset) => (
                  <Card key={asset.asset_id} className="border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow">
                    {asset.media_category === 'Image' || asset.media_category === 'Video' ? (
                      <div className="aspect-video overflow-hidden bg-gray-100 relative">
                        <img src={asset.file_url} alt={asset.alt_text} className="w-full h-full object-cover" />
                        {asset.duration_sec && (
                          <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                            {asset.duration_sec}s
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video overflow-hidden bg-gray-100 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <CardContent className="p-3">
                      <div className="flex gap-1 mb-2">
                        <Badge variant="outline" className="text-xs">{asset.media_category}</Badge>
                        <Badge className={`text-xs ${asset.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {asset.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-2 mb-2">{asset.alt_text}</div>
                      {asset.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {asset.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                          {asset.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{asset.tags.length - 2}</Badge>
                          )}
                        </div>
                      )}
                      <div className="space-y-1 text-xs text-gray-500">
                        {asset.Service_Name && <div>📦 {asset.Service_Name}</div>}
                        {asset.Industry_Name && <div>🏢 {asset.Industry_Name}</div>}
                        {asset.Country && <div>🌍 {asset.Country}</div>}
                        {asset.width_px && asset.height_px && (
                          <div>{asset.width_px} × {asset.height_px}</div>
                        )}
                        <div>{formatFileSize(asset.file_size_bytes)}</div>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Publishing Tab */}
            <TabsContent value="Publishing" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Bridge between CMS pages and Project Management workflows
                </p>
                <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                  <PlusSquare className="w-4 h-4 mr-2" />
                  Create Publishing Task
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Flow Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {publishingLinksData.map((link) => (
                      <TableRow key={link.Publishing_Link_ID}>
                        <TableCell className="text-sm">{link.Page_Name}</TableCell>
                        <TableCell className="text-sm text-gray-600">{link.Project_Name}</TableCell>
                        <TableCell className="text-sm text-gray-600">{link.Campaign_Name}</TableCell>
                        <TableCell className="text-sm">{link.Task_Name}</TableCell>
                        <TableCell>
                          <Badge className={getFlowStatusColor(link.Flow_Status)}>{link.Flow_Status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">{link.Last_Updated}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription className="text-blue-800 text-sm">
                  Publishing Links sync page status with Project Management tasks. Flow Status updates automatically when task status changes.
                </AlertDescription>
              </Alert>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="Templates" className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Allowed Components</TableHead>
                      <TableHead>Default</TableHead>
                      <TableHead>Theme</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templatesData.map((template) => (
                      <TableRow key={template.Template_ID}>
                        <TableCell>{template.Template_Name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {template.Allowed_Components.slice(0, 4).map((comp) => (
                              <Badge key={comp} variant="outline" className="text-xs">
                                {comp}
                              </Badge>
                            ))}
                            {template.Allowed_Components.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                {`+${template.Allowed_Components.length - 4}`}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {template.Is_Default ? (
                            <Badge className="bg-green-100 text-green-800">Default</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">{template.CSS_Token_Set}</TableCell>
                        <TableCell className="text-sm text-gray-600">{template.Notes}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Components Tab */}
            <TabsContent value="Components" className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Component
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component Name</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Reusable</TableHead>
                      <TableHead>Props Schema</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {componentsData.map((component) => (
                      <TableRow key={component.Component_ID}>
                        <TableCell>{component.Component_Name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">v{component.Version}</Badge>
                        </TableCell>
                        <TableCell>
                          {component.Is_Reusable ? (
                            <Badge className="bg-green-100 text-green-800">Yes</Badge>
                          ) : (
                            <Badge variant="outline">No</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {component.Props_Schema_JSON.substring(0, 40)}...
                          </code>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Redirects Tab */}
            <TabsContent value="Redirects" className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Add Redirect
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From URL</TableHead>
                      <TableHead>To URL</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {redirectsData.map((redirect) => (
                      <TableRow key={redirect.Redirect_ID}>
                        <TableCell className="text-sm font-mono text-gray-600">{redirect.From_URL}</TableCell>
                        <TableCell className="text-sm font-mono text-gray-600">{redirect.To_URL}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={redirect.Type === '301' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {redirect.Type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{redirect.Reason}</TableCell>
                        <TableCell className="text-sm">{redirect.Created_By}</TableCell>
                        <TableCell className="text-sm text-gray-600">{redirect.Created_At}</TableCell>
                        <TableCell>
                          {redirect.Is_Active ? (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          ) : (
                            <Badge variant="outline">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Locales Tab */}
            <TabsContent value="Locales" className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" className="bg-[#7A1C46] hover:bg-[#5A1434]">
                  <Globe className="w-4 h-4 mr-2" />
                  Add Locale
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page Name</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Localized URL</TableHead>
                      <TableHead>Canonical</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {localizationData.map((locale) => (
                      <TableRow key={locale.Loc_ID}>
                        <TableCell>{locale.Page_Name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{locale.Language}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{locale.Region}</Badge>
                        </TableCell>
                        <TableCell className="text-sm font-mono text-gray-600">{locale.Localized_URL}</TableCell>
                        <TableCell>
                          {locale.Is_Canonical_Locale ? (
                            <Badge className="bg-[#7A1C46] text-white">Canonical</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
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

function PageEditorForm({ onClose, industries, insightCategories }: { 
  onClose: () => void;
  industries: Industry[];
  insightCategories: InsightCategory[];
}) {
  const [formData, setFormData] = useState({
    page_name: '',
    title_seo: '',
    page_type: 'Service',
    service_id: '',
    subservice_l1: '',
    subservice_l2: '',
    subservice_l3: '',
    subservice_l4: '',
    industry_id: '',
    subindustry_l1: '',
    subindustry_l2: '',
    subindustry_l3: '',
    country: '',
    language: 'en-US',
    region: 'US',
    template_id: '',
    is_knowledge_linked: false,
    primary_insight_category: '',
    status: 'Draft',
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Page Name *</Label>
          <Input
            value={formData.page_name}
            onChange={(e) => setFormData({ ...formData, page_name: e.target.value })}
            placeholder="e.g., Technical SEO - Site Speed"
          />
        </div>

        <div className="space-y-2">
          <Label>SEO Title *</Label>
          <Input
            value={formData.title_seo}
            onChange={(e) => setFormData({ ...formData, title_seo: e.target.value })}
            placeholder="e.g., Site Speed Optimization Services"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Page Type *</Label>
          <Select value={formData.page_type} onValueChange={(value) => setFormData({ ...formData, page_type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Service">Service</SelectItem>
              <SelectItem value="Sub-Service">Sub-Service</SelectItem>
              <SelectItem value="Landing">Landing</SelectItem>
              <SelectItem value="Blog">Blog</SelectItem>
              <SelectItem value="Pillar">Pillar Page</SelectItem>
              <SelectItem value="HowTo">How-To Guide</SelectItem>
              <SelectItem value="Country-Regulation">Country Regulation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Template *</Label>
          <Select value={formData.template_id} onValueChange={(value) => setFormData({ ...formData, template_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TPL001">Service Detail</SelectItem>
              <SelectItem value="TPL002">Sub-Service</SelectItem>
              <SelectItem value="TPL003">Blog</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm mb-3">Service Hierarchy (up to 4 levels)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Main Service *</Label>
            <Select value={formData.service_id} onValueChange={(value) => setFormData({ ...formData, service_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SRV001">SEO Services</SelectItem>
                <SelectItem value="SRV002">Content Marketing</SelectItem>
                <SelectItem value="SRV003">Social Media Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sub-Service L1</Label>
            <Select value={formData.subservice_l1} onValueChange={(value) => setFormData({ ...formData, subservice_l1: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Optional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="SRV001-01">Technical SEO</SelectItem>
                <SelectItem value="SRV002-01">Content Strategy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sub-Service L2</Label>
            <Select value={formData.subservice_l2} onValueChange={(value) => setFormData({ ...formData, subservice_l2: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Optional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="SRV001-01-01">Site Speed Optimization</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sub-Service L3</Label>
            <Select value={formData.subservice_l3} onValueChange={(value) => setFormData({ ...formData, subservice_l3: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Optional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm mb-3">Industry Taxonomy (up to 3 sub-levels)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Industry</Label>
            <Select value={formData.industry_id} onValueChange={(value) => setFormData({ ...formData, industry_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Optional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {industries.filter(i => i.Depth_Level === 0).map(ind => (
                  <SelectItem key={ind.Industry_ID} value={ind.Industry_ID}>{ind.Industry_Name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sub-Industry L1</Label>
            <Select value={formData.subindustry_l1} onValueChange={(value) => setFormData({ ...formData, subindustry_l1: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Optional" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {industries.filter(i => i.Depth_Level === 1).map(ind => (
                  <SelectItem key={ind.Industry_ID} value={ind.Industry_ID}>{ind.Industry_Name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm mb-3">Location & Language</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Country (ISO2)</Label>
            <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Global" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Global</SelectItem>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="IN">India</SelectItem>
                <SelectItem value="GB">UK</SelectItem>
                <SelectItem value="AE">UAE</SelectItem>
                <SelectItem value="SG">Singapore</SelectItem>
                <SelectItem value="AU">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Language *</Label>
            <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="en-IN">English (India)</SelectItem>
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Region *</Label>
            <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="IN">India</SelectItem>
                <SelectItem value="GCC">GCC</SelectItem>
                <SelectItem value="EU">Europe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm mb-3">Knowledge Hub Integration</h4>
        <div className="flex items-center space-x-2 mb-3">
          <Switch
            checked={formData.is_knowledge_linked}
            onCheckedChange={(checked) => setFormData({ ...formData, is_knowledge_linked: checked })}
          />
          <Label>Link to Knowledge Hub / Insights</Label>
        </div>

        {formData.is_knowledge_linked && (
          <div className="space-y-2">
            <Label>Primary Insight Category *</Label>
            <Select value={formData.primary_insight_category} onValueChange={(value) => setFormData({ ...formData, primary_insight_category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {insightCategories.map(cat => (
                  <SelectItem key={cat.Category_ID} value={cat.Category_ID}>{cat.Category_Name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Status *</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <AlertDescription className="text-blue-800 text-sm">
          URL will be auto-generated from service hierarchy and slug. Sub-service levels must be contiguous (no gaps).
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} variant="outline" className="flex-1">
          <BookOpen className="w-4 h-4 mr-2" />
          Link Insights
        </Button>
        <Button onClick={onClose} variant="outline" className="flex-1">
          <Workflow className="w-4 h-4 mr-2" />
          Push to PM
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Create Page
        </Button>
      </div>
    </div>
  );
}

function InsightMappingForm({ onClose, insightCategories }: { 
  onClose: () => void;
  insightCategories: InsightCategory[];
}) {
  const [formData, setFormData] = useState({
    service_id: '',
    subservice_l1: '',
    subservice_l2: '',
    country: 'US',
    category_id: '',
    notes: '',
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Service *</Label>
          <Select value={formData.service_id} onValueChange={(value) => setFormData({ ...formData, service_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SRV001">SEO Services</SelectItem>
              <SelectItem value="SRV002">Content Marketing</SelectItem>
              <SelectItem value="SRV003">Social Media Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sub-Service L1</Label>
          <Select value={formData.subservice_l1} onValueChange={(value) => setFormData({ ...formData, subservice_l1: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="SRV001-01">Technical SEO</SelectItem>
              <SelectItem value="SRV002-01">Content Strategy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Country *</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">US</SelectItem>
              <SelectItem value="IN">India</SelectItem>
              <SelectItem value="GB">UK</SelectItem>
              <SelectItem value="AE">UAE</SelectItem>
              <SelectItem value="SG">Singapore</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Insight Category *</Label>
          <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {insightCategories.map(cat => (
                <SelectItem key={cat.Category_ID} value={cat.Category_ID}>{cat.Category_Name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Add notes about this mapping..."
          rows={3}
        />
      </div>

      <Alert className="border-purple-200 bg-purple-50">
        <AlertDescription className="text-purple-800 text-sm">
          After creating the mapping, you can attach content from the Content Repository (pillars, how-to guides, ebooks, etc.)
        </AlertDescription>
      </Alert>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Create Mapping
        </Button>
      </div>
    </div>
  );
}

function MediaUploadForm({ onClose, industries }: { 
  onClose: () => void;
  industries: Industry[];
}) {
  const [formData, setFormData] = useState({
    media_category: 'Image',
    service_id: '',
    page_id: '',
    country: '',
    industry_id: '',
    alt_text: '',
    caption: '',
    tags: '',
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>File *</Label>
        <Input type="file" accept="*/*" />
        <p className="text-xs text-gray-500">Properties like size, dimensions, duration will be auto-extracted</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Media Category *</Label>
          <Select value={formData.media_category} onValueChange={(value) => setFormData({ ...formData, media_category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Image">Image</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
              <SelectItem value="Document">Document</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Vector">Vector</SelectItem>
              <SelectItem value="Presentation">Presentation</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Country</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional / Global" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Global</SelectItem>
              <SelectItem value="US">US</SelectItem>
              <SelectItem value="IN">India</SelectItem>
              <SelectItem value="GB">UK</SelectItem>
              <SelectItem value="AE">UAE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Service</Label>
          <Select value={formData.service_id} onValueChange={(value) => setFormData({ ...formData, service_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="SRV001">SEO Services</SelectItem>
              <SelectItem value="SRV002">Content Marketing</SelectItem>
              <SelectItem value="SRV003">Social Media Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Industry</Label>
          <Select value={formData.industry_id} onValueChange={(value) => setFormData({ ...formData, industry_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Optional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {industries.filter(i => i.Depth_Level === 0).map(ind => (
                <SelectItem key={ind.Industry_ID} value={ind.Industry_ID}>{ind.Industry_Name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Page</Label>
        <Select value={formData.page_id} onValueChange={(value) => setFormData({ ...formData, page_id: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Optional - Link to specific page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="PAGE001">Technical SEO - Site Speed Optimization</SelectItem>
            <SelectItem value="PAGE002">Healthcare SEO Compliance</SelectItem>
            <SelectItem value="PAGE003">SaaS Content Marketing Guide</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Alt Text</Label>
        <Input
          value={formData.alt_text}
          onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
          placeholder="Descriptive alt text for accessibility"
        />
      </div>

      <div className="space-y-2">
        <Label>Caption</Label>
        <Textarea
          value={formData.caption}
          onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          placeholder="Optional caption"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags (comma-separated)</Label>
        <Input
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="e.g., seo, analytics, dashboard"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={onClose} variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button onClick={onClose} className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          <Upload className="w-4 h-4 mr-2" />
          Upload Asset
        </Button>
      </div>
    </div>
  );
}

function SEOMetaForm({ seoData }: { seoData: SEOMeta }) {
  const [h2List, setH2List] = useState(seoData.H2_List.join('\n'));
  const [faqList, setFAQList] = useState(seoData.Focus_Questions_FAQ.join('\n'));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title Tag * (60-65 chars)</Label>
        <Input defaultValue={seoData.Title_Tag} maxLength={65} />
        <p className="text-xs text-gray-500">{seoData.Title_Tag.length} / 65 characters</p>
      </div>

      <div className="space-y-2">
        <Label>Meta Description * (155-165 chars)</Label>
        <Textarea defaultValue={seoData.Meta_Description} maxLength={165} rows={3} />
        <p className="text-xs text-gray-500">{seoData.Meta_Description.length} / 165 characters</p>
      </div>

      <div className="space-y-2">
        <Label>H1 *</Label>
        <Input defaultValue={seoData.H1} />
      </div>

      <div className="space-y-2">
        <Label>H2 List (one per line)</Label>
        <Textarea value={h2List} onChange={(e) => setH2List(e.target.value)} rows={4} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>OG Title</Label>
          <Input defaultValue={seoData.OG_Title} />
        </div>

        <div className="space-y-2">
          <Label>Twitter Card</Label>
          <Select defaultValue={seoData.Twitter_Card}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summary">Summary</SelectItem>
              <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>OG Description</Label>
        <Textarea defaultValue={seoData.OG_Description} rows={2} />
      </div>

      <div className="space-y-2">
        <Label>Focus Questions (FAQ - one per line)</Label>
        <Textarea value={faqList} onChange={(e) => setFAQList(e.target.value)} rows={4} />
        <p className="text-xs text-gray-500">Used to auto-generate FAQPage JSON-LD schema</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Alt Text Coverage %</Label>
          <Input type="number" defaultValue={seoData.Alt_Coverage_Percent} min="0" max="100" />
        </div>

        <div className="space-y-2">
          <Label>Last Audited</Label>
          <Input type="date" defaultValue={seoData.Last_Audited} disabled />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Keyword Density Notes</Label>
        <Textarea defaultValue={seoData.Keyword_Density_Notes} rows={2} />
      </div>

      <div className="flex gap-2 pt-4">
        <Button variant="outline" className="flex-1">
          Run SEO Audit
        </Button>
        <Button variant="outline" className="flex-1">
          Generate FAQ JSON-LD
        </Button>
        <Button className="flex-1 bg-[#7A1C46] hover:bg-[#5A1434]">
          Save
        </Button>
      </div>
    </div>
  );
}
