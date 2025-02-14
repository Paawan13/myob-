"use client"

import { setColor, setName } from "@/store/slices/state"
import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function ChatbotForm() {
  const [inputType, setInputType] = useState("website")
  const Dispatch = useDispatch()
  const { Name: chatbotName, Color: chatbotColor } = useSelector((state: any) => state.chatBot)
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const colors = [
    "#4B7BF5", // Blue
    "#F56565", // Red
    "#48BB78", // Green
    "#ED8936", // Orange
    "#9F7AEA", // Purple
    "#ED64A6", // Pink
  ]
  let formData = new FormData();
  // Handle document upload
  const handleDocumentUpload = async (files: any) => {
    if (files) {
      const file = files.target.files[0];
      console.log('File:', file);
      formData.append('file', file);
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_FILE_UPLOAD}/process?do_ocr=true&do_table_structure=true&do_cell_matching=true&collection_name=${chatbotName}`, formData, {
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
  // handle URL upload
  const handleURLUpload = async (e: any) => {
    if (e.target.value) {
      let url = encodeURIComponent(e.target.value);
      // console.log('URL:', e.target.value);
      // 'https://crimes-exception-casual-extraordinary.trycloudflare.com/process_website?start_url=https%3A%2F%2Fay2i.com%2F&do_ocr=false&do_table_structure=false&do_cell_matching=false&collection_name=fashion'
      console.log(`${process.env.NEXT_PUBLIC_API_URL_UPLOAD}/process_website?start_url=${url}&do_ocr=false&do_table_structure=false&do_cell_matching=false&collection_name=${chatbotName}`)
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL_UPLOAD}/process_website?start_url=${url}&do_ocr=false&do_table_structure=false&do_cell_matching=false&collection_name=${chatbotName}`)
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

  // Handle PPT upload
  const handlePptUpload = async (files: any) => {
    if (files) {
      const file = files.target.files[0];
      if (file) {
        formData.append('file', file);
      }
      // 'https://adolescent-minor-congo-somerset.trycloudflare.com/process-ppt?collection_name=trial&languages=en'
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PPT_UPLOAD}/process-ppt?&languages=en&collection_name=${chatbotName}`, formData, {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    switch (inputType) {
      case "website":
        handleURLUpload({ target: { value: websiteUrl } } as React.ChangeEvent<HTMLInputElement>);
        break;
      case "document":
        const documentEvent = {
          target: { files: [documentFile] }
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        handleDocumentUpload(documentEvent);
        break;
      case "powerpoint":
        const pptEvent = {
          target: { files: [pptFile] }
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        handlePptUpload(pptEvent);
        break
      default:
        break;
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl mb-10 font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Chatbot in 5 Minutes
        </h1>
        <form className="h-auto flex flex-col gap-2 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">Chatbot Name</label>
            <input
              required
              type="text"
              onChange={(e) => Dispatch(setName(e.target.value))}
              placeholder="Enter chatbot name"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="inputType" className="text-lg font-medium text-gray-700">
              Choose Input Type
            </label>
            <select
              id="inputType"
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            >
              <option value="website">Website URL</option>
              <option value="document">Upload Document</option>
              <option value="powerpoint">Upload PowerPoint</option>
            </select>
          </div>

          {inputType === "website" && (
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">Website URL</label>
              <input
                required
                type="url"
                onChange={(e: any) => { setWebsiteUrl(e.target.value) }}
                placeholder="https://your-website.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          )}

          {inputType === "document" && (
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">Upload Document</label>
              <input
                required
                type="file"
                onChange={(e: any) => setDocumentFile(e.target.files[0])}
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
            </div>
          )}

          {inputType === "powerpoint" && (
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-700">Upload PowerPoint</label>
              <input
                required
                onChange={(e: any) => setPptFile(e.target.files[0])}
                type="file"
                accept=".ppt,.pptx"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-1">Accepted formats: PPT, PPTX</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">Chatbot Color</label>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => Dispatch(setColor(color))}
                  className={`w-12 h-12 rounded-full transition-transform hover:scale-110 ${chatbotColor === color ? "ring-2 ring-offset-2 ring-blue-600" : ""
                    }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 text-white bg-blue-600 rounded-lg text-lg font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Create Chatbot
          </button>
        </form>
      </div>
    </div>
  )
}



