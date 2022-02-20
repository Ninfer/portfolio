# theme: dark
// Variables de decisión
VAR aceptar = false


*   [INICIAR]
-> start
=== start ===

// Intro
    - Y los tambores de guerra sonaron de nuevo. La llamada a la batalla trajo sobrecogimiento a los corazones de los viejos guerreros que aun vivían para recordar sus antiguas batallas. Prediktor se encogió de hombros. No era la primera vez que los escuchaba. El retumbar acompasado de los tambores le trajo dolorosos y antiguos recuerdos. El calor del fuego que se encontraba a su lado calmó su agitado corazón.
    - La situación había empeorado mucho los últimos años. Habían sido empujados fuera de sus tierras, aquellas que habían cultivado, aquellas que habían ganado con trabajo y lucha. Aquellas tierras a las que podían llamar hogar. Al principio fueron solo pequeños gestos, pequeños ataques a sus plantaciones, pero no pararon ahí. Querían acabar con ellos. Siguieron empujando, arrancándoles palmo a palmo cada trozo de tierra y empujándolos hacia el norte. Muchos de sus nuevos compañeros ni siquiera habían llegado a conocer el hogar por el que ahora luchaban.
    - Solo querían una vida tranquila. Cuidar la tierra que habían cultivado. Que en el futuro sus hijxs no conocieran la guerra. Es lo único por lo que una madre y un padre lucharían.
    - No en todos sus recuerdos eran las víctimas. Para sobrevivir tuvieron que hacer daño, y por desgracia para sus enemigos se les daba muy bien. No estaban orgullosos. Tampoco podían negar que la rabia y la sangre les hacía disfrutar. La guerra era ahora tan parte de ellos como la paz que buscaban.
    
        — "Adelante muchachxs, ha llegado el momento, es hora de una última batalla" - animó el jefe de guerra - "Es hora de actuar o callar"
        

        * — "Esto es una locura["]. Somos demasiado pocxs y demasiado viejxs como para que esto salga bien. Y lxs jóvenes ni siquiera saben por qué luchan" - dijo Prediktor.
            -> call_to_action
            
        * — "Vale, pero esta vez lo haremos a mi manera["]. No volveremos a perder a tantxs amigxs. No siguiendo estas formas" - dijo Prediktor levantando la voz para que todas y todos le escucharan.
            ~ aceptar = true
            -> call_to_action


=== call_to_action ===
{ not aceptar :
    Resignado y cabizbajo, Prediktor se levantó y se alejó con paso firme y decidido hacia la linde del bosque. 

        — "Venga, ya hemos hablado de esto, no nos queda otra opción" - dijo Ninfer yendo tras él.

    Prediktos se giró hacia Ninfer. Su expresión había cambiado. El pesar y el dolor parecían hacerse a un lado, y la esperanza inundó su mirada como el sol que en el horizonte asoma al amanecer. Posó la mano en el hombro de Ninfer. 
    -> speach
- else:
    Miró los rostros de sus compañerxs. Sabía que la expresión que él tenía era igual que la de su gente. Abatidos, cansados. Sin esperanza. 
    Forzó más la voz.
    
    — "Sé que es difícil, sé que es duro. Pero es hora de que terminemos con esto. Es hora de terminar de una vez por todas"
    
    Poco a poco su gente levantó la mirada.
    -> speach
}

= speach
        — "Nuestras decisiones nos han traído por estos caminos sinuosos, donde el peso de estas nos aplasta y nos acompaña en el viaje. Sobre todo esas por las que hemos perdido amigxs, familia y viejxs compañerxs. Nos dejamos llevar por la rabia" - dijo Prediktor, guiando su mirada a la espesura del bosque - "Esas decisiones no pueden cambiarse, pero hemos podido aprender de ellas.{aceptar:" - se giró para mirar a la explanada - "} Es hora de convertir su peso en fortaleza y alegría, esa que tanto nos costó forjar y que antaño nos acompañó"
        {aceptar: -> final_todos}
        -> final_solos
        
= final_solos
    - Prediktor comenzó de nuevo a andar.

        — "Vamos, es hora de responder a nuestra llamada" - dijo Prediktor.
        -> bosque
        
= final_todos
    -   — "Esta vez daremos nosotros el primer paso. Nos dirigiremos...
    
        * [Ir al bosque]...al bosque" - dijo Prediktor 
        -> bosque.bosque_todos
        
        * [Ir a la hondonada]...a la hondonada" - dijo Prediktor
        -> hondonada


=== bosque ===
    - Se dirigieron {not aceptar: juntos} al interior del bosque. Estaba oscuro. Los frondosos árboles no dejaban que la luz llegase con fuerza hasta el suelo. El ambiente era húmedo y olía a frutos silvestres y a pino.
    -> dialogo_solos_1

