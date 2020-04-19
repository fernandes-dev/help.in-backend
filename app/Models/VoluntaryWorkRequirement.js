/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class VoluntaryWorkRequirement extends Model {
  work() {
    return this.belongsTo('App/Models/VoluntaryWork');
  }
}

module.exports = VoluntaryWorkRequirement;
