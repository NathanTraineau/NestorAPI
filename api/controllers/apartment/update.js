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
    error: {
      description: 'Internal server error from update client',
      responseType: 'serverError'
    }
  },

  fn: async (inputs, exits) => {

    let updatedApartment= await Apartment.updateOne({id: inputs.id})
    .set(inputs)
    .intercept('*', 'serverError');

    if (!updatedApartment){
      return exits.badRequest();
    }

    return exits.success(updatedApartment);
  }
};


