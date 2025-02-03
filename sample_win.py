import serial
import time
import csv
import threading
import sys

# Configure the serial port (adjust 'COM3' to your Arduino's serial port)
arduino_port = 'COM7'
baud_rate = 9600
serial_connection = serial.Serial(arduino_port, baud_rate)
i = 0
# File to store the data
csv_file = 'sensor_data_suffocation.csv'

# Flag to indicate if logging should continue
continue_logging = True

# Function to read data from the Arduino
def read_from_arduino():
    try:
        serial_connection.write(b'READ\n')  # Signal the Arduino to send data
        line = serial_connection.readline().decode('utf-8').strip()
        if line:
            data = line.split(',')
            return data
    except Exception as e:
        print(f"Error reading from Arduino: {e}")
    return None

# Function to handle keyboard input
def listen_for_quit():
    global continue_logging
    while True:
        user_input = input().strip().upper()
        if user_input == 'Q':
            continue_logging = False
            break

# Start a thread to listen for keyboard input
input_thread = threading.Thread(target=listen_for_quit)
input_thread.daemon = True
input_thread.start()

# Main loop to read data and append to CSV file
with open(csv_file, mode='a', newline='') as file:
    writer = csv.writer(file)
    
    # Write header only if file is empty
    if file.tell() == 0:
        writer.writerow(['Timestamp', 'MQ5_A0', 'MQ5_D0', 'MQ135_A0', 'MQ135_D0', 'DHT11', 'DHT11_h'])

    while continue_logging:
        sensor_data = read_from_arduino()
        print(i)
        if sensor_data:
            timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
            row = [timestamp] + sensor_data
            writer.writerow(row)
            print(f"Data appended: {row}")
        else:
            print("No data received")
        
        time.sleep(0.5)
        i = i+1
# Close the serial connection
serial_connection.close()

print("Logging stopped.")
