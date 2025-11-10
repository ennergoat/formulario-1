// =============================================
// CONFIGURACIÓN INICIAL Y VARIABLES GLOBALES
// =============================================

let tipoTareaActual = null;

// =============================================
// INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando aplicación...');
    inicializarSeleccionTarea();
    inicializarFormularioCorte();
    inicializarBotonCopiar();
    
    // Mostrar pantalla de selección al cargar
    mostrarSeleccionTarea();
});

// =============================================
// MANEJO DE SELECCIÓN DE TAREA
// =============================================

function inicializarSeleccionTarea() {
    const opcionesTarea = document.querySelectorAll('.opcion-tarea');
    
    opcionesTarea.forEach(opcion => {
        opcion.addEventListener('click', function() {
            const tipoTarea = this.getAttribute('data-tipo');
            seleccionarTarea(tipoTarea);
        });
    });
}

function seleccionarTarea(tipoTarea) {
    console.log('Seleccionando tarea:', tipoTarea);
    tipoTareaActual = tipoTarea;
    
    // Ocultar selección de tarea
    document.getElementById('seleccion-tarea').classList.remove('active');
    
    // Ocultar todos los formularios
    document.querySelectorAll('.formulario-tarea').forEach(form => {
        form.classList.remove('active');
    });
    
    // Ocultar resumen si está visible
    document.getElementById('resumen').classList.remove('active');
    
    // Mostrar formulario correspondiente
    const formularioId = `formulario-${tipoTarea}`;
    const formulario = document.getElementById(formularioId);
    
    if (formulario) {
        formulario.classList.add('active');
        
        // Inicializar formularios específicos cuando se muestran
        if (tipoTarea === 'reconexion') {
            inicializarFormularioReconexion();
        }
    }
    
    // Agregar botón de volver al menú
    agregarBotonVolverMenu();
    
    // Desplazarse al inicio del formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mostrarSeleccionTarea() {
    console.log('Mostrando selección de tarea...');
    
    // Ocultar todo
    document.querySelectorAll('.formulario-tarea').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById('resumen').classList.remove('active');
    
    // Mostrar selección
    document.getElementById('seleccion-tarea').classList.add('active');
    
    // Remover botón de volver si existe
    const btnVolver = document.querySelector('.btn-volver-menu');
    if (btnVolver) {
        btnVolver.remove();
    }
}

function agregarBotonVolverMenu() {
    // Buscar si ya existe un botón de volver
    let btnVolver = document.querySelector('.btn-volver-menu');
    
    if (!btnVolver) {
        // Crear botón de volver al menú
        btnVolver = document.createElement('button');
        btnVolver.className = 'btn-volver-menu';
        btnVolver.innerHTML = '← Volver al Menú Principal';
        btnVolver.onclick = mostrarSeleccionTarea;
        
        // Insertar al inicio del contenedor
        const container = document.querySelector('.container');
        const firstChild = container.children[1]; // Después del header
        container.insertBefore(btnVolver, firstChild);
    }
}

// =============================================
// INICIALIZACIÓN DE FORMULARIO DE CORTE
// =============================================

function inicializarFormularioCorte() {
    console.log('Inicializando formulario de corte...');
    
    // Medidor - mostrar campo de razón si está en mal estado
    document.querySelectorAll('input[name="medidor"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('medidor-razon');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Cajetin - mostrar campo de razón si está en mal estado
    document.querySelectorAll('input[name="cajetin"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('cajetin-razon');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
                // Limpiar selección de tipo de daño cuando se cambia a "Buen estado"
                document.querySelectorAll('input[name="cajetin_tipo_dano"]').forEach(radioDano => {
                    radioDano.checked = false;
                });
            }
        });
    });
    
    // Llave de corte - mostrar campo de razón si está en mal estado
    document.querySelectorAll('input[name="llave_corte"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('llave-corte-razon');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Llave de paso - mostrar campo de razón si está en mal estado
    document.querySelectorAll('input[name="llave_paso"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('llave-paso-razon');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Medio nudo - mostrar campo de accesorio si es "No"
    document.querySelectorAll('input[name="medio_nudo"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const accesorioField = document.getElementById('medio-nudo-accesorio');
            if (this.value === 'No') {
                accesorioField.classList.add('active');
            } else {
                accesorioField.classList.remove('active');
            }
        });
    });
}

