const Ad = require('../models/Ad');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Queue = require('../services/Queue');
const PurchaseMail = require('../jobs/purchaseMail');
class PurchaseController {
  async store(req, res) {
    const {ad, content} = req.body;
    const purchaseAd = await Ad.findById(ad).populate('author');
    const user = await User.findById(req.userId);

    const purchaseLog = await Purchase.create({
      purchaseState: false,
      idUser: user._id,
      idAd: ad,
    });

    Queue.create(PurchaseMail.key, {
      purchaseAd,
      purchaseLogId: purchaseLog._id,
      user,
      content,
    }).save();
    // Salvando purchase no banco

    return res.status(200).json({teste: 'ok', purchaseLog});
  }

  async purchaseSell(req, res) {
    const purchaseUptade = await Purchase.findByIdAndUpdate(
        req.params.id,
        {purchaseState: true},
        {
          new: true,
        },
    );
    res.status(200).json(purchaseUptade);
  }
}
module.exports = new PurchaseController();
