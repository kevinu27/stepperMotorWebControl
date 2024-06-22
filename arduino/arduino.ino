bool boolPull;
bool boolVar2;
String var1; 
String pull; 
String var2; 
String var4; 

void setup() {
  Serial.begin(9600); // Inicia la comunicación serial a 9600 bps
  pinMode(LED_BUILTIN, OUTPUT); // Configura el pin del LED interno como salida
  pinMode(4, OUTPUT); // ena
  pinMode(2, OUTPUT); // pull
  pinMode(3, OUTPUT); // dir
  digitalWrite(1, LOW);
  digitalWrite(2, LOW);
  digitalWrite(3, LOW);
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
       var4 = received.substring(commaIndex2 + 1);
       int var4Int = var4.toInt();
       
      Serial.println(var1);
      Serial.println(var2);
      Serial.println(var4);
      
      boolVar2 = (var2 == "true");

      // ENA
      if (var1 == "true") {
        digitalWrite(4, HIGH); // Enciende el LED
         Serial.println("1t");
      } else {
        digitalWrite(4, LOW); // Apaga el LED
         Serial.println("1f");
      }

      // DIR
      if (boolVar2) {
        // Acción cuando var2 es true
         digitalWrite(3, HIGH);
         Serial.println("2t");
      } else {
        // Acción cuando var2 es false
        digitalWrite(3, LOW);
        Serial.println("2f");
      }

      
      if (var4Int != 0 ) {
        int currentSteps = 0;
        Serial.println("wWH");
        while(currentSteps < var4Int){
          currentSteps = currentSteps +1;
          digitalWrite(2, HIGH);
          delay(1);
          digitalWrite(2, LOW);
          delay(1);
          }
        
      } else {
        Serial.println(">10");
      }
  }
}
