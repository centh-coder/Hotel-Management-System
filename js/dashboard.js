const app_main_template = (data) => `
<div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
data-sidebar-position="fixed" data-header-position="fixed">
<!-- Sidebar Start -->
<aside class="left-sidebar">
  <!-- Sidebar scroll-->
  <div>

  
<div class="brand-logo d-flex align-items-center justify-content-between">
    <span class="ml-2" style="font-size: 20px;">Admin</span>
</div>


    <!-- Sidebar navigation-->
    <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
      <ul id="sidebarnav">
        <li class="sidebar-item" id="menuDashboard">
          <a class="sidebar-link" href="http://localhost/capstone/dashboard" aria-expanded="false">
            <span>
              <i class="ti ti-layout-dashboard"></i>
            </span>
            <span class="hide-menu">Dashboard</span>
          </a>
        </li>
      </li>
        <li class="sidebar-item" id="menuUsers">
        <a class="sidebar-link" href="http://localhost/capstone/user-management" aria-expanded="false">
          <span>
            <i class="ti ti-users"></i>
          </span>
          <span class="hide-menu">Users</span>
        </a>
      </li>

      <li class="sidebar-item" id="rooms">
        <a class="sidebar-link" href="http://localhost/capstone/room" aria-expanded="false">
          <span>
            <i class="ti ti-users"></i>
          </span>
          <span class="hide-menu">Rooms</span>
        </a>
      </li>

      <li class="sidebar-item" id="reserve">
        <a class="sidebar-link" href="http://localhost/capstone/reserve" aria-expanded="false">
          <span>
            <i class="ti ti-users"></i>
          </span>
           <span class="hide-menu">Reservation</span>
        </a>
      </li>

      <li class="sidebar-item" id="billing">
        <a class="sidebar-link" href="http://localhost/capstone/billing" aria-expanded="false">
          <span>
            <i class="ti ti-users"></i>
          </span>
          <span class="hide-menu">Billing</span>
        </a>
      </li>

      <li class="sidebar-item" id="guest">
        <a class="sidebar-link" href="http://localhost/capstone/guest" aria-expanded="false">
          <span>
            <i class="ti ti-users"></i>
          </span>
          <span class="hide-menu">Guests</span>
        </a>
      </li>

      <li class="sidebar-item" id="housekeep">
      <a class="sidebar-link" href="http://localhost/capstone/housekeeper-task" aria-expanded="false">
        <span>
          <i class="ti ti-users"></i>
        </span>
        <span class="hide-menu">House Keeper Schedule</span>
      </a>
      </li>

      <li class="sidebar-item" id="archiveGuest">
      <a class="sidebar-link" href="http://localhost/capstone/archive" aria-expanded="false">
        <span>
          <i class="ti ti-users"></i>
        </span>
        <span class="hide-menu">Archive</span>
      </a>
    </li>

      <li class="sidebar-item" id="menuUsersAccountSetting">
      <a class="sidebar-link" href="http://localhost/capstone/account-settings" aria-expanded="false">
        <span>
          <i class="ti ti-settings"></i>
        </span>
        <span class="hide-menu">Account Setting</span>
      </a>
    </li>
      </ul>
    </nav>
    <!-- End Sidebar navigation -->
  </div>
  <!-- End Sidebar scroll-->
</aside>
<!--  Sidebar End -->
<!--  Main wrapper -->
<div class="body-wrapper">
  <!--  Header Start -->
  <header class="app-header">
    <nav class="navbar navbar-expand-lg navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item d-block d-xl-none">
          <a class="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="javascript:void(0)">
            <i class="ti ti-menu-2"></i>
          </a>
        </li>
      </ul>
      <div class="navbar-collapse justify-content-end px-0" id="navbarNav">
        <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
        <h5 class="mb-0 font-weight-normal" id="profileUsername"></h5>
        
          <li class="nav-item dropdown">

            <a class="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
              <img id="profileImage" src="./src/assets/images/profile/user-1.jpg" alt="" width="35" height="35" class="rounded-circle">
            </a>

            <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
              <div class="message-body">
                <a href="http://localhost/capstone/logout" class="btn btn-outline-primary mx-3 mt-2 d-block" id="logout">Logout</a>
                <a href="http://localhost/capstone/archive" class="btn btn-outline-primary mx-3 mt-2 d-block" id="archive">Archive</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <!--  Header End -->
  <div class="container-fluid">
  <div id="subContentCapstone">
  </div>
</div>
</div>`;



