
 var recordIndex;

$(document).ready(function (){

    loadEquipmentTable();


    /*--------------------------  function to load equipment table ----------------------*/
    function loadEquipmentTable(){
        console.log("loadTable loaded")

        $.ajax({

            url:"http://localhost:5050/greenShadow/api/v1/equipment",
            type:"GET",
            dataType:"json",

            success: function (results) {
                console.log(results);


                $('#equipment-table-body').empty();

                results.forEach(function (equipment) {

                    var record = `
                    <tr>
                     <td class="td-equipmentId">${equipment.equipmentId}</td>
                        <td class="td-type">${equipment.type}</td>
                        <td class="td-name">${equipment.name}</td>
                        <td class="td-status">${equipment.status}</td>
                        <td class="td-fieldId">${equipment.fieldId}</td>
                        <td class="td-staffId">${equipment.staffId}</td>
                      
                      <!--  <td>
                         <button type="button" class="btn btn-success  update-vehicle">Update</button>
                        </td>-->

                         <td>
                         <button type="button"  class="btn btn-danger  delete-equipment">Delete</button>
                         </td>
                    </tr>`

                    $('#equipment-table-body').append(record);
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
        let equipmentId = $(row).find(".td-equipmentId").text().trim();
        let type = $(row).find(".td-type").text().trim();
        let name = $(row).find(".td-name").text().trim();
        let status = $(row).find(".td-status").text().trim();
        let fieldId = $(row).find(".td-fieldId").text().trim();
        let staffId = $(row).find(".td-staffId").text().trim();


        $('#equipmentId').val(equipmentId);
        $('#type').val(type);
        $('#name').val(name);
        $('#equipmentStatus').val(status);
        $('#equipmentFieldId').val(fieldId);
        $('#equipmentStaffId').val(staffId);


    }
    /*-----------------------------------------------------------------------------------------*/


    /*--------------------------------call function to get data from index----------------------*/
    $('#equipment-table-body').on('click', 'tr', function (){

        let index = $(this).index();
        RecordIndex = index;



        getDatafromIndex(this);
    })
    /*------------------------------------------------------------------------------------------*/



    /*--------------------------------------  delete a equipment -------------------------------------*/
    $(document).on('click', '.delete-equipment', function() {
        console.log("clicked delete btn");



        // Find the vehicle ID from the corresponding cell in the current row
        let equipmentId  = $(this).closest('tr').find(".td-equipmentId").text().trim();
        console.log("equipment id got from the table: " + equipmentId);

        $.ajax({
            url:"http://localhost:5050/greenShadow/api/v1/equipment/"+equipmentId,
            type: "DELETE",
            success: function(results) {
                console.log(results);
                alert('Equipment Deleted Successfully...');

                // Remove the row from the table after successful deletion
                $(this).closest('tr').remove();

                clearTextFields();

                loadEquipmentTable();
            },
            error: function(error) {
                console.log(error);
                alert('Equipment deletion failed: ' + error);
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




    /*---------------------------------function add equipment-------------------------------------*/
    function addEquipment(){

        const equipment= {

            equipmentId : $('#equipmentId').val(),
            type : $('#type').val(),
            name : $('#name').val(),
            status : $('#equipmentStatus').val(),
            fieldId : $('#equipmentFieldId').val(),
            staffId : $('#equipmentStaffId').val(),

        }

        const jsonEquipment = JSON.stringify(equipment)
        console.log("jsonObject"+jsonEquipment);


        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/equipment",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: jsonEquipment,

            success: function(result, status, xhr) {
               alert("Sucessfully added an equipment")
                loadEquipmentTable();
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
    $('#btn-equipment-add').on('click', function (){

        addEquipment();
    })
    /*--------------------------------------------------------------------------------------------*/





    /*--------------------------------call function to update Equipment-------------------------------*/
    $('#btn-equipment-update').on('click', function (){

        updateEquipment();
    })
    /*--------------------------------------------------------------------------------------------*/



    /*---------------------------------function add equipment-------------------------------------*/
    function updateEquipment(){

        const equipment= {

            equipmentId : $('#equipmentId').val(),
            type : $('#type').val(),
            name : $('#name').val(),
            status : $('#equipmentStatus').val(),
            fieldId : $('#equipmentFieldId').val(),
            staffId : $('#equipmentStaffId').val(),

        }


        let equipmentId = $('#equipmentId').val();
        console.log("vehicleid:"+equipmentId)


        const jsonEquipment = JSON.stringify(equipment)
        console.log("jsonObject"+jsonEquipment);


        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/equipment/"+equipmentId,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: jsonEquipment,

            success: function(result) {
                alert("Sucessfully  updated an equipment")
                loadEquipmentTable();
                alert("Backend Response: " + JSON.stringify(result));
            },
            error: function(error) {
                alert("An error occurred: " + error);
            }
        });

    }
    /*------------------------------------------------------------------------------------------*/



})