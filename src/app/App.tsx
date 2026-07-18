import { useState } from 'react';
import { Home, Database, Briefcase, FileText, FolderOpen, Rocket, BarChart3, Settings, Plug, List, Server, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import CMSHub from './components/CMSHub';
import ProjectsAndCampaigns from './components/ProjectsAndCampaigns';
import WeeklyDashboard from './components/WeeklyDashboard';
import AdminConfig from './components/AdminConfig';
import IntegrationsHub from './components/IntegrationsHub';
import SystemVariablesHub from './components/SystemVariablesHub';
import BackendManagementHub from './components/BackendManagementHub';
import HomeOverview from './components/HomeOverview';
import MasterDataHub from './components/MasterDataHub';
import ServiceHubNew from './components/ServiceHubNew';
import WorkingRepositoryHub from './components/WorkingRepositoryHub';
import NewServiceWizard from './components/NewServiceWizard';

type Route = 
  | 'MM_Home' 
  | 'Master_Hub'
  | 'Services_Hub'
  | 'CMS_Hub'
  | 'WR_Hub' 
  | 'Wizard_NewService'
  | 'PM_Hub'
  | 'DB_Weekly'
  | 'Admin_Config'
  | 'Integrations_Hub'
  | 'System_Variables'
  | 'Backend_Management';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('MM_Home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (currentRoute) {
      case 'MM_Home':
        return <HomeOverview onNavigate={setCurrentRoute} />;
      case 'Master_Hub':
        return <MasterDataHub onNavigate={setCurrentRoute} />;
      case 'Services_Hub':
        return <ServiceHubNew onNavigate={setCurrentRoute} />;
      case 'CMS_Hub':
        return <CMSHub />;
      case 'WR_Hub':
        return <WorkingRepositoryHub onNavigate={setCurrentRoute} />;
      case 'Wizard_NewService':
        return <NewServiceWizard onNavigate={setCurrentRoute} />;
      case 'PM_Hub':
        return <ProjectsAndCampaigns onNavigate={setCurrentRoute} />;
      case 'DB_Weekly':
        return <WeeklyDashboard onNavigate={setCurrentRoute} />;
      case 'Admin_Config':
        return <AdminConfig onNavigate={setCurrentRoute} />;
      case 'Integrations_Hub':
        return <IntegrationsHub onNavigate={setCurrentRoute} />;
      case 'System_Variables':
        return <SystemVariablesHub onNavigate={setCurrentRoute} />;
      case 'Backend_Management':
        return <BackendManagementHub onNavigate={setCurrentRoute} />;
      default:
        return <HomeOverview onNavigate={setCurrentRoute} />;
    }
  };

  const navItems = [
    { route: 'MM_Home' as Route, label: 'Overview', icon: Home },
    { route: 'Master_Hub' as Route, label: 'Master Data', icon: Database },
    { route: 'Services_Hub' as Route, label: 'Services', icon: Briefcase },
    { route: 'CMS_Hub' as Route, label: 'CMS', icon: FileText },
    { route: 'WR_Hub' as Route, label: 'Working Repo', icon: FolderOpen },
    { route: 'PM_Hub' as Route, label: 'Projects', icon: Rocket },
    { route: 'DB_Weekly' as Route, label: 'Dashboard', icon: BarChart3 },
    { route: 'Admin_Config' as Route, label: 'Admin', icon: Settings },
    { route: 'Integrations_Hub' as Route, label: 'Integrations', icon: Plug },
    { route: 'System_Variables' as Route, label: 'System Variables', icon: List },
    { route: 'Backend_Management' as Route, label: 'Backend Management', icon: Server },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Sidebar Navigation */}
        <aside 
          className={`bg-white border-r border-gray-200 flex flex-col fixed h-screen transition-all duration-300 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Logo/Brand */}
          <div className={`p-6 border-b border-gray-200 ${sidebarCollapsed ? 'px-4' : ''}`}>
            {!sidebarCollapsed ? (
              <>
                <h1 className="text-[#7A1C46]">Beetloop Marketing</h1>
                <p className="text-gray-500 text-sm mt-1">Marketing Control Center</p>
              </>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-[#7A1C46] rounded-lg flex items-center justify-center" style={{ borderRadius: '12px' }}>
                  <span className="text-white font-bold">BM</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className={`space-y-1 ${sidebarCollapsed ? 'px-2' : 'px-3'}`}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.route}
                    onClick={() => setCurrentRoute(item.route)}
                    className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all w-full ${
                      currentRoute === item.route
                        ? 'bg-[#7A1C46] text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{ borderRadius: '12px' }}
                    title={sidebarCollapsed ? item.label : ''}
                  >
                    <Icon className="w-5 h-5" />
                    {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className={`p-4 border-t border-gray-200 ${sidebarCollapsed ? 'px-2' : ''}`}>
            {!sidebarCollapsed ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>Admin User</span>
              </div>
            ) : (
              <div className="flex justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
        </aside>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`fixed top-6 bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:bg-gray-50 transition-all z-50 ${
            sidebarCollapsed ? 'left-24' : 'left-[272px]'
          }`}
          style={{ borderRadius: '12px' }}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Main Content Area */}
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-20' : 'ml-64'
          }`}
        >
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}