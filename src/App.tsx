import React, { useState } from "react";
import PdfEditor from "pdf-editor-component";

function Loader({onUpload, onName}: {onUpload: (file: File) => void, onName: (name: string) => void}){
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if(file) {
      onUpload(file);
      onName(file.name);
      console.log("PDF CARICATO")
    }

  };

  return(
    <>
    <div className="flex justify-center">
      test flusso pdf editor
    </div>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <label
        htmlFor="pdf-upload"
        className="cursor-pointer flex flex-col items-center gap-4 p-10 border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-8m0 0l-4 4m4-4l4 4m4 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
          />
        </svg>

        <span className="text-gray-600 font-medium text-sm">
          Carica un file PDF
        </span>

        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
    </>
  )
}

function Form({ pdfName, onClose }: { pdfName: string | null, onClose: () => void }) {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-800 text-xl font-semibold">Create</h2>
          <button
            onClick={onClose}
            aria-label="Close form"
            className="text-gray-500 hover:text-gray-700 font-bold text-xl leading-none"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16v-8m0 0l-4 4m4-4l4 4m4 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
            />
          </svg>
          <span className="text-gray-800 font-medium truncate">{pdfName || "Documento senza nome"}</span>
        </div>

        <div className="mb-5">
          <label htmlFor="tokenName" className="block text-gray-700 font-medium mb-1">
            Tokenization name
          </label>
          <input
            id="tokenName"
            type="text"
            placeholder="Type the name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 text-gray-800 focus:outline-none focus:border-purple-600 transition"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Write the Description"
            className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 text-gray-800 focus:outline-none focus:border-purple-600 transition resize-none"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="folder" className="block text-gray-700 font-medium mb-1">
            Assign it to a folder
          </label>
          <select
            id="folder"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-purple-600 transition"
            defaultValue="No Folder"
          >
            <option>No Folder</option>
          </select>
        </div>

        <div className="flex items-center mb-6">
          <label htmlFor="storage" className="flex items-center text-gray-700 font-medium cursor-pointer select-none">
            <input
              id="storage"
              type="checkbox"
              className="mr-2 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            Storage
          </label>
        </div>

        <button
          type="button"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md py-3 transition"
        >
          Generate Token
        </button>
      </div>
    </div>
  );
}

function App() {
  const [uploadedPdf, setUploadedPdf] = useState<File | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const handlePdfModified = (pdf: Blob) => {
    setShowForm(true);
  };

  return (
    <div className="bg-gray-100 p-4">
      
        {uploadedPdf ? (
          showForm ? (
            <Form pdfName={pdfName} />
          ) : (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
              <div className="bg-white rounded-3xl shadow-lg w-[80vw] h-[80vh] overflow-hidden flex items-center justify-center">
                <PdfEditor pdfFile={uploadedPdf} handleExport={handlePdfModified} />
              </div>
            </div>
          )
        ) : (
         <Loader onUpload={setUploadedPdf} onName={setPdfName} />
        )}
    </div>
  );
}

export default App;
