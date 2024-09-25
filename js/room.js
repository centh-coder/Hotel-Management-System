page('/room', (e) => {

const rooms = `


  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <p class="card-description"></p>
            <div class="table-responsive">
              <table id="guestRooms" class="table">
                <thead>
                  <tr>
                    <th>Room no:</th>
                    <th>Price:</th>
                    <th>Status:</th>
                    <th>Options:</th>
                  </tr>
                </thead>
              <tbody id="TableBodyguestroom"></tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  </div>

    <div class="modal fade" id="addModalGuestRoom" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
       <div class="modal-dialog">
          <div class="modal-content">
             <div class="modal-header">
             </div>
    
             <div class="modal-body">
                <div class="row">
                   <div class="col-sm-12">
                      <form>
                        <div class="form-group">
                            <label >Room no:</label>
                            <input style="background:white;" autocomplete="off" type="text" class="form-control" id="roomNo" name="number">
                         </div>
    
                         <div class="form-group">
                            <label >Price:</label>
                            <input style="background:white;" autocomplete="off" type="Text" class="form-control" id="roomPrice" name="price">
                         </div>
                         <div class="form-group">
                         <label >How Many Persons:</label>
                         <input style="background:white;" autocomplete="off" type="number" class="form-control" id="numberofperson" name="numberofperson">
                      </div>
                        <div class="form-group">
                            <label >Status:</label>
                            <select class="form-control" id="roomStatus" name="status" style="background: white;">
                                      <option value="Available">Available</option>
                                      <option value="Not Available">Not Available</option>
                            </select>
                         </div>



                      </form>
                   </div>
                </div>
             </div>
             <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="AddGuestRoomCloseForm">Close</button>
                <button type="button" id="addGuestRoomData-btn" class="btn btn-primary">Add</button>
             </div>
          </div>
       </div>
    </div>
    </div>



          <div class="modal fade" id="editModalGuestRoom" tabindex="-1" role="dialog" >
             <div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                   </div>
  
                   <div class="modal-body">
                      <div class="row">
                         <div class="col-sm-12">
                            <form>
                              <div class="form-group">
                                  <label >Room no:</label>
                                  <input style="background:white;" autocomplete="off" type="text" class="form-control" id="editRoomNo" name="number">
                               </div>
  
                               <div class="form-group">
                                  <label >Price:</label>
                                  <input style="background:white;" autocomplete="off" type="Text" class="form-control" id="editRoomPrice" name="price">
                               </div>
  
                              <div class="form-group">
                                  <label >Status:</label>
                                  <select class="form-control" id="editRoomStatus" name="status" style="background: white;">
                                      <option value="Available">Available</option>
                                      <option value="Not Available">Not Available</option>
                                  </select>
                               </div>
                            </form>
                         </div>
                      </div>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-secondary" id="guestRoomEditCloseForm">Close</button>
                       <button type="button" id="editRoomGuestUpdate" class="btn btn-primary">Update</button>
                   </div>
                </div>
             </div>
          </div>


          <div class="modal fade" id="uploadImageGuestRoom" tabindex="-1" role="dialog" >
             <div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                   </div>
  
                   <div class="modal-body">
                      <div class="row">
                         <div class="col-sm-12">
                            <form>
                              <div class="form-group">
                                  <label >Image Room </label>
                                  <input type="file" class="roomfilepond" name="roomfilepond"/>
                               </div>
                            </form>
                         </div>
                      </div>
                   </div>
                   <div class="modal-footer">
                       <button type="button" class="btn btn-secondary" id="guestRoomImageCloseForm">Close</button>
                   </div>
                </div>
             </div>
          </div>


          <div class="modal fade" id="showImageGuestRoom" tabindex="-1" role="dialog">
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

$.ajax({
  url: "api/get-user-role",
  type: "GET",
  dataType: "json",
  success: (data) => {
    if (data.roles == 0){
      //admin
      mainContainerApp(app_main_template);
      $("#subContentCapstone").empty();
      $("#subContentCapstone" ).append(rooms);
      
      }else if(data.roles == 1) {
        //manager
      mainContainerApp(manager_app_main_template);
      $("#subManagerContentCapstone").empty();
      $("#subManagerContentCapstone" ).append(rooms);
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



  $("#menuDashboard").removeClass('active');
  $("#menuUsers").removeClass('active');
  $("#rooms").addClass('active');
  $("#guest").removeClass('active');
  $("#menuUsersAccountSetting").removeClass('active');
  $("#reserve").removeClass('active');
  $("#housekeep").removeClass('active');
  $("#housekeeping").removeClass('active');
  }
});


  function number_format (number, decimals, dec_point, thousands_sep) {
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


var dataTableroom;

$.ajax({
  url: "api/get-data-guestroom",
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

    if (data.login === 1) {
      const $tableBody = $("#TableBodyguestroom");
      let tableHTML = "";

      $.each(data.userData, function (index, value) {
        const roomPrice = number_format(value.price, 2, '.', ',');
        tableHTML += `<tr>
          <td>${value.room_no}</td>
          <td>${roomPrice}</td>
          <td>${value.status}</td>
          <td>
            <button type="button" data-id="${value.id}" class="btn btn-warning edit-guestroom-btn">Edit</button>
            <button type="button" data-id="${value.id}" class="btn btn-danger delete-guestroom-btn">Delete</button>
            <button type="button" data-id="${value.id}" class="btn btn-primary upload-images-guestroom-btn">Upload Images</button>
            <button type="button" data-id="${value.id}" class="btn btn-primary show-images-guestroom-btn">Show Images</button>
          </td>
        </tr>`;
      });

      $tableBody.empty().append(tableHTML);

      if ($.fn.DataTable.isDataTable("#guestRooms")) {
        dataTableroom.clear().destroy();
      }

      dataTableroom = $("#guestRooms").DataTable({
        dom: 'Bfrtip',
        ordering: false,
        buttons: [
          'csv', 'excel', 'pdf', 'print',
          {
            text: 'Add Record',
            className: 'addGuestRecord-btn',
            action: function (e, dt, node, config) {
              $("#addModalGuestRoom").modal({
                backdrop: 'static',
                keyboard: false
              }).modal("show");
            }
          }
        ]
      });
    }
  }
});


$(document).on('click','.show-images-guestroom-btn', function() {
  const roomId = $(this).attr("data-id"); 
 console.log(roomId);
 
 showGuestRoomImages(roomId);
});

function showGuestRoomImages(roomId) {
 
  $('#guestRoomImages').empty();

  $.ajax({
      url: 'api/fetch-images',
      type: 'GET',
      dataType: "json",
      data: { roomId: roomId },
      success: function(response) {
          const images = response;
          console.log(response);
          const rowTemplate = $('<div class="row mb-2"></div>');
          let currentRow = rowTemplate.clone();
          images.forEach((image, index) => {
              const imgElement = `
              <div class="col-md-4 mb-2">
              <div class="image-container">
                  <img src="http://localhost/capstone/api/controller/${image.image_url}" alt="Guest Room Image" class="img-fluid fixed-size-img">
                  <button class="delete-btn delete-image" data-id="${image.id}" data-image="${image.image_url}"><i class="ti ti-trash"></i></button>
              </div>
          </div>`;
              currentRow.append(imgElement);
              if ((index + 1) % 3 === 0) {
                  $('#guestRoomImages').append(currentRow);
                  currentRow = rowTemplate.clone();
              }
          });
          if (currentRow.children().length > 0) {
              $('#guestRoomImages').append(currentRow);
          }

          // Show the modal
          $('#showImageGuestRoom').modal('show');
      },
      error: function(xhr, status, error) {
          console.error('Error fetching images:', error);
      }
  });
}


$(document).on('click','.upload-images-guestroom-btn',function(){
  $("#uploadImageGuestRoom").modal("show");

  const roomId = $(this).attr("data-id"); 


  const inputElement = document.querySelector(".roomfilepond");
  const pond = FilePond.create(inputElement, {
      allowMultiple: true, 
      server: {
          url: "./api/controller/upload_images.php",
          process: {
              method: "POST",
              onload: (response) => {
                  console.log("File uploaded successfully:", response);
              },
              onerror: (response) => {
                  console.error("Error uploading file:", response);
              }
          }
      }
  });

  pond.on('processfile', (error, file) => {
      const formData = new FormData();
      formData.append('roomId', roomId);
      formData.append('files[]', file.file);
      $.ajax({
          url: "./api/controller/upload_images.php",
          type: "POST",
          data: formData,
          contentType: false,
          processData: false,
          success: function(response) {
              console.log("Files uploaded successfully:", response);
          },
          error: function(xhr, status, error) {
              console.error("Error uploading files:", error);
          }
      });
  });
});


    $(document).on("click", "#guestRoomImageCloseForm", function() {
          $('#uploadImageGuestRoom').modal('hide');
    });

    $(document).on("click", "#uploadImageGuestRoom", function() {
          $('#addModalGuestRoom').modal('hide');
    });
    
    $(document).on("click", ".delete-image", function() {
      var imageId = $(this).attr("data-image");
      var id = $(this).attr("data-id");
  
      swal.fire({
          title: "Are you sure you want to delete this image?",
          showDenyButton: true,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
      }).then((result) => {
          if (result.isConfirmed) {
              $.ajax({
                  url: "api/delete-image",
                  type: "POST",
                  dataType: "json",
                  data: { 
                    id: id,
                  
                  },
                  success: function(response) {
                      if(response.success) {
                          Swal.fire({
                              title: "Successfully Deleted!",
                              icon: "success",
                              showConfirmButton: false,
                              timer: 1500,
                              didClose: () => {
                                  $(`button[data-image='${imageId}']`).closest('.image-container').remove();
                              }
                          });
                      } else {
                          Swal.fire("Failed to delete", "", "error");
                      }
                  },
                  error: function(xhr, status, error) {
                      console.error('Error deleting image:', error);
                  }
              });
          }
      });
  });
  
//     $(document).on("click", ".delete-image", function() {
//       var id = $(this).attr("data-id");
//       console.log(id);
      
//       swal.fire({
//           title: "Are you sure you want to delete this record?",
//           showDenyButton: true,
//           confirmButtonText: "Yes",
//           denyButtonText: `No`,
//         }) .then((result) => {
//           if (result.isConfirmed) {
//             $.ajax({
//               url: "api/delete-image-pic",
//               type: "POST",
//               dataType: "json",
//               data: {
//                 id: id,
//               },
//               success: (data) => {
//                   console.log(data);
//                   if(data.success) {
//                       Swal.fire({
//                       title: "Successfully Deleted!",
//                       icon: "success",
//                       showConfirmButton: false,
//                       timer: 1500,
//                       didClose: () => {
//                           page('/room');
//                       }
  
//                   });
                  
  
//                   }else {
//                       swal.fire("Faild to delete", "", "error");
//                   }
//               },
//             });
//           } 
//         });
// });


    

    var eventFired = false;
    $(document).off("click", "#addGuestRoomData-btn").on("click", "#addGuestRoomData-btn", function() {

   if (!eventFired) {    
       eventFired = true;

      var inputGuestRoom = $("#roomNo").val();
      var inputGuestPrice = $("#roomPrice").val();
      var inputnumberofperson = $("#numberofperson").val();
      var inputGuestStatus = $("#roomStatus").val();
  
      $.ajax({
      url: "api/add-guest-room",
      type: "POST",
      dataType: "json",
      data: {
          rooms: inputGuestRoom,
          price: inputGuestPrice,
          status: inputGuestStatus,
          numberofpersone: inputnumberofperson
      },
      success: (data) => {
          if (data.results == 1){
              $("#addModalGuestRoom").modal('hide');
           
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "successfully added",
                showConfirmButton: false,
                timer: 1500, 
                didClose: () => {
                    page('/room');
                }
            });


          }else if(data.results ==0){
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
          }

      },
          complete: () => {
                eventFired = false; 
          }
      });

    }

  });

    $(document).on("click", ".delete-guestroom-btn", function() {
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
            url: "api/delete-guestroom-record",
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
                        page('/room');
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

    $(document).on("click", ".edit-guestroom-btn", function() {
  
      var row = $(this).closest("tr");
      var id = $(this).attr("data-id");
      var rowIndex = row.index();

      var editRoomGuestUpdateElement = $('#editRoomGuestUpdate');
  
      $.ajax({
          url: "api/get-guestroom-inputvalue",
          type: "POST",
          dataType: "json",
          data: {
              id: id,
          },
          success: function(data) {
              var roomno = data[0].room_no;
              var price = data[0].price;
              var status = data[0].status;
  
              $("#editRoomNo").val(roomno);
              $("#editRoomPrice").val(price);
              $("#editRoomStatus").val(status);
  
              $("#editModalGuestRoom").modal({
                      backdrop: 'static',
                      keyboard: false
              });
              
                $('#editRoomGuestUpdate').attr({
                  'data-id': id,
                  'data-positionrow': rowIndex
              });


              $("#editModalGuestRoom").modal("show");
            
            
          },
          error: function(xhr, status, error) {
              console.error(error);
          }
      });
  
     

  });
  

    $(document).on("click", "#editRoomGuestUpdate", function() {

      var id = $(this).attr("data-id");
      var roomno = $("#editRoomNo").val();
      var price = $("#editRoomPrice").val();
      var status = $("#editRoomStatus").val();
      var positionrow = $(this).attr("data-positionrow");
  
      $.ajax({
          url: "api/updateGuestRoom-record",
          type: "POST",
          dataType: "json",
              data: {
                  id: id,
                  roomno: roomno,
                  price: price,
                  status: status,
              },
              success: (data) => {
                    $("#editModalGuestRoom").modal("hide");                        
                 
                     Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "successfully edited",
                      showConfirmButton: false,
                      timer: 1500, 
                      didClose: () => {
                          dataTableroom.destroy();
                          page('/room');
                      }
                  });
              },     
      });
  });

  $(document).on("click", "#guestRoomEditCloseForm", function() {
    $("#editModalGuestRoom").modal("hide");

});

});
