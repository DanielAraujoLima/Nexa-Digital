require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

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

    console.log("Email recebido:", email);

    try {

        await transporter.sendMail({

            from: process.env.MAIL_USER,

            to: email,

            replyTo: process.env.MAIL_USER,

    subject: `Novas dicas para ${email}`,

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
            background-color: #f4f7fc;
            font-family: Arial, Helvetica, sans-serif;
            color: #111111;
        }

        .wrapper {
            width: 100%;
            padding: 30px 15px;
            box-sizing: border-box;
        }

        .container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
        }

        /* CABEÇALHO */
        .header {
            background-color: #e7eef8;
            padding: 35px 30px;
            text-align: center;
        }

        .logo-box {
            width: 70px;
            height: 70px;
            margin: 0 auto 20px auto;
            background-color: #075bea;
            border-radius: 15px;
            line-height: 70px;
            color: #ffffff;
            font-size: 34px;
        }

        .header h1 {
            margin: 0;
            font-size: 30px;
            line-height: 1.2;
            color: #111111;
        }

        .header p {
            margin: 12px 0 0 0;
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
        }

        /* CONTEÚDO */
        .content {
            padding: 35px 32px;
        }

        .content h2 {
            margin: 0 0 12px 0;
            font-size: 23px;
            color: #111111;
        }

        .content-intro {
            margin: 0 0 28px 0;
            font-size: 16px;
            line-height: 1.7;
            color: #555555;
        }

        /* DICAS */
        .tip {
            margin-bottom: 16px;
            padding: 20px;
            background-color: #f5f8fd;
            border-radius: 10px;
            border-left: 4px solid #075bea;
        }

        .tip h3 {
            margin: 0 0 8px 0;
            font-size: 17px;
            color: #111111;
        }

        .tip p {
            margin: 0;
            font-size: 14px;
            line-height: 1.6;
            color: #555555;
        }

        /* CTA */
        .cta {
            margin-top: 30px;
            padding: 25px;
            background-color: #075bea;
            border-radius: 12px;
            text-align: center;
        }

        .cta h3 {
            margin: 0 0 8px 0;
            color: #ffffff;
            font-size: 20px;
        }

        .cta p {
            margin: 0;
            color: #eaf1ff;
            font-size: 14px;
            line-height: 1.6;
        }

        /* RODAPÉ */
        .footer {
            padding: 22px 30px;
            text-align: center;
            border-top: 1px solid #eeeeee;
        }

        .footer p {
            margin: 0;
            font-size: 12px;
            line-height: 1.6;
            color: #888888;
        }

        @media only screen and (max-width: 600px) {

            .wrapper {
                padding: 15px 8px;
            }

            .header {
                padding: 30px 20px;
            }

            .header h1 {
                font-size: 25px;
            }

            .content {
                padding: 28px 20px;
            }

            .content h2 {
                font-size: 21px;
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

            <!-- CABEÇALHO -->
            <div class="header">

                <div class="logo-box">
                    ✦
                </div>

                <h1>
                    Nexus Digital
                </h1>

                <p>
                    Dicas, novidades e conteúdos para você ficar por dentro do mundo digital.
                </p>

            </div>


            <!-- CONTEÚDO -->
            <div class="content">

                <h2>
                    Conteúdo exclusivo para você 🚀
                </h2>

                <p class="content-intro">
                    Seja bem-vindo à Nexus Digital! 
                    A partir de agora, você receberá conteúdos selecionados
                    para ajudar você a aproveitar melhor as oportunidades do
                    mundo digital.
                </p>


                <!-- DICA 1 -->
                <div class="tip">

                    <h3>
                        💡 Dica digital
                    </h3>

                    <p>
                        Pequenas melhorias na sua presença digital podem fazer
                        uma grande diferença. Mantenha seus conteúdos claros,
                        objetivos e fáceis de encontrar.
                    </p>

                </div>


                <!-- DICA 2 -->
                <div class="tip">

                    <h3>
                        📱 Esteja onde seu público está
                    </h3>

                    <p>
                        Ter uma presença digital consistente ajuda sua marca
                        a ser lembrada e facilita o contato com seus clientes.
                    </p>

                </div>


                <!-- DICA 3 -->
                <div class="tip">

                    <h3>
                        🚀 Continue evoluindo
                    </h3>

                    <p>
                        O mundo digital está sempre mudando. Acompanhar novas
                        ferramentas, estratégias e tendências pode abrir novas
                        oportunidades.
                    </p>

                </div>


                <!-- CTA -->
                <div class="cta">

                    <h3>
                        Fique conectado com a Nexus Digital
                    </h3>

                    <p>
                        Em breve, você receberá mais dicas, novidades e conteúdos
                        exclusivos diretamente no seu e-mail.
                    </p>

                </div>

            </div>


            <!-- RODAPÉ -->
            <div class="footer">

                <p>
                    Você recebeu este e-mail porque se cadastrou para receber
                    novidades da Nexus Digital.
                </p>

                <p style="margin-top: 8px;">
                    Nexus Digital • Conteúdo e tecnologia para o mundo digital.
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


app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});









