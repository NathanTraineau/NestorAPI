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
    serverError: {
      description: 'Internal server error',
      responseType: 'serverError'
    },

  },

  fn: async function (inputs, exits) {

    let deletedClient = await Client.findOne({id : inputs.id});

    if (!deletedClient){
      return exits.badRequest('The client doesn\'t exists.');
    }

    await Client.destroyOne({id: inputs.id})
        .intercept('*', 'serverError');
    return exits.success();
  }
};
