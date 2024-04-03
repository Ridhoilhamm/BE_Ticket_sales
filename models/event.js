'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    
    static associate(models) {
      // define association here
      //ditambahkan hasMany dikarenakan event memiliki lebih dari satu tempat duduk
      this.hasMany(models.seat,{
        foreignKey:"eventID", as:"eventSeat"
      })
      this.hasMany(models.ticket,{
        foreignKey:"eventID", as: "eventTicket"
      })
    }
  }
  event.init({
    eventID: {
      allowNull: false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    vanue: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};