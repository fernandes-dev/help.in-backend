const Company = use('App/Models/Company');

class CompanyController {
  async index() {
    const company = await Company.all();

    return company;
  }

  async store({ request, auth }) {
    await auth.check();

    const data = request.onyl(['name', 'logo', 'category_id', 'owner_id']);

    const company = await Company.create(data);

    return company;
  }

  async show({ params }) {
    const company = await Company.findOrFail(params.id);

    return company;
  }

  async update({ params, request, auth }) {
    await auth.check();

    const company = await Company.findOrFail(params.id);

    const data = request.onyl([
      'name',
      'logo',
      'category_id',
      'owner_id',
      'status',
    ]);

    company.merge(data);

    await company.save();

    return company;
  }

  async destroy({ params, auth }) {
    await auth.check();

    const company = await Company.findOrFail(params.id);

    await company.delete();

    return { msg: 'Deletado com sucesso' };
  }
}

module.exports = CompanyController;
