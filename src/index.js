import $ from 'jquery';
import './scss/styles.scss';
import { DoctorList } from './js/project.js';

$("document").ready(function() {
  $("#find-doctors").submit(function(event) {
    event.preventDefault();

    const symptom = $("#user-input").val();
    let doctorList = new DoctorList();
    let promise1 = doctorList.getDoctors(symptom);
    let lastName;
    let firstName;
    let middleName;
    let title;
    let resultList;

    $(".doc-list").empty();

    promise1.then((response) => {
      let body = JSON.parse(response);

      console.log(body.data[0].profile.last_name);

      for (let i = 0; i <= body.data.length - 1; i++) {
        lastName = body.data[i].profile.last_name;
        firstName = body.data[i].profile.first_name;
        middleName = body.data[i].profile.middle_name;
        title = body.data[i].profile.title;

        $(".doc-list").append(`<li>${firstName} ${middleName} ${lastName}, ${title} </li>`);

      }

      // function getList(doctor) {
      //   const doctorArray = [];
      //   doctor.forEach((doctorArray) => {
      //     doctorArray.push(doctor.data.profile.last_name);
      //   });
      //   return doctorArray;
      // }
      // resultList = doctorList.getList(body.data);
      // resultList.forEach( (lastName) => {
      //   $(".doc-list").html(`<li>${lastName}</li>`);
      //
      // });
    }, (error) => {
      $('.result').html(`<p>Regrettably, there was an error retrieving information: ${error.message}. Please try again.</p>`);
    });


  });

});
