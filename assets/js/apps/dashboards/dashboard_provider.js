		  //Revisamos session si no existe mandamos al login
      if (typeof sessionStorage.token == "undefined"){
            
            $(location).attr('href', "login.php");
            
        }
    
    var mymap;
	var group;
	let drivers = [];
	var ulSpeed = new ySpeed();
	var lastPositionsTimeOut;
	var updatingMap = false;
	var activeFollow = false;
	var activeGeofences = false;
	var activeStreetView = false;
	var currentDevice = 0;
	var colors = ["#0000FF", "#8A2BE2", "#A52A2A", "#5F9EA0", "#7FFF00", "#D2691E", "#6495ED", "#DC143C", "#00008B", "#006400", "#A9A9A9", "#2F4F4F", "#FF00FF", "#DAA520", "#FF69B4", "#B0C4DE", "#00FF00", "#FFA500", "#3CB371", "#90EE90", "#008000"];
	var listCoords = new Array();
	var markersGroup = null;
	var panorama = null;
	var streetview = null;
	var pano_device = 0;
	var fenway = new google.maps.LatLng(19.3911668,-99.423815,10);
	var openListDevices = true;
	var geofencesGroup = null;
	var panelReportShow = false;
	var dataSetReport = [];
	var listMarkers = [];
	var eventsAlerts = [];
	var banderaSonAlerts = true;
	var lastEvent=[];
	var tempUserStatus;
	var bandPeriod = 0;
	var tempInputR = 0;
	var eventsTEmp = [];

	var panoramaOptions = {
		position: fenway,
		pov: {
			heading: 34,
			pitch: 10
		},
		linksControl: false,
		panControl: false,
		enableCloseButton: false,
		motionTrackingControlOptions: {
			position: google.maps.ControlPosition.LEFT_BOTTOM
		}
	};

	var displayOnlines = false;
	var displayOfflines = false;

	var markersGroup = L.markerClusterGroup({
		spiderfyOnMaxZoom: false,
		showCoverageOnHover: false,
		zoomToBoundsOnClick: false
	});

