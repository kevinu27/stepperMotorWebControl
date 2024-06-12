void setup() {
  Serial.begin(9600); // Inicia la comunicación serial a 9600 bps
  pinMode(LED_BUILTIN, OUTPUT); // Configura el pin del LED interno como salida
}

void loop() {
  if (Serial.available() > 0) {
    String received = Serial.readStringUntil('\n'); // Lee la cadena hasta el salto de línea
    received.trim(); // Elimina espacios en blanco iniciales y finales

    if (received == "ON") {
      digitalWrite(LED_BUILTIN, HIGH); // Enciende el LED
      Serial.println("LED encendido");
    } else if (received == "OFF") {
      digitalWrite(LED_BUILTIN, LOW); // Apaga el LED
      Serial.println("LED apagado");
    } else {
      Serial.print("Cadena no reconocida: ");
      Serial.println(received); // Muestra la cadena no reconocida en el monitor serial
    }
  }
}
