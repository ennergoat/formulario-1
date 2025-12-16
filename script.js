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
    inicializarFormularioReconexion();
    inicializarPerno();
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
        } else if (tipoTarea === 'verificacion') {
            inicializarFormularioVerificacion(); 
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
// DATOS DE ITEMS DE COBRO (PRECIOS OCULTOS)
// =============================================

const itemsCobro = [
    { nombre: "Corte del servicio", precio: 0 },
    { nombre: "Reduccion de caudal", precio: 1.63 },
    { nombre: "Verificación de corte recuperación de cartera", precio: 0 },
    { nombre: "Reconexion de servicio (sencillas)", precio: 3.88 },
    { nombre: "Reconexion efectiva 1-5 meses", precio: 4.14 },
    { nombre: "Reconexion efectiva 6-10 meses", precio: 8.17 },
    { nombre: "Reconexion efectiva 11-15 meses", precio: 13.65 },
    { nombre: "Reconexion efectiva 16-24 meses", precio: 20.17 },
    { nombre: "Reconexion efectiva 25-40 meses", precio: 29.66 },
    { nombre: "Reconexion efectiva 41-50 meses", precio: 47.27 },
    { nombre: "Reconexion efectiva 51-60 meses", precio: 64.90 },
    { nombre: "Reconexion efectiva 61-80 meses", precio: 96.73 },
    { nombre: "Reconexion efectiva >= 81 meses", precio: 128.56 },
    { nombre: "Reubicación por corte y reconexion", precio: 19.33 },
    { nombre: "Mantenimiento corte y reconexión", precio: 3.33 },
    { nombre: "Reactivacion del caudal", precio: 1.65 },
    { nombre: "Verificación de corte integral", precio: 33.51 },
    { nombre: "Cierre definitivo en sitio por depuracion", precio: 33.19 }
];

// =============================================
// INICIALIZACIÓN DEL CAMPO DE ITEM DE COBRO
// =============================================

function inicializarItemCobro() {
    const inputItemCobro = document.getElementById('item-cobro');
    const datalist = document.getElementById('items-cobro-list');
    
    if (!inputItemCobro || !datalist) return;
    
    // Llenar el datalist con las opciones
    itemsCobro.forEach(item => {
        const option = document.createElement('option');
        option.value = item.nombre;
        // Podemos agregar el precio como data attribute si es necesario
        option.setAttribute('data-precio', item.precio);
        datalist.appendChild(option);
    });
    
    // Crear contenedor para sugerencias personalizadas
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    suggestionsContainer.id = 'item-cobro-suggestions';
    inputItemCobro.parentNode.appendChild(suggestionsContainer);
    
    // Variables para controlar las sugerencias
    let currentFocus = -1;
    let filteredItems = [];
    
    // Función para mostrar sugerencias
    function mostrarSugerencias(texto) {
        const container = document.getElementById('item-cobro-suggestions');
        container.innerHTML = '';
        
        if (!texto || texto.length < 2) {
            container.classList.remove('active');
            return;
        }
        
        // Filtrar items que coincidan con el texto
        filteredItems = itemsCobro.filter(item => 
            item.nombre.toLowerCase().includes(texto.toLowerCase())
        );
        
        if (filteredItems.length === 0) {
            container.classList.remove('active');
            return;
        }
        
        // Crear elementos de sugerencia
        filteredItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = item.nombre;
            div.setAttribute('data-value', item.nombre);
            div.setAttribute('data-precio', item.precio);
            
            div.addEventListener('click', function() {
                inputItemCobro.value = this.getAttribute('data-value');
                container.classList.remove('active');
                currentFocus = -1;
                
                // Guardar el precio seleccionado en un campo oculto
                const precioSeleccionado = this.getAttribute('data-precio');
                guardarPrecioSeleccionado(precioSeleccionado);
            });
            
            container.appendChild(div);
        });
        
        container.classList.add('active');
        currentFocus = -1;
    }
    
    // Función para guardar el precio seleccionado
    function guardarPrecioSeleccionado(precio) {
        // Podemos almacenarlo en un campo oculto o en una variable global
        // Por ahora, lo guardamos en un campo oculto
        let hiddenInput = document.getElementById('item-cobro-precio-hidden');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.id = 'item-cobro-precio-hidden';
            hiddenInput.name = 'item_cobro_precio';
            inputItemCobro.parentNode.appendChild(hiddenInput);
        }
        hiddenInput.value = precio;
    }
    
    // Event listener para input
    inputItemCobro.addEventListener('input', function() {
        mostrarSugerencias(this.value);
        
        // Si se borra el campo, limpiar el precio
        if (!this.value) {
            guardarPrecioSeleccionado('');
        }
    });
    
    // Event listener para teclas (navegación con flechas)
    inputItemCobro.addEventListener('keydown', function(e) {
        const container = document.getElementById('item-cobro-suggestions');
        if (!container.classList.contains('active')) return;
        
        const items = container.getElementsByClassName('suggestion-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentFocus = Math.min(currentFocus + 1, items.length - 1);
            setActiveSuggestion(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentFocus = Math.max(currentFocus - 1, -1);
            setActiveSuggestion(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1 && items[currentFocus]) {
                items[currentFocus].click();
            }
        } else if (e.key === 'Escape') {
            container.classList.remove('active');
            currentFocus = -1;
        }
    });
    
    // Función para resaltar la sugerencia activa
    function setActiveSuggestion(items) {
        // Remover clase 'highlighted' de todos
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('highlighted');
        }
        
        // Agregar clase 'highlighted' al item activo
        if (currentFocus > -1 && items[currentFocus]) {
            items[currentFocus].classList.add('highlighted');
            // Scroll al elemento activo
            items[currentFocus].scrollIntoView({ block: 'nearest' });
        }
    }
    
    // Cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', function(e) {
        const container = document.getElementById('item-cobro-suggestions');
        if (!container.contains(e.target) && e.target !== inputItemCobro) {
            container.classList.remove('active');
            currentFocus = -1;
        }
    });
    
    // También cerrar al seleccionar del datalist nativo
    inputItemCobro.addEventListener('change', function() {
        setTimeout(() => {
            const container = document.getElementById('item-cobro-suggestions');
            container.classList.remove('active');
            
            // Buscar y guardar el precio del item seleccionado
            const itemSeleccionado = itemsCobro.find(item => 
                item.nombre === this.value
            );
            
            if (itemSeleccionado) {
                guardarPrecioSeleccionado(itemSeleccionado.precio);
            }
        }, 100);
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

    // Inicializar el campo de ítem de cobro
    inicializarItemCobro();
    
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
    
    // Agregar razón del perno si es "No se coloca"
    if (formData.get('perno') === 'No se coloca' && formData.get('perno_razon')) {
        resumen += ` (${formData.get('perno_razon')})`;
    }
    
    // Agregar observación final si existe
    const observacion = formData.get('observacion');
    if (observacion && observacion.trim() !== '') {
        resumen += `, Observación: ${observacion}`;
    }
    
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
    
    // Agregar razón del perno si es "No se coloca"
    if (formData.get('perno') === 'No se coloca' && formData.get('perno_razon')) {
        resumen += ` (${formData.get('perno_razon')})`;
    }
    
    // Agregar ítem de cobro si existe
    const itemCobro = formData.get('item_cobro');
    if (itemCobro && itemCobro.trim() !== '') {
        resumen += `, Item de cobro: ${itemCobro}`;
        
    }



    // Agregar observación final si existe
    const observacion = formData.get('observacion');
    if (observacion && observacion.trim() !== '') {
        resumen += `, Observación: ${observacion}`;
    }
    
    // Mostrar el resumen
    mostrarResumenGenerado(resumen);
}




// =============================================
// INICIALIZACIÓN DEL FORMULARIO DE VERIFICACIÓN
// =============================================

function inicializarFormularioVerificacion() {
    console.log('Inicializando formulario de verificación...');
    
    // Campos condicionales básicos (medidor, cajetín, etc.)
    inicializarCamposCondicionalesVerificacion();
    
    // Lógica específica de verificación de corte
    const verificacionRadios = document.querySelectorAll('#formulario-verificacion input[name="verificacion"]');
    verificacionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            manejarSeleccionVerificacion(this.value);
        });
    });
    
    // Lógica para "Predio habitado, usuario presente"
    const cortadoOpcionRadios = document.querySelectorAll('#formulario-verificacion input[name="cortado_opcion"]');
    cortadoOpcionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Predio habitado, usuario presente') {
                document.getElementById('abastecimiento-field').classList.add('active');
            } else {
                document.getElementById('abastecimiento-field').classList.remove('active');
            }
        });
    });
    
    // Lógica para "Corte con rotura" - mostrar campo de texto
    document.querySelectorAll('#formulario-verificacion input[name="reconectado_opcion"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const roturaInput = document.getElementById('rotura-medida');
            if (this.value === 'Corte con rotura') {
                roturaInput.style.display = 'inline-block';
            } else {
                roturaInput.style.display = 'none';
                roturaInput.value = '';
            }
        });
    });
    
    console.log('Formulario de verificación inicializado correctamente');
}

