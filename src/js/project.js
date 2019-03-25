import $ from 'jquery';
export class DoctorList {

  getDoctors(search,sort) {
    let Promise = require("es6-promise").Promise;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?${search}&location=45.523%2C-122.676%2C100&user_location=45.523%2C-122.676&sort=${sort}&skip=0&limit=50&user_key=${process.env.exports.apiKey}`;

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
}

export class DoctorDetails {
  formatPhone(text) {
    var result = [];
    while (text.length >= 6){
      result.push(text.substring(0, 3));
      text = text.substring(3);
    }
    if (text.length > 0) result.push(text);
    return result.join("-");
  }
  getDetails(search, promise1, body) {
    let string = "";
    let lastName;
    let firstName;
    let middleName;
    let title;
    let profilePhoto;
    let phone;
    let newPatientsBoolean;
    let acceptsNewPatients;
    let city;
    let state;
    let street;
    let zip;
    let website;
    let siteUrl;

    // phone formatting adapted from code written by Asim Mittal https://medium.com/@asimmittal
    $(".result").empty(); // clears previous results so  new results don't simply get appended to previous results
    // CHECK WHETHER AT LEAST ONE FIELD IS ENTERED
        // when there are results
        // OPEN UL
    $('.result').append(`<ul class="doc-list">`);
    // BEGIN LOOP - DOCTOR DATA
    console.log(body.data.length);
    for (let i = 0; i < body.data.length; i++) {
      firstName = body.data[i].profile.first_name;
      lastName = body.data[i].profile.last_name;
      newPatientsBoolean = body.data[i].practices[0].accepts_new_patients;
      street = body.data[i].practices[0].visit_address.street;
      city =  body.data[i].practices[0].visit_address.city;
      state = body.data[i].practices[0].visit_address.state;
      zip = body.data[i].practices[0].visit_address.zip;
      phone = this.formatPhone(body.data[i].practices[0].phones[0].number);

      // determine whether provider has title
      if (body.data[i].profile.title !== undefined ) {
        title = ", " + body.data[i].profile.title;
      } else {
        title = ``;
      }
      // determine whether provider has middlename
      if (body.data[i].profile.middle_name !== undefined ) {
        middleName = body.data[i].profile.middle_name;
      } else {
        middleName = ``;
      }
      // determine whether provider has photo
      if (body.data[i].profile.image_url !== undefined ) {
        profilePhoto = body.data[i].profile.image_url;
      } else {
        profilePhoto = ``;
      }
      // determine whether provider has website
      if (body.data[i].practices[0].website !== undefined ) {
        siteUrl = body.data[i].practices[0].website;
        website = `<a href = "${siteUrl}" onclick = "window.open(this.href); return false;">Website</a><br>`;
      } else {
        website = ``;
      }
      debugger;
      // determine whether provider accepts new patients
      if (newPatientsBoolean === true ) {
        acceptsNewPatients = `<span class="accept-new-patients-yes">Accepting new patients</span>`;
      } else {
        acceptsNewPatients = `<span>Not accepting new patients</span>`;
      }
      string = string + `<li><img src="${profilePhoto}"> <div class="details"><div class="name">${firstName} ${middleName} ${lastName}${title}</div>
      <div class="phone-web-new">
      ${phone}<br>
      ${website}
      ${acceptsNewPatients}</div>
      <div class="address">
      ${street}<br>
      ${city}, ${state} ${zip}</div></div></li>`;
      } //  END LOOP - DOCTOR DATA
      return string;
      $('.result').append(`</ul>`);


 // END ERROR CONDITION AND PROMISE


  }
}
