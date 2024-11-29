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


    /*---------------------  update record   ----------------*/
    $(document).on("submit", "form", function (e) {
        e.preventDefault();// Prevent the default form submission

        // Gather form data
        const formData = {
            staffId: $("#staffId").val(),
            role: $("#role").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            designation: $("#designation").val(),
            gender: $("#gender").val(),
            joinedDate: $("#joinedDate").val(),
            dob: $("#dob").val(),
            address: $("#addressLine1").val(),
            contactNo: $("#contactNo").val(),
            staffEmail: $("#staffEmail").val()
        };

        console.log(formData)

        // Perform AJAX POST request
    });

        /*-------------------------------------------------------*/



});