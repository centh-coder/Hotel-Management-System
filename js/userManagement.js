page('/user-management', (e) => {

    const user_management = `
        <div class="row">
           <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                 <div class="card-body">
                    <h4 class="card-title">Please fill up the form</h4>
                    <p class="card-description"></code>
                    </p>
                    <div class="table-responsive">
                       <table id="userTable" class="table">
                          <thead>
                             <tr>
                                <th>Email:</th>
                                <th>Name:</th>
                                <th>Contact Number:</th>
                                <th>Options:</th>
                             </tr>
                          </thead>
                          <tbody id="userTableBody">
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        <div class="modal fade" id="userEditModal" tabindex="-1" role="dialog">
           <div class="modal-dialog">
              <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="userEditModaluser">Please edit the form</h5>
                 </div>
                 <div class="modal-body">
                    <div class="row">
                       <div class="col-sm-12">
                          <form>
                             <div class="form-group">
                                <label for="username">Username:</label>
                                <input style="background:white;" type="text" class="form-control" id="editAdminusername" name="username">
                             </div>
                          </form>
                       </div>
                    </div>
                 </div>
                 <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="editCloseForm">Close</button>
                    <button type="button" id="editUpdate"  class="btn btn-primary">Update</button>
                 </div>
              </div>
           </div>
        </div>
        <div class="modal fade" id="userRoleModal"  role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
           <div class="modal-dialog">
              <div class="modal-content">
                 <div class="modal-header">
                    <h5 class="modal-title" id="userRoleModalUser">Roles</h5>
                 </div>
                 <div class="modal-body">
                    <div class="row">
                       <div class="col-sm-12">
                          <div class="card">
                             <div class="card-body">
                                <h4 class="card-title">Select roles</h4>
                                <div class="form-group">
                                   <select class="" id="rolesSelectedValue" style="width:100%">
                                      <option value="0">Admin</option>
                                      <option value="2">Staff</option>
                                      <option value="1">Manager</option>
                                      <option value="3">House Keeper</option>
                                   </select>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="editroleCloseForm">Close</button>
                    <button type="button" id="roleModalUpdate-btn" class="btn btn-primary">Update</button>
                 </div>
              </div>
           </div>
        </div>
        </div>
<div class="modal fade" id="addModalUser" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title" id="addModalUserAdd">Please fill up the form</h5>
         </div>

         <div class="modal-body">
            <div class="row">
               <div class="col-sm-12">
                  <form>
                  <div class="form-group">
                    <div class="form-group">
                        <label >Email:</label>
                        <input style="background:white;" autocomplete="off" type="email" class="form-control" id="adminemail" name="email">
                     </div>
                     <div class="form-group">
                        <label >Username:</label>
                        <input style="background:white;" autocomplete="off" type="text" class="form-control" id="addUsername" name="addUsername">
                     </div>

                     <div class="form-group">
                     <label >Password:</label>
                     <input style="background:white;" autocomplete="off" type="password" class="form-control" id="addpassword" name="addpassword">
                  </div>
                  <div class="form-group">
                  <label >Contact no.:</label>
                  <input style="background:white;" autocomplete="off" type="tel" class="form-control" id="contact" name="no.">
               </div>
                  </form>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="AddUserCloseForm">Close</button>
            <button type="button" id="addData-btn" class="btn btn-primary">Add</button>
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
      $("#subContentCapstone" ).append(user_management);
      
      }else if(data.roles == 1) {
        //manager/staff
      mainContainerApp(manager_app_main_template);
      $("#subManagerContentCapstone").empty();
      $("#subManagerContentCapstone" ).append(user_management);
      
      }else if(data.roles == 2) {
        //frontdesk
        mainContainerApp(frontdesk_app_main_template);
        $("#subfrontdeskContentCapstone").empty();
        $("#subfrontdeskContentCapstone" ).append(rooms);
        }else if(data.roles == 3) {
          //housekeeeper
          mainContainerApp(housekeeper_app_main_template);
          $("#subHousekeeperContentCapstone").empty();
          $("#subHousekeeperContentCapstone" ).append(rooms);
      }

    $("#rooms").removeClass('active');
    $("#menuUsersAccountSetting").removeClass('active');
    $("#reserve").removeClass('active');
    $("#menuDashboard").removeClass('active');
    $("#guest").removeClass('active');
    $("#menuUsers").addClass('active');
    $("#housekeep").removeClass('active');
    $("#housekeeping").removeClass('active');


          
     }
  });


    var dataTable;
    // <button type="button" data-id="${value.id}" class="btn btn-warning delete-btn">Remove</button>
    $.ajax({
        url: "api/get-data-user",
        type: "GET",
        dataType: "json",
        success: (data) => {
            // var getData = data.reverse();
            if (data.login == 0) {
                page('/login');
            } else if (data.login == 1) {
                $.each(data.userData, function(index, value) {

                    var row = `<tr>
                <td>${value.email}</td>
                <td>${value.username}</td>
                <td>${value.contact_number}</td>
                <td>
                <button type="button" data-id="${value.id}" class="btn btn-warning edit-btn">Edit</button>
                <button type="button" data-id="${value.id}" class="btn btn-warning archive-btn">Remove</button>
                <button type="button" data-id="${value.id}" class="btn btn-warning role-btn">Roles</button>
                </td>
                </tr>`;

                    $("#userTableBody").prepend(row);
                });

                dataTable = $("#userTable").DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'csv', 'excel', 'pdf', 'print',
                        {
                            text: 'Add User',
                            attr: {
                                id: 'addUser-btn'
                            },
                        }
                    ]
                });
                // Trigger alphabetical sorting based on the first column (index 0)
                // dataTable.order([0, 'asc']).draw();

            }
        }
    });

    // $(document).on("click", ".moduleAccess-btn", function() {
    //     $("#userModuleAccessModal").remove();
    //     var id = $(this).attr("data-id");
    //     var row = $(this).closest("tr");

    //     $.ajax({
    //         url: "api/user-module-access",
    //         type: "POST",
    //         dataType: "json",
    //         data: {
    //             id: id,
    //           },
    //           success: (data) => {
    //           },

    //     });

    //     $("body").append(`<div class="modal fade" id="userModuleAccessModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    //     <div class="modal-dialog">
    //        <div class="modal-content">
    //           <div class="modal-header">
    //              <h5 class="modal-title" id="exampleModalLongTitle">Module Access</h5>
    //              <button type="button" style="background:white;" id="moduleAccessSpanClose" class="close" data-dismiss="modal" aria-label="Close">
    //              <span aria-hidden="true">&times;</span>
    //              </button>
    //           </div>

    //           <div class="modal-body">
    //                 <div class="row">
    //                     <div class="col-sm-12">



    //                     </div>
    //                 </div>
    //           </div>
    //           <div class="modal-footer">
    //              <button type="button" class="btn btn-secondary" id="moduleAccessCloseModal">Close</button>
    //              <button type="button" id="moduleAccessModal" class="btn btn-primary">Update</button>
    //           </div>
    //        </div>
    //     </div>
    //  </div>
    //  </div>`);

    // $("#userModuleAccessModal").modal("show");
    // });



    $(document).on("click", "#moduleAccessCloseModal", function() {
        $("#userModuleAccessModal").modal('hide');
    });

    $(document).on("click", "#moduleAccessSpanClose", function() {
        $("#userModuleAccessModal").modal('hide');
    });

    $(document).on("click", ".role-btn", function() {
        
        var userid = $(this).attr("data-id");

        $('#rolesSelectedValue').select2({
            dropdownParent: $('#userRoleModal')
        });
        
        $('#roleModalUpdate-btn').attr('data-id', userid);

        $("#userRoleModal").modal({
            backdrop: 'static',
            keyboard: false
        });

        $("#userRoleModal").modal("show");

        $('#rolesSelectedValue').on('change', function() {
         var selectedValue = $(this).val();
         

        });

    });

    $(document).on("click", "#editroleCloseForm", function() {
        $("#userRoleModal").modal('hide');
    });

    $(document).on("click", "#roleSpanClose", function() {
        $("#userRoleModal").modal('hide');
    });

    

    $(document).on("click", "#roleModalUpdate-btn", function() {
        //fix this code  then try to get the value using select2
        var rolesId = $('#rolesSelectedValue').find(":selected").val();
        
        var userId = $(this).attr("data-id");

        console.log(rolesId);
        console.log(userId);

        $.ajax({
            url: "api/update-userRole-id",
            type: "POST",
            dataType: "json",
            data: {
                userId: userId,
                rolesId: rolesId,
            },
            success: (data) => {
                console.log(data);
            },
        });



    });



    // $(document).on("click", ".status-btn", function() {
    //     $('#userStatusModal').remove();

    //     var id = $(this).attr("data-id");
    //     var row = $(this).closest("tr");

    //     $.ajax({
    //         url: "api/user-status",
    //         type: "POST",
    //         dataType: "json",
    //         data: {
    //             id: id,
    //           },
    //           success: (data) => {
    //             console.log(data);
    //           }, 
    //     });

    //     $("body").append(`<div class="modal fade" id="userStatusModal"  role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    //     <div class="modal-dialog">
    //        <div class="modal-content">
    //           <div class="modal-header">
    //              <h5 class="modal-title" id="exampleModalLongTitle">Status</h5>
    //           </div>

    //           <div class="modal-body"> 
    //             <div class="row"> 
    //                 <div class="col-sm-12">           
    //                 <div class="card">
    //                   <div class="card-body">
    //                     <h4 class="card-title">Select 2</h4>
    //                     <div class="form-group">
    //                       <label>Single select box using select 2</label>
    //                       <select id="statusoption" class="js-example-basic-single" style="width:100%">
    //                         <option value="AL">Alabama</option>
    //                         <option value="WY">Wyoming</option>
    //                         <option value="AM">America</option>
    //                         <option value="CA">Canada</option>
    //                         <option value="RU">Russia</option>
    //                       </select>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 </div> 
    //              </div> 
    //           </div>
    //           <div class="modal-footer">
    //              <button type="button" class="btn btn-secondary" id="statusCloseModal">Close</button>
    //              <button type="button" id="statusModalUpdate" class="btn btn-primary">Update</button>
    //           </div>
    //        </div>
    //     </div>
    //  </div>
    //  </div>`);

    // $("#userStatusModal").modal("show");

    // $('#statusoption').select2(
    //     {
    //         dropdownParent: $("#userStatusModal")
    //     }
    // );

    // $("#statusoption").on("change.select2",function(){
    //     //get value option
    //     var selectedValue = $('#statusoption').val();
    //     console.log(selectedValue);
    // });

    // });




    $(document).on("click", "#statusCloseModal", function() {
        $("#userStatusModal").modal('hide');
    });

    $(document).on("click", "#panClose", function() {
        $("#userStatusModal").modal('hide');
    });

    // $(document).on("click", ".resetPassword-btn", function() {
    //     //get id
    //     var id = $(this).attr("data-id");
    //     var row = $(this).closest("tr");

    //     $.ajax({
    //         url: "api/user-reset-password",
    //         type: "POST",
    //         dataType: "json",
    //         data: {
    //             id: id,
    //           },
    //           success: (data) => {
    //           },

    //     });
    // });

    $(document).on("click", ".archive-btn", function(e) {
        // get data attribute
        var id = $(this).attr("data-id");
        var row = $(this).closest("tr");

        swal.fire({
                title: "Are you sure you want to delete this?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "api/delete-user-record",
                        type: "POST",
                        dataType: "json",
                        data: {
                            id: id,
                        },
                        success: (data) => {
                            if (data.status == 1) {
                                swal.fire("Success fully Deleted!");
                                row.remove();
                            } else if (data.status == 0) {
                                swal.fire("Faild to delete", "", "error");
                            }
                        },
                    });
                } else if (result.isDenied) {
                    swal.fire("Changes are not saved", "", "info");
                }
            });
    });


    $(document).on("click", ".edit-btn", function() {

        var row = $(this).closest("tr");
        var id = $(this).attr("data-id");

        $.ajax({
            url: "api/get-input-value",
            type: "POST",
            dataType: "json",
            data: {
                id: id,
            },
            success: (data) => {
                var username = data[0].username;
                $("#editAdminusername").val(username);
            },
        });

        var rowIndex = row.index();
        var rowData = [];
        row.find("td").each(function() {
            rowData.push($(this).text());
        });


        $("#userEditModal").modal({
            backdrop: 'static',
            keyboard: false
        });

        $("#userEditModal").modal("show");


        $("#editUpdate").attr({
            'data-id': id,
            'data-positionrow': rowIndex
        });

    });


    $(document).on("click", "#editCloseForm", function() {
        $("#userEditModal").modal("hide");
    });


    $(document).off("click", "#editUpdate").on("click", "#editUpdate", function() {
        var id = $(this).attr("data-id");
        var positionrow = $(this).attr("data-positionrow");
       
        var editInputusername = $("#editAdminusername").val();

        $.ajax({
            url: "api/update-data",
            type: "POST",
            dataType: "json",
            data: {
                id: id,
                username: editInputusername,
            },
            success: (data) => {
                $("#userEditModal").modal("hide");
                if (data.status == 1) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Saved',
                        showConfirmButton: false,
                        timer: 1500,
                        didClose: () => {
                            page('/user-management');
                        }
                    });

                } else if (data.status == 0) {
                    Swal.fire({
                        title: "No record has been edited. Do you still want to edit this form?",
                        showDenyButton: true,
                        confirmButtonText: "Yes",
                    })
                }
            },
        });
    });

    $(document).on("click", "#editCloseForm", function() {
        $("#userEditModal").modal("hide");

    });

    $(document).on("click", "#addUser-btn", function() {
          $("#addModalUser").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#addModalUser").modal("show");
    });

    $(document).on("click", "#AddUserCloseForm", function() {
        $('#addModalUser').modal('hide');
    });

    $(document).off("click", "#addData-btn").on("click", "#addData-btn", function() {
        var inputEmail = $("#adminemail").val();
        var inputUsernmae = $("#addUsername").val();
        var inputPassword = $("#addpassword").val();
        var contactno = $("#contact").val();

        $.ajax({
            url: "api/add-user",
            type: "POST",
            dataType: "json",
            data: {
                email: inputEmail,
                username: inputUsernmae,
                password: inputPassword,
                contacts: contactno,
            },
            success: (data) => {
                if (data.result == 0) {
                    $("#addModalUser").modal("hide");
                    swal.fire({
                        title: 'Good job!',
                        text: data.text,
                        icon: 'success',
                        didClose: () => {
                            page("/user-management");
                        }
                    });
                } else if (data.result == 1) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.text
                    })

                } else if (data.result == 2) {
                    swal.fire(
                        'Good job!',
                        data.text,
                        'success'
                    )

                } else if (data.result == 3) {
                    swal.fire(
                        'Good job!',
                        data.text,
                        'success'
                    )

                } else if (data.result == 4) {
                    swal.fire(
                        'Good job!',
                        data.text,
                        'success'
                    )

                }

            }
        });
    });

});