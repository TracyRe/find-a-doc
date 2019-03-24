import $ from 'jquery';
import './scss/styles.scss';
import { DoctorList } from './js/project.js';

$("document").ready(function() {
  $("#find-doctors").submit(function(event) {
    event.preventDefault();

    const query = $("#user-input").val();
    let doctorList = new DoctorList();
    let promise1 = doctorList.getDoctors(query);
    let lastName;
    let firstName;
    let middleName;
    let title;
    // let resultList;
    let profilePhoto;
    let phone;
    let newPatientsBoolean;
    let acceptsNewPatients;
    let city;
    let state;
    let street;
    let zip;

    function convertToValidPhoneNumber(text) {
        var result = [];
        text = text.replace(/^\d{2}-?\d{3}-?\d{3}-?\d{3}$/, "");
        while (text.length >= 6){
            result.push(text.substring(0, 3));
            text = text.substring(3);
        }
        if (text.length > 0) result.push(text);
        return result.join("-");
    }



    $(".result").empty();

    promise1.then((response) => {
      let body = JSON.parse(response);

      // debugger;


      console.log(body.data.length);
      // console.log(body.data[0].practices.length);
      // console.log(body.data[0].practices[0].phones.length)
      // debugger;
      if ( body.data.length === 0 ) {

        $('.result').html(`<p>We're sorry, we are unable to find anything to match your search. Check the spelling or try different words to describe your symptoms.</p>`);


      } else {

          $('.result').append(`<ul>`);
        for (let i = 0; i < body.data.length; i++) {

            lastName = body.data[i].profile.last_name;
            firstName = body.data[i].profile.first_name;
            title = body.data[i].profile.title;

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
            $(".result").append(`<li><img src="${profilePhoto}"> ${firstName} ${middleName} ${lastName}, ${title}`);

            for (let j = 0; j < body.data[i].practices.length; j++) {
              newPatientsBoolean = body.data[i].practices[j].accepts_new_patients;
              city =  body.data[i].practices[j].visit_address.city;
              state = body.data[i].practices[j].visit_address.state;
              street = body.data[i].practices[j].visit_address.street;
              zip = body.data[i].practices[j].visit_address.zip;
              phone = convertToValidPhoneNumber(body.data[i].practices[j].phones[0].number);
              // phone = body.data[0].practices[0].phones[0].number;
            if (newPatientsBoolean === true ) {
              acceptsNewPatients = `<span class="accept-new-patients-yes">Accepting new patients</span>`;
            } else {
              acceptsNewPatients = `<span>Not accepting new patients</span>`;
            }
            $(".result").append(`${phone}
            ${street}
            ${city}, ${state} ${zip}
            ${acceptsNewPatients}</li>`);

          }  //  END INNER LOOP  - DOCTOR DATA PRACTICE
        } //  END OUTER LOOP - DOCTOR DATA
        $('.result').append(`</ul>`);
      } // END ELSE - what to do if there's data

    }, (error) => { // END POSITIVE PROMISE, BEGIN ERROR CONDITION
            $('.result').html(`<p>Regrettably, there was an error retrieving information: ${error.message}. Please try again.</p>`);
        }); // END ERROR CONDITION AND PROMISE


  }); // END SUBMIT
}); // END DOC READY
