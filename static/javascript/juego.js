/*document.addEventListener("DOMContentLoaded", function() {
    //const respuesta = "{{ word.answer}}".toLowerCase();
    const respuesta = document.getElementById("palabra").getAttribute("data-palabra");
    alert(respuesta);
    // Puedes usar la variable 'palabra' en tu lógica JavaScript
    const palabraElemento = document.getElementById("palabra-respuesta");
    const intentosElemento = document.getElementById("intentos");
    const letraInput = document.getElementById("letra");
    const mensaje = document.getElementById("mensaje");
    const adivinarBtn = document.getElementById("adivinar");
    let intentos = 6;
    let palabraAdivinada = new Array(respuesta.length).fill("_");

    // Función para actualizar la visualización de la palabra adivinada
    function actualizarPalabraAdivinada() {
        palabraElemento.textContent = palabraAdivinada.join(" ");
    }

    // Función para comprobar si el jugador ganó
    function verificarGanador() {
        if (!palabraAdivinada.includes("_")) {
            mensaje.textContent = "¡Ganaste! La palabra era '" + respuesta + "'.";
            adivinarBtn.disabled = true;
            letraInput.disabled = true;
        }
    }

    adivinarBtn.addEventListener("click", function() {
        const letra = letraInput.value.toLowerCase();
        if (letra.length === 1 && /^[a-zA-Z]+$/.test(letra)) {
            if (respuesta.includes(letra)) {
                // Actualizar la palabra adivinada con la letra correcta en las posiciones correspondientes
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i] === letra) {
                        palabraAdivinada[i] = letra;
                    }
                }
                actualizarPalabraAdivinada();
                verificarGanador();
            } else {
                intentos--;
                intentosElemento.textContent = intentos;
                if (intentos === 0) {
                    mensaje.textContent = "Perdiste. La palabra era '" + respuesta + "'.";
                    adivinarBtn.disabled = true;
                    letraInput.disabled = true;
                } else {
                    mensaje.textContent = "Letra incorrecta. Intenta de nuevo.";
                }
            }
            letraInput.value = ""; // Limpiar el campo de entrada
        } else {
            mensaje.textContent = "Ingresa una letra válida.";
        }
    });
});
*/
document.addEventListener("DOMContentLoaded", function() {
    const palabra = document.getElementById("palabra").getAttribute("data-palabra").toLowerCase();
    //const palabra = "{{ palabra.respuesta }}".toLowerCase();
    const palabraElemento = document.getElementById("palabra-respuesta");
    const palabraIntento = document.getElementById("palabra-completa");
    const intentosElemento = document.getElementById("intentos");
    const mensaje = document.getElementById("mensaje");
    const adivinarBtn = document.getElementById("adivinar");
    const teclas = document.querySelectorAll(".key");
    const btnVolver = document.getElementById("btnVolver");
    

    let intentos = 6;
    let palabraAdivinada = new Array(palabra.length).fill("_");
        
    palabraElemento.textContent = palabraAdivinada.join(" ");

    function actualizarPalabraAdivinada() {
        palabraElemento.textContent = palabraAdivinada.join(" ");
    }

    function visualizarBoton(){
        btnVolver.removeAttribute("hidden");
        btnVolver.setAttribute("data-class", intentos.toString());
    }

    function verificarGanador() {
        if (!palabraAdivinada.includes("_")) {
            mensaje.textContent = "¡Ganaste! La palabra era '" + palabra + "'.";
            deshabilitarTeclas();
            visualizarBoton();
            document.getElementById("attemps").setAttribute("value",(intentos));            
            document.getElementById("is_correct").setAttribute("value",1);
        }
    }
    function nombrarGanador() {        
        mensaje.textContent = "¡Ganaste! La palabra era '" + palabra + "'.";            
        adivinarBtn.disabled = true;
        palabraIntento.disabled = true;
        deshabilitarTeclas();
        visualizarBoton();
        document.getElementById("attemps").setAttribute("value",(intentos));            
            document.getElementById("is_correct").setAttribute("value",1);
    }

    function verificarPerdedor() {
        if (intentos === 0) {
            mensaje.textContent = "Perdiste. La palabra era '" + palabra + "'.";
            deshabilitarTeclas();
            document.getElementById("attemps").setAttribute("value",6);            
            document.getElementById("is_correct").setAttribute("value",0);
        }
    }

    function deshabilitarTeclas() {
        teclas.forEach(tecla => {
            tecla.disabled = true;
        });
    }

    teclas.forEach(tecla => {
        tecla.addEventListener("click", function() {
            const letra = this.textContent.toLowerCase();
            if (palabra.includes(letra)) {
                for (let i = 0; i < palabra.length; i++) {
                    if (palabra[i] === letra) {
                        palabraAdivinada[i] = letra;
                    }
                }
                actualizarPalabraAdivinada();
                verificarGanador();
                this.disabled = true; // Deshabilitar la tecla seleccionada
            } else {
                intentos--;
                intentosElemento.textContent = intentos;
                verificarPerdedor();
                this.disabled = true; // Deshabilitar la tecla seleccionada
            }
        });
    });

    adivinarBtn.addEventListener("click", function() {
        const palabraSuposicion = palabraIntento.value.toLowerCase();        
            if (palabra == palabraSuposicion) {                
                // Actualizar la palabra adivinada con la letra correcta en las posiciones correspondientes
                palabraAdivinada = palabraSuposicion.split("")
                palabraElemento.textContent = palabraAdivinada.join(" ");                
                nombrarGanador();
            } else {
                intentos--;
                intentosElemento.textContent = intentos;
                if (intentos === 0) {
                    mensaje.textContent = "Perdiste. La palabra era '" + respuesta + "'.";
                    adivinarBtn.disabled = true;
                    palabraAdivinada.disabled = true;
                    palabraIntento.disabled = true;
                } else {
                    mensaje.textContent = "Palabra incorrecta. Intenta de nuevo.";
                }
            }
            palabraAdivinada.value = ""; // Limpiar el campo de entrada
        
    });
});
