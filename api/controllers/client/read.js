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

    let client = await Client.find({id : inputs.id})
    .intercept('*', 'serverError')
    .populate('room');

    if (!client){
      return exits.badRequest('The client doesn\'t exists.');
    }
    return exits.success(client);
  }
};
