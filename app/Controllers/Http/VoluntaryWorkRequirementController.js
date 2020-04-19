const Requirement = use('App/Models/VoluntaryWorkRequirement');

class VoluntaryWorkRequirementController {
  async index() {
    const requirements = await Requirement.all();

    return requirements;
  }

  async store({ request, auth }) {
    await auth.check();

    const data = request.data(['name', 'voluntary_work_id']);

    const requirement = await Requirement.create(data);

    return requirement;
  }

  async show({ params }) {
    const requirement = await Requirement.findOrFail(params.id);

    return requirement;
  }

  async update({ params, auth, request }) {
    await auth.check();

    const requirement = await Requirement.findOrFail(params.id);

    const data = request.data(['name']);

    requirement.merge(data);

    await requirement.save();

    return requirement;
  }

  async destroy({ params, auth }) {
    await auth.check();

    const requirement = await Requirement.findOrFail(params.id);

    await requirement.delete();

    return { msg: 'Deletado com suceso' };
  }
}

module.exports = VoluntaryWorkRequirementController;
