
const formularioV2 = document.getElementById("newsletter-form");

        if (formularioV2) {

            formularioV2.addEventListener("submit", (event) => {

                event.preventDefault();

                // PEGANDO OS DADOS DO FORMULÁRIO
                const email = document.getElementById("emailV2").value;

                // ENVIANDO PARA O NODE
                fetch("https://nexa-digital-wz98.onrender.com//enviar-email", {

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
