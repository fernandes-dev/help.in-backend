/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { msg: 'Seja Bem Vindo' };
});

Route.resource('adress', 'AdressController').apiOnly();
Route.resource('user', 'UserController').apiOnly();
Route.post('session', 'UserSessionController.create');
Route.resource('company', 'CompanyController').apiOnly();
Route.resource('company-category', 'CompanyCategoryController').apiOnly();
