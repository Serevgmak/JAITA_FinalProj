$(document).ready(function(){
	
	let editMode = false;
    let editId = -1;
    
    const arrayAziende = []
    const arrayRuoli = []
    
    function getRuoli(){
        $.get('ruoli', function(res){
			arrayRuoli.splice(0, arrayRuoli.length)
            $('#outR').val('');
            for(const ruolo of res.object){
                //console.log(categoria);
                $(`<option data-id="${ruolo.id}" value="${ruolo.id}">${ruolo.ruolo}</option>`).appendTo($('#outR'));
           		arrayRuoli.push(ruolo.ruolo);
            }
            //$(`<option selected data-id="-1" value="">tutto</option>`).appendTo($('#outCat'));

        });     
    }
    getRuoli();
    
    function getAziende(){
        $.get('aziende', function(res){
			arrayAziende.splice(0, arrayAziende.length)
            $('#outAz').val('');
            for(const az of res.object){
                //console.log(categoria);
                $(`<option data-id="${az.id}" value="${az.id}">${az.ragioneSociale}</option>`).appendTo($('#outAz'));
           		arrayAziende.push(az.ragioneSociale);
            }
            //$(`<option selected data-id="-1" value="">tutto</option>`).appendTo($('#outCat'));

        });     
    }
    getAziende();
    
//    function getAziende(){
//        $.get('aziende', function(res){
//            for(const azienda of res.object){
//           		arrayAziende.push(azienda.ragioneSociale);
//            }
//        });     
//    }
//    getAziende();
    
    
//    function nomeRuolo(idRuolo){
//        $.get(`ruoli/${idRuolo}`, function(res){
//			console.log(res.object.ruolo)
//			if (res.status == '200') {
//            	return res.object.ruolo;
//            } else if (res.status == '1500'){
//                alert('Attenzione qualcosa e andato storto');
//            }
//        });    
//    }
//    
//    function nomeAzienda(idAzienda){
//        $.get(`aziende/${idAzienda}`, function(res){
//			let nomeAz = res.object.ragioneSociale;
//			console.log(nomeAz)
//			if (res.status == '200') {
//            	//return `${res.object.ragioneSociale}`;
//            	return nomeAz;
//            } else if (res.status == '1500'){
//                alert('Attenzione qualcosa e andato storto');
//            }
//        });    
//    }
    
    
//    function nomeAzienda(idAzienda){
//	
//		$.ajax({
//			url: `aziende/${idAzienda}`,
//            type: 'GET',
//            //headers: { 
//            //    'Accept': 'application/json',
//            //    'Content-Type': 'application/json' 
//            //},
//            success: function(res){
//                if (res.msg == '200'){
//                    return `${res.object.ragioneSociale}`
//                } else if (res.msg == '1500'){
//                    alert('Qualcosa e andato storto con modificaCat...');
//                }
//            },
//            async: false			
//		})	
//	}
    
    


    function getDipendenti(){
        $.get('dipendenti', function(res){
            $('#outputDip').val('');
            //console.log(res);
            for(const dip of res.object){
				console.log(arrayAziende)
                $(`<tr>
                <td class="tableCol">${dip.nome}</td>
                <td class="tableCol">${dip.cognome}</td>
                <td class="tableCol">${dip.ddn}</td>
                <td class="tableCol">${dip.stipendio}</td>
                <td class="tableCol">${dip.dda}</td>
                
                <td><button class='btnMod' data-id='${dip.id}'>Upd</button></td>
                <td><button class='btnDel' data-id='${dip.id}'>Del</button></td>
                <td><button class='btnDett' data-id='${dip.id}'>Dett</button></td>
            </tr>`).appendTo($('#outputDip'));

            }
            // Ho togliato queste due righe da parte sopra
			//<td class="tableCol">${arrayRuoli[dip.idRuolo - 1]}</td>
            //<td class="tableCol">${arrayAziende[dip.idAzienda - 1]}</td>
        });


    }

    getDipendenti();
    
    
    $('#addDip').click(function(){

        const dip = {
				nome: $('#nome').val(),
				cognome: $('#cognome').val(),
				ddn: $('#ddn').val(),
				stipendio: $('#stipendio').val(),
				dda: $('#dda').val(),
				idRuolo: $('option:selected', "#outR").attr('data-id'),
				idAzienda: $('option:selected', "#outAz").attr('data-id'), 
        };

        if(!editMode){
            addDipendente(dip);
        } else {
            dip.id = editId;
            modificaDipendente(dip);
        }
        
        $('#nome').val(''); 
        $('#cognome').val(''); 
        $('#ddn').val(''); 
        $('#stipendio').val(''); 
        $('#dda').val(''); 
        $('#nome').focus();



    });
    
    
    $('#filter').click(function(){
		//$('#outputDip').html('');
		const ruolo = $('#ruoloFilter').val()
		console.log(ruolo)
		let idR = -1;
		
		if (ruolo == ""){
			$('#outputDip').html('');
			getDipendenti();
		} else {
		for(let i = 0; i < arrayRuoli.length; i++){
			if(arrayRuoli[i] == ruolo){
				idR = i + 1;
			}
		}
		
		if(idR == -1){
			alert('Attenzione non abbiamo questo ruolo');
		} else {			
			$.get(`dipendenti/r${idR}`, function(res){
            $('#outputDip').html('');
            //console.log(res);
            for(const dip of res.object){
				//console.log(arrayAziende)
                $(`<tr>
                <td class="tableCol">${dip.nome}</td>
                <td class="tableCol">${dip.cognome}</td>
                <td class="tableCol">${dip.ddn}</td>
                <td class="tableCol">${dip.stipendio}</td>
                <td class="tableCol">${dip.dda}</td>
                
                <td><button class='btnMod' data-id='${dip.id}'>Upd</button></td>
                <td><button class='btnDel' data-id='${dip.id}'>Del</button></td>
                <td><button class='btnDett' data-id='${dip.id}'>Dett</button></td>
            </tr>`).appendTo($('#outputDip'));

            }
        	});
			
		}
		}
	
	
	
	
	
	})
    
    
    
    
    
    function addDipendente(dip){

        $.post('dipendenti', JSON.stringify(dip), function(res){
            if (res.status == '200') {
                $('#outputDip').html('');
                getDipendenti();
            } else {
                alert('Attenzione qualcosa e andato storto');
            }



        });
    }
    
    
    $('#outputDip').on('click', '.btnDel', function(){
        const id = $(this).attr('data-id');

        deleteDipendente(id, $(this).parent().parent());
    })


    function deleteDipendente(id, htmlElement){

        $.ajax({
            url: `dipendenti/${id}`,
            type: 'DELETE',
            success: function(res){
                if(res.status == '200'){
                    htmlElement.remove();
                } else if (res.status == '1500') {
                	alert('Attenzione qualcosa e andato storto');
                }        
            }
        })
    }
    
    
    $('#outputDip').on('click', '.btnMod', function(){
        const id = $(this).attr('data-id');

        editMode = true;
        editId = id;

        $.get(`dipendenti/${id}`, function(res){
			
			$('#nome').val(res.object.nome);
			$('#cognome').val(res.object.cognome);
			$('#ddn').val(res.object.ddn);
			$('#stipendio').val(res.object.stipendio);
			$('#dda').val(res.object.dda);
			
			$('#outR').val(res.object.idRuolo);
			$('#outAz').val(res.object.idAzienda);

            $('#addDip').text('Upd');

        })

    })
    
    
    function modificaDipendente(dip) {
        $.ajax({
            url: 'dipendenti',
            type: 'PUT',
            data: JSON.stringify(dip),
            success: function(res){
                if (res.status == '200'){
                    editId = -1;
                    editMode = false;
                    $('#addDip').text('Add');
                    $('#outputDip').html('');
                    getDipendenti();
                } else if (res.status == '1500'){
                    alert('Qualcosa e andato storto...');
                }
            }
        })
    }
    
    
    $('#outputDip').on('click', '.btnDett', function(){
        const id = $(this).attr('data-id');
        inspectDip(id);
    })


    function inspectDip(id){
        $.get(`dipendenti/${id}`, function(res){
            $('#dettLabel').text('Dettaglio')
            $('#dettOut').html(`<p>Nome: ${res.object.nome}</p>
                                <p>Cognome: ${res.object.cognome}</p>
                                <p>Data di nascita: ${res.object.ddn}</p>
                                <p>Stipendio: ${res.object.stipendio}</p>
                                <p>Data di assunzione: ${res.object.dda}</p>
                                <p>Ruolo: ${arrayRuoli[res.object.idRuolo - 1]}</p>
                                <p>Azienda: ${arrayAziende[res.object.idAzienda - 1]}</p>`);
        }) 
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

})