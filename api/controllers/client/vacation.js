/**
 * Client Controller update actions
 *
 */


module.exports = {
  inputs: {
    id: {
      type: 'string',
      required : true
    }
  },
  exits: {
    success: {
      description: 'Client successfully added',
    },
    badRequest: {
      description: 'Bad request, the room does not exists',
      responseType: 'badRequest'
    },
    forbidden : {
      description: 'Forbidden, the room is already reserved or the client already have a room.',
      responseType: 'forbidden'
    },
    serverError: {
      description: 'Internal server error from update client',
      responseType: 'serverError'
    }
  },

  fn: async (inputs, exits) => {

    const client = await Client.findOne({id : inputs.id})
      .populate('room');

    if(client === undefined){
      // The client doesn't exists
      return exits.badRequest('The client doesn\'t exists.');
    }

    let updatedRoom = await Room.updateOne({isReserved : inputs.id})
    .set({
      isReserved : null
    });

    console.log(JSON.stringify(updatedRoom));

    if(updatedRoom === undefined){
      // The room doesn't exists
      return exits.badRequest('The room doesn\'t exists or was already free.');
    }

    await Client.updateOne({id: inputs.id})
        .set({
          room : []
        })
        .intercept('*', 'serverError');

    const finalClient = await Client.find({id : inputs.id})
      .intercept('*', 'serverError')
      .populate('room');

    return exits.success(finalClient);
  }
};


