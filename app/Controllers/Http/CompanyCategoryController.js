const Category = use('App/Models/CompanyCategory');

class CompanyCategoryController {
  async index() {
    const categories = await Category.all();

    return categories;
  }

  async store({ request, auth }) {
    await auth.check();

    const data = request.onyl(['name', 'img', 'description']);

    const category = await Category.create(data);

    return category;
  }

  async show({ params }) {
    const category = await Category.findOrFail(params.id);

    return category;
  }

  async update({ params, request, auth }) {
    await auth.check();

    const category = await Category.findOrFail(params.id);

    const data = request.onyl(['name', 'img', 'description']);

    category.merge(data);

    await category.save();

    return category;
  }

  async destroy({ params, auth }) {
    await auth.check();

    const category = await Category.findOrFail(params.id);

    await category.delete();

    return { msg: 'Deletado com sucesso' };
  }
}

module.exports = CompanyCategoryController;
