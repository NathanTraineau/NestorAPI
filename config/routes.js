/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST    /createClient': 'client/create',
  'POST    /deleteClient': 'client/delete',
  'POST    /updateClient': 'client/update',
  'POST    /reservationClient': 'client/reservation',
  'POST    /vacation': 'client/vacation',
  'GET    /getClient': 'client/read',

  'POST    /createRoom': 'room/create',
  'POST    /deleteRoom': 'room/delete',
  'POST    /updateRoom': 'room/update',
  'GET    /getRoom': 'room/read',

  'POST    /createApartment': 'apartment/create',
  'POST    /deleteApartment': 'apartment/delete',
  'POST    /updateApartment': 'apartment/update',
  'GET    /getApartment': 'apartment/read',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
