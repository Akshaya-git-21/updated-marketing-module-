import { Home, Database, FolderOpen, Rocket, BarChart3, Settings, Plug } from 'lucide-react';
import HomeOverview from '../HomeOverview';
import MasterDataHub from '../MasterDataHub';
import WorkingRepositoryHub from '../WorkingRepositoryHub';
import ProjectsAndCampaigns from '../ProjectsAndCampaigns';
import WeeklyDashboard from '../WeeklyDashboard';
import AdminConfig from '../AdminConfig';
import IntegrationsHub from '../IntegrationsHub';
import { useState } from 'react';

type Route = 
  | 'MM_Home' 
  | 'Master_Hub' 
  | 'WR_Hub' 
  | 'PM_Hub'
  | 'DB_Weekly'
  | 'Admin_Config'
  | 'Integrations_Hub';

interface TeamLeadDashboardProps {
  userEmail: string;
  userName: string;
}

export default function TeamLeadDashboard({ userEmail, userName }: TeamLeadDashboardProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>('MM_Home');

  const renderContent = () => {
    switch (currentRoute) {
      case 'MM_Home':
        return <HomeOverview onNavigate={setCurrentRoute} />;
      case 'Master_Hub':
        return <MasterDataHub onNavigate={setCurrentRoute} />;
      case 'WR_Hub':
        return <WorkingRepositoryHub onNavigate={setCurrentRoute} />;
      case 'PM_Hub':
        return <ProjectsAndCampaigns onNavigate={setCurrentRoute} />;
      case 'DB_Weekly':
        return <WeeklyDashboard onNavigate={setCurrentRoute} />;
      case 'Admin_Config':
        return <AdminConfig onNavigate={setCurrentRoute} />;
      case 'Integrations_Hub':
        return <IntegrationsHub onNavigate={setCurrentRoute} />;
      default:
        return <HomeOverview onNavigate={setCurrentRoute} />;
    }
  };

  const navItems = [
    { route: 'MM_Home' as Route, label: 'Overview', icon: Home },
    { route: 'Master_Hub' as Route, label: 'Master Data', icon: Database },
    { route: 'WR_Hub' as Route, label: 'Working Repo', icon: FolderOpen },
    { route: 'PM_Hub' as Route, label: 'Projects', icon: Rocket },
    { route: 'DB_Weekly' as Route, label: 'Dashboard', icon: BarChart3 },
    { route: 'Admin_Config' as Route, label: 'Admin', icon: Settings },
    { route: 'Integrations_Hub' as Route, label: 'Integrations', icon: Plug },
  ];

  return (
    <>
      {/* Full access to all modules - Team Lead sees everything */}
      <div className="mb-4">
        <div className="bg-[#7A1C46] text-white px-4 py-2 rounded-lg inline-flex items-center gap-2">
          <span className="text-sm">👑 Team Lead Access</span>
          <span className="text-sm opacity-75">|</span>
          <span className="text-sm">{userName}</span>
        </div>
      </div>
      {renderContent()}
    </>
  );
}
