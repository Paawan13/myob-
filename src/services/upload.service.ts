import axios from 'axios';



export const uploadUrl = async ({ url, chatbotName }: { url: string, chatbotName: string }) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL_UPLOAD}/process_website?start_url=${url}&do_ocr=false&do_table_structure=false&do_cell_matching=false&collection_name=${chatbotName}`, { url }, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response.data;
};


export const uploadPpt = async ({ file, chatbotName }: { file: File, chatbotName: string }) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PPT_UPLOAD}/process-ppt?&languages=en&collection_name=${chatbotName}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const uploadPdf = async ({ file, chatbotName }: { file: File, chatbotName: string }) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_FILE_UPLOAD}/process?do_ocr=true&do_table_structure=true&do_cell_matching=true&collection_name=${chatbotName}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
