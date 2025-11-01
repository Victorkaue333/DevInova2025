// Aguarda o DOM (estrutura HTML) ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA PÁGINA INDEX (CONTAGEM REGRESSIVA) ---
    
    // Procura se o elemento da contagem existe na página atual
    const countdownElement = document.getElementById('countdown-timer');
    if (countdownElement) {
        // Define a data do evento (Ano, Mês-1, Dia, Hora, Minuto, Segundo)
        // Ex: 15 de Outubro de 2025 às 09:00
        const dataEvento = new Date(2025, 9, 15, 9, 0, 0).getTime(); // Mês 9 = Outubro

        // Atualiza a contagem a cada 1 segundo
        const intervalo = setInterval(() => {
            const agora = new Date().getTime();
            const distancia = dataEvento - agora;

            // Cálculos de tempo
            const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

            // Exibe o resultado nos elementos
            document.getElementById('dias').innerText = formatarTempo(dias);
            document.getElementById('horas').innerText = formatarTempo(horas);
            document.getElementById('minutos').innerText = formatarTempo(minutos);
            document.getElementById('segundos').innerText = formatarTempo(segundos);

            // Se a contagem terminar
            if (distancia < 0) {
                clearInterval(intervalo);
                countdownElement.innerHTML = "<h3>O EVENTO JÁ COMEÇOU!</h3>";
            }
        }, 1000);
    }

    // Função auxiliar para adicionar um zero à esquerda (ex: 9 -> 09)
    function formatarTempo(tempo) {
        return tempo < 10 ? `0${tempo}` : tempo;
    }


    // --- LÓGICA DA PÁGINA INSCRIÇÃO (VALIDAÇÃO DO FORMULÁRIO) ---
    
    // Procura se o formulário existe na página atual
    const formInscricao = document.getElementById('form-inscricao');
    if (formInscricao) {
        
        formInscricao.addEventListener('submit', (evento) => {
            // Previne o envio padrão do formulário (que recarregaria a página)
            evento.preventDefault(); 

            // Pega os elementos do formulário
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const interesse = document.getElementById('interesse');
            const newsletter = document.getElementById('newsletter'); // Checkbox da newsletter
            const feedback = document.getElementById('form-feedback');

            // Limpa mensagens de erro/sucesso anteriores
            feedback.innerHTML = '';
            feedback.className = ''; // Remove classes de erro/sucesso

            let erros = [];

            // Validações
            if (nome.value.trim() === '') { // .trim() remove espaços em branco
                erros.push('O campo Nome Completo é obrigatório.');
            }
            if (email.value.trim() === '') {
                erros.push('O campo E-mail é obrigatório.');
            } else if (!validarEmail(email.value)) { // Validação de formato de email
                erros.push('Por favor, insira um e-mail válido.');
            }
            if (interesse.value === '') {
                erros.push('Você deve selecionar uma Área de Interesse.');
            }
            // A newsletter é opcional, então não precisa de validação para ser marcada.
            // Se o usuário QUISER aceitar termos de serviço, aí sim faríamos:
            // if (!termos.checked) { erros.push('Você deve aceitar os termos.'); }

            // Exibe os erros ou o sucesso
            if (erros.length > 0) {
                feedback.className = 'erro';
                feedback.innerHTML = '<strong>Ops! Verifique os erros:</strong><br>' + erros.join('<br>');
            } else {
                // Se tudo estiver OK
                feedback.className = 'sucesso';
                feedback.innerHTML = `Inscrição para ${nome.value} realizada com sucesso! Nos vemos no DevInova 2025.`;
                
                // Limpa o formulário após o sucesso
                formInscricao.reset();
            }
        });
    }

    // Função auxiliar para validar o formato do e-mail
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

});