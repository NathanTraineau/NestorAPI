/**
 * Client Controller delete actions
 */

module.exports = {

  inputs: {
    id: {
      type: 'string',
    },
  },
  exits: {

    success: {
      description: 'Client resource successfully deleted',
    },
    badRequest: {
      description: 'Bad request, error from the client',
      responseType: 'badRequest'
    },
    error: {
      description: 'Internal server error',
      responseType: 'serverError'
    },

  },

  fn: async function (inputs, exits) {

    let apartment = await Apartment.find({id : inputs.id})
    .intercept('*', 'serverError')
    .populate('room');

    if (!apartment){
      return exits.badRequest('The apartment doesn\'t exists.');
    }
    return exits.success(apartment);
  }
};
