package model.dao.idao;

import java.util.List;

import model.entities.Dipendente;
import model.entities.Ruolo;

public interface IDaoDipendenti {

	List<Dipendente> dipendenti();
		
	Dipendente dipendente(int id);
		
	boolean add(Dipendente d);
		
	boolean delete(int id);
		
	boolean update(Dipendente d);
	
	//List<Dipendente> dipendenteRuolo(Ruolo r);
	List<Dipendente> dipendenteRuolo(int idRuolo);
	List<Dipendente> dipendenteAzienda(int idAzienda);
	
	int getNextId();
}
