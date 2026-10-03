import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfThumbnail = ({ file }) => {
  return (
    <Document 
      file={file}
      loading={<div className="flex items-center justify-center h-full text-xs text-[#cea605]">Loading PDF Preview...</div>}
      error={<div className="flex items-center justify-center h-full text-xs text-gray-500">PDF Document</div>}
    >
      <Page pageNumber={1} width={300} renderTextLayer={false} renderAnnotationLayer={false} />
    </Document>
  );
};

export default PdfThumbnail;
