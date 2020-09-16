/* eslint-disable linebreak-style */
/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * 
 * 
 * - `id` : String, ID unique ;
- `firstName` : String, prénom ;
- `lastName` : String, nom ;
- `email` : String, adresse email ;
- `phone` : String, numéro de téléphone ;
- `birthDate` : String, date de naissance ;
- `nationality` : String, nationalité ;
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
  },
  exits: {
    success: {
      description: 'Account successfully registered',
    },
    badRequest: {
      description: 'Bad request, error from the client',
      responseType: 'badRequest'
    },
    unauthorized: {
      description: 'Unauthorized access, missing or invalid authorization access',
      responseType: 'unauthorized'
    },
    error: {
      description: 'Internal server error from create folder',
      responseType: 'serverError'
    }
  },

  fn: async (inputs, exits) => {

    const newClient = await Client
          .create(inputs)
          .intercept(err => {
            if (err) {exits.error(err);}
          })
          .fetch();

    return exits.success(newClient);
  }
};
