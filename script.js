document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('textoEntrada');
    const botonEncriptar = document.getElementById('botonEncriptar');
    const botonDesencriptar = document.getElementById('botonDesencriptar');
    const resultadoTitulo = document.getElementById('resultadoTitulo');
    const resultadoTexto = document.getElementById('resultadoTexto');
    const botonCopiar = document.getElementById('botonCopiar');
    const imagenInterrogacion = document.querySelector('.img-container img');

    botonEncriptar.addEventListener('click', function () {
        const textoOriginal = textarea.value;

        if (!validarTexto(textoOriginal)) {
            alert('Sólo letras minúsculas, sin acentos, ni caracteres especiales, por favor.');
            return;
        }

        const textoEncriptado = encriptar(textoOriginal);
        mostrarResultado('Texto Encriptado', textoEncriptado);
        ocultarImagen();
    });

    botonDesencriptar.addEventListener('click', function () {
        const textoEncriptado = resultadoTexto.textContent;

        if (!validarTexto(textoEncriptado)) {
            alert('El texto encriptado no cumple con los requisitos.');
            return;
        }

        const textoDesencriptado = desencriptar(textoEncriptado);
        mostrarResultado('Texto Desencriptado', textoDesencriptado);
        ocultarImagen();
    });

    botonCopiar.addEventListener('click', function () {
        copiarAlPortapapeles(resultadoTexto.textContent);
    });

    function mostrarResultado(titulo, texto) {
        resultadoTitulo.textContent = titulo;
        resultadoTexto.textContent = texto;
    }

    function copiarAlPortapapeles(texto) {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = texto;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
    }

    function validarTexto(texto) {
        return /^[a-z\s]+$/.test(texto);
    }

    function ocultarImagen() {
        imagenInterrogacion.style.display = 'none';
    }

    function encriptar(texto) {
        return texto
            .split(' ')
            .map(function (palabra) {
                return palabra
                    .replace(/e/g, 'enter')
                    .replace(/i/g, 'imes')
                    .replace(/a/g, 'ai')
                    .replace(/o/g, 'ober')
                    .replace(/u/g, 'ufat');
            })
            .join(' ');
    }

    function desencriptar(texto) {
        return texto
            .split(' ')
            .map(function (palabra) {
                return palabra
                    .replace(/enter/g, 'e')
                    .replace(/imes/g, 'i')
                    .replace(/ai/g, 'a')
                    .replace(/ober/g, 'o')
                    .replace(/ufat/g, 'u');
            })
            .join(' ');
    }
});