$('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1,
        lang : (sessionStorage.getItem('language')=='en'?'en':sessionStorage.getItem('language'))
    });
	$(document).ready(function () {

		/**
		 * Check status of session of user
		 */
		checkSession();

		checkPermission();

		IniciarConexion();

		// initial parameters

		$('#report_from').mask('00/00/0000 00:00:00');

		$('#report_to').mask('00/00/0000 00:00:00');

		$('div[title]').tooltip();

		$('img[title]').tooltip();

		//$("#pano").hide();
		//$('#btnAdmin').hide();

		$(document).on('show.bs.tab', ' [data-toggle="tab"]', function (e) {


			var $target = $(e.target);
			var $tabs = $target.closest('.nav-tabs-responsive');

			var $current = $target.closest('li');
			var $next = $current.next();
			var $prev = $current.prev();

			$tabs.find('>li').removeClass('next prev');
			$tabs.find('>li>a').removeClass('active');

			$current.addClass('active');

			$prev.addClass('prev');
			$next.addClass('next');
			$('.prev a').removeClass('active');
			$('.next a').removeClass('active');

		});

		$('.datatable-js').dataTable({
			columnDefs: []
		});

		
	//	mymap = L.map('mapid').setView([10, -55], 14, {
	//		maxZoom: 24,
	//		minZoom: 2
    //		});
        
    mymap = L.map('mapid', {
		minZoom: 2,
		maxZoom: 18
	});
       

		if (sessionStorage.getItem('google_maps') == "true") {
			var roadMutant = L.gridLayer.googleMutant({
				maxZoom: 18,
				type: 'roadmap'
			}).addTo(mymap);

			var satMutant = L.gridLayer.googleMutant({
				maxZoom: 18,
				type: 'satellite'
			});

			var terrainMutant = L.gridLayer.googleMutant({
				maxZoom: 18,
				type: 'terrain'
			});

			var hybridMutant = L.gridLayer.googleMutant({
				maxZoom: 18,
				type: 'hybrid'
			});

			var trafficMutant = L.gridLayer.googleMutant({
				maxZoom: 18,
				type: 'roadmap'
			});
			trafficMutant.addGoogleLayer('TrafficLayer');


			var transitMutant = L.gridLayer.googleMutant({
				maxZoom: 18,
				type: 'roadmap'
			});
			transitMutant.addGoogleLayer('TransitLayer');

		}

		 mapbox = sessionStorage.getItem('mapbox');                

		//var osm = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGVja25pY29zIiwiYSI6ImNrMHZjcXJnczB4anYzY3F2NXhraTg1Y3AifQ.eEuxbui-YwXYq-qohP-PNw', {
		   var osm = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapbox, {		
			attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="https://tecknicos.com.mx">Tecknicos</a>, ' +
				'Imagenes <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(mymap);
            mymap.setView([19.3911668,-99.423815,10], 18);


	
	    if (sessionStorage.getItem('google_maps') == "true") {
	        console.log('Option 1')
	        L.control.layers({
	            Roadmap: osm,
	            OpenStreet: roadMutant,
	            Satelite: satMutant,
	            Terreno: terrainMutant,
	            Hibrido: hybridMutant,
	            Trafego: trafficMutant,
	            //	Transit: transitMutant
	        }, {}, {
	            collapsed: true
	        }).addTo(mymap);

	    } else {
	        console.log('Option 2')
	        L.control.layers({
	            Roadmap: osm
	        }, {}, {
	            collapsed: true
	        }).addTo(mymap);

	    }


		var grid = L.gridLayer({
			attribution: 'Grid Layer',
			//      tileSize: L.point(150, 80),
			//      tileSize: tileSize
		});

		grid.createTile = function (coords) {
			var tile = L.DomUtil.create('div', 'tile-coords');
			tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');

			return tile;
		};

		mymap.addLayer(grid);

		// watermark
	/*	L.Control.Watermark = L.Control.extend({
			onAdd: function (map) {
				var img = L.DomUtil.create('img');

				img.src = sessionStorage.getItem('logomark');

				if (isMobile() == true) {
					img.style = "width: 90px; height: 35px; margin-left: 55px;margin-top: -45px;";
				} else {
					img.style = "width: 175px; height: 60px; margin-left: 75px;margin-top: -45px;";
				}

				return img;
			},

			onRemove: function (map) {
				// Nothing to do here
			}
		});

		L.control.watermark = function (opts) {
			return new L.Control.Watermark(opts);
		};

		L.control.watermark({
			position: 'topleft'
		}).addTo(mymap);*/

		mymap.on("zoomstart", function () {
			sessionStorage.setItem('currentZoom', mymap.getZoom());
		});

		markersGroup = L.markerClusterGroup();

		panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

		var geofencesGroup = new L.featureGroup();
		geofencesGroup.addTo(mymap);

		getGeofences();
		doListGroups();
		doListDrivers();
		doListDevices();

		if ($.parseJSON(sessionStorage.getItem("admin")) == true) {
			//$('#btnAdmin').show();
			$('#opt_report_user').show();
		}

		//buttons

		$('#btnDevices').on('click', function () {
			doListDevices();
			setTimeout(function(){
				$("#btnClearAlerts").hide();
				$("#list_info_search").val('');
		         $("#list_info_search").show('');
		         $("#btnAdd").show('');
		         $("#list_alarms").hide('');
				if ($("#list_info:first").is(":hidden")) {
					$("#list_info").show("slow");
					$("#list_info_title").html("Vehiculos");
		            $("#list_info_title").html("");
					openListDevices = true;
					doUpdateListDevices(devices);
				} else {				
					$("#list_info").slideToggle("slow", function () {
						if (openListDevices == false) {
							$("#list_info").show("slow");
						$("#list_info_title").html("Vehiculos");
		                	$("#list_info_title").html("");
							openListDevices = true;
							doUpdateListDevices(devices);
						}
					});
				}
			})
			

		});

		
		$('#btnSound').on('click', function () {			
			if(document.querySelector(".new-event-soundtrue")){/* Que hacer si existe */
				$('#btnSound').removeClass('new-event-soundtrue');
				$('#btnSound').addClass('new-event-soundfalse');
				banderaSonAlerts = false;
			} else {/* Que hacer si no existe */
				if(document.querySelector(".new-event-soundfalse")){
					$('#btnSound').removeClass('new-event-soundfalse');
				}				
				$('#btnSound').addClass('new-event-soundtrue');
				banderaSonAlerts = true;
			}

		});

		$('#btnAlerts').on('click', function () {	
		  $("#list_info_search").hide('');
           $("#btnAdd").hide('');
           $("#list_alarms").show('');
			$('#btnAlerts').removeClass('new-event');
			$("#btnClearAlerts").show();
			$("#list_info_search").val('');
			if ($("#list_info:first").is(":hidden")) {
				$("#list_info").show("slow");
				$("#list_info_title").html("Eventos");
				openListDevices = false;						
				//doListEvents();
				//setTimeout(function() {
				   doUpdateListEvents();
				 //},1000);
				
			} else {
				$("#list_info").slideToggle("slow", function () {
					if (openListDevices == true) {
						$("#list_info_title").html("Eventos");
						openListDevices = false;
						doUpdateListEvents();
						$("#list_info").show("slow");
					}

				});
			}
		});

		//search

		$("#list_info_search").keyup(function () {
			var search = $(this).val();

			if (openListDevices == true) {

				var results = _.filter(devices, function (item) {
					return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
				});

				doUpdateListDevices(results);

			} else {
				var results = _.filter(events, function (item) {
					return item.deviceName.toLowerCase().indexOf(search.toLowerCase()) > -1;
				});
			}
		});

		$('#btnClearAlerts').on('click', function () {
			events.splice(0);
			//doUpdateListEvents();
		});

		$('#btnRoutes').on('click', function () {
			activeFollow = !activeFollow;
			(activeFollow == false ? $(this).css("background-color", "#fff").css("background-image", "url('assets/img/icons/route_off.png')") : $(this).css("background-color", "#336442").css("background-image", "url('assets/img/icons/route_off.png')"));
			if (activeFollow == false) {
				doRemoveAllPolyline();
			}
		});

		$('#btnStreetView').on('click', function () {

			if (currentDevice > 0) {
				activeStreetView = !activeStreetView;

				var objIndex = devices.findIndex((obj => obj.deviceId == currentDevice));

				(activeStreetView == false ? $(this).css("background-color", "#fff").css("background-image", "url('assets/img/icons/street_off.png')") : $(this).css("background-color", "#336442").css("background-image", "url('assets/img/icons/street_off.png')"));
				(activeStreetView == false ? $("#pano").hide() : $("#pano").show());

				panorama.setPosition({
					lat: devices[objIndex].latitude,
					lng: devices[objIndex].longitude
				});
				panorama.setPov( /** @type {google.maps.StreetViewPov} */ ({
					heading: devices[objIndex].course,
					pitch: 0
				}));

			} else {
			  //doOpenAlertInfo("Primero seleccione un Vehiculo!");
                doOpenAlertInfo($.i18n("message_device_select"));
			}

		});

		$('#btnFences').on('click', function () {

			activeGeofences = !activeGeofences;
			(activeGeofences == false ? $(this).css("background-color", "#fff").css("background-image", "url('assets/img/icons/geofence_off.png')") : $(this).css("background-color", "#336442").css("background-image", "url('assets/img/icons/geofence_off.png')"));
			(activeGeofences == false ? clearPolygons() : doShowGeoFences());

		});
        ///Playback link en administracion
        $('#btnPlayback').on('click', function () {
			$(location).attr('href', "playback.php");
		});

		 //Agregar dispositivos desde el mapa
         $('#btnAdd').on('click', function () {
            $("#list_info").hide();

        	$("#formularioDevice").click();
		});
        //Playback directo desde el mapa
         $('#btnPlaybackMap').on('click', function () {
         //Oculta el panel de dispositivos para que no afecte en el play back
         $("#list_info").hide();
       	 $("#formulario_play_back").click();
		});

		$('#btnReports').on('click', function () {
			formReportClear();
			$("#field_device").hide();
			$("#field_group").hide();
			$("#field_period").hide();
			$("#field_disabled").hide();
			$("#field_event").hide();
			$("#list_info").hide("slow");
			$("#container_footer").hide("slow");
			$("#btnViewReport").click();

			if (tempInputR == 0) {
				limpaSelect("report_device");

				$.each(devices, function (key, value) {
					insertOption("report_device", value.deviceId, value.name);
				});

				limpaSelect("report_group");
				
				$.each(groups, function (key, value) {
					insertOption("report_group", value.groupId, value.name);
				});
				tempInputR = 1;
			}

			$("#field_buttons").hide();
						
		});

		$('button[name="btnClearReport"]').on('click', function () {
				formReportClear();
				$("#field_device").hide();
				$("#field_group").hide();
				$("#field_period").hide();
				$("#field_disabled").hide();
				$("#field_event").hide();				
				var clean = $('.select2-search-choice-close');
				$.each(clean, function (key, value) {
					value.click();
				});						
		});		
        
        
        
	

		$("#report_id").select2({//revisar q onda para el refresh
				allowClear: false,
				placeholder: $.i18n("title_select2"),
				//language: "pt-BR"
                language: "es"
			})
			.on('change', function () {

				$("#field_device").hide();
				$("#field_group").hide();
				$("#field_period").hide();
				$("#field_disabled").hide();
				$("#field_event").hide();
				$("#field_buttons").show();

				switch ($(this).val()) {
					case "0": //summary
						$("#field_device").show();
						$("#field_group").show();
						$("#field_period").show();
						break;
					case "1": //event
						$("#field_device").show();
						$("#field_group").show();
						$("#field_event").show();
						$("#field_period").show();
						break;
					case "2": //trips
						$("#field_device").show();
						$("#field_group").show();
						$("#field_period").show();
						break;
					case "3": //routes
						$("#field_device").show();
						$("#field_group").show();
						$("#field_period").show();
						break;
					case "4": //stops
						$("#field_device").show();
						$("#field_group").show();
						$("#field_period").show();
						break;
					case "5": //inputs
						$("#field_device").show();
						$("#field_group").show();
						$("#field_period").show();
						break;
					case "6": //users
						$("#field_disabled").show();
						break;
					case "7": //devices
						$("#field_disabled").show();
						break;

				}
			});

		//reports

		$("#report_period").select2({
				allowClear: false,
				placeholder: $.i18n("title_select2"),
				//language: "pt-BR"
                language: "es"
			})
			.on('change', function () {
				$("#field_period_custom").hide();
				switch ($(this).val()) {
					case "0": //Hoje
						$("#report_from").val(moment(new Date()).format('DD/MM/YYYY') + ' 00:00:00');
						$("#report_to").val(moment(new Date()).format('DD/MM/YYYY') + ' 23:59:59');
						break;
					case "1": //ontem
						$("#report_from").val(moment(new Date()).add(-1, 'days').format('DD/MM/YYYY') + ' 00:00:00');
						$("#report_to").val(moment(new Date()).add(-1, 'days').format('DD/MM/YYYY') + ' 23:59:59');
						break;
					case "2": //this week
						var date = moment(new Date()),
							begin = moment(date).startOf('week').isoWeekday(1);
						$("#report_from").val(begin.format("DD/MM/YYYY").format('DD/MM/YYYY') + ' 00:00:00');

						begin.add('d', 6);
						$("#report_to").val(begin.format("DD/MM/YYYY").format('DD/MM/YYYY') + ' 23:59:59');
						break;
					case "3": //last week
						$("#report_from").val(moment().subtract(1, 'weeks').startOf('isoWeek').format('DD/MM/YYYY') + ' 00:00:00');
						$("#report_to").val(moment().subtract(1, 'weeks').endOf('isoWeek').format('DD/MM/YYYY') + ' 23:59:59');
						break;
					case "4": //this month
						$("#report_from").val(moment().startOf('month').format('DD/MM/YYYY') + ' 00:00:00');
						$("#report_to").val(moment(new Date()).format('DD/MM/YYYY') + ' 23:59:59');
						break;
					case "5": //custom
						$("#report_from").val('');
						$("#report_to").val('');
						bandPeriod = 1;
						$("#field_period_custom").show();
						break;
				}
			});

		$('#form_report').validate({
			errorElement: 'span',
			focusInvalid: false,
			icon: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			rules: {

				report_device: {
					required: {
						depends: function (element) {
							return $("#field_device").is(":visible");
						}
					}
				},
				report_type: {
					required: {
						depends: function (element) {
							return $("#field_event").is(":visible");
						}
					}
				},
				report_from: {
					required: {
						depends: function (element) {
							return $("#field_period").is(":visible");
						}
					}
				},
				report_to: {
					required: {
						depends: function (element) {
							return $("#field_period").is(":visible");
						}
					}
				},
				report_disabled: {
					required: {
						depends: function (element) {
							return $("#field_disabled").is(":visible");
						}
					}
				}
			},
			errorClass: 'validation-error-label',
			successClass: 'validation-valid-label',
			validClass: "validation-valid-label",

			invalidHandler: function (event, validator) { //display error alert on form submit
				$('.alert-error', $('.login-form')).show();
			},

			highlight: function (element) {
				$(element).closest('.form-group').addClass('has-error');
				$(element).closest('.select-search').addClass('border-warning');
			},
			unhighlight: function (element) {
				$(element).closest('.form-group').removeClass('has-error');
				$(element).closest('.select-search').removeClass('border-warning');
			},

			success: function (e) {
				$(e).closest('.form-group').removeClass('error').addClass('info');
				$(e).remove();
				// e.addClass("validation-valid-label").text("Sucesso.");
			},

			errorPlacement: function (error, element) {
				if (element.is(':checkbox') || element.is(':radio')) {
					var controls = element.closest('.controls');
					if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
					else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
				} else if (element.is('.select2')) {
					error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
				} else if (element.is('.chzn-select')) {
					error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
				}
				// Input group, styled file input
				else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
					error.appendTo(element.parent().parent());
				} else error.insertAfter(element);
			},

			submitHandler: function (form) {},
			invalidHandler: function (form) {}
		});

		$('button[name="btnGenerateReport"]').click(function () {// ver lo del refresh reportes
			if ($('#form_report').valid()) {

				swal({
						title: $.i18n("title_generate_report"),
						text: "",
						type: "info",
						showCancelButton: true,
						confirmButtonClass: "btn-info",
						confirmButtonText: $.i18n("title_yes"),
						cancelButtonText: $.i18n("title_no"),
						closeOnConfirm: false
					},
					function () {
						doPrepareReport();
					});
			};
		});

		$('#report_back').on('click', function () {
			$("#panel_table").hide("slow");
			$("#panel_form").show("slow");
			$("#report_back").hide();
			formReportClear();
		});

		/** /REPORTS */

		$('#btnAdmin').on('click', function () {
			$(location).attr('href', "main_provider.php");
		});

		$('#btnExit').on('click', function () {
			salida();
		});
        
        

		//menus

		$('#mnu_photo').on('click', function () {

			var objIndex = devices.findIndex((obj => obj.deviceId == currentDevice));

			if (devices[objIndex].photo != "") {
				$("#device_photo").prop("src","assets/img/devices/" + devices[objIndex].photo).css('height', '125px').css('width', '200px');
			} else {
				$("#device_photo").prop("src", sessionStorage.getItem('logomark')).css('height', '125px').css('width', '200px');
			}
		});

		if (sessionStorage.getItem('limitCommands') == "1") {
			$('#mnu_command').hide();
			$('#device_lock').hide();
			$('#device_unlock').hide();
            $('#device_arm').hide();
             $('#device_disarm').hide();

		}

		$('#mnu_command').on('click', function () {
			getCommandTypesDevice(currentDevice);
		});


		$('#device_lock').on('click', function () {
			sendLock(currentDevice);
		});

		$('#device_unlock').on('click', function () {
			sendUnLock(currentDevice);
		});

        $('#device_arm').on('click', function () {
		sendArm(currentDevice);
		});

        $('#device_disarm').on('click', function () {
			sendDisarm(currentDevice);
		});

		$('#device_close').on('click', function () {
        formCommandClear();
       	$("#custom_command").hide();
		//panTo(currentDevice, true)
		//currentDevice = 0;  
		});
        
       $('#device_close_arriba').on('click', function () {
		formCommandClear();
        $("#custom_command").hide();
		///	panTo(currentDevice, true)
		//	currentDevice = 0;
  
		});

		$("#viewInfoDevice").on("hidden.bs.modal", function () {
			//lastPositionsTimeOut = setTimeout(doListDevices, parseInt(sessionStorage.getItem('map_refresh')) * 1000);
			doListDevices();
		});

		$('button[name="btnSendCommand"]').click(function () {
			if ($('#type_command').val() != "") {

				swal({
						title: $.i18n("title_send_command"),
						text: "",
						type: "info",
						showCancelButton: true,
						confirmButtonClass: "btn-info",
						confirmButtonText: "Si",
						cancelButtonText: "No",
						closeOnConfirm: false
					},
					function () {
						doSendCommandsDevice();
					});
			} else {
				doOpenAlertError($.i18n("message_field_not_empty"));
			}
		});

		/*$('#mnu_alarms').click(function(){	// Boton De Alarmas de Dispositivos		
			//if(events.length < 1){
			//doListEvents();
			//setTimeout(function() {
			//	   doUpdateListEventsAlerts(devideTemp);
			//},1000);
			
			//}
		});*/

		$('button[name="btnClearCommand"]').click(function () {
			$("#type_command").select2("val", "");
            $("#custom_command").hide();
            formCommandClear();
		});

		$("#type_command").select2().on("change", function (e) {
			if (e.val == "custom") {
				$("#custom_command").show();
			} else {
				$("#custom_command").hide();
			}
		});

		$('#btnCloseFooter').click(function () {
			$("#container_footer").hide("slow");
            formCommandClear();
            $("#custom_command").hide();
		});


		//doNotifications();

	});

	function doListDevices() {

		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "devices/",
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
			},
			error: function (response) {
			//	doOpenAlertError($.i18n("message_error_performing"));
			},
			success: function (response) {

				devices.splice(0);
				var i = 1;
                var count = 0;
                var html = "";

				$.each(response, function (key, value) {

					devices.push({
						id: count,
						deviceId: value.id,
						name: value.name,
						model: value.model,
						phone: value.phone,
						category: (value.category != null) ? value.category : "default",
						status: value.status,
						uniqueId: value.uniqueId,
						groupId: value.groupId,
                        photo: ("photo" in value.attributes ? value.attributes.photo : ''),
						//follow: false,
						address: "",
						polyline: null,
						latitude: null,
						longitude: null,
						positionId: null,
						popup: null,
						input1: ((value.attributes.input1 == null || value.attributes.input1 == "") ? "input1" : value.attributes.input1),
						input2: ((value.attributes.input2 == null || value.attributes.input2 == "") ? "input2" : value.attributes.input2),
						alarm: null,
						input1Active: null,
						input2Active: null
					});


					count++;

				});

				if (devices.length > 0) {
					doLastPositions2();
					doListDriverByDevice();					
					//doListEvents();

				}
                else {

					if ($.parseJSON(sessionStorage.getItem("admin")) == true) {  //lo quite para ventana de agregar dispositivos
						swal({
								title: $.i18n("title_no_device"),
								text: $.i18n("title_go_device_form"),
								type: "info",
								showCancelButton: true,
								confirmButtonColor: "#2196F3",
								confirmButtonText: $.i18n("title_yes_take_me"),
								closeOnConfirm: true,
								html: true
							},
							function () {
								$(location).attr('href', "devices.php");
							});

				}	//lo quite para ventana de agregar dispositivos

				}
                
                	checkSession();

			}
		});

	}

	function doListGroups() {

		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "groups/",
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
                "Accept": "application/json"
			},
			error: function (response) {
				doOpenAlertError($.i18n("message_error_performing"));
			},
			success: function (response) {
				$.each(response, function(index, group) {
					groups.push({
						id: group.id,
						name: group.name
					})
				})
			}
		});

	}

	let countEvents = 0;
	let startedEvents = false;	
	var contadorAlertas = 0;
	var responseGlobal = [];

	function doListEvents(response) {

				responseGlobal = response;
				let resultDeviceId = removeDuplicates(response,"deviceId");
				let resultAlerts = resultDeviceId.length-2;
				$.each(resultDeviceId, function (id, val) {
					//console.log(val.deviceId);
					if (typeof val.deviceId !== 'undefined') {
						$.ajax({
							type: "GET",
							url: sessionStorage.getItem('url') + "notifications?deviceId="+ val.deviceId,
							cache: false,
							headers: {
								"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
							},
							error: function (res) {
								switch (res.status) {
									case 400:
										doOpenAlertError($.i18n("message_user_not_permission"));
										break;
									case 401:
										doOpenAlertError($.i18n("message_user_unauthorized"));
										break;
									default:
										doOpenAlertError($.i18n("message_error_performing"));
										break;
								}
							},
							success: function (res) {

								$.each(response, function (key, value) {
									if (value.deviceId == val.deviceId) {
										consultaWeb(value, res);//consultamos si el envio web esta activo
	                                    
									}
									if (id == resultAlerts && key == response.length-1) {
										console.log(key);

									}													
								});
							}
						});											
					}					
				});
                
                if (openListDevices == true) {

					var search = $("#list_info_search").val();

					if (search.length > 0) {

						var results = _.filter(devices, function (item) {
							return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
						});

						doUpdateListDevices(results);
					} else {
						doUpdateListDevices(devices);
					}

				}

				countEvents = _.sortByOrder(events, ['id'], ['desc']);			
				//setTimeout(updateAlerts, 1000);
                //lastPositionsTimeOut = setTimeout(updateAlerts, parseInt(sessionStorage.getItem('map_refresh')) * 1000);
               lastPositionsTimeOut = setTimeout(updateAlerts, 1000);
					
	}

	function updateAlerts(response){
		$('#list_info_table').empty().append($('#events-template').html());
		
		let lastEvents = _.sortByOrder(response, ['id'], ['asc']);
		
		$.each(lastEvents, function (key, value) {								
			
			
			//console.log(value);

			/*$("#list_info_body").append('<tr>' +
			'<th scope="row"><span onclick="panTo(\'' + value.deviceId + '\', true)" style="cursor:pointer"><i class="fa ' + value.deviceIcon + '"></i> &nbsp;' + findDevice(value.deviceId).name + '</span></th>' +
			'<td>' + findEventType(value.attributes.alarm ? value.type + _.capitalize(value.attributes.alarm) : value.type).name + '</td>' +
			'<td>' + moment(value.serverTime).format('DD-MM-YYYY  HH:mm:ss a') + '</td>' +
			'</tr>');*/
				

			lastEvent = value;
			console.log(lastEvents.length +"<=======>"+ key);
			
							
				if (banderaSonAlerts == true){
					console.log(dump(value));
					$('#btnAlerts').addClass('new-event');
					let promiser = document.querySelector('#audio').play()
					if (promiser !== undefined) {
					    promiser.then(_ => {
					        // Autoplay started!
					    }).catch(error => {
					        // Autoplay was prevented.
					        // Show a "Play" button so that user can start playback.
					    });
					}
											
				} 
                
                if (openListDevices == true) {

					var search = $("#list_info_search").val();

					if (search.length > 0) {

						var results = _.filter(devices, function (item) {
							return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
						});

						doUpdateListDevices(results);
					} else {
						doUpdateListDevices(devices);
					}

				}

				if (value.attributes.alarm.indexOf("sos") != -1 && value.type == 'alarm' && banderaSonAlerts == true) {
												
					//$('#btnSound').addClass('new-event');
					
					let promised = document.querySelector('#audioSos').play()
					if (promised !== undefined) {
					    promised.then(_ => {
					        // Autoplay started!
					    }).catch(error => {
					        // Autoplay was prevented.
					        // Show a "Play" button so that user can start playback.
					    });
					}									
				}			
				showSos(value);			
			
										
		});
	}

	function round(value,decimals=2) {
    	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  	}

	function msToTime( ms ) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;

        var pad = function (n) { return n < 10 ? '0' + n : n; };

        var result = d + 'd ' + pad(h) + 'h ' + pad(m) + 'm';
        return result;
    }

    function msToHours(ms) {
      hour = parseFloat(ms * 0.0000002778);
      return hour;
    }

	function doListDrivers() {

		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "drivers/",
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
                "Accept": "application/json"
			},
			error: function (response) {
				doOpenAlertError($.i18n("message_error_performing"));
			},
			success: function (response) {
				$.each(response, function(index, driver) {
					drivers.push({
						id: driver.id,
						name: driver.name
					})
				})
			}
		});

	}

	let driversLinked = [];

	function doListDriverByDevice() {
		_.forEach(devices, function(device){

			if (driversLinked.indexOf(device.deviceId) !== -1) {
				return;
			}

			driversLinked.push(device.deviceId);

			$.ajax({
				type: "GET",
				url: sessionStorage.getItem('url') + "drivers/?deviceId=" + device.deviceId,
				cache: false,
				headers: {
					"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
					"Accept": "application/json"
				},
				error: function (response) {
				},
				success: function (response) {

					if (response.length) {
						driversByDevice.push({
							deviceId: device.deviceId,
							driverName: response[0].name
						})
					}

					if (openListDevices == true) {

						var search = $("#list_info_search").val();

						if (search.length > 0) {

							var results = _.filter(devices, function (item) {
								return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
							});

							doUpdateListDevices(results);
						} else {
							doUpdateListDevices(devices);
						}

					}else{
						doListDevices();
					}

				}
			});
		})
	}

	function doLastPositions(response) {

			
	/*	if (sessionStorage.getItem('message_load_positions') == "1") {
			$.notify(
				'Actualizando...', "success", {
					position: "right",
					clickToHide: false,
					autoHideDelay: 1000,
					showAnimation: 'slideDown',
					// show animation duration
					showDuration: 400,
					// hide animation
					hideAnimation: 'slideUp',
					// hide animation duration
					hideDuration: 200
				}
			);
		}*/

		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "positions/",
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
				"Accept": "application/json"
			},
			error: function (response) {
				switch (response.status) {
					default:
					//	doOpenAlertError($.i18n("message_error_performing"));
						break;
				}
			},
			success: function (response) {

				countOnline = 0;
				countOffline = 0;

				markersGroup.clearLayers();
				listMarkers.splice(0);

				$.each(response, function (key, value) {

					// device
					var device = findDevice(value.deviceId);

					var communication = getTimeLimit(moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss'), device.status);

					var alarm = ((value.attributes.alarm != null ? (value.attributes.alarm == "sos" ? true : false) : false) == true);

					var input1Active = (value.attributes.input1 == null ? false : value.attributes.input1);
					var input2Active = (value.attributes.input2 == null ? false : value.attributes.input2);
                  

					// markers
					var marker = L.marker([value.latitude, value.longitude], {
						icon: getIcon(device.category, device.name, convertSpeed(value.speed, 'knots'), communication, alarm, (input1Active || input2Active), value.deviceId, ('ignition' in value.attributes) ? value.attributes.ignition : "none")
					}).on('click', function (e) {
						PanOnClick2(value.deviceId, value.id);
					});

					listMarkers.push([value.deviceId,marker]);

					markersGroup.addLayer(marker);

					var objIndex = devices.findIndex((obj => obj.deviceId == value.deviceId));
                    var attributes = ("alarm" in value.attributes?value.attributes.alarm:'');
					//Update object's name property.
					devices[objIndex].latitude = value.latitude;
					devices[objIndex].longitude = value.longitude;
					devices[objIndex].course = value.course;
					devices[objIndex].speed = value.speed;
					devices[objIndex].ignition = !("ignition" in value.attributes) ? "none" : value.attributes.ignition;
					//devices[objIndex].alarm = !("alarm" in value.attributes) ? "" : value.attributes.alarm;
                    devices[objIndex].alarm = !("alarm" in value.attributes) ? "" : $.i18n("alarm_events_"+attributes);
					devices[objIndex].protocol = !("protocol" in value) ? "Desconocido" : value.protocol;
					devices[objIndex].time = moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss')
					devices[objIndex].address = (value.address != null ? value.address : "");
					devices[objIndex].marker = marker;
					devices[objIndex].popup = $.md5(marker.getLatLng());
					devices[objIndex].positionId = value.id;
                    devices[objIndex].hours = !("hours" in value.attributes) ? "" : value.attributes.hours;
                    devices[objIndex].ip = !("ip" in value.attributes) ? "" : value.attributes.ip;
                    devices[objIndex].totalDistance = !("totalDistance" in value.attributes) ? "" : value.attributes.totalDistance;
                    var totalDistanceTemp = round(devices[objIndex].totalDistance/1000,2)+' Km';
                    devices[objIndex].totalDistance = totalDistanceTemp;
                    devices[objIndex].batteryLevel = !("batteryLevel" in value.attributes) ? "" : value.attributes.batteryLevel;
                    devices[objIndex].battery = !("battery" in value.attributes) ? "" : value.attributes.battery;
                    var devicestempHoras = msToTime(devices[objIndex].hours);             
                    devices[objIndex].hours = devicestempHoras;

					if (value.attributes.driverUniqueId) {
						devices[objIndex].driverUniqueId = value.attributes.driverUniqueId;
					}

					if (currentDevice == value.deviceId && activeFollow == true) {
						listCoords[devices[objIndex].id].push([value.latitude, value.longitude])
						doPolyline(value.deviceId);
					} else {
						doRemovePolyline(value.deviceId);
					}

					//footer
					if (value.deviceId == currentDevice) {

						var device_name = devices[objIndex].name;
						if (device_name.length > 40) {
							device_name = device_name.substring(0, 40) + "...";
						}
						$("#panel_device_name").html(device_name);

						$("#panel_device_status").html((devices[objIndex].status == "online" ? '&nbsp;&nbsp;&nbsp;<span class="label label-success">' + $.i18n("title_communication") + '</span>' : '&nbsp;&nbsp;&nbsp;<span class="label label-warning">' + $.i18n("title_no_communication") + '</span>'));
						$("#panel_device_speed").html(convertSpeed(devices[objIndex].speed, 'knots') + findSpeedUnit(sessionStorage.getItem('speedUnit')).title);
						$("#panel_device_course").html(degToCompass(devices[objIndex].course));
						$("#panel_device_battery").html(devices[objIndex].battery);
                        $("#panel_device_protocol").html(devices[objIndex].protocol);
						$("#panel_device_time").html(moment(devices[objIndex].time).format('DD/MM/YYYY HH:mm:ss'));

						var address = devices[objIndex].address;

						if (address.length > 40) {
							address = address.substring(0, 40) + "...";
						}

						$("#panel_device_address").html(address);
						$("#panel_device_movement").html((devices[objIndex].speed > 0 ? $.i18n("title_yes") : $.i18n("title_no")));
						$("#panel_device_alarm").html(devices[objIndex].alarm);

						panorama.setPosition({
							lat: value.latitude,
							lng: value.longitude
						});
						panorama.setPov( /** @type {google.maps.StreetViewPov} */ ({
							heading: value.course,
							pitch: 0
						}));

					}

					if (communication == true) {
						countOffline++;
					} else {
						countOnline++;
					}

				});

				if (openListDevices == true) {

					var search = $("#list_info_search").val();

					if (search.length > 0) {

						var results = _.filter(devices, function (item) {
							return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
						});

						doUpdateListDevices(results);
					} else {
						doUpdateListDevices(devices);
					}

				}

				if ((countOffline + countOnline) > 0) {
					mymap.addLayer(markersGroup);

					if (updatingMap == false) {
						mymap.fitBounds(markersGroup.getBounds());
						updatingMap = true;
					}
				}
                
                if (devices.length >0) {
				//doLastPositions();
				//doCheckNotifications();								
				
			} else {
				
				swal({
				  title: $.i18n("title_no_device"),
				  text: $.i18n("title_go_device_form"),
				  type: "info",
				  showCancelButton: true,
				  confirmButtonColor: "#2196F3",
				  confirmButtonText: $.i18n("title_yes_take_me"),
				  closeOnConfirm: true,
				  html: true
				},
				function(){
				  $(location).attr('href', "devices_provider.php");
				});
				
			}

				$("#countOffline").html(countOffline);
				$("#countOnline").html(countOnline);

                var cuantoshay = countOnline + countOffline;
                $("#countOfflinea").html("Fuera de linea (" + countOffline + ")");
                $("#countOnlinea").html("En linea (" + countOnline + ")");
                $("#coutAlldev").html("Total (" + cuantoshay + ")");

				//initializeSwitchery();

				filterDevices();
                
                
                ///Comente para doble zoom AQUIIIIIII
				//if (currentDevice != 0) {
				//	panTo(currentDevice, false);
				//}

				checkSession();

				//clearTimeout(lastPositionsTimeOut);

				//lastPositionsTimeOut = setTimeout(doListDevices,1000);

	}
    		});
        	}                
