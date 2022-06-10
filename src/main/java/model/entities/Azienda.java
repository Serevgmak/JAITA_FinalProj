package model.entities;

public class Azienda {

	int id;
	String ragioneSociale;
	long pIva;
	String indirizzo;
	String mail;
	int telefono;
	
	public Azienda(int id, String ragioneSociale, long pIva, String indirizzo, String mail, int telefono) {
		super();
		this.id = id;
		this.ragioneSociale = ragioneSociale;
		this.pIva = pIva;
		this.indirizzo = indirizzo;
		this.mail = mail;
		this.telefono = telefono;
	}

	public Azienda() {
		
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRagioneSociale() {
		return ragioneSociale;
	}

	public void setRagioneSociale(String ragioneSociale) {
		this.ragioneSociale = ragioneSociale;
	}

	public long getpIva() {
		return pIva;
	}

	public void setpIva(long pIva) {
		this.pIva = pIva;
	}

	public String getIndirizzo() {
		return indirizzo;
	}

	public void setIndirizzo(String indirizzo) {
		this.indirizzo = indirizzo;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public int getTelefono() {
		return telefono;
	}

	public void setTelefono(int telefono) {
		this.telefono = telefono;
	}
	
	
	
}
