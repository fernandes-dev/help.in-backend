const User = use('App/Models/User');

class UserController {
  async index({ auth }) {
    await auth.check();

    const users = await User.query().with('address').fetch();

    return users;
  }

  async store({ request }) {
    const data = request.only([
      'name',
      'type',
      'company_name',
      'document',
      'class',
      'email',
      'password',
      'phone',
      'birthday',
    ]);

    const user = await User.create(data);

    return user;
  }

  async show({ params, auth }) {
    await auth.check();

    const user = await User.query()
      .with('address')
      .where('id', params.id)
      .fetch();

    return user;
  }

  async update({ params, auth, request, response }) {
    const user = await User.findOrFail(params.id);
    const userJSON = await user.toJSON();

    await auth.check();
    const authUser = await auth.getUser();

    if (userJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    const data = request.only([
      'name',
      'type',
      'company_name',
      'document',
      'class',
      'email',
      'password',
      'phone',
      'birthday',
      'status',
    ]);

    user.merge(data);

    await user.save();

    return user;
  }

  async destroy({ params, auth, response }) {
    const user = await User.findOrFail(params.id);
    const userJSON = await user.toJSON();

    await auth.check();
    const authUser = await auth.getUser();

    if (userJSON.id !== authUser.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    user.merge({ status: 'Inativo' });

    await user.save();

    return user;
  }
}

module.exports = UserController;
