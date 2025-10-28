module.exports = {
  tableName: 'product',
  attributes: {
    name: {
      type: 'string',
      required: true,
      maxLength: 255
    },
    description: {
      type: 'string',
      allowNull: true
    },
    price: {
      type: 'number',
      required: true,
      custom: (val) => val >= 0
    },
    stock: {
      type: 'number',
      defaultsTo: 0,
      custom: (val) => Number.isInteger(val) && val >= 0
    }
  }
};
