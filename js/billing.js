page('/billing', (e) => {

    const billing = `<div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
        <div class="card-body">
        <h3 class="card-title">Bills</h3>
            <p class="card-description">
            </p>
            <div class="table-responsive">
            <table id="guestTableBills" class="table">
                <thead>
                <tr>
                    <th>Name:</th>
                    <th>Room:</th>
                    <th>Total price:</th>  
                    <th>Options:</th>                    
                </tr>
                </thead>
                <tbody id="TableBodyguestBills">
                </tbody>
            </table>
            </div>
        </div>
        </div>
        </div>
        </div>`;

  $.ajax({
    url: "api/get-user-role",
    type: "GET",
    dataType: "json",

     success: (data) => {

      if (data.roles == 0){
      //admin
      mainContainerApp(app_main_template);
      $("#subContentCapstone").empty();
      $("#subContentCapstone" ).append(billing);
      
      }else if(data.roles == 1) {
        //manager
      mainContainerApp(manager_app_main_template);
      $("#subManagerContentCapstone").empty();
      $("#subManagerContentCapstone" ).append(billing);
      }else if(data.roles == 2) {
      //frontdesk
      mainContainerApp(frontdesk_app_main_template);
      $("#subfrontdeskContentCapstone").empty();
      $("#subfrontdeskContentCapstone" ).append(billing);
      }else if(data.roles == 3) {
        //housekeeeper
        mainContainerApp(housekeeper_app_main_template);
        $("#subHousekeeperContentCapstone").empty();
        $("#subHousekeeperContentCapstone" ).append(billing);
      }



    
    $("#menuDashboard").removeClass('active');
    $("#menuUsers").removeClass('active');
    $("#rooms").removeClass('active');
    $("#reserve").removeClass('active');
    $("#guest").removeClass('active');
    $("#menuUsersAccountSetting").removeClass('active');
    $("#reserve").removeClass('active');
    $("#billing").addClass('active');
    $("#housekeep").removeClass('active');
    $("#housekeeping").removeClass('active');
          
     }
  });


    $(document).ready(function() {

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
            url: "api/getGuestTotalBill",
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
                    if (!$.fn.DataTable.isDataTable('#guestTableBills')) {
                        dataTable = $("#guestTableBills").DataTable({
                            dom: 'Bfrtip',
                            buttons: ['csv', 'excel', 'pdf', 'print',]
                        });
                    }
                    dataTable.clear().draw();
                    $.each(data.userData, function(index, value) {

                        $billingTotalPrice = number_format(value.total_price, 2, '.', ',');
                        var row = `<tr>	
                            <td>${value.name}</td>
                            <td>${value.room_name}</td>
                            <td>${$billingTotalPrice}</td>
                            <td>
                            <button type="button" data-id="${value.id}" class="btn btn-danger paid-guest-btn">Paid</button>
                            <button type="button" data-id="${value.id}" class="btn btn-danger unpaid-guest-btn">Unpaid</button>
                            </td>
                        </tr>`;
                        dataTable.row.add($(row)).draw();
                    });
                }
            },
        });
    
    });

    $("#guestTableBills").on("click", ".paid-guest-btn", function() {
        var guestId = $(this).data("id");
        updatePaymentStatus(guestId, "paid");
    });

    $("#guestTableBills").on("click", ".unpaid-guest-btn", function() {
        var guestId = $(this).data("id");
        updatePaymentStatus(guestId, "unpaid");
    });

    // function updatePaymentStatus(guestId, status) {
    //     $.ajax({
    //         url: "api/updatePaymentStatus",
    //         type: "POST",
    //         dataType: "json",
    //         data: { id: guestId, status: status },
    //         success: function(response) {
    //             if (response.success) {
    //                 // Update table cell with new status
    //                 var row = dataTable.row($(this).closest("tr"));
    //                 row.data()[3] = `<button type="button" data-id="${guestId}" class="btn btn-danger ${status === 'paid' ? 'disabled' : 'unpaid-guest-btn'}">${status.charAt(0).toUpperCase() + status.slice(1)}</button>`;
    //                 row.draw();
    //             } else {
    //                 console.error("Failed to update payment status.");
    //             }
    //         },
    //         error: function(xhr, status, error) {
    //             console.error("Error updating payment status:", error);
    //         }
    //     });
    // }
});