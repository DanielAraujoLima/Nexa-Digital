
const formularioV2 = document.getElementById("form-card");

        if (formularioV2) {

            formularioV2.addEventListener("submit", (event) => {

                event.preventDefault();

                // PEGANDO OS DADOS DO FORMULÁRIO
                const nome = document.getElementById("nome").value;
                const email = document.getElementById("email").value;
                const telefone = document.getElementById("telefone").value;
                const empresa = document.getElementById("empresa").value;
                const assunto = document.getElementById("assunto").value;
                const mensagem = document.getElementById("mensagem").value;

                // ENVIANDO PARA O NODE
                fetch("https://nexa-digital-wz98.onrender.com/enviar-email", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        nome: nome,
                        email: email,
                        telefone: telefone,
                        empresa: empresa,
                        assunto: assunto,
                        mensagem: mensagem,
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
