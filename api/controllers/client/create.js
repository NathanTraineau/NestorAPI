/**
 * Client Controller create actions
 *
 */


module.exports = {
  inputs: {
    firstName: {
      type: 'string',
      required: true,
      maxLength: 100,
      example: 'Jean'
    },
    lastName : {
      type: 'string',
      required: true,
      maxLength: 100,
      example: 'Dupont'
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
      isEmail: true,
      example: 'nathan.trn@orange.fr'
    },
    phoneNumber : {
      type: 'string',
      required: true,
      example: '0637492131'
    },
    birthDate : {
      type: 'string',
      required: true,
      example: '30/11/1997'
    },
    nationality : {
      type: 'string',
      required : true,
      example: 'Français'
    },
    room : {
      type : 'number'
    }
  },
  exits: {
    success: {
      description: 'Client successfully added',
    },
    badRequest: {
      description: 'Bad request, error from the client',
      responseType: 'badRequest'
    },
    unauthorized: {
      description: 'Unauthorized access, missing or invalid authorization access',
      responseType: 'unauthorized'
    },
    serverError: {
      description: 'Internal server error from create client',
      responseType: 'serverError'
    }
  },

  fn: async (inputs, exits) => {

    const newClient = await Client
          .create(inputs)
          .intercept('*', 'serverError')
          .fetch();

    

    return exits.success(newClient);
  }
};
