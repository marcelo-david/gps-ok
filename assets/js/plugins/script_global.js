//************************************************************************************
function abreMensagem(val) {
	jQuery.blockUI({
		message : "<div id='msgAjax'>" + val + "</div>",
		css : {
			border : 'none',
			padding : '15px',
			backgroundColor : '#000',
			'-webkit-border-radius' : '10px',
			'-moz-border-radius' : '10px',
			opacity : .9,
			color : '#fff',
			width : '30%',
			top : '0%',
			left : '35%',
			centerX : true,
			centerY : true,
			cursor : 'default'
		}
	});

}

function fechaMensagem() {
	jQuery.unblockUI();
}

function atualizaMensagem(val) {
	document.getElementById("msgAjax").innerHTML = val;
			//+ "<p align='center'><input class='button_send' type='button' value=' OK ' onclick='fechaMensagem();'></p>";
}

function checkForEnter(event) {
	if (event.keyCode == 13) {
		currentBoxNumber = textboxes.index(this);
		if (textboxes[currentBoxNumber + 1] != null) {
			nextBox = textboxes[currentBoxNumber + 1]
			nextBox.focus();
			nextBox.select();
			event.preventDefault();
			return false;
		}
	}
}

function AtivarEnterEmulation() {
	// textboxes = $('input.data-entry')

	textboxes = jQuery("input, select, textarea");

	if (jQuery.browser.mozilla) {
		textboxes.keypress(checkForEnter);
	} else {
		textboxes.keydown(checkForEnter);
	}
}

function cleanForm(form)

{
	var inputs = jQuery('#' + form + ' :input');

	inputs.each(function(i, elemento) {
		if ((elemento.type == 'text') || (elemento.type == 'hidden')) {
			elemento.value = '';
		}
	});

}

// *************************************************************************************
// Função Trim(str)
//
// Funcionnalidade: Retirar os espaço vazios.
// Parâmetros : str = variável ou elemento do documento.
// Exemplo : var_retorno = trim(var);
// *************************************************************************************

function Trim(str) {

	return str.replace(/^\s+|\s+$/g, "");

}

function replaceAll(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
 		string = string.replace(token, newtoken);
	}
	return string;
}
// *************************************************************************************
// Função strpos( haystack, needle, offset)
//
// Funcionnalidade: Retorna a posição de um texto baseado em outro.
// Parâmetros : haystack = texto ou palavra ; needle = texto, plavra ou letra a
// ser buscada ; offset = numero maximo de saltos
// Exemplo : strpos('Kevin van Zonneveld', 'e', 5);
// returns : 14
// *************************************************************************************

function strpos(haystack, needle, offset) {

	var i = (haystack + '').indexOf(needle, offset);
	return i === -1 ? false : i;
}

// *************************************************************************************
// Função Atualiza_Opener()
//
// Funcionnalidade: Atualiza a página opener da popup que chamar a função.
// *************************************************************************************

function Atualiza_Opener() {

	window.opener.location.reload();
}

// ****************************************************************************************************************************************************************

function insertOption(sel, val, text) {
	var y = document.createElement('option');
	y.value = val
	y.text = text

	var x = document.getElementById(sel);
	try {
		x.add(y, null); // standards compliant
	} catch (ex) {
		x.add(y); // IE only
	}
}

// *********************************************************************************

function limpaSelect(sel) {

	var x = document.getElementById(sel)

	for (i = x.length - 1; i >= 1; i--) {
		x.remove(i);
	}
}

/*******************************************************************************
 * remove registros de tabelas
 * 
 * @author Michaell Oliveira
 * 
 * @param table
 *            tabela
 * @return void
 ******************************************************************************/

function deleteTableRows(table) {
	var rows = table.rows.length;

	for (i = 1; i < rows; i++) {
		table.deleteRow(i);
	}

}

// *************************************************************************************
// Função getCheckedValue()
//
// Funcionnalidade: Verifica qual botão do tipo radio está marcado.
// Parâmetros : radioObj = instância do elemento radio.
// Exemplo : var opcao = getCheckedValue(document.getElementById("radio"));
// *************************************************************************************

