package model.dao;

import model.dao.daoObj.DaoAziende;
import model.dao.daoObj.DaoDipendenti;
import model.dao.daoObj.DaoRuoli;
import model.dao.idao.IDaoAziende;
import model.dao.idao.IDaoDipendenti;
import model.dao.idao.IDaoRuoli;


public interface DaoFactory {


	String DRIVER_MYSQL = "com.mysql.jdbc.Driver";
	
	// CAMBIARE NOME DELLA DB
	String DB_ADDRESS = "jdbc:mysql://localhost:3306/provanoplay?user=root&password=root&useSSL=false&serverTimezone=UTC";
	
	static IDaoDipendenti makeD() {
	
		try {
			Class.forName(DRIVER_MYSQL);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return new DaoDipendenti(DB_ADDRESS);
	}
	
	static IDaoAziende makeA() {

		try {
			Class.forName(DRIVER_MYSQL);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return new DaoAziende(DB_ADDRESS);
	}
	
	static IDaoRuoli makeR() {

		try {
			Class.forName(DRIVER_MYSQL);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return new DaoRuoli(DB_ADDRESS);
	}

}
