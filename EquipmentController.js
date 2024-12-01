
 var recordIndex;

$(document).ready(function (){

    loadEquipmentTable();


    /*--------------------------  function to load vehicle table ----------------------*/
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
                         <button type="button"  class="btn btn-danger  delete-vehicle">Delete</button>
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



})