function getCheckedValue(radioObj) {
	if (!radioObj)
		return "";

	var radioLength = radioObj.length;

	if (radioLength == undefined)

		if (radioObj.checked)

			return radioObj.value;

		else

			return "";

	for ( var i = 0; i < radioLength; i++) {

		if (radioObj[i].checked) {

			return radioObj[i].value;

		}

	}

	return "";

}

/* validacao de form modal */
function updateTips(t) {
	tips.text(t).addClass("ui-state-highlight");
	setTimeout(function() {
		tips.removeClass("ui-state-highlight", 1500);
	}, 500);
}

function checkLength(o, n, min, max) {
	if (o.val().length > max || o.val().length < min) {
		o.addClass("ui-state-error");
		updateTips("Os Caracteres de " + n + " precisa estar entre " + min
				+ " e " + max + ".");
		return false;
	} else {
		return true;
	}
}

function checkRegexp(o, regexp, n) {
	if (!(regexp.test(o.val()))) {
		o.addClass("ui-state-error");
		updateTips(n);
		return false;
	} else {
		return true;
	}
}

// ********************************************************************************************************************************************

function pausecomp(millis) { 
	
	var date = new Date(); 
	var curDate = null;
 
	do { 
		curDate = new Date(); 
	} while (curDate-date < millis); 
	
}

/*
 *
 * 
 * function buscaArray(arr, valeur) { for (var i in arr) { if (arr[i][0] ===
 * valeur) return i; } return -1; } /* function abreForm(val) { J.blockUI({
 * message: val, css: { border: 'none', padding: '15px', backgroundColor:
 * '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px',
 * opacity: .9, color: '#ffffff', width:'78%', top: '10%', left: '10%', centerX:
 * true, centerY: true, cursor: 'default' } }); }
 * 
 * function abreMensagem(val) { J.blockUI({ message: "<div id='msgAjax'
 * name='msgAjax'>"+val+"</div>", css: { border: 'none', padding: '15px',
 * backgroundColor: '#000', '-webkit-border-radius': '10px',
 * '-moz-border-radius': '10px', opacity: .9, color: '#fff' } }); }
 * 
 * function abreSenha(val) { J.blockUI({ message: "<div id='msgAjax'
 * name='msgAjax'>"+val+"</div>", css: { border: 'none', padding: '15px',
 * backgroundColor: '#000', '-webkit-border-radius': '10px',
 * '-moz-border-radius': '10px', opacity: .9, color: '#fff', width:'30%', top:
 * '30%', left: '35%', centerX: true, centerY: true, cursor: 'default' } }); }
 * 
 * 
 * 
 * //************************************************************************************* //
 * Constante clientNavigator // //Funcionnalidade: Verifica qual o browser do
 * visitante e armazena na variável púbica clientNavigator, // Caso Internet
 * Explorer(IE) outros (Other) //Exemplo : if(clientNavigator == "IE" { ... }
 * //*************************************************************************************
 * if (navigator.appName.indexOf('Microsoft') != -1){
 * 
 * clientNavigator = "IE";
 * 
 * }else{
 * 
 * clientNavigator = "Other"; }
 */
