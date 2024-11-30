
var recordIndex;

$(document).ready(function(){

    loadVehicleTable();


    /*--------------------------  function to load vehicle table ----------------------*/
    function loadVehicleTable(){
        console.log("loadTable loaded")

        $.ajax({

            url:"http://localhost:5050/greenShadow/api/v1/vehicle",
            type:"GET",
            dataType:"json",

            success: function (results) {
                console.log(results);


                $('#vehicle-table-body').empty();

                results.forEach(function (vehicle) {

                    var record = `
                    <tr>
                     <td class="td-vehicleId">${vehicle.vehicleId}</td>
                        <td class="td-plateNumber">${vehicle.plateId}</td>
                        <td class="td-category">${vehicle.category}</td>
                        <td class="td-fuelType">${vehicle.fuelType}</td>
                        <td class="td-status">${vehicle.status}</td>
                        <td class="td-remarks">${vehicle.remarks}</td>
                        <td class="td-staffId">${vehicle.staffId}</td>
                      <!--  <td>
                         <button type="button" class="btn btn-success  update-vehicle">Update</button>
                        </td>-->

                         <td>
                         <button type="button"  class="btn btn-danger  delete-vehicle">Delete</button>
                         </td>
                    </tr>`

                    $('#vehicle-table-body').append(record);
                })
            },
            error: function(xhr, status, error) {
                console.log("Error Status: " + status);
                console.log("Error Details: " + error);
                console.log("Response Text: " + xhr.responseText);
                alert("An error occurred: " + error);
            }
        })
    }
    /*-------------------------------------------------------------------*/


    /*--------------------------  get data from a selected row in a table ---------------------*/
    function getDatafromIndex(row) {
        let vehicleId = $(row).find(".td-vehicleId").text().trim();
        let plateNumber = $(row).find(".td-plateNumber").text().trim();
        let category = $(row).find(".td-category").text().trim();
        let fuelType = $(row).find(".td-fuelType").text().trim();
        let status = $(row).find(".td-status").text().trim();
        let remarks = $(row).find(".td-remarks").text().trim();
        let staffIds = $(row).find(".td-staffId").text().trim();


        $('#vehicleId').val(vehicleId);
        $('#plateNumber').val(plateNumber);
        $('#category').val(category);
        $('#fuelType').val(fuelType);
        $('#vehicleStatus').val(status);
        $('#remarks').val(remarks);
        $('#vehicleStaffId').val(staffIds);

    }
    /*-----------------------------------------------------------------------------------------*/


    /*--------------------------------call function to get data from index----------------------*/
    $('#vehicle-table-body').on('click', 'tr', function (){

        let index = $(this).index();
        RecordIndex = index;



        getDatafromIndex(this);
    })
    /*------------------------------------------------------------------------------------------*/


    /*---------------------------------function add vehicle-------------------------------------*/
    function addVehicle(){

        const vehicle= {

            vehicleId : $('#vehicleId').val(),
            plateId : $('#plateNumber').val(),
            remarks : $('#remarks').val(),
            staffId : $('#vehicleStaffId').val(),
            category : $('#category').val(),
            fuelType : $('#fuelType').val(),
            status : $('#vehicleStatus').val()
        }

        const jsonVehicle = JSON.stringify(vehicle)
        console.log("jsonObject"+jsonVehicle);


        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/vehicle",
            type: "POST",  // or POST
            contentType: "application/json",  // Ensure you're sending JSON
            dataType: "json",  // Expect a JSON response
            data: jsonVehicle,  // Your JSON data

            success: function(result, status, xhr) {
                console.log("Success:", result);
                console.log("Response Status:", xhr.status);

               /* // Check the response status and act accordingly
                if (xhr.status === 201) {
                    alert("Backend Response: " + JSON.stringify(result));
                    loadStaffTable();
                } else {
                    console.log("Unexpected status code:", xhr.status);
                }*/
                loadVehicleTable();
                alert("Backend Response: " + JSON.stringify(result));
            },
            error: function(xhr, status, error) {
                console.log("Error Status: " + status);
                console.log("Error Details: " + error);
                console.log("Response Text: " + xhr.responseText);
                alert("An error occurred: " + error);
            }
        });

    }
    /*------------------------------------------------------------------------------------------*/



    /*--------------------------------call function to add Vehicle-------------------------------*/
    $('#btn-vehicle-add').on('click', function (){

       addVehicle();
    })
    /*--------------------------------------------------------------------------------------------*/



    /*--------------------------------------  delete a vehicle -------------------------------------*/
    $(document).on('click', '.delete-vehicle', function() {
        console.log("clicked delete btn");



        // Find the vehicle ID from the corresponding cell in the current row
        let vehicleId = $(this).closest('tr').find(".td-vehicleId").text().trim();
        console.log("vehicle id got from the table: " + vehicleId);

        $.ajax({
            url:"http://localhost:5050/greenShadow/api/v1/vehicle/"+vehicleId,

            type: "DELETE",
            success: function(results) {
                console.log(results);
                alert('Vehicle Deleted Successfully...');

                // Remove the row from the table after successful deletion
                $(this).closest('tr').remove();

                clearTextFields();

                loadVehicleTable();
            },
            error: function(error) {
                console.log(error);
                alert('Vehicle deletion failed: ' + error);
            }
        });

    });
    /*--------------------------------------------------------------------------------------------*/



    /*-----------------------------------  clear text fields -----------------------------------*/
    function clearTextFields() {
        $('#vehicleId').val('');
        $('#plateNumber').val('');
        $('#category').val('');
        $('#fuelType').val('');
        $('#vehicleStatus').val('');
        $('#remarks').val('');
        $('#vehicleStaffId').val('');
    }
    /*--------------------------------------------------------------------------------------------*/



    /*--------------------------------- function update vehicles--------------------------------*/
    function updateVehicle() {


        const vehicle = {

            vehicleId: $('#vehicleId').val(),
            plateId: $('#plateNumber').val(),
            remarks: $('#remarks').val(),
            staffId: $('#vehicleStaffId').val(),
            category: $('#category').val(),
            fuelType: $('#fuelType').val(),
            status: $('#vehicleStatus').val()
        }

        let vehicleId = $('#vehicleId').val();
        console.log("vehicleid:"+vehicleId)

        const jsonVehicle = JSON.stringify(vehicle)
        console.log("jsonObject" + jsonVehicle);


        $.ajax({
            url:"http://localhost:5050/greenShadow/api/v1/vehicle/"+vehicleId,
            type: "PUT",  // or POST
            contentType: "application/json",  // Ensure you're sending JSON
            dataType: "json",  // Expect a JSON response
            data: jsonVehicle,  // Your JSON data

            success: function (results) {
                console.log(results)
                alert('Vehicle updated successfully...')
                loadVehicleTable();
            },
            error: function (error) {
                console.log(error)
                alert('Vehicle  update failed......'+error)
            }
        });
    }
    /*--------------------------------------------------------------------------------------------*/

    /*---------------------- calling fuction for updating vehicles--------------------------------*/
    $('#update-vehicle').on('click', function(){
        console.log("update btn clicked")
        updateVehicle();
    });
    /*--------------------------------------------------------------------------------------------*/



})