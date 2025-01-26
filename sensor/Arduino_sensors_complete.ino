#include <DHT.h>


// DHT11 Configuration
#define DHTPIN 6          // DHT11 DATA pin connected to digital pin 6
#define DHTTYPE DHT11     // Specify the DHT sensor type
DHT dht(DHTPIN, DHTTYPE); // Create a DHT object

void setup() {
  Serial.begin(9600);
  Serial.println("DHT11 Test");

  // Initialize the DHT sensor
  dht.begin();
}

void loop() {
  Serial.println("DATA READING:");
  // **DHT11 Sensor Readings**
  float temperature = dht.readTemperature(); // Read temperature in Celsius
  float humidity = dht.readHumidity();       // Read humidity in percentage

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");

    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
  }
  // Delay before the next reading
  delay(5000);
}
