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
    const nomeDoCliente = req.body.nome;
    const emailDoCliente = req.body.email;
    const mensagemDoCliente = req.body.mensagem;

    console.log("Nome:", nomeDoCliente);
    console.log("Email:", emailDoCliente);
    console.log("Mensagem:", mensagemDoCliente);

    try {

        await transporter.sendMail({

            from: process.env.MAIL_USER,

            to: process.env.MAIL_USER,

            replyTo: emailDoCliente,

    subject: `Novo contato de ${nomeDoCliente}`,

    html: `
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">

    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .header {
            background: #222222;
            padding: 25px;
            text-align: center;
            color: white;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 30px;
        }

        .info {
            background: #f7f7f7;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .label {
            font-weight: bold;
            color: #555555;
        }

        .message {
            background: #fafafa;
            border-left: 4px solid #222222;
            padding: 15px;
            margin-top: 10px;
            border-radius: 4px;
        }

        .footer {
            padding: 20px;
            text-align: center;
            color: #888888;
            font-size: 12px;
            border-top: 1px solid #eeeeee;
        }
    </style>
</head>

<body>

    <div class="container">

        <div class="header">
            <h1>📩 Novo contato</h1>
        </div>

        <div class="content">

            <p>Você recebeu uma nova mensagem através do seu site.</p>

            <div class="info">
                <p>
                    <span class="label">Nome:</span><br>
                    ${nomeDoCliente}
                </p>

                <p>
                    <span class="label">E-mail:</span><br>
                    ${emailDoCliente}
                </p>
            </div>

            <p class="label">Mensagem:</p>

            <div class="message">
                ${mensagemDoCliente}
            </div>

        </div>

        <div class="footer">
            Este e-mail foi enviado através do formulário de contato do seu site.
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








