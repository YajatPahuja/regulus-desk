import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, DollarSign, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  delay: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, change, changeType, icon, delay }) => {
  const changeColor = 
    changeType === 'positive' ? 'text-success' : 
    changeType === 'negative' ? 'text-destructive' : 
    'text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="hover-lift cursor-pointer border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className={`text-xs font-medium ${changeColor}`}>
                {change}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SummaryCards: React.FC = () => {
  const cards = [
    {
      title: 'Active Clients',
      value: '248',
      change: '+12 this month',
      changeType: 'positive' as const,
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-5 from last week',
      changeType: 'positive' as const,
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      title: 'Total Fees Collected',
      value: '₹42.5L',
      change: '+18% from last month',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Compliance Score',
      value: '94.5%',
      change: '+2.1% this quarter',
      changeType: 'positive' as const,
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <SummaryCard
          key={card.title}
          {...card}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default SummaryCards;