function inicializarCamposCondicionalesVerificacion() {
    // Medidor - mostrar campo de razón si está en mal estado
    document.querySelectorAll('#formulario-verificacion input[name="medidor"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('medidor-razon-verificacion');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Cajetin - mostrar campo de razón si está en mal estado
    document.querySelectorAll('#formulario-verificacion input[name="cajetin"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('cajetin-razon-verificacion');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
                document.querySelectorAll('#formulario-verificacion input[name="cajetin_tipo_dano"]').forEach(radioDano => {
                    radioDano.checked = false;
                });
            }
        });
    });
    
    // Llave de corte - mostrar campo de razón si está en mal estado
    document.querySelectorAll('#formulario-verificacion input[name="llave_corte"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('llave-corte-razon-verificacion');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Llave de paso - mostrar campo de razón si está en mal estado
    document.querySelectorAll('#formulario-verificacion input[name="llave_paso"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('llave-paso-razon-verificacion');
            if (this.value === 'Mal estado') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
            }
        });
    });
    
    // Medio nudo - mostrar campo de accesorio si es "No"
    document.querySelectorAll('#formulario-verificacion input[name="medio_nudo"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const accesorioField = document.getElementById('medio-nudo-accesorio-verificacion');
            if (this.value === 'No') {
                accesorioField.classList.add('active');
            } else {
                accesorioField.classList.remove('active');
            }
        });
    });
}

