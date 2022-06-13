$(document).ready(function () {

	var editId = 0;
	var deleteId = 0;
	var editMode = false;





    function getAziende(){

        //lista aziende
        $.get('aziende', function(res){

            $('#outputAz').html('');
            for(const az of res.object){ 
                //console.log(gioco.datauscita);
                $(`<div style="height: 15vh;width: 100%;margin-top: 20px;text-align: center; " class="listaAziende">
                            <div class="row rettangolo" data-id="${az.id}"
                                style="margin-right: 0px;margin-left: 0px;height: 15vh;background: #accbe1;margin-top: 20px;margin-bottom: 5px;"
                                data-bs-toggle="modal" data-bs-target="#modal-dettaglioAzienda">

                                <!-- Qui inserire immagine azienda -->
                                <div class="col-xl-3 profiloAzienda d-flex flex-column align-items-center text-center"
                                    style="height: 85%;margin-top: 1vh;margin-left: 1vh;">
                                    </div>
                                <div class="col d-xl-flex justify-content-xl-start align-items-xl-center"
                                    style="height: 12vh;margin-top: 10px;padding-right: 12px;padding-left: 0px;">
                                    <p  class="fs-4 nomeAziendaLista"
                                        style="font-family: 'Source Code Pro', monospace;font-style: italic;margin-left: 40px;margin-right: 110px;">
                                        ${az.ragioneSociale}</p>
                                </div>
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
            /* $('#dettLabel').text('Dettaglio')
            $('#dettOut').html(<p>Ragione Sociale: ${res.object.ragioneSociale}</p>
                                <p>pIva: ${res.object.pIva}</p>
                                <p>Indirizzo: ${res.object.indirizzo}</p>
                                <p>Mail: ${res.object.mail}</p>
                                <p>Telefono: ${res.object.telefono}</p>) */
            //$(".nomeAziendaLista").html("");
            //$(".nomeAziendaLista").append(`<h3>${(res.object.ragioneSociale).toUpperCase()}<h3>`);
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
                ragioneSociale: $('#ragioneSocialeAz').val(), 
                pIva: $('#pIvaAz').val(), 
                indirizzo: $('#indirizzoAz').val(), 
                mail: $('#mailAz').val(), 
                telefono: $('#telefonoAz').val(), 
        };

        if(!editMode){
            addAzienda(az);
        } else {
            az.id = editId;
            modificaAzienda(az);
        }
        
        $('#ragioneSocialeAz').val(''); 
        $('#pIvaAz').val(''); 
        $('#indirizzoAz').val(''); 
        $('#mailAz').val(''); 
        $('#telefonoAz').val(''); 



    });
    
    
    function addAzienda(az){

        $.post('aziende', JSON.stringify(az), function(res){
            if (res.status == '200') {
				//$('#modal-aggiuntaAzienda').modal('hide');
                $('#outputAz').html('');
                getAziende();
            } else {
                alert('Attenzione qualcosa e andato storto');
            }



        });
    }
    
    
    



   
   $('#modal-dettaglioAzienda').on('click', '.btnDeleteAz', function(){
        //const id = $(this).attr('data-id');

        //deleteAzienda(id, $(this).parent().parent());
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