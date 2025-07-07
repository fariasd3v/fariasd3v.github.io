document.addEventListener('DOMContentLoaded', () => {
    const formOrcamento = document.getElementById('formOrcamento');
    const feedbackMensagem = document.getElementById('feedbackMensagem');
    const urlSheetMonkey = 'https://api.sheetmonkey.io/form/cYjsaTbwZ4AX9duufZRLwT'; // Sua URL da API Sheet Monkey

    formOrcamento.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Coleta os dados do formulário
        const formData = new FormData(formOrcamento);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Exibe mensagem de carregamento
        feedbackMensagem.style.display = 'block';
        feedbackMensagem.className = 'alert alert-info';
        feedbackMensagem.textContent = 'Enviando orçamento...';

        try {
            const response = await fetch(urlSheetMonkey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Sheet Monkey espera JSON
                },
                body: JSON.stringify(data) // Converte os dados para JSON
            });

            if (response.ok) { // Verifica se a resposta foi bem-sucedida (status 2xx)
                feedbackMensagem.textContent = 'Orçamento enviado com sucesso! Entraremos em contato em breve.';
                feedbackMensagem.className = 'alert alert-success';
                formOrcamento.reset(); // Limpa o formulário após o envio
            } else {
                // Tenta ler a mensagem de erro da resposta, se disponível
                const errorDetails = await response.text(); // Usa .text() para ver o conteúdo
                console.error('Erro na resposta da API:', response.status, errorDetails);
                feedbackMensagem.textContent = `Erro ao enviar o orçamento. Por favor, tente novamente mais tarde. (Status: ${response.status})`;
                feedbackMensagem.className = 'alert alert-danger';
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            feedbackMensagem.textContent = 'Ocorreu um erro de conexão. Verifique sua internet e tente novamente.';
            feedbackMensagem.className = 'alert alert-danger';
        }
    });
});