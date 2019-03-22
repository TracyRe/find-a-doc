import $ from 'jquery';
import './scss/styles.scss';
import { DoctorList } from './js/project.js';

$(document).ready(function(){
  $("#find-doctors").submit(function(event) {
    event.preventDefault();
const symptom = $("#user-input").val();
let doctorList = new DoctorList();
let promise1 = doctorList.getDoctors(symptom);
let resultList;

promise1.then((response) => {
  let body = JSON.parse(response);
  resultList = doctorList.getList(body.doctors);
  resultList.forEach((doctor) => {
    $("#doc-list").html(`<li>${doctor}<li>`);
  });
  }, (error) => {
    $('.result').html(`<p>Regrettably, there was an error retrieving information: ${error.message}. Please try again.</p>`);
    }
  );

    console.log("fail");
    console.log(typeof promise1);
    console.log(promise1);
    console.log(typeof resultList);
    console.log(resultList);
  });
});
