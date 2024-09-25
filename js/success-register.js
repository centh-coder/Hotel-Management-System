page('/success', (e) => {

    console.log('success', e);

    const success_register_template = `<div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div class="d-flex align-items-center justify-content-center w-100">
        <div class="row justify-content-center w-100">
          <div class="col-md-12 col-lg-6 col-xxl-5">
            <div class="card mb-0">
              <div class="card-body">
      
                <div class="row align-items-center d-flex flex-row">
                <div class="col-lg-12 text-lg-center pr-lg-12">
                  <h2 style="font-size: 80px" class="display-1 mb-0">
                    <b>Thanks for Registering</b>
                  </h2>
                </div>
              </div> 
 
              <div class="row mt-5">
                <div class="col-12 text-center mt-xl-3">
                  <a class="text-black font-weight-medium" href="http://localhost/capstone/login">Login</a>
                </div>
              </div>               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>`;
 
 $('#main-container-capstone').empty();
 $('#main-container-capstone').append(success_register_template);
 
 
 });