= dialogo_solos_1
        "¡Oye, pero dime por lo menos cuál es el plan! Si no, no sé cómo pretendes que te ayude" - dijo Ninfer tras pasar un tramo de caminata.
            * — "Tienes que confiar un poco más en mí["]. ¡Sabes que nunca te he llevado por mal camino!" - dijo Prediktor soltando una carcajada.
                
            * — "Lo sabrás cuando llegue el momento["]. Sabes que soy una caja de sorpresas y que nunca te llevo por mal camino" - dijo Prediktor soltando una carcajada.
                -
        "¡Claro! Solo se me viene a la cabeza aquella vez cuando éramos pequeños ¿recuerdas? Esa vez que me dijiste que saltara como un hombre araña desde una roca... Menos mal que ya era un tipo duro e intrépido".
            * [— "Gracias a mí ahora eres un tipo más duro] "Lo que yo decía. Gracias a mi eres un tipo duro ahora" - dijo Prediktor continuando con las carcajadas.
            -> bosque_solos
            * — "¡Lo hiciste realmente bien para no ser un hombre araña!["]. Y mira, gracias a mí con el tiempo mejoraste tu técnica" - dijo Prediktor continuando con las carcajadas.
            -> bosque_solos
= bosque_todos
    - Todas y todos se pusieron de pie de un salto. Parece que el mensaje había funcionado y el ambiente había cambiado. Se respiraba energía pura mientras lxs valientes guerrerxs cogían todo lo necesario. El olor a hollín inundó la nariz de Prediktos al apagarse los fuegos del campamento.
        — "Que, cuál es tu plan. Y más te vale que esta vez sea bueno" - dijo Ninfer acercándose por su espalda.
    
        — "¡Más te vale a ti no meterte con tu viejo hermano o lo pagaras caro!" - dijo Prediktor tras una risa pesada.
    
        — "Con que los esperaremos en el bosque. ¿De veras crees que es buena idea? Entre los árboles nuestras defensas no serán tan útiles" - dijo Ninfer un poco inseguro.
    
        * — "Claro que es buena idea["]. Está todo planeado" - aseguró Prediktor.
        
        * — "Qué pasa, ¿ya no confías en mí como antes?["]. Verás, es muy sencillo" - aseguró Prediktor.
        
    - Con un movimiento lento, como dejando caer el peso de la experiencia que aportan los años, puso la mano en el hombro de Ninfer.
    
        — "Como dices, quizá nuestras defensas no sean tan útiles. Pero en el bosque sus flechas y sus caballos no les servirán de nada contra nosotros"
    
    - Salieron con los últimos rezagados del campamento y se internaron en el bosque. Estaba oscuro. Los frondosos árboles no dejaban que la luz llegase con fuerza. El ambiente era húmedo y olía a frutos silvestres y a pino.
    
    - Con las frondosas ramas ocultaron sus posiciones desde las que emboscarían al enemigo. Prepararon sus defensas para que cuando el enemigo cruzara ante ellos, creyeran haberse topado con las puertas del infierno.
    
    - Ninfer estaba preocupado. Había peleado en docenas de batallas. Y hasta el momento no le habían matado. Eso era una buena señal. No tenía tanta experiencia como su hermano, pero sabía que aun así eran demasiado pocos. Sabía de sobra las fuerzas que traería el enemigo a esta batalla. Por mucho que un puñado de guerrexs de corazón noble como el de su pueblo valiesen más que diez del enemigo, esta vez no iban a ser suficientes.
    
        — "Oye Prediktor, sabes tan bien como yo que esto no basta. Están muy eufóricos y pelearán hasta su último aliento, pero no es suficiente"
        
        — "Mi plan todavía no acaba aquí, aún nos queda una cosa que hacer. Y tendremos que hacerla juntos" - dijo Prediktor - "Ven conmigo" - se puso a andar en dirección contraria de donde venía el enemigo. Ninfer no entendía nada.
        
        — "¿Pero a dónde vamos?" - dijo Ninfer.
        
        — "Al interior del bosque" - gritó Prediktor, que ya sacaba algo de ventaja y empezaba a dejar a Ninfer atrás.
    
-> dialogo_solos_1

