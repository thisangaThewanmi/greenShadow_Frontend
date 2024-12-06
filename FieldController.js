$(document).ready(function(){

    loadAllFieldData();
    loadStaffIds();

    let staffIdsArray=[]
    const fieldCardContainer = document.getElementById('field-cardContainer');





    /*------------------------------------------ map data----------------------------------*/


    // Initialize Leaflet map
    const map = L.map('map').setView([0, 0], 2); // Default to world view
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a draggable marker
    const marker = L.marker([0, 0], { draggable: true }).addTo(map);
    marker.on('moveend', function (e) {
        const position = marker.getLatLng();
        document.getElementById('field-latitude').value = position.lat.toFixed(6);
        document.getElementById('field-longitude').value = position.lng.toFixed(6);
    });



    // Load a country's location using Nominatim API
    function loadCountry() {
        const country = document.getElementById('country').value;

        if (!country) {
            alert('Please enter a country name.');
            return;
        }

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(country)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const location = data[0];
                    const lat = parseFloat(location.lat);
                    const lon = parseFloat(location.lon);

                    // Update the map and marker position
                    map.setView([lat, lon], 6);
                    marker.setLatLng([lat, lon]);

                    // Update form fields
                    document.getElementById('field-latitude').value = lat.toFixed(6);
                    document.getElementById('field-longitude').value = lon.toFixed(6);
                    document.getElementById('field-location').value = `${lat},${lon}`;
                } else {
                    alert('Unable to locate the country. Please enter a valid name.');
                }
            })
            .catch(error => {
                console.error('Error fetching geolocation:', error);
                alert('An error occurred while loading the location.');
            });
    }
    /*--------------------------------------------------------------------------------------------*/



    /*------------------------------ save data ----------------------------------------*/
