import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, Calendar, CheckCircle2, Clock, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
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
import { useToast } from '@/hooks/use-toast';

const submissionData = [
  {
    id: 'FS001',
    fileName: 'Monthly_Compliance_Report_Nov2024.pdf',
    broker: 'Zerodha',
    uploadedBy: 'compliance@zerodha.com',
    date: '2024-11-30T16:45:00',
    status: 'Approved',
    fileSize: '2.4 MB',
    type: 'Compliance Report'
  },
  {
    id: 'FS002',
    fileName: 'Risk_Assessment_Q4_2024.csv',
    broker: 'Upstox',
    uploadedBy: 'risk@upstox.com',
    date: '2024-11-28T14:20:00',
    status: 'Under Review',
    fileSize: '1.8 MB',
    type: 'Risk Assessment'
  },
  {
    id: 'FS003',
    fileName: 'Client_KYC_Updates_December.xlsx',
    broker: 'Angel One',
    uploadedBy: 'kyc@angelone.in',
    date: '2024-12-01T09:15:00',
    status: 'Pending',
    fileSize: '5.2 MB',
    type: 'KYC Update'
  },
  {
    id: 'FS004',
    fileName: 'Audit_Response_Nov2024.pdf',
    broker: 'Groww',
    uploadedBy: 'audit@groww.in',
    date: '2024-11-25T11:30:00',
    status: 'Rejected',
    fileSize: '3.1 MB',
    type: 'Audit Response'
  },
  {
    id: 'FS005',
    fileName: 'Trade_Settlement_Report_Nov.csv',
    broker: 'ICICI Direct',
    uploadedBy: 'settlement@icicidirect.com',
    date: '2024-11-29T13:45:00',
    status: 'Approved',
    fileSize: '12.5 MB',
    type: 'Settlement Report'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Approved':
      return <Badge className="bg-success text-success-foreground">Approved</Badge>;
    case 'Under Review':
      return <Badge className="bg-warning text-warning-foreground">Under Review</Badge>;
    case 'Pending':
      return <Badge className="bg-primary text-primary-foreground">Pending</Badge>;
    case 'Rejected':
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return <FileText className="w-4 h-4 text-destructive" />;
    case 'csv':
    case 'xlsx':
      return <FileText className="w-4 h-4 text-success" />;
    default:
      return <FileText className="w-4 h-4 text-muted-foreground" />;
  }
};

const FileSubmission: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    broker: '',
    submissionType: '',
    description: ''
  });
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      const validFiles = files.filter(file => {
        const validTypes = ['application/pdf', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024; // 50MB limit
      });
      
      if (validFiles.length !== files.length) {
        toast({
          title: "Invalid files detected",
          description: "Only PDF, CSV, and Excel files under 50MB are allowed.",
          variant: "destructive"
        });
      }
      
      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => {
        const validTypes = ['application/pdf', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024;
      });
      
      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to submit.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.broker || !formData.submissionType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate file upload
    toast({
      title: "Files submitted successfully",
      description: `${selectedFiles.length} file(s) uploaded for ${formData.broker}`,
    });

    // Reset form
    setSelectedFiles([]);
    setFormData({ broker: '', submissionType: '', description: '' });
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
          <h1 className="text-3xl font-bold text-foreground">File Submission</h1>
          <p className="text-muted-foreground mt-1">
            Submit compliance documents to SEBI portal
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 w-4 h-4" />
            Templates
          </Button>
          <Button variant="professional">
            <Calendar className="mr-2 w-4 h-4" />
            Schedule Submission
          </Button>
        </div>
      </motion.div>

      {/* Upload Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Upload New Files</CardTitle>
            <CardDescription>Submit compliance documents directly to SEBI portal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="broker">Broker *</Label>
                  <Select value={formData.broker} onValueChange={(value) => setFormData(prev => ({ ...prev, broker: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select broker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Zerodha">Zerodha</SelectItem>
                      <SelectItem value="Upstox">Upstox</SelectItem>
                      <SelectItem value="Angel One">Angel One</SelectItem>
                      <SelectItem value="Groww">Groww</SelectItem>
                      <SelectItem value="ICICI Direct">ICICI Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="submissionType">Submission Type *</Label>
                  <Select value={formData.submissionType} onValueChange={(value) => setFormData(prev => ({ ...prev, submissionType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Compliance Report">Compliance Report</SelectItem>
                      <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
                      <SelectItem value="KYC Update">KYC Update</SelectItem>
                      <SelectItem value="Audit Response">Audit Response</SelectItem>
                      <SelectItem value="Settlement Report">Settlement Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Optional description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>

              {/* File Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept=".pdf,.csv,.xlsx"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center text-white mx-auto">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      Drag and drop files here, or <span className="text-primary">browse</span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Supports PDF, CSV, and Excel files up to 50MB each
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Selected Files</h4>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.name)}
                          <div>
                            <p className="font-medium text-foreground">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit" variant="professional">
                  <Upload className="mr-2 w-4 h-4" />
                  Submit to SEBI
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Submission History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Submission History</CardTitle>
            <CardDescription>Recent file submissions and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File ID</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Broker</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissionData.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getFileIcon(submission.fileName)}
                        <div>
                          <p className="font-medium text-sm">{submission.fileName}</p>
                          <p className="text-xs text-muted-foreground">{submission.fileSize}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{submission.broker}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{submission.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {submission.uploadedBy}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(submission.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(submission.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        {submission.status === 'Rejected' && (
                          <Button variant="outline" size="sm">
                            Resubmit
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

export default FileSubmission;