$(document).ready(function () {
	/**
	 * Check status of session of user
	 */
	checkSession();
	
	$("#server_ip").html(sessionStorage.getItem('server_ip'));
	//checkPermission();

});