$('.btn-loadCountry').on('click',function (){
    console.log("load country click kala")
    loadCountry()
})
    /*---------------------------------------------------------------------------------*/


    /*------------------------------ get StaffIds ----------------------------------------*/
    function loadStaffIds() {
        console.log("loadStaffIds");

        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:5050/greenShadow/api/v1/staff",
                type: "GET",
                dataType: "json",

                success: function(results) {
                    console.log(results);

                    // Clear the existing items in the dropdown or list
                    $('#field-staffIds').empty();

                    // Create an array to store staff IDs
                    /*let staffIdsArray = [];*/

                    // Loop through the results to get all staff IDs
                    results.forEach(function(staff) {
                        const staffId = staff.staffId;
                        console.log("STAFFId from loop: " + staffId);

                        // Add each staffId to the dropdown
                        $('#field-staffIds').append(`<option value="${staffId}">${staffId}</option>`);

                        // Push the staffId to the staffIdsArray
                        staffIdsArray.push(staffId);
                    });

                    // Resolve the Promise with the staffIdsArray
                    resolve(staffIdsArray);
                },

                error: function(xhr, status, error) {
                    // Reject the Promise in case of an error
                    reject('Error loading staff IDs: ' + error);
                }
            });
        });
    }


    /*-------------- triggering more  combo boxes----------------------------*/

    $('.btn-add-cmb').on('click', function(){
        addField()

    })

    /*---------------------------------------------------------------------------------*/





    /*------------------------------- combo boxes-----------------------------------------*/


    function addField() {
        const container = $('#fieldIdContainer'); // Select the container
        const row = $('<div>', { class: 'row mb-3' }); // Bootstrap row with margin-bottom for spacing

        const selectCol = $('<div>', { class: 'col-md-8' }); // Column for the select dropdown
        const buttonCol = $('<div>', { class: 'col-md-4 d-flex align-items-center' }); // Column for the button, centered vertically

        const select = $('<select>', {
            name: 'fieldIds',
            class: 'form-select', // Bootstrap class for styled selects
            required: true
        });

        // First, create a default "Select Field ID" option
        $('<option>', {
            value: '',
            text: 'Select Staff Ids'
        }).appendTo(select);

        // Loop through staffIds and add them as options in the select dropdown
        staffIdsArray.forEach(function(staff) {
            $('<option>', {
                value: staff,
                text: staff
            }).appendTo(select);
        });

        const removeBtn = $('<button>', {
            type: 'button',
            class: 'btn btn-danger ms-2', // Add some margin to the left
            text: 'Remove',
            click: function () {
                row.remove(); // Remove the entire row when the button is clicked
            }
        });

        // Append select to its column
        selectCol.append(select);

        // Append button to its column
        buttonCol.append(removeBtn);

        // Append both columns to the row
        row.append(selectCol).append(buttonCol);

        // Append the row to the main container
        container.append(row);
    }


    function getSelectedFieldIds() {
        const selectedIds = [];

        // Find all select elements within #fieldIdContainer
        $('#fieldIdContainer select').each(function () {
            const selectedValue = $(this).val(); // Get the value of the current select
            if (selectedValue) { // Only include if a value is selected
                selectedIds.push(selectedValue);
            }
        });

        return selectedIds;
    }
    /*--------------------------------------------------------------------------------------*/



      /*-------------------------saving a field -------------------------------*/
      // Function to submit the form via AJAX
      function saveField() {
          console.log("inside field save")
          const form = document.getElementById('fieldForm');

          let fieldName = $("#field-name").val();
          console.log("Field Name:", fieldName);

          let fieldSize = $("#field-size").val();
          console.log("Field Size:", fieldSize);

          let image1 = $("#field-image1").val();
          console.log("Image 1:", image1);

          let image2 = $("#field-image2").val();
          console.log("Image 2:", image2);


          let staffIds = getSelectedFieldIds();
          console.log("Staff IDs:", staffIds);

          let longitude = $("#field-longitude").val();
          console.log("Longitude:", longitude);

          let latitude = $("#field-latitude").val();
          console.log("Latitude:", latitude);

          const location = `${latitude},${longitude}`;
          console.log("Location:", location);


          /*!// Gather multiple Field IDsq
          $("select[name='fieldIds[]']").each(function () {
              fieldIds.push($(this).val());
          });*/

          // Prepare form data for submission
          let formData = new FormData();
          formData.append("name", fieldName);
          formData.append("size", fieldSize);
          /*formData.append("image1", image1);
          formData.append("image2", image2);*/
          formData.append("staffIds", staffIds);
          console.log("staffIds"+staffIds)
          formData.append("location", location);

          // Add file input
          let imageFile = $("#field-image1")[0].files[0];
          if (imageFile) {
              formData.append("image1", imageFile);
          }

          let imageFile2 = $("#field-image2")[0].files[0];
          if (imageFile2) {
              formData.append("image2", imageFile2);
          }

          for (const pair of formData.entries()) {
              console.log(`${pair[0]}: ${pair[1]}`);
          }
          // AJAX call
          $.ajax({
              url: "http://localhost:5050/greenShadow/api/v1/field", // Replace with your server endpoint
              method: "POST",
              data: formData,
              processData: false, // Required for FormData
              contentType: false, // Required for FormData
              success: function(result, status, xhr) {
                  alert("Sucessfully added the field")
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

    $('#btn-field-save').on('click', function () {
        console.log("add btn clicked");
        saveField();
    });




    /*----------------------------------- load all Field data---------------------------*/
    function loadAllFieldData() {

        function fetchData(){
            $.ajax({
                url: "http://localhost:5050/greenShadow/api/v1/field", // Replace with your API endpoint
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

            fieldCardContainer.innerHTML = ""; // Clear container
            data.forEach((field) => {

                console.log("staffIds"+field.staffIds)

                const imagePrefix = "data:image/jpeg;base64,"; // Adjust to PNG if needed
                const imageSrc = field.image1.startsWith("data:") ? field.image1 : `${imagePrefix}${field.image1}`;
                const imageSrc2 = field.image2.startsWith("data:") ? field.image1 : `${imagePrefix}${field.image1}`;

                const card = document.createElement('div');
                card.classList.add('card', 'p-3');
                card.setAttribute('data-id', field.fieldId);
                card.innerHTML = `

        <h5>${field.name}</h5>
     
         <img src="${imageSrc}" alt="${field.commonName}" style="width: 100%; height: 50%;">
         <br>
         <br>
         <img src="${imageSrc2}" alt="${field.commonName}" style="width: 100%; height: 50%;">
        
        <div class="labels">
         <span class="label  card-fieldId">${field.fieldId}</span><br>

          <span class="label" >${field.size}</span><br>
          <span class="label">${field.location}</span><br>
          <span class="label">${field.staffIds}</span><br>
        
        </div>
        <button class="btn btn-success btn-sm field-add-btn">Add</button>
        <br>
        <button class="btn btn-danger btn-sm field-delete-btn">Delete</button>
      `;
                fieldCardContainer.appendChild(card);
            })
        }

        fetchData();
    }

    /*-----------------------------------------------------------------------------------*/




    /*--------------------------- delete Field ---------------------------------------------*/
    // Function to send AJAX request to the backend for deleting an item
    function deleteField(id) {
        $.ajax({
            url:"http://localhost:5050/greenShadow/api/v1/field/"+id,
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

        const id = card.querySelector('.card-fieldId').textContent.trim(); // Get the category text as a string

        const index = Array.from(fieldCardContainer.children).indexOf(card); // Get the index
        console.log(`Card ID: ${id}, Card Index: ${index}`);

        deleteField(id)
    }


    /*--------------------------------------------------------------------------------------*/


    /*----------------------------calling delete function --------------------------------*/
    fieldCardContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('field-delete-btn')) {
            console.log("del btn clicked")// Ensure it’s the delete button
            handleDeleteClick(e.target);
        }
    });
    /*--------------------------------------------------------------------------------------*/

})