// =============================================
// INICIALIZACIÓN DE FORMULARIO DE RECONEXIÓN
// =============================================

function inicializarFormularioReconexion() {
    console.log('Inicializando formulario de reconexión...');
    
    // Medidor - mostrar campo de razón si está en mal estado
    const medidorRadios = document.querySelectorAll('#formulario-reconexion input[name="medidor"]');
    medidorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('medidor-razon-reconexion');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Cajetin - mostrar campo de razón si está en mal estado
    const cajetinRadios = document.querySelectorAll('#formulario-reconexion input[name="cajetin"]');
    cajetinRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('cajetin-razon-reconexion');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
                // Limpiar selección de tipo de daño
                document.querySelectorAll('#formulario-reconexion input[name="cajetin_tipo_dano"]').forEach(radioDano => {
                    radioDano.checked = false;
                });
            }
        });
    });
    
    // Llave de corte - mostrar campo de razón si está en mal estado
    const llaveCorteRadios = document.querySelectorAll('#formulario-reconexion input[name="llave_corte"]');
    llaveCorteRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('llave-corte-razon-reconexion');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Llave de paso - mostrar campo de razón si está en mal estado
    const llavePasoRadios = document.querySelectorAll('#formulario-reconexion input[name="llave_paso"]');
    llavePasoRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('llave-paso-razon-reconexion');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Medio nudo - mostrar campo de accesorio si es "No"
    const medioNudoRadios = document.querySelectorAll('#formulario-reconexion input[name="medio_nudo"]');
    medioNudoRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const accesorioField = document.getElementById('medio-nudo-accesorio-reconexion');
            if (this.value === 'No') {
                accesorioField.classList.add('active');
            } else {
                accesorioField.classList.remove('active');
            }
        });
    });
    
    console.log('Formulario de reconexión inicializado correctamente');
}

// =============================================
// FUNCIÓN: GENERAR RESUMEN DE CORTE
// =============================================

function generarResumen() {
    console.log('Generando resumen de corte...');
    
    const formulario = document.getElementById('inspeccionForm');
    
    // Validar formulario
    if (!formulario.checkValidity()) {
        alert('Por favor, complete todos los campos requeridos');
        formulario.reportValidity();
        return;
    }
    
    // Obtener datos del formulario
    const formData = new FormData(formulario);
    
    // Obtener y procesar información de la cuadrilla
    const cuadrillaCompleta = formData.get('cuadrilla');
    let supervisor = '';
    let obrero = '';
    
    if (cuadrillaCompleta && cuadrillaCompleta !== "Seleccione una cuadrilla") {
        const partes = cuadrillaCompleta.split(' / ');
        if (partes.length === 2) {
            supervisor = partes[0].trim();
            obrero = partes[1].trim();
        } else {
            supervisor = cuadrillaCompleta;
            obrero = "No especificado";
        }
    }
    
    // Construir el resumen con el formato específico
    let resumen = `Contrato: ${formData.get('contrato')}, la cuadrilla con supervisor: ${supervisor} y obrero: ${obrero}, al momento de la inspección se encontró servicio App ${formData.get('servicio')} medidor ${formData.get('medidor')}`;
    
    // Agregar razón del medidor si está en mal estado
    if (formData.get('medidor') === 'Mal estado' && formData.get('medidor_razon')) {
        resumen += ` (${formData.get('medidor_razon')})`;
    }
    
    resumen += `, lectura ${formData.get('lectura')} M3, litros ${formData.get('litros')}, cajetin ${formData.get('cajetin')}`;
    
    // Agregar tipo de daño del cajetín si está en mal estado
    if (formData.get('cajetin') === 'Mal estado' && formData.get('cajetin_tipo_dano')) {
        resumen += ` (${formData.get('cajetin_tipo_dano')})`;
    }
    
    resumen += `, Tipo de llave de corte ${formData.get('tipo_llave')}, llave de corte ${formData.get('llave_corte')}`;
    
    // Agregar razón de llave de corte si está en mal estado
    if (formData.get('llave_corte') === 'Mal estado' && formData.get('llave_corte_razon')) {
        resumen += ` (${formData.get('llave_corte_razon')})`;
    }
    
    resumen += ` llave de paso ${formData.get('llave_paso')}`;
    
    // Agregar razón de llave de paso si está en mal estado
    if (formData.get('llave_paso') === 'Mal estado' && formData.get('llave_paso_razon')) {
        resumen += ` (${formData.get('llave_paso_razon')})`;
    }
    
    resumen += `, medio nudo ${formData.get('medio_nudo')}`;
    
    // Agregar tipo de accesorio si no tiene medio nudo
    if (formData.get('medio_nudo') === 'No' && formData.get('medio_nudo_accesorio')) {
        resumen += ` (${formData.get('medio_nudo_accesorio')})`;
    }
    
    resumen += `, se procede a realizar corte del servicio ${formData.get('corte')}, predio ${formData.get('predio')}, color ${formData.get('color')}, perno ${formData.get('perno')}`;
    
    // Mostrar el resumen
    mostrarResumenGenerado(resumen);
}

