from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    
    # Tells it to automatically load values from .env file. 
    model_config = SettingsConfigDict(env_file="backend\\.env", env_file_encoding='utf-8')
    
    secret_key: SecretStr  # It will catch all the Uppercase variable
    algorithm: str = 'HS256' 
    access_token_expire_minutes: int = 50
    
    max_upload_size_bytes: int = 5 * 1024 * 1024 # maximum file size for 5mb
    
    # Database details 
    # db_user: str 
    # db_password : str 
    # db_name : str 
    # db_host: str 
    # db_port:str 
    
    database_url: str
    ollama_api_key:str
    
    
    
# It will first look at the variable from system environment
# If they are not exist in the system env, hen will look through the .env file
# If neither of them exist, then it will use the default value we set in the class (in our case like secret_key would be needed as there is no default value)
    

settings = Settings() # type: ignore[call-arg] # Loaded from .env file

# print(settings.db_user)