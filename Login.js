$(document).ready(function (){


    function toggleForm(formType) {
        if (formType === 'signin') {
            $('#signin-section').removeClass('hidden');
            $('#signup-section').addClass('hidden');
        } else if (formType === 'signup') {
            $('#signup-section').removeClass('hidden');
            $('#signin-section').addClass('hidden');
        }
    }

    // Default to showing Sign In form on page load
    toggleForm('signin');

    // When "Sign In" is clicked, navigate to the index form (or homepage)
    $('#btn-signin').on('click', function() {
        window.location.href = 'index.html'; // This will navigate to the index page
    });

    // When "Sign Up" or "Sign In" link is clicked, toggle between forms
    $('.signin-link span').on('click', function() {
        const formType = $(this).text().includes('Sign Up') ? 'signup' : 'signin';
        toggleForm(formType);
    });

    $('#btn-signup').click(function () {

        console.log("SIGNUP KEE")

        const email = $('#signup-email').val();
        const password = $('#signup-password').val();
        const role = $('#signup-role').val();
        console.log(email,password,role)

        $.ajax({
            url: 'http://localhost:5050/greenShadow/api/v1/auth/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password, role }),
            success: function (response) {
                // Store the token from the response
                localStorage.setItem('token', response.token);
                toggleForm('signin')

             /*   console.log("Sign-up successful!")
                $("#register-form-section").css(hiddenSectionCSS);
                $("#login-form-section").css(visibleSectionCSS);*/
            },

            error: function () {
                console.log("Sign-up failed. Please try again.")

                $('#signup-username').val("");
                $('#signup-password').val("");
            }
        });
    });


})