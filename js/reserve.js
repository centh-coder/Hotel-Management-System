var dataTable;

page('/reserve', (e) => {

    const reserve = `
    <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body" id="containerReserve">
            <p class="card-description">
            </p>
            
            <div class="table-responsive">
            <table id="reserveguestroomTable" class="table">
                <thead>
                <tr>
                    <th>Name:</th>
                    <th>Booking Status:</th>
                    <th>Room:</th>
                    <th>Room Price:</th>
                    <th>Adults:</th>
                    <th>Extra Pax:</th>
                    <th>Check in:</th>
                    <th>Check out:</th>
                    <th>Days:</th>
                    <th>Total Price:</th>
                    <th>Options:</th>
                    
                </tr>
                </thead>
                <tbody id="TableBodyReserveguestroom">
                </tbody>
            </table>
            </div>
        </div>
        </div>
        </div>
        </div>



        <div class="modal fade" id="viewAllEditModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="viewAllEditModalviewAll">Please edit the form</h5>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-sm-12">
                              <form>
                                  <div class="form-group">
                                      <label>Status booking:</label>
                                      <input type="text" class="form-control" id="editStatusBookingStatus" placeholder="status">
                                  </div>  
                                  <div class="form-group">
                                      <label for="price">Price:</label>
                                      <input type="text" class="form-control" id="editServeRoomPrice" placeholder="Price">
                                  </div>      
                                  <div class="form-group">
                                      <label>Adults:</label>
                                      <input type="text" class="form-control" id="editAdultsedit" placeholder="Adults">
                                  </div>  
                                  <div class="form-group">
                                      <label>Extra Pax:</label>
                                      <input type="text" class="form-control" id="editExtrapaxedit" placeholder="Extra Pax">
                                  </div>    
                                  <div class="form-group">
                                      <label>Payment Type</label>
                                      <select style="width: 100%" id="editPaymentStatusedit" class="form-control select2">
                                          <option value="paid">Paid</option>
                                          <option value="unpaid">Unpaid</option>
                                      </select>
                                  </div>                  
                              </form>
                          </div>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" id="editCloseForm">Close</button>
                      <button type="button" id="editViewAllUpdate"  class="btn btn-primary">Update</button>
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
      $("#subContentCapstone" ).append(reserve);
      
      }else if(data.roles == 1) {
        //manager
      mainContainerApp(manager_app_main_template);
      $("#subManagerContentCapstone").empty();
      $("#subManagerContentCapstone" ).append(reserve);
      }else if(data.roles == 2) {
      //frontdesk
      mainContainerApp(frontdesk_app_main_template);
      $("#subfrontdeskContentCapstone").empty();
      $("#subfrontdeskContentCapstone" ).append(reserve);
      }else if(data.roles == 3) {
        //housekeeeper
        mainContainerApp(housekeeper_app_main_template);
        $("#subHousekeeperContentCapstone").empty();
        $("#subHousekeeperContentCapstone" ).append(reserve);
    }



  $("#menuDashboard").removeClass('active');
  $("#menuUsers").removeClass('active');
  $("#rooms").removeClass('active');
  $("#roomStatus").removeClass('active');
  $("#guest").removeClass('active');
  $("#menuUsersAccountSetting").removeClass('active');
  $("#reserve").addClass('active');
  $("#housekeep").removeClass('active');
$("#housekeeping").removeClass('active');

        
     }
  });

  function number_format (number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}


  $.ajax({
      url: "api/getRoomguest-data",
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
          console.log("okay");
      }else if(data.login == 1){
          $.each(data.userData, function(index, value) {

            $roomcurrencyString = number_format(value.room_price, 2, '.', ',');
            $ttlcurrencyString = number_format(value.total_price, 2, '.', ',');

              var row = `<tr>
              <td>${value.name}</td>
              <td>${value.status_booking}</td>
              <td>${value.room_name}</td>
              <td>${$roomcurrencyString}</td>
              <td>${value.adult}</td>
              <td>${value.extra_pax}</td>
              <td>${value.checkin}</td>
              <td>${value.checkout}</td>
              <td>${value.days}</td>
              <td>${$ttlcurrencyString}</td>
              <td>
              <button type="button" data-id="${value.id}" class="btn btn-warning edit-viewAll-guest-btn">Edit</button>
              <button type="button" data-id="${value.id}" class="btn btn-danger delete-guest-reserveRoom">Remove</button>
              </td>
              </tr>`;

              $("#TableBodyReserveguestroom").prepend(row);
          });

          if ($.fn.DataTable.isDataTable("#reserveguestroomTable")) {
            $("#reserveguestroomTable").DataTable().destroy();
        }

          dataTable = $("#reserveguestroomTable").DataTable({
              dom: 'Bfrtip',
              buttons: [
                  'csv', 'excel', 'pdf', 'print',
                  // {
                  //     text: 'Add Guest Reservation',
                  //     attr: { id: 'addGuestReserveRoomData-btn' },
                  // }
              ]
          });
       } 
     //  else {
    //     dataTable.clear().rows.add(data.userData).draw();
     //}

      
          }  
  });


  $(document).on("click", "#addGuestReserveRoomData-btn", function() {
    console.log("addReservationGuest-btn");
    $("#containerReserve").empty();     

    $("#containerReserve").append(`

        <div class="card-body" id="containerReserveData">
            <p class="card-description"></p>
          <div class="container">
            <div class="row">
            <div class="col-md-6">
            <form>
                <div class="form-group">
                <label>Name</label>
                        <select style="width: 50%" id="reservationnameoption">
                        <option></option>
                        </select>
                </div>
               
                <div class="form-group">
                <label>Status</label>
                <select style="width: 50%" id="roomstatusdropdown">
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
                <option value="Reserve">Reserve</option>
                <option value="Book">Book</option>
                </select>
              </div>

              <div class="form-group">
              <label>Room</label>
                      <select style="width: 50%" id="roomReservationOption">
                      </select>
              </div>
                
                <div class="form-group">
                <label>Price</label>
                    <input type="text" class="form-control" id="serveRoomPrice" placeholder="Price"  disabled>
                </div>


                <div class="form-group">
                    <label for="numericInput">Adults:</label>
                    <select class="form-control" id="serveAdult">
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="numericInput">Extra Pax:</label>
                    <select class="form-control" id="extrapax">               
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                </div>

                <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
            <div class="form-group">
                <label>Mobile Number</label>
                <input type="tel" class="form-control" id="inputMobile" placeholder="Mobile Number">
            </div>
            <div class="form-group">
                <label>Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="Address">
            </div>
            </form>
            </div>

            <div class="col-md-6">
            <form>
            <div class="form-group">
                <label>City</label>
                <input type="text" class="form-control" id="inputCity" placeholder="City">
            </div>

            <div class="form-group">
                <label>Post Code</label>
                <input type="text" class="form-control" id="inputPostCode" placeholder="Post Code">
            </div>

            <div class="form-group">
                <label>Country</label>
                <input type="text" class="form-control" id="inputCountry" placeholder="Country">
            </div>

            <div class="form-group">
                <label>Payment Type</label>
                <select style="width: 100%" id="inputPaymentType" class="form-control select2">
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>
            </div>



            <div class="form-group">
                <label>Notes</label>
                <textarea class="form-control" id="inputNotes" placeholder="Notes"></textarea>
            </div>



            <div class="form-group">
                 <label for="numericDateTimeInput">Date:</label>
                   <input type="text" name="daterange" class="form-control" id="reservationCheckin" aria-label="Recipient's pax" aria-describedby="basic-addon2">
                   <div class="btn btn-primary"">
                      <button type="button" id="date-btn" class="btn btn-primary">Calculate Total</button>
                   </div>
                 </div>

                <div class="form-group">
                <label>Total</label>
                    <input type="text" class="form-control" id="reservationTotal" placeholder="Price" aria-label="Recipient's price" aria-describedby="basic-addon2" disabled>
                </div>

                <button type="button" id="bookReservation" class="btn btn-primary mb-2">Book</button>
            </form>
            </div>
            </div>
        </div>
      </div>
    </div>

  



    `);

    $('#inputPaymentType').select2({
      placeholder: "Select Payment Type",
      allowClear: true
  });
  
  $.ajax({
    
    url: "api/get-reservationData",
    type: "GET",
    dataType: "json",
      success: (data) => {
        $('#reservationnameoption').empty();
        if(data.login == 0) {
          page('/login');
        }else if(data.login == 1) {
          $("#reservationnameoption").append(`<option></option>`);
          $.each(data.userData, function(index, value) {
                $("#reservationnameoption").append(`<option value="${value.id}">${value.full_name}</option>`);
          }); 
        }
      }, 
  });



  $('#reservationnameoption').select2({
    placeholder: "Select Guest Name",
    allowClear: true
  });
$('#reservationnameoption').on('select2:select', function (e) {
  $('#bookReservation').hide();

  });

$("#roomstatusdropdown").select2({});
$('#bookReservation').hide();

$('#reservationCheckin').daterangepicker({
  opens: 'left'
}, function(start, end, label) {
  console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  $('#bookReservation').hide();
});

$.ajax({
  url: "api/getReservationRoomData",
  type: "GET",
  dataType: "json",
    success: (data) => {
      if(data.login == 0) {
        page('/login');
      }else if(data.login == 1) {
        $('#roomReservationOption').empty();
        $("#roomReservationOption").append(`<option></option>`);
        $.each(data.userData, function(index, value) {
              $("#roomReservationOption").append(`<option data-price="${value.price}" value="${value.id}">Room - ${value.room_no}</option>`);
        });
      }
    }, 
});

$('#roomReservationOption').select2({
  placeholder: "Select Room",
  allowClear: true
});
$('#roomReservationOption').on('select2:select', function (e) {
  $('#bookReservation').hide();
   var priceroom = e.params.data.element.attributes[0].value;
  $('#serveRoomPrice').val(priceroom);

  });
});

$(document).on("click", "#date-btn", function() {
  
var getstartDate = $('#reservationCheckin').data('daterangepicker').startDate;
var getendDate = $('#reservationCheckin').data('daterangepicker').endDate;
var startDate = new Date(getstartDate.format('YYYY-MM-DD'));
var endDate = new Date(getendDate.format('YYYY-MM-DD'));  

var timeDifference = endDate.getTime() - startDate.getTime();
var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

console.log(daysDifference);
var getRoomPrice = $("#roomReservationOption").select2().find(":selected").data("price");
var numberOfAdults = document.getElementById('serveAdult').value;
var numberOfExtraPax = document.getElementById('extrapax').value;
var extra_price_per_head = 500;
var priceroom = $('#serveRoomPrice').val();
var calculateAll = extra_price_per_head * priceroom * daysDifference;
 var formattedValue = calculateAll.toFixed(2);

  $('#reservationTotal').val(formattedValue);

  $('#bookReservation').show();
});

$(document).off("click", "#bookReservation").on("click", "#bookReservation", function() {
 var roomName = $("#roomReservationOption").select2().find(":selected").text();
 console.log(roomName);
 
 var getstartDate = $('#reservationCheckin').data('daterangepicker').startDate;
 var getendDate = $('#reservationCheckin').data('daterangepicker').endDate;

var startDate = new Date(getstartDate.format('YYYY-MM-DD'));
var endDate = new Date(getendDate.format('YYYY-MM-DD'));  

var timeDifference = endDate.getTime() - startDate.getTime();
var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

 var checkin = getstartDate.format('YYYY-MM-DD');
 var checkout = getendDate.format('YYYY-MM-DD');  
 
 var adults = $("#serveAdult").val();
 var statusbooking = $("#roomstatusdropdown").val();
 var extrapax = $("#extrapax").val();
 var totalPrice = $("#reservationTotal").val();
 var guestId = $("#reservationnameoption").select2().find(":selected").val();
 var guestName = $("#reservationnameoption").select2().find(":selected").text();
 var roomPrice = $('#roomReservationOption').select2().find(":selected").data('price');
 var emailInput = $("#inputEmail").val();
 var addressInput = $("#inputAddress").val();
 var mobileInput = $("#inputMobile").val();
 var cityInput = $("#inputCity").val();
 var postcodeInput = $("#inputPostCode").val();
 var countryInput = $("#inputCountry").val();
 var paymentInput = $("#inputPaymentType").val();
 var noteInput = $("#inputNotes").val();
 console.log(roomPrice);

 $.ajax({
  url: "api/submitBookingData",
  type: "POST",
  dataType: "json",
    data: {
        roomName: roomName, 
        checkin: checkin,
        checkout: checkout,
        adults: adults,
        statusbooking: statusbooking,
        extrapax: extrapax,
        totalPrice: totalPrice,
        guestId: guestId,
        guestName: guestName,
        roomPrice: roomPrice,
        daysDifference: daysDifference,
        emailInput: emailInput,
        addressInput: addressInput,
        mobileInput: mobileInput,
        cityInput: cityInput,
        postcodeInput: postcodeInput,
        countryInput: countryInput,
        paymentInput: paymentInput,
        noteInput: noteInput,
    },
    
    success: (data) => {
      console.log(data);
      if (data.status == 1){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Booked",
          showConfirmButton: false,
          timer: 1500
        });
        page('/reserve');
      }else if(data.status == 0) {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      }
  },
  
 });

});



$(document).on("click", ".viewAll-guest-btn", function(e) {
  $("#viewAllReservation").modal("dispose");
  $("#viewAllReservation").remove();
  
  $("#subContentCapstone").append(`
    <div class="modal fade" id="viewAllReservation">
      <div class="modal-dialog modal-lg"> <!-- Added modal-lg class for large modal -->
        <div class="modal-content">
          <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
            <div class="table-responsive">
              <table class="table table-bordered" id="ViewAllData"> <!-- Added table-bordered class for borders -->
                <thead>
                  <tr>
                  <th>Name:</th>
                  <th>Booking Status:</th>
                  <th>Room:</th>
                  <th>Room Price:</th>
                  <th>Adults:</th>
                  <th>Extra Pax:</th>
                  <th>Check in:</th>
                  <th>Check out:</th>
                  <th>Days:</th>
                  <th>Total Price:</th>
                  <th>Email:</th>
                  <th>Address:</th>
                  <th>Mobile no.:</th>
                  <th>City:</th>
                  <th>Post Code:</th>
                  <th>Country:</th>
                  <th>Payment type:</th>
                  <th>Notes:</th>
                  </tr>
                </thead>
                <tbody id="TableBodyViewAllReserveguestroom">
                  <!-- Populate table rows dynamically using JavaScript -->
                </tbody>
              </table>
              </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <!-- Add footer content as needed -->
          </div>

        </div>
      </div>
    </div>`);

  $("#viewAllReservation").modal("show");

  $.ajax({
    url: "api/getViewAllData",
    type: "GET",
    dataType: "json",
    success: function(data) {
        if (data.login == 1) {
            if (!$.fn.DataTable.isDataTable('#ViewAllData')) {
                dataTable = $("#ViewAllData").DataTable({
                    dom: 'Bfrtip',
                    buttons: []
                });
            }
            dataTable.clear().draw();
            $.each(data.userData, function(index, value) {
                var row = `<tr>
                    <td>${value.name}</td>
                    <td>${value.status_booking}</td>
                    <td>${value.room_name}</td>
                    <td>${value.room_price}</td>
                    <td>${value.adult}</td>
                    <td>${value.extra_pax}</td>
                    <td>${value.checkin}</td>
                    <td>${value.checkout}</td>           
                    <td>${value.days}</td>
                    <td>${value.total_price}</td>
                    <td>${value.email}</td>
                    <td>${value.address}</td>
                    <td>${value.mobile_no}</td>
                    <td>${value.city}</td>
                    <td>${value.post_code}</td>
                    <td>${value.country}</td>
                    <td>${value.payment_type}</td>
                    <td>${value.note}</td>
                </tr>`;
                dataTable.row.add($(row)).draw();
            });
        }
    },
});


});

$(document).on("click", ".edit-viewAll-guest-btn", function() {
  var row = $(this).closest("tr");
  var id = $(this).attr("data-id");
  var rowIndex = row.index();

  $.ajax({
      url: "api/get-viewAll-guest-btn",
      type: "POST",
      dataType: "json",
      data: {
          id: id,
      },
      success: function(data) {
          // var username = data[0].username;

          // $("#editAdminusername").val(username);

           // <button type="button" id="editViewAllUpdate" data-id="${id}" data-positionrow="${rowIndex}" class="btn btn-primary">Update</button> 
              
              $('#editViewAllUpdate').attr({
                  'data-id': id,
                  'data-positionrow': rowIndex
              });

        $('#viewAllEditModal').modal('show');

      },
      error: function(xhr, status, error) {
          console.error(error);
      }
  });



  
});


$(document).on('click','#editCloseForm',function(){

  $('#viewAllEditModal').modal('hide');

});


$('#editPaymentStatusedit').select2({
  placeholder: "Select Payment Status",
  allowClear: true
});

$(document).on("click", "#editViewAllUpdate", function() {
  console.log("update view all");
  var id = $(this).attr("data-id");
  var positionrow = $(this).attr("data-positionrow");
  var bookingStatus = $("#editStatusBookingStatus").val();
  var roomPrice = $("#editServeRoomPrice").val();
  var adult = $("#editAdultsedit").val();
  var extraPax = $("#editExtrapaxedit").val();
  var paymentStatus = $("#editPaymentStatusedit").val();

  $.ajax({
    url: "api/update-viewAll-Data",
    type: "POST",
    dataType: "json",
        data: {
            id: id,
            bookingStatus: bookingStatus,
            roomPrice: roomPrice,
            adult:adult,
            extraPax: extraPax,
            paymentStatus: paymentStatus,
        },
        success: (data) => {
          console.log(data);
          if(data.status == 1) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Saved',
                showConfirmButton: false,
                timer: 1500
              })


              $("#viewAllEditModal").modal("hide");
              page('/reserve');

        }else if(data.status == 0) {
                Swal.fire({
                    title:
                      "No record has been edited. Do you still want to edit this form?",
                    showDenyButton: true,
                    confirmButtonText: "Yes",
                  })
        }

        },
        });
});


$(document).on("click", ".delete-guest-reserveRoom", function() {
  var id = $(this).attr("data-id");
  var row = $(this).closest("tr");

  swal.fire({
    title: "Are you sure you want to delete this record?",
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
  }) .then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "api/delete-guest-reservation-record",
        type: "POST",
        dataType: "json",
        data: {
          id: id,
        },
        success: (data) => {
            console.log(data);
            if(data.success) {
                swal.fire("Success fully Deleted!");
                row.remove();
            }else {
                swal.fire("Faild to delete", "", "error");
            }
        },
      });
    } 
  });

});

});