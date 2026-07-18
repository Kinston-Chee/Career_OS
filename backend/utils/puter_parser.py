from litellm import completion
from dotenv import load_dotenv
import os

load_dotenv('utils\.env')

# response = completion(
#     model="openai/gpt-5.4-nano",
#     api_base=os.getenv('PUTER_API_BASE'),
#     api_key=os.getenv('PUTER_AUTH_TOKEN'),
#     messages=[
#         {"role": "user", "content": "Hello!"},
#     ],
# )

# print(response.choices[0].message.content)


# import os
# import requests

# def generate_elevenlabs_speech(text: str, output_filename: str = "output.mp3"):
#     # 1. Fetch your Puter Authentication Token 
#     puter_token = os.getenv("PUTER_AUTH_TOKEN")
#     if not puter_token:
#         raise ValueError("Please set the PUTER_AUTH_TOKEN environment variable.")

#     # 2. Target Puter's direct internal driver endpoint
#     url = "https://js.puter.com/v2/"
    
#     headers = {
#         "Authorization": f"Bearer {puter_token}",
#         "Content-Type": "application/json"
#     }
    
#     # 3. Define the configuration for ElevenLabs
#     payload = {
#         "interface": "puter-tts",
#         "method": "txt2speech",
#         "args": {
#             "text": text,
#             "provider": "elevenlabs",
#             "model": "eleven_multilingual_v2",  # Options: eleven_multilingual_v2, flash_v2_5
#             "voice": "21m00Tcm4TlvDq8ikWAM"      # Paste any ElevenLabs Voice ID here
#         }
#     }

#     print("Generating speech via Puter...")
#     response = requests.post(url, json=payload, headers=headers)

#     # 4. Handle and write out the binary stream
#     if response.status_code == 200:
#         # with open(output_filename, "wb") as f:
#         #     f.write(response.content)
#         # print(f"Success! Audio file saved as {output_filename}")
#         # print(response)
        
#         if response.headers.get('Content-Type', '').startswith('application/json') or len(response.content) < 500:
#                 print("⚠️ Warning: Received text data instead of an audio binary.")
#                 print(f"Server Response Text: {response.text}")
#         else:
#                 with open(output_filename, "wb") as f:
#                     f.write(response.content)
#                 print(f"🎉 Success! Audio file written to {output_filename} ({len(response.content)} bytes)")
#     else:
#         print(f"Error {response.status_code}: {response.text}")

# if __name__ == "__main__":
#     # Example usage
#     prompt_text = "Hello! This text is being processed by ElevenLabs completely serverless through Puter's API gateway."
#     generate_elevenlabs_speech(prompt_text)



# import os
# import asyncio
# from dotenv import load_dotenv
# from putergenai import PuterClient

# # 1. FIX: Add 'r' prefix to eliminate the Windows path syntax warning flag
# load_dotenv(r'utils\.env')

# async def generate_speech_via_sdk(text: str, output_filename: str = "output.mp3"):
#     puter_token = os.getenv("PUTER_AUTH_TOKEN")
#     if not puter_token:
#         raise ValueError("Please verify that PUTER_AUTH_TOKEN is present in your .env file.")

#     print("Initializing Puter SDK client wrapper...")
    
#     async with PuterClient(token=puter_token) as client:
#         try:
#             print("Invoking ElevenLabs engine via SDK...")
            
#             # 2. FIX: Explicitly inject 'puter-tts' as the first positional 'driver' argument
#             result = await client.drivers_call(
#                 interface="puter-tts",
#                 driver = "puter-tts",         # <-- The missing required driver positional argument
#                 method="txt2speech",
#                 args={
#                     "text": text,
#                     "provider": "elevenlabs",
#                     "model": "eleven_multilingual_v2",
#                     "voice": "21m00Tcm4TlvDq8ikWAM"
#                 }
#             )
            
#             # result = await client.ai_txt2speech(text, {
#             #         'provider':"elevenlabs",
#             #         'model': "eleven_multilingual_v2",
#             #         'voice': "21m00Tcm4TlvDq8ikWAM",
#             #         'output_format': "mp3_44100_128"
#             #     }
#             # )
            
#             # The SDK stores the binary data under response -> result or direct response
#             # Let's cleanly check where the byte data is populated
#             audio_bytes = None
#             if isinstance(result, dict):
#                 audio_bytes = result.get("response", {}).get("result") or result.get("result")
            
#             if audio_bytes:
#                 with open(output_filename, "wb") as f:
#                     f.write(audio_bytes)
#                 print(f"🎉 Success! Audio file saved to {output_filename} ({len(audio_bytes)} bytes)")
#             else:
#                 print("❌ Driver executed but couldn't locate raw byte structure.")
#                 print("Returned Payload Struct:", result)
                
#         except Exception as e:
#             print(f"❌ SDK Operational Failure: {str(e)}")

# if __name__ == "__main__":
#     asyncio.run(generate_speech_via_sdk("Hello! This is a test using the corrected Puter Python SDK wrapper."))


from http.server import HTTPServer, BaseHTTPRequestHandler

HTML = """<!DOCTYPE html>
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="play">Use ElevenLabs voice</button>
    <script>
        document.getElementById('play').addEventListener('click', async () => {
            const audio = await puter.ai.txt2speech(
                "Hello! This sample uses an ElevenLabs voice.",
                {
                    provider: "elevenlabs",
                    model: "eleven_multilingual_v2",
                    voice: "21m00Tcm4TlvDq8ikWAM",
                    output_format: "mp3_44100_128"
                }
            );
            audio.play();
        });
    </script>
</body>
</html>"""

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(HTML.encode())

import webbrowser
server = HTTPServer(("localhost", 8931), Handler)
webbrowser.open("http://localhost:8931")
print("Serving at http://localhost:8931 — Ctrl+C to stop")
server.serve_forever()