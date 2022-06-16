package model.dao.idao;

import java.util.List;

import model.entities.Azienda;

public interface IDaoAziende{

	List<Azienda> aziende();
	
	Azienda azienda(int id);
	
	boolean add(Azienda a);
	
	boolean delete(int id);
	
	boolean update(Azienda a);
	
	int getNextId();
	
}
