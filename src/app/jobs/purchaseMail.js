const Mail = require('../services/Mail');

class PurchaseMail {
  get key() {
    return 'PurchaseMail';
  }

  async handle(job, done) {
    const {user, content, purchaseAd} = job.data;
    await Mail.sendMail({
      from: '"Davi Ribeiro" <luminuszz43@gmail.com>',
      to: purchaseAd.author.email,
      subject: `Solcitação de compra : ${purchaseAd.title}`,

      html: `<html>
      <head>
        <style>
          body{
            font-family: Arial, Helvetica, sans-serif;
          }
        </style>
      </head>

      <body>
          <strong> Heelo,</strong>
          <p>Você tem uma nova solicitão de compra para o anuncio {{ ad.title }}</p>
              <br>

          <strong>Nome do usuário ${user.name} ({{ user.email }})</strong>
          <p> ${content}</p>
      </body>

    </html>
    `,
    });
    return done();
  }
}

module.exports = new PurchaseMail();
