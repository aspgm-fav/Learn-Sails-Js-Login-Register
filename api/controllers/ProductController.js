module.exports = {
  async create(req, res) {
    try {
      const payload = req.only(['name', 'description', 'price', 'stock']);
      const product = await Product.create(payload).fetch();
      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({ error: err.message || err });
    }
  },

  async find(req, res) {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const skip = parseInt(req.query.skip) || 0;
      const products = await Product.find().limit(limit).skip(skip).sort('id DESC');
      const total = await Product.count();
      return res.json({ total, limit, skip, data: products });
    } catch (err) {
      return res.serverError(err);
    }
  },

  async findOne(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.badRequest({ error: 'Missing id param' });
      const product = await Product.findOne({ id });
      if (!product) return res.notFound();
      return res.json(product);
    } catch (err) {
      return res.serverError(err);
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.badRequest({ error: 'Missing id param' });
      const payload = req.only(['name', 'description', 'price', 'stock']);
      const updated = await Product.updateOne({ id }).set(payload);
      if (!updated) return res.notFound();
      return res.json(updated);
    } catch (err) {
      return res.serverError(err);
    }
  },

  async destroy(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.badRequest({ error: 'Missing id param' });
      const deleted = await Product.destroyOne({ id });
      if (!deleted) return res.notFound();
      return res.json({ message: 'Deleted', deleted });
    } catch (err) {
      return res.serverError(err);
    }
  }
};
