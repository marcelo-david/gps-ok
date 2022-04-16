<?php	
	include_once "header.php";
?>
<!-- Bootstrap Material Datetime Picker Css -->
<link href="assets/js/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css" rel="stylesheet" />
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
<!-- datatables buttons-->
<link href="assets/js/plugins/tables/datatables3/datatables.min.css" rel="stylesheet" type="text/css">

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="https://code.highcharts.com/modules/drilldown.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

<!-- MAIN CONTENT -->
<div class="main-content">
    <div class="container-fluid">
        <h3 class="page-title" data-i18n="mnu_task">Reports Events</h3>
        <div class="panel panel-headline">
            <div class="panel-body">

                <div class="tab-content">							  
                    <form id="form_report" method="post" action="#" enctype="application/x-www-form-urlencoded"  role="form" >
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label style="font-weight:normal">Tareas</label>
                                <select class="select-search" id="tarea" name="tarea[]" multiple="multiple">											                    											                    											                    
                                    <option value="" >Selecione una opción...</option>	
                                                                    </select>
                            </div>
                        </div>
                        <!--                        <div class="form-group">
                                                    <label style="font-weight:normal" >Estado</label>
                                                    <select class="select-search" id="estado" name="estado">											                    											                    											                    
                                                        <option value="" >Selecione una opción...</option>
                                                                                            <option value="1"  >En proceso</option>
                                                                                            <option value="2"  >Llegada a tiempo</option>
                                                                                            <option value="-1"  >Con retraso</option>
                                                                                            <option value="-2"  >No iniciada</option>
                                                                                            <option value="0"  >Sin rutas asignadas</option>
                                                                            </select>
                                                </div>-->
                        <div class="row form-group">
                            <div clasS="col-md-6">
                                <label style="font-weight:normal" >Fecha Inicial</label>
                                <input type="text" class="form-control datetimepicker" value="" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99"  id="fechaInicial" name="fechaInicial">
                            </div>
                            <div clasS="col-md-6">
                                <label style="font-weight:normal" >Fecha Fin</label>
                                <input type="text" class="form-control datetimepicker" value="" maxlength="20" placeholder="" data-mask="99/99/9999 99:99:99"  id="fechaFin" name="fechaFin">
                            </div>
                        </div>		                                                                                                                                                      

                        <div class="text-right">
                            <button type="submit" class="btn btn-primary" name="btnGenerate"><span data-i18n="button_generate">Generate</span><i class="icon-arrow-right14 position-right"></i></button>
                            &nbsp; &nbsp; &nbsp;
                            <button class="btn" type="reset" name="btnClear" > <i class="icon-undo bigger-110"></i> <span data-i18n="button_clear">Clear</span> </button>                                                           
                        </div>                                                                                            
                    </form>
                    <hr />
                    <div class="table-responsive">
                        <table class="table datatable-js" id="datatable">
                            <thead>
                                <tr>                
                                    <th class="center">ID</th>   
                                    <th class="center">Nombre de tarea</th>
                                    <th class="center">Nota</th>
                                    <th class="center">Fecha creación</th>
                                    <!--<th class="center">Estado</th>-->
                                    <th class="center">Actividades</th>

                                </tr>
                            </thead>
                            <tbody>
                                                            </tbody>
                        </table>
                    </div>			  							
                </div>
            </div>
        </div>
    </div>

    <div class="modal fullscreen-modal fade" id="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Actividades</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                    <th style="vertical-align: middle;color:white;background-color:#329CE9">ID</th>
                                    <th style="vertical-align: middle;color:white;background-color:#329CE9">Device</th>
                                    <th style="vertical-align: middle;color:white;background-color:#329CE9">Note</th>
                                    <th style="vertical-align: middle;color:white;background-color:#329CE9">Direction</th>
                                    <th style="vertical-align: middle;color:white;background-color:#329CE9">Deliver date</th>
                                    <th style="vertical-align: middle;color:white;background-color:#329CE9">Final date</th>
                                    <th style="vertical-align: middle;color:white;background-color:#329CE9">Actual date</th>
                                    <th style="vertical-align: middle;color:white;background-color:#329CE9">State</th>
                                    </thead>
                                    <tbody id="tbActividades"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <figure class="highcharts-figure">
                            <div id="container"></div>
                            <p class="highcharts-description">
                            <!--Texto-->
                            </p>
                        </figure>
                    </div>
                </div>
                <div class="modal-footer">
                    <!--<button type="button" class="btn btn-primary">Save changes</button>-->
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- END MAIN CONTENT -->

    <!-- Javascript -->
    <script src="assets/js/jquery/jquery-2.1.0.min.js"></script>
    <script src="assets/js/bootstrap/bootstrap.min.js"></script>
    <script src="assets/js/plugins/toastr/toastr.min.js"></script>
    <script src="assets/js/plugins/forms/selects/select2.min.js"></script>
    <script src="assets/js/plugins/forms/styling/uniform.min.js"></script>                	           
    <script src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
    <script src="assets/js/plugins/ui/moment/moment.min.js"></script>
    <script src="assets/js/plugins/ui/moment/moment_locales.min.js"></script>
    <script src="assets/js/plugins/ui/moment/moment-timezone.js"></script>
    <!-- Bootstrap Material Datetime Picker Plugin Js -->
    <script src="assets/js/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js"></script>	            	
    <script src="assets/js/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <script src="assets/js/plugins/forms/inputs/formatter.min.js"></script>		
    <script src="assets/js/plugins/forms/selects/select2.min.js"></script>
    <script src="assets/js/plugins/notifications/sweet_alert.min.js"></script>
    <script src="assets/js/plugins/forms/inputs/autosize.min.js"></script>
    <script src="assets/js/plugins/forms/inputs/formatter.min.js"></script>
    <script src="assets/js/plugins/yspeed.js"></script>		
    <script src="assets/js/plugins/underscore-min.js"></script>	            			
    <script src="assets/js/plugins/forms/validation/validate.min.js"></script>
    <script src="assets/js/plugins/i8n/jquery.i18n.js"></script>
    <script src="assets/js/plugins/i8n/jquery.i18n.messagestore.js"></script>
    <script src="assets/js/apps/i8n.js"></script>
    <script src="assets/js/klorofil.min.js"></script>

    <!-- datatable export -->	
    <script src="assets/js/plugins/tables/datatables3/datatables.min.js"></script>

    <script src="assets/js/apps/general.js"></script>	


    <script>
        $(document).ready(function () {
            $('.datetimepicker').bootstrapMaterialDatePicker({
                format: 'YYYY/MM/DD HH:mm:ss',
                clearButton: true,
                weekStart: 1,
                //lang : (sessionStorage.getItem('language')=='br'?'pt-BR':sessionStorage.getItem('language'))
                lang: (sessionStorage.getItem('language') == 'es' ? 'es' : sessionStorage.getItem('language'))
            });


            $('.consultarActividad').click(function () {
                Id_tarea = $(this).attr("Id_tarea");
                $('#tbActividades *').remove()
                $.post('report_task.php?ajaxActividades=1', {Id_tarea: Id_tarea}).done(function (msg) {
                    msg = jQuery.parseJSON(msg)
                    var table = ""
                    $.each(msg['tabla'], function (key, val) {
                        table += "<tr>";
                        table += "<td>" + val.Id_actividad + "</td>";
                        table += "<td>" + val.Name_device + "</td>";
                        table += "<td>" + val.Pedido + "</td>";
                        table += "<td>" + val.Direccion + "</td>";
                        table += "<td>" + val.Fecha_entrega + "</td>";
                        table += "<td>" + val.Fecha_final + "</td>";
                        table += "<td>" + val.Fecha_real + "</td>";
                        table += "<td>" + val.est_nombre + "</td>";
                        table += "</tr>";
                    })
                    
                    grafica(msg['grafica']);
                    
                    $('#tbActividades').append(table)
                    $('#modal').modal("show");
                })
            })
        })

