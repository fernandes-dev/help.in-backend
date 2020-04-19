const Img = use('App/Models/VoluntaryWorkImg');
const Work = use('App/Models/VoluntaryWork');
const Helpers = use('Helpers');

class VoluntaryWorkImgController {
  async index() {
    const works = await Img.all();

    return works;
  }

  async store({ request, auth, params }) {
    await auth.check();
    const work = await Work.findOrFail(params.id);

    const images = request.file('image', {
      types: ['image'],
      size: '2mb',
    });

    await images.moveAll(Helpers.tmpPath('uploads'), (file) => ({
      name: `${Date.now()}-${file.clientName}`,
    }));

    if (!images.movedAll()) {
      return images.errors();
    }

    await Promise.all(
      images
        .movedList()
        .map((image) => work.images().create({ url: image.fileName }))
    );
  }

  async show({ params }) {
    const img = await Img.findOrFail(params.id);

    return img;
  }

  async update({ params, request, auth }) {
    await auth.check();

    const img = await Img.findOrFail(params.id);

    const data = request.only(['']);

    img.merge(data);

    await img.save();

    return img;
  }

  async destroy({ params, auth }) {
    await auth.check();

    const work = await Img.findOrFail(params.id);

    await work.delete();

    return { msg: 'Deletado com sucesso' };
  }
}

module.exports = VoluntaryWorkImgController;
