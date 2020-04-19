const Address = use('App/Models/Address');
const User = use('App/Models/User');

class AddressController {
  async index() {
    const addresses = await Address.all();

    return addresses;
  }

  async store({ request, auth, response }) {
    const { user_id } = request.only(['user_id']);
    const user = await User.findOrFail(user_id);
    const userJSON = await user.toJSON();

    const authUser = await auth.getUser();

    if (userJSON.id !== authUser.id) {
      return response
        .status(401)
        .send({ error: 'Not authorized', id: authUser.id });
    }

    const data = request.only([
      'street',
      'district',
      'city',
      'state',
      'complement',
      'cep',
      'type',
      'user_id',
    ]);

    const address = await Address.create(data);

    return { success: 'Endereço cadastrado com sucesso', address };
  }

  async show({ params, auth }) {
    await auth.check();

    const address = await Address.findOrFail(params.id);

    return address;
  }

  async update({ params, request, auth }) {
    await auth.check();

    const address = await Address.findOrFail(params.id);

    const data = request.only([
      'street',
      'district',
      'city',
      'state',
      'complement',
      'cep',
      'type',
      'user_id',
    ]);

    address.merge(data);

    await address.save();

    return address;
  }

  async destroy({ params, auth }) {
    await auth.check();

    const address = await Address.findOrFail(params.id);

    await address.merge({ status: 'Inativo' });

    return { success: 'Endereço inativado com sucesso' };
  }
}

module.exports = AddressController;
