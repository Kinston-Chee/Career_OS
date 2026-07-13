
from ollama import chat, Client
from dotenv import load_dotenv
import os
from typing import List, Dict, Any
from pydantic import BaseModel



load_dotenv('backend\\.env')

api_key = os.getenv('OLLAMA_API_KEY')
# Set api_key = YOUR API KEY, if don't want to setup .env file

client = Client(host="https://ollama.com", headers={"Authorization": f"Bearer {api_key}"})


class OllamaParser():
    def __init__(self, client):
        self.client = client
        self.tools = []
    
    def set_model(self, model:str):
        self.model = model
        
    def set_message(self, message:List[Dict], output_format: Any = 'json'):
        self.content = message
        self.output_format = output_format
        
    def set_tools(self, *args):
        if len(args) > 0:
            self.tools = [tool for tool in args]
    
    def get_response(self):
        response = self.client.chat(
            model=self.model, 
            messages=self.content,
            format = self.output_format,
            tools=self.tools
        )
        return(response)

class UnacceptableFile(Exception):
    def __init__(self, message:str):
        super().__init__(message)
    

ollama_parser = OllamaParser(client=client)

