/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class VoluntaryWork extends Model {
  company() {
    return this.belongsTo('App/Models/Company');
  }

  images() {
    return this.hasMany('App/Models/VoluntaryWorkImg');
  }

  requirements() {
    return this.hasMany('App/Models/VoluntaryWorkRequirement');
  }
}

module.exports = VoluntaryWork;
