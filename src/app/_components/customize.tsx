'use client';
import { setColor, setName } from '@/store/slices/state';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';



const Customize = () => {

  const Dispatch = useDispatch()
  const { Name: chatbotName, Color: chatbotColor } = useSelector((state: any) => state.chatBot)
  // Predefined color options
  const colorOptions = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#8b5cf6', // Purple
    '#ec4899', // Pink
  ];


  let formData = new FormData();
  // Handle document upload
  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      formData.append('file', file);
      // try {
      //   const response = await axios.post(`https://e7fa-2401-4900-1c68-ab18-b3a8-8800-bf8f-f867.ngrok-free.app/process?do_ocr=true&do_table_structure=true&do_cell_matching=true&collection_name=${chatbotName}`, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //   console.log(response)
      //   if (response.status === 200) {
      //     console.log('File uploaded successfully:', response);
      //   } else {
      //     console.error('Error uploading file:', response);
      //   }
      // } catch (error) {
      //   console.error('Error uploading file:', error);
      // }
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Chatbot Name:', chatbotName);
    console.log('Chatbot Color:', chatbotColor);
    console.log('Document:', formData);
  }
  return (
    <form onSubmit={handleSubmit} className="h-full p-6 bg-gray-100 overflow-y-auto">
      {/* Chatbot in 5 Minutes */}
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Chatbot in 5 Minutes
      </h1>

      <h2 className="text-2xl font-bold mb-6">Customize Chatbot</h2>

      {/* Chatbot Name */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-2">Chatbot Name</label>
        <input type="text" required onChange={(e) => { Dispatch(setName(e.target.value)); }}
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
        ${chatbotColor === color ? 'border-black' : 'border-transparent'}`} onClick={() => Dispatch(setColor(color))}
            />
          ))}
        </div>
      </div>

      {/* Document Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Upload Document</label>
        <input required type="file" accept=".pdf" onChange={handleDocumentUpload} className="w-full p-2 border rounded-lg" />
      </div>
      <div className="mt-4">
        <a href="https://www.ilovepdf.com/powerpoint_to_pdf" target="_blank" rel="noopener noreferrer"
          className="text-sm border bg-slate-300 p-2 rounded-sm text-blue-500">
          Convert to PDF
        </a>
      </div>
      <button className='bg-blue-500 text-white p-2 rounded-lg mt-6'>
        Submit
      </button>
    </form>
  )
}

export default Customize