//Footer al click en maker en mapa
	//let devideTemp = 0;
	function viewInfoDevice(id,devide) {

		var params = new Object();
		params.id = id;
		//devideTemp = devide;
		doUpdateListEventsAlerts(devide);
		//console.log();
		
		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "positions/",
			contentType: 'application/json',
			cache: false,
			data: params,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
				"Accept": "application/json"
			},
			error: function (response) {
				switch (response.status) {
					default:
					//	doOpenAlertError($.i18n("message_error_performing"));
						break;
				}
			},
			success: function (response) {
				//console.log(dump(response));

				$.each(response, function (key, value) {

					clearTimeout(lastPositionsTimeOut);

					var device = findDevice(value.deviceId);
					//console.log(device);
					currentDevice = value.deviceId;

					var nocommunication = getTimeLimit(moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss'), device.status);

					//"<div style='font-weight:bold'>" + $.i18n("title_phone") + ":</div>" + (device.phone == null ? '-' : device.phone) + '<br />' +
					var html =
                                          
						"<div style='font-weight:bold'>" + $.i18n("title_protocol") + ":</div>" + value.protocol + '&nbsp;' +
						"<div style='font-weight:bold'>" + $.i18n("title_identifier") + ":</div>" + device.uniqueId + '<br />' +
                        "<div style='font-weight:bold'>" + $.i18n("title_phone") + ":</div>" + (device.phone == null ? '-' : device.phone) + '<br />' +                        
						"<div style='font-weight:bold'>" + $.i18n("title_model") + ":</div>" + (device.model == null ? '-' : device.model) + '<br />' +
						"<div style='font-weight:bold'>" + $.i18n("title_category") + ":</div>" + $.i18n("title_type_" + device.category) + '<br />' +
						"<div style='font-weight:bold'>" + $.i18n("title_device_time") + ":</div>" + moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss') + '<br />' +
						"<div style='font-weight:bold'>" + $.i18n("title_coordinates") + ":</div>" + value.latitude.toFixed(6) + ', ' + value.longitude.toFixed(6) + '<br />' +
						"<div style='font-weight:bold'>" + $.i18n("title_address") + ":</div> <a href='https://www.google.com/maps/place/" + value.latitude + "," + value.longitude + "/@" + value.latitude + "," + value.longitude + ",17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d" + value.latitude + "!4d" + value.longitude + "' target='_blank'>" + value.address + " <img src='assets/img/icons/navigation.png' style='width:16px;height:16px' /></a><br />" +
						"<div style='font-weight:bold'>" + $.i18n("title_speed") + ":</div>" + convertSpeed(value.speed, 'knots') + findSpeedUnit(sessionStorage.getItem('speedUnit')).title + '<br />' +
						"<div style='font-weight:bold'>" + $.i18n("title_course") + ":</div>" + degToCompass(value.course);


					changeIconsAlerts(!nocommunication, value);

					$("#deviceInput1").html($.i18n("title_" + device.input1));
					$("#deviceInput2").html($.i18n("title_" + device.input2));

					var input1Active = (value.attributes.input1 == null ? false : value.attributes.input1);
					var input2Active = (value.attributes.input2 == null ? false : value.attributes.input2);

					$("#mnu_photo").show();


					//if (device.photo.length > 0) {
					//	$("#mnu_photo").show();
				//	}


					if (input1Active == true) {
						$("#deviceInput1").addClass('label-success').removeClass('label-default');
					} else {
						$("#deviceInput1").addClass('label-default').removeClass('label-success');
					}

					if (input2Active == true) {
						$("#deviceInput2").addClass('label-success').removeClass('label-default');
					} else {
						$("#deviceInput2").addClass('label-default').removeClass('label-success');
					}

					$("#titleViewDevice").html(' ' + device.name + (nocommunication == false ? '&nbsp;&nbsp;&nbsp;<span class="label label-success" style="margin-right: 5px; float:right">' + $.i18n("title_communication") + '</span>' : '&nbsp;&nbsp;&nbsp;<span class="label label-warning" style="margin-right: 5px;float:right">' + $.i18n("title_no_communication") + '</span>'));
					$("#bodyViewDevice").html(html);
					$("#btnViewDevice").click();

					//setStreetView(value.deviceId);
                    
                   // getCommandTypesDevice(id);

				});
			}
		});

	}

	function findPopup(id) {
		return _.find(devices, function (obj) {
			return obj.popup == id;
		});
	}

	function findPopup3(id) {

		var found_pop = [];

		found_pop = $.grep(devices, function (v) {
			return v.popup === id;
		});

		return found_pop;
	}

	let filteredDevices = {
		active: false,
		devices: []
	};

	function filterDevice(deviceId) {
        console.log('Entro a filter device')
	    panTo(deviceId, true)
	    deviceId = parseInt(deviceId);

	    let filteredPosition = filteredDevices.devices.indexOf(deviceId);

	    if (filteredPosition === -1) {
	        filteredDevices.devices.push(deviceId);
	        filteredDevices.active = true;
	    } else {
	        filteredDevices.devices.splice(filteredPosition, 1)
	        if (filteredDevices.devices.length == 0) {
	            filteredDevices.active = false;
	            doLastPositions2();
	        }
	    }

		filterDevices()
        //AQUII LO AGREGUE PARA QUE NO DESAPARESCAN LOS DATOS DE FECHA/HORA Y LAT Y LON
        //doListDevices();
	}

	function deviceIsFiltered(deviceId) {
		return filteredDevices.devices.indexOf(deviceId) >= 0;
	}

	function filterDevices() {
		if (filteredDevices.active) {
			markersGroup.clearLayers();

			for (let i in listMarkers) {
				if (deviceIsFiltered(listMarkers[i][0])) {
					markersGroup.addLayer(listMarkers[i][1])
				}
			}
		}
	}

	function panTo(deviceId, openInfo) {
		currentDevice = deviceId;
		//doFollow(deviceId);

	 var objIndex = devices.findIndex((obj => obj.deviceId == deviceId));
	    //console.log("Entra a panTo el currentzoom " + sessionStorage.getItem('currentZoom'))
	    //console.log("Entra a panTo el currentzoom Int " + parseInt(sessionStorage.getItem('currentZoom')))
	    mymap.setView([devices[objIndex].latitude, devices[objIndex].longitude], parseInt(sessionStorage.getItem('currentZoom')));
	    sessionStorage.setItem('currentZoom', mymap.getZoom() + 18);
	    //mymap.setView([devices[objIndex].latitude, devices[objIndex].longitude]);
	    $("#panel_device_name").html(devices[objIndex].name);

		$("#panel_device_status").html((devices[objIndex].status == "online" ? '&nbsp;&nbsp;&nbsp;<span class="label label-success">' + $.i18n("title_communication") + '</span>' : '&nbsp;&nbsp;&nbsp;<span class="label label-warning">' + $.i18n("title_no_communication") + '</span>'));
		$("#panel_device_speed").html(convertSpeed(devices[objIndex].speed, 'knots') + findSpeedUnit(sessionStorage.getItem('speedUnit')).title);
		$("#panel_device_course").html(degToCompass(devices[objIndex].course));
		$("#panel_device_battery").html(devices[objIndex].batteryLevel+" %");
        $("#panel_device_batteryLow").html(devices[objIndex].battery+" %");
		$("#panel_device_protocol").html(devices[objIndex].protocol);
		$("#panel_device_time").html(moment(devices[objIndex].time).format('DD/MM/YYYY HH:mm:ss'));

		var address = devices[objIndex].address;

		if (address.length > 40) {
			address = address.substring(0, 40) + "...";
		}
        
		$("#panel_device_address").html(address);
		$("#panel_device_movement").html((devices[objIndex].speed > 0 ? $.i18n("title_yes") : $.i18n("title_no")));
		$("#panel_device_alarm").html(devices[objIndex].alarm);
        //Agregar odometro y horas de motor End Point https://dominio/api/positions ""totalDistance" y "hours"
        $("#panel_device_totalDistance").html(devices[objIndex].totalDistance);
        $("#panel_device_hours").html(devices[objIndex].hours);
        $("#panel_device_ip").html(devices[objIndex].ip);

		if (openInfo == true) {
			if ($("#container_footer:first").is(":hidden")) {
				$("#container_footer").show("slow");
			} // else {
			//$( "#container_footer" ).slideUp();
			//}
		}
	}

	$('#sosCloseFooter').click(function () {
		$("#container_sos").hide("slow");
	});

	function showSos(value) {
		// se le pondra la notificacion en vez del footer
		//$('#panel_sos_name').html(findDevice(value.deviceId).name)
		//$('#panel_sos_time').html(moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'));
		//$('#panel_sos_alarm').html(findEventType(value.attributes.alarm ? value.type + _.capitalize(value.attributes.alarm) : value.type).name)

		$.notify(
				 findDevice(value.deviceId).name + "\n Fecha/Hora: "+ moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss') + "\n Alarmas: "+ findEventType(value.attributes.alarm ? value.type + _.capitalize(value.attributes.alarm) : value.type).name, "error", {
					position: "right",
					clickToHide: false,
					autoHideDelay: 1000,
					showAnimation: 'slideDown',
					// show animation duration
					showDuration: 400,
					// hide animation
					hideAnimation: 'slideUp',
					// hide animation duration
					hideDuration: 200
				}
			);

		/*if ($("#container_sos:first").is(":hidden")) {
			$("#container_sos").show("slow");
		}*/

		/*setTimeout(function(){
		  $("#container_sos").hide("slow");
		}, 15000);*/
	}

	function PanOnClick(e) {
		var pop = findPopup($.md5(e.latlng));
		currentDevice = pop.deviceId;
		$("#container_footer").hide("slow");
		viewInfoDevice(pop.positionId, currentDevice);
	}

	function PanOnClick2(deviceId, positionId) {
		currentDevice = deviceId;
		$("#container_footer").hide("slow");
		viewInfoDevice(positionId, currentDevice);
	}

	function doFollow(id) {

		var objIndex = devices.findIndex(function (device) {
			return device.deviceId == id;
		});

		//var objIndex = devices.findIndex(obj => obj.deviceId == id);

		devices[objIndex].follow = !devices[objIndex].follow;

		listCoords[devices[objIndex].id] = new Array();

		if (devices[objIndex].polyline != null) {
			mymap.removeLayer(devices[objIndex].polyline);
			devices[objIndex].polyline = null;
		}

	}

	function doPolyline(deviceId) {

		var objIndex = devices.findIndex(function (device) {
			return device.deviceId == deviceId;
		});

		if (devices[objIndex].polyline != null) {
			mymap.removeLayer(devices[objIndex].polyline);
			devices[objIndex].polyline = null;
		}

		devices[objIndex].polyline = L.polyline(listCoords[devices[objIndex].id], {
			color: colors[0],
			weight: 7,
			opacity: 0.5,
			smoothFactor: 1
		}).addTo(mymap);

		mymap.setView([devices[objIndex].latitude, devices[objIndex].longitude], 18);

	}

	function doRemovePolyline(id) {

		var objIndex = devices.findIndex(function (device) {
			return device.deviceId == id;
		});

		//var objIndex = devices.findIndex(obj => obj.deviceId == id);

		if (devices[objIndex].polyline != null) {
			mymap.removeLayer(devices[objIndex].polyline);
			devices[objIndex].polyline = null;
		}

		listCoords[devices[objIndex].id] = new Array();

	}


	function doRemoveAllPolyline() {

		var i = 0;
		$.each(devices, function (key, value) {
			if (devices[i].polyline != null) {
				mymap.removeLayer(devices[i].polyline);
				devices[i].polyline = null;
			}
			i++;
		});

		listCoords = new Array();

	}

	function initializeSwitchery() {
		// Initialize multiple switches
		if (Array.prototype.forEach) {
			var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery'));
			elems.forEach(function (html) {
				var switchery = new Switchery(html);
			});
		} else {
			var elems = document.querySelectorAll('.switchery');
			for (var i = 0; i < elems.length; i++) {
				var switchery = new Switchery(elems[i]);
			}
		}
	}

	function setPano(id) {
		pano_device = id;

		if (id == 0) {
			$("#pano").hide();
		} else {
			$("#pano").show();

			var device = findDevice(id);
			panorama.setPosition({
				lat: device.latitude,
				lng: device.longitude
			});
			panorama.setPov( /** @type {google.maps.StreetViewPov} */ ({
				heading: device.course,
				pitch: 0
			}));
		}
	}


	function setStreetView(id) {

		streetview = new google.maps.StreetViewPanorama(document.getElementById('streetview'), panoramaOptions);

		var device = findDevice(id);
		streetview.setPosition({
			lat: device.latitude,
			lng: device.longitude
		});
		streetview.setPov( /** @type {google.maps.StreetViewPov} */ ({
			heading: device.course,
			pitch: 0
		}));
	}

	function doUpdateListDevices(arr) {

		$('#list_info_table').empty().append($('#devices-template').html())

		$("#list_info_body").empty();

		let _groups = _.groupBy(arr, function(item) {
			let group = _.findWhere(groups, {'id': item.groupId });
			return group ? group.name : 'Sin grupo';
		});

			$.each(_groups, function (key, group) {

			$("#list_info_body").append('<tr><td colspan="6" style="background: #59acfa; color: #fff; font-weight: bold">'+ key +'</td></tr>');

			$.each(group, function (key, value) {

				var ignitionImg = (value.ignition == "none" ? "none" : (value.ignition == true ? "ignition-on" : "ignition-off"));
				var ignitionTitle = (value.ignition == "none" ? "ACC no disponible" : (value.ignition == true ? "ACC ON" : "ACC OFF"));
				var statusImg = (value.status == "online" ? "status-on" : "status-off");
				var statusTitle = (value.status == "online" ? "En linea" : "Fuera de linea");
				var movementImg = (value.speed > 5 ? "movement-on" : "movement-off");
				var movementTitle = (value.speed > 5 ? "En movimiento" : "Detenido");
				let time = value.time ? moment(value.time).format('DD-MM-YYYY h:mm:ss a') : '';
	            //Agregar funcionamiento
	          	//var candadoImg = (value.candado == "none" ? "none" : (value.candado == true ? "car_unlock" : "car_lock"));
				//var candadoTitle = (value.candado == "none" ? "Estado no disponible" : (value.candado == true ? "Bloqueado" : "Desbloqueado"));
	            //Aqui agregar fecha y hora a los dispositivos, al seleccionar un checkbox solo mostrar ese dispositivo o dispositivos en mapa
                    conductor = "";
                    if (findDriver(value.deviceId).driverName) { 
                    conductor = findDriver(value.deviceId).driverName;
                    }else if (value.driverUniqueId == 0){
                    conductor = "Sin conductor";
                    }else if (value.driverUniqueId) {
                    conductor = value.driverUniqueId + " " +($.i18n("title_" + "null"));
                    }else {
                    conductor = "Sin conductor";
                    }
                    //estado
                   // estado = "";
                    title = ""
                    if (value.status == "online") {
                    	state = "state_on";
                    title = "Communicating";
                    }else if (value.status == "offline") {
						state = "state_off";
                    title = "Not Communicating";
                    }
                    //var candadoTitle = (value.time == "null" ? "Sin comunicar" : (value.time == true ? "comunicando" : "Sin comunicar"));     
				    let checked = deviceIsFiltered(value.deviceId) ? 'checked' : '';
				    $("#list_info_body").append('<tr>' +
                    '<td><input type="checkbox" id="myCheck" onclick="filterDevice(\'' + value.deviceId + '\')" '+ checked +'></td>'+
                    '<td><img src="assets/img/icons/' + statusImg + '.png" style="height: 16px; width: 16px" title="' + statusTitle + '" /> ' +
                    '<br/><br/><img src="assets/img/driverb.png" style="height: 18px; width: 18px" />' +'</th>' +
                    '<th scope="row"><span onclick="panTo(\'' + value.deviceId + '\', true)" style="cursor:pointer">' + value.name  + "<br>" +  '</span> <span>'+ time + 
                    '</span><br/>' + 
                    //(findDriver(value.deviceId).driverName || value.driverUniqueId || 'Sin conductor') 
                    conductor
                    + 
                    '<br/>'+ value.address +'<br/>'+ '<img src="assets/img/icons/' + ignitionImg + '.png" style="height: 16px; width: 16px" title="' + 
                    ignitionTitle + '" />  &nbsp;&nbsp; <img src="assets/img/icons/' + movementImg + '.png" style="height: 16px; width: 16px" title="' + 
                    movementTitle + '"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span onclick="panTo(\'' + value.deviceId + '\', true)" style="cursor:pointer">&nbsp;'  + 
                    convertSpeed(value.speed, 'knots') + findSpeedUnit(sessionStorage.getItem('speedUnit')).title + '</span>' +' </th>' +
                    //'<th scope="row"><span onclick="panTo(\'' + value.deviceId + '\', true)" style="cursor:pointer">' + value.name  + "<br>" +  '</span> <span>'+ time + '</span><br/>' + (findDriver(value.deviceId).driverName || value.driverUniqueId || 'Sin conductor')  +'<br/><br/>'+ findEventType(value.type).name +'<br/>' + value.address +'<br/><br/>'+ '<img src="assets/img/icons/' + ignitionImg + '.png" style="height: 16px; width: 16px" title="' + ignitionTitle + '" />  &nbsp;&nbsp; <img src="assets/img/icons/' + movementImg + '.png" style="height: 16px; width: 16px" title="' + movementTitle + '"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span onclick="panTo(\'' + value.deviceId + '\', true)" style="cursor:pointer">&nbsp;'  + convertSpeed(value.speed, 'knots') + findSpeedUnit(sessionStorage.getItem('speedUnit')).title + '</span>' +' </th>' +
                    // '<span onclick="panTo(\'' + value.deviceId + '\', true)" style="cursor:pointer">&nbsp;'  + convertSpeed(value.speed, 'knots') + findSpeedUnit(sessionStorage.getItem('speedUnit')).title + '</span>' +
                    // '<td><img src="assets/img/icons/' + movementImg + '.png" style="height: 16px; width: 16px" title="' + movementTitle + '"/></td>' +
                    //'<td><button type="submit" class="btn btn-primary" name="btnGenerate">Generate</button><img src="assets/img/icons/' + ignitionImg + '.png" style="height: 16px; width: 16px" title="' + ignitionTitle + '" /></td>' +
                    //Agregar funcionamiento
                    '<td><img src="assets/img/icons/' + state + '.png" style="height: 30px; width: 30px" title="' + title + '" /></td>' +
                     //'<td><img src="assets/img/icons/' + candadoImg + '.png" style="height: 30px; width: 30px" title="' + title + '" /></td>' +
                    //'<td>' + state + '</td>' +
                    '</tr>');
			});
		});
	}		
	function doUpdateListEventsAlerts(id) {
		doUpdateListEvents();

		setTimeout(function(){
			var contador =0;
			$('#list_info_table_alerts').empty().append($('#events-template').html());

			$("#list_info_body_alerts").empty();

			var results = removeDuplicates(eventsAlerts, "id");

			var banderaReTemp = _.sortByOrder(results, ['id'], [false]);
				//console.log(dump(banderaReTemp));
			$.each(banderaReTemp, function (key, value) {
				if (value.deviceId == id && contador <5) {
					contador++;

					$("#list_info_body_alerts").append('<tr>' +
					'<th scope="row"><span onclick="panTo(\'' + value.deviceId + '\', true)" style="cursor:pointer"><i class="fa ' + value.deviceIcon + '"></i> &nbsp;' + value.deviceName + '</span></th>' +
					'<td>' + value.typeName + '</td>' +
					'<td>' + moment(value.serverTime).format('DD-MM-YYYY  HH:mm:ss a') + '</td>' +
					'</tr>');					
				}
			});
		}, 1000);
		
	}

	function removeDuplicates(originalArray, prop) {
		var newArray = [];
		var lookupObject  = {};

		for(var i in originalArray) {
			lookupObject[originalArray[i][prop]] = originalArray[i];
		}

		for(i in lookupObject) {
			newArray.push(lookupObject[i]);
		}

		return newArray;
	}
	/**
	 * envia comando para equipamento
	 *
	 * @return void
	 */

