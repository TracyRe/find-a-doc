import $ from 'jquery';
import './scss/styles.scss';
import { DoctorList } from './js/project.js';

$("document").ready(function() {



$("#user-input-symptom").focus();

  function enterSymptom() {
    $("#user-input-name").val("");
  }

  function enterName() {
    $("#user-input-symptom").val("");
  }


  $("#user-input-symptom").focus(enterSymptom);
  $("#user-input-name").focus(enterName);



  $("#find-doctors").submit(function(event) {
    event.preventDefault();

    const symptom = $("#user-input-symptom").val();
    const doctor = $("#user-input-name").val();
    let search ;

    console.log("symptom entry: " + symptom);
    console.log("doctor entry: " + doctor);


      if (symptom !== "") {
        search = String(`query=${symptom}`);
      } else {
        search = String(`name=${doctor}`);
      }

  console.log("symptom value: " + $("#user-input-symptom").val());
  console.log("doctor value: " + $("#user-input-name").val());

    // search = String(`query=${symptom}`)
    // search = String(`name=${doctor}`)

console.log("type of search: " + typeof search);
console.log("type of symptom: " + typeof symptom);
console.log("type of doctor: " + typeof doctor);
    // search = `name=${doctor}`;
    let doctorList = new DoctorList();
    let promise1 = doctorList.getDoctors(search);
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
    function formatPhone(text) {
      var result = [];
      while (text.length >= 6){
        result.push(text.substring(0, 3));
        text = text.substring(3);
      }
      if (text.length > 0) result.push(text);
      return result.join("-");
    }

    $(".result").empty(); // clears previous results so  new results don't simply get appended to previous results

    promise1.then((response) => {
      let body = JSON.parse(response);

      // debugger;
      // console.log(body.data[4].practices[2].website);

      if ( body.data.length === 0 ) {

        $('.result').html(`<p>We're sorry, we are unable to find anything to match your search. Check the spelling or try different words.</p>`);


      } else {

        $('.result').append(`<ul>`);
        for (let i = 0; i < body.data.length; i++) {

          lastName = body.data[i].profile.last_name;
          firstName = body.data[i].profile.first_name;
          // title = body.data[i].profile.title;

          if (body.data[i].profile.title !== undefined ) {
            title = ", " + body.data[i].profile.title;
          } else {
            title = ``;
          }

          if (body.data[i].profile.middle_name !== undefined ) {
            middleName = body.data[i].profile.middle_name;
          } else {
            middleName = ``;
          }
          if (body.data[i].profile.image_url !== undefined ) {
            profilePhoto = body.data[i].profile.image_url;
          } else {
            profilePhoto = ``;
          }
          $(".result").append(`<li><img src="${profilePhoto}"> ${firstName} ${middleName} ${lastName}${title}<br>`);

            newPatientsBoolean = body.data[i].practices[0].accepts_new_patients;
            city =  body.data[i].practices[0].visit_address.city;
            state = body.data[i].practices[0].visit_address.state;
            street = body.data[i].practices[0].visit_address.street;
            zip = body.data[i].practices[0].visit_address.zip;
            phone = formatPhone(body.data[i].practices[0].phones[0].number);

            if (body.data[i].practices[0].website !== undefined ) {
              siteUrl = body.data[i].practices[0].website;
              website = `<a href = "${siteUrl}" onclick = "window.open(this.href); return false;">Website</a><br>`;
            } else {
              website = ``;
            }

            if (newPatientsBoolean === true ) {
              acceptsNewPatients = `<span class="accept-new-patients-yes">Accepting new patients</span>`;
            } else {
              acceptsNewPatients = `<span>Not accepting new patients</span>`;
            }
            $(".result").append(`${phone}<br>
              ${website}
              ${street}<br>
              ${city}, ${state} ${zip}<br>`);
            $(".result").append(`${acceptsNewPatients}</li>`);

          } //  END LOOP - DOCTOR DATA
          $('.result').append(`</ul>`);
        } // END ELSE - what to do if there's data

      }, (error) => { // END POSITIVE PROMISE, BEGIN ERROR CONDITION
        $('.result').html(`<p>Regrettably, there was an error retrieving information: ${error.message}. Please try again.</p>`);
      }); // END ERROR CONDITION AND PROMISE


    }); // END SUBMIT
  }); // END DOC READY
