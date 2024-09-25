page('/register', (e) => {

//create varable and store the element 
const register_template = `<div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
data-sidebar-position="fixed" data-header-position="fixed">
<div
  class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
  <div class="d-flex align-items-center justify-content-center w-100">
    <div class="row justify-content-center w-100">
      <div class="col-md-8 col-lg-6 col-xxl-3">
        <div class="card mb-0">
          <div class="card-body">
        
            <p class="text-center">Register</p>
            <form>
              <div class="mb-3">
                <label for="exampleInputtext1" class="form-label">Name</label>
                <input type="text" class="form-control" id="registerUsernsmeInput" aria-describedby="textHelp" required>
              </div>

              <div class="mb-3">
                <label for="contact number" class="form-label">Contact Number</label>
                <input type="tel" class="form-control" id="phone" aria-describedby="textHelp" required>
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="registerEmailInput" aria-describedby="emailHelp" required>
              </div>

              <div class="mb-4">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="registerPasswordInput" required>
              </div>

              <a href="" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" id="register-btn">Sign Up</a>
              <div class="d-flex align-items-center justify-content-center">
                <p class="fs-4 mb-0 fw-bold">Already have an Account?</p>
                <a class="text-primary fw-bold ms-2" href="http://localhost/capstone/login">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;



//empty the main-container div
$("#main-container-capstone").empty();

//use the variable append the element inside the main-container div
$( "#main-container-capstone" ).append(register_template);

});

$(document).on('click', '#register-btn', function() {
  console.log("sign up na");

  // Get values from input fields
  var usernameInput = $('#registerUsernsmeInput').val().trim();
  var registerPhoneInput = $('#phone').val().trim();
  var registerEmailInput = $('#registerEmailInput').val().trim();
  var registerPasswordInput = $('#registerPasswordInput').val().trim();

  // Check if any field is empty
  if (usernameInput === '' || registerPhoneInput === '' || registerEmailInput === '' || registerPasswordInput === '') {
      // Show an error message or indication that all fields are required
      Swal.fire({
          title: 'All fields are required',
          icon: 'error'
      });
  } else {
      // Proceed with AJAX request if all fields are filled out
      $.ajax({
          url: "api/register",
          type: "POST",
          dataType: "json",
          data: {
              username: usernameInput,
              phone: registerPhoneInput,
              email: registerEmailInput,
              password: registerPasswordInput,
          },
          success: function(data) {
              console.log(data);
              if (data.result == 0) {
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Signed in, We sent you a gmail confirmation.",
                      showConfirmButton: false,
                      timer: 2000
                  });

                  if (data.roles == 0) {
                      page('/dashboard');
                  } else if (data.roles == 1) {
                      console.log("manager_page");
                  } else if (data.roles == 2) {
                    console.log("staff_page");
                  }
              } else if (data.result == 1 || data.result == 2 || data.result == 4 || data.result == 5) {
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: data.text,
                      showConfirmButton: false,
                      timer: 2000
                  });
              } else if (data.result == 3) {
                  Swal.fire({
                      title: "Email already exist",
                      showClass: {
                          popup: `
                              animate__animated
                              animate__fadeInUp
                              animate__faster
                          `
                      },
                      hideClass: {
                          popup: `
                              animate__animated
                              animate__fadeOutDown
                              animate__faster
                          `
                      }
                  });
              }
          }
      });
  }
});



// $(document).on('click', '#register-btn', function() {
// console.log("sign up na");
//   var usernameInput = $('#registerUsernsmeInput').val();
//   var registerPhoneInput = $('#phone').val();
//   var registerEmailInput = $('#registerEmailInput').val();
//   var registerPasswordInput = $('#registerPasswordInput').val();

//   $.ajax({
//     url:"api/register",
//     type: "POST",
//     dataType: "json",
//       data: {
//       	username: usernameInput,
//         phone: registerPhoneInput,
//         email: registerEmailInput,
//         password: registerPasswordInput,
//         },
//         success: (data) => {
//           console.log(data);
//         if (data.result == 0) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Signed in, We sent you a gmail confirmation.",
//             showConfirmButton: false,
//             timer: 2000
//           });

//           if (data.roles == 0){
//             page('/dashboard');
//           }else if(data.roles == 1) {
//             console.log("user_page");
//           }
          
//         } else if (data.result == 1) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: data.text,
//             showConfirmButton: false,
//             timer: 2000
//           });
//         } else if (data.result == 2) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: data.text,
//             showConfirmButton: false,
//             timer: 2000
//           });
//         } else if (data.result == 3) {
//           Swal.fire({
//             title: "Email already exist",
//             showClass: {
//               popup: `
//                 animate__animated
//                 animate__fadeInUp
//                 animate__faster
//               `
//             },
//             hideClass: {
//               popup: `
//                 animate__animated
//                 animate__fadeOutDown
//                 animate__faster
//               `
//             }
//           });
          
//         } else if (data.result == 4) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: data.text,
//             showConfirmButton: false,
//             timer: 2000
//           });
//         } else if (data.result == 5) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: data.text,
//             showConfirmButton: false,
//             timer: 3000
//           });
//         }
//         }
//   });
// });