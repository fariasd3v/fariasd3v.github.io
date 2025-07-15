//FUNÇÃO QUEBRA DE TEXTO
//function quebraDeLinha() {
//  return <br />;

// FUNÇÃO QUE RETORNA O VALOR DO CALCULO DE CONSUMO DISTANCIA / CONSUMO MÉDIO 
function calculoConsumo(distancia, consumo) {
    return distancia / consumo;
}

// Funções auxiliares para validar entrada numérica
function validarNumeroFloat(entrada) {
    return /^[0-9]*\.?[0-9]+$/.test(entrada);
}

function validarNumeroInteiro(entrada) {
    return /^[0-9]+$/.test(entrada);
}

// FUNÇÃO PRINCIPAL DISPARADA PELO BOTÃO
function iniciarCalculo() {
    // LÊ O VALOR DO USUARIO E ARMAZENA EM distancia_percorrida // PARTE 1
    // função parseFloat para que seja lida uma entrada  em valor flutuante
    let input = prompt('Qual a distancia percorrida da sua casa até seu trabalho (em KM)?');
    while (!validarNumeroFloat(input) || isNaN(parseFloat(input)) || parseFloat(input) <= 0) {
        input = prompt('Valor inválido! Digite a distância em KM (ex: 12.5):');
    }
    let distancia_Percorrida = parseFloat(input);
    //alert(`Perfeito, então a distância percorrida é de:${distancia_Percorrida}`);

    // LÊ O VALOR DO USUARIO E ARMAZENA EM consumo_medio  //  PARTE 2 
    // função parseFloat para que seja lida uma entrada  em valor flutuante
    input = prompt('Qual o consumo médio do seu veiculo?');
    while (!validarNumeroFloat(input) || isNaN(parseFloat(input)) || parseFloat(input) <= 0) {
        input = prompt('Valor inválido! Digite o consumo médio (ex: 10.2):');
    }
    let consumo_Medio = parseFloat(input);
    //alert(`Ótimo! Então o consumo médio do seu carro é de:${consumo_Medio}`);

    let calculoCs = calculoConsumo(distancia_Percorrida, consumo_Medio);
    //alert(`O consumo é de:${calculoCs} litros!`);

    // função parseInt para que seja lida uma entrada  em valor Inteiro // PARTE 3 
    input = prompt('Em quantos postos você pesquisou?');
    while (!validarNumeroInteiro(input) || isNaN(parseInt(input)) || parseInt(input) <= 0 || parseInt(input) > 10) {
        input = prompt('Valor inválido! Digite um número inteiro positivo (máximo de 10):');
    }
    let quantidade_Postos_Pesquisados = parseInt(input);
    //alert(`Certo! O numero de postos consultados foi de:${quantidade_Postos_Pesquisados},certo?`);

    // ARRAY VAZIO SEM VALOR DEFINIDO -- RECEBE O TAMANHO DE ACORDO COM O PROMPT DO USUARIO, AS REPETICOES IGUALAM
    let postos = [];
    for (let i = 0; i < quantidade_Postos_Pesquisados; i++) {
        input = prompt('Digite o valor encontrado no posto: ' + (i + 1));
        while (!validarNumeroFloat(input) || isNaN(parseFloat(input)) || parseFloat(input) <= 0) {
            input = prompt('Valor inválido! Digite novamente o valor do posto ' + (i + 1) + ':');
        }
        postos[i] = parseFloat(input);
    }

    // LAÇO SEPARADO PARA VERIFICAR O MENOR VALOR DIGITADO E COMPARAR SE O INDICE 0 AINDA É MENOR, HERDANDO
    let menorValor = postos[0];
    for (let index = 1; index < postos.length; index++) {
        if (postos[index] < menorValor) {
            menorValor = postos[index];
        }
    }
    //alert("O menor valor encontrado foi: " + menorValor);

    let somaTotal = 0;
    for (let i = 0; i < postos.length; i++) {
        somaTotal = somaTotal + postos[i];
    }

    let media = somaTotal / quantidade_Postos_Pesquisados;
    let gasto_Diario = 2 * (calculoCs * menorValor);

    // MANIPULAÇÃO DO ELEMENTO PELO JAVASCRIPT ONDE MENSAGEM RECEBE TODOS ESSES VALORES NO HTML
    let resultado = document.getElementById("saidainner");

    let mensagem = "";
    mensagem += "Consumo médio: " + consumo_Medio + " km/l<br>";
    mensagem += "Soma total dos preços: R$ " + somaTotal.toFixed(2) + "<br>";
    mensagem += "Distância percorrida: " + distancia_Percorrida + " km<br>";
    mensagem += "Consumo calculado: " + calculoCs.toFixed(2) + " litros<br>";
    mensagem += "Média dos preços: R$ " + media.toFixed(2) + "<br>";
    mensagem += "Menor valor dos postos: R$ " + menorValor.toFixed(2) + "<br>";
    mensagem += "Gasto diário (ida e volta) R$ " + gasto_Diario.toFixed(2) + "<br>";
    // QUANTIDADE DE POSTOS É UM INTEIRO POR ISSO NAO TEM FIXED, QUE É PRA NUMEROS FLOAT
    mensagem += "Número total de postos pesquisados:" + quantidade_Postos_Pesquisados + "<br>";
    resultado.innerHTML = mensagem;
}

// CÓDIGO QUE ASSOCIA A FUNÇÃO AO BOTÃO QUANDO A PÁGINA TERMINAR DE CARREGAR
document.addEventListener("DOMContentLoaded", function () {
    const botao = document.getElementById("iniciarCalculoBtn");
    if (botao) {
        botao.addEventListener("click", iniciarCalculo);
    }

    const btnGuia = document.getElementById("btnGuia");
    if (btnGuia) {
        btnGuia.addEventListener("click", function (event) {
            event.preventDefault(); // evita qualquer comportamento padrão inesperado
            const guiaTexto = document.getElementById("guiaTexto");
            if (guiaTexto.style.display === "none") {
                guiaTexto.style.display = "block";
            } else {
                guiaTexto.style.display = "none";
            }
        });
    }
});