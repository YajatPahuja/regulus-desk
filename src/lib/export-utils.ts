// Simple export utilities without external dependencies
// For production use, install: npm install xlsx jspdf jspdf-autotable

import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

export interface ExportData {
  [key: string]: any;
}

export const exportToCSV = (data: ExportData[], filename: string = 'export') => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that contain commas, quotes, or newlines
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data: ExportData[], filename: string = 'export') => {
  if (!data || data.length === 0) return;

  const doc = new jsPDF();
  
  // Get headers from the first data object
  const headers = Object.keys(data[0]);
  
  // Convert data to array format for the table
  const tableData = data.map(row => 
    headers.map(header => {
      const value = row[header];
      // Convert any value to string and truncate if too long
      return String(value || '').substring(0, 50);
    })
  );

  // Add title
  doc.setFontSize(16);
  doc.text(filename, 14, 22);
  
  // Add table
  (doc as any).autoTable({
    head: [headers],
    body: tableData,
    startY: 30,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 30 },
  });

  // Save the PDF
  doc.save(`${filename}.pdf`);
};

export const exportToExcel = (data: ExportData[], filename: string = 'export') => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const worksheet = data.map(row => 
    headers.map(header => row[header])
  );
  
  // Add headers as first row
  worksheet.unshift(headers);

  const workbook = {
    SheetNames: ['Sheet1'],
    Sheets: {
      'Sheet1': {
        '!ref': `A1:${String.fromCharCode(65 + headers.length - 1)}${data.length + 1}`,
        ...worksheet.reduce((acc, row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            const cellAddress = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
            acc[cellAddress] = { v: cell };
          });
          return acc;
        }, {} as any)
      }
    }
  };

  // Convert to CSV for now (since we don't have xlsx installed)
  // In production, you would use: XLSX.writeFile(workbook, `${filename}.xlsx`);
  exportToCSV(data, filename);
};

// Export metadata interface
export interface ExportMetadata {
  title: string;
  description: string;
  author: string;
  subject: string;
  keywords: string[];
  createdDate: string;
  dataSource: string;
  version: string;
}

// Default metadata for ComplianceHub
export const defaultMetadata: ExportMetadata = {
  title: 'ComplianceHub Report',
  description: 'Generated report from ComplianceHub SEBI Monitoring System',
  author: 'ComplianceHub Technologies',
  subject: 'SEBI Compliance Report',
  keywords: ['SEBI', 'Compliance', 'Financial', 'Monitoring', 'Report'],
  createdDate: new Date().toISOString(),
  dataSource: 'ComplianceHub System',
  version: '1.0.0'
};

// Specific export functions for different report types
export const exportSEBIRules = (rules: any[]) => {
  return {
    excel: () => exportToExcel(rules, 'SEBI Rules'),
    csv: () => exportToCSV(rules, 'SEBI Rules'),
    pdf: () => exportToPDF(rules, 'SEBI Rules')
  };
};

export const exportBrokerDetails = (brokers: any[]) => {
  return {
    excel: () => exportToExcel(brokers, 'Broker Details'),
    csv: () => exportToCSV(brokers, 'Broker Details'),
    pdf: () => exportToPDF(brokers, 'Broker Details')
  };
};

export const exportClientReports = (clients: any[]) => {
  return {
    excel: () => exportToExcel(clients, 'Client Reports'),
    csv: () => exportToCSV(clients, 'Client Reports'),
    pdf: () => exportToPDF(clients, 'Client Reports')
  };
};

export const exportFeesCollected = (fees: any[]) => {
  return {
    excel: () => exportToExcel(fees, 'Fees Collected'),
    csv: () => exportToCSV(fees, 'Fees Collected'),
    pdf: () => exportToPDF(fees, 'Fees Collected')
  };
};

export const exportAlerts = (alerts: any[]) => {
  return {
    excel: () => exportToExcel(alerts, 'System Alerts'),
    csv: () => exportToCSV(alerts, 'System Alerts'),
    pdf: () => exportToPDF(alerts, 'System Alerts')
  };
};
