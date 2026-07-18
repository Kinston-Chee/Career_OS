from pdf2image import convert_from_path
from ollama import chat, Client
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from typing import Optional, List
import re
import json

from backend.utils.ollama_parser import ollama_parser, UnacceptableFile, OllamaParser


client = ollama_parser
model_name = 'gemma4:31b-cloud'

client.set_model(model_name)

def ResumeValidator():
    """
    Raise the UnacceptableFile error if the file passed in is not a resume
    """
    
    raise UnacceptableFile('The file uploaded is not a valid resume. Please upload a proper resume')

class ResumeInfo(BaseModel):
    name:str 
    age: Optional[int]
    education: List[str]
    skills: List[str]
    response_status:bool

class PdfExtractor():
    
    def __init__(self, client:OllamaParser, file_name):
        self.client = client
        self.pdf_path = f"backend\\local_data\\resumes\\{file_name}"
        
    def pdf2image(self):
       pages = convert_from_path(self.pdf_path, dpi=200)
       print('Converted PDF to Image \n')
       
       self.image_path_list = []
       for i, page in enumerate(pages):
            image_path = f"backend\\local_data\\resumes\\page_{i}.jpg"
            page.save(image_path, "JPEG")
            self.image_path_list.append(image_path)
            self.total_pages = i

    def get_info(self):
        message = [{
            'role':'user', 
            'content':"""
            
            Validate whether the file is a resume. If false, set the response_status as false and return empty value for other output format.
            
            If true, extract the following information from the resume: 
            1) Name
            2) Age
            3) Education Background
            4) Skills
            
            and set the response_status as true.
             
            """,
            'images':self.image_path_list}]
        self.client.set_message(message=message, output_format=ResumeInfo.model_json_schema())
        # self.client.set_tools(ResumeValidator)
        response = self.client.get_response()
        return(response)
       
       
def extract_json(content: str) -> str:
    # Strip ```json ... ``` or ``` ... ``` wrappers if present
    match = re.search(r"```(?:json)?\s*(.*?)\s*```", content, re.DOTALL)
    return match.group(1) if match else content

       
resume_extractor = PdfExtractor(client=client, file_name='Student Claim Form (2) (2).pdf')
resume_extractor.pdf2image()

result = extract_json(resume_extractor.get_info()['message']['content'])
result = json.loads(result)

print(type(result))

if result['response_status'] != True:
    raise UnacceptableFile('The file uploaded is not a valid resume. Please upload a proper resume')
else:
    print(result) 



# client.set_message([{
#             'role':'user', 
#             'content':"""
#              What is the capital of Australia
#             """}])

# print(client.get_response())

    
# load_dotenv('backend\\.env')

# api_key = os.getenv('OLLAMA_API_KEY')

# client = Client(host="https://ollama.com", headers={"Authorization": f"Bearer {api_key}"})

# response = client.chat(
#     model='gemma4:31b-cloud', 
#     messages=[{'role':'user', 'content':'What is the first internship of this candidate',
#                'images':["backend\\local_data\\page_0.jpg"]}]
# )

# print(response)

















# app/services/ocr_service.py
# import asyncio
# import logging
# import tempfile
# from concurrent.futures import ThreadPoolExecutor
# from pathlib import Path
# from typing import Optional

# import torch
# from transformers import AutoModel, AutoTokenizer

# logger = logging.getLogger(__name__)


# class DeepSeekOCRService:
#     """
#     Singleton wrapper around DeepSeek-OCR.
#     Load once at app startup, reuse across requests.
#     Inference is blocking/sync -> always run via executor from async routes.
#     """

#     _instance: Optional["DeepSeekOCRService"] = None

#     def __init__(self, model_name: str = "deepseek-ai/DeepSeek-OCR", device: str = "cuda"):
#         self.model_name = model_name
#         self.device = device
#         self.tokenizer = None
#         self.model = None
#         self._executor = ThreadPoolExecutor(max_workers=1)  # 1 worker = avoid GPU contention
#         self._loaded = False

#     def load(self):
#         """Blocking load — call once at startup, not per-request."""
#         if self._loaded:
#             return
#         logger.info(f"Loading {self.model_name}...")
#         self.tokenizer = AutoTokenizer.from_pretrained(
#             self.model_name, trust_remote_code=True
#         )
#         self.model = AutoModel.from_pretrained(
#             self.model_name,
#             _attn_implementation="flash_attention_2" if self.device == "cuda" else "eager",
#             trust_remote_code=True,
#             use_safetensors=True,
#         )
#         self.model = self.model.eval()
#         if self.device == "cuda":
#             self.model = self.model.cuda().to(torch.bfloat16)
#         self._loaded = True
#         logger.info("DeepSeek-OCR loaded.")

#     def _infer_sync(self, image_path: str, prompt: str, output_path: str) -> str:
#         """The actual blocking call — never call directly from async code."""
#         if not self._loaded:
#             raise RuntimeError("Model not loaded. Call load() at startup.")
#         result = self.model.infer(
#             self.tokenizer,
#             prompt=prompt,
#             image_file=image_path,
#             output_path=output_path,
#             base_size=1024,
#             image_size=768,
#             crop_mode=True,
#             save_results=True,
#         )
#         return result

#     async def infer(self, image_bytes: bytes, prompt: str = "<image>\nFree OCR.") -> str:
#         """Async-safe entry point for FastAPI routes."""
#         loop = asyncio.get_running_loop()
#         with tempfile.TemporaryDirectory() as tmp_dir:
#             image_path = Path(tmp_dir) / "input.jpg"
#             image_path.write_bytes(image_bytes)
#             try:
#                 result = await loop.run_in_executor(
#                     self._executor,
#                     self._infer_sync,
#                     str(image_path),
#                     prompt,
#                     tmp_dir,
#                 )
#                 return result
#             except Exception as e:
#                 logger.error(f"OCR inference failed: {e}")
#                 raise


# # Module-level singleton
# ocr_service = DeepSeekOCRService()