function manejarSeleccionVerificacion(valor) {
    // Ocultar todos los campos condicionales primero
    document.getElementById('cortado-opciones').classList.remove('active');
    document.getElementById('reconectado-opciones').classList.remove('active');
    document.getElementById('fraude-opciones').classList.remove('active');
    document.getElementById('abastecimiento-field').classList.remove('active');
    
    // Limpiar selecciones cuando se cambia la opción principal
    document.querySelectorAll('#formulario-verificacion input[name="cortado_opcion"]').forEach(radio => {
        radio.checked = false;
    });
    document.querySelectorAll('#formulario-verificacion input[name="reconectado_opcion"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Ocultar campo de medida de rotura
    document.getElementById('rotura-medida').style.display = 'none';
    document.getElementById('rotura-medida').value = '';
    
    // Mostrar el campo condicional correspondiente
    if (valor === 'se encontró cortado') {
        document.getElementById('cortado-opciones').classList.add('active');
    } else if (valor === 'se encontró reconectado') {
        document.getElementById('reconectado-opciones').classList.add('active');
    } else if (valor === 'se encontró posible fraude') {
        document.getElementById('fraude-opciones').classList.add('active');
    }
}


// =============================================
// FUNCIÓN: GENERAR RESUMEN DE VERIFICACIÓN
// =============================================

function generarResumenVerificacion() {
    console.log('Generando resumen de verificación...');
    
    const formulario = document.getElementById('inspeccionFormVerificacion');
    
    // Validar formulario (excepto campos opcionales como abastecimiento y observación)
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
    
    // Parte específica de verificación con las variantes
    const tipoVerificacion = formData.get('verificacion');
    let detalleVerificacion = '';
    
    if (tipoVerificacion === 'se encontró cortado') {
        const cortadoOpcion = formData.get('cortado_opcion');
        detalleVerificacion = `se encontró cortado (${cortadoOpcion}`;
        
        // Si es "Predio habitado, usuario presente" y tiene información de abastecimiento (opcional)
        if (cortadoOpcion === 'Predio habitado, usuario presente' && formData.get('abastecimiento')) {
            detalleVerificacion += `, ${formData.get('abastecimiento')}`;
        }
        
        detalleVerificacion += ')';
        
    } else if (tipoVerificacion === 'se encontró reconectado') {
        const reconectadoOpcion = formData.get('reconectado_opcion');
        detalleVerificacion = `se encontró reconectado (${reconectadoOpcion}`;
        
        // Si es "Corte con rotura" y tiene medida
        if (reconectadoOpcion === 'Corte con rotura' && document.getElementById('rotura-medida').value) {
            detalleVerificacion += ` ${document.getElementById('rotura-medida').value}`;
        }
        
        detalleVerificacion += ')';
        
    } else if (tipoVerificacion === 'se encontró posible fraude') {
        const fraudeDetalle = formData.get('fraude_detalle');
        detalleVerificacion = `se encontró posible fraude (Derivar inspección para carro`;
        
        if (fraudeDetalle) {
            detalleVerificacion += `, ${fraudeDetalle}`;
        }
        
        detalleVerificacion += ')';
    }
    
    resumen += `, se procedió a realizar la verificación del corte en donde ${detalleVerificacion}`;
    
    resumen += `, Predio ${formData.get('predio')}, Color ${formData.get('color')}, Perno ${formData.get('perno')}`;
    
    // Agregar razón del perno si es "No se coloca"
    if (formData.get('perno') === 'No se coloca' && formData.get('perno_razon')) {
        resumen += ` (${formData.get('perno_razon')})`;
    }
    
    // Agregar observación final si existe
    const observacion = formData.get('observacion');
    if (observacion && observacion.trim() !== '') {
        resumen += `, Observación: ${observacion}`;
    }
    
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
// INICIALIZACIÓN ADICIONAL PARA PERNO
// =============================================

function inicializarPerno() {
    // Para formulario de corte
    document.querySelectorAll('input[name="perno"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('perno-razon');
            if (this.value === 'No se coloca') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
                // Limpiar selección de razón
                document.querySelectorAll('input[name="perno_razon"]').forEach(radioRazon => {
                    radioRazon.checked = false;
                });
            }
        });
    });
    
    // Para formulario de reconexión
    document.querySelectorAll('#formulario-reconexion input[name="perno"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('perno-razon-reconexion');
            if (this.value === 'No se coloca') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
                document.querySelectorAll('#formulario-reconexion input[name="perno_razon"]').forEach(radioRazon => {
                    radioRazon.checked = false;
                });
            }
        });
    });
    
    // Para formulario de verificación
    document.querySelectorAll('#formulario-verificacion input[name="perno"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const razonField = document.getElementById('perno-razon-verificacion');
            if (this.value === 'No se coloca') {
                razonField.classList.add('active');
            } else {
                razonField.classList.remove('active');
                document.querySelectorAll('#formulario-verificacion input[name="perno_razon"]').forEach(radioRazon => {
                    radioRazon.checked = false;
                });
            }
        });
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