page('/housekeeper-task-schedule', (e) => {

    const task_data = `
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Task</h4>
            <p class="card-description"></p>
            <div class="table-responsive">
              <table id="schedTable" class="table">
                <thead>
                  <tr>
                    <th>Name:</th>
                    <th>Task:</th>
                    <th>Area:</th>
                    <th>Date Start:</th>
                    <th>Date End:</th>
                    <th>Options:</th>
                  </tr>
                </thead>
                <tbody id="taskschedTableBody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    $.ajax({
        url: "api/get-sched-role",
        type: "GET",
        dataType: "json",
        success: (data) => {
             
    if (data.roles == 0){
      //admin
      mainContainerApp(app_main_template);
      $("#subContentCapstone").empty();
      $("#subContentCapstone" ).append(task_data);
      
      }else if(data.roles == 1) {
        //manager
      mainContainerApp(manager_app_main_template);
      $("#subManagerContentCapstone").empty();
      $("#subManagerContentCapstone" ).append(task_data);
      }else if(data.roles == 2) {
      //frontdesk
      mainContainerApp(frontdesk_app_main_template);
      $("#subfrontdeskContentCapstone").empty();
      $("#subfrontdeskContentCapstone" ).append(task_data);
      }else if(data.roles == 3) {
        //housekeeeper
        mainContainerApp(housekeeper_app_main_template);
        $("#subHousekeeperContentCapstone").empty();
        $("#subHousekeeperContentCapstone" ).append(task_data);
    }



  $("#menuDashboard").removeClass('active');
  $("#menuUsers").removeClass('active');
  $("#rooms").removeClass('active');
  $("#guest").removeClass('active');
  $("#menuUsersAccountSetting").removeClass('active');
  $("#reserve").removeClass('active');
  $("#housekeep").removeClass('active');
  $("#housekeeping").addClass('active');
  $("#archiveGuest").removeClass('active');

            // Initialize DataTable after appending the content
            if (!$.fn.DataTable.isDataTable('#schedTable')) {
                $('#schedTable').DataTable({
                    dom: 'Bfrtip',
                    buttons: []
                });
            }

            loadDataToTable(); // Load data into the table
        }
    });

    function loadDataToTable() {
        $.ajax({
            url: "api/schedule",
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
                    const scheddataTable = $('#schedTable').DataTable();
                    scheddataTable.clear().draw();

                    $.each(data.userData, function(index, value) {
                        const row = `
                          <tr>
                            <td>${value.name}</td>
                            <td>${value.task}</td>  
                            <td>${value.area}</td>  
                            <td>${value.datestart}</td>
                            <td>${value.dateend}</td>  
                            <td><button type="button" data-id="${value.id}" class="btn btn-danger delete-sched-btn">Done</button></td>
                          </tr>`;
                        scheddataTable.row.add($(row)).draw();
                    });
                }
            }
        });

        $(document).on("click", ".delete-sched-btn", function(e) {
            var id = $(this).attr("data-id");
            console.log(id);
            
            swal.fire({
                title: "Done Cleaning?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`,
              }) .then((result) => {
                if (result.isConfirmed) {
                  $.ajax({
                    url: "api/deleteRecord",
                    type: "POST",
                    dataType: "json",
                    data: {
                      id: id,
                    },
                    success: (data) => {
                        console.log(data);
                        if(data.success) {
                            Swal.fire({
                            title: "Cleaned!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                            didClose: () => {
                                page('/housekeeper-task-schedule');
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
    }

    
});