function grafica(msg){

        // Create the chart
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Delivery task statuses'
            },
            subtitle: {
                text: 'Below you can see what activities were carried out on this delivery route'
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Conteo total de tareas de entrega'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.0f}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
            },
            series: [
                {
                    name: "Browsers",
                    colorByPoint: true,
                    data: msg
//                            datosGrafica
                           
                }
            ]
        });
        }
    </script>

    <style type="text/css">
        /*
        Full screen Modal 
        */
        .fullscreen-modal .modal-dialog {
            margin: 0;
            margin-right: auto;
            margin-left: auto;
            width: 100%;
        }
        @media (min-width: 768px) {
            .fullscreen-modal .modal-dialog {
                width: 768px;
            }
        }
        @media (min-width: 992px) {
            .fullscreen-modal .modal-dialog {
                width: 992px;
            }
        }
        @media (min-width: 1200px) {
            .fullscreen-modal .modal-dialog {
                width: 1200px;
            }
        }
        .highcharts-figure, .highcharts-data-table table {
            min-width: 310px; 
            max-width: 600px;
            margin: 1em auto;
        }

        #container {
            height: 350px;
        }

        .highcharts-data-table table {
            font-family: Verdana, sans-serif;
            border-collapse: collapse;
            border: 1px solid #EBEBEB;
            margin: 10px auto;
            text-align: center;
            width: 100%;
            max-width: 600px;
        }
        .highcharts-data-table caption {
            padding: 1em 0;
            font-size: 1.2em;
            color: #555;
        }
        .highcharts-data-table th {
            font-weight: 600;
            padding: 0.5em;
        }
        .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
            padding: 0.5em;
        }
        .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
            background: #f8f8f8;
        }
        .highcharts-data-table tr:hover {
            background: #f1f7ff;
        }
    </style>
<?php	
	include_once "footer.php";
?>