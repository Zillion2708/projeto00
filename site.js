console.log("site funcionando")

const botao = document.getElementById("btn-cardapio");

botao.addEventListener("click", function (){
document.getElementById("cardapio").scrollIntoView()
});

const botoesadicionar = document.querySelectorAll(".btn-adicionar");

const carrinho = [];

const listaCarrinho = document.getElementById("lista-carrinho");
const totalcarrinho = document.getElementById("total-carrinho");

const btnCarrinho = document.getElementById("btn-carrinho");
const janelaCarrinho = document.getElementById("janela-carrinho");
const btnFechar = document.getElementById("btn-fechar");
const contadorCarrinho = document.getElementById("contador-carrinho");

const modalPedido = document.getElementById("modal-pedido");
const modalNome = document.getElementById("modal-nome");
const modalTotal = document.getElementById("modal-total");
const modalConfirmar = document.getElementById("modal-confirmar");
const modalCancelar = document.getElementById("modal-cancelar");
const linhasAdicionais = document.querySelectorAll(".adicional-linha");
const campoObservacao = document.getElementById("observacao");

let lancheAtual = null;

function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(function(item) {
        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;

        const btnMais = document.createElement("button");
        btnMais.textContent = "+";
        btnMais.addEventListener("click", function () {
            item.quantidade += 1;
            atualizarCarrinho();
        });

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.addEventListener("click", function () {
            item.quantidade -= 1;
            if (item.quantidade <= 0) {
                carrinho.splice(carrinho.indexOf(item), 1);
            }
            atualizarCarrinho();
        });

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "remover";
        btnRemover.addEventListener("click", function () {
            carrinho.splice(carrinho.indexOf(item), 1);
            atualizarCarrinho();
        });

        li.appendChild(texto);
        li.appendChild(btnMais);
        li.appendChild(btnMenos);
        li.appendChild(btnRemover);

        let detalhes = "";
        if (item.adicionais.length > 0) {
            detalhes += "Adicionais: " + item.adicionais.map(function (a) {
                return a.quantidade + "x " + a.nome;
            }).join(", ");
        }
        if (item.observacao) {
            if (detalhes) {
                detalhes += " | ";
            }
            detalhes += "Obs: " + item.observacao;
        }
        if (detalhes) {
            const divDetalhes = document.createElement("div");
            divDetalhes.textContent = detalhes;
            li.appendChild(divDetalhes);
        }

        listaCarrinho.appendChild(li);
        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;
    });

    totalcarrinho.textContent = total.toFixed(2).replace(".", ",");
    contadorCarrinho.textContent = quantidadeTotal;
}

function atualizarTotalModal() {
    let total = lancheAtual.preco;

    linhasAdicionais.forEach(function (linha) {
        const quantidade = Number(linha.querySelector(".qtd-adicional").textContent);
        total += Number(linha.dataset.preco) * quantidade;
    });

    modalTotal.textContent = total.toFixed(2).replace(".", ",");
}

botoesadicionar.forEach(function(botao){
    botao.addEventListener("click", function (){
        lancheAtual = {
            nome: botao.dataset.nome,
            preco: Number(botao.dataset.preco)
        };

        modalNome.textContent = lancheAtual.nome;

        linhasAdicionais.forEach(function (linha) {
            linha.querySelector(".qtd-adicional").textContent = "0";
        });
        campoObservacao.value = "";

        atualizarTotalModal();
        modalPedido.classList.add("aberto");
    });
});

linhasAdicionais.forEach(function (linha) {
    const qtd = linha.querySelector(".qtd-adicional");

    linha.querySelector(".mais").addEventListener("click", function () {
        qtd.textContent = Number(qtd.textContent) + 1;
        atualizarTotalModal();
    });

    linha.querySelector(".menos").addEventListener("click", function () {
        const atual = Number(qtd.textContent);
        if (atual > 0) {
            qtd.textContent = atual - 1;
        }
        atualizarTotalModal();
    });
});

modalConfirmar.addEventListener("click", function () {
    const adicionais = [];
    let precoUnitario = lancheAtual.preco;

    linhasAdicionais.forEach(function (linha) {
        const quantidade = Number(linha.querySelector(".qtd-adicional").textContent);
        if (quantidade > 0) {
            adicionais.push({ nome: linha.dataset.nome, quantidade: quantidade });
            precoUnitario += Number(linha.dataset.preco) * quantidade;
        }
    });

    carrinho.push({
        nome: lancheAtual.nome,
        preco: precoUnitario,
        quantidade: 1,
        adicionais: adicionais,
        observacao: campoObservacao.value.trim()
    });

    atualizarCarrinho();
    modalPedido.classList.remove("aberto");
});

modalCancelar.addEventListener("click", function () {
    modalPedido.classList.remove("aberto");
});

btnCarrinho.addEventListener("click", function () {
    janelaCarrinho.classList.toggle("aberta");
});

btnFechar.addEventListener("click", function () {
    janelaCarrinho.classList.remove("aberta");
});

const btnFinalizar = document.getElementById("btn-finalizar");
const modalFinalizar = document.getElementById("modal-finalizar");
const btnConfirmar = document.getElementById("btn-confirmar");
const btnCancelar = document.getElementById("btn-cancelar");
const modalDados = document.getElementById("modal-dados");
const dadosVoltar = document.getElementById("dados-voltar");

btnFinalizar.addEventListener("click", function () {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }
    modalFinalizar.classList.add("aberto");
});

btnCancelar.addEventListener("click", function () {
    modalFinalizar.classList.remove("aberto");
});

btnConfirmar.addEventListener("click", function () {
    modalFinalizar.classList.remove("aberto");
    modalDados.classList.add("aberto");
});

dadosVoltar.addEventListener("click", function () {
    modalDados.classList.remove("aberto");
});

// NOVO: formulário de dados da entrega
const formEntrega = document.getElementById("form-entrega");

// NOVO: clique em "enviar pedido"
formEntrega.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let totalPedido = 0;
    carrinho.forEach(function (item) {
        totalPedido += item.preco * item.quantidade;
    });

    const pedido = {
        cliente: {
            nome: document.getElementById("nome-cliente").value.trim(),
            telefone: document.getElementById("telefone-cliente").value.trim(),
            rua: document.getElementById("rua-cliente").value.trim(),
            numero: document.getElementById("numero-cliente").value.trim(),
            bairro: document.getElementById("bairro-cliente").value.trim()
        },
        itens: carrinho.slice(),
        total: totalPedido,
        pago: false
    };

    console.log(pedido);
    alert("Pedido enviado! Obrigado, " + pedido.cliente.nome + ".");

    carrinho.length = 0;
    atualizarCarrinho();
    formEntrega.reset();
    modalDados.classList.remove("aberto");
    janelaCarrinho.classList.remove("aberta");
});