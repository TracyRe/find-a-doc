export class DoctorList {

  getDoctors(symptom) {
    let Promise = require("es6-promise").Promise;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
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
  //   doctorArray.push(doctor.data[0].profile.last_name);
  // });
  // return doctorArray;
  // }

}

//query=${symptom}

// ${process.exports.apiKey}
