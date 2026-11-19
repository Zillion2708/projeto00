console.log("site funcionando")

const botao = document.getElementById("btn-cardapio");

botao.addEventListener("click", function (){
document.getElementById("cardapio").scrollIntoView()
});

const botoesadicionar = document.querySelectorAll(".btn-adicionar");

botoesadicionar.forEach(function(botao){
    botao.addEventListener("click", function (){
   const nome = botao.dataset.nome;
   const preco = Number(botao.dataset.preco);
   console.log(nome, preco)
    });
});