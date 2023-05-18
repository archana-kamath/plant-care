#include <pgmspace.h>
 
#define SECRET
 
 
const char WIFI_SSID[] = "";               //TAMIM2.4G
const char WIFI_PASSWORD[] = "";           //0544287380

//const char WIFI_SSID[] = "";               //TAMIM2.4G
//const char WIFI_PASSWORD[] = "";           //0544287380

#define THINGNAME "ESP8266_DHT11_sensor"
 
int8_t TIME_ZONE = -8; //PDT(USA)
 
const char MQTT_HOST[] = "XXXXXXXX-ats.iot.us-east-1.amazonaws.com";
 
 
static const char cacert[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----

-----END CERTIFICATE-----
)EOF";
 
 
// Copy contents from XXXXXXXX-certificate.pem.crt here ▼
static const char client_cert[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----

-----END CERTIFICATE-----

 
)KEY";
 
 
// Copy contents from  XXXXXXXX-private.pem.key here ▼
static const char privkey[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----

-----END RSA PRIVATE KEY-----

 
)KEY";