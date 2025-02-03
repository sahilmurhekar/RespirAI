#include <DHT.h>

// Define sensor pins
#define MQ5_A0_PIN A0
#define MQ5_D0_PIN 5
#define MQ135_A0_PIN A1
#define MQ135_D0_PIN 6
#define DHT11_PIN 4

// Initialize DHT sensor
#define DHTTYPE DHT11
DHT dht(DHT11_PIN, DHTTYPE);

void setup() {
  Serial.begin(9600);

  // Initialize digital pins for MQ5 and MQ135
  pinMode(MQ5_D0_PIN, INPUT);
  pinMode(MQ135_D0_PIN, INPUT);
  
  // Initialize DHT sensor
  dht.begin();
}

void loop() {
  
   
      // Read sensor values
      int mq5_a0 = analogRead(MQ5_A0_PIN);
      int mq5_d0 = digitalRead(MQ5_D0_PIN);
      int mq135_a0 = analogRead(MQ135_A0_PIN);
      int mq135_d0 = digitalRead(MQ135_D0_PIN);
      int dht11 = dht.readTemperature();  
      int dht11_h = dht.readHumidity();// Or use readHumidity() for humidity values

      // Send the data as a comma-separated string
      Serial.print(mq5_a0);
      Serial.print(",");
      Serial.print(mq5_d0);
      Serial.print(",");
      Serial.print(mq135_a0);
      Serial.print(",");
      Serial.print(mq135_d0);
      Serial.print(",");
      Serial.print(dht11);
      Serial.print(",");
      Serial.println(dht11_h);
      delay(500);
    
 
}
