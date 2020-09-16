/**
 * Client Controller create actions
 *
 */


module.exports = {
  inputs: {
    name: {
      type: 'string',
      required: true,
      example: 'Appartement 45'
    },
    street : {
      type: 'string',
      example: 'Avenue Roger Salengro'
    },
    zipCode: {
      type: 'string',
      example: '69000'
    },
    city : {
      type: 'string',
      example: 'Lyon'
    },

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
      description: 'Internal server error from create apartment',
      responseType: 'serverError'
    }
  },

  fn: async (inputs, exits) => {

    const newApartment = await Apartment
          .create(inputs)
          .intercept('*', 'serverError')
          .fetch();

    await Room.create({
      apartment : newApartment.id
    });

    return exits.success(newApartment);
  }
};