// *************************************************************************************
// Constante getWidth
//
// Funcionnalidade: Obtem a area utilizavel do navegador
// Exemplo : getWidth()
// *************************************************************************************
function getWidth() {
	// Thiago Marotta Couto
	// thiagomarotta@gmail.com
	// http://isbyte.com/
	// December, 06 - 2008
	return window.innerWidth ? window.innerWidth : /* For non-IE */
	document.documentElement ? document.documentElement.clientWidth : /*
																		 * IE 6+
																		 * (Standards
																		 * Compilant
																		 * Mode)
																		 */
	document.body ? document.body.clientWidth : /* IE 4 Compatible */
	window.screen.width; /*
							 * Others (It is not browser window size, but screen
							 * size)
							 */
}
function getHeight() {
	// Thiago Marotta Couto
	// thiagomarotta@gmail.com
	// http://isbyte.com/
	// December, 06 - 2008
	return window.innerHeight ? window.innerHeight : /* For non-IE */
	document.documentElement ? document.documentElement.clientHeight : /*
																		 * IE 6+
																		 * (Standards
																		 * Compilant
																		 * Mode)
																		 */
	document.body ? document.body.clientHeight : /* IE 4 Compatible */
	window.screen.height; /*
							 * Others (It is not browser window size, but screen
							 * size)
							 */
}
/**
 * //************************************************************************************* //
 * Constante antiCacheRand // //Funcionnalidade: Auxilia nas URLs para impedir o
 * cache das paginas //Exemplo : var url = antiCacheRand(url)
 * //*************************************************************************************
 * function antiCacheRand(aurl){ //Adiciona um parametro randomico à
 * querystring. By Micox (micoxjcgATyahooPONTOcomPONTObr). var dt = new Date();
 * 
 * if(aurl.indexOf("?")>=0){ // já tem parametros return aurl + "&" +
 * encodeURI(Math.random() + "_" + dt.getTime());
 * 
 * }else{
 * 
 * return aurl + "?" + encodeURI(Math.random() + "_" + dt.getTime()); } }
 * 
 */
/*
 * Function : dump() Arguments: The data - array,hash(associative array),object
 * The level - OPTIONAL Returns : The textual representation of the array. This
 * function was inspired by the print_r function of PHP. This will accept some
 * data as the argument and return a text that will be a more readable version
 * of the array/hash/object that is given.
 */

