const numbersContainer = document.getElementById('numbersContainer');
const whatsappNumber = '5562981897524';
const initialText = 'Que a sorte floresça neste Dia das Mães! 🌸💖 Escolhi os seguintes números da sorte: ';
const whatsappMessageElement = document.getElementById('whatsappMessage');
const messageContainer = document.getElementById('message-container');
const legendVendidos = document.getElementById('legend-vendidos');
const verMaisBtn = document.getElementById('verMaisBtn');

const totalNumeros = 600;
const numerosPorCarregamento = 200; // Quantos números mostrar por vez
let numerosCarregados = 0;

// Função para verificar se há números repetidos em um array
function verificarNumerosRepetidos(array) {
  const seen = {};
  for (let i = 0; i < array.length; i++) {
    const numero = array[i];
    if (seen[numero]) {
      return true; // Encontrou um número repetido
    }
    seen[numero] = true;
  }
  return false; // Nenhum número repetido encontrado
}

// Lista de números já vendidos (você precisará atualizar esta lista)
const numerosVendidos = [1, 4, 14, 20, 42, 52, 85, 87, 91, 100,30, 36, 59,10,11,6, 12, 23, 33, 81, 2, 3, 29,8, 15, 16, 24, 27, 28, 31, 99, 13 ,21 ,25, 32, 34,35, 38, 39, 40, 44, 47, 49, 54, 55,58, 41, 67, 77, 5, 7, 17, 18, 43, 46, 22, 45, 71, 300,50, 51, 53, 56, 57, 92, 93, 94, 95, 96,9, 19, 26, 37, 48, 66, 69, 80, 82, 83, 90, 177,60, 65, 70, 114, 313];

// Verifica se há números repetidos na lista de vendidos e loga no console
if (verificarNumerosRepetidos(numerosVendidos)) {
  console.error("ALERTA: Existem números repetidos na lista de números vendidos!");
} else {
  console.log("Não há números repetidos na lista de números vendidos.");
}

// Informa o número de números vendidos
console.log(`Total de números vendidos: ${numerosVendidos.length}`);


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