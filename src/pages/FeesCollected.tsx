import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Download, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { exportFeesCollected } from '@/lib/export-utils';
import { useToast } from '@/hooks/use-toast';

// Monthly fees data
const monthlyFeesData = [
  { month: 'Jan', fees: 320000, transactions: 18500 },
  { month: 'Feb', fees: 285000, transactions: 16200 },
  { month: 'Mar', fees: 410000, transactions: 23800 },
  { month: 'Apr', fees: 385000, transactions: 21600 },
  { month: 'May', fees: 465000, transactions: 28400 },
  { month: 'Jun', fees: 520000, transactions: 31200 },
  { month: 'Jul', fees: 485000, transactions: 27800 },
  { month: 'Aug', fees: 510000, transactions: 29600 },
  { month: 'Sep', fees: 475000, transactions: 26400 },
  { month: 'Oct', fees: 530000, transactions: 32100 },
  { month: 'Nov', fees: 580000, transactions: 34800 },
  { month: 'Dec', fees: 620000, transactions: 37200 }
];

// Broker-wise fees data
const brokerFeesData = [

];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--success))'];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Paid':
      return <Badge className="bg-success text-success-foreground">Paid</Badge>;
    case 'Pending':
      return <Badge className="bg-warning text-warning-foreground">Pending</Badge>;
    case 'Overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const FeesCollected: React.FC = () => {
  const { toast } = useToast();
  const totalFees = brokerFeesData.reduce((sum, broker) => sum + broker.feesCollected, 0);
  const yearlyTotal = monthlyFeesData.reduce((sum, month) => sum + month.fees, 0);

  const handleExport = (format: 'excel' | 'csv' | 'pdf') => {
    try {
      // Create fees data for export
      const feesData = brokerFeesData.map(broker => ({
        brokerId: broker.id,
        brokerName: broker.name,
        feeType: 'Regulatory Fee',
        amount: broker.feesCollected,
        dueDate: broker.dueDate,
        status: broker.status,
        collectionDate: broker.status === 'Paid' ? new Date().toISOString() : null,
      }));
      
      const exportFunc = exportFeesCollected(feesData);
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
          <h1 className="text-3xl font-bold text-foreground">Fees Collected</h1>
          <p className="text-muted-foreground mt-1">
            Track and monitor regulatory fees collection
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="mr-2 w-4 h-4" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <FileText className="mr-2 w-4 h-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <FileText className="mr-2 w-4 h-4" />
            Export PDF
          </Button>
          <Button variant="professional">
            <Calendar className="mr-2 w-4 h-4" />
            Set Reminders
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
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
                  <p className="text-sm font-medium text-muted-foreground">Total This Month</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{(totalFees / 100000).toFixed(1)}L
                  </p>
                  <p className="text-xs font-medium text-success">+18.5% from last month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                  <DollarSign className="w-6 h-6" />
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
                  <p className="text-sm font-medium text-muted-foreground">Yearly Total</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{(yearlyTotal / 10000000).toFixed(1)}Cr
                  </p>
                  <p className="text-xs font-medium text-success">+12.3% YoY growth</p>
                </div>
                <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center text-white">
                  <TrendingUp className="w-6 h-6" />
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Collection</p>
                  <p className="text-2xl font-bold text-foreground">₹13.2L</p>
                  <p className="text-xs font-medium text-warning">2 brokers pending</p>
                </div>
                <div className="w-12 h-12 bg-gradient-warning rounded-lg flex items-center justify-center text-white">
                  <Calendar className="w-6 h-6" />
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
                  <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                  <p className="text-2xl font-bold text-foreground">94.8%</p>
                  <p className="text-xs font-medium text-success">Above target</p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Monthly Fees Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Monthly Fees Collection Trend</CardTitle>
            <CardDescription>Regulatory fees collected across all brokers (2024)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyFeesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`₹${(value / 100000).toFixed(1)}L`, 'Fees Collected']}
                />
                <Bar dataKey="fees" radius={[4, 4, 0, 0]}>
                  {monthlyFeesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Broker-wise Fees Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="border-border/50">
          <CardContent>
            <Table>
              <TableHeader>
              </TableHeader>
              <TableBody>
                {brokerFeesData.map((broker, index) => (
                  <TableRow key={broker.brokerName}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center text-white text-xs font-bold">
                          {broker.brokerName.charAt(0)}
                        </div>
                        <span className="font-medium">{broker.brokerName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">
                      ₹{(broker.feesCollected / 100000).toFixed(1)}L
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-gradient-primary rounded-full" 
                            style={{ width: `${broker.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{broker.percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${broker.growth.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                        {broker.growth}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{broker.month}</TableCell>
                    <TableCell>
                      {getStatusBadge(broker.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {broker.status === 'Pending' && (
                          <Button variant="secondary" size="sm">
                            Send Reminder
                          </Button>
                        )}
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

export default FeesCollected;