function dump(arr, level) {
	var dumped_text = "";
	if (!level)
		level = 0;

	// The padding given at the beginning of the line.
	var level_padding = "";
	for ( var j = 0; j < level + 1; j++)
		level_padding += "    ";

	if (typeof (arr) == 'object') { // Array/Hashes/Objects
		for ( var item in arr) {
			var value = arr[item];

			if (typeof (value) == 'object') { // If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value, level + 1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value
						+ "\"\n";
			}
		}
	} else { // Stings/Chars/Numbers etc.
		dumped_text = "===>" + arr + "<===(" + typeof (arr) + ")";
	}
	return dumped_text;
}
/*
 * //************************************************************************************* //
 * Função selectoption // //Funcionalidade: Seleciona opção em um select caso o
 * valor seja igual ao parametro passado. //Exemplo :
 * selectoption(document.getElementById('btteste'), 'teste')
 * //*************************************************************************************
 * 
 * 
 * function selectoption(_sel, _val) { var combo = _sel;
 * 
 * var _opt = -1;
 * 
 * for(var i=0;i<combo.options.length;i++) { if (combo.options[i].value ==
 * _val) { _opt = i; } }
 * 
 * if (_opt > -1) { combo.options[_opt].selected = true; } }
 * //************************************************************************************* //
 * Função simulateMouse // //Funcionalidade: Simula evento do mouse em
 * navegadores Firefox, opera, safari, //Exemplo :
 * isimulateMouse(document.getElementById('btteste'), 'click')
 * //*************************************************************************************
 * 
 * function simulateMouse(element, eventName) { var oEvent =
 * document.createEvent("MouseEvents");
 * 
 * oEvent.initMouseEvent(eventName, true, true, document.defaultView, 1, 0, 0,
 * 0, 0, false, false, false, false, 0, document.getElementById(element));
 * 
 * document.getElementById(element).dispatchEvent(oEvent); }
 * 
 * //************************************************************************************* //
 * Função str_replace() // //Funcionalidade: Substitui todas as ocorrências da
 * string de procura com a string de substituição. //Parâmetros : search = Valor
 * procurado // replace = Valor a ser substituido // subject = string com o
 * texto //Exemplo : var _val = str_replace("%body%", "black", "<body
 * text='%body%'>");
 * //*************************************************************************************
 * function str_replace (search, replace, subject, count) { //
 * http://kevin.vanzonneveld.net // + original by: Kevin van Zonneveld
 * (http://kevin.vanzonneveld.net) // + improved by: Gabriel Paderni // +
 * improved by: Philip Peterson // + improved by: Simon Willison
 * (http://simonwillison.net) // + revised by: Jonas Raoni Soares Silva
 * (http://www.jsfromhell.com) // + bugfixed by: Anton Ongson // + input by:
 * Onno Marsman // + improved by: Kevin van Zonneveld
 * (http://kevin.vanzonneveld.net) // + tweaked by: Onno Marsman // + input by:
 * Brett Zamir (http://brett-zamir.me) // + bugfixed by: Kevin van Zonneveld
 * (http://kevin.vanzonneveld.net) // + input by: Oleg Eremeev // + improved by:
 * Brett Zamir (http://brett-zamir.me) // + bugfixed by: Oleg Eremeev // % note
 * 1: The count parameter must be passed as a string in order // % note 1: to
 * find a global variable in which the result will be given // * example 1:
 * str_replace(' ', '.', 'Kevin van Zonneveld'); // * returns 1:
 * 'Kevin.van.Zonneveld' // * example 2: str_replace(['{name}', 'l'], ['hello',
 * 'm'], '{name}, lars'); // * returns 2: 'hemmo, mars'
 * 
 * var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0, f =
 * [].concat(search), r = [].concat(replace), s = subject, ra = r instanceof
 * Array, sa = s instanceof Array; s = [].concat(s); if (count) {
 * this.window[count] = 0; }
 * 
 * for (i=0, sl=s.length; i < sl; i++) { if (s[i] === '') { continue; } for
 * (j=0, fl=f.length; j < fl; j++) { temp = s[i]+''; repl = ra ? (r[j] !==
 * undefined ? r[j] : '') : r[0]; s[i] = (temp).split(f[j]).join(repl); if
 * (count && s[i] !== temp) { this.window[count] +=
 * (temp.length-s[i].length)/f[j].length;} } } return sa ? s : s[0]; }
 *  /*
 * 
 * 
 * function abreJanela(msg, modal) {
 * 
 * var _val = "";
 * 
 * if (modal == true) {
 * 
 * _val = "&modal=true"; } var url =
 * "#TB_inline?height=450&width=800"+_val+"&inlineId=AreaVisualizar";
 * 
 * document.getElementById("btnabre_status").href=url;
 * 
 * if (navigator.appName.indexOf('Microsoft') != -1){
 * 
 * document.getElementById("btnabre_status").click(); } else {
 * 
 * simulateMouse( 'btnabre_status' , 'click' ); }
 * 
 * document.getElementById("load_Ajax_Visualizar").style.display='block';
 * 
 * document.getElementById("load_Ajax_Visualizar").innerHTML=msg }
 * 
 * function fechaJanela() {
 * 
 * tb_remove(); }
 * 
 */

function number_format( number, decimals, dec_point, thousands_sep ) {
    // %        nota 1: Para 1000.55 retorna com precisão 1 no FF/Opera é 1,000.5, mas no IE é 1,000.6
    // *     exemplo 1: number_format(1234.56);
    // *     retorno 1: '1,235'
    // *     exemplo 2: number_format(1234.56, 2, ',', ' ');
    // *     retorno 2: '1 234,56'
    // *     exemplo 3: number_format(1234.5678, 2, '.', '');
    // *     retorno 3: '1234.57'
    // *     exemplo 4: number_format(67, 2, ',', '.');
    // *     retorno 4: '67,00'
    // *     exemplo 5: number_format(1000);
    // *     retorno 5: '1,000'
    // *     exemplo 6: number_format(67.311, 2);
    // *     retorno 6: '67.31'
 
    var n = number, prec = decimals;
    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep == "undefined") ? ',' : thousands_sep;
    var dec = (typeof dec_point == "undefined") ? '.' : dec_point;
 
    var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;
 
    var abs = Math.abs(n).toFixed(prec);
    var _, i;
 
    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;
 
        _[0] = s.slice(0,i + (n < 0)) +
              _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
 
        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }
 
    return s;
}