$(document).ready(function() {

    loadStaffTable()


    /*=============  CRUD OPERTIONS =====================*/


    /*-------------------   load staff table --------------*/
    function loadStaffTable(){
        console.log("load staffTable called")
        $.ajax({
            url:"http://localhost:5050/greenShadow/api/v1/staff",
            type:"GET",
            dataType:"json",

            success: function (results){
                console.log(results);

                $('#staff-table-body').empty();

                results.forEach( function(staff){

                    var record = `
                    <tr>
                        <td id="td-staffId">${staff.staffId}</td>
                        <td id="td-firstName">${staff.firstName}</td>
                        <td id="td-lastName">${staff.lastName}</td>
                        <td id="td-designation">${staff.designation}</td>
                        <td id="td-gender">${staff.gender}</td>
                        <td id="td-joinedDate">${staff.joinedDate}</td>
                        <td id="td-dob">${staff.dob}</td>
                        <td id="td-address">${staff.address}</td>
                        <td id="td-contactNo">${staff.contactNo}</td>
                        <td id="td-staffEmail">${staff.staffEmail}</td>
                        <td id="td-role">${staff.role}</td>
                        <td>
                        <button type="button"  id="update-staff" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#add-form"> Update</button>
                        </td>

                         <td>
                              <button id="delete-staff" class="btn btn-danger btn-sm">Delete</button>
                         </td>
                    </tr>`;

                    $('#staff-table-body').append(record);

                })
            },

            error: function (error) {
                console.log(error)
                alert("AN ERROR OCCOURED ")
            }
        })
    }

    /*-------------------------------------------------------*/


    /*---------------------  save record   ----------------*/
    $(document).on("submit", "form", function (e) {
        e.preventDefault();// Prevent the default form submission

        // Gather form data
        const staff = {
            staffId: $("#staffId").val(),
            role: $("#role").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            designation: $("#designation").val(),
            gender: $("#gender").val(),
            joinedDate: $("#joinedDate").val(),
            dob: $("#dob").val(),
            addressLine1: $("#addressLine1").val(),
            contactNo: $("#contactNo").val(),
            staffEmail: $("#staffEmail").val()
        };


        const jsonStaff = JSON.stringify(staff);
        console.log("jsonObject:" + jsonStaff);



        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/staff",
            type: "POST",  // or POST
            contentType: "application/json",  // Ensure you're sending JSON
            dataType: "json",  // Expect a JSON response
            data: jsonStaff,  // Your JSON data
            success: function(result, status, xhr) {
                console.log("Success:", result);
                console.log("Response Status:", xhr.status);

                // Check the response status and act accordingly
                if (xhr.status === 201) {
                    alert("Backend Response: " + JSON.stringify(result));
                    loadStaffTable();
                } else {
                    console.log("Unexpected status code:", xhr.status);
                }
            },
            error: function(xhr, status, error) {
                console.log("Error Status: " + status);
                console.log("Error Details: " + error);
                console.log("Response Text: " + xhr.responseText);
                alert("An error occurred: " + error);
            }
        });

        // Perform AJAX POST request
    });

        /*-------------------------------------------------------*/



});