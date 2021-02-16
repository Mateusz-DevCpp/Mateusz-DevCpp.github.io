var loadDoc = 0;
var xmlDocument;
var tagObj;

function readXml() {
    loadDoc = 0;
	var xml_path = document.getElementById("path_xml").value;

	if (typeof window.DOMParser != "undefined") {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", xml_path, false);
		if (xmlhttp.overrideMimeType) {
			xmlhttp.overrideMimeType('text/xml');
		}
		xmlhttp.send();
		xmlDocument = xmlhttp.responseXML;
	} else {
		xmlDocument = new ActiveXObject("Microsoft.XMLDOM");
		xmlDocument.async = "false";
		xmlDocument.load(xml_path);
	}

	show();
}

function show() {
	
	document.getElementById("txt").innerHTML = "<p><h1>Nie udało się znaleść pliku.</h1></p>";

	var cou = "<tr><th>ID</th><th>Nazwa</th><th>Podtytuł</th><th>Gatunek</th><th>Producent</th><th>Data wydania</th><th>Cena</th><th>Ocena</th></tr>";

	tagObj = xmlDocument.getElementsByTagName("gra");
	if(tagObj.length > 0) {
	    loadDoc = 1;
		document.getElementById("txt").innerHTML = "";
	}
	for (var i = 0; i < tagObj.length; i++) {
		var id = i;
		var gat = tagObj[id].getElementsByTagName("gatunek")[0].childNodes[0].nodeValue;
		var naz = tagObj[id].getElementsByTagName("nazwa")[0].childNodes[0].nodeValue;
		var pod = tagObj[id].getElementsByTagName("podtytul")[0].childNodes[0].nodeValue;
		var pro = tagObj[id].getElementsByTagName("producent")[0].childNodes[0].nodeValue;
		var dat = tagObj[id].getElementsByTagName("data_wydania")[0].childNodes[0].nodeValue;
		var oce = tagObj[id].getElementsByTagName("ocena_gry")[0].childNodes[0].nodeValue;
		var cen = tagObj[id].getElementsByTagName("cena")[0].childNodes[0].nodeValue;

		cou += "<tr onclick='update(" + i + ")'><td>" + i + "</td><td>" + naz + "</td><td>" + pod + "</td><td>" + gat + "</td><td>" + pro + "</td><td>" + dat + "</td><td>" + cen + "</td><td>" + oce + "</td></tr>";
	}

	document.getElementById("txt").innerHTML += cou;
}

function add() {
    if(loadDoc === 0)
        return;
    
	var naz = getValue("Nazwa:", "Unknow", "string");
	if (naz === null)
		return;

	var pod = getValue("Podtytuł:", "Unknow", "string");
	if (pod === null)
		return;

	var gat = getValue("Gatunek:", "Unknow", "string");
	if (gat === null)
		return;

	var pro = getValue("Producent:", "Unknow", "string");
	if (pro === null)
		return;

	var dat = getValue("Data wydania:", "01-01-2001", "date");
	if (dat === null)
		return;

	var cen = getValue("Cena:", "0.00", "float");
	if (cen === null)
		return;

	var oce = getValue("Ocena:", "5", "mark");
	if (oce === null)
		return;

	var newEle = xmlDocument.createElement("gra");

	var newGat = xmlDocument.createElement("gatunek");
	var newText1 = xmlDocument.createTextNode(gat);
	newGat.appendChild(newText1);

	var newNaz = xmlDocument.createElement("nazwa");
	var newText2 = xmlDocument.createTextNode(naz);
	newNaz.appendChild(newText2);

	var newPod = xmlDocument.createElement("podtytul");
	var newText3 = xmlDocument.createTextNode(pod);
	newPod.appendChild(newText3);

	var newPro = xmlDocument.createElement("producent");
	var newText4 = xmlDocument.createTextNode(pro);
	newPro.appendChild(newText4);

	var newDat = xmlDocument.createElement("data_wydania");
	var newText5 = xmlDocument.createTextNode(dat);
	newDat.appendChild(newText5);

	var newOce = xmlDocument.createElement("ocena_gry");
	var newText6 = xmlDocument.createTextNode(oce);
	newOce.appendChild(newText6);

	var newCen = xmlDocument.createElement("cena");
	var newText7 = xmlDocument.createTextNode(cen);
	newCen.appendChild(newText7);

	newEle.appendChild(newGat);
	newEle.appendChild(newNaz);
	newEle.appendChild(newPod);
	newEle.appendChild(newPro);
	newEle.appendChild(newDat);
	newEle.appendChild(newOce);
	newEle.appendChild(newCen);

	xmlDocument.getElementsByTagName("gry_komputerowe")[0].appendChild(newEle);

	tagObj = xmlDocument.getElementsByTagName("gra");
	show();
}

