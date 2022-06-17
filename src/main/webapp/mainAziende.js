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


function getAziende(){
		
        $.get('aziende', function(res){
			let estensioni = new Map(Object.entries(res.estensioni));
			
			// ATTENZIONE 
			// DOPO new Map(Object.entries()) I KEY SARANNO DI TIPO STRING!
			//console.log(estensioni.get("" + 0));
			
            $('#outputAz').html('');
            
            
			let idImgShow = 0;
			for(const az of res.object){
            	if(estensioni.has("" + az.id)){
					idImgShow = az.id;
				} else {
					idImgShow = 0;
				}
				$(`<div class="listaAziende"   data-bs-toggle="modal" data-bs-target="#modal-dettaglioAzienda">
                            <div class="rettangolo" data-id="${az.id}">
                                <table>
                                    <thead>
                                        <th class="thLeft"><img id="imgLogoAz" src="./images/a${idImgShow}.${estensioni.get("" + idImgShow)}" alt="LogoAzienda"></th>
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
            addAzienda(data);
        }
        
        $('#ragioneSocialeAz').val(''); 
        $('#pIvaAz').val(''); 
        $('#indirizzoAz').val(''); 
        $('#mailAz').val(''); 
        $('#telefonoAz').val(''); 
    });
    
    
    function addAzienda(data){

			// E possibile che dobbiamo usare "datatype" a posto di "mimeType"
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
				if(response.status == "1500")
					alert("Qualcosa e andato storto...");
  				$('#outputAz').html('');
              	getAziende();
			}).fail(function(){
				alert("Qualcosa e andato storto...");
			});
    }  
    
    
    $("#modificaAzienda").on("click", function () {	
		
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
            
            
            var settings = {
  			"url": "aziende",
  			"method": "PUT",
  			"timeout": 0,
  			"processData": false,
  			"mimeType": "multipart/form-data",
  			"contentType": false,
  			"data": data
			};

			$.ajax(settings).done(function (response) {
  					$('#outputAz').html('');
                    getAziende();
                    inspectAz(editId);
                    if(response.status == "1500")
						alert("Qualcosa e andato storto...");
			}).fail(function(){
				alert("Qualcosa e andato storto...");
			});            
            
            $('#modal-modificaAzienda').modal('hide');
            $('#modal-dettaglioAzienda').modal('show');
        });
    });
    

   $('#modal-dettaglioAzienda').on('click', '.btnDeleteAz', function(){
        deleteAzienda(deleteId);
    })

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