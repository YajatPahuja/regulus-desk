import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Filter, FileText, Eye } from 'lucide-react';
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

const clientData = [
  {
    id: 'CLI001',
    name: 'Rajesh Kumar',
    pan: 'ABCDE1234F',
    brokerLinked: 'Zerodha',
    lastTradeDate: '2024-12-01',
    status: 'Active',
    marginUsed: '₹2,45,000',
    violations: 0
  },
  {
    id: 'CLI002', 
    name: 'Priya Sharma',
    pan: 'FGHIJ5678K',
    brokerLinked: 'Upstox',
    lastTradeDate: '2024-11-28',
    status: 'Active',
    marginUsed: '₹1,80,500',
    violations: 1
  },
  {
    id: 'CLI003',
    name: 'Arjun Patel',
    pan: 'KLMNO9012P',
    brokerLinked: 'Angel One',
    lastTradeDate: '2024-11-30',
    status: 'Suspended',
    marginUsed: '₹5,20,000',
    violations: 3
  },
  {
    id: 'CLI004',
    name: 'Sneha Reddy',
    pan: 'QRSTU3456V',
    brokerLinked: 'Groww',
    lastTradeDate: '2024-12-01',
    status: 'Active',
    marginUsed: '₹95,750',
    violations: 0
  },
  {
    id: 'CLI005',
    name: 'Vikram Singh',
    pan: 'WXYZ7890A',
    brokerLinked: 'ICICI Direct',
    lastTradeDate: '2024-11-25',
    status: 'Under Review',
    marginUsed: '₹3,15,200',
    violations: 2
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return <Badge className="bg-success text-success-foreground">Active</Badge>;
    case 'Suspended':
      return <Badge variant="destructive">Suspended</Badge>;
    case 'Under Review':
      return <Badge className="bg-warning text-warning-foreground">Under Review</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getViolationBadge = (violations: number) => {
  if (violations === 0) return <Badge className="bg-success text-success-foreground">Clean</Badge>;
  if (violations <= 2) return <Badge className="bg-warning text-warning-foreground">{violations} Minor</Badge>;
  return <Badge variant="destructive">{violations} Major</Badge>;
};

const ClientReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBroker, setSelectedBroker] = useState('all');

  const filteredClients = clientData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBroker = selectedBroker === 'all' || client.brokerLinked === selectedBroker;
    return matchesSearch && matchesBroker;
  });

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
          <h1 className="text-3xl font-bold text-foreground">Client Reports</h1>
          <p className="text-muted-foreground mt-1">
            Monitor client activity and compliance status
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 w-4 h-4" />
            Export Report
          </Button>
          <Button variant="professional">
            <FileText className="mr-2 w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by client name, PAN, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              <Select value={selectedBroker} onValueChange={setSelectedBroker}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by broker" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brokers</SelectItem>
                  <SelectItem value="Zerodha">Zerodha</SelectItem>
                  <SelectItem value="Upstox">Upstox</SelectItem>
                  <SelectItem value="Angel One">Angel One</SelectItem>
                  <SelectItem value="Groww">Groww</SelectItem>
                  <SelectItem value="ICICI Direct">ICICI Direct</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Report Generation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50 bg-gradient-subtle">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Report Generation</CardTitle>
            <CardDescription>Generate compliance reports for specific periods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <FileText className="w-6 h-6" />
                <div className="text-center">
                  <p className="font-medium">Daily Report</p>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </div>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <FileText className="w-6 h-6" />
                <div className="text-center">
                  <p className="font-medium">Weekly Report</p>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </div>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <FileText className="w-6 h-6" />
                <div className="text-center">
                  <p className="font-medium">Monthly Report</p>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Clients Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Client Database</CardTitle>
            <CardDescription>
              Showing {filteredClients.length} of {clientData.length} clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>PAN</TableHead>
                  <TableHead>Broker Linked</TableHead>
                  <TableHead>Last Trade Date</TableHead>
                  <TableHead>Margin Used</TableHead>
                  <TableHead>Violations</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client, index) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{client.pan}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.brokerLinked}</Badge>
                    </TableCell>
                    <TableCell>{new Date(client.lastTradeDate).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{client.marginUsed}</TableCell>
                    <TableCell>
                      {getViolationBadge(client.violations)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(client.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
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

export default ClientReports;