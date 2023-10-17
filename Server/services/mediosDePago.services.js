const mediosDePagoRepository = require("../repositories/mediosDePago.repositories");

exports.getMediosDePago = (callback) => {
  mediosDePagoRepository.getMediosDePago((err, results) => {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, results);
    }
  });
};
