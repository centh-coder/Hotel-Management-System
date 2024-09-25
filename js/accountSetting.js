page('/account-settings', (e) => {

    const account_settings = `
    <div class="card">
    <div class="card-body">
    <div class="container">
    <div class="row">


    <div class="col">
    <h1>Upload Pictures</h1>
    <input type="file" class="filepond" name="filepond"/>
    </div>
        
         <div class="col-sm">
            <label for="usernam2e">Username</label>

            <div class="input-group mb-3">
              <input type="text" class="form-control" id="updateUsername" placeholder="Username" aria-label="Recipient's username" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" id="updateUsername-btn" type="button">Update</button>
              </div>
            </div>

            <label for="password"> Current Password</label>
            <div class="input-group">
                <input style="background:white;" type="password" class="form-control" id="currentPassword" placeholder="Password">
            </div>
       
            <label for="repeatPassword">New Password</label>
            <div class="input-group mb-3">
              <input type="text" class="form-control" id="inputUpdateNewPassword" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" id="updatePassword-btn" type="button">Update</button>
                </div>
            </div>
            
        </div>

    </div>

</div>
    </div>
  </div>
  `;

   $.ajax({
    url: "api/get-user-role",
    type: "GET",
    dataType: "json",

     success: (data) => {

      if (data.roles == 0){
      mainContainerApp(app_main_template);
      $("#subContentCapstone").empty();
      $("#subContentCapstone" ).append(account_settings);

      const inputElement = document.querySelector(".filepond");
        const pond = FilePond.create(inputElement, {
          server: {
            url: "api/file-upload", 
            process: {
              method: "POST",
              onload: (response) => {
                 var myArray = JSON.parse(response);
                 $("#profileImage").attr('src', myArray.profilefilepath);
              }
            },
          },
        });


      
      }else if(data.roles == 1) {
      mainContainerApp(manager_app_main_template);
      $("#subManagerContentCapstone").empty();
      $("#subManagerContentCapstone" ).append(account_settings);


        const inputElement = document.querySelector(".filepond");
          const pond = FilePond.create(inputElement, {
            server: {
              url: "api/file-upload", 
              process: {
                method: "POST",
                onload: (response) => {
                   var myArray = JSON.parse(response);
                   $("#profileImage").attr('src', myArray.profilefilepath);
                }
              },
            },
          });

      }else if(data.roles == 2) {
  
      mainContainerApp(frontdesk_app_main_template);
      $("#subfrontdeskContentCapstone").empty();
      $("#subfrontdeskContentCapstone" ).append(account_settings);

    const inputElement = document.querySelector(".filepond");
    const pond = FilePond.create(inputElement, {
      server: {
        url: "api/file-upload", 
        process: {
          method: "POST",
          onload: (response) => {
             var myArray = JSON.parse(response);
             $("#profileImage").attr('src', myArray.profilefilepath);
          }
        },
      },
    });




      }else if(data.roles == 3) {
        //housekeeeper
        mainContainerApp(housekeeper_app_main_template);
        $("#subHousekeeperContentCapstone").empty();
        $("#subHousekeeperContentCapstone" ).append(account_settings);
    } 

      

     $("#menuDashboard").removeClass('active');
      $("#service").removeClass('active');
      $("#menuUsers").removeClass('active');
      $("#rooms").removeClass('active');
      $("#reserve").removeClass('active');
      $("#roomStatus").removeClass('active');
      $("#guest").removeClass('active');
      $("#reserve").removeClass('active');
      $("#billing").removeClass('active');
      $("#menuUsersAccountSetting").addClass('active');




      
     }





  });





$(document).on("click", "#updateUsername-btn", function() {
    var updateUsername = $("#updateUsername").val();
  $.ajax({
    url: "api/update-username",
    type: "POST",
    dataType: "json",
      data: {
      inputUsername: updateUsername,
      },
      success: (data) => {
      if (data.status == 1) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2000
        })

        $('#profileUsername').text(data.username);      
        $('#navbarUsername').text(data.username); 

      } else if (data.status == 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Not edited',
          showConfirmButton: false,
          timer: 2000
        })
      }   
      },
  });

});


$(document).on("click", "#updatePassword-btn", function() {
  var oldPassword = $("#currentPassword").val();
  var updateNewPassword = $("#inputUpdateNewPassword").val();

  $.ajax({
    url: "api/new-password",
    type: "POST",
    dataType: "json",
      data: {
        oldPassword: oldPassword,
        newPassword: updateNewPassword
      },
      success: (data) => {
        console.log(data);
            if (data.status == 0) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Password updated successfully',
                showConfirmButton: false,
                timer: 2000
              })
          } else if (data.status == 1) {
              console.log('Not logged in'); 
          } else if (data.status == 2) {
              console.log('Invalid password');  
          } else if (data.status == 3) {
              console.log('Too many requests');
          }
      },
  });
});


});