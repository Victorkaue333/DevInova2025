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
                // Atualiza o HTML para mostrar a mensagem de "começou"
                const contagemTitulo = document.getElementById('countdown-heading');
                if(contagemTitulo) {
                    contagemTitulo.innerText = ''; // Limpa o título "Faltam para..."
                }
                countdownElement.innerHTML = "<h3>O EVENTO JÁ COMEÇOU!</h3>";
            }
        }, 1000);
    }

    // Função auxiliar para adicionar um zero à esquerda (ex: 9 -> 09)
    function formatarTempo(tempo) {
        return tempo < 10 ? `0${tempo}` : tempo;
    }


    // --- LÓGICA DA PÁGINA INSCRIÇÃO (MODAL) ---
    
    // Procura se o formulário existe na página atual
    const form = document.getElementById("form-inscricao");
    
    // SÓ executa o código do formulário/modal se o formulário existir nesta página
    if (form) {
        
        // Seleciona os elementos do formulário e do modal DENTRO do IF
        const feedbackDiv = document.getElementById("form-feedback");
        const modalOverlay = document.getElementById("modal-overlay");
        const modalCloseBtn = document.getElementById("modal-close");

        // 1. Ouve o envio (submit) do formulário
        form.addEventListener("submit", (e) => {
            
            // Previne o recarregamento da página
            e.preventDefault(); 
            
            // Esconde mensagens de erro antigas
            feedbackDiv.style.display = "none";
            feedbackDiv.className = "";

            // 2. Verifica se o formulário é válido (campos 'required' preenchidos)
            if (form.checkValidity()) {
                
                // SUCESSO: Mostra o modal
                modalOverlay.classList.add("mostrar");
                
                // Limpa o formulário
                form.reset();

            } else {
                
                // ERRO: Mostra a mensagem de erro
                feedbackDiv.textContent = "Por favor, preencha todos os campos obrigatórios.";
                feedbackDiv.className = "erro"; // Usa a classe 'erro' do seu CSS
                feedbackDiv.style.display = "block"; // Garante que o div de erro apareça
                
                // Força a validação do navegador a mostrar quais campos faltam
                form.reportValidity();
            }
        });

        // 3. Ouve o clique no botão "Fechar" do modal
        modalCloseBtn.addEventListener("click", () => {
            modalOverlay.classList.remove("mostrar");
        });
        
        // 4. (Opcional) Fecha o modal se clicar no fundo escuro
        modalOverlay.addEventListener("click", (e) => {
            // Verifica se o clique foi no overlay (fundo) e não no modal-content
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove("mostrar");
            }
        });
    }

}); 