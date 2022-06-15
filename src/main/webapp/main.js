class Dipendente {
    constructor(nome, cognome, ddn, stipendio, ddassunzione, ruolo, aziendaRif) {
        this.nome = nome;
        this.cognome = cognome;
        this.ddn = ddn;
        this.stipendio = stipendio;
        this.ddassunzione = ddassunzione;
        this.ruolo = ruolo;
        this.aziendaRif = aziendaRif;
    }
}


class Azienda {
    constructor(ragioneSociale, mail, telefono, partitaIva, indirizzo) {
        this.ragioneSociale = ragioneSociale;
        this.mail = mail;
        this.telefono = telefono;
        this.partitaIva = partitaIva;
        this.indirizzo = indirizzo;
    }
}

var t = new Dipendente("mario", "rossi", "1990-10-01", 1900, "2011-11-11", "java junior", "zucchetti");
var t2 = new Dipendente("silvia", "rondinelli", "1994-01-01", 5423, "2022-03-03", "java junior developer", "pincoPallino"); /* per prove future */
var a = new Azienda("pincopallino spa", "pincopallino@pincopallino.it", 662434651, "PQR35252353", "via corso como, 12, milano, 31090");

var aziende = ["generation", "zucchetti", "pincoPallino"];


$(document).ready(function () {

    /* Prova render lista aziende */
/*     function renderListaAziende() {
        $(".listaAziende").html("");

            var ris = "";
        for(var az of aziende){
            ris += `<div class="row" id="rettangolo"
            style="margin-right: 0px;margin-left: 0px;height: 15vh;background: #accbe1;margin-top: 20px;margin-bottom: 5px;"
            renderAzienda(az);
            data-bs-toggle="modal" data-bs-target="#modal-dettaglioAzienda">
    
            <!-- Qui inserire immagine azienda -->
            <div class="col-xl-3 profiloAzienda d-flex flex-column align-items-center text-center"
                style="height: 85%;margin-top: 1vh;margin-left: 1vh;">
                <!-- <img
                    class="img-fluid profiloAzienda" style="width: 70%;" src="https://cdn.dribbble.com/users/1324317/screenshots/5507387/001_orig_4x.png"> -->
            </div>
            <div class="col d-xl-flex justify-content-xl-start align-items-xl-center"
                style="height: 12vh;margin-top: 10px;padding-right: 12px;padding-left: 0px;">
                <p  class="fs-4 s"
                    style="font-family: 'Source Code Pro', monospace;font-style: italic;margin-left: 40px;margin-right: 110px;">
                    ${az}</p>
            </div>
        </div>`;
            function renderAzienda2(az) {
        $(".nomeAziendaLista").html("");
        $(".nomeAziendaLista").append(`<h3>${(az.ragioneSociale).toUpperCase()}<h3>`);
        $("#nomeAzienda2").html("");
        $("#nomeAzienda2").append(`<h4>${(az.ragioneSociale).toUpperCase()}<h4>`);
        $("#dettaglioRagioneSociale").html("");
        $("#dettaglioRagioneSociale").append(az.ragioneSociale);
        $("#dettaglioMailAziendale").html("");
        $("#dettaglioMailAziendale").append(az.mail);
        $("#dettaglioTelefono").html("");
        $("#dettaglioTelefono").append(az.telefono);
        $("#dettaglioPartitaIVA").html("");
        $("#dettaglioPartitaIVA").append(az.partitaIva);
        $("#dettaglioIndirizzo").html("");
        $("#dettaglioIndirizzo").append(az.indirizzo);
    }

    }
    $(".listaAziende").append(ris);
        
        

    }

    renderListaAziende(); */

    /* prova dettaglio azienda con dati di scaffolding */
    function renderAzienda() {
        $(".nomeAziendaLista").html("");
        $(".nomeAziendaLista").append(`<h3>${(a.ragioneSociale).toUpperCase()}<h3>`);
        $("#nomeAzienda2").html("");
        $("#nomeAzienda2").append(`<h4>${(a.ragioneSociale).toUpperCase()}<h4>`);
        $("#dettaglioRagioneSociale").html("");
        $("#dettaglioRagioneSociale").append(a.ragioneSociale);
        $("#dettaglioMailAziendale").html("");
        $("#dettaglioMailAziendale").append(a.mail);
        $("#dettaglioTelefono").html("");
        $("#dettaglioTelefono").append(a.telefono);
        $("#dettaglioPartitaIVA").html("");
        $("#dettaglioPartitaIVA").append(a.partitaIva);
        $("#dettaglioIndirizzo").html("");
        $("#dettaglioIndirizzo").append(a.indirizzo);
    }




    /* MODALE MODIFICA DIPENDENTE*/
    /* faremo una funzione con la chiamata */
    $("#modificaDipendente").on("click", function () {
        $('#modal-1').modal('hide');
        $('#modal-modificaDipendente').modal('show');
        $("#inputNome").val(t.nome);
        $("#inputCognome").val(t.cognome);
        $("#inputDdn").val(t.ddn);
        $("#inputStipendio").val(t.stipendio);
        $("#inputDdassunzione").val(t.ddassunzione);
        $("#inputRuolo").val(t.ruolo);
        $("#inputSceltaAzienda").html("");
        $("#inputSceltaAzienda").append(`<option selected>${t.aziendaRif}</option>`);
        for (var a of aziende) {
            if (a != t.aziendaRif) {
                $("#inputSceltaAzienda").append(`<option value="${a}">${a}</option>`);
            }
        }


    });

    /* modale modifica azienda */

    $("#modificaAzienda").on("click", function () {
        console.log("ciao");
        $('#modal-dettaglioAzienda').modal('hide');
        $('#modal-modificaAzienda').modal('show');
        $("#inputRagioneSociale").val(a.ragioneSociale);
        $("#inputMail").val(a.mail);
        $("#inputTelefono").val(a.telefono);
        $("#inputPartitaIVA").val(a.partitaIva);
        $("#inputIndirizzo").val(a.indirizzo);

        /* salvataggio dati modifica*/
        $("#salvaModificaAzienda").on("click", function () {
            a.ragioneSociale = $("#inputRagioneSociale").val();
            a.mail = $("#inputMail").val();
            a.telefono = $("#inputTelefono").val();
            a.partitaIva = $("#inputPartitaIVA").val();
            a.indirizzo = $("#inputIndirizzo").val();
            renderAzienda();
            $('#modal-modificaAzienda').modal('hide');
            $('#modal-dettaglioAzienda').modal('show');
        });
    });

    renderAzienda();

});