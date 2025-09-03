import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, FileText, Calendar, ChevronDown, ChevronRight, Download } from 'lucide-react';
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { exportSEBIRules } from '@/lib/export-utils';
import { useToast } from '@/hooks/use-toast';

const rulesData = [
  {
    id: 'SEBI-001',
    title: 'Margin Funding Requirements',
    effectiveDate: '2024-08-01',
    category: 'Risk Management',
    status: 'Active',
    severity: 'High',
    description: 'Updated margin requirements for retail investors with enhanced risk controls.',
    lastUpdated: '2024-11-15'
  },
  {
    id: 'SEBI-002', 
    title: 'Client Onboarding KYC Guidelines',
    effectiveDate: '2024-06-15',
    category: 'Compliance',
    status: 'Active',
    severity: 'Medium',
    description: 'Enhanced KYC procedures for new client registrations.',
    lastUpdated: '2024-10-20'
  },
  {
    id: 'SEBI-003',
    title: 'Trade Reporting Standards',
    effectiveDate: '2024-09-01',
    category: 'Reporting',
    status: 'Active',
    severity: 'High',
    description: 'New real-time trade reporting requirements for all brokers.',
    lastUpdated: '2024-11-30'
  },
  {
    id: 'SEBI-004',
    title: 'Digital Platform Security',
    effectiveDate: '2024-07-01',
    category: 'Technology',
    status: 'Active',
    severity: 'Critical',
    description: 'Mandatory cybersecurity measures for trading platforms.',
    lastUpdated: '2024-11-10'
  },
  {
    id: 'SEBI-005',
    title: 'Investor Grievance Resolution',
    effectiveDate: '2024-05-01',
    category: 'Customer Protection',
    status: 'Under Review',
    severity: 'Medium',
    description: 'Streamlined process for handling investor complaints.',
    lastUpdated: '2024-10-05'
  }
];

const recentUpdates = [
  {
    title: 'Margin Funding Rule Updated',
    description: 'New leverage limits effective August 2025 - All brokers must comply by Q1 2025',
    date: '2024-11-30',
    type: 'Rule Update',
    impact: 'High'
  },
  {
    title: 'Digital Security Enhancement',
    description: 'Additional two-factor authentication requirements for all trading platforms',
    date: '2024-11-25',
    type: 'Security',
    impact: 'Critical'
  },
  {
    title: 'Client Data Protection Amendment',
    description: 'Enhanced data privacy measures aligned with global standards',
    date: '2024-11-20',
    type: 'Privacy',
    impact: 'Medium'
  }
];

const getCategoryBadge = (category: string) => {
  const categoryColors: Record<string, string> = {
    'Risk Management': 'bg-critical text-critical-foreground',
    'Compliance': 'bg-primary text-primary-foreground',
    'Reporting': 'bg-secondary text-secondary-foreground',
    'Technology': 'bg-accent text-accent-foreground',
    'Customer Protection': 'bg-success text-success-foreground'
  };
  
  return (
    <Badge className={categoryColors[category] || 'bg-muted text-muted-foreground'}>
      {category}
    </Badge>
  );
};

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return <Badge variant="destructive">Critical</Badge>;
    case 'High':
      return <Badge className="bg-warning text-warning-foreground">High</Badge>;
    case 'Medium':
      return <Badge className="bg-primary text-primary-foreground">Medium</Badge>;
    default:
      return <Badge variant="secondary">Low</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return <Badge className="bg-success text-success-foreground">Active</Badge>;
    case 'Under Review':
      return <Badge className="bg-warning text-warning-foreground">Under Review</Badge>;
    case 'Draft':
      return <Badge variant="secondary">Draft</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const SEBIRules: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const filteredRules = rulesData.filter(rule => 
    rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rule.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRule = (ruleId: string) => {
    const newExpanded = new Set(expandedRules);
    if (newExpanded.has(ruleId)) {
      newExpanded.delete(ruleId);
    } else {
      newExpanded.add(ruleId);
    }
    setExpandedRules(newExpanded);
  };

  const handleExport = (format: 'excel' | 'csv' | 'pdf') => {
    try {
      const exportFunc = exportSEBIRules(filteredRules);
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
          <h1 className="text-3xl font-bold text-foreground">SEBI Rules & Guidelines</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with latest regulatory requirements
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
            <Shield className="mr-2 w-4 h-4" />
            Subscribe Updates
          </Button>
        </div>
      </motion.div>

      {/* Recent Updates Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-border/50 bg-gradient-subtle">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Shield className="mr-2 w-5 h-5" />
              Recent Rule Updates
            </CardTitle>
            <CardDescription>Important regulatory changes requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-card rounded-lg border border-border/50">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{update.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{update.type}</Badge>
                        {getSeverityBadge(update.impact)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{update.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(update.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search rules by title, category, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rules Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">All SEBI Rules & Guidelines</CardTitle>
            <CardDescription>
              Showing {filteredRules.length} of {rulesData.length} rules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule ID</TableHead>
                  <TableHead>Rule Title</TableHead>
                  <TableHead>Effective Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.map((rule) => (
                  <React.Fragment key={rule.id}>
                    <TableRow>
                      <TableCell className="font-medium">{rule.id}</TableCell>
                      <TableCell>
                        <Collapsible>
                          <CollapsibleTrigger
                            className="flex items-center space-x-2 hover:text-primary transition-colors"
                            onClick={() => toggleRule(rule.id)}
                          >
                            {expandedRules.has(rule.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            <span className="font-medium text-left">{rule.title}</span>
                          </CollapsibleTrigger>
                        </Collapsible>
                      </TableCell>
                      <TableCell>{new Date(rule.effectiveDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getCategoryBadge(rule.category)}</TableCell>
                      <TableCell>{getSeverityBadge(rule.severity)}</TableCell>
                      <TableCell>{getStatusBadge(rule.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRules.has(rule.id) && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-foreground mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground">{rule.description}</p>
                              </div>
                              <div className="flex items-center space-x-6 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Last Updated: </span>
                                  <span className="font-medium">{new Date(rule.lastUpdated).toLocaleDateString()}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Effective: </span>
                                  <span className="font-medium">{new Date(rule.effectiveDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2 pt-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    const singleRule = [rule];
                                    const exportFunc = exportSEBIRules(singleRule);
                                    exportFunc.pdf();
                                  }}
                                >
                                  <FileText className="mr-2 w-3 h-3" />
                                  Download PDF
                                </Button>
                                <Button variant="outline" size="sm">
                                  View Full Text
                                </Button>
                                <Button variant="outline" size="sm">
                                  Related Rules
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SEBIRules;