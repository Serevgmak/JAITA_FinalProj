$(document).ready(function () {

	var editId = -1;
	var deleteId = -1;
	var editMode = false;
	const editDip = {
				id: -1,
                nome: "", 
                cognome: 0, 
                ddn: "", 
                stipendio: 0, 
                dda: "",
                idRuolo: -1,
                idAzienda: -1, 
        };
        
        
    const arrayAziende = []
    const arrayRuoli = []
    
    function getRuoli(){
        $.get('ruoli', function(res){
			arrayRuoli.splice(0, arrayRuoli.length)
            for(const ruolo of res.object){
                //console.log(categoria);
                $(`<option data-id="${ruolo.id}" value="${ruolo.id}">${ruolo.ruolo}</option>`).appendTo($('#addSelectR'));
                $(`<option data-id="${ruolo.id}" value="${ruolo.id}">${ruolo.ruolo}</option>`).appendTo($('#inputSceltaRuolo'));
                $(`<option data-id="${ruolo.id}" value="${ruolo.id}">${ruolo.ruolo}</option>`).appendTo($('#selectFiltroRuoli'));
           		arrayRuoli.push(ruolo.ruolo);
            }
            //$(`<option selected data-id="-1" value="">tutto</option>`).appendTo($('#outCat'));

        });     
    }
    getRuoli();
    
    function getAziende(){
        $.get('aziende', function(res){
			arrayAziende.splice(0, arrayAziende.length)
            for(const az of res.object){
                //console.log(categoria);
                $(`<option data-id="${az.id}" value="${az.id}">${az.ragioneSociale}</option>`).appendTo($('#addSelectAz'));
                $(`<option data-id="${az.id}" value="${az.id}">${az.ragioneSociale}</option>`).appendTo($('#inputSceltaAzienda'));
           		arrayAziende.push([az.id, az]);
            }
            //$(`<option selected data-id="-1" value="">tutto</option>`).appendTo($('#outCat'));

        });     
    }
    getAziende();    
        
        
    function getDipendenti(){

        //lista aziende
        $.get('dipendenti', function(res){

            $('#outputDip').html('');
            for(const dip of res.object){ 
                //console.log(gioco.datauscita);
                $(`<div style="height: 15vh;width: 100%;margin-top: 20px;text-align: center;">
                            <!-- terza riga 2, rettangolo con dettagli, suddiviso in due colonne-->
                            <div class="row rettangolo" data-id="${dip.id}"
                                style="margin-right: 0px;margin-left: 0px;height: 15vh;background: #accbe1; margin-top: 20px;margin-bottom: 5px;"
                                data-bs-toggle="modal" data-bs-target="#modal-1">

                                <!-- colonna foto profilo-->
                                <div class="col-xl-3 profiloDipendente"
                                    style="height: 85%;margin-top: 1vh;margin-left: 1vh;  ">
                                </div>
                                <!-- colonna dati dipendente-->
                                <div class="col d-xl-flex justify-content-xl-start align-items-xl-center"
                                    style="height: 12vh;margin-top: 10px;padding-right: 12px;padding-left: 0px;">
                                    <p class="fs-4"
                                        style="font-family: 'Source Code Pro', monospace;font-style: italic;margin-left: 40px;margin-right: 110px;">
                                        ${dip.nome} ${dip.cognome}</p>
                                </div>
                            </div>
                        </div>`).appendTo($('#outputDip'));

            }

        });


    }
    getDipendenti();
        
        
        
    $('#outputDip').on('click', '.rettangolo', function () {

        const id = $(this).attr('data-id');
        inspectDip(id);
        getDipendenti();
        //inspectAzDip(id);
    })
    
    
    
    function inspectDip(id) {
        $.get(`dipendenti/${id}`, function (res) {
			let aziendaNome = "";
			let azienda = null;
			$('#aziendaRiferimento').html("");
			for(let i = 0; i < arrayAziende.length; i++){
				//console.log(arrayAziende[i][1].ragioneSociale)
				if(res.object.idAzienda == arrayAziende[i][0]){
					azienda = arrayAziende[i][1]; 
					aziendaNome = azienda.ragioneSociale;
				}
			}
			if (azienda == null){
				aziendaNome = "disponibile";
				$('#aziendaRiferimento').html("")
			}

			
			$('#headerDett').html("")
			$('#headerDett').append(`<h4>${res.object.nome} ${res.object.cognome}</h4>
                                                <p class="text-secondary mb-1">${arrayRuoli[res.object.idRuolo - 1]}</p>
                                                <p class="text-muted font-size-sm">${aziendaNome}</p>`)
            
            $("#nomeCognomeDett").html("");
            $("#nomeCognomeDett").append(`${(res.object.nome + " " + res.object.cognome).toUpperCase()}`);
            
            $("#ddnDett").html("");
            $("#ddnDett").append(res.object.ddn);
            
            $("#stipendioDett").html("");
            $("#stipendioDett").append(res.object.stipendio);
            
            $("#ddaDett").html("");
            $("#ddaDett").append(res.object.dda);
           	
            deleteId = res.object.id;
            editId = res.object.id;
            editDip.id = res.object.id;
            editDip.nome = res.object.nome;
            editDip.cognome = res.object.cognome;
            editDip.ddn = res.object.ddn;
            editDip.stipendio = res.object.stipendio;
            editDip.dda = res.object.dda;
            editDip.idRuolo = res.object.idRuolo;
            editDip.idAzienda = res.object.idAzienda;

			if(azienda != null){
				$('#aziendaRiferimento').append(`<h3>AZIENDA DI RIFERIMENTO</h3>
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <h6 class="mb-0">Ragione Sociale</h6>
                                            </div>
                                            <div class="col-sm-6 text-secondary" >
                                                ${azienda.ragioneSociale}
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-6 text-secondary">
                                                ${azienda.mail}
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <h6 class="mb-0">Partita IVA</h6>
                                            </div>
                                            <div class="col-sm-6 text-secondary">
                                                ${azienda.pIva}
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <h6 class="mb-0">Numero di telefono</h6>
                                            </div>
                                            <div class="col-sm-6 text-secondary" >
                                                ${azienda.telefono}
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <h6 class="mb-0">Indirizzo</h6>
                                            </div>
                                            <div class="col-sm-6 text-secondary">
                                                ${azienda.indirizzo}
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                        </div>
                                    </div>
                                </div>`)
			}
            
            
        })
		//getAziende();
    }
    
    
    $('#bottoneAggiungi').click(function(){
    	$('#addNome').val(''); 
        $('#addCognome').val(''); 
        $('#addDdn').val(''); 
        $('#addStipendio').val(''); 
        $('#addDda').val('');
        $('#addSelectR').val('');
        $('#addSelectAz').val('');
    })
    
    
    $('#modal-aggiunta').on('click', '#addBtn', function(){
		
        const dip = {
                nome: $('#addNome').val(),
                cognome: $('#addCognome').val(), 
                ddn: $('#addDdn').val(), 
                stipendio: $('#addStipendio').val(), 
                dda: $('#addDda').val(),
                idRuolo: $('option:selected', "#addSelectR").attr('data-id'),
                idAzienda: $('option:selected', "#addSelectAz").attr('data-id'), 
        };
		
//		if(dip.idRuolo == -1){
//			alert('Scegli ruolo');
//		}
		
        if(!editMode && dip.idRuolo != -1){
            addDipendente(dip);
        }
        
        



    });
    
    
    function addDipendente(dip){

        $.post('dipendenti', JSON.stringify(dip), function(res){
            if (res.status == '200') {
				$('#modal-aggiunta').modal('hide');
                getDipendenti();
            } else {
                alert('Attenzione qualcosa e andato storto');
            }



        });
    }
    
    
    
    
    $('#modal-1').on('click', '#btnDel', function(){

        deleteDipendente(deleteId);
    })


    function deleteDipendente(id){

        $.ajax({
            url: `dipendenti/${id}`,
            type: 'DELETE',
            success: function(res){
                if(res.status == '200'){
	                $('#modal-1').modal('hide');
                	getDipendenti();
                } else if (res.status == '1500') {
                	alert('Attenzione qualcosa e andato storto');
                }        
            }
        })
    }
    
    
    //////////////////////////////////////////////////////////////////////////////////////////
    
    $('#modal-1').on('click', '#modificaDipendente', function(){
        editMode = true;
        
        $('#modal-1').modal('hide');
        $('#modal-modificaDipendente').modal('show');

        $.get(`dipendenti/${editId}`, function(res){
			
			$('#inputNomeUpd').val(res.object.nome);
			$('#inputCognomeUpd').val(res.object.cognome);
			$('#inputDdnUpd').val(res.object.ddn);
			$('#inputStipendioUpd').val(res.object.stipendio);
			$('#inputDdaUpd').val(res.object.dda);
			
			$('#inputSceltaRuolo').val(res.object.idRuolo);
			$('#inputSceltaAzienda').val(res.object.idAzienda);

           

        })

    })
    
    
    $('#modal-modificaDipendente').on('click', '#salvaUpd', function(){
			editDip.id = editId;
            editDip.nome = $('#inputNomeUpd').val();
            editDip.cognome = $('#inputCognomeUpd').val();
            editDip.ddn = $('#inputDdnUpd').val();
            editDip.stipendio = $('#inputStipendioUpd').val();
            editDip.dda = $('#inputDdaUpd').val();
            editDip.idRuolo = $('#inputSceltaRuolo').val();
            editDip.idAzienda = $('#inputSceltaAzienda').val();
            
            modificaDipendente(editDip);
	
	})
    
    function modificaDipendente(dip) {
			
        $.ajax({
            url: 'dipendenti',
            type: 'PUT',
            data: JSON.stringify(dip),
            success: function(res){
                if (res.status == '200'){
                    editMode = false;
                    $('#modal-modificaDipendente').modal('hide');
                    getDipendenti();
                } else if (res.status == '1500'){
                    alert('Qualcosa e andato storto...');
                }
            }
        })
    }
    
    
    
    
    
    $('#selectFiltroRuoli').change(function(){
		const idRuolo = $('#selectFiltroRuoli').val()
		console.log(idRuolo)
		
		if (idRuolo == "0"){
			$('#outputDip').html('');
			getDipendenti();
		} else {			
			$.get(`dipendenti/r${idRuolo}`, function(res){
            $('#outputDip').html('');
            //console.log(res);
            for(const dip of res.object){ 
                //console.log(gioco.datauscita);
                $(`<div style="height: 15vh;width: 100%;margin-top: 20px;text-align: center;">
                            <!-- terza riga 2, rettangolo con dettagli, suddiviso in due colonne-->
                            <div class="row rettangolo" data-id="${dip.id}"
                                style="margin-right: 0px;margin-left: 0px;height: 15vh;background: #accbe1; margin-top: 20px;margin-bottom: 5px;"
                                data-bs-toggle="modal" data-bs-target="#modal-1">

                                <!-- colonna foto profilo-->
                                <div class="col-xl-3 profiloDipendente"
                                    style="height: 85%;margin-top: 1vh;margin-left: 1vh;  ">
                                </div>
                                <!-- colonna dati dipendente-->
                                <div class="col d-xl-flex justify-content-xl-start align-items-xl-center"
                                    style="height: 12vh;margin-top: 10px;padding-right: 12px;padding-left: 0px;">
                                    <p class="fs-4"
                                        style="font-family: 'Source Code Pro', monospace;font-style: italic;margin-left: 40px;margin-right: 110px;">
                                        ${dip.nome} ${dip.cognome}</p>
                                </div>
                            </div>
                        </div>`).appendTo($('#outputDip'));

            }
        	});
			
		}
		})
	
	

    
   
})


