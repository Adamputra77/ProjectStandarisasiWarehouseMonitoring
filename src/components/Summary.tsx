import React from 'react';
import { QuantitativeState } from '../types';
import { quantitativeData } from '../data/checklistData';
import { Printer, Download } from 'lucide-react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SummaryProps {
  state: QuantitativeState;
  activeWarehouse?: string;
}

export default function Summary({ state, activeWarehouse = '' }: SummaryProps) {
  let totalAchievedScore = 0;
  let summaryBreakdown = quantitativeData.map(category => {
    let categoryMaxWeight = category.weight;
    let categoryScore = 0;

    category.items.forEach(item => {
      const itemState = state[item.id];
      if (itemState) {
        categoryScore += itemState.score * item.weight;
      }
    });

    totalAchievedScore += categoryScore;

    return {
      name: category.name,
      maxPossible: categoryMaxWeight * 4,
      achieved: categoryScore,
      percentage: (categoryScore / (categoryMaxWeight * 4)) * 100 || 0
    };
  });

  const MAX_TOTAL_SCORE = 4000;
  const overallPercentage = (totalAchievedScore / MAX_TOTAL_SCORE) * 100;

  let grade = 'POOR';
  let gradeColor = 'bg-red-500';
  let gradeBg = 'bg-red-50';
  let gradeText = 'text-red-700';

  if (totalAchievedScore >= 3601) {
    grade = 'EXCELLENT';
    gradeColor = 'bg-emerald-500';
    gradeBg = 'bg-emerald-50';
    gradeText = 'text-emerald-700';
  } else if (totalAchievedScore >= 2801) {
    grade = 'GOOD';
    gradeColor = 'bg-blue-500';
    gradeBg = 'bg-blue-50';
    gradeText = 'text-blue-700';
  } else if (totalAchievedScore >= 2001) {
    grade = 'FAIR';
    gradeColor = 'bg-yellow-500';
    gradeBg = 'bg-yellow-50';
    gradeText = 'text-yellow-700';
  }

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Laporan Inspeksi Warehouse", 14, 20);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Lokasi: ${activeWarehouse || 'Semua Area'}`, 14, 28);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 34);

    // Summary Section
    doc.setFont("helvetica", "bold");
    doc.text(`Total Score: ${totalAchievedScore} / ${MAX_TOTAL_SCORE} (${overallPercentage.toFixed(2)}%)`, 14, 44);
    doc.text(`Grade: ${grade}`, 14, 50);

    // Prepare table data
    const tableData: any[][] = [];
    
    quantitativeData.forEach(category => {
      // Category row
      tableData.push([
        { content: category.no, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
        { content: category.name, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
        { content: '', styles: { fillColor: [240, 240, 240] } },
        { content: '', styles: { fillColor: [240, 240, 240] } },
        { content: category.weight.toString(), styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } },
        { content: '', styles: { fillColor: [240, 240, 240] } }
      ]);
      
      // Items rows
      category.items.forEach(item => {
        const itemState = state[item.id];
        tableData.push([
          `  ${item.no}`,
          item.parameter,
          itemState?.status || 'NA',
          (itemState?.score || 0).toString(),
          item.weight.toString(),
          itemState?.notes || ''
        ]);
      });
    });

    autoTable(doc, {
      startY: 58,
      head: [['No', 'Parameter', 'Status', 'Score', 'Weight', 'Notes']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [10, 38, 71] },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 80 },
        2: { cellWidth: 15 },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 40 },
      }
    });

    doc.save(`Laporan_${activeWarehouse.replace(/\s+/g, '_') || 'Semua_Area'}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleExportExcel = () => {
    const excelData: any[] = [];
    
    quantitativeData.forEach(category => {
      // Add category row
      excelData.push({
        'Kategori / No': category.no,
        'Parameter': category.name,
        'Status': '',
        'Score': '',
        'Max Weight': category.weight,
        'Notes': ''
      });
      
      // Add items
      category.items.forEach(item => {
        const itemState = state[item.id];
        excelData.push({
          'Kategori / No': `  ${item.no}`,
          'Parameter': item.parameter,
          'Status': itemState?.status || 'NA',
          'Score': itemState?.score || 0,
          'Max Weight': item.weight,
          'Notes': itemState?.notes || ''
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Style adjustments for columns
    worksheet['!cols'] = [
      { wch: 15 },
      { wch: 40 },
      { wch: 10 },
      { wch: 10 },
      { wch: 15 },
      { wch: 50 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hasil Assessment");

    // Add Summary sheet
    const summaryData = [
      { 'Metrics': 'Warehouse', 'Value': activeWarehouse || 'Semua Area' },
      { 'Metrics': 'Tanggal cetak', 'Value': new Date().toLocaleDateString('id-ID') },
      { 'Metrics': '', 'Value': '' },
      { 'Metrics': 'Total Achieved Score', 'Value': totalAchievedScore },
      { 'Metrics': 'Max Possible Score', 'Value': MAX_TOTAL_SCORE },
      { 'Metrics': 'Overall Percentage', 'Value': `${overallPercentage.toFixed(2)}%` },
      { 'Metrics': 'Grade', 'Value': grade },
      { 'Metrics': '', 'Value': '' },
    ];
    
    summaryBreakdown.forEach(b => {
      summaryData.push({ 'Metrics': `Score: ${b.name}`, 'Value': `${b.achieved} / ${b.maxPossible}` })
    });

    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
    summaryWorksheet['!cols'] = [
      { wch: 30 },
      { wch: 30 },
    ];
    
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Summary");

    XLSX.writeFile(workbook, `Assessment_${activeWarehouse.replace(/\s+/g, '_') || 'Report'}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Summary Laporan</h2>
        <div className="flex space-x-3">
          <button 
            onClick={handleExportExcel}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors btn-ripple"
          >
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors btn-ripple"
          >
            <Printer className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="space-y-6 bg-transparent dark:bg-transparent print:bg-white print:text-black">
        {/* Added extra header for PDF export visibility only, otherwise it will just look normal */}
        <div className="hidden print:block mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 print:text-black">Laporan Inspeksi Warehouse</h1>
          <p className="text-gray-600 print:text-gray-800 mt-2">{activeWarehouse || 'Semua Area'}</p>
          <p className="text-gray-500 print:text-gray-600 text-sm">Dicetak pada: {new Date().toLocaleDateString('id-ID')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Overall Score Card */}
        <div className={`col-span-1 md:col-span-3 lg:col-span-1 p-6 rounded-2xl shadow-none dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] border ${gradeBg} dark:bg-dark-panel border-opacity-50 border-gray-200 dark:border-dark-border flex flex-col justify-center items-center text-center space-y-4 print:border-gray-300 print:bg-transparent print:shadow-none`}>
          <h2 className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-sm print:text-gray-600">Overall Score</h2>
          <div className="flex items-baseline space-x-2">
            <span className={`text-5xl font-bold ${gradeText}`}>{totalAchievedScore}</span>
            <span className="text-2xl text-gray-400 dark:text-gray-500 print:text-gray-600">/ 4000</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-3 mt-4 overflow-hidden print:bg-gray-200">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${gradeColor}`} 
              style={{ width: `${Math.min(100, Math.max(0, overallPercentage))}%`, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
            ></div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-dark-border w-full print:border-gray-300">
            <span className={`inline-block px-4 py-1.5 rounded-full font-bold tracking-widest text-white ${gradeColor}`} style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
              {grade}
            </span>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 bg-white dark:bg-dark-panel print:bg-white print:border-gray-300 p-6 rounded-2xl shadow-none border border-gray-100 dark:border-dark-border">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 print:text-black mb-6">Score Breakdown</h3>
          <div className="space-y-5">
            {summaryBreakdown.map((cat, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 print:text-gray-800">{cat.name}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 print:text-black">{cat.achieved} <span className="text-xs text-gray-400 dark:text-gray-500 print:text-gray-600">/ {cat.maxPossible}</span></span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-dark-bg rounded-full h-2 print:bg-gray-200">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-1000 print:bg-blue-600" 
                      style={{ width: `${Math.min(100, cat.percentage)}%`, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-dark-panel print:bg-white print:border-gray-300 p-6 rounded-xl shadow-none border border-gray-100 dark:border-dark-border">
        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 uppercase tracking-wider print:text-black">Score Scale Range</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 print:bg-red-50 text-red-800 dark:text-red-400 text-center border border-red-100 dark:border-red-900/30 print:border-red-200">
            <div className="font-bold text-lg mb-1" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>POOR</div>
            <div className="text-sm">0 - 2000</div>
          </div>
          <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 print:bg-yellow-50 text-yellow-800 dark:text-yellow-400 text-center border border-yellow-100 dark:border-yellow-900/30 print:border-yellow-200">
            <div className="font-bold text-lg mb-1" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>FAIR</div>
            <div className="text-sm">2001 - 2800</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 print:bg-blue-50 text-blue-800 dark:text-blue-400 text-center border border-blue-100 dark:border-blue-900/30 print:border-blue-200">
            <div className="font-bold text-lg mb-1" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>GOOD</div>
            <div className="text-sm">2801 - 3600</div>
          </div>
          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 print:bg-emerald-50 text-emerald-800 dark:text-emerald-400 text-center border border-emerald-100 dark:border-emerald-900/30 print:border-emerald-200">
            <div className="font-bold text-lg mb-1" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>EXCELLENT</div>
            <div className="text-sm">3601 - 4000</div>
          </div>
        </div>
      </div>
      
      </div>
    </div>
  );
}
