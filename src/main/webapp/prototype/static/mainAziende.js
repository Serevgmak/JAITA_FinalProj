$(document).ready(function(){
	
	let editMode = false;
    let editId = -1;


    function getAziende(){
        $.get('aziende', function(res){

            $('#outputAz').val('');
            //console.log(res);
            for(const az of res.object){
                //console.log(gioco.datauscita);
                $(`<tr>
                <td class="tableCol">${az.ragioneSociale}</td>
                <td class="tableCol">${az.pIva}</td>
                <td class="tableCol">${az.indirizzo}</td>
                <td class="tableCol">${az.mail}</td>
                <td class="tableCol">${az.telefono}</td>
                <td><button class='btnMod' data-id='${az.id}'>Upd</button></td>
                <td><button class='btnDel' data-id='${az.id}'>Del</button></td>
                <td><button class='btnDett' data-id='${az.id}'>Dett</button></td>
            </tr>`).appendTo($('#outputAz'));

            }

        });


    }

    getAziende();
    
    
    $('#addAz').click(function(){

        const az = {
                ragioneSociale: $('#ragioneSociale').val(), 
                pIva: $('#pIva').val(), 
                indirizzo: $('#indirizzo').val(), 
                mail: $('#mail').val(), 
                telefono: $('#telefono').val(), 
        };

        if(!editMode){
            addAzienda(az);
        } else {
            az.id = editId;
            modificaAzienda(az);
        }
        
        $('#ragioneSociale').val(''); 
        $('#pIva').val(''); 
        $('#indirizzo').val(''); 
        $('#mail').val(''); 
        $('#telefono').val(''); 
        $('#ragioneSociale').focus();



    });
    
    
    function addAzienda(az){

        $.post('aziende', JSON.stringify(az), function(res){
            if (res.status == '200') {
                $('#outputAz').html('');
                getAziende();
            } else {
                alert('Attenzione qualcosa e andato storto');
            }



        });
    }
    
    
    $('#outputAz').on('click', '.btnDel', function(){
        const id = $(this).attr('data-id');

        deleteAzienda(id, $(this).parent().parent());
    })


    function deleteAzienda(id, htmlElement){

        $.ajax({
            url: `aziende/${id}`,
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
    
    
    $('#outputAz').on('click', '.btnMod', function(){
        const id = $(this).attr('data-id');

        editMode = true;
        editId = id;

        $.get(`aziende/${id}`, function(res){
			$('#ragioneSociale').val(res.object.ragioneSociale); 
        	$('#pIva').val(res.object.pIva); 
        	$('#indirizzo').val(res.object.indirizzo); 
        	$('#mail').val(res.object.mail); 
        	$('#telefono').val(res.object.telefono);

            $('#addAz').text('Upd');

        })

    })
    
    
    function modificaAzienda(az) {
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
                } else if (res.status == '1500'){
                    alert('Qualcosa e andato storto...');
                }
            }
        })
    }
    
    
    
    $('#outputAz').on('click', '.btnDett', function(){
        const id = $(this).attr('data-id');
        inspectAz(id);
        inspectAzDip(id);
    })


    function inspectAz(id){
        $.get(`aziende/${id}`, function(res){
            $('#dettLabel').text('Dettaglio')
            $('#dettOut').html(`<p>Ragione Sociale: ${res.object.ragioneSociale}</p>
                                <p>pIva: ${res.object.pIva}</p>
                                <p>Indirizzo: ${res.object.indirizzo}</p>
                                <p>Mail: ${res.object.mail}</p>
                                <p>Telefono: ${res.object.telefono}</p>`)
        }) 
        
    }
    
    function inspectAzDip(id){
        $.get(`dipendenti/a${id}`, function(res){
            $('#dettDipLabel').text('Dipendenti')
            $('#dettAzDip').html('')
            for(const dip of res.object){
                $(`<p>${dip.nome} ${dip.cognome}</p>`).appendTo($('#dettAzDip'))
        	}
      	})
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    

})