function doSendCommandsDevice() {

		doOpenAlertWait($.i18n("title_wait"), $.i18n("title_sending_command"));

		var params = $("#form_send_command").serializeObject();
		params.deviceId = currentDevice;
		if (params.type == "custom") {
			params.attributes = {
				data: params.custom
			};
		}
		var paramsTemp = new Object();
		paramsTemp.deviceId = params.deviceId;
        paramsTemp.type = params.type_command; 
		//console.log(dump(paramsTemp));
		delete params.custom;
		$.ajax({
			type: "POST",
			url: sessionStorage.getItem('url') + "commands/send",
			data: JSON.stringify(paramsTemp),
			contentType: "application/json",
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
				"Accept": "application/json"
			},
			error: function (response) {
				switch (response.status) {
					case 400:

						doOpenAlertInfo((/Device is not online/i.test(response.responseText)) ? $.i18n("message_device_not_online") : $.i18n("message_user_not_permission"));
						break;
					case 401:
						doOpenAlertInfo($.i18n("message_user_unauthorized"));
						break;
					case 404:
						doOpenAlertInfo($.i18n("message_user_no_matching"));
						break;
					case 405:
						doOpenAlertInfo($.i18n("message_method_not_allowed"));
						break;
					default:
						doOpenAlertInfo($.i18n("message_error_performing"));
						break;
				}
			},
			success: function (response) {
				doOpenAlertSucess($.i18n("title_success"), $.i18n("title_sent_command"), 1500);
			//	setTimeout(function () {
			//		refreshGridCommands();
			//	}, 1500);
            setTimeout(function () {
					$('button[name="btnClearCommand"]').click();				
				}, 800);
			}
		});
	}
	/**
	 * Carrega lista dos comandos por esquipamento
	 *
	 *
	 * @return void
	 */
	function getCommandTypesDevice(id) {

		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "commands/types/",
			cache: false,
			data: {
				deviceId: id
			},
			contentType: "application/json",
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
				"Accept": "application/json"
			},
			error: function (response) {
				switch (response.status) {
					case 400:
						doOpenAlertInfo($.i18n("message_user_not_permission"));
						break;
					case 401:
						doOpenAlertInfo($.i18n("message_user_unauthorized"));
						break;
					case 404:
					doOpenAlertInfo($.i18n("message_user_no_matching"));
						break;
					default:
						doOpenAlertInfo($.i18n("message_error_performing"));
						break;
				}
			},
			success: function (response) {

				limpaSelect("type_command");

				$.each(response, function (key, value) {
					insertOption("type_command", value.type, findCommandTypes(value.type).title);
				});

			}
		});

	}

	/**
	 * Carrega lista dos geofences
	 *
	 *
	 * @return void
	 */

	function doShowGeoFences() {

		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "geofences/",
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password'))
			},
			error: function (response) {
				switch (response.status) {
					case 400:
						doOpenAlertError($.i18n("message_user_not_permission"));
						break;
					case 401:
						doOpenAlertError($.i18n("message_user_unauthorized"));
						break;
					default:
						doOpenAlertError($.i18n("message_error_performing"));
						break;
				}
			},
			success: function (response) {

				geofences.splice(0);

				$.each(response, function (key, value) {
					setPolygon(value, mymap);
				});

			}
		});

	}


	/**
	 * prepara relatorio para exportacao
	 *
	 * @return void
	 */

	function doPrepareReport() {

		doOpenAlertWait($.i18n("title_wait"), $.i18n("title_wait_report"));

		var form = $("#form_report").serializeObject();
		var params = "";

		if (jQuery.inArray($("#report_id").val(), ["0", "1", "2", "3", "4", "5"]) != -1) {

			if (jQuery.inArray($("#report_id").val(), ["3", "5"]) != -1) {
				params = "type=allEvents&";
			}
			//prepare list devices
			var deviceIds = $('#report_device option:selected');
			$(deviceIds).each(function (index, deviceId) {
				if ($(this).val() != "") {
					params += "deviceId=" + $(this).val() + "&";
				}
			});

			//prepare list groups
			var groups = $('#report_group option:selected');
			$(groups).each(function (index, group) {
				if ($(this).val() != "") {
					params += "groupId=" + $(this).val() + "&";
				}
			});

			var data_ini = moment(form.report_from, "DD/MM/YYYY hh:mm:ss");
			var data_end = moment(form.report_to, "DD/MM/YYYY hh:mm:ss");

			params += "from=" + data_ini.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z&";
			params += "to=" + data_end.tz("Etc/GMT+0").format().substr(0, 19) + ".000Z";

			//events
			if ($("#report_id").val() == "5") {
				//prepare list type events
				var types = $('#report_type option:selected');
				$(types).each(function (index, type) {
					if ($(this).val() != "") {
						params += "type=" + $(this).val() + "&";
					}
				});
			}

		}

		var url_report = sessionStorage.getItem('url');

		switch ($("#report_id").val()) {

			case "0":
				url_report += "reports/summary";
				break;
			case "1":
				url_report += "reports/events";
				break;
			case "2":
				url_report += "reports/trips";
				break;
			case "3":
				url_report += "reports/route";
				break;
			case "4":
				url_report += "reports/stops";
				break;
			case "5":
				url_report += "reports/route";
				break;
			case "6":
				url_report += "users/";
				break;
			case "7":
				url_report += "devices/";
				break;

		}

		$.ajax({
			type: "GET",
			url: url_report,
			data: params,
			contentType: "application/json",
			//cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
				"Accept": "application/json"
			},
			error: function (response) {
				switch (response.status) {
					case 400:
						doOpenAlertError($.i18n("message_user_not_permission"));
						break;
					case 401:
						doOpenAlertError($.i18n("message_user_unauthorized"));
						break;
					case 404:
						doOpenAlertError($.i18n("message_user_no_matching"));
						break;
					default:
						doOpenAlertError($.i18n("message_error_performing"));
						break;
				}
			},
			success: function (response) {

				// Javascript sourced data
				dataSetReport.splice(0);

				$.each(response, function (key, value) {

					switch ($("#report_id").val()) {

						case "0":
							var fuelCost = 0;
							var device = findDeviceByName(value.deviceName);
							var fuel = device.fuel;
							var autonomy = device.autonomy;

							if (autonomy > 0) {
								var fuelCost = (((value.distance / 1000) / autonomy) * parseFloat(sessionStorage.getItem(fuel)));
							}

							dataSetReport.push([value.deviceName, convertMeters(value.distance, sessionStorage.getItem('distanceUnit')), hhmmss(value.engineHours, 'milliseconds'), convertSpeed(value.maxSpeed, 'knots'), convertSpeed(value.averageSpeed, 'knots'), parseFloat(fuelCost).toFixed(2)]);
							break;
						case "1":
							dataSetReport.push([moment(value.serverTime).format('DD/MM/YYYY HH:mm:ss'), findDevice(value.deviceId).name, findEventType(value.attributes.alarm ? value.type + _.capitalize(value.attributes.alarm) : value.type).name, (value.geofenceId > 0 ? findGeofence(value.geofenceId).name : "")]);
							break;
						case "2":
							dataSetReport.push([value.deviceName, moment(value.startTime).format('DD/MM/YYYY HH:mm:ss'), value.startAddress, moment(value.endTime).format('DD/MM/YYYY HH:mm:ss'), value.endAddress, convertMeters(value.distance, "km"), convertSpeed(value.averageSpeed, 'knots'), convertSpeed(value.maxSpeed, 'knots'), hhmmss(value.duration, 'milliseconds')]);
							break;
						case "3":
							dataSetReport.push([findDevice(value.deviceId).name, value.valid, moment(value.deviceTime).format('DD/MM/YYYY'),moment(value.deviceTime).format('HH:mm:ss'), value.latitude, value.longitude, convertSpeed(value.speed, 'knots'), findEventType(value.attributes.alarm ? 'alarm' + _.capitalize(value.attributes.alarm) : 'alarm').name, degToCompass(value.course), value.address]);
							break;
						case "4":
							dataSetReport.push([value.deviceName,
								moment(value.startTime).format('DD/MM/YYYY HH:mm:ss'),
								value.address,
								moment(value.endTime).format('DD/MM/YYYY HH:mm:ss'),
								hhmmss(value.duration, 'milliseconds'),
								value.deviceId,
								value.latitude,
								value.longitude
								/*,
																hhmmss(value.engineHours, 'milliseconds')/*,
																value.spentFuel+' L'*/
							]);
							break;
						case "5":
							var input1Active = (value.attributes.input1);
							var input2Active = (value.attributes.input2);

							if (input1Active) {
								var device = findDevice(value.deviceId);
								dataSetReport.push([findDevice(value.deviceId).name, moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), value.address, (value.attributes.input1? $.i18n("title_on") : $.i18n("title_off")), convertSpeed(value.speed, 'knots')+ ' ' +speedUnit, $.i18n("title_" + device.input1)]);
							}

							if (input2Active) {
								var device = findDevice(value.deviceId);
								dataSetReport.push([findDevice(value.deviceId).name, moment(value.deviceTime).format('DD/MM/YYYY HH:mm:ss'), value.address, (value.attributes.input2? $.i18n("title_on") : $.i18n("title_off")), convertSpeed(value.speed, 'knots')+ ' ' +speedUnit, $.i18n("title_" + device.input2)]);
							}
							break;
						case "6":
							var document = ('document' in value.attributes) ? value.attributes.document : "";
							var city = ('city' in value.attributes) ? value.attributes.city : "";
							var state = ('state' in value.attributes) ? value.attributes.state : "";
							var phone = ('phone' in value.attributes) ? value.attributes.phone : "";

							var disabled = (value.disabled ? 'yes' : 'no');

							if ($("#report_disabled").val() == 'all' || disabled == $("#report_disabled").val()) {
								dataSetReport.push([value.id, value.name, document, value.email, city, state, phone, $.i18n("title_" + disabled)]);
							}
							break;
						case "7":
							var disabled = (value.disabled ? 'yes' : 'no');

							if ($("#report_disabled").val() == 'all' || disabled == $("#report_disabled").val()) {

								var g = findGroup(value.groupId);
								var group_name = "";

								if (typeof g != 'undefined') {
									group_name = g;
								}
								dataSetReport.push([value.id, value.name, value.uniqueId, group_name, $.i18n("title_type_" + value.category), value.model, value.phone, $.i18n("title_" + disabled)]);
							}
							break;

					}

				});

				$('#datatable_report').dataTable().fnDestroy();

				$("#datatable_report_header").empty();

				var report_parameters = "";

				switch ($("#report_id").val()) {

					case "0":
						$("#datatable_report_header").append('<tr>' +
							'<th>Nombre dispositivo</th>' +
							'<th>Ditancia</th>' +
							'<th>Motor encendido HRS</th>' +
							'<th>Velocidad maxima</th>' +
							'<th>Velocidad media</th>' +
							'<th>Velocidad media</th>' +
							'</tr>');

						title_report = $.i18n("title_reports_summary");
						break;
					case "1":
						$("#datatable_report_header").append('<tr>' +
							'<th>Fecha / Hora</th>' +
							'<th>Nombre dispositivo</th>' +
							'<th>Tipo</th>' +
							'<th>Geo-cercas</th>' +
							'</tr>');
						title_report = $.i18n("title_reports_events");
						break;
					case "2":
						$("#datatable_report_header").append('<tr>' +
							//'<th data-i18n="title_device_name">Device Name</th>' +
                            '<th>Nombre dispositivo</th>' +
							'<th>Fecha / Hora inicio</th>' +
							'<th>Direccion inicio</th>' +
							'<th>Fecha / Hora final</th>' +
							'<th>Direcion final</th>' +
							'<th>Distancia</th>' +
							'<th>Velocidad media</th>' +
							'<th>Velocidad maxima</th>' +
							'<th>Duracion</th>' +
							'</tr>');
						title_report = $.i18n("title_reports_trips");
						break;
					case "3":
						$("#datatable_report_header").append('<tr>' +
							'<th><Nombre dispositivo</th>' +
							'<th>Valida</th>' +
							'<th>Fecha</th>' +
                            '<th>Hora</th>' +
							'<th>Latitud</th>' +
							'<th>Longitud</th>' +
							'<th>Velocidad</th>' +
                            '<th>Tipo Evento</th>' +
							'<th>Curso</th>' +
							'<th>Direccion</th>' +
							'</tr>');
						title_report = $.i18n("title_reports_routes");
						break;
					case "4":
						$("#datatable_report_header").append('<tr>' +
							'<th>Nombre dispositivo</th>' +
							'<th>Fecha / Hora inicio</th>' +
							'<th>Direccion</th>' +
							'<th>Fecha / Hora final</th>' +
							'<th>Duracion</th>' +
							'</tr>');
						title_report = $.i18n("title_reports_stop");
						break;
					case "5":
						$("#datatable_report_header").append('<tr>' +
							'<th>Device name</th>' +
							'<th>Date hour</th>' +
							'<th>Direction</th>' +
							'<th>State</th>' +
							'<th>Speed</th>' +
							'<th>Type</th>' +
							'</tr>');
						title_report = $.i18n("title_reports_inputs");
						break;
					case "6":
						$("#datatable_report_header").append('<tr>' +
							'<th>ID</th>' +
							'<th>Name</th>' +
							'<th>RFC</th>' +
							'<th>Email</th>' +
							'<th>City</th>' +
							'<th>State</th>' +
							'<th>Phone</th>' +
							'<th>Disabled</th>' +
							'</tr>');
						title_report = $.i18n("title_reports_users");
						break;
					case "7":
						$("#datatable_report_header").append('<tr>' +
							'<th>ID</th>' +
							'<th>Nombre Dispositivo</th>' +
							'<th>RFID</th>' +
							'<th>Grupo</th>' +
							'<th>Categoria</th>' +
							'<th>Modelo</th>' +
							'<th>Telefono</th>' +
							'<th>Desactivado</th>' +
							'</tr>');
						title_report = $.i18n("title_reports_devices");
						break;
				}
				$('#datatable_report').dataTable({
					data: dataSetReport,
					columnDefs: [],
					dom: 'Blfrtip',
					colReorder: true,
					buttons: [{
						extend: 'excelHtml5',
						title: title_report
					}, {
						extend: 'print',
						text: $.i18n('button_print'),
						title: title_report + "<br />",
						customize: function (win) {
							var header = report_parameters + '<img src="' + sessionStorage.getItem('logomark') + '" style="position:absolute; top:0; right:0;" />';

							$(win.document.body)
								.css('font-size', '10pt')
								.css('background-color', '#fff')
								.prepend(
									header
								);
							$(win.document.body).find('table')
								.addClass('compact')
								.css('font-size', 'inherit');
						}
					}]
				});
				$("#panel_form").hide("slow");
				$("#panel_table").show("slow");
				$("#report_back").show();
				doOpenAlertSucess($.i18n("title_success"), $.i18n("title_message_generated"), 1500);

			}
		});
	}
	function formReportClear() {
		$("#report_id").select2("val", "");
		$("#field_device").select2("val", "");
		$("#field_group").select2("val", "");
		$("#report_period").select2("val", "");
		$("#field_disabled").select2("val", "");
		$("#field_event").select2("val", "");	
		if (bandPeriod == 1) {
			$("#field_period_custom").hide();			
			bandPeriod = 0;
		}
		
		doFormClear();
		$('#form_report')[0].reset();
		var clean = $('.select2-search-choice-close');
				$.each(clean, function (key, value) {
					value.click();
				});
	}

