var dataSet = [];
var server_attributes = [];
var photo;
var asPhoto = true;
$(document).ready(function () {

	
	/**
	 * Check status of session of user
	 */
	checkSession();
	
	checkPermission();
	
	
    localFormClear();

    /** 
    *initial parameters
    */

   loadSwitchery();

    $('.datatable-js').dataTable({
        columnDefs: []
    });
    
	$('[name="speedLimit"]').formatter({
	    'pattern': '{{999}}'	    
	});
    
        
    
    //$('[name="licence"]').formatter({
      //  'pattern': '{{9999999}}'
    //});
    
    //$('[name="description"]').formatter({
    //    'pattern': '{{9999999}}'
    //});
    
    
    //$('[name="licencetype"]').formatter({
    //    'pattern': '{{9999999}}'
    //});
    
    //$('[name="licencestart"]').formatter({
    //    'pattern': '{{9999999}}'
    //});
    
    //$('[name="licenceend"]').formatter({
    //    'pattern': '{{9999999}}'
    //});
	
	$('#speedUnit').html(findSpeedUnit(sessionStorage.getItem('speedUnit')).title);

    /**
        * parameters this page
        */
	
    $('#form_data').validate({
        errorElement: 'span',        
        focusInvalid: false,
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        rules: {
            name: {
                required: true
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
            }
            else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            }
            else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            }
                // Input group, styled file input
            else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                error.appendTo(element.parent().parent());
            }
            else error.insertAfter(element);
        },

        submitHandler: function (form) {
        },
        invalidHandler: function (form) {
        }
    });

    $('button[name="btnSave"]').click(function () {
        if ($('#form_data').valid()) { doSaveGroups(); };
    });

    $('button[name="btnClear"]').click(function () {
        localFormClear();
    });

    $('a[name="lnkRefreshGrid"]').click(function () {
        refreshGridGroups();
    });
                 
    refreshGridGroups();      

});


 //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY',
        clearButton: true,
         time: false,
        weekStart: 1,
        //lang : (sessionStorage.getItem('language')=='br'?'pt-BR':sessionStorage.getItem('language'))
        lang: (sessionStorage.getItem('language') == 'en' ? 'en' : sessionStorage.getItem('language'))
    });
/**
    * Carrega listagem de dados
    *
    * @return void
    */
 //$("#preview_photo").prop("src", sessionStorage.getItem('logomark')).css('height', '125px').css('width', '200px').css('float', 'left');

    $('#preview_photo').click(function() {
        $("#fileUpload").click();
    });

    $("#fileUpload").change(function() {

        //Para guardar la imagen
        var file_data = $('#fileUpload').prop('files')[0];

        var diveceiId = $('#uniqueId').val();

        var fileExtension = ['jpg', 'png', 'gif'];

        var ext = $(this).val().split('.');

        ext = ext[ext.length - 1].toLowerCase();

        if (fileExtension.lastIndexOf(ext) > -1) {

            var selectedFile = this.files[0];

            if (selectedFile.size > 150000000) {
                doOpenAlertError($.i18n("title_upload_photo_limit"));
            } else {

                doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

                var formData = new FormData();

                formData.append('option', 'profile');
                formData.append('userid', diveceiId);
                formData.append('prefix', prefixpath);
                formData.append('file', file_data);
                $("#preview_photo").prop("src", '').css('height', '125px').css('width', '200px').css('float', 'left');

                $.ajax({
                    url: "assets/apps/commons/upload_drivers.php",
                    type: 'POST',
                    data: formData,
                    success: function(data) {
                        alert(data)
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                    xhr: function() { // Custom XMLHttpRequest
                        var myXhr = $.ajaxSettings.xhr();
                        if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                            myXhr.upload.addEventListener('progress', function() {
                                /* faz alguma coisa durante o progresso do upload */
                            }, false);
                        }
                        return myXhr;
                    },
                    success: function(response) {

                        if (response != 0) {
                            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_sended"), 1500);

                            photo = response;
                            console.log('response=' + response)
                                //$("#profile_photo").attr('src', 'assets/img/devices/' + photo);
                            $("#preview_photo").prop("src", 'assets/img/drivers/' + photo).css('height', '125px').css('width', '200px').css('float', 'left');
                            asPhoto = true;
                            /*
                            var selectedFile = this.files[0];
                            selectedFile.convertToBase64(function(base64) {
                                $("#preview_photo").attr('src', base64).css('height', '125px').css('width', '200px').css('float', 'right');
                                photo = response;
                                asPhoto = true;

                            });*/

                            /*$("#profile_photo").attr('src', 'assets/img/users/' + sessionStorage.getItem('userid') + '.jpg');
                            $("#user_photo").attr('src', 'assets/img/users/' + sessionStorage.getItem('userid') + '.jpg');

                            $("#profile_photo").attr('src', $("#profile_photo").attr('src') + '?' + Math.random());
                            $("#user_photo").attr('src', $("#user_photo").attr('src') + '?' + Math.random());
*/
                        } else {
                            doOpenAlertError($.i18n("message_error_send"));
                        }
                    }
                });

            }

        } else {
            doOpenAlertError($.i18n("message_file_invalid"));
        }


    });


