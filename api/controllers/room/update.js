/**
 * Room Controller update actions
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
  },
  exits: {
    success: {
      description: 'Room successfully added',
    },
    badRequest: {
      description: 'Bad request, error from the client',
      responseType: 'badRequest'
    },
    error: {
      description: 'Internal server error from update client',
      responseType: 'serverError'
    }
  },

  fn: async (inputs, exits) => {

    let updatedRoom= await Room.updateOne({id: inputs.id})
    .set(inputs)
    .intercept('*', 'serverError');

    if (!updatedRoom){
      return exits.badRequest('The room doesn\'t exists.');
    }

    return exits.success(updatedRoom);
  }
};


