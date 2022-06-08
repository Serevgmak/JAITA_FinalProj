package model.dao.idao;

import java.util.List;

import model.entities.Ruolo;

public interface IDaoRuoli {

	List<Ruolo> ruoli();
	
	Ruolo ruolo(int id);
		
	boolean add(Ruolo r);
		
	boolean delete(int id);
		
	boolean update(Ruolo r);
	
	
}
