$(document).ready(function () {

	var editId = -1;
	var editEst = "";
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
        });     
    }
    getAziende();


	function getDipendenti(){
        $.get('dipendenti', function(res){
			let estensioni = new Map(Object.entries(res.estensioni));
			
			// ATTENZIONE 
			// DOPO new Map(Object.entries()) I KEY SARANNO DI TIPO STRING!
			//console.log(estensioni.get("" + 0));
			
            $('#outputDip').html(''); 
            let idImgShow = 0;
			for(const dip of res.object){
				if(estensioni.has("" + dip.id)){
					idImgShow = dip.id;
				} else {
					idImgShow = 0;
				}
				$(`<div data-bs-toggle="modal" data-bs-target="#modal-1">
                            <div class="rettangolo" data-id="${dip.id}">
                                <table>
                                    <thead>
                                        <th class="thLeft"><img id="imgDip" src="./images/d${idImgShow}.${estensioni.get("" + idImgShow)}" ></th>
                                        <th><p class="titoloLista">${dip.nome} ${dip.cognome}</p></th>
                                    </thead>
                                </table>
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
    })    
    
    function inspectDip(id) {
        $.get(`dipendenti/${id}`, function (res) {
			let estensioni = new Map(Object.entries(res.estensioni));
			let aziendaNome = "";
			let azienda = null;

            $('#imgDettDip').attr("src", `./images/d${res.object.id}.${estensioni.get("" + res.object.id)}`);  
			$('#aziendaRiferimento').html("");
			for(let i = 0; i < arrayAziende.length; i++){
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
				id: 0,
                nome: $('#addNome').val(),
                cognome: $('#addCognome').val(), 
                ddn: $('#addDdn').val(), 
                stipendio: $('#addStipendio').val(), 
                dda: $('#addDda').val(),
                idRuolo: $('option:selected', "#addSelectR").attr('data-id'),
                idAzienda: $('option:selected', "#addSelectAz").attr('data-id'), 
        };
		
		let data = new FormData();
		data.append('image', $('#formFileSm')[0].files[0]);
		data.append('json', JSON.stringify(dip));
		
        if(!editMode && dip.idRuolo != -1){
            addDipendente(data);
        }
    });  
    
    function addDipendente(data){

//		  $.ajax({
//            url: 'dipendenti',
//            type: 'POST',
//            datatype : 'multipart/form-data',
//            data: data,
//            timeout: 0,
//            processData : false,
//            contentType : false,
//            success: function(res){
//                    //$('#outputDip').html('');
//                    //getDipendenti();                	
//                }
//            })


			var settings = {
  			"url": "dipendenti",
  			"method": "POST",
  			"timeout": 0,
  			"processData": false,
  			"mimeType": "multipart/form-data",
  			"contentType": false,
  			"data": data
			};

			$.ajax(settings).done(function (response) {
				$('#modal-aggiunta').modal('hide');
				if(response.status == "1500")
					alert("Qualcosa e andato storto...");
  				$('#outputDip').html('');
              	getDipendenti();
			}).fail(function(){
				alert("Qualcosa e andato storto...");
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
					$('#outputDip').html('');
	                $('#modal-1').modal('hide');
                	getDipendenti();
                } else if (res.status == '1500') {
                	alert('Attenzione qualcosa e andato storto');
                }        
            }
        })
    }
    
    
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
            
            let data = new FormData();
			data.append('image', $('#formFileSmUpd')[0].files[0]);
			data.append('json', JSON.stringify(editDip));
            modificaDipendente(data);	
	})
    
    function modificaDipendente(data) {
			
//        $.ajax({
//            url: 'dipendenti',
//            type: 'PUT',
//            datatype: "multipart/form-data",
//            processData: false,
//            contentType: false,
//  			data: data,
//            success: function(res){
//                if (res.status == '200'){
//                    editMode = false;
//                    getDipendenti();
//                $('#modal-modificaDipendente').modal('hide');
//                $('#modal-1').modal('show');
//                } else if (res.status == '1500'){
//                    alert('Qualcosa e andato storto...');
//                }
//            }
//        })

		  var settings = {
  			"url": "dipendenti",
  			"method": "PUT",
  			"timeout": 0,
  			"processData": false,
  			"mimeType": "multipart/form-data",
  			"contentType": false,
  			"data": data
			};

			$.ajax(settings).done(function (response) {
				editMode = false;
				if(response.status == "1500")
					alert("Qualcosa e andato storto...");
                getDipendenti();
                $('#modal-modificaDipendente').modal('hide');
                inspectDip(editId);
                $('#modal-1').modal('show');
			}).fail(function(){
				alert("Qualcosa e andato storto...");
			});

    } 
    
    $('#selectFiltroRuoli').change(function(){
		const idRuolo = $('#selectFiltroRuoli').val()
		
		if (idRuolo == "0"){
			$('#outputDip').html('');
			getDipendenti();
		} else {			
			$.get(`dipendenti/r${idRuolo}`, function(res){
			let estensioni = new Map(Object.entries(res.estensioni));
            $('#outputDip').html('');
            for(const dip of res.object){ 
                $(`<div data-bs-toggle="modal" data-bs-target="#modal-1">
                            <div class="rettangolo" data-id="${dip.id}">
                                <table>
                                    <thead>
                                        <th class="thLeft"><img id="imgDip" style="background:url('./images/d0.jpg')" src="./images/d${dip.id}.${estensioni.get("" + dip.id)}" ></th>
                                        <th><p class="titoloLista">${dip.nome} ${dip.cognome}</p></th>
                                    </thead>
                                </table>
                            </div>
                        </div>`).appendTo($('#outputDip'));
            }
        	});	
		}
		}) 
})


