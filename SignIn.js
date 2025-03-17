$(document).ready(function () {

    function toggleForm(formType) {
        if (formType === 'signin') {
            $('#signin-section').removeClass('hidden');
            $('#signup-section').addClass('hidden');
        } else if (formType === 'signup') {
            $('#signup-section').removeClass('hidden');
            $('#signin-section').addClass('hidden');
        }
    }

    $('.signin-link span').on('click', function() {
        const formType = $(this).text().includes('Sign Up') ? 'signup' : 'signin';
        toggleForm(formType);
    });

    toggleForm('signin');

    /*================================= signIn =========================*/

    $('#btn-signin').click(function () {

        const email = $('#signin-email').val();
        const password = $('#signin-password').val();

        if (!email || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Credentials',
                text: 'Please enter both email and password!',
            });
            return;
        }


        $.ajax({
            url: 'http://localhost:5050/greenShadow/api/v1/auth/signIn',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({email, password}),
            success: function (response) {
                // Store the token and email from the response
                localStorage.setItem('token', response.token);
                localStorage.setItem('email', email)
                /* toggleForm('signin'); */ // Ensure the sign-in form is visible before redirect
                window.location.href = 'index.html';

                // show
                /*    Swal.fire({
                        icon: 'success',
                        title: 'Sign In successful!',
                        showConfirmButton: false,
                        timer: 1500,
                        iconColor: 'rgba(131,193,170,0.79)'
                    });
        */
                console.log("Sign-in successful!")
                alert("sucessfull")
                /* $("#login-form-section").css(css1);
                 $("#register-form-section").css(css1);
                 $("#home-section").css(css2)

                 handleNavClick("nav-dashboard");*/

            },
            error: function () {
                alert("Sign In failed. Please try again.")
                console.log("Sign In failed. Please try again.")

                $('#username').val("");
                $('#password').val("");
            }
        });

    });


    /*===============================================================================*/


    /*====================================sign up=============================*/

    $('#btn-signup').click(function () {

        console.log("SIGNUP KEE")

        const email = $('#signup-email').val();
        const password = $('#signup-password').val();
        const role = $('#signup-role').val();
        console.log(email, password, role)

        $.ajax({
            url: 'http://localhost:5050/greenShadow/api/v1/auth/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({email, password, role}),
            success: function (response) {
                alert("sign up successful")
                // Store the token from the response
                localStorage.setItem('token', response.token);

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
    /*=================================================================================*/


})