// =============================================
// FUNCIÓN: GENERAR RESUMEN DE RECONEXIÓN
// =============================================

function generarResumenReconexion() {
    console.log('Generando resumen de reconexión...');
    
    const formulario = document.getElementById('inspeccionFormReconexion');
    
    // Validar formulario
    if (!formulario.checkValidity()) {
        alert('Por favor, complete todos los campos requeridos');
        formulario.reportValidity();
        return;
    }
    
    // Obtener datos del formulario
    const formData = new FormData(formulario);
    
    // Obtener y procesar información de la cuadrilla
    const cuadrillaCompleta = formData.get('cuadrilla');
    let supervisor = '';
    let obrero = '';
    
    if (cuadrillaCompleta && cuadrillaCompleta !== "Seleccione una cuadrilla") {
        const partes = cuadrillaCompleta.split(' / ');
        if (partes.length === 2) {
            supervisor = partes[0].trim();
            obrero = partes[1].trim();
        } else {
            supervisor = cuadrillaCompleta;
            obrero = "No especificado";
        }
    }
    
    // Construir el resumen base
    let resumen = `Contrato: ${formData.get('contrato')}, la cuadrilla con supervisor: ${supervisor} y obrero: ${obrero}, al momento de la inspección se encontró el Servicio App ${formData.get('servicio')}, Medidor ${formData.get('medidor')}`;
    
    // Agregar razón del medidor si está en mal estado
    if (formData.get('medidor') === 'Mal estado' && formData.get('medidor_razon')) {
        resumen += ` (${formData.get('medidor_razon')})`;
    }
    
    resumen += `, Lectura ${formData.get('lectura')} M3, Litros ${formData.get('litros')}, Cajetin ${formData.get('cajetin')}`;
    
    // Agregar tipo de daño del cajetín si está en mal estado
    if (formData.get('cajetin') === 'Mal estado' && formData.get('cajetin_tipo_dano')) {
        resumen += ` (${formData.get('cajetin_tipo_dano')})`;
    }
    
    resumen += `, Tipo de llave de corte ${formData.get('tipo_llave')}, Llave de corte ${formData.get('llave_corte')}`;
    
    // Agregar razón de llave de corte si está en mal estado
    if (formData.get('llave_corte') === 'Mal estado' && formData.get('llave_corte_razon')) {
        resumen += ` (${formData.get('llave_corte_razon')})`;
    }
    
    resumen += `, Llave de paso ${formData.get('llave_paso')}`;
    
    // Agregar razón de llave de paso si está en mal estado
    if (formData.get('llave_paso') === 'Mal estado' && formData.get('llave_paso_razon')) {
        resumen += ` (${formData.get('llave_paso_razon')})`;
    }
    
    resumen += `, Medio nudo ${formData.get('medio_nudo')}`;
    
    // Agregar tipo de accesorio si no tiene medio nudo
    if (formData.get('medio_nudo') === 'No' && formData.get('medio_nudo_accesorio')) {
        resumen += ` (${formData.get('medio_nudo_accesorio')})`;
    }
    
    // Parte específica de reconexión con las dos variantes
    const tipoReconexion = formData.get('reconexion');
    if (tipoReconexion === 'ya estaba reconectado') {
        resumen += `, se encontró el servicio reconectado`;
    } else {
        resumen += `, se procede a realizar la reconexión del servicio ${tipoReconexion}`;
    }
    
    resumen += `, Predio ${formData.get('predio')}, Color ${formData.get('color')}, Perno ${formData.get('perno')}`;
    
    // Mostrar el resumen
    mostrarResumenGenerado(resumen);
}

