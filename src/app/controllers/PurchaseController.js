const Ad = require('../models/Ad');
const User = require('../models/User');
const Mail = require('../services/Mail');

class PurchaseController {
  async store(req, res) {
    const {ad, content} = req.body;
    const purchaseAd = await Ad.findById(ad).populate('author');
    const user = await User.findById(req.UserId);

    await Mail.sendMail({
      from: '"Davi Ribeiro" <luminuszz43@gmail.com>',
      to: purchaseAd.author.email,
      subject: `Solcitação de compra : ${purchaseAd.title}`,
      html: '<p>TESTE</p>',
    });
    return res.status(200).json({teste: 'Sucesso'});
  }
} module.exports = new PurchaseController();
