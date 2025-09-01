import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample data
const feesData = [
  { broker: 'Alpha Securities', fees: 85000, clients: 120 },
  { broker: 'Beta Trading', fees: 72000, clients: 95 },
  { broker: 'Gamma Invest', fees: 68000, clients: 110 },
  { broker: 'Delta Capital', fees: 59000, clients: 85 },
  { broker: 'Epsilon Finance', fees: 45000, clients: 70 },
];

const violationsData = [
  { month: 'Jan', violations: 12 },
  { month: 'Feb', violations: 8 },
  { month: 'Mar', violations: 15 },
  { month: 'Apr', violations: 6 },
  { month: 'May', violations: 9 },
  { month: 'Jun', violations: 4 },
];

const riskReturnData = [
  { risk: 0.05, return: 0.08, broker: 'Alpha Securities', size: 120 },
  { risk: 0.08, return: 0.12, broker: 'Beta Trading', size: 95 },
  { risk: 0.12, return: 0.15, broker: 'Gamma Invest', size: 110 },
  { risk: 0.15, return: 0.18, broker: 'Delta Capital', size: 85 },
  { risk: 0.18, return: 0.22, broker: 'Epsilon Finance', size: 70 },
  { risk: 0.22, return: 0.25, broker: 'Zeta Holdings', size: 60 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--success))'];

const Charts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Fees Collected Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="xl:col-span-2"
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fees Collected by Broker</CardTitle>
            <CardDescription>Monthly collection performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="broker" 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="fees" radius={[4, 4, 0, 0]}>
                  {feesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Violations Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Violations Trend</CardTitle>
            <CardDescription>Monthly compliance violations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={violationsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="violations" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk vs Return Scatter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="xl:col-span-3"
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Risk vs Return Analysis</CardTitle>
            <CardDescription>Broker performance quadrant (bubble size = client count)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={riskReturnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  dataKey="risk" 
                  name="Risk"
                  domain={[0, 0.25]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  type="number" 
                  dataKey="return" 
                  name="Return"
                  domain={[0, 0.3]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card p-3 border border-border rounded-lg shadow-lg">
                          <p className="font-medium">{data.broker}</p>
                          <p className="text-sm text-muted-foreground">
                            Risk: {(data.risk * 100).toFixed(1)}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Return: {(data.return * 100).toFixed(1)}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Clients: {data.size}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter dataKey="size" fill="hsl(var(--primary))" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Charts;