#include <DHT.h>
#include <Wire.h>
#include <RTClib.h>

// DHT11 Configuration
#define DHTPIN 6
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define WATER_SENSOR_PIN A0

RTC_DS1307 rtc;

void setup() {
  Serial.begin(9600);
  Serial.println("Initializing sensors...");

  dht.begin();

  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }

  if (!rtc.isrunning()) {
    rtc.adjust(DateTime(2025, 1, 26, 2, 14, 0));
  }

  pinMode(WATER_SENSOR_PIN, INPUT);
}

void loop() {
  DateTime now = rtc.now();
  
  // Format timestamp
  char timestamp[20];
  sprintf(timestamp, "%04d-%02d-%02d %02d:%02d:%02d",
          now.year(), now.month(), now.day(),
          now.hour(), now.minute(), now.second());

  // Read sensors
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int waterLevel = analogRead(WATER_SENSOR_PIN);
  float moisturePercentage = map(waterLevel, 20, 250, 0, 100);

  // Send data in JSON format
  Serial.print("{\"timestamp\":\"");
  Serial.print(timestamp);
  Serial.print("\",\"Temperature\":");
  Serial.print(isnan(temperature) ? 0 : temperature);
  Serial.print(",\"Humidity\":");
  Serial.print(isnan(humidity) ? 0 : humidity);
  Serial.print(",\"SoilMoisture\":");
  Serial.print(moisturePercentage);
  Serial.println("}");

  delay(5000);
}

