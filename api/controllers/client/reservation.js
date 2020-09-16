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
    room : {
      type : 'number',
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

    console.log('client' + JSON.stringify(client));

    if(client === undefined){
      // The client doesn't exists
      return exits.badRequest('The client doesn\'t exists');
    }
    else if (client.room.length !== 0){
      // The client already have a room
      return exits.forbidden('The client already have a room');
    }

    const room = await Room.findOne({id : inputs.room})
    .populate('isReserved');

    console.log(JSON.stringify(room));

    if(room === undefined ){
      // The room doesn't exists
      return exits.badRequest('The room doesn\'t exists');
    }
    else if (room.isReserved !== null){
      // The room already have a client
      return exits.forbidden('The room already have a client');
    }

    let updatedClient= await Client.updateOne({id: inputs.id})
      .set(inputs)
      .intercept('*', 'serverError');

    if (!updatedClient){
      return exits.badRequest('The client doesn\'t exists.');
    }

    const finalClient = await Client.find({id : inputs.id})
    .intercept('*', 'serverError')
    .populate('room');

    return exits.success(finalClient);
  }
};


