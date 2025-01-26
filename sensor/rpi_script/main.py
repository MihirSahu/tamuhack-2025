import requests
import time

# Cloudflare Worker URL
WORKER_URL = "https://ai-worker.2002mihir.workers.dev"

while True:
    data = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "value": 42.0  # Example sensor data
    }
    response = requests.post(WORKER_URL, json=data)
    print(f"Server response: {response.text}")
    time.sleep(10)  # Send data every 10 seconds