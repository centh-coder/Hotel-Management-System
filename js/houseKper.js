page('/housekeeper-task', (e) => {
    const task_date = `
        <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Schedule Cleaner</h4>
                        <p class="card-description"></p>
                        <div class="table-responsive">
                            <table id="cleanerTable" class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Task</th>
                                        <th>Area</th>
                                        <th>Date Start</th>
                                        <th>Date end</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody id="scheduletbody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="addModalKeeper" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"></div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                    <form>

                                        <input type="hidden" id="keeperId"> 

                                        <div class="form-group">
                                    <label for="name" class="form-label">Name:</label>
                                    <div class="input-group">
                                        <select style="background:white; width: 100%; "  autocomplete="off" class="form-control" id="keeperName" name="keeperName">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>


                                        <div class="form-group">
                                            <label>Task:</label>
                                            <input style="background:white;" autocomplete="off" type="Text" class="form-control" id="keeperTask" name="price">
                                        </div>
                                        <div class="form-group">
                                            <label>Area:</label>
                                            <input style="background:white;" autocomplete="off" type="text" class="form-control" id="keeperArea" name="numberofperson">
                                        </div>
                                        <div class="form-group">
                                            <label>Date Range:</label>
                                            <div class="input-group">
                                                <input style="background:white;" autocomplete="off" type="date" class="form-control" id="cleaner_date_from" required>
                                                <div class="input-group-append">
                                                    <span class="input-group-text">to</span>
                                                </div>
                                                <input style="background:white;" autocomplete="off" type="date" class="form-control" id="cleaner_date_to" required>
                                            </div>
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="AddKeeperCloseForm">Close</button>
                        <button type="button" id="addKeeperTask-btn" class="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="EditModalKeeper" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"></div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <form>
                                    <input type="hidden" id="editkeeperId">
                                    <div class="form-group">
                                        <label>Name:</label>
                                        <input style="background:white;" autocomplete="off" type="text" class="form-control" id="editkeeperName" name="number">
                                    </div>
                                    <div class="form-group">
                                        <label>Task:</label>
                                        <input style="background:white;" autocomplete="off" type="Text" class="form-control" id="editkeeperTask" name="price">
                                    </div>
                                    <div class="form-group">
                                        <label>Area:</label>
                                        <input style="background:white;" autocomplete="off" type="text" class="form-control" id="editkeeperArea" name="numberofperson">
                                    </div>
                                    <div class="form-group">
                                        <label>Date Range:</label>
                                        <div class="input-group">
                                            <input style="background:white;" autocomplete="off" type="date" class="form-control" id="editcleaner_date_from" required>
                                            <div class="input-group-append">
                                                <span class="input-group-text">to</span>
                                            </div>
                                            <input style="background:white;" autocomplete="off" type="date" class="form-control" id="editcleaner_date_to" required>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="UpdateKeeperCloseForm">Close</button>
                        <button type="button" id="UpdateKeeperTask-btn" class="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $.ajax({
        url: "api/get-keeper-role",
        type: "GET",
        dataType: "json",
        success: (data) => {
            if (data.roles == 0){
                //admin
                mainContainerApp(app_main_template);
                $("#subContentCapstone").empty();
                $("#subContentCapstone" ).append(task_date);
                
                }else if(data.roles == 1) {
                  //manager
                mainContainerApp(manager_app_main_template);
                $("#subManagerContentCapstone").empty();
                $("#subManagerContentCapstone" ).append(task_date);
                }else if(data.roles == 2) {
                //frontdesk
                mainContainerApp(frontdesk_app_main_template);
                $("#subfrontdeskContentCapstone").empty();
                $("#subfrontdeskContentCapstone" ).append(task_date);
                }else if(data.roles == 3) {
                    //housekeeeper
                    mainContainerApp(housekeeper_app_main_template);
                    $("#subHousekeeperContentCapstone").empty();
                    $("#subHousekeeperContentCapstone" ).append(task_date);
                }

            //$(containerSelector).empty().append(task_date);

            // Update active classes
            $("#menuDashboard").removeClass('active');
            $("#menuUsers").removeClass('active');
            $("#rooms").removeClass('active');
            $("#guest").removeClass('active');
            $("#menuUsersAccountSetting").removeClass('active');
            $("#reserve").removeClass('active');
            $("#housekeep").addClass('active');
            $("#housekeeping").removeClass('active');
            $("#archiveGuest").removeClass('active');
        }
    });

    $.ajax({
        url: "api/set-Date",
        type: "GET",
        dataType: "json",
        success: (data) => {
            if (data.login == 0) {
                page('/login');
            } else if (data.login == 1) {
                $("#scheduletbody").empty();
                $.each(data.userData, function (index, value) {
                    const row = `<tr>
                        <td>${value.name}</td>
                        <td>${value.task}</td>
                        <td>${value.area}</td>
                        <td>${value.datestart}</td>
                        <td>${value.dateend}</td>
                        <td>
                            <button type="button" class="btn btn-warning edit-btn" data-id="${value.id}" data-name="${value.name}" data-task="${value.task}" data-area="${value.area}" data-date-range="${value.date}">Edit</button>
                            <button type="button" class="btn btn-warning delete-sched-btn" data-id="${value.id}">Delete</button>
                        </td>
                    </tr>`;
                    $("#scheduletbody").prepend(row);
                });

                if ($.fn.DataTable.isDataTable("#cleanerTable")) {
                    $("#cleanerTable").DataTable().destroy();
                }

                $('#cleanerTable').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'csv', 'excel', 'pdf', 'print',
                        {
                            text: 'Add House Keeper',
                            attr: {
                                id: 'addKeeper-btn'
                            },
                        }
                    ]
                });
            }
        },
    });

    // Use a single event handler for adding new housekeepers
    $(document).off("click", "#addKeeper-btn").on("click", "#addKeeper-btn", function () {
        // Clear the form fields
        $("#keeperTask").val('');
        $("#keeperArea").val('');
        $("#cleaner_date_from").val('');
        $("#cleaner_date_to").val('');
    
        $("#addModalKeeper").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#addModalKeeper").modal("show");
    
        // Populate the keeperName select element
        $.ajax({
            url: "api/getUserHouseKeeper",
            type: "GET",
            dataType: "json",
            success: (data) => {
                console.log(data);
                $('#keeperName').empty();
                if (data.login == 0) {
                    page('/login');
                } else if (data.login == 1) {
                    $("#keeperName").append(`<option></option>`);
                    $.each(data.userData, function (index, value) {
                        $("#keeperName").append(`<option value="${value.id}">${value.username}</option>`);
                    });
                    // Initialize select2 after options are appended
                    $('#keeperName').select2({
                        placeholder: "Select Keeper Name",
                        allowClear: true,
                        dropdownParent: $('#addModalKeeper .modal-content')
                    });
                }
            },
        });
    });
    

    // Use a single event handler for editing housekeepers
    $(document).off("click", ".edit-btn").on("click", ".edit-btn", function() {
        var userId = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        var task = $(this).attr("data-task");
        var area = $(this).attr("data-area");
        var dateRange = $(this).attr("data-date-range").split(" to ");
        var fromdate = dateRange[0];
        var todate = dateRange[1];

        $("#editkeeperId").val(userId);
        $("#editkeeperName").val(name);
        $("#editkeeperTask").val(task);
        $("#editkeeperArea").val(area);
        $("#editcleaner_date_from").val(fromdate);
        $("#editcleaner_date_to").val(todate);

        $("#UpdateKeeperTask-btn").attr("data-id", userId); 

        $("#EditModalKeeper").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#EditModalKeeper").modal("show");
    });

    // Use a single event handler for updating housekeepers
    $(document).off("click", "#UpdateKeeperTask-btn").on("click", "#UpdateKeeperTask-btn", function() {
        var userid = $(this).attr("data-id");
        var name = $("#editkeeperName").val();
        var task = $("#editkeeperTask").val();
        var area = $("#editkeeperArea").val();
        var fromdate = $("#editcleaner_date_from").val();
        var todate = $("#editcleaner_date_to").val();
        var dateRange = `${fromdate} to ${todate}`;

        //console.log(userid);

        if (!userid) {
            console.error("User ID is undefined");
            return;
        }

        $.ajax({
            url: "api/update-keeper-data",
            type: "POST",
            dataType: "json",
            data: {
                userid: userid,
                kname: name,
                ktask: task,
                karea: area,
                kdateRange: dateRange
            },
            success: (data) => {
                $("#EditModalKeeper").modal("hide");
                if (data.status == 1) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Saved',
                        showConfirmButton: false,
                        timer: 1500,
                        didClose: () => {
                            page('/housekeeper-task');
                        }
                        
                    });
                } else if (data.status == 0) {
                    Swal.fire({
                        title: "No record has been edited. Do you still want to edit this form?",
                        showDenyButton: true,
                        confirmButtonText: "Yes",
                    });
                }
            }
        });
    });

    // Use a single event handler for submitting the form
    $(document).off("click", "#addKeeperTask-btn").on("click", "#addKeeperTask-btn", function (e) {
        var id = $("#keeperName").select2().find(":selected").val(); 
        var name = $("#keeperName").find(":selected").text(); 
        var task = $("#keeperTask").val();
        var area = $("#keeperArea").val(); 
        var fromDate = $("#cleaner_date_from").val();
        var toDate = $("#cleaner_date_to").val();
        //var dateRange = `${fromDate} to ${toDate}`;
    
        console.log("Selected Keeper ID:", id); 
        console.log("Selected Keeper Name:", name); 
    
        $.ajax({
            url: "api/house-keeper-data",
            type: "POST",
            dataType: "json",
            data: {
                id: id,
                name: name,
                task: task,
                area: area,
                fromDate: fromDate,
                toDate: toDate,
                //dateRange: dateRange,
            },
            success: (data) => {
                if (data.result == 0) {
                    swal.fire({
                        title: 'Good job!',
                        text: data.text,
                        icon: 'success',
                        didClose: () => {
                            page("/housekeeper-task");
                        }
                    });
                } else {
                    swal.fire({
                        icon: data.result == 1 ? 'error' : 'success',
                        title: data.result == 1 ? 'Oops...' : 'Good job!',
                        text: data.text
                    });
                }
            }
        });
    });
    

    $(document).on("click", "#AddKeeperCloseForm", function() {
        $("#addModalKeeper").modal("hide");
    });

    $(document).on("click", "#UpdateKeeperCloseForm", function() {
        $("#EditModalKeeper").modal("hide");
    });

    $(document).on("click", ".delete-sched-btn", function(e) {
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
                url: "api/deleteSchedRecord",
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
                            page('/housekeeper-task');
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
