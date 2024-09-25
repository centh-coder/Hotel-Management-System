page('/archive', (e) => {

const archive_management = `<div class="row">
<div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
    <div class="card-body">
        <h4 class="card-title">Archive Guest</h4>
        <p class="card-description"></code>
        </p>
        <div class="table-responsive">
        <table id="archiveTable" class="table">
            <thead>
            <tr>
                <th>Name:</th>
                <th>Address:</th>
                <th>Contact Number:</th>
                <th>email:</th>
                <th>Options:</th>
                
            </tr>
            </thead>
            <tbody id=guestArchiveTableBody">
            </tbody>
        </table>
        </div>
    </div>
    </div>
    </div>
    </div>
    
    <div class="row">
<div class="col-lg-12 grid-margin stretch-card">
    <div class="card">
    <div class="card-body">
        <h4 class="card-title">Archive Users</h4>
        <p class="card-description"></code>
        </p>
        <div class="table-responsive">
        <table id="archiveUsersTable" class="table">
            <thead>
            <tr>
                <th>Name:</th>
                <th>Contact Number:</th>
                <th>email:</th>
                <th>Options:</th>
                
            </tr>
            </thead>
            <tbody id=usersArchiveTableBody">
            </tbody>
        </table>
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
      //admin
      mainContainerApp(app_main_template);
      $("#subContentCapstone").empty();
      $("#subContentCapstone" ).append(archive_management);
      
      }else if(data.roles == 1) {
        //manager
      mainContainerApp(manager_app_main_template);
      $("#subManagerContentCapstone").empty();
      $("#subManagerContentCapstone" ).append(archive_management);
      }else if(data.roles == 2) {
      //frontdesk
      mainContainerApp(frontdesk_app_main_template);
      $("#subfrontdeskContentCapstone").empty();
      $("#subfrontdeskContentCapstone" ).append(archive_management);
      }else if(data.roles == 3) {
        //housekeeeper
        mainContainerApp(housekeeper_app_main_template);
        $("#subHousekeeperContentCapstone").empty();
        $("#subHousekeeperContentCapstone" ).append(archive_management);
      }


$("#rooms").removeClass('active');
$("#reserve").removeClass('active');
$("#menuUsersAccountSetting").removeClass('active');
$("#reserve").removeClass('active');
$("#menuDashboard").removeClass('active');
$("#guest").removeClass('active');
$("#menuUsers").removeClass('active');
$("#archiveGuest").addClass('active');
$("#housekeep").removeClass('active');
$("#housekeeping").removeClass('active');


      
     }
  });


$(document).ready(function() {

    $.ajax({
        url: "api/archive",
        type: "GET",
        dataType: "json",
        beforeSend: function() {
            Swal.fire({
              title: 'Loading...',
              icon: 'info',
              showConfirmButton: false,
              allowOutsideClick: false
            });
          },
        success: function(data) {
            setTimeout(() => {
                Swal.close();
              }, 1000);
            if (data.login == 1) {
                if (!$.fn.DataTable.isDataTable('#archiveTable')) {
                    archivedataTable = $("#archiveTable").DataTable({
                        dom: 'Bfrtip',
                        buttons: []
                    });
                }
                archivedataTable.clear().draw();
                console.log(data.userData);
                $.each(data.userData, function(index, value) {

                    var row = `<tr>
                    <td>${value.full_name}</td>
                    <td>${value.address}</td>
                    <td>${value.contact_no}</td>
                    <td>${value.email}</td>
                    <td><button type="button" data-id="${value.id}" class="btn btn-danger delete-archive-btn">Delete</button></td>
                    </tr>`;
                    archivedataTable.row.add($(row)).draw();
                });
            }
        },
    });


    $(document).on("click", ".delete-archive-btn", function(e) {
        var id = $(this).attr("data-id");
        console.log(id);
        
        swal.fire({
            title: "Are you sure you want to delete this record?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
          }) .then((result) => {
            if (result.isConfirmed) {
              $.ajax({
                url: "api/deleteGuestRecord",
                type: "POST",
                dataType: "json",
                data: {
                  id: id,
                },
                success: (data) => {
                    console.log(data);
                    if(data.success) {
                        Swal.fire({
                        title: "Successfully Deleted!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        didClose: () => {
                            page('/archive');
                        }
    
                    });
                    
    
                    }else {
                        swal.fire("Faild to delete", "", "error");
                    }
                },
              });
            } 
          });
    });




    $.ajax({
        url: "api/users-archive",
        type: "GET",
        dataType: "json",
        beforeSend: function() {
            Swal.fire({
              title: 'Loading...',
              icon: 'info',
              showConfirmButton: false,
              allowOutsideClick: false
            });
          },
        success: function(data) {
            setTimeout(() => {
                Swal.close();
              }, 1000);
            // console.log('sdasdsa');
            // console.log(data);
             if (data.login == 1) {
                if (!$.fn.DataTable.isDataTable('#archiveUsersTable')) {
                    userdataTable = $("#archiveUsersTable").DataTable({
                        dom: 'Bfrtip',
                        buttons: []
                    });
                }
                userdataTable.clear().draw();
                $.each(data.userData, function(index, value) {
                    // console.log(value);
                    var row = `<tr>
                    <td>${value.username}</td>
                    <td>${value.contact_number}</td>
                    <td>${value.email}</td>
                    <td><button type="button" data-id="${value.id}" class="btn btn-danger delete-archive-user-btn">Delete</button></td>
                    </tr>`;
                    userdataTable.row.add($(row)).draw();
                });
            }
        },
    });
});




$(document).on("click", ".delete-archive-user-btn", function(e) {
    var id = $(this).attr("data-id");
    var row = $(this).closest("tr");
    console.log(id);

    swal.fire({
        title: "Are you sure you want to delete this record?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }) .then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: "api/deleteUserArchiveRecord",
            type: "POST",
            dataType: "json",
            data: {
              id: id,
            },
            success: (data) => {
                console.log(data);
                if(data.success) {
                    Swal.fire({
                    title: "Successfully Deleted!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    didClose: () => {
                        page('/archive');
                    }

                });
                

                }else {
                    swal.fire("Faild to delete", "", "error");
                }
            },
          });
        } 
      });


});
});