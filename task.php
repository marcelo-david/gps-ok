<?php	
	include_once "header.php";
?>
			<link rel="stylesheet" href="assets/js/plugins/leaflet/leaflet.css"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.css" />
<!--<link rel="stylesheet" href="assets/js/plugins/leafletsearch/src/leaflet-search.css" />-->

<!-- datatables buttons-->
<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css"/>

<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.0/mapbox-gl.css' rel='stylesheet' />




<style>
/*
		* {
		box-sizing: border-box;
		}*/


input[type=text],
select,
textarea {
    width: 80%;
    /*padding: 12px;*/
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}

textarea.form-control {
    height: auto;
    width: 80% !important;
}

label {
    /*padding: 12px 12px 12px 0;*/
    display: inline-block;
}

input[type=submit] {
    background-color: #4CAF50;
    color: white;
    /*padding: 12px 20px;*/
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
}

.corto {
    width: 150px !important;
}

input[type=submit]:hover {
    background-color: #45a049;
}

.container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 0px;
    width: 800px !important;
}

.col-25 {
    float: left;
    width: 15%;
    margin-top: 6px;
}

.col-75 {
    float: left;
    width: 85%;
    margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 300px) {

    .col-25,
    .col-75,
    input[type=submit] {
        width: 100%;
        margin-top: 0;
    }
}




#map {
    position: relative;

    width: 100%;
    height: 300px;
    left: 0%;

}


.coordinates {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    position: absolute;
    bottom: 40px;
    left: 10px;
    padding: 5px 10px;
    margin: 0;
    font-size: 11px;
    line-height: 18px;
    border-radius: 3px;
    display: none;
}



#mapgeo {
    height: 300px;
}



.search-input {
    font-family: Courier
}

.search-input,
.leaflet-control-search {
    max-width: 400px;
}




div#search {
    position: relative;
    bottom: 600px;
    right: 5px;
    width: 300px;
    height: auto;
    float: right;
    padding: 10px;
    z-index: 1000;
}

div#search input {
    width: 200px;
}

div#results {
    font-style: sans-serif;
    color: black;
    font-size: 75%;
    z-index: 1000;
    background-color: #fff;
    border-radius: 15px;
    -moz-border-radius: 15px;
}

select option[data-default] {
  color: #888;
}
</style>

<!-- MAIN CONTENT -->
<div class="main-content">
    <div class="container-fluid">
<section class="content-header">
            <h3>
                <i class="fa fa-user icon-title"></i> Task Management
                <a class="btn btn-primary btn-social pull-right" href="lista_task.php" title="Back to tasks"
                    data-toggle="tooltip">
                    <i class="fa fa-plus"></i> Back to tasks
                </a>
            </h3>
            <br />
           
        

        </section>
        <div class="container">
            <form method="post" action="proses.php?act=insertact&userid=" onsubmit="return validateForm()" name="myForm"
                enctype="application/x-www-form-urlencoded" role="form">
                
                
                 <div class="row">
					                    	<div class="col-md-4">
							                <div class="form-group">
							     <label for="fname">Task name</label>
                                 <input type="text" id="fname" name="nombre" class="form-control" placeholder="Activity name"value="">
                                 <input type="hidden" id="id" name="id" value=""/>
                            
                            
										
                                                 
									        </div>
						                    </div>
						                    
								            <div class="col-md-4">                                                       
                                            <div class="form-group">     
										    <label for="lname">Description</label>
	                                               <input type="text" id="lname" name="describe" class="form-control"  placeholder="Write a description .."value="" >
									            </div>
									        </div>
                                            
                                           
                                          
                                            <div class="col-md-3">                                                       
                                            <div class="form-group">     
										      <label for="country">Radio detection</label>
	                                                <select id="country" name="radio" class="corto" required>
                                <option value="150">150 meters</option>
                                <option value="200">200 meters</option>
                                <option value="500">500 meters</option>
                                    </select>
									            </div>
									        </div>
                                            
                                          
                                      
                                        </div>  
                
                
                                        
                
                                             <div class="row">
                                             
					                    	<div class="col-md-3">
							                <div class="form-group">
										       <label for="subject">Subject</label>
										<input type="text" id="lname"  name="pedido" class="form-control"  placeholder="Subject..."    />    
									        </div>
						                    </div>
						                    
								         
                                            
                                          <div class="col-md-4">
							                <div class="form-group">
										      <label for="subject">Assign to:</label>
										<select id="workdevice" class="form-control"  name="workdevice" required>></select>  
									        </div>
						                    </div>
                                            
                                      <div class="col-md-5">
							                <div class="form-group">
										          <label for="country">Delivery range</label>
									 <input type="text" placeholder="Select a date..." name="datetimes" required />
                            <input type="hidden" id="fechaentrega"   name="fechaentrega"/>

                            <input type="hidden" id="fechafinal"  name="fechafinal"/> 
									        </div>
						                    </div> 
                                           
                                        </div>
                    <div class="row">
                    <div class="col-xs-12 form-group">
                        <div class="col-25">
                            <label for="subject">Delivery address</label>
                        </div>
                        <div class="col-75">
                            <!--<input type="text" id="lubica" name="lubica" readonly placeholder="Mueve el marcador dentro del mapa ....">-->
                            <textarea class="form-control" id="lubica" rows="3" cols="50"
                                placeholder="Move the marker within the map ...." readonly required></textarea>
                            <input type="hidden" id="lati" name="lati">
                            <input type="hidden" id="lon" name="lon">
                            <input type="hidden" id="dir" name="dir">
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6 form-group">
                        <input type="submit" name="Guardar" value="Save">
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-xs-12">
                    <div id="map"></div>
                </div>
            </div>
        </div>




        <pre id='coordinates' class='coordinates'></pre>
    </div>
</div>
<!-- END MAIN CONTENT -->

<!-- Javascript -->
<script src="assets/js/jquery/jquery-2.1.0.min.js"></script>
<script src="assets/js/bootstrap/bootstrap.min.js"></script>
<script src="assets/js/plugins/toastr/toastr.min.js"></script>
<script src="assets/js/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<script src="assets/js/plugins/ui/moment/moment.min.js"></script>
<script src="assets/js/plugins/ui/moment/moment_locales.min.js"></script>
<script src="assets/js/klorofil.min.js"></script>


<link href="assets/js/plugins/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet">
<script src="assets/js/plugins/datetimepicker/bootstrap-datetimepicker.min.js"></script>

<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />



<!-- datatable export -->
<script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>
<script src="assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
<script type="text/javascript" src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
<script type="text/javascript" src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
<script src="assets/js/plugins/forms/validation/validate.min.js"></script>
<script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
<script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
<script src="assets/js/apps/i8n.js"></script>
<script src="assets/js/plugins/yspeed.js"></script>
<script src="assets/js/plugins/underscore-min.js"></script>
<!--
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8Dnp2eemNYf92yS2Pe89BaE39jVqkVW4&v=3&sensor=false"></script>
-->
<script src="assets/js/plugins/leaflet/leaflet.js"></script>
<!--<script src="assets/js/plugins/leafletsearch/src/leaflet-search.js"></script>-->

<script src="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.min.js"></script>
<script src="assets/js/plugins/tokml/tokml.js"></script>

<script src="assets/js/apps/general.js"></script>
<script src="assets/js/apps/commons/task.js"></script>

          <?php	
	include_once "footer.php";
?>