// =============================================
// FUNCIÓN COMÚN: MOSTRAR RESUMEN GENERADO
// =============================================

function mostrarResumenGenerado(resumenTexto) {
    console.log('Mostrando resumen generado...');
    
    // Ocultar todos los formularios
    document.querySelectorAll('.formulario-tarea').forEach(form => {
        form.classList.remove('active');
    });
    
    // Ocultar selección de tarea
    document.getElementById('seleccion-tarea').classList.remove('active');
    
    // Mostrar resumen
    document.getElementById('resumen-contenido').textContent = resumenTexto;
    document.getElementById('resumen').classList.add('active');
    
    // Remover botón de volver si existe
    const btnVolver = document.querySelector('.btn-volver-menu');
    if (btnVolver) {
        btnVolver.remove();
    }
    
    // Desplazarse al resumen
    document.getElementById('resumen').scrollIntoView({ 
        behavior: 'smooth'
    });
    
    console.log('Resumen mostrado correctamente');
}

// =============================================
// FUNCIÓN: COPIAR RESUMEN AL PORTAPAPELES
// =============================================

function inicializarBotonCopiar() {
    const botonCopiar = document.getElementById('copiar-resumen');
    if (botonCopiar) {
        botonCopiar.addEventListener('click', copiarResumen);
    }
}

function copiarResumen() {
    const textoResumen = document.getElementById('resumen-contenido').textContent;
    
    if (!textoResumen.trim()) {
        alert('No hay resumen para copiar. Genera el reporte primero.');
        return;
    }
    
    navigator.clipboard.writeText(textoResumen)
        .then(() => {
            const botonCopiar = document.getElementById('copiar-resumen');
            const textoOriginal = botonCopiar.textContent;
            
            botonCopiar.textContent = '✅ ¡Copiado!';
            botonCopiar.classList.add('copiado');
            
            setTimeout(() => {
                botonCopiar.textContent = textoOriginal;
                botonCopiar.classList.remove('copiado');
            }, 2000);
        })
        .catch(err => {
            console.error('Error al copiar: ', err);
            const areaTemporal = document.createElement('textarea');
            areaTemporal.value = textoResumen;
            document.body.appendChild(areaTemporal);
            areaTemporal.select();
            document.execCommand('copy');
            document.body.removeChild(areaTemporal);
            
            alert('Resumen copiado al portapapeles');
        });
}

// =============================================
// FUNCIÓN: VOLVER AL MENÚ PRINCIPAL
// =============================================

function volverAlMenu() {
    // Ocultar resumen
    document.getElementById('resumen').classList.remove('active');
    
    // Mostrar selección de tarea
    mostrarSeleccionTarea();
    
    // Remover botón de volver si existe
    const btnVolver = document.querySelector('.btn-volver-menu');
    if (btnVolver) {
        btnVolver.remove();
    }
    
    // Desplazarse al inicio
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}