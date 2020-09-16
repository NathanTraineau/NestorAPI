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
      description: 'Apartment resource successfully deleted',
    },
    badRequest: {
      description: 'Bad request, error from the client',
      responseType: 'badRequest'
    },
    serverError: {
      description: 'Internal server error',
      responseType: 'serverError'
    },

  },

  fn: async function (inputs, exits) {

    let deletedApartment = await Apartment.findOne({id : inputs.id});

    if (!deletedApartment){
      return exits.badRequest();
    }

    await Apartment.destroyOne({id: inputs.id})
        .intercept('*', 'serverError');

    await Room.destroyOne({apartment: inputs.id})
        .intercept('*', 'serverError');

    return exits.success();
  }
};
