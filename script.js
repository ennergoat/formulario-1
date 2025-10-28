// Manejo de campos condicionales
document.addEventListener('DOMContentLoaded', function() {
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
});

// Generar el resumen con el formato específico
function generarResumen() {
    // Validar formulario
    if (!document.getElementById('inspeccionForm').checkValidity()) {
        alert('Por favor, complete todos los campos requeridos');
        return;
    }
    
    // Obtener datos del formulario
    const formData = new FormData(document.getElementById('inspeccionForm'));
    
    // Construir el resumen con el formato exacto solicitado
    let resumen = `Contrato: ${formData.get('contrato')}, al momento de la inspección se encontró el Servicio App ${formData.get('servicio')}, Medidor ${formData.get('medidor')}`;
    
    // Agregar razón del medidor si está en mal estado
    if (formData.get('medidor') === 'Mal estado' && formData.get('medidor_razon')) {
        resumen += ` (${formData.get('medidor_razon')})`;
    }
    
    // Continuar con el resto del formato
    resumen += `, Lectura ${formData.get('lectura')} M3, Litros ${formData.get('litros')}, Cajetin ${formData.get('cajetin')}`;
    
    // Agregar razón del cajetin si está en mal estado
    if (formData.get('cajetin') === 'Mal estado' && formData.get('cajetin_razon')) {
        resumen += ` (${formData.get('cajetin_razon')})`;
    }
    
    resumen += `, Tipo de llave de corte ${formData.get('tipo_llave')}, Llave de corte ${formData.get('llave_corte')},`;
    
    // Agregar razón de llave de corte si está en mal estado
    if (formData.get('llave_corte') === 'Mal estado' && formData.get('llave_corte_razon')) {
        resumen += ` (${formData.get('llave_corte_razon')})`;
    }
    
    resumen += ` Llave de paso ${formData.get('llave_paso')}`;
    
    // Agregar razón de llave de paso si está en mal estado
    if (formData.get('llave_paso') === 'Mal estado' && formData.get('llave_paso_razon')) {
        resumen += ` (${formData.get('llave_paso_razon')})`;
    }
    
    resumen += `, Medio nudo ${formData.get('medio_nudo')}`;
    
    // Agregar tipo de accesorio si no tiene medio nudo
    if (formData.get('medio_nudo') === 'No' && formData.get('medio_nudo_accesorio')) {
        resumen += ` (${formData.get('medio_nudo_accesorio')})`;
    }
    
    resumen += `, se procede a realizar corte del servicio ${formData.get('corte')}, Predio ${formData.get('predio')}, Color ${formData.get('color')}, Perno ${formData.get('perno')}`;
    
    // Mostrar el resumen
    document.getElementById('resumen-contenido').textContent = resumen;
    document.getElementById('resumen').classList.add('active');
    
    // Desplazarse al resumen
    document.getElementById('resumen').scrollIntoView({ behavior: 'smooth' });
}

// Volver al formulario
function volverAlFormulario() {
    document.getElementById('resumen').classList.remove('active');
    document.getElementById('inspeccionForm').reset();
    
    // Ocultar todos los campos condicionales
    document.querySelectorAll('.conditional-field').forEach(field => {
        field.classList.remove('active');
    });
    
    // Desplazarse al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}