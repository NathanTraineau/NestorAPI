/**
 * Client Controller create actions
 *
 */

module.exports = {
  inputs: {
    number: {
      type: 'number',
      required : true,
      example: 2
    },
    area : {
      type: 'number',
      example: 10.45
    },
    price: {
      type: 'number',
      example: 69000
    },
    apartment : {
      type: 'number',
      required : true
    }

  },
  exits: {
    success: {
      description: 'Room successfully added',
    },
    badRequest: {
      description: 'Bad request, the room given does not exists.',
      responseType: 'badRequest'
    },
    unauthorized: {
      description: 'Unauthorized access, missing or invalid authorization access',
      responseType: 'unauthorized'
    },
    serverError: {
      description: 'Internal server error from create room',
      responseType: 'serverError'
    }
  },

  fn: async (inputs, exits) => {

    let apartment = await Apartment.findOne({id : inputs.apartment})
    .intercept('*', 'serverError');

    if(!apartment){
      return exits.badRequest('The apartment doesn\'t exists.');
    }

    const newRoom = await Room
          .create(
            {...inputs,
              apartment : inputs.apartment
            })
          .intercept('*', 'serverError')
          .fetch();

    return exits.success(newRoom);
  }
};
