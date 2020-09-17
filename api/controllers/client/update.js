/**
 * Client Controller update actions
 *
 */


module.exports = {
  inputs: {
    id: {
      type: 'string',
      required : true
    },
    firstName: {
      type: 'string',
      maxLength: 100,
      example: 'Jean'
    },
    lastName : {
      type: 'string',
      maxLength: 100,
      example: 'Dupont'
    },
    email: {
      type: 'string',
      unique: true,
      isEmail: true,
      example: 'nathan.trn@orange.fr'
    },
    phoneNumber : {
      type: 'string',
      example: '0637492131'
    },
    birthDate : {
      type: 'string',
      example: '30/11/1997'
    },
    nationality : {
      type: 'string',
      example: 'Français'
    }
  },
  exits: {
    success: {
      description: 'Client successfully added',
    },
    badRequest: {
      description: 'Bad request, the client doesn\'t exists.',
      responseType: 'badRequest'
    },
    error: {
      description: 'Internal server error from update client',
      responseType: 'serverError'
    }
  },

  fn: async (inputs, exits) => {

    let updatedClient = await Client.updateOne({id: inputs.id})
    .set(inputs)
    .intercept('*', 'serverError');

    if (!updatedClient){
      return exits.badRequest('The client doesn\'t exists.');
    }

    const client = await Client.findOne({id : inputs.id})
    .intercept('*', 'serverError')
    .populate('room');

    return exits.success(client);
  }
};


