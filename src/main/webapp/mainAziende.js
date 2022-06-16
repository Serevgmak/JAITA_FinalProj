$(document).ready(function () {

	var editId = 0;
	var editEst = "";
	var deleteId = 0;
	var editMode = false;
	const editAz = {
				id: -1,
                ragioneSociale: "", 
                pIva: 0, 
                indirizzo: "", 
                mail: "", 
                telefono: 0, 
        };





//    function getAziende(){
//
//        //lista aziende
//        $.get('aziende', function(res){
//
//            $('#outputAz').html('');
//            for(const az of res.object){ 
//                //console.log(gioco.datauscita);
//                $(`<div style="height: 15vh;width: 100%;margin-top: 20px;text-align: center; " class="listaAziende">
//                            <div class="row rettangolo" data-id="${az.id}"
//                                style="margin-right: 0px;margin-left: 0px;height: 15vh;background: #accbe1;margin-top: 20px;margin-bottom: 5px;"
//                                data-bs-toggle="modal" data-bs-target="#modal-dettaglioAzienda">
//
//                                <!-- Qui inserire immagine azienda -->
//                                <div class="col-xl-3 profiloAzienda d-flex flex-column align-items-center text-center"
//                                    style="height: 85%;margin-top: 1vh;margin-left: 1vh;">
//                                    </div>
//                                <div class="col d-xl-flex justify-content-xl-start align-items-xl-center"
//                                    style="height: 12vh;margin-top: 10px;padding-right: 12px;padding-left: 0px;">
//                                    <p  class="fs-4 nomeAziendaLista"
//                                        style="font-family: 'Source Code Pro', monospace;font-style: italic;margin-left: 40px;margin-right: 110px;">
//                                        ${az.ragioneSociale}</p>
//                                </div>
//                            </div>
//                        </div>`).appendTo($('#outputAz'));
//
//            }
//
//        });
//
//
//    }
//    getAziende();






function getAziende(){
		
        //lista aziende
        $.get('aziende', function(res){
			//console.log(res.estensioni);
			let estensioni = new Map(Object.entries(res.estensioni));
			
			// ATTENZIONE 
			// DOPO new Map(Object.entries()) I KEY SARANNO DI TIPO STRING!
			//console.log(estensioni.get("" + 0));
			
			//src="./images/a${az.id}.jpg"
			//src="file:/C:/Users/m3107/eclipse-workspace/JAITA58/10-Settimana/NoPlay_RestfulProj_v1.0/src/main/webapp/images/a${az.id}.jpg"
			
            $('#outputAz').html('');
//            for(const az of res.object){ 
//                //console.log(gioco.datauscita);
//                $(`<div style="height: 15vh;width: 100%;margin-top: 20px;text-align: center; " class="listaAziende">
//                            <div class="row rettangolo" data-id="${az.id}"
//                                style="margin-right: 0px;margin-left: 0px;height: 15vh;background: #accbe1;margin-top: 20px;margin-bottom: 5px;"
//                                data-bs-toggle="modal" data-bs-target="#modal-dettaglioAzienda">
//
//                                <!-- Qui inserire immagine azienda -->
//                                <div class="col-xl-3 d-flex flex-column align-items-center text-center"
//                                    style="height: 85%;margin-top: 1vh;margin-left: 1vh;">
//                                    
//                                    <img class="img-fluid" src="./images/a${az.id}.${estensioni.get("" + az.id)}" 
//                                    width='100' height='100' style="vertical-align:middle;  margin-top:1vh;">
//                                                    
//                                    </div>
//                        
//                                <div class="col d-xl-flex justify-content-xl-start align-items-xl-center"
//                                    style="height: 12vh;margin-top: 10px;padding-right: 12px;padding-left: 0px;">
//                                    <p  class="fs-4 nomeAziendaLista"
//                                        style="font-family: 'Source Code Pro', monospace;font-style: italic;margin-left: 40px;margin-right: 110px;">
//                                        ${az.ragioneSociale}</p>
//                                </div>
//                            </div>
//                        </div>`).appendTo($('#outputAz'));
//
//            }
			for(const az of res.object){
				$(`<div class="listaAziende"   data-bs-toggle="modal" data-bs-target="#modal-dettaglioAzienda">
                            <div class="rettangolo" data-id="${az.id}">
                                <table>
                                    <thead>
                                        <th class="thLeft"><img id="imgLogoAz" src="./images/a${az.id}.${estensioni.get("" + az.id)}" alt="LogoAzienda"></th>
                                        <th><p>${az.ragioneSociale}</p></th>
                                    </thead>
                                </table>
                            </div>
                        </div>`).appendTo($('#outputAz'));	
			
			
			}

        });


    }
    getAziende();
    
    
    
    //dettaglio azienda
    $('#outputAz').on('click', '.rettangolo', function () {

        const id = $(this).attr('data-id');
        inspectAz(id);
        getAziende();
        inspectAzDip(id);
    })


    function inspectAz(id) {
        $.get(`aziende/${id}`, function (res) {
			let estensioni = new Map(Object.entries(res.estensioni));
            //console.log(estensioni.get("" + res.object.id))
            $('#imgDettAz').html('');
            $(`<img
                class="rounded-circle"
                src="./images/a${res.object.id}.${estensioni.get("" + res.object.id)}"
                alt="LogoAzienda" width="150" />`).appendTo($('#imgDettAz'));
            
            
            $("#nomeAzienda2").html("");
            $("#nomeAzienda2").append(`<h4>${(res.object.ragioneSociale).toUpperCase()}<h4>`);
            $("#dettaglioRagioneSociale").html("");
            $("#dettaglioRagioneSociale").append(res.object.ragioneSociale);
            $("#dettaglioMailAziendale").html("");
            $("#dettaglioMailAziendale").append(res.object.mail);
            $("#dettaglioTelefono").html("");
            $("#dettaglioTelefono").append(res.object.telefono);
            $("#dettaglioPartitaIVA").html("");
            $("#dettaglioPartitaIVA").append(res.object.pIva);
            $("#dettaglioIndirizzo").html("");
            $("#dettaglioIndirizzo").append(res.object.indirizzo);
            deleteId = res.object.id;
            editId = res.object.id;
            editEst = estensioni.get("" + editId);
            editAz.id = res.object.id;
            editAz.ragioneSociale = res.object.ragioneSociale;
            editAz.pIva = res.object.pIva;
            editAz.indirizzo = res.object.indirizzo;
            editAz.mail = res.object.mail;
            editAz.telefono = res.object.telefono;
        })
		//getAziende();
    }

    function inspectAzDip(id) {
        $.get(`dipendenti/a${id}`, function (res) {
			console.log(editId);
            var punteggio = 0;
            $('#outputDip').html('')
            $('#listaCompletaDipendenti').html('')
            $(`<li
                                                class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h5>PERSONALE INSERITO</h5>
            </li>`).appendTo($('#outputDip'))
            for (const dip of res.object) {
				if(punteggio < 2){
                	$(`<li
                                                class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6>${dip.nome} ${dip.cognome}</h6>
            		</li>`).appendTo($('#outputDip'))
            		$(`<h6>${dip.nome} ${dip.cognome}</h6>`).appendTo($('#listaCompletaDipendenti'))
            		punteggio++;
            	} else {
            		
            		$(`<h6>${dip.nome} ${dip.cognome}</h6>`).appendTo($('#listaCompletaDipendenti'))
				}
            }
				if(punteggio >= 2){
					$(`<li
                                                class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <button id="modalListaPiccola" class="btn btn-primary" data-bs-toggle="modal"
        											data-bs-target="#listaPiccola">...</button>
            		</li>`).appendTo($('#outputDip'))
            		}
        })
    }
    
    
    
    
    //$('#bottoneAggiungi').click(function(){
	$('#modal-aggiuntaAzienda').on('click', '#addBtn', function(){
		
		
        const az = {
				id: 0,
                ragioneSociale: $('#ragioneSocialeAz').val(), 
                pIva: $('#pIvaAz').val(), 
                indirizzo: $('#indirizzoAz').val(), 
                mail: $('#mailAz').val(), 
                telefono: $('#telefonoAz').val(), 
        };

		let data = new FormData();
		data.append('image', $('#formFileSm')[0].files[0]);
		data.append('json', JSON.stringify(az));
		
        if(!editMode){
            //addAzienda(az);
            addAzienda(data);
        }
        
        $('#ragioneSocialeAz').val(''); 
        $('#pIvaAz').val(''); 
        $('#indirizzoAz').val(''); 
        $('#mailAz').val(''); 
        $('#telefonoAz').val(''); 



    });
    
    
    function addAzienda(data){
		 console.log(data.get('json'));
//        $.post('aziende', JSON.stringify(az), function(res){
//            if (res.status == '200') {
//				//$('#modal-aggiuntaAzienda').modal('hide');
//                $('#outputAz').html('');
//                getAziende();
//            } else {
//                alert('Attenzione qualcosa e andato storto');
//            }
//
//
//
//        });

//		  $.ajax({
//            url: 'aziende',
//            type: 'POST',
//            enctype : 'multipart/form-data',
//            data: data,
//            processData : false,
//            contentType : false,
//            //data: formData,
//            success: function(res){
//            		//location.reload(true);
//            		//window.location.href = "listaAziende.html";
//                    $('#outputAz').html('');
//                	getAziende();
//                }
//            })
//            location.reload(true);
//            setTimeout(function(){}, 1000);




			var settings = {
  			"url": "aziende",
  			"method": "POST",
  			"timeout": 0,
  			"processData": false,
  			"mimeType": "multipart/form-data",
  			"contentType": false,
  			"data": data
			};

			$.ajax(settings).done(function (response) {
  				$('#outputAz').html('');
              	getAziende();
			});
    }
    
    
    
    
    /*function modificaAzienda(az) {
        $.ajax({
            url: 'aziende',
            type: 'PUT',
            data: JSON.stringify(az),
            success: function(res){
                if (res.status == '200'){
                    editId = -1;
                    editMode = false;
                    $('#addAz').text('Add');
                    $('#outputAz').html('');
                    getAziende();
                    $('#dettOut').html('')
                    $('#dettAzDip').html('')
                    $('#dettLabel').html('')
                	$('#dettDipLabel').html('')
                } else if (res.status == '1500'){
                    alert('Qualcosa e andato storto...');
                }
            }
        })
    }*/
    
    
    
    
    
    $("#modificaAzienda").on("click", function () {
        //console.log("ciao");
        //$.get(`aziende/${editId}`, function (res) {
	
		
            $('#imgUpdAz').html('');
            $(`<img
                class="rounded-circle"
                src="./images/a${editId}.${editEst}"
                alt="LogoAzienda" width="150" />`).appendTo($('#imgUpdAz'));
                
        $('#modal-dettaglioAzienda').modal('hide');
        $('#modal-modificaAzienda').modal('show');
        $("#inputRagioneSociale").val(editAz.ragioneSociale);
        $("#inputMail").val(editAz.mail);
        $("#inputTelefono").val(editAz.telefono);
        $("#inputPartitaIVA").val(editAz.pIva);
        $("#inputIndirizzo").val(editAz.indirizzo);

        /* salvataggio dati modifica*/
        $("#salvaModificaAzienda").on("click", function () {
			editAz.id = editId;
            editAz.ragioneSociale = $("#inputRagioneSociale").val();
            editAz.mail = $("#inputMail").val();
            editAz.telefono = $("#inputTelefono").val();
            editAz.pIva = $("#inputPartitaIVA").val();
            editAz.indirizzo = $("#inputIndirizzo").val();
            
            let data = new FormData();
			data.append('image', $('#formFileSmUpd')[0].files[0]);
			data.append('json', JSON.stringify(editAz));
            
//            $.ajax({
//            url: 'aziende',
//            type: 'PUT',
//            data: JSON.stringify(editAz),
//            success: function(res){
//                if (res.status == '200'){
//                    //editId = -1;
//                    editMode = false;
//                    $('#outputAz').html('');
//                    getAziende();
//                    inspectAz(editId);
//                } else if (res.status == '1500'){
//                    alert('Qualcosa e andato storto...');
//                }
//            }})
            
            $.ajax({
            url: 'aziende',
            type: 'PUT',
            enctype : 'multipart/form-data',
            data: data,
            processData : false,
            contentType : false,
            //data: formData,
            success: function(res){
				if (res.status == '200'){
                    $('#outputAz').html('');
                    getAziende();
                    inspectAz(editId);
                } else if (res.status == '1500'){
                    alert('Qualcosa e andato storto...');
                }
            }})
            location.reload(true);
            
            
            
            $('#modal-modificaAzienda').modal('hide');
            $('#modal-dettaglioAzienda').modal('show');
        });
    });
    
    
    



   
   $('#modal-dettaglioAzienda').on('click', '.btnDeleteAz', function(){
        deleteAzienda(deleteId);
    })


    //function deleteAzienda(id, htmlElement){
	function deleteAzienda(id){

        $.ajax({
            url: `aziende/${id}`,
            type: 'DELETE',
            success: function(res){
                if(res.status == '200'){
                    $('#outputAz').html('');
                    //$('#modal-dettaglioAzienda').modal('hide');
                	getAziende();
                } else if (res.status == '1500') {
                	alert('Attenzione qualcosa e andato storto');
                }        
            }
        })
    }
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    


});