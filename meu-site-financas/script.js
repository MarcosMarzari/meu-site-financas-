// 1. Elementos do HTML
const inputGastos = document.getElementById('gastos');
const btnCalcular = document.getElementById('btn-calcular');
const valorTotal = document.getElementById('valor-total');
const resultadoBox = document.getElementById('resultado-box');

// Novos elementos dos perfis
const botoesPerfil = document.querySelectorAll('.btn-perfil');
const textoMesesDestaque = document.querySelector('.detalhe-reserva strong');

// Variável para guardar o multiplicador padrão (começa com 6 da CLT)
let mesesReserva = 6;

// 2. Lógica para alternar a seleção visual dos botões de perfil
botoesPerfil.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove a classe 'ativo' de todos os botões de perfil
        botoesPerfil.forEach(btn => btn.classList.remove('ativo'));
        
        // Adiciona a classe 'ativo' apenas no botão que foi clicado
        botao.classList.add('ativo');
        
        // Atualiza o multiplicador com o valor guardado no atributo 'data-meses' do HTML
        mesesReserva = parseInt(botao.getAttribute('data-meses'));
        
        // Se o usuário já tiver calculado algo, recalcula automaticamente na hora ao mudar o botão!
        if (inputGastos.value > 0) {
            calcularReserva();
        }
    });
});

// 3. Função principal de cálculo
function calcularReserva() {
    const custoMensal = parseFloat(inputGastos.value);

    if (isNaN(custoMensal) || custoMensal <= 0) {
        alert("Por favor, digite um valor de custo mensal válido e maior que zero.");
        return;
    }

    // O cálculo agora usa a nossa variável dinâmica (6 ou 12)
    const reservaIdeal = custoMensal * mesesReserva;

    const valorFormatado = reservaIdeal.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Atualiza o valor monetário e o texto explicativo dos meses
    valorTotal.textContent = valorFormatado;
    textoMesesDestaque.textContent = `${mesesReserva} meses`;

    // Efeito de pulso rápido na caixa de resultado ao calcular
    resultadoBox.style.backgroundColor = '#e8f7f0';
    resultadoBox.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        resultadoBox.style.transform = 'scale(1)';
    }, 200);
}

// 4. Ouvintes de eventos para o botão principal e o teclado
btnCalcular.addEventListener('click', calcularReserva);

inputGastos.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calcularReserva();
    }
});