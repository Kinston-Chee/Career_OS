import uvicorn

if __name__ == '__main__':
    uvicorn.run('app.app:app', host="127.0.0.1", port=8001, reload=True)
    # uvicorn.run('app.app:app', host="127.0.0.1", port=settings.db_port, reload=True)