/**
 * Plugin para a geração de senhas aleatórias para formulários. O script
 * de geração do hash da senha foi desenvolvido pelo Rogério Alencar Lino Filho,
 * o método geraSenha contém mais informações sobre o autor do método. 
 * 
 * @author Carlos A. Junior (carlosjrcabello@gmail.com)
 */
(function($){
	
	$.fn.extend({
		/**
		 * Método para geração de uma senha aletória.
		 * 
		 * @param options - Um array de opções.
		 */
		generatePassword: function(options)
		{
			var defaults = {
				numeroCaracteres				: 25,
				showPasswordInAlertBox			: true,
				showPasswordInJQueryUIDialog	: false,
				showPasswordAfterInputPassword	: true
			};
			
			options = $.extend(defaults, options);
			
			this.each(function(){
				// Input text selecionado.
				var input = $(this);
				
				var password = geraSenha(options);
				
				input.attr('value', password);
				
				showPassword(input, options);
			});
		}
	});
	
	/**
	 * Método privado para apresentar a senha que foi gerada.
	 * 
	 * @param object - referência para o objeto jQuery selecionado.
	 * 
	 * @param options - Um array de opções.
	 * 
	 * @scope - private
	 */
	function showPassword(object, options)
	{
		if(options.showPasswordInAlertBox)
		{
			alert('A senha gerada foi: ' + object.attr('value'));
		}
		if(options.showPasswordInJQueryUIDialog)
		{
			var elementID = new Date().getTime();
			
			$('body').append(
				'<div style="display:none;" id="' + elementID + '">' +
				'<p>A senha gerada foi: <b>' + object.attr('value') + '</b></p>' +
				'<i>Copie esta senha para n&atilde;o perd&ecirc;-la.</i></p>' +
				'<br/>'+
				'<input type="button" value="Fechar" id="bt_' + elementID + '"/>' +
				'</div>'
			);
			$("#" + elementID).dialog({
			   width	: 400,
			   height	: 160,
			   modal	: true,
			   resizable: false,
			   title	: "Senha Gerada",
			   beforeClose: function(){
				   $("#" + elementID).remove();
			   }
			});
			
			$('#bt_' + elementID).bind('click', function(){
				$("#" + elementID).dialog("close");
			});
		}
		if(options.showPasswordAfterInputPassword)
		{
			$('#rspj').remove();
			$('<i id="rspj">A senha gerada foi: <b>' + object.attr('value') + '</b></i>').insertAfter(object);
		}
	}
	
	/**
	 * Método privado para a geração de uma String aletória baseada
	 * numa matriz de caracteres ASCII.
	 * 
	 * @author Rogério Alencar Lino Filho - http://rogeriolino.wordpress.com/2007/09/04/javascript-password-generator/
	 * 
	 * @param options - os parâmetros do plugin jQuery
	 *  
	 * @scope - private
	 */
	function geraSenha (options)
	{
		var password = "";
		
		var ascii = [[48, 57],[64,90],[97,122]];
		
		for ( var i = 0; i < options.numeroCaracteres; i++)
		{
			var floor = Math.floor(Math.random() * ascii.length);
			password += String.fromCharCode(Math.floor(Math.random() * (ascii[floor][1] - ascii[floor][0])) + ascii[floor][0]);
		}
		
		return password;
	}
	
})(jQuery);