function formCommandClear() {
		$("#type_command").select2("val", "");
        $("#custom_command").hide();	
		//if (bandPeriod == 1) {
		//	$("#field_period_custom").hide();			
		//	bandPeriod = 0;
	//	}
		
		doFormClear();
		$('#form_send_command')[0].reset();
		var clean = $('.select2-search-choice-close');
				$.each(clean, function (key, value) {
					value.click();
				});
	}


	
	function plotMarkers() {

		$.each(devices, function (key, value) {

			// markers
			var marker = L.marker([value.latitude, value.longitude], {
				icon: getIcon(value.category, value.name, convertSpeed(value.speed, 'knots'), value.communication, value.alarm, (value.input1Active || value.input2Active), value.deviceId, value.ignition)
			}).on('click', function (e) {
				PanOnClick2(value.deviceId, value.positionId);
			});

			markersGroup.addLayer(marker);

			var objIndex = devices.findIndex((obj => obj.deviceId == value.deviceId));
			devices[objIndex].marker = marker;
			devices[objIndex].popup = $.md5(marker.getLatLng());

		});

		if ((countOffline + countOnline) > 0) {
			mymap.addLayer(markersGroup);

			if (updatingMap == false) {
				mymap.fitBounds(markersGroup.getBounds());
				updatingMap = true;
			}
		}

		if (currentDevice != 0) {
			panTo(currentDevice, false);
		}



	}

