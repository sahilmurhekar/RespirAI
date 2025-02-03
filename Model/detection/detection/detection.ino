#include <DHT.h>

#define MQ5_A0_PIN A0
#define MQ5_D0_PIN 5
#define MQ135_A0_PIN A1
#define MQ135_D0_PIN 6
#define DHT11_PIN 4

#define DHTTYPE DHT11
DHT dht(DHT11_PIN, DHTTYPE);

void setup() {
  Serial.begin(9600);

  pinMode(MQ5_D0_PIN, INPUT);
  pinMode(MQ135_D0_PIN, INPUT);
  pinMode(3,OUTPUT);
  
  dht.begin();
}

void loop() {
      
      // Read sensor values
      int x_1 = analogRead(MQ5_A0_PIN);
      int x_2 = digitalRead(MQ5_D0_PIN);
      int x_3 = analogRead(MQ135_A0_PIN);
      int x_4 = digitalRead(MQ135_D0_PIN);
      int x_5 = dht.readTemperature();  
      int x_6 = dht.readHumidity();

      float y = -4.7566971426 + (0.0000294670 * x_1) + (-0.1580552106 * x_2) + (0.0012048012 * x_3) + (0.1435473991 * x_5) + (0.0040330661 * x_6);

      float p= (exp(y))/(1+(exp(y)));

      if(p>=0.50000000000){
        digitalWrite(3,HIGH);
      }else{
          digitalWrite(3,LOW);
        }

      Serial.print(x_1);
      Serial.print(",");
      Serial.print(x_2);
      Serial.print(",");
      Serial.print(x_3);
      Serial.print(",");
      Serial.print(x_4);
      Serial.print(",");
      Serial.print(x_5);
      Serial.print(",");
      Serial.println(x_6);
      Serial.print("Probability:");
      Serial.println(p);
      delay(500);
    
 
}