= bosque_solos
    - Ninfer estaba cansado y seguía sin entender por qué se alejaban de la batalla. No tenía mucho sentido ir en dirección contraria.
    
    — "Pero entonces que hacemos caminando por el bosque. ¿Es que tienes algo escondido?" - dijo Ninfer, cansado de preguntar y no recibir respuesta.
    
    — "Pues... es por una corazonada. O una palpitación. O un sueño, ya no estoy seguro".
    
    — "Espera, ¿me estás diciendo que estamos andando sin rumbo por el bosque por un sueño? Vaya, y yo que creía que el loco de la familia era yo".
    
    — "Si, he sentido algo que me llamaba desde el interior del bosque. Me susurraba, me pedía que lo buscase" - dijo Prediktor.
    
    — "Con que tenemos que buscar. ¿Y sabemos qué aspecto tiene?" - contestó Ninfer con ironía.
    
    — "No, pero estoy seguro de que en cuanto lo veamos sabremos qué es".
    
    — "Genial, así podremos volveremos locos los dos. Un plan perfecto".
-> dialogo_cumpleanyos


=== hondonada ===
    - Todas y todos se pusieron de pie de un salto. Parece que el mensaje había funcionado y el ambiente había cambiado. Se respiraba energía pura mientras lxs valientes guerrerxs cogían todo lo necesario. El olor a hollín inundó la nariz de Prediktos al apagarse rápidamente los fuegos del campamento.
    — "Que, cuál es tu plan. Y más te vale que esta vez sea bueno" - dijo Ninfer acercandose por su espalda.
    
    — "¡Más te vale a ti no meterte con tu viejo hermano o lo pagaras caro!" - dijo Prediktor tras una risa pesada.
    
    — "Con que los esperaremos en la hondonada. ¿De veras crees que es buena idea? es posible que no los veamos venir desde esa posición" - dijo Ninfer un poco inseguro.
    
        * — "Claro que es buena idea["]. Está todo planeado" - aseguró Prediktor.
        
        * — "Qué pasa, ¿ya no confias en mí como antes?["]. Verás, es muy sencillo" - aseguró Prediktor.
        
    - Con un movimiento lento, como dejando caer el peso de la experiencia que aportan los años, puso la mano en el hombro de Ninfer.
    
    — "Como dices, quizá no podamos verlos llegar. Pero ellos tampoco podrán vernos a nosotrxs"
    
    - Salieron con los últimos rezagados del campamento. Al llegar a la hondonada, comenzaron a montar pequeños refuerzos con estacas de madera y cuerda. Prepararían el terreno para que cuando el enemigo callera sobre ellos, creyeran haberse topado con las puertas del infierno.
    
    - Ninfer estaba preocupado. Había peleado en docenas de batallas. Y hasta el momento no le habían matado. Eso era una buena señal. No tenía tanta experiencia como su hermano, pero sabía que aun así eran demasiado pocos. Sabía de sobra las fuerzas que traería el enemigo a esta batalla. Por mucho que un puñado de guerrexs de corazón noble como el de su pueblo valiesen más que diez del enemigo, esta vez no iban a ser suficientes.
    
        — "Oye Prediktor, sabes tan bien como yo que esto no basta. Están muy eufóricos y pelearán hasta su último aliento, pero no es suficiente"
        
        — "Mi plan todavía no acaba aquí, aún nos queda una cosa que hacer. Y tendremos que hacerla juntos" - dijo Prediktor - "Ven conmigo" - se puso a andar en dirección contraria de donde venía el enemigo. Ninfer no entendía nada.
        
        — "¿Pero a dónde vamos?" - dijo Ninfer.
        
        — "Al bosque" - gritó Prediktor, que ya sacaba algo de ventaja y empezaba a dejar a Ninfer atrás.
        
    ~ aceptar = false
    -> bosque


=== dialogo_cumpleanyos ===
    - Vagaron sin rumbo por el interior del bosque. No encontraban nada. Por el tiempo que llevaban caminando, estaban seguros de que el enemigo no tardaría en aparecer. Tenían que darse prisa.
    
    — "A este paso, estaremos acabados antes de que acabe el día. Se nos van a echar encima. De ser tú me daría bastante rabia morir hoy" - dijo Ninfer.
    
    — "¿Hoy, que tiene de especial?" - dijo Prediktor algo desconcertado.
    
    — "No me digas que te has vuelto a olvidar. Todos los años igual, nunca cambias" - Ninfer paró de andar y levantó las manos, movidas como la cebada agitada por el viento - "¡Hoy es tu cumpleaños!".
    
    — "Joder, ¿enserio? Al final vas a tener razón y voy a estar volviendome loco de verdad. No me puedo creer que me haya vuelto a pasar".
    
    — "No pasa nada hombre, para eso están los hermanos, para que recuerdes cuándo es tu cumpleaños" - dijo Ninfer.
    
    — "Tienes razón, me daría bastante rabia morir sin haber podido celebrarlo una vez más. Que mala suerte" - dijo Prediktor bajando la cabeza.
    
    — "Eso no va a ocurrir. Pensaba felicitarte al final del día como hemos hecho siempre, pero viendo que puede que no pasemos de hoy creo que este es un buen momento" - dijo Ninfer echándose las manos a la espalda - "Vamos, elige una mano. Estaba indeciso y no sabía qué regalarte, así que esta vez tendrás que elegir tú".
    
        * [Mano derecha.]— "Con que eliges la mano derecha, ¿eh?" - dijo Ninfer moviendo el brazo derecho de forma lenta y meditada.
        -> derecha
        
        * [Mano izquierda.]— "Con que eliges la mano izquierda, ¿eh?" - dijo Ninfer moviendo el brazo derecho de forma lenta y meditada.
        -> izquierda
        
