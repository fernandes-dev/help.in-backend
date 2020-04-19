const Work = use('App/Models/VoluntaryWork');

class VoluntaryWorkController {
  async index() {
    const works = await Work.all();

    return works;
  }

  async store({ request, auth }) {
    await auth.check();

    const data = request.only([
      'title',
      'description',
      'activities',
      'company_id',
    ]);

    const work = await Work.create(data);

    return work;
  }

  async show({ params }) {
    const work = await Work.findOrFail(params.id);

    return work;
  }

  async update({ params, request, auth }) {
    await auth.check();

    const work = await Work.findOrFail(params.id);

    const data = request.only([
      'title',
      'description',
      'activities',
      'company_id',
    ]);

    work.merge(data);

    await work.save();

    return work;
  }

  async destroy({ params, auth }) {
    await auth.check();

    const work = await Work.findOrFail(params.id);

    await work.delete();

    return { msg: 'Deletado com sucesso' };
  }
}

module.exports = VoluntaryWorkController;
