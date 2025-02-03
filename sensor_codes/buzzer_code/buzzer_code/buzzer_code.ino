// Define the pin for the buzzer
const int buzzerPin = 1; 

void setup() {
  // Initialize the buzzer pin as an output
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  // Turn the buzzer on
  digitalWrite(buzzerPin, HIGH); 
  // Wait for 1 second (1000 milliseconds)
  delay(5000); 
  // Turn the buzzer off
  digitalWrite(buzzerPin, LOW); 
  // Wait for another 1 second
  delay(10000); 
}
