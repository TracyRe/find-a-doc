import $ from 'jquery';
import './scss/styles.scss';
import { DoctorList } from './js/project.js';

$("document").ready(function() {

// show/hide symptom/name input fields so only one is available at a time
  $("#name-search-link").click(function(){
    $("#search-by-name").removeClass();
    $("#search-by-name").addClass("show-search-by-name");
    $("#search-by-symptom").removeClass();
    $("#search-by-symptom").addClass("hide-search-by-symptom");
    $("#user-input-symptom").val("");
  });

  $("#symptom-search-link").click(function(){
    $("#search-by-symptom").removeClass();
    $("#search-by-symptom").addClass("show-search-by-symptom");
    $("#search-by-name").removeClass();
    $("#search-by-name").addClass("hide-search-by-name");
    $("#user-input-name").val("");
  });

  // put initial focus on the symptom input field
  $("#user-input-symptom").focus();

  // only allow focus on symptom input field or name input field
  function enterSymptom() {
    $("#user-input-name").val("");
  }
  function enterName() {
    $("#user-input-symptom").val("");
  }
  $("#user-input-symptom").focus(enterSymptom);
  $("#user-input-name").focus(enterName);

// submit the form
  $("#find-doctors").submit(function(event) {
    event.preventDefault();

// clear previous results so new results don't simply get appended to previous results
    $(".result").empty();

    const symptom = $("#user-input-symptom").val();
    const doctor = $("#user-input-name").val();
    let resultList;

    // at least one field must be entered
    if (symptom.length === 0 && doctor.length === 0) {
    $('.result').html(`<p class="oops">Enter either a symptom or a name to search.</p>`);
    $("#user-input-symptom").focus();
    } else {

      let search;
      let sort;

      // set type of search and sort
      if (symptom !== "") {
        search = String(`query=${symptom}`);
        sort = `distance-asc`;
      } else {
        search = String(`name=${doctor}`);
        sort = `full-name-asc`;
      }

      let doctorList = new DoctorList();
      let promise1 = doctorList.getDoctors(search, sort);
      let lastName;
      let firstName;
      let middleName;
      let title;
      let profilePhoto;
      let phone;
      let acceptsNewPatients;
      let city;
      let state;
      let street;
      let zip;
      let website;

      promise1.then((response) => {
        let body = JSON.parse(response);
        resultList = doctorList.getResults(search, promise1, body);
        //if there's no results
        if ( body.data.length === 0 ) {
          $('.result').html(`<p class="oops">We're sorry, we are unable to find anything to match your search. Check the spelling or try different words.</p>`);
        } else {
          // when there are results
          // OPEN UL
          $('.result').append(`<ul class="doc-list">`);
          // // BEGIN LOOP - DOCTOR DATA
          for (let i = 0; i < resultList.length; i++) {
            $(".doc-list").append(`<li><img src="${resultList[i].profilePhoto}"> <div class="details"><div class="name">${resultList[i].firstName} ${resultList[i].middleName} ${resultList[i].lastName}${resultList[i].title}</div>
            <div class="phone-web-new">
            ${resultList[i].phone}<br>
            ${resultList[i].website}
            ${resultList[i].acceptsNewPatients}</div>
            <div class="address">
            ${resultList[i].street}<br>
            ${resultList[i].city}, ${resultList[i].state} ${resultList[i].zip}</div></div></li>`);

          } //  END LOOP - DOCTOR DATA
          $('.result').append(`</ul>`);

        } // END ELSE - what to do if there's data

        }, (error) => { // END POSITIVE PROMISE, BEGIN ERROR CONDITION
          $('.result').html(`<p class="oops">Regrettably, there was an error retrieving information: ${error.message}. Please try again.</p>`);
        }); // END ERROR CONDITION AND PROMISE

      }// END ELSE -- what to do if no entry
    }); // END SUBMIT
  }); // END DOC READY
