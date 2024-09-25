page('/guest', (e) => {

    const guests = `
    <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body">
        <h3 class="card-title">Guest Record</h3>
            <p class="card-description">
            </p>
            <div class="table-responsive">
            <table id="guestTable" class="table">
                <thead>
                <tr>
                    
                    <th>Full name:</th>
                    <th>Email:</th>
                    <th>Address:</th>
                    <th>City:</th>
                    <th>Country:</th>
                    <th>Zip Code:</th>
                    <th>Contact no:</th>
                    <th>Options:</th>
                    
                </tr>
                </thead>
                <tbody id="TableBodyguest">
                </tbody>
            </table>
            </div>
        </div>
        </div>
        </div>
        </div>


<div class="modal fade" id="addModalGuest" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
         </div>
         <div class="modal-body">
            <div class="row">
               <div class="col-sm-12">
                  <form>
                        <div class="form-group">
                            <label >Fullname:</label>
                            <input style="background:white;" autocomplete="off" type="name" class="form-control" id="addGuestfname" name="Fullname">
                        </div>

                        <div class="form-group">
                            <label >Address:</label>
                            <input style="background:white;" autocomplete="off" type="address" class="form-control" id="addGuestAddress" name="address">
                        </div>

                        <div class="form-group">
                            <label >City:</label>
                            <input style="background:white;" autocomplete="off" type="address" class="form-control" id="addGuestCity" name="city">
                        </div>

                        <div class="form-group">
                            <label >Country:</label>
                            <input style="background:white;" autocomplete="off" type="address" class="form-control" id="addGuestCountry" name="country">
                        </div>

                        <div class="form-group">
                            <label >Zip Code:</label>
                            <input style="background:white;" autocomplete="off" type="address" class="form-control" id="addGuestCode" name="zip code">
                        </div>

                        <div class="form-group">
                            <label >Contact no:</label>
                            <input style="background:white;" autocomplete="off" type="tel" class="form-control" id="addGuestContactNo" name="coontact">
                        </div>

                        <div class="form-group">
                            <label >Email:</label>
                            <input style="background:white;" autocomplete="off" type="email" class="form-control" id="addGuestEmail" name="email">
                        </div>
                  </form>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="AddGuestCloseForm">Close</button>
            <button type="button" id="addGuestData-btn" class="btn btn-primary">Add</button>
         </div>
      </div>
   </div>
</div>
</div>



<div class="modal fade" id="editGuestModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
       <div class="modal-content">
          <div class="modal-header">
             <h5 class="modal-title" id="editguestbtnedit">Please edit the form</h5>
          </div>
 
          <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <form>
                            <div class="form-group">
                                <label for="username">Email:</label>
                                <input style="background:white;" type="text" class="form-control" id="editguestemail" name="email">
                            </div>  
                            <div class="form-group">
                                <label for="username">Name:</label>
                                <input style="background:white;" type="text" class="form-control" id="editguestname" name="name"
                            </div>
                            <div class="form-group">
                                <label for="username">Address:</label>
                                <input style="background:white;" type="text" class="form-control" id="editguestaddress" name="address">
                            </div> 
                            <div class="form-group">
                            <label for="username">City:</label>
                            <input style="background:white;" type="text" class="form-control" id="editguestcity" name="city">
                        </div>
                        <div class="form-group">
                        <label for="username">Country:</label>
                        <input style="background:white;" type="text" class="form-control" id="editguestcountry" name="country">
                    </div> 
                            <div class="form-group">
                            <label for="username">Zip Code:</label>
                            <input style="background:white;" type="text" class="form-control" id="editguestcode" name="Zip code">
                        </div> 
                            <div class="form-group">
                                <label for="username">Contact no:</label>
                                <input style="background:white;" type="text" class="form-control" id="editguestcontact" name="contact">
                            </div> 

                        </form>
                    </div>
                </div>
          </div>
          <div class="modal-footer">
             <button type="button" class="btn btn-secondary" id="guestEditCloseForm">Close</button>
             <button type="button" id="editGuestUpdate" class="btn btn-primary">Update</button>
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
      $("#subContentCapstone" ).append(guests);
      
      }else if(data.roles == 1) {
     
      mainContainerApp(manager_app_main_template);
      $("#subManagerContentCapstone").empty();
      $("#subManagerContentCapstone" ).append(guests);
      }else if(data.roles == 2) {
     
      mainContainerApp(frontdesk_app_main_template);
      $("#subfrontdeskContentCapstone").empty();
      $("#subfrontdeskContentCapstone" ).append(guests);
      }else if(data.roles == 3) {
        //housekeeeper
        mainContainerApp(housekeeper_app_main_template);
        $("#subHousekeeperContentCapstone").empty();
        $("#subHousekeeperContentCapstone" ).append(guests);
        }


$("#menuUsers").removeClass('active');
$("#rooms").removeClass('active');
$("#reserve").removeClass('active');
$("#menuUsersAccountSetting").removeClass('active');
$("#reserve").removeClass('active');
$("#menuDashboard").removeClass('active');
$("#housekeep").removeClass('active');
$("#housekeeping").removeClass('active');
$("#guest").addClass('active');


      
     }
  });


var dataTableGuest;

$.ajax({
    url: "api/get-data-guest",
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
    success: (data) => {
        setTimeout(() => {
            Swal.close();
          }, 1000);
        if(data.login == 0){
        }else if(data.login == 1){
            $.each(data.userData, function(index, value) {

                var row = `<tr>
                <td>${value.full_name}</td>
                <td>${value.email}</td>
                <td>${value.address}</td>
                <td>${value.city}</td>
                <td>${value.country}</td>
                <td>${value.post}</td>
                <td>${value.contact_no}</td>
                <td>
                <button type="button" data-id="${value.id}" class="btn btn-warning edit-guest-btn">Edit</button>
                <button type="button" data-id="${value.id}" class="btn btn-danger delete-guest-btn">Archive</button>
                </td>
                </tr>`;

                $("#TableBodyguest").prepend(row);
            });

            if ($.fn.DataTable.isDataTable("#guestTable")) {
                $("#guestTable").DataTable().destroy();
            }

            dataTableGuest = $("#guestTable").DataTable({
                dom: 'Bfrtip',
                ordering: false,
                buttons: [
                    'csv', 'excel', 'pdf', 'print',
                    {
                        text: 'Add Guest',
                        attr: { id: 'addGuest-btn' },
                    }
                ]
            });
        }
        }  
});


$(document).on("click", "#addGuest-btn", function() {
    $("#addModalGuest").modal({
                      backdrop: 'static',
                      keyboard: false
              });

 $("#addModalGuest").modal("show");

});

$(document).on("click", "#AddGuestCloseForm", function() {
    $('#addModalGuest').modal('hide');
});


var eventFiredAddGuestData = false;
$(document).off("click", "#addGuestData-btn").on("click", "#addGuestData-btn", function() {

    if(!eventFiredAddGuestData){
        eventFiredAddGuestData = true;

    var inputGuestFname = $("#addGuestfname").val();
    var inputGuestAddress = $("#addGuestAddress").val();
    var inputGuestCity = $("#addGuestCity").val();
    var inputGuestCountry = $("#addGuestCountry").val();
    var inputGuestCode = $("#addGuestCode").val();
    var inputGuestContactno = $("#addGuestContactNo").val();
    var inputGuestEmail = $("#addGuestEmail").val();

    $.ajax({
    url: "api/add-guest",
    type: "POST",
    dataType: "json",
    data: {
        fullname: inputGuestFname,
        address: inputGuestAddress,
        city: inputGuestCity,
        country: inputGuestCountry,
        code: inputGuestCode,
        contact: inputGuestContactno,
        email: inputGuestEmail,
    },
    success: (data) => {
        if (data.results == 1){
        
             $('#addModalGuest').modal('hide');

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "successfully added",
                showConfirmButton: false,
                timer: 1500, 
                didClose: () => {
                    page('/guest');
                }
            });



        }else if(data.results ==0){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
        }
    }
    });

}

});



$(document).off("click", ".edit-guest-btn").on("click", ".edit-guest-btn", function() {
    console.log("gana Edit");
    var row = $(this).closest("tr");
    var id = $(this).attr("data-id");

    $.ajax({
        url: "api/get-guestinputvalue",
        type: "POST",
        dataType: "json",
            data: {
                id: id,
            },
            success: (data) => {
            console.log(data);
            var email = data[0].email;
            var name = data[0].full_name;
            var address = data[0].address;
            var city = data[0].city;
            var country = data[0].country;
            var zip = data[0].post;
            var contactno = data[0].contact_no;
            
            $("#editguestemail").val(email);
            $("#editguestname").val(name);
            $("#editguestaddress").val(address);
            $("#editguestcity").val(city);
            $("#editguestcountry").val(country);
            $("#editguestcode").val(zip);
            $("#editguestcontact").val(contactno);
            },
    });


    var rowIndex = row.index();
    var rowData = [];

    row.find("td").each(function () {
      rowData.push($(this).text());
    });

    $('#editGuestUpdate').attr({
        'data-id':id,
        'data-positionrow':rowIndex
    });
    $("#editGuestModal").modal("show");


});

$(document).off("click", "#editGuestUpdate").on("click", "#editGuestUpdate", function() {
    var id = $(this).attr("data-id");
    var positionrow = $(this).attr("data-positionrow");

    var email = $("#editguestemail").val();
    var name = $("#editguestname").val();
    var address = $("#editguestaddress").val();
    var city = $("#editguestcity").val();
    var country = $("#editguestcountry").val();
    var code = $("#editguestcode").val();
    var contact = $("#editguestcontact").val();

    $.ajax({
        url: "api/updateGuest-data",
        type: "POST",
        dataType: "json",
            data: {
                id: id,
                email: email,
                name: name,
                address: address,
                city: city,
                country: country,
                code: code,
                contact: contact,
            },
            success: (data) => {
                console.log(data);
                $("#editGuestModal").modal("hide");
                if(data.status == 1) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Saved',
                        showConfirmButton: false,
                        timer: 1500,
                        didClose: () => {
                            page('/guest');
                        }
                    });
                      
                }else if (data.status == 0) {
                    Swal.fire({
                        title: "No record has been edited. Do you still want to edit this form?",
                        showDenyButton: true,
                        confirmButtonText: "Yes",
                    })
                }
            },               
    });
});

$(document).on("click", "#guestEditCloseForm", function() {
    $("#editGuestModal").modal("hide");

});

$(document).off("click", ".delete-guest-btn").on("click", ".delete-guest-btn", function() {
    console.log("gana");
    var id = $(this).attr("data-id");
    var row = $(this).closest("tr"); // Get the closest row

    $.ajax({
        url: "api/archive-guest", 
        type: "POST",
        dataType: "json",
        data: {
            id: id,
        },
        success: function(data) {
            console.log(data);
            if (data.success) {
                page('/guest');
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
});

});
