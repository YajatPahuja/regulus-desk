import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X, Filter, Search, Bell, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const alertsData = [
  {
    id: 'ALT001',
    type: 'Rule Violation',
    broker: 'ICICI Direct',
    severity: 'Critical',
    message: 'Margin limit exceeded by 25% for client CLI003',
    date: '2024-12-01T14:30:00',
    status: 'Open',
    priority: 'High'
  },
  {
    id: 'ALT002',
    type: 'Broker Suspended',
    broker: 'Delta Securities',
    severity: 'Critical',
    message: 'Trading privileges suspended due to non-compliance',
    date: '2024-12-01T12:15:00',
    status: 'Acknowledged',
    priority: 'Critical'
  },
  {
    id: 'ALT003',
    type: 'Missing File Submission',
    broker: 'Angel One',
    severity: 'Warning',
    message: 'Monthly compliance report overdue by 2 days',
    date: '2024-12-01T09:45:00',
    status: 'Open',
    priority: 'Medium'
  },
  {
    id: 'ALT004',
    type: 'System Alert',
    broker: 'Zerodha',
    severity: 'Info',
    message: 'Unusual trading volume detected - automated review triggered',
    date: '2024-12-01T08:20:00',
    status: 'Resolved',
    priority: 'Low'
  },
  {
    id: 'ALT005',
    type: 'KYC Violation',
    broker: 'Upstox',
    severity: 'Warning',
    message: 'Client KYC documentation incomplete for 15 accounts',
    date: '2024-11-30T16:30:00',
    status: 'In Progress',
    priority: 'Medium'
  },
  {
    id: 'ALT006',
    type: 'Audit Finding',
    broker: 'Groww',
    severity: 'Warning',
    message: 'Minor discrepancy found in trade settlement records',
    date: '2024-11-30T14:10:00',
    status: 'Open',
    priority: 'Medium'
  }
];

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'Warning':
      return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
    case 'Info':
      return <Badge className="bg-primary text-primary-foreground">Info</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Open':
      return <Badge variant="destructive">Open</Badge>;
    case 'In Progress':
      return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
    case 'Acknowledged':
      return <Badge className="bg-primary text-primary-foreground">Acknowledged</Badge>;
    case 'Resolved':
      return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Rule Violation':
      return <AlertTriangle className="w-4 h-4 text-destructive" />;
    case 'Broker Suspended':
      return <X className="w-4 h-4 text-destructive" />;
    case 'Missing File Submission':
      return <Clock className="w-4 h-4 text-warning" />;
    case 'System Alert':
      return <Bell className="w-4 h-4 text-primary" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
  }
};

const Alerts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = 
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.broker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const criticalCount = alertsData.filter(a => a.severity === 'Critical' && a.status === 'Open').length;
  const warningCount = alertsData.filter(a => a.severity === 'Warning' && a.status === 'Open').length;
  const totalOpen = alertsData.filter(a => a.status === 'Open').length;

  const handleDismissAlert = (alertId: string) => {
    // In a real app, this would make an API call
    console.log(`Dismissing alert: ${alertId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor compliance violations and system notifications
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Bell className="mr-2 w-4 h-4" />
            Settings
          </Button>
          <Button variant="professional">
            <CheckCircle2 className="mr-2 w-4 h-4" />
            Mark All Read
          </Button>
        </div>
      </motion.div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="hover-lift border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Critical Alerts</p>
                  <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
                  <p className="text-xs font-medium text-muted-foreground">Immediate attention required</p>
                </div>
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="hover-lift border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold text-warning">{warningCount}</p>
                  <p className="text-xs font-medium text-muted-foreground">Review recommended</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="hover-lift border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Open</p>
                  <p className="text-2xl font-bold text-foreground">{totalOpen}</p>
                  <p className="text-xs font-medium text-muted-foreground">Active alerts</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="hover-lift border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-success">8</p>
                  <p className="text-xs font-medium text-muted-foreground">+3 from yesterday</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search alerts by message, broker, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                  <SelectItem value="Info">Info</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alerts Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Alert Dashboard</CardTitle>
            <CardDescription>
              Showing {filteredAlerts.length} of {alertsData.length} alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Broker</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id} className={alert.severity === 'Critical' ? 'bg-destructive/5' : ''}>
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(alert.type)}
                        <span className="text-sm">{alert.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{alert.broker}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm truncate" title={alert.message}>
                        {alert.message}
                      </p>
                    </TableCell>
                    <TableCell>
                      {getSeverityBadge(alert.severity)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(alert.date).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(alert.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {alert.status === 'Open' && (
                          <>
                            <Button variant="outline" size="sm">
                              Acknowledge
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDismissAlert(alert.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {alert.status === 'Acknowledged' && (
                          <Button variant="secondary" size="sm">
                            Resolve
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Alerts;