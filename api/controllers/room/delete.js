/**
 * Client Controller delete actions
 */

module.exports = {

  inputs: {

    id: {
      type: 'string',
      required : true
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
    forbidden : {
      description: 'Forbidden, the apartment cannot have less than one room.',
      responseType: 'forbidden'
    },
    serverError: {
      description: 'Internal server error',
      responseType: 'serverError'
    },

  },

  fn: async function (inputs, exits) {

    let deletedRoom = await Room.findOne({id : inputs.id});

    if (!deletedRoom){
      return exits.badRequest('The room doesn\'t exists.');
    }

    let apartment = await Room.count({apartment : deletedRoom.apartment});

    if(apartment < 2){
      return exits.forbidden('The apartment cannot have less than one room.');
    }

    console.log(JSON.stringify(apartment));

    await Room.destroyOne({id: inputs.id})
        .intercept('*', 'serverError');
    return exits.success();
  }
};
