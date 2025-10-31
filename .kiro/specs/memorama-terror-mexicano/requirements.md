# Documento de Requisitos

## Introducción

Un juego de memorama digital que presenta personajes ficticios de cuentos de terror, Día de Muertos e historias tradicionales mexicanas. El juego permite a los jugadores emparejar cartas mientras aprenden sobre la rica tradición de historias de terror y folclore mexicano.

## Glosario

- **Sistema_Memorama**: La aplicación de juego de memorama completa
- **Carta**: Elemento individual del juego que muestra un personaje o está volteada
- **Par**: Dos cartas idénticas que deben ser emparejadas
- **Tablero**: La cuadrícula donde se colocan todas las cartas
- **Jugador**: Usuario que interactúa con el juego
- **Partida**: Una sesión completa de juego desde el inicio hasta completar todos los pares
- **Personaje_Terror**: Personaje ficticio de cuentos de terror, Día de Muertos o folclore mexicano

## Requisitos

### Requisito 1

**Historia de Usuario:** Como jugador, quiero ver un tablero de cartas volteadas para poder comenzar una partida de memorama.

#### Criterios de Aceptación

1. CUANDO el Jugador inicie una nueva partida, EL Sistema_Memorama DEBERÁ mostrar un tablero con 16 cartas volteadas boca abajo
2. EL Sistema_Memorama DEBERÁ organizar las cartas en una cuadrícula de 4x4
3. EL Sistema_Memorama DEBERÁ distribuir aleatoriamente 8 pares de Personaje_Terror diferentes en el Tablero
4. EL Sistema_Memorama DEBERÁ mostrar todas las cartas con el mismo diseño de reverso

### Requisito 2

**Historia de Usuario:** Como jugador, quiero voltear cartas haciendo clic en ellas para poder ver los personajes y buscar pares.

#### Criterios de Aceptación

1. CUANDO el Jugador haga clic en una Carta volteada, EL Sistema_Memorama DEBERÁ mostrar el Personaje_Terror de esa carta
2. EL Sistema_Memorama DEBERÁ permitir voltear máximo 2 cartas simultáneamente
3. MIENTRAS haya 2 cartas volteadas, EL Sistema_Memorama DEBERÁ bloquear la interacción con otras cartas
4. EL Sistema_Memorama DEBERÁ mantener visible una carta ya emparejada durante toda la Partida

### Requisito 3

**Historia de Usuario:** Como jugador, quiero que el juego detecte automáticamente cuando encuentro un par para poder continuar jugando sin interrupciones.

#### Criterios de Aceptación

1. CUANDO el Jugador voltee 2 cartas con el mismo Personaje_Terror, EL Sistema_Memorama DEBERÁ mantener ambas cartas visibles permanentemente
2. CUANDO el Jugador voltee 2 cartas diferentes, EL Sistema_Memorama DEBERÁ voltear ambas cartas boca abajo después de 1.5 segundos
3. EL Sistema_Memorama DEBERÁ incrementar el contador de pares encontrados cuando se forme un par válido
4. EL Sistema_Memorama DEBERÁ permitir continuar volteando cartas después de procesar el resultado del par anterior

### Requisito 4

**Historia de Usuario:** Como jugador, quiero ver mi progreso durante el juego para saber cuántos pares he encontrado y cuánto tiempo he tardado.

#### Criterios de Aceptación

1. EL Sistema_Memorama DEBERÁ mostrar el número de pares encontrados durante toda la Partida
2. EL Sistema_Memorama DEBERÁ mostrar un cronómetro que inicie cuando se voltee la primera carta
3. EL Sistema_Memorama DEBERÁ mostrar el número total de intentos realizados
4. EL Sistema_Memorama DEBERÁ actualizar estos indicadores en tiempo real

### Requisito 5

**Historia de Usuario:** Como jugador, quiero recibir una celebración cuando complete el juego para sentir satisfacción por mi logro.

#### Criterios de Aceptación

1. CUANDO el Jugador encuentre todos los 8 pares, EL Sistema_Memorama DEBERÁ mostrar un mensaje de felicitación
2. EL Sistema_Memorama DEBERÁ mostrar el tiempo total empleado en completar la Partida
3. EL Sistema_Memorama DEBERÁ mostrar el número total de intentos realizados
4. EL Sistema_Memorama DEBERÁ ofrecer la opción de iniciar una nueva partida

### Requisito 6

**Historia de Usuario:** Como jugador, quiero escuchar efectos de sonido temáticos cuando interactúo con las cartas para tener una experiencia más inmersiva.

#### Criterios de Aceptación

1. CUANDO el Jugador voltee una Carta, EL Sistema_Memorama DEBERÁ reproducir un efecto de sonido temático aleatorio
2. EL Sistema_Memorama DEBERÁ incluir efectos de sonido como susurros, risas tétricas, campanas u otros sonidos de terror
3. CUANDO el Jugador forme un par válido, EL Sistema_Memorama DEBERÁ reproducir un sonido de éxito diferenciado
4. EL Sistema_Memorama DEBERÁ permitir al Jugador activar o desactivar los efectos de sonido

### Requisito 7

**Historia de Usuario:** Como jugador, quiero aprender sobre los personajes cuando encuentro un par para conocer más sobre el folclore mexicano.

#### Criterios de Aceptación

1. CUANDO el Jugador forme un par válido, EL Sistema_Memorama DEBERÁ mostrar una ventana emergente con información del Personaje_Terror
2. EL Sistema_Memorama DEBERÁ incluir una breve historia o curiosidad sobre cada Personaje_Terror
3. EL Sistema_Memorama DEBERÁ mostrar el nombre del personaje y su origen cultural
4. EL Sistema_Memorama DEBERÁ permitir cerrar la información y continuar el juego

### Requisito 8

**Historia de Usuario:** Como jugador, quiero poder reiniciar el juego en cualquier momento para poder comenzar una nueva partida cuando lo desee.

#### Criterios de Aceptación

1. EL Sistema_Memorama DEBERÁ mostrar un botón de "Nueva Partida" visible durante todo el juego
2. CUANDO el Jugador haga clic en "Nueva Partida", EL Sistema_Memorama DEBERÁ reiniciar el cronómetro a cero
3. CUANDO el Jugador haga clic en "Nueva Partida", EL Sistema_Memorama DEBERÁ redistribuir aleatoriamente todos los pares en el Tablero
4. CUANDO el Jugador haga clic en "Nueva Partida", EL Sistema_Memorama DEBERÁ reiniciar todos los contadores a cero