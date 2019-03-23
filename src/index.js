import $ from 'jquery';
import './scss/styles.scss';
import { DoctorList } from './js/project.js';

$("document").ready(function() {
  $("#find-doctors").submit(function(event) {
    event.preventDefault();

    const symptom = $("user-input").val();
    let doctorList = new DoctorList();
    let promise1 = doctorList.getDoctors(symptom);
    let lastName;
    let resultList;

    promise1.then((response) => {
      let body = JSON.parse(response);

      console.log(body.data[0].profile.last_name);

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

   // console.log(index[0]);
});
