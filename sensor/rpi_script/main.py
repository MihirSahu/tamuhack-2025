import serial
import json
from pymongo import MongoClient
import time

# MongoDB Atlas Configuration
MONGO_URI = ""  # Replace with your connection string
DB_NAME = "sensor_data"
COLLECTION_NAME = "readings"

# Serial port configuration
SERIAL_PORT = "/dev/ttyACM0"  # Replace with your Arduino's port
BAUD_RATE = 9600  # Ensure this matches the baud rate set in your Arduino code
TIMEOUT = 1  # Timeout for serial read

# Open the serial port
ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=TIMEOUT)

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

print(f"Connected to MongoDB Atlas database: {DB_NAME}, collection: {COLLECTION_NAME}")
print(f"Reading data from Arduino on {SERIAL_PORT}. Press Ctrl+C to stop.")

try:
    while True:
        try:
            # Read a line of JSON data from the Arduino
            line = ser.readline().decode('utf-8').strip()
            if line:
                print(f"Received: {line}")  # Display the raw data in the terminal

                # Parse the JSON data
                data = json.loads(line)

                # Insert the data into MongoDB Atlas
                result = collection.insert_one(data)
                print(f"Inserted data with ID: {result.inserted_id}")

        except json.JSONDecodeError:
            print(f"Invalid JSON received: {line}")
        except KeyError as e:
            print(f"Missing key in received data: {e}")

        time.sleep(1)  # Read data at 1-second intervals

except KeyboardInterrupt:
    print("\nStopping data collection. Goodbye!")
    ser.close()
