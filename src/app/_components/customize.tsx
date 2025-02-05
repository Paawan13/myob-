'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


interface CustomizeProps {
  setChatbotName: (name: string) => void;
  chatbotName: string;
  chatbotColor: string;
  setChatbotColor: (color: string) => void;
}

const Customize: React.FC<CustomizeProps> = ({ setChatbotColor, setChatbotName, chatbotColor, chatbotName }) => {

  // Predefined color options
  const colorOptions = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#8b5cf6', // Purple
    '#ec4899', // Pink
  ];


  // Handle document upload
  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Uploaded file:', file.name);

      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(`https://415b-2401-4900-1c66-75af-eabe-a6d8-6b41-2101.ngrok-free.app/process?do_ocr=true&do_table_structure=true&do_cell_matching=true&collection_name=${chatbotName}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response)
        if (response.status === 200) {
          console.log('File uploaded successfully:', response);
        } else {
          console.error('Error uploading file:', response);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  return (
    <div className="h-full p-6 bg-gray-100 overflow-y-auto">
      {/* Chatbot in 5 Minutes */}
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Chatbot in 5 Minutes
      </h1>

      <h2 className="text-2xl font-bold mb-6">Customize Chatbot</h2>

      {/* Chatbot Name */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-2">Chatbot Name</label>
        <input type="text" value={chatbotName} onChange={(e) => setChatbotName(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter chatbot name"
        />
      </div>

      {/* Chatbot Color */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-2">Chatbot Color</label>
        <div className="flex gap-2">
          {colorOptions.map((color) => (
            <button key={color} style={{ backgroundColor: color }} className={`w-8 h-8 rounded-full border-2
        ${chatbotColor === color ? 'border-black' : 'border-transparent'}`} onClick={() => setChatbotColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Document Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Upload Document</label>
        <input type="file" accept=".pdf" onChange={handleDocumentUpload} className="w-full p-2 border rounded-lg" />
      </div>
      <div className="mt-4">
        <a href="https://www.ilovepdf.com/powerpoint_to_pdf" target="_blank" rel="noopener noreferrer"
          className="text-sm border bg-slate-300 p-2 rounded-sm text-blue-500">
          Convert to PDF
        </a>
      </div>
    </div>
  )
}

export default Customize
