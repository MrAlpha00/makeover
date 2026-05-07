1b 



void setup() {

&#x20; Serial.begin(9600);

&#x20; pinMode(2, INPUT);

&#x20; pinMode(10, OUTPUT);

}



void loop() {

&#x20; int sensor\_state = digitalRead(2);



&#x20; if (sensor\_state == 0) {

&#x20;   Serial.println("Motion Detected");

&#x20;   digitalWrite(10, HIGH);

&#x20; }

&#x20; else {

&#x20;   Serial.println("Motion Not Detected");

&#x20;   digitalWrite(10, LOW);

&#x20; }

}





2A//////////////////////////////////////////////////////////////



\#define dht\_dpin 2 

\#include<dht.h> dht DHT;

void setup()

{

Serial.begin(9600);

Serial.println("Humidity and temperature\\n\\n");

}

void loop()

{

DHT.read11(dht\_dpin); 

Serial.print("Current humidity = ");

Serial.print(DHT.humidity);

Serial.print("%

Serial.print("temperature = ");

Serial.print(DHT.temperature);

Serial.println("C "); 

delay(1000);

}





2B/////////////////////////////////////////////////////////////////





\#include <Wire.h>

\#include <LiquidCrystal\_I2C.h>

LiquidCrystal\_I2C

lcd(0x27,16,2); 

\#define dht\_dpin 7 

\#include<dht.h>

dht DHT;

void setup()

{

Serial.begin(9600);

lcd.begin();

}

void loop()

{

DHT.read11(dht\_dpin); 

lcd.setCursor(0, 0);//(Col,ROW) lcd.print("Temp=");

lcd.print(DHT.temperature); //print the temperature

lcd.print("Celsius"); 

lcd.setCursor(0, 1);//(Col,ROW)

lcd.print("Humidity=");

lcd.print(DHT.humidity);

//print the humidity lcd.print("%"); 

delay(2000);

}





3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









void setup()

{pinMode(2,INPUT);

pinMode(10,OUTPUT); }

void loop()

{

int sensor\_state=digitalRead(2);

if(sensor\_state==1)

{

&#x20;digitalWrite(10,LOW);

}

else

{

&#x20;digitalWrite(10,HIGH);

}

}





4A///////////////////////////////////////////////////////////////////////





int sensorpin = A0;

int sensorvalue = 0;



void setup() {

&#x20; Serial.begin(9600);

}



void loop() {

&#x20; sensorvalue = analogRead(sensorpin);



&#x20; Serial.print("Soil Moisture level:");

&#x20; Serial.println(sensorvalue);



&#x20; if (sensorvalue < 300) {

&#x20;   Serial.println("status:soil is wet");

&#x20; }

&#x20; else if (sensorvalue < 700) {

&#x20;   Serial.println("status:Soil is mosit");

&#x20; }

&#x20; else {

&#x20;   Serial.println("Status:Soil is Dry");

&#x20; }



&#x20; delay(1000);

}







4B///////////////////////////////////////////////////////////////////////////////////////////////







int ldrpin = 2;

int ledpin = 13;



void setup() {

&#x20; pinMode(ldrpin, INPUT);

&#x20; pinMode(ledpin, OUTPUT);

&#x20; Serial.begin(9600);

}



void loop() {

&#x20; int ldrvalue = digitalRead(ldrpin);



&#x20; Serial.print("ldrValue:");

&#x20; Serial.println(ldrvalue);



&#x20; if (ldrvalue == 1) {

&#x20;   digitalWrite(ledpin, HIGH);

&#x20; } else {

&#x20;   digitalWrite(ledpin, LOW);

&#x20; }



&#x20; delay(200);

}







5//////////////////////////////////////////////////////////////////////////





const int trigPin = 9;

const int echoPin = 10;

long duration;

float distance;



void setup() {

&#x20; Serial.begin(9600);

&#x20; pinMode(trigPin, OUTPUT);

&#x20; pinMode(echoPin, INPUT);

}



void loop() {

&#x20; digitalWrite(trigPin, LOW);

&#x20; delayMicroseconds(2);

&#x20; 

&#x20; digitalWrite(trigPin, HIGH);

&#x20; delayMicroseconds(10);

&#x20; 

&#x20; digitalWrite(trigPin, LOW);



&#x20; duration = pulseIn(echoPin, HIGH);

&#x20; distance = duration \* 0.034 / 2;



&#x20; Serial.print("Distance:");

&#x20; Serial.print(distance);

&#x20; Serial.println("cm");



&#x20; delay(500);

}







6/////////////////////////////////////////////////////////////////////



\#include <DHT.h>

\#include<WiFi.h>

\#include<WiFiClient.h>

\#include <ThingSpeak.h>

\#include <Adafruit\_Sensor.h>

\#define DHTPIN 2

\#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

const char\* ssid = "Wokwi-GUEST";

const char\* password = ""; 

WiFiClient client;

unsigned long myChannelNumber = 3365299; 

const char \* myWriteAPIKey = "3Y3ZNIA9Z0PEJQAH"; 

float temperature, humidity;

void setup()

{

Serial.begin(9600);

dht.begin(); 

delay(10);

// Connect to WiFi network 

Serial.println(); 

Serial.println(); 

Serial.print("Connecting to "); 

Serial.println(ssid); 

WiFi.begin(ssid, password);

while (WiFi.status() != WL\_CONNECTED)

{

delay(500); 

Serial.print(".");

}

Serial.println("");

Serial.println("WiFi connected");

// Print the IP address 

Serial.println(WiFi.localIP()); 

ThingSpeak.begin(client);

}

void loop() 

{ 

temperature = dht.readTemperature(); 

humidity = dht.readHumidity(); 

Serial.print("Temperature Value is :"); 

Serial.print(temperature); 

Serial.println("C"); 

Serial.print("Humidity Value is :"); 

Serial.print(humidity);

Serial.println("%"); 

// Write to Things peak. There are up to 8 fields in a channel, allowing you to store up to 8 different

ThingSpeak.writeField(myChannelNumber, 1, temperature, myWriteAPIKey); 

ThingSpeak.writeField(myChannelNumber, 2, humidity, myWriteAPIKey); 

delay(3000); 

}









7/////////////////////////////////////////////////////////////////////





\#include <WiFi.h>

\#include <ThingSpeak.h>

WiFiClient client;

void setup()

{

&#x20; Serial.begin(9600);

ThingSpeak.begin(client);

WiFi.disconnect();

delay(3000);

Serial.println("START");

WiFi.begin("Wokwi-GUEST","");

while ((!(WiFi.status() == WL\_CONNECTED)))

{

&#x20;delay(300);

&#x20;Serial.print("..");

}

Serial.println("Your IP is");

Serial.println((WiFi.localIP().toString()));

Serial.println("Connected");

}

void loop()

&#x20;{

&#x20; Serial.print("Temperature=");

&#x20; Serial.println((ThingSpeak.readIntField(3365299,1,"TAJA1MRIRCBS5AM2")));

&#x20; Serial.print("Humidity=");

&#x20; Serial.println((ThingSpeak.readIntField(3365299,2,"TAJA1MRIRCBS5AM2")));

&#x20; delay(3000);

&#x20;}







8///////////////////////////////////////////////////////////////////////////////////////////////



\#define LED\_PIN 2



void setup() {

&#x20; Serial.begin(115200);

&#x20; pinMode(LED\_PIN, OUTPUT);

&#x20; Serial.println("Type ON or OFF");

}



void loop() {

&#x20; if (Serial.available()) {

&#x20;   String cmd = Serial.readStringUntil('\\n');

&#x20;   cmd.trim();



&#x20;   if (cmd == "ON") {

&#x20;     digitalWrite(LED\_PIN, HIGH);

&#x20;     Serial.println("LED ON");

&#x20;   } 

&#x20;   else if (cmd == "OFF") {

&#x20;     digitalWrite(LED\_PIN, LOW);

&#x20;     Serial.println("LED OFF");

&#x20;   }



























[iot](suhasm.online/iot)

