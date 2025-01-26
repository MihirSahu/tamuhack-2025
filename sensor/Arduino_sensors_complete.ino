#include <DHT.h>
#include <HX711.h>
#include <AverageValue.h>

// DHT11 Configuration
#define DHTPIN 6          // DHT11 DATA pin connected to digital pin 4
#define DHTTYPE DHT11     // Specify the DHT sensor type
DHT dht(DHTPIN, DHTTYPE); // Create a DHT object

// Pressure Sensor Configuration
#define PRESSURE_OUT_PIN 8 // OUT pin connected to digital pin 2
#define PRESSURE_SCK_PIN 7 // SCK pin connected to digital pin 3
HX711 pressureSensor;      // Create an HX711 object
AverageValue<long> pressureAverage(10); // Averages the last 10 readings

void setup() {
  Serial.begin(9600);
  Serial.println("DHT11 and Pressure Sensor Test");

  // Initialize the DHT sensor
  dht.begin();

  // Initialize the pressure sensor
  pressureSensor.begin(PRESSURE_OUT_PIN, PRESSURE_SCK_PIN); // Assign pins
  Serial.println("Pressure sensor initialized");
}

void loop() {
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

  // **Pressure Sensor Readings**
  if (pressureSensor.is_ready()) {
    long rawPressure = pressureSensor.get_units(); // Read raw sensor value
    pressureAverage.push(rawPressure);            // Add raw value to averaging
    long averagedPressure = pressureAverage.average(); // Get the averaged value

    Serial.print("Raw Pressure: ");
    Serial.print(rawPressure);
    Serial.print(" | Averaged Pressure: ");
    Serial.println(averagedPressure);
  } else {
    Serial.println("Pressure sensor not ready");
  }

  // Delay before the next reading
  delay(2000);
}
