//CABEÇALHO DA PAGINA
// CABEÇALHO DA PÁGINA

fetch("header.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("header").innerHTML = data;

        // MANTER O MENU DA PÁGINA ATIVO

        const botaoMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-mobile");

if (botaoMenu && menu) {

    botaoMenu.addEventListener("click", () => {

        menu.classList.toggle("menu-aberto");

        botaoMenu.classList.toggle("menu-aberto");

    });

}

        const caminhoAtual = window.location.pathname;
        let paginaAtual = caminhoAtual.split("/").pop();

        if (paginaAtual === "") {
            paginaAtual = "index.html";
        }

        const links = document.querySelectorAll(".menu");

        links.forEach(link => {

            const paginaLink = link.getAttribute("href");

            if (paginaLink === paginaAtual) {
                link.classList.add("active");
            }

        });

    });



fetch("formulario.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("formulario").innerHTML = data;

        const formulario = document.getElementById("form-contato");

        if (formulario) {

            formulario.addEventListener("submit", (event) => {

                event.preventDefault();

                // PEGANDO OS DADOS DO FORMULÁRIO
                const nomeDoCliente = document.getElementById("nome").value;
                const emailDoCliente = document.getElementById("email").value;
                const mensagemDoCliente = document.getElementById("mensagem").value;

                // ENVIANDO PARA O NODE
                fetch("https://nexa-digital-wz98.onrender.com//enviar-email", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nome: nomeDoCliente,
                        email: emailDoCliente,
                        mensagem: mensagemDoCliente
                    })

                })
                .then(response => response.json())
                .then(data => {

                    if (data.sucesso) {
                        alert("Mensagem enviada com sucesso!");
                    } else {
                        alert("Erro ao enviar mensagem.");
                    }

                })
                .catch(error => {

                    console.error("Erro:", error);
                    alert("Não foi possível enviar a mensagem.");

                });

            });
        }

    });
    




    //FORMULARIO DOS BOTOES
function openform() {
    const formulario = document.querySelector(".formulario");

    formulario.classList.add("aberto");
}

//VIDEO DA PAGINA PRINCIPAL
function abrirVideo() {
    document.getElementById("youtubeVideo").src =
        "https://www.youtube.com/embed/DmHj1lHWNIw?autoplay=1";

    document.getElementById("videoModal").style.display = "flex";
}

function fecharVideo() {
    document.getElementById("videoModal").style.display = "none";
    document.getElementById("youtubeVideo").src = "";
}


//CATEGORIAS DA PAGINA
document.addEventListener("DOMContentLoaded", () => {

    const categorias = document.querySelectorAll(".categoria");
    const projetos = document.querySelectorAll(".projeto");

    categorias.forEach(categoria => {

        categoria.addEventListener("click", () => {

            categorias.forEach(c => {
                c.classList.remove("active");
            });

            categoria.classList.add("active");

            const categoriaSelecionada = categoria.dataset.categoria;

            projetos.forEach(projeto => {

                const categoriasProjeto = projeto.dataset.categoria.split(" ");

                if (
                    categoriaSelecionada === "todos" ||
                    categoriasProjeto.includes(categoriaSelecionada)
                ) {
                    projeto.classList.remove("escondido");
                } else {
                    projeto.classList.add("escondido");
                }

            });

        });

    });

});


//RODAPÉ DA PAGINA
fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;

        
const formularioV2 = document.getElementById("footer-form");

        if (formularioV2) {

            formularioV2.addEventListener("submit", (event) => {

                event.preventDefault();

                // PEGANDO OS DADOS DO FORMULÁRIO
                const email = document.getElementById("emailV2").value;

                // ENVIANDO PARA O NODE
                fetch("http://localhost:3000/enviar-email", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                    })

                })
                .then(response => response.json())
                .then(data => {

                    if (data.sucesso) {
                        alert("Mensagem enviada com sucesso!");
                    } else {
                        alert("Erro ao enviar mensagem.");
                    }

                })
                .catch(error => {

                    console.error("Erro:", error);
                    alert("Não foi possível enviar a mensagem.");

                });

            });
        }


        // MANTER O RODAPE DA PÁGINA ATIVO

        const caminhoAtual = window.location.pathname;
        let paginaAtual = caminhoAtual.split("/").pop();

        if (paginaAtual === "") {
            paginaAtual = "index.html";
        }

        const links = document.querySelectorAll(".rodape");

        links.forEach(link => {

            const paginaLink = link.getAttribute("href");

            if (paginaLink === paginaAtual) {
                link.classList.add("active");
            }

        });
    });


 /* =========================================
   CARROSSEL DEPOIMENTOS V10
   ========================================= */

const depoimentosV10 = document.getElementById("depoimentos-v10");

