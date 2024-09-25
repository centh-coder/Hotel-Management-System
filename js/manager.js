const manager_app_main_template = (data) => `
<div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
data-sidebar-position="fixed" data-header-position="fixed">
<aside class="left-sidebar">
  <div>

  
<div class="brand-logo d-flex align-items-center justify-content-between">
    <span class="ml-2" style="font-size: 20px;">Manager</span>
</div>



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
  <div id="subManagerContentCapstone">
  </div>
</div>
</div>`;


page('/manager', (e) => {

  mainContainerApp(manager_app_main_template);
$("#menuUsers").removeClass('active');
$("#rooms").removeClass('active');
$("#reserve").removeClass('active');
$("#guest").removeClass('active');
$("#menuDashboard").addClass('active');
$("#menuUsers").removeClass('active');
$("#menuUsersAccountSetting").removeClass('active');
$("#housekeep").removeClass('active');
$("#housekeeping").removeClass('active');



});


