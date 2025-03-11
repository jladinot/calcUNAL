function agregarCampo() {
    const div = document.createElement("div");
    div.classList.add("materia-entry");
    const id = 'materia-' + Date.now();
    div.setAttribute('id', id);
    div.innerHTML = `
        <div class="input-row">
            <input type="text" name="materia[]" placeholder="Nombre de la materia" required>
            <input type="number" name="creditos[]" placeholder="Créditos" required min="1" class="creditos">
            <input type="number" name="nota[]" placeholder="Nota" class="Nota" step="0.1" min="0" max="5">
            <div class="action-buttons">
                <button type="button" class="icon-btn edit-btn" onclick="editarCampo('${id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="icon-btn delete-btn" onclick="eliminarCampo(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    document.getElementById("campos").appendChild(div);
}

function eliminarCampo(boton) {
    boton.closest('.materia-entry').remove();
}

function editarCampo(id) {
    const entryDiv = document.getElementById(id);
    if (entryDiv) {
        const inputs = entryDiv.querySelectorAll('input');
        if (inputs.length > 0) {
            inputs[0].focus();
            entryDiv.classList.add('editing');
            setTimeout(() => {
                entryDiv.classList.remove('editing');
            }, 2000);
        }
    }
}

function editarCampoInicial() {
    const primerCampo = document.querySelector('.materia-entry');
    if (primerCampo) {
        const inputs = primerCampo.querySelectorAll('input');
        if (inputs.length > 0) {
            inputs[0].focus();
            primerCampo.classList.add('editing');
            setTimeout(() => {
                primerCampo.classList.remove('editing');
            }, 2000);
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let creditos = document.querySelectorAll("input[name='creditos[]']");
        let notas = document.querySelectorAll("input[name='nota[]']");
        
        let totalCreditos = 0;
        let sumaPonderada = 0;

        for (let i = 0; i < creditos.length; i++) {
            let credito = parseFloat(creditos[i].value) || 0;
            let nota = parseFloat(notas[i].value) || 0;

            totalCreditos += credito;
            sumaPonderada += credito * nota;
        }

        let pappi = totalCreditos > 0 ? sumaPonderada / totalCreditos : 0;
        
        // Formatear el PAPPI a 2 decimales
        pappi = pappi.toFixed(2);

        // Obtener y actualizar el elemento resultado
        const resultadoElement = document.getElementById("resultado");
        resultadoElement.innerHTML = `<div class="resultado-content">
            <span>Tu pappi de este semestre es: ${pappi}</span>
        </div>`;
        
        // Mostrar con animación
        resultadoElement.style.display = 'block';
        
        // Reiniciar la animación si ya estaba visible
        resultadoElement.style.animation = 'none';
        void resultadoElement.offsetWidth; // Fuerza un reflow para reiniciar la animación
        resultadoElement.style.animation = 'fadeInUp 0.5s ease forwards';
    });
    
    // Ocultar el resultado al cargar la página
    document.getElementById("resultado").style.display = 'none';
});
