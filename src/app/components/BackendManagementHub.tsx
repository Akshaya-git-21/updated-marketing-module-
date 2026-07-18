import { useState } from 'react';
import { Database, Server, HardDrive, RefreshCw, Download, Upload, Trash2, Copy, Play, Pause, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';

interface DatabaseTable {
  Table_Name: string;
  Record_Count: number;
  Size_MB: number;
  Last_Updated: string;
  Status: string;
}

interface BackupInfo {
  Backup_ID: string;
  Backup_Name: string;
  Backup_Date: string;
  Size_MB: number;
  Type: string;
  Status: string;
}

export default function BackendManagementHub() {
  const [activeTab, setActiveTab] = useState('Database');

  const databaseTables: DatabaseTable[] = [
    { Table_Name: 'Services_Master', Record_Count: 156, Size_MB: 12.4, Last_Updated: '2024-10-30', Status: 'Healthy' },
    { Table_Name: 'Keywords_Master', Record_Count: 8942, Size_MB: 156.8, Last_Updated: '2024-10-30', Status: 'Healthy' },
    { Table_Name: 'Backlinks_Master', Record_Count: 15683, Size_MB: 289.3, Last_Updated: '2024-10-30', Status: 'Healthy' },
    { Table_Name: 'Competitors_Master', Record_Count: 342, Size_MB: 24.6, Last_Updated: '2024-10-30', Status: 'Healthy' },
    { Table_Name: 'Projects_Main', Record_Count: 89, Size_MB: 8.2, Last_Updated: '2024-10-30', Status: 'Healthy' },
    { Table_Name: 'Campaigns', Record_Count: 712, Size_MB: 45.3, Last_Updated: '2024-10-30', Status: 'Healthy' },
    { Table_Name: 'Tasks', Record_Count: 4256, Size_MB: 78.9, Last_Updated: '2024-10-30', Status: 'Healthy' },
    { Table_Name: 'Resources', Record_Count: 48, Size_MB: 2.1, Last_Updated: '2024-10-29', Status: 'Healthy' },
    { Table_Name: 'Target_Planner', Record_Count: 234, Size_MB: 15.6, Last_Updated: '2024-10-28', Status: 'Healthy' },
    { Table_Name: 'System_Variables', Record_Count: 156, Size_MB: 3.2, Last_Updated: '2024-10-28', Status: 'Healthy' },
  ];

  const backupHistory: BackupInfo[] = [
    { Backup_ID: 'BKP001', Backup_Name: 'Full_Backup_2024-10-30', Backup_Date: '2024-10-30 02:00', Size_MB: 642.5, Type: 'Full', Status: 'Completed' },
    { Backup_ID: 'BKP002', Backup_Name: 'Incremental_Backup_2024-10-29', Backup_Date: '2024-10-29 02:00', Size_MB: 89.3, Type: 'Incremental', Status: 'Completed' },
    { Backup_ID: 'BKP003', Backup_Name: 'Full_Backup_2024-10-27', Backup_Date: '2024-10-27 02:00', Size_MB: 635.2, Type: 'Full', Status: 'Completed' },
    { Backup_ID: 'BKP004', Backup_Name: 'Incremental_Backup_2024-10-26', Backup_Date: '2024-10-26 02:00', Size_MB: 76.8, Type: 'Incremental', Status: 'Completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Running': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRecords = databaseTables.reduce((sum, table) => sum + table.Record_Count, 0);
  const totalSize = databaseTables.reduce((sum, table) => sum + table.Size_MB, 0);

  return (
    <div className="p-6 space-y-6">
      <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#7A1C46]">Backend & Database Management</CardTitle>
              <p className="text-gray-600 mt-1">Monitor and manage Supabase database, backups, and system health</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                All Systems Operational
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="Database">Database</TabsTrigger>
              <TabsTrigger value="Backups">Backups</TabsTrigger>
              <TabsTrigger value="Performance">Performance</TabsTrigger>
              <TabsTrigger value="Maintenance">Maintenance</TabsTrigger>
            </TabsList>

            {/* Database Tab */}
            <TabsContent value="Database" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#7A1C46]">Database Tables</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Schema
                  </Button>
                </div>
              </div>

              {/* Database Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <Database className="w-8 h-8 mx-auto text-[#7A1C46] mb-2" />
                      <div className="text-2xl text-[#7A1C46]">{databaseTables.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Total Tables</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <HardDrive className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                      <div className="text-2xl text-blue-600">{totalRecords.toLocaleString()}</div>
                      <div className="text-xs text-gray-600 mt-1">Total Records</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <Server className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                      <div className="text-2xl text-purple-600">{totalSize.toFixed(1)} MB</div>
                      <div className="text-xs text-gray-600 mt-1">Total Size</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                      <div className="text-2xl text-green-600">100%</div>
                      <div className="text-xs text-gray-600 mt-1">Health Status</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tables List */}
              <div className="border rounded-lg overflow-hidden" style={{ borderRadius: '12px' }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Table Name</TableHead>
                      <TableHead>Record Count</TableHead>
                      <TableHead>Size (MB)</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseTables.map((table) => (
                      <TableRow key={table.Table_Name}>
                        <TableCell className="font-mono">{table.Table_Name}</TableCell>
                        <TableCell>{table.Record_Count.toLocaleString()}</TableCell>
                        <TableCell>{table.Size_MB.toFixed(1)}</TableCell>
                        <TableCell className="text-sm text-gray-600">{table.Last_Updated}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(table.Status)}>
                            {table.Status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Backups Tab */}
            <TabsContent value="Backups" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#7A1C46]">Backup History</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" style={{ borderRadius: '12px' }}>
                    <Upload className="w-4 h-4 mr-2" />
                    Restore Backup
                  </Button>
                  <Button className="bg-[#7A1C46] hover:bg-[#5A1434]" size="sm" style={{ borderRadius: '12px' }}>
                    <Play className="w-4 h-4 mr-2" />
                    Run Backup Now
                  </Button>
                </div>
              </div>

              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  Automatic backups are scheduled daily at 2:00 AM. Full backups every 3 days, incremental daily.
                  Backups are retained for 30 days.
                </AlertDescription>
              </Alert>

              {/* Backup Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-[#7A1C46]">{backupHistory.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Recent Backups</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-green-600">
                        {backupHistory[0]?.Backup_Date.split(' ')[0]}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Last Backup</div>
                    </div>
                  </CardContent>
                </Card>
                <Card style={{ borderRadius: '12px' }}>
                  <CardContent className="py-4">
                    <div className="text-center">
                      <div className="text-2xl text-blue-600">
                        {backupHistory.reduce((sum, b) => sum + b.Size_MB, 0).toFixed(1)} MB
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Total Backup Size</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Backup History Table */}
              <div className="border rounded-lg overflow-hidden" style={{ borderRadius: '12px' }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Backup ID</TableHead>
                      <TableHead>Backup Name</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Size (MB)</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backupHistory.map((backup) => (
                      <TableRow key={backup.Backup_ID}>
                        <TableCell className="font-mono text-xs">{backup.Backup_ID}</TableCell>
                        <TableCell>{backup.Backup_Name}</TableCell>
                        <TableCell className="text-sm text-gray-600">{backup.Backup_Date}</TableCell>
                        <TableCell>{backup.Size_MB.toFixed(1)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{backup.Type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(backup.Status)}>
                            {backup.Status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Upload className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="Performance" className="mt-6 space-y-4">
              <h3 className="text-[#7A1C46]">System Performance Metrics</h3>

              <div className="grid grid-cols-2 gap-6">
                <Card style={{ borderRadius: '12px' }}>
                  <CardHeader>
                    <CardTitle className="text-base">Database Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Query Response Time</span>
                        <span className="text-green-600">12ms</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage</span>
                        <span className="text-blue-600">23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage</span>
                        <span className="text-purple-600">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Storage Used</span>
                        <span className="text-orange-600">642.5 MB / 10 GB</span>
                      </div>
                      <Progress value={6.4} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ borderRadius: '12px' }}>
                  <CardHeader>
                    <CardTitle className="text-base">API Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Response Time</span>
                        <span className="text-green-600">45ms</span>
                      </div>
                      <Progress value={11} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Requests/Min</span>
                        <span className="text-blue-600">156</span>
                      </div>
                      <Progress value={31} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Error Rate</span>
                        <span className="text-green-600">0.02%</span>
                      </div>
                      <Progress value={0.02} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uptime</span>
                        <span className="text-green-600">99.98%</span>
                      </div>
                      <Progress value={99.98} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Maintenance Tab */}
            <TabsContent value="Maintenance" className="mt-6 space-y-4">
              <h3 className="text-[#7A1C46]">Database Maintenance</h3>

              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  Regular maintenance tasks help optimize database performance. Schedule these during low-traffic periods.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-6">
                <Card style={{ borderRadius: '12px' }}>
                  <CardHeader>
                    <CardTitle className="text-base">Optimization Tasks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderRadius: '12px' }}>
                      <div>
                        <div className="text-sm">Rebuild Indexes</div>
                        <div className="text-xs text-gray-600">Last run: 2024-10-28</div>
                      </div>
                      <Button size="sm" variant="outline" style={{ borderRadius: '12px' }}>
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderRadius: '12px' }}>
                      <div>
                        <div className="text-sm">Vacuum Tables</div>
                        <div className="text-xs text-gray-600">Last run: 2024-10-29</div>
                      </div>
                      <Button size="sm" variant="outline" style={{ borderRadius: '12px' }}>
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderRadius: '12px' }}>
                      <div>
                        <div className="text-sm">Update Statistics</div>
                        <div className="text-xs text-gray-600">Last run: 2024-10-30</div>
                      </div>
                      <Button size="sm" variant="outline" style={{ borderRadius: '12px' }}>
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ borderRadius: '12px' }}>
                  <CardHeader>
                    <CardTitle className="text-base">Cleanup Tasks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderRadius: '12px' }}>
                      <div>
                        <div className="text-sm">Clear Old Logs</div>
                        <div className="text-xs text-gray-600">Remove logs older than 90 days</div>
                      </div>
                      <Button size="sm" variant="outline" style={{ borderRadius: '12px' }}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        Clean
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderRadius: '12px' }}>
                      <div>
                        <div className="text-sm">Archive Old Data</div>
                        <div className="text-xs text-gray-600">Archive completed projects</div>
                      </div>
                      <Button size="sm" variant="outline" style={{ borderRadius: '12px' }}>
                        <Download className="w-3 h-3 mr-1" />
                        Archive
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg" style={{ borderRadius: '12px' }}>
                      <div>
                        <div className="text-sm">Delete Orphaned Records</div>
                        <div className="text-xs text-gray-600">Remove orphaned references</div>
                      </div>
                      <Button size="sm" variant="outline" style={{ borderRadius: '12px' }}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        Clean
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card className="border-[#E2E8F0]" style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <CardHeader>
          <CardTitle className="text-[#7A1C46] text-base">System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm">Database</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Provider:</span>
                  <span>Supabase PostgreSQL</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>PostgreSQL 15.1</span>
                </div>
                <div className="flex justify-between">
                  <span>Region:</span>
                  <span>US East</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm">Storage</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Total Allocated:</span>
                  <span>10 GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Used:</span>
                  <span>642.5 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Available:</span>
                  <span>9.37 GB</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm">Backup</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Schedule:</span>
                  <span>Daily 2:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Retention:</span>
                  <span>30 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Backup:</span>
                  <span>2024-10-30</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}