//websocket
var ajax = function (method, url, callback) {
	    var xhr = new XMLHttpRequest();
	    xhr.withCredentials = true;
	    xhr.open(method, url, true);
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	            callback(JSON.parse(xhr.responseText));
	        }
	    };
	    if (method == 'POST') {
	        xhr.setRequestHeader('Content-type', 'application/json');
	    }
	    xhr.send()
};

function IniciarConexion(){
	var url = sessionStorage.getItem('url');

    ajax('GET', url + 'session?token=' + sessionStorage.getItem('token'), function(openWebsocket){
    	var socket;
        socket = new WebSocket(sessionStorage.getItem('websocket'));

         socket.onmessage = function (event) {
            var i, j, store, data, array, entity, device, typeKey, alarmKey, text, geofence;
            console.log(event.data);

            var data = JSON.parse(event.data);

            if (data.positions) {
            	doLastPositions(data.positions);
            }

            if (data.devices) {
            	doListDevices();                
            }

            if (data.events) {            	
            	updateAlerts(data.events);
            }
        };

        socket.onclose = function () {
            console.log("WebSocket closed");
            //doLastPositions2();
            	$(location).attr('href', "dashboard.php");
            
        };
    });   
}   

function doUpdateListEvents() { //Actualizacion de eventos al dar click en el boton de alertas
		$('#list_info_table').empty().append($('#events-template').html());

		$("#list_info_body").empty();

		let _devices = devices.reduce(function(acc, device) {
			return acc + "deviceId="+device.deviceId+"&";
		}, '');

       	let dateFrom = 'from='+ moment(new Date()).add(-5, 'm').tz("Etc/GMT+0").format().substr(0, 19) + ".000Z";
		let dateTo = "to=" + moment().endOf(5, 'm').tz("Etc/GMT+0").format().substr(0, 19) + ".000Z";

		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "reports/events/?"+ _devices + dateFrom+"&"+dateTo,
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
                "Accept": "application/json"
			},
			error: function (response) {
				doOpenAlertError($.i18n("message_error_performing"));
			},
			success: function (response) {

				console.log(response);

				let result = _.sortByOrder(response, ['id'], ['desc'])			

				$.each(result, function (key, value) {
					
                        if (key<10) {
							$("#list_info_body").append('<tr>' +
							'<th scope="row"><span onclick="panTo(\'' + value.deviceId + '\', true)" style="cursor:pointer"><i class="fa ' + value.deviceIcon + '"></i> &nbsp;' + findDevice(value.deviceId).name + '</span></th>' +
							'<td>' + findEventType(value.attributes.alarm ? value.type + _.capitalize(value.attributes.alarm) : value.type).name + '</td>' +
							'<td>' + moment(value.serverTime).format('DD-MM-YYYY  HH:mm:ss a') + '</td>' +
							'</tr>');
						}

						eventsAlerts.push({
							id: value.id,
							attributes: {
								alarm:  value.attributes.alarm  
							},
							deviceId: value.deviceId,
							deviceName: findDevice(value.deviceId).name,
							serverTime: value.serverTime,
							type: value.type,
							typeName: findEventType(value.attributes.alarm ? value.type + _.capitalize(value.attributes.alarm) : value.type).name
						});

				});											
			}					
		});						
	}

