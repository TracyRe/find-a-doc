import $ from 'jquery';
import './scss/styles.scss';
import { DoctorList } from './js/project.js';

const symptom = $("#user-input").val();
let doctorList = new DoctorList();
let promise1 = doctorList.getDoctorList(symptom);
let resultList;

promise1.then((response) => {
  let body = JSON.parse(response);
  resultList = doctorList.getList(body.profile);
});

$(document).ready(function(){
  $("#find-doctors").submit(function(event) {
    event.preventDefault();
    console.log(resultList);
  });
});