const botaoProximoV10 = document.getElementById("proximo-v10");

const botaoAnteriorV10 = document.getElementById("anterior-v10");


/* =========================================
   CONFIGURAÇÕES
   ========================================= */

const cardsVisiveisV10 = 3;

const velocidadeV10 =
    "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";


/* =========================================
   CARDS ORIGINAIS
   ========================================= */

const cardsOriginaisV10 = Array.from(
    depoimentosV10.querySelectorAll(".depoimento-v10")
);


/* =========================================
   QUANTIDADE DE CARDS
   ========================================= */

const quantidadeCardsV10 =
    cardsOriginaisV10.length;


/* =========================================
   DUPLICA OS PRIMEIROS 3 CARDS
   PARA CRIAR O LOOP INFINITO
   ========================================= */

cardsOriginaisV10
    .slice(0, cardsVisiveisV10)
    .forEach((cardV10) => {

        const cloneV10 =
            cardV10.cloneNode(true);

        cloneV10.classList.add("clone-v10");

        depoimentosV10.appendChild(cloneV10);

    });


/* =========================================
   POSIÇÃO ATUAL
   ========================================= */

let posicaoV10 = 0;


/* =========================================
   CONTROLE DA ANIMAÇÃO
   ========================================= */

let animandoV10 = false;


/* =========================================
   DESCOBRE A LARGURA DE 1 CARD
   ========================================= */

function larguraCardV10() {

    const cardV10 =
        depoimentosV10.querySelector(
            ".depoimento-v10"
        );


    const estiloV10 =
        window.getComputedStyle(
            depoimentosV10
        );


    const gapV10 =
        parseFloat(
            estiloV10.columnGap
        ) || parseFloat(
            estiloV10.gap
        ) || 0;


    return cardV10.offsetWidth + gapV10;

}


/* =========================================
   MOVER PARA O PRÓXIMO
   ========================================= */

function proximoV10() {

    if (animandoV10) return;


    animandoV10 = true;


    posicaoV10++;


    const distanciaV10 =
        larguraCardV10();


    depoimentosV10.style.transition =
        velocidadeV10;


    depoimentosV10.style.transform =
        `translateX(-${posicaoV10 * distanciaV10}px)`;


    depoimentosV10.addEventListener(
        "transitionend",
        finalizarAnimacaoV10,
        { once: true }
    );

}


/* =========================================
   FINALIZA A ANIMAÇÃO
   ========================================= */

function finalizarAnimacaoV10() {

    /*
    Quando chegarmos aos clones,
    voltamos silenciosamente para
    o começo.
    */

    if (
        posicaoV10 >= quantidadeCardsV10
    ) {

        depoimentosV10.style.transition =
            "none";


        posicaoV10 = 0;


        depoimentosV10.style.transform =
            "translateX(0)";


        /*
        Força o navegador a aplicar
        a nova posição antes de
        liberar outro clique.
        */

        depoimentosV10.offsetHeight;

    }


    animandoV10 = false;

}


/* =========================================
   MOVER PARA O ANTERIOR
   ========================================= */

function anteriorV10() {

    if (animandoV10) return;


    /*
    Se estamos no começo,
    colocamos a posição no final
    antes de animar para trás.
    */

    if (posicaoV10 === 0) {

        depoimentosV10.style.transition =
            "none";


        posicaoV10 =
            quantidadeCardsV10;


        const distanciaInicialV10 =
            larguraCardV10();


        depoimentosV10.style.transform =
            `translateX(-${posicaoV10 * distanciaInicialV10}px)`;


        /*
        Força o navegador a aplicar
        a posição antes da animação.
        */

        depoimentosV10.offsetHeight;

    }


    animandoV10 = true;


    posicaoV10--;


    const distanciaV10 =
        larguraCardV10();


    depoimentosV10.style.transition =
        velocidadeV10;


    depoimentosV10.style.transform =
        `translateX(-${posicaoV10 * distanciaV10}px)`;


    depoimentosV10.addEventListener(
        "transitionend",
        finalizarAnimacaoV10,
        { once: true }
    );

}


/* =========================================
   BOTÃO PRÓXIMO
   ========================================= */

botaoProximoV10.addEventListener(
    "click",
    proximoV10
);


/* =========================================
   BOTÃO ANTERIOR
   ========================================= */

botaoAnteriorV10.addEventListener(
    "click",
    anteriorV10
);


/* =========================================
   RESPONSIVIDADE
   ========================================= */

window.addEventListener(
    "resize",
    () => {

        const distanciaV10 =
            larguraCardV10();


        depoimentosV10.style.transition =
            "none";


        depoimentosV10.style.transform =
            `translateX(-${posicaoV10 * distanciaV10}px)`;

    }
);

