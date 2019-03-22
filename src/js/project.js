export class DoctorList {
  getDoctorList(symptom) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=ef7e57c13b99d6000c0f0d51fd954973`;
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
  getList(doctor) {
    const doctors = [];
    doctor.forEach((doctor) => {
      doctors.push(doctor.last_name);
    });
    return doctors;
  }
}
