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

            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },

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
                            <button type="button" class="btn btn-success update-staff" data-bs-toggle="modal" data-bs-target="#scrollableModal">Update</button>
                        </td>

                         <td>
                              <button class="btn btn-danger   delete-staff">Delete</button>
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
        console.log("clicked modal save")

        $("#btn-save-staff-modal").prop("disabled", true);


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

            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },

            success: function(results) {
                console.log("Response: " + JSON.stringify(results)); // Log the response from the backend

                // Display success message (optional)
                if (results && results.message) {
                    alert(results.message); // Show the success message (e.g., "Staff added successfully")
                }

                // Close the modal after success
                $("#scrollableModal").modal("hide");

                // Reset the form fields if the form exists
                const form = $("#staff-form")[0];
                if (form) {
                    form.reset();
                }

                // Reload the staff table or perform other actions
                loadStaffTable();

                // Re-enable the button
                $("#btn-save-staff-modal").prop("disabled", false);
            },
            error: function(xhr, status, error) {
                console.log("HTTP Status: " + xhr.status); // Check the HTTP status code
                console.log("Error Status: " + status);
                console.log("Error Message: " + error);
                console.log("Response Text: " + xhr.responseText);
                alert("An error occurred: " + error); // Display error message
                $("#btn-save-staff-modal").prop("disabled", false);
            }
        });

        // Perform AJAX POST request
    });
    /*-------------------------------------------------------*/


    /*------------------------------------ deleting a staff ------------------------------*/

    $(document).on('click', '.delete-staff', function() {
        console.log("clicked delete btn");



        // Find the vehicle ID from the corresponding cell in the current row
        let staffId  = $(this).closest('tr').find("#td-staffId").text().trim();
        console.log("staff id got from the table: " + staffId);

        $.ajax({
            url:"http://localhost:5050/greenShadow/api/v1/staff/"+staffId,
            type: "DELETE",

            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function(results) {
                console.log(results);
                alert('staff Deleted Successfully...');

                // Remove the row from the table after successful deletion
                $(this).closest('tr').remove();
                loadStaffTable();
            },
            error: function(error) {
                console.log(error);
                alert('staff deletion failed: ' + error);
            }
        });

    });
    /*-------------------------------------------------------------------------------------*/




    /* Open Modal for Adding New Staff */
    $(document).on('click', '#btn-add-staff', function () {

        console.log("Add Staff Button Clicked");
        $("#scrollableModal").modal("show");
        $("#btn-save-staff-modal").css({display:'block'});
        $("#btn-update-staff-modal").css({display:'none'});
    });

    $(document).on('click', '#update-staff', function () {
        $("#scrollableModal").modal("show");
        $("#btn-save-staff-modal").css({display:'none'});
        $("#btn-update-staff-modal").css({display:'block'});

    });







});
