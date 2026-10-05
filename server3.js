require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./")); 

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


app.post("/enviar-email", async (req, res) => {

    // SÓ AQUI o req.body existe
    const email = req.body.email;
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const empresa = req.body.empresa;
    const mensagem = req.body.mensagem;
    const assunto = req.body.assunto;


    console.log("Email recebido:", email);

    try {

        await transporter.sendMail({

            from: process.env.MAIL_USER,

            to: process.env.MAIL_USER,

            replyTo: email,

    subject: `Novas informações de contato de ${nome}`,

html: `
<!DOCTYPE html>
<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>

        body {
            margin: 0;
            padding: 0;
            background-color: #f1f5fb;
            font-family: Arial, Helvetica, sans-serif;
            color: #10213b;
        }

        .wrapper {
            width: 100%;
            padding: 35px 15px;
            box-sizing: border-box;
        }

        .container {
            max-width: 680px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
        }


        /* =========================
           CABEÇALHO
        ========================= */

        .header {
            background-color: #075bea;
            padding: 32px 35px;
        }

        .header-title {
            margin: 0;
            color: #ffffff;
            font-size: 28px;
            line-height: 1.2;
            font-weight: 700;
        }

        .header-subtitle {
            margin: 10px 0 0 0;
            color: #e8f0ff;
            font-size: 15px;
            line-height: 1.6;
        }


        /* =========================
           CONTEÚDO
        ========================= */

        .content {
            padding: 35px;
        }

        .intro {
            margin: 0 0 28px 0;
            color: #4f6078;
            font-size: 15px;
            line-height: 1.7;
        }


        /* =========================
           DADOS DO CLIENTE
        ========================= */

        .info-title {
            margin: 0 0 16px 0;
            font-size: 19px;
            color: #10213b;
        }

        .info-box {
            background-color: #f5f8fd;
            border-radius: 12px;
            padding: 22px;
        }

        .field {
            padding-bottom: 17px;
            margin-bottom: 17px;
            border-bottom: 1px solid #e1e8f2;
        }

        .field:last-child {
            padding-bottom: 0;
            margin-bottom: 0;
            border-bottom: none;
        }

        .label {
            display: block;
            margin-bottom: 5px;
            color: #718096;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .value {
            color: #10213b;
            font-size: 15px;
            line-height: 1.5;
            word-break: break-word;
        }


        /* =========================
           ASSUNTO
        ========================= */

        .subject-box {
            margin-top: 25px;
            padding: 18px 20px;
            background-color: #eef4ff;
            border-left: 4px solid #075bea;
            border-radius: 8px;
        }

        .subject-label {
            display: block;
            margin-bottom: 5px;
            color: #718096;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .subject-value {
            color: #075bea;
            font-size: 16px;
            font-weight: bold;
        }


        /* =========================
           MENSAGEM
        ========================= */

        .message-title {
            margin: 30px 0 12px 0;
            font-size: 19px;
            color: #10213b;
        }

        .message-box {
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dce4ef;
            border-left: 4px solid #075bea;
            border-radius: 8px;
            color: #44546a;
            font-size: 15px;
            line-height: 1.7;
            word-break: break-word;
        }


        /* =========================
           RODAPÉ
        ========================= */

        .footer {
            padding: 23px 35px;
            background-color: #f7f9fc;
            border-top: 1px solid #e6ebf2;
            text-align: center;
        }

        .footer p {
            margin: 0;
            color: #8793a5;
            font-size: 12px;
            line-height: 1.6;
        }

        .footer-brand {
            margin-top: 6px !important;
            color: #075bea !important;
            font-weight: bold;
        }


        /* =========================
           MOBILE
        ========================= */

        @media only screen and (max-width: 600px) {

            .wrapper {
                padding: 15px 8px;
            }

            .header {
                padding: 28px 22px;
            }

            .header-title {
                font-size: 24px;
            }

            .header-subtitle {
                font-size: 14px;
            }

            .content {
                padding: 28px 22px;
            }

            .info-box {
                padding: 18px;
            }

            .footer {
                padding: 20px;
            }

        }

    </style>

</head>


<body>

    <div class="wrapper">

        <div class="container">


            <!-- =========================
                 CABEÇALHO
            ========================== -->

            <div class="header">

                <h1 class="header-title">
                    Novo contato recebido
                </h1>

                <p class="header-subtitle">
                    Uma nova mensagem foi enviada através do formulário
                    de contato da Nexus Digital.
                </p>

            </div>


            <!-- =========================
                 CONTEÚDO
            ========================== -->

            <div class="content">

                <p class="intro">
                    Olá! Você recebeu uma nova solicitação de contato.
                    Confira abaixo todas as informações preenchidas pelo visitante.
                </p>


                <h2 class="info-title">
                    Informações do contato
                </h2>


                <div class="info-box">


                    <!-- NOME -->

                    <div class="field">

                        <span class="label">
                            Nome completo
                        </span>

                        <div class="value">
                            ${nome}
                        </div>

                    </div>


                    <!-- E-MAIL -->

                    <div class="field">

                        <span class="label">
                            E-mail corporativo
                        </span>

                        <div class="value">
                            ${email}
                        </div>

                    </div>


                    <!-- TELEFONE -->

                    <div class="field">

                        <span class="label">
                            Telefone / WhatsApp
                        </span>

                        <div class="value">
                            ${telefone}
                        </div>

                    </div>


                    <!-- EMPRESA -->

                    <div class="field">

                        <span class="label">
                            Empresa
                        </span>

                        <div class="value">
                            ${empresa}
                        </div>

                    </div>


                </div>


                <!-- =========================
                     ASSUNTO
                ========================== -->

                <div class="subject-box">

                    <span class="subject-label">
                        Assunto
                    </span>

                    <div class="subject-value">
                        ${assunto}
                    </div>

                </div>


                <!-- =========================
                     MENSAGEM
                ========================== -->

                <h2 class="message-title">
                    Mensagem
                </h2>

                <div class="message-box">
                    ${mensagem}
                </div>


            </div>


            <!-- =========================
                 RODAPÉ
            ========================== -->

            <div class="footer">

                <p>
                    Este e-mail foi enviado automaticamente
                    através do formulário de contato do site.
                </p>

                <p class="footer-brand">
                    Nexus Digital
                </p>

            </div>


        </div>

    </div>

</body>

</html>
`

        });

        console.log("Email enviado com sucesso!");

        res.json({
            sucesso: true
        });

    } catch (error) {

        console.error("Erro ao enviar email:", error);

        res.status(500).json({
            sucesso: false
        });

    }

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});







