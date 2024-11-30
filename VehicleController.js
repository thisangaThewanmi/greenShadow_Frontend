
var recordIndex;

$(document).ready(function(){

    loadVehicleTable();


    /*-------------------------- load vehicle table ----------------------*/
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
                        <td class="td-plateNumber">${vehicle.plateNumber}</td>
                        <td class="td-category">${vehicle.category}</td>
                        <td class="td-fuelType">${vehicle.fuelType}</td>
                        <td class="td-status">${vehicle.status}</td>
                        <td class="td-remarks">${vehicle.remarks}</td>
                        <td class="td-staffId">${vehicle.staffId}</td>
                        <td>
                        <button type="button"  id="update-staff" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#add-form"> Update</button>
                        </td>

                         <td>
                              <button id="delete-staff" class="btn btn-danger btn-sm">Delete</button>
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


    /*--------------------------  get data from a selected row in a table ----------------------*/

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


    /*--------------------------------call function to get data from index-------------------------------*/
    $('#vehicle-table-body').on('click', 'tr', function (){

        let index = $(this).index();
        RecordIndex = index;



        getDatafromIndex(this);
    })
    /*---------------------------------------------------------------------------------------------------*/



})