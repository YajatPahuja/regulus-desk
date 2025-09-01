import React from 'react';
import { motion } from 'framer-motion';
import SummaryCards from '@/components/dashboard/SummaryCards';
import Charts from '@/components/dashboard/Charts';

const Dashboard: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time compliance monitoring and analytics
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last updated</p>
          <p className="text-sm font-medium text-foreground">
            {new Date().toLocaleString()}
          </p>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Charts />
      </motion.div>
    </div>
  );
};

export default Dashboard;