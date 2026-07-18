# import os
# print("HF_HOME:", os.environ.get("HF_HOME"))

# from huggingface_hub import constants
# print("HF cache dir:", constants.HF_HUB_CACHE)


# import torch
# from transformers import pipeline

# # 1. Define the model ID from Hugging Face Hub
# model_id = "openai/gpt-oss-20b"  # Swap with "openai/gpt-oss-20b" for the reasoning model

# # 2. Initialize the text generation pipeline
# # device_map="auto" automatically shifts the model to your GPU if VRAM allows
# generator = pipeline(
#     "text-generation", 
#     model=model_id, 
#     torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
#     device_map="auto"
# )

# # 3. Format your input prompt 
# prompt = "The future of artificial intelligence is"

# # 4. Generate the text locally
# print("Generating response...")
# results = generator(
#     prompt, 
#     max_new_tokens=50, 
#     num_return_sequences=1,
#     temperature=0.7,
#     do_sample=True
# )

# # 5. Print out the output
# print("\n--- Model Output ---")
# print(results[0]["generated_text"])



# from transformers import pipeline

# pipe = pipeline("image-text-to-text", model="lightonai/LightOnOCR-2-1B")
# messages = [
#     {
#         "role": "user",
#         "content": [
#             {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},
#             {"type": "text", "text": "What animal is on the candy?"}
#         ]
#     },
# ]
# pipe(text=messages)


import ollama

stream = ollama.chat(
    model='llama2',
    messages=[{'role': 'user', 'content': 'Tell me a short story.'}],
    stream=True,
)

for chunk in stream:
    print(chunk.message.content, end='', flush=True)