function doLastPositions2(response) {

			
	/*	if (sessionStorage.getItem('message_load_positions') == "1") {
			$.notify(
				'Actualizando...', "success", {
					position: "right",
					clickToHide: false,
					autoHideDelay: 1000,
					showAnimation: 'slideDown',
					// show animation duration
					showDuration: 400,
					// hide animation
					hideAnimation: 'slideUp',
					// hide animation duration
					hideDuration: 200
				}
			);
		}*/

		$.ajax({
			type: "GET",
			url: sessionStorage.getItem('url') + "positions/",
			cache: false,
			headers: {
				"Authorization": "Basic " + btoa(sessionStorage.getItem('email') + ":" + sessionStorage.getItem('password')),
				"Accept": "application/json"
			},
			error: function (response) {
				switch (response.status) {
					default:
					//	doOpenAlertError($.i18n("message_error_performing"));
						break;
				}
			},
			success: function (response) {

				countOnline = 0;
				countOffline = 0;

				markersGroup.clearLayers();
				listMarkers.splice(0);

				$.each(response, function (key, value) {

					// device
					var device = findDevice(value.deviceId);

					var communication = getTimeLimit(moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss'), device.status);

					var alarm = ((value.attributes.alarm != null ? (value.attributes.alarm == "sos" ? true : false) : false) == true);

					var input1Active = (value.attributes.input1 == null ? false : value.attributes.input1);
					var input2Active = (value.attributes.input2 == null ? false : value.attributes.input2);
                  

					// markers
					var marker = L.marker([value.latitude, value.longitude], {
						icon: getIcon(device.category, device.name, convertSpeed(value.speed, 'knots'), communication, alarm, (input1Active || input2Active), value.deviceId, ('ignition' in value.attributes) ? value.attributes.ignition : "none")
					}).on('click', function (e) {
						PanOnClick2(value.deviceId, value.id);
					});

					listMarkers.push([value.deviceId,marker]);

					markersGroup.addLayer(marker);

					var objIndex = devices.findIndex((obj => obj.deviceId == value.deviceId));
                    var attributes = ("alarm" in value.attributes?value.attributes.alarm:'');
					//Update object's name property.
					devices[objIndex].latitude = value.latitude;
					devices[objIndex].longitude = value.longitude;
					devices[objIndex].course = value.course;
					devices[objIndex].speed = value.speed;
					devices[objIndex].ignition = !("ignition" in value.attributes) ? "none" : value.attributes.ignition;
					//devices[objIndex].alarm = !("alarm" in value.attributes) ? "" : value.attributes.alarm;
                    devices[objIndex].alarm = !("alarm" in value.attributes) ? "" : $.i18n("alarm_events_"+attributes);
					devices[objIndex].protocol = !("protocol" in value) ? "Desconocido" : value.protocol;
					devices[objIndex].time = moment(value.deviceTime).format('YYYY-MM-DD HH:mm:ss')
					devices[objIndex].address = (value.address != null ? value.address : "");
					devices[objIndex].marker = marker;
					devices[objIndex].popup = $.md5(marker.getLatLng());
					devices[objIndex].positionId = value.id;
                    devices[objIndex].hours = !("hours" in value.attributes) ? "" : value.attributes.hours;
                    devices[objIndex].ip = !("ip" in value.attributes) ? "" : value.attributes.ip;
                    devices[objIndex].totalDistance = !("totalDistance" in value.attributes) ? "" : value.attributes.totalDistance;
                    var totalDistanceTemp = round(devices[objIndex].totalDistance/1000,2)+' Km';
                    devices[objIndex].totalDistance = totalDistanceTemp;
                    devices[objIndex].batteryLevel = !("batteryLevel" in value.attributes) ? "" : value.attributes.batteryLevel;
                    devices[objIndex].battery = !("battery" in value.attributes) ? "" : value.attributes.battery;
                    var devicestempHoras = msToTime(devices[objIndex].hours);             
                    devices[objIndex].hours = devicestempHoras;

					if (value.attributes.driverUniqueId) {
						devices[objIndex].driverUniqueId = value.attributes.driverUniqueId;
					}

					if (currentDevice == value.deviceId && activeFollow == true) {
						listCoords[devices[objIndex].id].push([value.latitude, value.longitude])
						doPolyline(value.deviceId);
					} else {
						doRemovePolyline(value.deviceId);
					}

					//footer
					if (value.deviceId == currentDevice) {

						var device_name = devices[objIndex].name;
						if (device_name.length > 40) {
							device_name = device_name.substring(0, 40) + "...";
						}
						$("#panel_device_name").html(device_name);

						$("#panel_device_status").html((devices[objIndex].status == "online" ? '&nbsp;&nbsp;&nbsp;<span class="label label-success">' + $.i18n("title_communication") + '</span>' : '&nbsp;&nbsp;&nbsp;<span class="label label-warning">' + $.i18n("title_no_communication") + '</span>'));
						$("#panel_device_speed").html(convertSpeed(devices[objIndex].speed, 'knots') + findSpeedUnit(sessionStorage.getItem('speedUnit')).title);
						$("#panel_device_course").html(degToCompass(devices[objIndex].course));
						$("#panel_device_battery").html(devices[objIndex].battery);
                        $("#panel_device_protocol").html(devices[objIndex].protocol);
						$("#panel_device_time").html(moment(devices[objIndex].time).format('DD/MM/YYYY HH:mm:ss'));

						var address = devices[objIndex].address;

						if (address.length > 40) {
							address = address.substring(0, 40) + "...";
						}

						$("#panel_device_address").html(address);
						$("#panel_device_movement").html((devices[objIndex].speed > 0 ? $.i18n("title_yes") : $.i18n("title_no")));
						$("#panel_device_alarm").html(devices[objIndex].alarm);

						panorama.setPosition({
							lat: value.latitude,
							lng: value.longitude
						});
						panorama.setPov( /** @type {google.maps.StreetViewPov} */ ({
							heading: value.course,
							pitch: 0
						}));

					}

					if (communication == true) {
						countOffline++;
					} else {
						countOnline++;
					}

				});

				if (openListDevices == true) {

					var search = $("#list_info_search").val();

					if (search.length > 0) {

						var results = _.filter(devices, function (item) {
							return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
						});

						doUpdateListDevices(results);
					} else {
						doUpdateListDevices(devices);
					}

				}

				if ((countOffline + countOnline) > 0) {
					mymap.addLayer(markersGroup);

					if (updatingMap == false) {
						mymap.fitBounds(markersGroup.getBounds());
						updatingMap = true;
					}
				}

				$("#countOffline").html(countOffline);
				$("#countOnline").html(countOnline);

                var cuantoshay = countOnline + countOffline;
                $("#countOfflinea").html("Fuera de linea (" + countOffline + ")");
                $("#countOnlinea").html("En linea (" + countOnline + ")");
                $("#coutAlldev").html("Total (" + cuantoshay + ")");

				//initializeSwitchery();

				filterDevices();
                
                
                ///Comente para doble zoom AQUIIIIIII
				//if (currentDevice != 0) {
				//	panTo(currentDevice, false);
				//}

				checkSession();

				//clearTimeout(lastPositionsTimeOut);

				//lastPositionsTimeOut = setTimeout(doListDevices,1000);

	}
    		});
        	}      
            
            
            
function salida() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n('title_logging_out'));

    $.ajax({
        type: "DELETE",
        url: sessionStorage.getItem('url') + "session/",
        cache: false,
        headers: {
            "Authorization": "Basic " +
                btoa(sessionStorage.getItem('email') + ":" +
                    sessionStorage.getItem('password'))
        },
        error: function (response) {
            /*
             * switch(response.status) { case 400:
             * doOpenAlertError($.i18n("message_user_not_permission"));
             * break; case 401:
             * doOpenAlertError($.i18n("message_user_unauthorized"));
             * break; default:
             * doOpenAlertError($.i18n("message_error_performing"));
             * break; }
             */

             // reset cookies
            $.cookie('email', null);
            $.cookie('password', null);
            $.cookie('remember', null);

            sessionStorage.clear();
            sessionStorage.setItem('logged', '0')
            //$(location).attr('href', "../../login1.php");
            //$(location).attr('href', "provider/" + useris+ '/');
            $(location).attr('href', "provider/" + providerId + '/index.php');
            
            
             //var path= "provider/" + sessionStorage.getItem('providerId') + '/index.php'  ; //-->Editar la ruta
        },
        success: function (response) {
          
              //Si tiene providerID lo muestra  
    if(sessionStorage.getItem('providerId') > "1") {            
	        var providerId = sessionStorage.getItem("providerId");
            sessionStorage.clear();
            sessionStorage.setItem('logged', '0')

            // reset cookies
            $.cookie('email', null);
            $.cookie('password', null);
            $.cookie('remember', null);

            //$(location).attr('href', "../../login1.php");
             $(location).attr('href', "provider/" + providerId + '/index.php');
        
    
	}
    //Si no tiene providerId muestra logo por default de provedor ID 
    //sessionStorage.getItem('userid')   
    if(sessionStorage.getItem('userid') > "0") {
            var userid = sessionStorage.getItem("userid");
            sessionStorage.clear();
            sessionStorage.setItem('logged', '0')

            // reset cookies
            $.cookie('email', null);
            $.cookie('password', null);
            $.cookie('remember', null);

            //$(location).attr('href', "../../login1.php");
             $(location).attr('href', "provider/" + userid + '/index.php');
	}
        }
    });

}          