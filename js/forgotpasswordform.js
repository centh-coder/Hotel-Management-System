page("/reset-password-form", ()=>{

    console.log('forgot password');
    
    const forgot_password_form_template = `
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
data-sidebar-position="fixed" data-header-position="fixed">
<div
  class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
  <div class="d-flex align-items-center justify-content-center w-100">
    <div class="row justify-content-center w-100">
      <div class="col-md-8 col-lg-6 col-xxl-3">
        <div class="card mb-0">
          <div class="card-body">
           
            
            <h3 class="card-title text-left mb-3">New Password</h3>
            <div class="form-group">
              <label>password *</label>
              <input type="password" id="new-password-input" class="form-control p_input">
            </div>
            <div class="text-center">
              <button type="button" id="reset-password-form-btn" class="btn btn-primary btn-block enter-btn">Reset</button>
            </div>
            <p class="sign-up">Success Reset Password ? <a href="http://localhost/capstone/login"> Log In</a></p>



          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    `;
    
    $('#main-container-capstone').empty().append(forgot_password_form_template);
    
    
    $(document).on('click','#reset-password-form-btn',function(){
    
      const urlParams = new URLSearchParams(window.location.search);
      const selector = urlParams.get('selector');
      const token = urlParams.get('token');
        var newPasswordInputValue = $('#new-password-input').val();
      
          $.ajax({
              url:"api/update-the-password",
              type: "POST",
              dataType: "json",
              data: {
              selector: selector,
              token: token,
                password: newPasswordInputValue ,
              },
              success: (data) => { 
    
                  console.log(data);
    
    
              }
      });
    
    });
    
    });