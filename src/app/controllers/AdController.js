const Ad = require('../models/Ad');


class AdController {
  async index(req, res) {
    /**
     * Conditions
     */


    /**
     * Filters
     */
    const filters ={
      purchasedBy: null,
    };

    if (req.query.price_min ||req.query.price_max ) {
      filters.price = {};

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min;
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max;
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.tilte, 'i');
    }

    /**
     * End Filters
     */


    const ads = await Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      populate: ['author'],
      sort: '-createdAt',
    });

    return res.json(ads);
  }
  async show(req, res) {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.send('Post not exists');
    }

    return res.json(ad);
  }
  async store(req, res) {
    const ad = await Ad.create({...req.body, author: req.userId});

    return res.json(ad);
  }


  async uptade( req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(ad);
  }
  async destroy( req, res) {
    await Ad.findOneAndDelete(req.params.id);

    return res.send('Removido');
  }
}


module.exports = new AdController();