function refreshGridGroups() {

    var params = new Object();
    params.id = '0';

   $.ajax({
		type : "get",
		url : sessionStorage.getItem('url') + "drivers/",
/**		data:params, */		
		cache: false,		
		headers: {
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
		error: function (response) {		
			switch(response.status) {			
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

            // Javascript sourced data
            dataSet.splice(0);            

            $.each(response, function (key, value) {

                var html = '<div class="btn-group" style="float:right">';
                html += '    <button type="button" class="btn btn-primary btn-icon dropdown-toggle" data-toggle="dropdown">';
                html += '    	<i class="icon-menu7"></i> &nbsp;<span class="caret"></span>';
                html += '    </button>';

                html += '    <ul class="dropdown-menu dropdown-menu-right">';
                html += '    	<li><a href="javascript:doEditGroups(' + value.id + ')"><i class="icon-cogs"></i> '+$.i18n("title_edit")+'</a></li>';
                html += '    	<li><a href="javascript:doDeleteGroups(' + value.id + ')"><i class="icon-trash"></i>' +$.i18n("title_delete")+'</a></li>';
                if (("photo" in value)) { 
                    html += '    	<li><a href="javascript:doShowPhoto(' + value.id + ')"><i class="icon-picture"></i>' + $.i18n("title_photo") + '</a></li>';
                }
                html += '    </ul>';
                html += '</div>';
                var licence = ("licence" in value.attributes?value.attributes.licence:'');
                var description = ("description" in value.attributes?value.attributes.description:'');
                var licencetype = ("licencetype" in value.attributes?value.attributes.licencetype:'');
                var licencestar = ("licencestar" in value.attributes?value.attributes.licencestar:'');
                var licenceend = ("licenceend" in value.attributes?value.attributes.licenceend:'');
                //var photo = ("photo" in value.attributes ? value.attributes.photo : '');
                //var antiquity = ("antiquity" in value.attributes?value.attributes.antiquity:'');
                //var rfc = ("rfc" in value.attributes?value.attributes.rfc:'');
                //var nationality = ("nationality" in value.attributes?value.attributes.nationality:'');
                var photo = ("photo" in value.attributes ? value.attributes.photo : '');
               
               ruta = "";
                if(photo == ""){
                    ruta = "assets/img/sin-imagen.jpg";
                }else{
                    ruta = "assets/img/drivers/" + photo;
                }
                
                   
                

                dataSet.push([value.id, ('<img src="'+ruta+'"  width="50" height="50">'), value.name, description, value.uniqueId, licence,  licencestar, licenceend, html]);

            });

            $('.datatable-js').dataTable().fnDestroy();

            $('.datatable-js').dataTable({
                data: dataSet,
                columnDefs: [],
                dom: 'Blfrtip',
                responsive: true,
                colReorder: true,
                buttons: [
                /*{
                    extend: 'excelHtml5',
                    title: $.i18n("title_rfid"),
                    exportOptions: {
                        columns: [0, 1,2,3,4,5,6]
                    }
                }, */
                {
                    extend: 'print',
                    text: $.i18n('button_print'),
                    title: $.i18n("title_rfid"),
                    customize: function (win) {
                       var header = '<img src="' + sessionStorage.getItem('logomark') + '" style="position:absolute; top:0; right:0;" />';
                            // '<img src="' + sessionStorage.getItem('logomark') + '" style="position:absolute; top:0; right:0;" />';
                            //'<img src="assets/img/logo.jpg" style="position:absolute; top:0; right:0;" />';

                        $(win.document.body)
                            .css('font-size', '10pt')
                            .css('background-color', '#fff')
                            .prepend(
                                header
                            );

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    },
                    exportOptions: {
                        columns: [0, 1, 2,3,4,5,6]
                    }
                }]
            });           

        }

    });


}


/**
    * Grava formulario no banco de dados
    *  
    * @return void
    */

function doSaveGroups() {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_saving"));

    var pars = $("#form_data").serializeObject();
		pars.id = (!$("#id").val()?null:$("#id").val());
        laphoto = "";
    if (asPhoto == true) {
        laphoto = photo;
    }
		pars.attributes = { description: $("#description").val(),
							speedLimit: $("#speedLimit").val(),
                            licence: $("#licence").val(),
                            licencetype: $("#licencetype").val(),  
                            licencestar: $("#licencestar").val(),
                            licenceend: $("#licenceend").val(),
                            rfc: $("#rfc").val(),
                            nationality: $("#nationality").val(),
                             photo: laphoto,
                            antiquity: $("#antiquity").val()  
                             						
                          };        					
                          
        pars.attributes = mergeAttributes(pars.attributes, server_attributes);
		
		delete pars.speedLimit;
		delete pars.description;
        delete pars.licence;
        delete pars.licencetype;
        delete pars.licencestar;
        delete pars.licenceend;
        delete pars.rfc;
        delete pars.nationality;
        delete pars.antiquity;
        
		
    $.ajax({
        type : (!$("#id").val()?"POST":"PUT"),
		url : sessionStorage.getItem('url') + "drivers/"+$("#id").val(),
		data:JSON.stringify(pars),
		contentType: 'application/json', 
		cache: false,					
		headers: {
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
		error: function (response) {					
			switch(response.status) {			
				case 400:
					 mensaje = response.responseText;
                    validacion = mensaje.split(" ");
                    if(validacion[0] == "Duplicate"){
                        doOpenAlertError("El ID del conductor ya se encuentra registrado");
                    }else{
                        doOpenAlertError($.i18n("message_user_not_permission"));
                    }
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

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_saved"), 1500);

            localFormClear();

            setTimeout(function () {
                refreshGridGroups();
            }, 1500);


        }

    });

}


/**
    * Apaga registro da tabela
    * 
    * param id Integer
    * 
    * @return void
    */

function doDeleteGroups(id) {

    swal({
        title: $.i18n("title_confirm_delete"),
        text: $.i18n("title_message_delete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        closeOnConfirm: false
    },
    function () {

        doOpenAlertWait($.i18n("title_wait"), $.i18n("title_deleting"));

        $.ajax({
            type: "DELETE",
            url : sessionStorage.getItem('url') + "drivers/"+id,			
			contentType: "application/json; charset=utf-8", 
			cache: false,					
			headers: {
	        	"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
	        },
			error: function (response) {		
				switch(response.status) {			
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

          	  doOpenAlertSucess($.i18n("title_removed"), $.i18n("title_message_removed"), 1500);

          	  refreshGridGroups();

            }

        });
    });

}

/**
    * Carrega registro para edicao
    * 
    * param id Integer 
    *
    * @return void
    */

function doEditGroups(id) {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));
var posid = ""
    localFormClear();
 $("#field_photo").show();
    //console.log('lapos=' + id)

    $.ajax({
       type : "get",
		url : sessionStorage.getItem('url') + "drivers/",
		cache: false,		
		headers: {
        	"Authorization": "Basic " + btoa(sessionStorage.getItem('email')+":"+sessionStorage.getItem('password'))
        },
		error: function (response) {		
			switch(response.status) {			
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

            $.each( response, function( key, value ) {
            	
            	if (value.id == id) {

                    $('input[name="id"]').val($.trim(value.id));
                                        
                    $('input[name="name"]').val(value.name);      
                    
                     $('input[name="uniqueId"]').val(value.uniqueId);   
                     
                     $('input[name="licence"]').val(!("licence" in value.attributes) ? "" : value.attributes.licence);
                     $('input[name="description"]').val(!("description" in value.attributes) ? "" : value.attributes.description);
                     
                      $('input[name="licencetype"]').val(!("licencetype" in value.attributes) ? "" : value.attributes.licencetype);   
                       $('input[name="licencestar"]').val(!("licencestar" in value.attributes) ? "" : value.attributes.licencestar);   
                        $('input[name="licenceend"]').val(!("licenceend" in value.attributes) ? "" : value.attributes.licenceend);          

                       
                        $('input[name="rfc"]').val(!("rfc" in value.attributes) ? "" : value.attributes.rfc); 
                         $('input[name="antiquity"]').val(!("antiquity" in value.attributes) ? "" : value.attributes.antiquity); 
                          $('input[name="nationality"]').val(!("nationality" in value.attributes) ? "" : value.attributes.nationality); 
                        posid = value.positionId
                   asPhoto = false;
                    photo = "";
                    photo = (value.attributes.photo == null ? "" : value.attributes.photo)
                    if (photo != '') {
                        asPhoto = true;
                        $("#field_photo").show();
                        $("#preview_photo").prop("src", "assets/img/drivers/" + photo).css('height', '125px').css('width', '200px').css('float', 'right');
                    }
                    
                   
                    
                    //$('input[name="speedLimit"]').val((value.attributes.speedLimit== null?"":value.attributes.speedLimit));

                    server_attributes =value.attributes;                    
            	}
                    
			});
            // finish fields

            doOpenAlertSucess($.i18n("title_success"), $.i18n("title_loaded"), 1500);

            $('#pane_form').click();


	   }

	});

}



function doShowPhoto(id) {

    doOpenAlertWait($.i18n("title_wait"), $.i18n("title_loading_data"));

    $.ajax({
        type: "get",
        url: sessionStorage.getItem('url') + "drivers/",
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

            $.each(response, function (key, value) {

                if (value.id == id) {


                    if (("photo" in value)) {
                        
                        $("#displayPhotoTitle").html(value.name);
                        $("#displayPhotoPreview").attr("src",value.photo).css('height', '125px').css('width', '200px');
                        $("#displayPhoto").click();                                                                                        
                        
                    } else {
                        doOpenAlertError('Conductor sin imagen');
                    }

                }

            });


        }

    });

}

$(document).on('click', '#close-preview', function() {
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function() {
            $('.image-preview').popover('show');
        },
        function() {
            $('.image-preview').popover('hide');
        }
    );
});

$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type: "button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class", "close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger: 'manual',
        html: true,
        title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
        content: "There's no image",
        placement: 'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function() {
        $('.image-preview').attr("data-content", "").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Seleccionar");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function() {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 250,
            height: 200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function(e) {
            $(".image-preview-input-title").text("Cambiar");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});



function localFormClear() {
    doFormClear();
    
 
    asPhoto = false;
    photo = "";
    $("#preview_photo").prop("src", sessionStorage.getItem('logomark')).css('height', '125px').css('width', '200px').css('float', 'right');
    $("#field_photo").hide();
    //$("#field_photo").show();

    
    
         
}