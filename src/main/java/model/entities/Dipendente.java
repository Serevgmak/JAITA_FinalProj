package model.entities;

import java.time.LocalDate;

public class Dipendente {

	int id;
	String nome;
	String cognome;
	// foto?
	LocalDate ddn;
	double stipendio;
	LocalDate dda;
	int idRuolo;
	int idAzienda;
	
	public Dipendente(int id, String nome, String cognome, LocalDate ddn, double stipendio, LocalDate dda, int idRuolo,
			int idAzienda) {
		super();
		this.id = id;
		this.nome = nome;
		this.cognome = cognome;
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

	public LocalDate getDdn() {
		return ddn;
	}

	public void setDdn(LocalDate ddn) {
		this.ddn = ddn;
	}

	public double getStipendio() {
		return stipendio;
	}

	public void setStipendio(double stipendio) {
		this.stipendio = stipendio;
	}

	public LocalDate getDda() {
		return dda;
	}

	public void setDda(LocalDate dda) {
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