function remove() {
    if(loadDoc === 0)
        return;
    
	var id = parseInt(getValue("ID:", "0", "int"));
	if(id === null)
	    return;
	
	var x = xmlDocument.getElementsByTagName("gra")[id];
	x.parentNode.removeChild(x);

	show();
}

function update(x) {
    if(loadDoc === 0)
        return;
    
	var id = parseInt(x);
	var oldValue;
	var newValue;

	oldValue = tagObj[id].getElementsByTagName("nazwa")[0].childNodes[0].nodeValue;
	newValue = getValue("Nazwa:", oldValue, "string");
	if (newValue === null)
		return;
	tagObj[id].getElementsByTagName("nazwa")[0].childNodes[0].nodeValue = newValue;

	oldValue = tagObj[id].getElementsByTagName("podtytul")[0].childNodes[0].nodeValue;
	newValue = getValue("Podtytuł:", oldValue, "string");
	if (newValue === null)
		return;
	tagObj[id].getElementsByTagName("podtytul")[0].childNodes[0].nodeValue = newValue;

	oldValue = tagObj[id].getElementsByTagName("gatunek")[0].childNodes[0].nodeValue;
	newValue = getValue("Gatunek:", oldValue, "string");
	if (newValue === null)
		return;
	tagObj[id].getElementsByTagName("gatunek")[0].childNodes[0].nodeValue = newValue;

	oldValue = tagObj[id].getElementsByTagName("producent")[0].childNodes[0].nodeValue;
	newValue = getValue("Producent:", oldValue, "string");
	if (newValue === null)
		return;
	tagObj[id].getElementsByTagName("producent")[0].childNodes[0].nodeValue = newValue;

	oldValue = tagObj[id].getElementsByTagName("data_wydania")[0].childNodes[0].nodeValue;
	newValue = getValue("Data wydania:", oldValue, "date");
	if (newValue === null)
		return;
	tagObj[id].getElementsByTagName("data_wydania")[0].childNodes[0].nodeValue = newValue;

	oldValue = tagObj[id].getElementsByTagName("cena")[0].childNodes[0].nodeValue;
	newValue = getValue("Cena:", oldValue, "float");
	if (newValue === null)
		return;
	tagObj[id].getElementsByTagName("cena")[0].childNodes[0].nodeValue = newValue;

	oldValue = tagObj[id].getElementsByTagName("ocena_gry")[0].childNodes[0].nodeValue;
	newValue = getValue("Ocena:", oldValue, "mark");
	if (newValue === null)
		return;
	tagObj[id].getElementsByTagName("ocena_gry")[0].childNodes[0].nodeValue = newValue;

	show();
}

function getValue(msg, def, pattern) {
	var invalidValue = 0;

	for (var proba = 0; proba < 3; proba++) {
		if (invalidValue === 1) {
			invalidValue = 0;
		}

		var value = prompt(msg, def);

		if (value === null) {
			return null;
		} else {
			if (value.length === 0) {
				alert("Podaj wartość");
				continue;
			}

			if (pattern == "int") {
				for (var i = 0; i < value.length; i++) {
					if (value.charAt(i) < '0' || value.charAt(i) > '9') {
						invalidValue = 1;
					}
				}
				if (invalidValue === 0) {
					return value;
				} else {
					alert("Podana wartość musi być liczbą calkowitą.");
				}
			} else if (pattern == "float") {
				for (var j = 0; j < value.length; j++) {
					if (value.charAt(j) != '.' && (value.charAt(j) < '0' || value.charAt(j) > '9')) {
						invalidValue = 1;
					}
				}
				if (invalidValue === 0) {
					return value;
				} else {
					alert("Podana wartość musi być liczbą zmiennoprzecinkową.");
				}
			} else if (pattern == "string") {
				return value;
			} else if (pattern == "mark") {
				if (value == "2" || value == "2.5" || value == "3" || value == "3.5" || value == "4" || value == "4.5" || value == "5") {
					return value;
				} else {
					alert("Podana wartość musi być oceną (2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5).");
				}
			} else if (pattern == "date") {
				if (value.length == 10) {
					var table_int = [0, 1, 3, 4, 6, 7, 8, 9];
					var table_min = [2, 5];
					for (var k = 0; k < table_int.length; k++) {
						if (value.charAt(table_int[k]) < '0' || value.charAt(table_int[k]) > '9') {
							invalidValue = 1;
						}
					}
					for (var l = 0; l < table_min.length; l++) {
						if (value.charAt(table_min[l]) != '-') {
							invalidValue = 1;
						}
					}
				} else {
					invalidValue = 1;
				}

				if (invalidValue === 0) {
					return value;
				} else {
					alert("Podana wartość musi być datą w formacie XX-XX-XXXX.");
				}
			}
		}
	}

	alert("Przekroczono ilosc prób, akcja anulowana.");
	return null;
}

function textInput() {
	document.getElementById("path_xml").focus();
}