const dashboard = (data) => `
<div class="container-fluid">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title fw-semibold mb-4">Search Room</h5>
            <div class="card">
                <div class="card-body">
                    <form>
                        <div class="mb-3">
                            <label for="dateRange" class="form-label">Date Range:</label>
                            <input type="text" class="form-control" id="dateRange" name="dateRange" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title fw-semibold mb-4">Available Rooms</h5>
                <div class="row" id="availableRoom">
                    
                
                </div>
              </div>

                </div>
</div>


<div class="modal fade" id="bookRoomModal" tabindex="-1" role="dialog" aria-labelledby="bookRoomModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="bookRoomModalLabel">Book Room</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <form>
                            <div class="mb-3">
                                <label for="room_name" class="form-label">Room Name</label>
                                <input type="text" class="form-control" id="room_name" name="room_name" required readonly>
                            </div>
                            <div class="mb-3">
                                <label for="checkin" class="form-label">Check-in Date</label>
                                <input type="date" class="form-control" id="checkin" name="checkin" required readonly>
                            </div>
                            <div class="mb-3">
                                <label for="checkout" class="form-label">Check-out Date</label>
                                <input type="date" class="form-control" id="checkout" name="checkout" required readonly>
                            </div>
                            <div class="mb-3">
                                <label for="adult" class="form-label">Number of Adults</label>
                                <input type="number" class="form-control" id="adult" name="adult" value="0" required>
                            </div>
                            <div class="mb-3">
                                <label for="extra_pax" class="form-label">Number of Extra Pax</label>
                                <input type="number" class="form-control" id="extra_pax" name="extra_pax" value="0" required>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <form >
                            <div class="mb-3">
                                <label for="status_booking" class="form-label">Booking Status</label>
                                <select class="form-select" id="status_booking" name="status_booking" required>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <!-- Add more options if needed -->
                                </select>
                            </div>
                            <div class="mb-3">
                            <label for="total_days" class="form-label">Total Days</label>
                            <input type="number" class="form-control" id="total_days" name="total_days" required readonly>
                            </div>

                            <div class="mb-3">
                                <label for="total_price" class="form-label">Total Price</label>
                                <input type="number" class="form-control" id="total_price" name="total_price" required readonly>
                            </div>

                              <div class="form-group">
                                  <label for="name" class="form-label">Guest Name</label>
                                  <div class="input-group">
                                      <select style="width: 100%" class="form-control" id="nameguest" name="nameguest" required>
                                          <option></option>
                                      </select>
                                  </div>
                              </div>

                            <div class="mb-3">
                                <label for="note" class="form-label">Note</label>
                                <textarea class="form-control" id="note" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" id="submitReservation" class="btn btn-primary" form="reservationForm">Submit Reservation</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="dashshowImageGuestRoom" tabindex="-1" role="dialog">
<div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Guest Room Images</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div id="guestRoomImages" class="container">
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
</div>

`;
$(document).on("click", "#submitReservation", function() {

var roomName = $('#room_name').val();
var checkinDate = $('#checkin').val();
var checkoutDate = $('#checkout').val();
var adultCount = $('#adult').val();
var extraPaxCount = $('#extra_pax').val();
var statusBooking = $('#status_booking').val();
var totalDays = $('#total_days').val();
var totalPrice = $('#total_price').val();
var note = $('#note').val();
var guestId = $("#nameguest").select2().find(":selected").val();
var guestName = $("#nameguest").select2().find(":selected").text();
var roomPrice = parseFloat($('#bookRoomModal').data('room-price'));


$.ajax({
  url: "api/submitBookingData",
  type: "POST",
  dataType: "json",
    data: {
        roomName: roomName, 
        checkin: checkinDate,
        checkout: checkoutDate,
        adults: adultCount,
        statusbooking: statusBooking,
        extrapax: extraPaxCount,
        totalPrice: totalPrice,
        guestId: guestId,
        guestName: guestName,
        roomPrice: roomPrice,
        daysDifference: totalDays,
        paymentInput: "cash",
        noteInput: note,
        guestId:guestId,
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
        page('/dashboard');
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

const mainContainerApp = (template) => {
  $("#main-container-capstone").html(template);

  $.ajax({
    url: "api/get-user-details",
    type: "GET",
    dataType: "json",

     success: (data) => {
      console.log(data);
      $('#profileUsername').text(data.username);   
      $("#profileImage").attr('src', data.files_path);
      
     }
  });

  $(document).on("click", "#logout", function () {
  window.location.href = "http://localhost/capstone/api/logout";       
});

};


page('/dashboard', (e) => {
    $.ajax({
        url: "api/get-user-role",
        type: "GET",
        dataType: "json",
        success: (data) => {
            let template, subContent;
            switch (data.roles) {
                case '0':
                    // Admin
                    template = app_main_template;
                    subContent = "#subContentCapstone";
                    break;
                case '1':
                    // Manager
                    template = manager_app_main_template;
                    subContent = "#subManagerContentCapstone";
                    break;
                case '2':
                    // Frontdesk
                    template = frontdesk_app_main_template;
                    subContent = "#subfrontdeskContentCapstone";
                    break;
                default:
                    console.error("Invalid role:", data.roles);
                    return;
            }
            mainContainerApp(template);
            $(subContent).empty().append(dashboard);
            initDateRangePicker(); // Call the function after appending the dashboard
            activateDashboardMenuItem();

        }
    });

  
  



});

let bookstartdate;
let bookenddate;

function initDateRangePicker() {
    $('#dateRange').daterangepicker({
        opens: 'left',
        minDate: moment(),
        // Your other options here
    }, function(start, end, label) {

      bookstartdate = start.format('YYYY-MM-DD');
      bookenddate = end.format('YYYY-MM-DD');
      
        Swal.fire({
    title: 'Searching for available rooms...',
    text: 'Please wait while we find the available rooms for the selected dates.',
    icon: 'info',
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    // timer: 10000, 
    // timerProgressBar: true,
    didOpen: () => {
        // Swal.showLoading();
        // const b = Swal.getHtmlContainer().querySelector('b');
        // timerInterval = setInterval(() => {
        //     b.textContent = Swal.getTimerLeft() / 1000;
        // }, 100);
    },
    willClose: () => {
    },
    willOpen: () => {
        // Send an AJAX request to check for available rooms
        $.ajax({
            url: 'api/search-rooms',
            method: 'POST',
            data: {
                start_date: start.format('YYYY-MM-DD'),
                end_date: end.format('YYYY-MM-DD')
            },
            success: function(response) {
              $('#availableRoom').empty();
var rooms = response;
$.each(rooms, function(index, room) {
  var imageString = room.gallery_images;
  var firstValue = ""; 

  if (imageString && imageString.trim() !== "") {
      firstValue = imageString.split(',')[0];
  }

  var roomCard = $('<div class="col-md-4"></div>');
  var cardHTML = `
      <h5 class="card-title fw-semibold mb-4">${room.name}</h5>
      <div class="card">
          <img src="${firstValue ? 'http://localhost/capstone/api/controller/' + firstValue : 'placeholder.jpg'}" class="card-img-top" style=" width: 100%;
    height: 300px; 
    object-fit: cover;" alt="Room Image">
          <div class="card-body">
              <h5 class="card-title">${room.room_type}</h5>
              <p class="card-text">Size: ${room.room_size}</p>
              <p class="card-text">Price: ₱${room.price}</p>
              <a class="btn btn-primary bookroom" data-price-room="${room.price}" data-number-person="${room.numberofperson}" data-room-id="${room.id}" data-room-name="${room.name}">Book Now</a>
              <a data-room-id="${room.id}" class="btn btn-primary viewgallery">View Gallery</a>
          </div>
      </div>
  `;
  roomCard.append(cardHTML);
  $('#availableRoom').append(roomCard);
});
                Swal.fire({
                    title: 'Available Rooms Found!',
                    text: 'Rooms are available for the selected dates.',
                    icon: 'success',
                    showConfirmButton: true
                });
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while searching for available rooms. Please try again later.',
                    icon: 'error',
                    showConfirmButton: true
                });
            }
        });
    }
});

    });

  }

$(document).on('click','.viewgallery',function(){
  const roomId = $(this).data('room-id');  
  var dynamicContent = $('#availableRoom').detach();
  dashshowGuestRoomImages(roomId,dynamicContent);
});

function dashshowGuestRoomImages(roomId,dynamicContent) {
  // Clear previous images
  $('#guestRoomImages').empty();

  // Fetch images from the server
  $.ajax({
      url: 'api/fetch-images',
      type: 'GET',
      dataType: "json",
      data: { roomId: roomId },
      success: function(response) {
          const images = response;
          console.log(response);
          const gallery = $('<div id="guestRoomGallery" class="row"></div>'); 

          images.forEach((image, index) => {
              const imgElement = `
                  <div class="col-md-4 mb-2">
                      <a href="http://localhost/capstone/api/controller/${image}" data-fancybox="gallery" class="gallery-item">
                          <img src="http://localhost/capstone/api/controller/${image}" alt="Guest Room Image" class="img-fluid fixed-size-img">
                      </a>
                  </div>`;
              gallery.append(imgElement);
          });

          $('#guestRoomImages').append(gallery);

          $('[data-fancybox="gallery"]').fancybox({
              buttons: [
                  'slideShow',
                  'share',
                  'zoom',
                  'fullScreen',
                  'close'
              ],
              loop: true,
              protect: false,
              afterClose: function() {
                  $('#dashshowImageGuestRoom').modal('hide');
                  $('body').removeClass('modal-open'); 
                  $('.modal-backdrop').remove(); 
                  $('body').css('overflow-y', 'auto');
                  $('#availableRoom').append(dynamicContent);

                  
                 
              }
          });

          $('#dashshowImageGuestRoom').modal('show');
      },
      error: function(xhr, status, error) {
          console.error('Error fetching images:', error);
      }
  });
}


$(document).on("click", ".bookroom", function () {
      
  var roomId = $(this).data('room-id');
  var roomName = $(this).data('room-name');
  var numberofperson = $(this).data('number-person');
  var priceroom = $(this).data('price-room');
  var startDate = $('#dateRange').data('daterangepicker').startDate.format('YYYY-MM-DD');
  var endDate = $('#dateRange').data('daterangepicker').endDate.format('YYYY-MM-DD');
  var numberOfDays = moment(endDate).diff(moment(startDate), 'days') + 1; 
  
  
const extraPaxElement = document.getElementById('extra_pax');
const extraPax = parseInt(extraPaxElement.value) || 0;
const pricePerExtraPax = 600;
const totalExtraPaxCost = extraPax * pricePerExtraPax;
const roomPrice = parseFloat(priceroom);
const numDays = parseInt(numberOfDays);
const totalRoomCost = roomPrice * numDays;
const totalPayment = totalExtraPaxCost + totalRoomCost;
console.log('Total Payment:', totalPayment);



    $('#bookRoomModal #checkin').val(bookstartdate);
    $('#bookRoomModal #checkout').val(bookenddate);
    $('#bookRoomModal').data('room-id', roomId);
    $('#bookRoomModal').data('room-name', roomName);
    $('#bookRoomModal').data('room-price',priceroom );
    $('#bookRoomModal').data('room-numberofday',numberOfDays );
    $('#bookRoomModal #room_name').val(roomName);
    $('#bookRoomModal #adult').val(numberofperson);
    $('#bookRoomModal #total_days').val(numberOfDays);

    $('#total_price').val(totalPayment);


    $('#bookRoomModal').modal('show');


    $.ajax({
      url: "api/get-reservationData",
      type: "GET",
      dataType: "json",
        success: (data) => {
          $('#nameguest').empty();
          if(data.login == 0) {
            page('/login');
          }else if(data.login == 1) {
            $("#nameguest").append(`<option></option>`);
            $.each(data.userData, function(index, value) {
                  $("#nameguest").append(`<option value="${value.id}">${value.full_name}</option>`);
            }); 
          }
        }, 
    });


    $('#nameguest').select2({
      placeholder: "Select Guest Name",
      allowClear: true
    });

    $("#nameguest").select2({
      dropdownParent: $('#bookRoomModal .modal-content')
  });



});



$(document).on('change','#extra_pax', function(){
  var extra_price_per_head = 600;

  var ttlextra = parseFloat($('#extra_pax').val());
  var priceroom = parseFloat($('#bookRoomModal').data('room-price'));
  var numberOfDays = parseFloat($('#bookRoomModal').data('room-numberofday'));
  
  var daysDifference = numberOfDays;
  var calculateAll = (extra_price_per_head * ttlextra * daysDifference) + priceroom;
  var formattedValue = calculateAll.toFixed(2);
  $('#total_price').val(formattedValue);
  

});


function activateDashboardMenuItem() {
    $("#menuUsers").removeClass('active');
    $("#rooms").removeClass('active');
    $("#reserve").removeClass('active');
    $("#menuUsersAccountSetting").removeClass('active');
    $("#reserve").removeClass('active');
    $("#guest").removeClass('active');
    $("#housekeep").removeClass('active');
    $("#housekeeping").removeClass('active');
    $("#menuDashboard").addClass('active');
}
