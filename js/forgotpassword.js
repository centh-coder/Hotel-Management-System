page("/forgot-password", ()=>{
    
    const forgot_password_template = `<div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <div class="card-body">
               
                <h3 class="card-title text-left mb-3">Forgot Password</h3>
                      <div class="form-group">
                        <label>email *</label>
                        <input type="text" id="email-input" style="background-color: #d6d6e2;" class="form-control p_input">
                      </div>
                     
                      <div class="text-center">
                        <button type="button" id="forgot-password-btn" class="btn btn-primary btn-block enter-btn">Request</button>
                      </div>
                      <p class="sign-up">Don't have an Account?<a href="http://localhost/capstone/register"> Sign Up</a></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div> `;
    
    $('#main-container-capstone').empty();
    $('#main-container-capstone').append(forgot_password_template);
    
    $(document).on('click','#forgot-password-btn',function(){
        var emailInputValue = $('#email-input').val();
          $.ajax({
              url:"api/email-password-reset",
              type: "POST",
              dataType: "json",
              data: {
                email: emailInputValue ,
              },
              success: (data) => { 
                  console.log(data);
              }
      });
    
    });
    
    });