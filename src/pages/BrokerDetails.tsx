import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, FileText, Phone, Mail, MapPin, Download } from 'lucide-react';
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
import { exportBrokerDetails } from '@/lib/export-utils';
import { useToast } from '@/hooks/use-toast';

const brokerData = [
  {
    id: 'ZER001',
    name: 'Stocks_Analysis',
    regNo: 'SEBI/123456/2020',
    activeClients: 12500000,
    complianceScore: 96.5,
    lastAudit: '2024-11-15',
    status: 'Active'
  },
  {
    id: 'UPS001',
    name: 'Ahuja_Sellers',
    regNo: 'SEBI/789012/2019',
    activeClients: 8200000,
    complianceScore: 94.2,
    lastAudit: '2024-10-28',
    status: 'Active'
  },
  {
    id: 'ANG001',
    name: 'khurana_Enterprises',
    regNo: 'SEBI/345678/2018',
    activeClients: 6800000,
    complianceScore: 92.8,
    lastAudit: '2024-11-02',
    status: 'Active'
  },
  {
    id: 'GRW001',
    name: 'Rare Enterprises',
    regNo: 'SEBI/901234/2021',
    activeClients: 4500000,
    complianceScore: 95.1,
    lastAudit: '2024-10-20',
    status: 'Active'
  },
  {
    id: 'ICI001',
    name: 'Thapar',
    regNo: 'SEBI/567890/2015',
    activeClients: 3200000,
    complianceScore: 89.4,
    lastAudit: '2024-09-15',
    status: 'Under Review'
  }
];

const getScoreBadge = (score: number) => {
  if (score >= 95) return <Badge className="bg-success text-success-foreground">Excellent</Badge>;
  if (score >= 90) return <Badge className="bg-primary text-primary-foreground">Good</Badge>;
  if (score >= 85) return <Badge className="bg-warning text-warning-foreground">Fair</Badge>;
  return <Badge variant="destructive">Poor</Badge>;
};

const BrokerDetails: React.FC = () => {
  const { toast } = useToast();

  const handleExport = (format: 'excel' | 'csv' | 'pdf') => {
    try {
      const exportFunc = exportBrokerDetails(brokerData);
      const result = exportFunc[format]();
      
      if (result.success) {
        toast({
          title: `Export successful`,
          description: `${format.toUpperCase()} file downloaded: ${result.filename}`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Export failed",
        description: `Failed to export ${format.toUpperCase()} file: ${error.message}`,
        variant: "destructive",
      });
    }
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
          <h1 className="text-3xl font-bold text-foreground">Client Details</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor registered Clients
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search Clients..."
              className="pl-10 w-64 bg-background"
            />
          </div>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="mr-2 w-4 h-4" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <FileText className="mr-2 w-4 h-4" />
            Export PDF
          </Button>
          <Button variant="professional">Add New Client</Button>
        </div>
      </motion.div>

      {/* Featured Broker Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-border/50 bg-gradient-subtle">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Featured Client Profile</CardTitle>
            <CardDescription>Detailed view of top-performing Client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    T
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Tiet</h3>
                    <p className="text-muted-foreground">Registration No: SEBI/123456/2020</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {getScoreBadge(96.5)}
                      <Badge variant="outline">12.5M Active Clients</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Contact Information</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>+91 80 4040 2020</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>compliance@gmail.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Bangalore, Karnataka</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Compliance History</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Audit:</span>
                        <span className="text-foreground">Nov 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Violations (YTD):</span>
                        <span className="text-success">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Response Time:</span>
                        <span className="text-foreground">4.2 hrs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 w-4 h-4" />
                  View Full Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    const singleBroker = [brokerData[0]]; // Export the featured broker
                    const exportFunc = exportBrokerDetails(singleBroker);
                    exportFunc.pdf();
                  }}
                >
                  <FileText className="mr-2 w-4 h-4" />
                  Download Report
                </Button>
                <Button variant="secondary" className="w-full">
                  Send Notification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Brokers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">All Registered Clients</CardTitle>
            <CardDescription>Complete list of SEBI registered Clients</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Registration No</TableHead>
                  <TableHead>Active Clients</TableHead>
                  <TableHead>Compliance Score</TableHead>
                  <TableHead>Last Audit Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brokerData.map((broker, index) => (
                  <TableRow key={broker.id}>
                    <TableCell className="font-medium">{broker.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center text-white text-xs font-bold">
                          {broker.name.charAt(0)}
                        </div>
                        <span className="font-medium">{broker.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{broker.regNo}</TableCell>
                    <TableCell>
                      {(broker.activeClients / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{broker.complianceScore}%</span>
                        {getScoreBadge(broker.complianceScore)}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(broker.lastAudit).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={broker.status === 'Active' ? 'default' : 'secondary'}>
                        {broker.status}
                      </Badge>
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

export default BrokerDetails;
