package model.entities;

//import java.time.LocalDate;
import java.util.Date;

public class Dipendente {

	int id;
	String nome;
	String cognome;
<<<<<<< HEAD
	String foto;// modifica aggiunta foto
	LocalDate ddn;
=======
	// foto?
	//LocalDate ddn;
	Date ddn;
>>>>>>> 5e270def22f1de944177a88eadbb6f8c14e723e3
	double stipendio;
	//LocalDate dda;
	Date dda;
	int idRuolo;
	int idAzienda;
<<<<<<< HEAD
	// modifica aggiunta foto
	public Dipendente(int id, String nome, String cognome, String foto, LocalDate ddn, double stipendio, LocalDate dda, int idRuolo,
=======
	
	public Dipendente(int id, String nome, String cognome, Date ddn, double stipendio, Date dda, int idRuolo,
>>>>>>> 5e270def22f1de944177a88eadbb6f8c14e723e3
			int idAzienda) {
		super();
		this.id = id;
		this.nome = nome;
		this.cognome = cognome;
		this.foto = foto;
		this.ddn = ddn;
		this.stipendio = stipendio;
		this.dda = dda;
		this.idRuolo = idRuolo;
		this.idAzienda = idAzienda;
	}
	
	public Dipendente() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	// modifica aggiunta foto
	public String getFoto() {
		return foto;
	}
	// modifica aggiunta foto
	public void setFoto(String foto) {
		this.foto = foto;
	}	

	public Date getDdn() {
		return ddn;
	}

	public void setDdn(Date ddn) {
		this.ddn = ddn;
	}

	public double getStipendio() {
		return stipendio;
	}

	public void setStipendio(double stipendio) {
		this.stipendio = stipendio;
	}

	public Date getDda() {
		return dda;
	}

	public void setDda(Date dda) {
		this.dda = dda;
	}

	public int getIdRuolo() {
		return idRuolo;
	}

	public void setIdRuolo(int idRuolo) {
		this.idRuolo = idRuolo;
	}

	public int getIdAzienda() {
		return idAzienda;
	}

	public void setIdAzienda(int idAzienda) {
		this.idAzienda = idAzienda;
	}

	
	
}
