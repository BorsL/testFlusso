import React, { useState } from "react";
import PdfEditor from "pdf-editor-component";

function App() {
  const [uploadedPdf, setUploadedPdf] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUploadedPdf(file);
    console.log("PDF CARICATO")
  };

  const handlePdfModified = (pdf: Blob) => {
    console.log(pdf, "test")
  };

  return (
    <div className="bg-amber-600 p-4">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

        {uploadedPdf && (
        <PdfEditor pdfFile={uploadedPdf} handleExport={handlePdfModified} />
      )}
    </div>
  );
}

export default App;
