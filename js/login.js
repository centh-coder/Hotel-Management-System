page('/login', (e) => {
 
  const login_template = ` <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
  data-sidebar-position="fixed" data-header-position="fixed">
  <div
    class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
    <div class="d-flex align-items-center justify-content-center w-100">
      <div class="row justify-content-center w-100">
        <div class="col-md-8 col-lg-6 col-xxl-3">
          <div class="card mb-0">
            <div class="card-body">
             
              <p class="text-center">Login</p>
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                </div>

                <div class="mb-4">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password">
                </div>

                <div class="d-flex align-items-center justify-content-between mb-4">
                  <a class="text-primary fw-bold" href="http://localhost/capstone/forgot-password">Forgot Password ?</a>
                </div>

                <div class="text-center">
                <button
                  type="button" id="login-btn" class="btn btn-primary btn-block enter-btn">Login</button>
              </div>

                <div class="d-flex align-items-center justify-content-center">
                  <p class="fs-4 mb-0 fw-bold">Create New Account</p>
                  <a class="text-primary fw-bold ms-2" href="http://localhost/capstone/register">Create an account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

$("#main-container-capstone").empty();
$( "#main-container-capstone" ).append(login_template);
 
});


$(document).on('click', '#login-btn', function() {

  $("div.spanner").addClass("show");
  $("div.overlay").addClass("show");
  var emailInput = $('#email').val();
  var passInput = $('#password').val();

  $.ajax({
    url:"api/login",
    type: "POST",
    dataType: "json",
      data: {
        email: emailInput,
        password: passInput,
        },
        success: (data) => {
          console.log(data.roles);

          if(data.result == 1){
            swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'Login Successfully',
              showConfirmButton: false,
              timer: 2000
            });

            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");

            if (data.roles == 0){
              page('/dashboard');
            }else if(data.roles == 1) {
              page('/manager');
            }else if(data.roles == 2) {
              page('/frontdesk');
            }else if(data.roles == 3) {
              page('/housekeeper');
            }

          }else if(data.result == 2){
            swal.fire({
              text: data.text,
            });

            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");

          }else if(data.result == 3){
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Wrong Password!',
            });
 
            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");

          }else if(data.result == 4){
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email not Verify!',
            });

            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");

          }else if(data.result == 5){
            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Too many results!',
            });

            $("div.spanner").removeClass("show");
            $("div.overlay").removeClass("show");

          }


        }
  });

});