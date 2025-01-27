# FireGrid AI

## Summary
FireGrid AI is a combined software/hardware solution for monitoring and preventing wildfires in remote areas. Read more at [Devpost](https://devpost.com/software/firegrid-ai).

[![Project Demo](https://img.youtube.com/vi/dAXZU2yV9RQ/0.jpg)](https://www.youtube.com/watch?v=dAXZU2yV9RQ)

## Architecture
![Architecture](./infrastructure_diagram.png)

## Arduino Script
`tamuhack-2025/sensor/Arduino_sensors_complete.ino`
<br>
Retrieves sensor data and passes it to the RPI via serial communication.

## RPI Worker
`tamuhack-2025/sensor/rpi_script`
<br>
Recieves data from the Arduino and uploads it to a MongoDB cluster.

## Web Application
`tamuhack-2025/client`
<br>
Provides visualizations for the data, sends push notifications based on temperature threshold, and provides an AI powered summary and chatbot based on collected data.