export class DoctorList {

  getDoctors(query) {
    let Promise = require("es6-promise").Promise;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=45.523%2C-122.676%2C100&user_location=45.523%2C-122.676&sort=last-name-asc&skip=0&limit=100&user_key=${process.env.exports.apiKey}`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  // getList(doctor) {
  // const doctorArray = [];
  // doctor.forEach((doctorArray) => {
  //   doctorArray.push(doctor.data.profile.last_name);
  // });
  // return doctorArray;
  // }

}

    // `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=45.523%2C-122.676%2C100&user_location=45.523%2C-122.676&sort=last-name-asc&skip=0&user_key${process.env.exports.apiKey}`;