= derecha
    - Ninfer le entregó un pequeño trozo de madera. Tenía una forma redondeada, con pequeñas orejas y un hocico. Y hasta un cordón en lo que parecía la parte de arriba. Si, definitivamente se parecía a un oso.
    
    — "Toma" - dijo Ninfer - "te hago entrega de tu HermanOso. ¡Más te vale no perderlo!" 
    
    Prediktor soltó una carcajada.
    
    — "¡Qué bonito! Lo llevaré siempre conmigo".

-> final

= izquierda
    - Ninfer le entregó un trozo de metal con forma de circunferencia. Parecía un brazalete. Tenía unos colores oscuros y en algunas partes estaba aún ennegrecido.
    
    — "Lo forjé a partir de un viejo cuchillo. El metal no es muy bueno, pero fue lo poco que pude conseguir" - dijo Prediktor - "¿Has leído la inscripción?".
    
    - Prediktor observó el brazalete. En él había un pequeño grabado de lo que parecía un oso. También podía leerse: 'Un Brazalete para gobernarlos a todos, un Brazalete para encontrarlos, un Brazalete para atraerlos a todos y atarlos a los HermanOsos'
    
    — "¡Qué bonito! Lo llevaré siempre conmigo".

-> final


=== final ===
    - Como de la nada, algo empezó a iluminar el boscoso horizonte. Era como si una luz azulada y fría surgiera del propio bosque. Prediktor abrió los ojos sorprendido a la vez que la boca seguía los mismos pasos. No podía creer que realmente fuera cierto. Tenía muy pocas esperanzas de que aquello que se le presentó en un fugaz delirio febril unas noches atras fuera a cambiar el devenir de la guerra. Solo tendrían que descubrir a qué precio. 
    - Se internaron aún más en el bosque. A medida que se acercaban, disminuía su intensidad. La hipnotizante luz azul les tenía tan absortos que no hablaron en todo el camino, solo podían avanzar.
    - Encontraron el foco de donde emanaba aquel poder. Un escalofrío recorrió cada esquina del cuerpo de los dos hermanos. No sabían qué sentir, si admiración, miedo o respeto. No podían intuir cómo había llegado hasta ahí. Ni iluminados por su luz fría como el hielo podían pensar que fuera real. Clavada en aquel tronco talado a ras, se encontraba La Agonía de Escarcha. Prediktor dio un paso hacia ella. Esa espada era la única esperanza para su pueblo y ambos lo sabían.
    
    — "Con que esto es lo que no querías decirme. Lo que viste en sueños y te susurraba al oído. No puedo creer que sea real" - dijo Ninfer.
    
    — "Yo tampoco puedo creerlo" - Prediktor sentía el frio de la hoja cuanto más cerca estaba de la hoja - "Esta vez no doblegará el alma de lxs débiles ni la voluntad de lxs honradxs" - agarró el mango de la espada con ambas manos, en sus movimientos no predominaba la fuerza, sino un profundo respeto.
    
    - La punta de la Agonía de Escarcha se deslizó por las fibras del tronco sin prestar gran resistencia. En cuanto el filo estuvo separado del árbol, el ambiente cambió. El frío que sentía Ninfer emanar de la antiguo filo se tornó cálido y acogedor. Podía sentir su fuerza incluso a esa distancia. El miedo se borró de su semblante dejando paso a la esperanza de nuevo. Ambos se sintieron preparados para una última batalla.
    
    - Los tambores de guerra tronaron de nuevo. El retumbar era mucho más fuerte que la vez anterior. La batalla había dado comienzo. Esta vez no renegaron de su sonido ni les sobrecogió el corazón. Prediktor sostuvo la espada con una mano y apoyó el filo en su hombro derecho. La otra mano la posó en el hombro de Ninfer. Prediktor entonó profundamente.
    
    — "Llegó el momento de ser dueños de nuestro propio devenir. Es hora de responder a la llamada".
->END