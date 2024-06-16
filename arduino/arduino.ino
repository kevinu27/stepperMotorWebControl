bool boolVar2;
bool boolVar3;
String var1; 
String var2; 
String var3; 
String var4; 

void setup() {
  Serial.begin(9600); // Inicia la comunicación serial a 9600 bps
  pinMode(LED_BUILTIN, OUTPUT); // Configura el pin del LED interno como salida
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  digitalWrite(1, LOW);
  digitalWrite(2, LOW);
}

void loop() {
  if (Serial.available() > 0) {
    String received = Serial.readStringUntil('\n'); // Lee la cadena hasta el salto de línea
    received.trim(); // Elimina espacios en blanco iniciales y finales

    // Divide la cadena en partes
    int commaIndex1 = received.indexOf(',');
    int commaIndex2 = received.indexOf(',', commaIndex1 + 1);
    int commaIndex3 = received.indexOf(',', commaIndex2 + 1);
    

//    if (commaIndex1 > 0 && commaIndex2 > commaIndex1) {
       var1 = received.substring(0, commaIndex1);
       var2 = received.substring(commaIndex1 + 1, commaIndex2);
       var3 = received.substring(commaIndex2 + 1, commaIndex3);
       var4 = received.substring(commaIndex3 + 1);
       int var4Int = var4.toInt();
       
      Serial.println(var1);
      Serial.println(var2);
      Serial.println(var3);
      Serial.println(var4);
      boolVar2 = (var2 == "true");
      boolVar3 = (var3 == "true");

      // Ejemplo de acción basada en la variable 1
      if (var1 == "true") {
        digitalWrite(LED_BUILTIN, HIGH); // Enciende el LED
         Serial.println("1t");
      } else {
        digitalWrite(LED_BUILTIN, LOW); // Apaga el LED
         Serial.println("1f");
      }

      // Puedes añadir más acciones basadas en boolVar2 y boolVar3 aquí
      if (boolVar2) {
        // Acción cuando var2 es true
         digitalWrite(1, HIGH);
         Serial.println("2t");
      } else {
        // Acción cuando var2 es false
        digitalWrite(1, LOW);
        Serial.println("2f");
      }

      if (boolVar3) {
        // Acción cuando var3 es true
        digitalWrite(2, HIGH);
        Serial.println("3t");
      } else {
        // Acción cuando var3 es false
        digitalWrite(2, LOW);
        Serial.println("3f");
      }
      
      if (var4Int < 10) {
        Serial.println("<10");
      } else {
        Serial.println(">10");
      }
  }
}
