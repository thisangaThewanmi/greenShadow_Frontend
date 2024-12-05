$(document).ready(function() {

    loadFields();
    loadAllCropData();

    const cardContainer = document.getElementById('cardContainer');


    /*-------------------load combo boxes---------------------------*/
    function loadFields(){
        console.log("loadFields");

        $.ajax({
            url:"http://localhost:5050/greenShadow/api/v1/field",
            type: "GET",
            dataType: "json",

            success: function (results) {
                console.log(results);


                // Clear the existing items in the dropdown or list
                $('#fields').empty();

                // Loop through the results to get all item IDs
                results.forEach(function(field) {


                    // Assuming each item has a property named 'itemID'
                    const fieldId = field.fieldId;
                    console.log("field Id from loop"+fieldId)

                    // Add each itemID to the dropdown or list
                    $('#fields').append(`<option value="${fieldId}">${fieldId}</option>`);
                });


            }
        });
    }
    /*=====================================================================================*/



    function loadAllCropData() {




        function fetchData(){
            $.ajax({
                url: "http://localhost:5050/greenShadow/api/v1/crop", // Replace with your API endpoint
                method: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("type of result   "+typeof(data))
                    renderCards(data);
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                }
            });
        }


        function  renderCards(data) {

            console.log("data" + typeof (data));

            cardContainer.innerHTML = ""; // Clear container
            data.forEach((crop) => {

                const imagePrefix = "data:image/jpeg;base64,"; // Adjust to PNG if needed
                const imageSrc = crop.image1.startsWith("data:") ? crop.image1 : `${imagePrefix}${crop.image1}`;

                const card = document.createElement('div');
                card.classList.add('card', 'p-3');
                card.setAttribute('data-id', crop.cropId);
                card.innerHTML = `

        <h5>${crop.commonName}</h5>
         <img src="${imageSrc}" alt="${crop.commonName}" style="width: 100%; height: auto;">
        <div class="labels">
         <span class="label  card-cropId">${crop.cropId}</span><br>

          <span class="label" >${crop.specificName}</span><br>
          <span class="label">${crop.category}</span><br>
          <span class="label">${crop.season}</span><br>
          <span class="label">${crop.fieldId}</span><br>
        </div>
        <button class="btn btn-success btn-sm add-btn">Add</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      `;
                cardContainer.appendChild(card);
            })
        }

        fetchData();
    }





    $('#btn-crop-save').on('click', function (){
        console.log("clicked the save btn")
        saveCrop();
    })



    /*-------------------------saving a crop -------------------------------*/
    // Function to submit the form via AJAX
    function saveCrop() {
        console.log("inside crop save")
        const form = document.getElementById('cropForm');


        let commonName = $("#commonName").val();
        let specificName = $("#specificName").val();
        let category = $("#crop-category").val();
        let season = $("#season").val();
        let fieldId = $("#fields").val();

        // Gather multiple Field IDs
        $("select[name='fieldIds[]']").each(function () {
            fieldIds.push($(this).val());
        });

        // Prepare form data for submission
        let formData = new FormData();
        formData.append("commonName", commonName);
        formData.append("specificName", specificName);
        formData.append("category", category);
        formData.append("season", season);
        formData.append("fieldId", fieldId);


        // Add file input
        let imageFile = $("#image1")[0].files[0];
        if (imageFile) {
            formData.append("image1", imageFile);
        }

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        // AJAX call
        $.ajax({
            url: "http://localhost:5050/greenShadow/api/v1/crop", // Replace with your server endpoint
            method: "POST",
            data: formData,
            processData: false, // Required for FormData
            contentType: false, // Required for FormData
            success: function(result, status, xhr) {
                alert("Sucessfully added the crop")
                // loadEquipmentTable();
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

    /*---------------------------------------------------------------*/






    /*--------------------------------------------------------deleteCrop----------------------*/

        cardContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                console.log("del btn clicked")// Ensure it’s the delete button
                handleDeleteClick(e.target);
            }
        });

  /*------------------------------------------------------------------------------------------*/




// Function to send AJAX request to the backend for deleting an item
    function deleteCrop(id) {
        $.ajax({
            url:"http://localhost:5050/greenShadow/api/v1/crop/"+id,
            type: "DELETE",

            success: function (response) {
                    alert("delete was sucessful")

            },
            error: function (xhr, status, error) {
                // Handle error during the AJAX request
                console.error('Error:', error);
                alert('An error occurred while deleting the item');
            }
        });
    };

// Event delegation for delete buttons

    function handleDeleteClick(deleteButton) {
        const card = deleteButton.closest('.card'); // Get the specific card
/*
        const id = parseInt(card.getAttribute('data-id'), 10); // Extract the ID
*/

        const id = card.querySelector('.card-cropId').textContent.trim(); // Get the category text as a string

        const index = Array.from(cardContainer.children).indexOf(card); // Get the index
        console.log(`Card ID: ${id}, Card Index: ${index}`);


        deleteCrop(id)
    }






//

});