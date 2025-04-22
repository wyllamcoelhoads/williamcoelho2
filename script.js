const numbersContainer = document.getElementById('numbersContainer');
const whatsappNumber = '5562981897524';
const initialText = 'Que a sorte floresça neste Dia das Mães! 🌸💖 Escolhi os seguintes números da sorte: ';
const whatsappMessageElement = document.getElementById('whatsappMessage');
const messageContainer = document.getElementById('message-container');
const legendVendidos = document.getElementById('legend-vendidos');
const verMaisBtn = document.getElementById('verMaisBtn');

const totalNumeros = 1000;
const numerosPorCarregamento = 100; // Quantos números mostrar por vez
let numerosCarregados = 0;

// Lista de números já vendidos (você precisará atualizar esta lista)
const numerosVendidos = [];

// Função para marcar os números vendidos
function marcarNumerosVendidos(listaVendidos) {
    if (listaVendidos.length > 0) {
        legendVendidos.style.display = 'block';
    }
    listaVendidos.forEach(numero => {
        const checkbox = document.getElementById(`number-${numero}`);
        const label = document.querySelector(`label[for="number-${numero}"]`);
        const numberItem = checkbox ? checkbox.parentNode : null;

        if (checkbox && label && numberItem) {
            checkbox.disabled = true;
            numberItem.classList.add('vendido');
        }
    });
}

function carregarMaisNumeros() {
    const proximoLimite = numerosCarregados + numerosPorCarregamento;
    for (let i = numerosCarregados + 1; i <= Math.min(proximoLimite, totalNumeros); i++) {
        const numberItem = document.createElement('div');
        numberItem.classList.add('number-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = i;
        checkbox.id = `number-${i}`;

        const label = document.createElement('label');
        label.textContent = i;
        label.setAttribute('for', `number-${i}`);

        numberItem.appendChild(checkbox);
        numberItem.appendChild(label);
        numbersContainer.appendChild(numberItem);
    }
    numerosCarregados = proximoLimite;

    // Esconde o botão "Ver Mais" se todos os números foram carregados
    if (numerosCarregados >= totalNumeros) {
        verMaisBtn.style.display = 'none';
    }

    // Marca os números vendidos APÓS carregar a primeira parte
    marcarNumerosVendidos(numerosVendidos);
}

// Carregar os primeiros números
carregarMaisNumeros();

// Adicionar evento de clique ao botão "Ver Mais"
verMaisBtn.addEventListener('click', carregarMaisNumeros);

function enviarParaWhatsApp() {
    const precoPorNumero = 1.98; // Valor por número (pode ser alterado)
    const selectedNumbers = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked:not(:disabled)');

    checkboxes.forEach(checkbox => {
        selectedNumbers.push(checkbox.value);
    });

    if (selectedNumbers.length > 0) {
        const numbersText = selectedNumbers.join(', ');
        const totalAPagar = (selectedNumbers.length * precoPorNumero).toFixed(2).replace('.', ',');
        const mensagem = `${initialText}${numbersText}\nTotal a pagar: R$ ${totalAPagar}`;
        const fullText = encodeURIComponent(mensagem);
        const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${fullText}`;

        window.open(whatsappLink, '_blank');
        whatsappMessageElement.textContent = mensagem;
        messageContainer.style.display = 'block'; // Mostrar a mensagem na tela
    } else {
        alert('Selecione pelo menos um número para comprar.');
    }
}


// Marca os números vendidos inicialmente (removi esta chamada redundante aqui)
// marcarNumerosVendidos(numerosVendidos);