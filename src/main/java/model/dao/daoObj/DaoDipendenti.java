package model.dao.daoObj;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.dao.idao.IDaoDipendenti;
import model.entities.Dipendente;
import model.entities.Ruolo;

public class DaoDipendenti implements IDaoDipendenti{

	private String dbAddress;
	
	public DaoDipendenti(String dbAddress) {
		this.dbAddress = dbAddress;
	}

	@Override
	public List<Dipendente> dipendenti(){
		
		List<Dipendente> ris = new ArrayList<Dipendente>();
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
			PreparedStatement stm = conn.prepareStatement("select * from DIPENDENTI")){
			
			ResultSet rs = stm.executeQuery();
			
			while(rs.next()) {
				
				ris.add(new Dipendente(
							rs.getInt("id"),
							rs.getString("nome"),
							rs.getString("cognome"),
							rs.getString("foto"), // modifica aggiunta foto
							rs.getDate("ddn").toLocalDate(),
							rs.getDouble("stipendio"),
							rs.getDate("dda").toLocalDate(),
							rs.getInt("id_ruolo"),
							rs.getInt("id_azienda")));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return ris;
	}

	@Override
	public Dipendente dipendente(int id) {
		Dipendente ris = new Dipendente();
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
			PreparedStatement stm = conn.prepareStatement(
					"select * from DIPENDENTI where ID = ?")){
			
			stm.setInt(1, id);
			
			ResultSet rs = stm.executeQuery();
			
			if(rs.next()) {
				ris = new Dipendente(
						rs.getInt("id"),
						rs.getString("nome"),
						rs.getString("cognome"),
						rs.getString("foto"), // modifica aggiunta foto
						rs.getDate("ddn").toLocalDate(),
						rs.getDouble("stipendio"),
						rs.getDate("dda").toLocalDate(),
						rs.getInt("id_ruolo"),
						rs.getInt("id_azienda"));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return ris;
	}

	@Override
	public boolean add(Dipendente d) {
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement(
						"insert into DIPENDENTI(NOME, COGNOME, FOTO, DDN, STIPENDIO, DDA, ID_AZIENDA, ID_RUOLO) "
						+ "values(?,?,?,?,?,?,?,?)")){ // modifica aggiunta foto
			
			stm.setString(1, d.getNome());
			stm.setString(2, d.getCognome());
			stm.setString(3, d.getFoto()); // modifica aggiunta foto
			stm.setDate(4, Date.valueOf(d.getDdn()));
			stm.setDouble(5, d.getStipendio());
			stm.setDate(6, Date.valueOf(d.getDda()));
			stm.setInt(7, d.getIdAzienda());
			stm.setInt(8, d.getIdRuolo());
			
			if(stm.executeUpdate()>0) {
				return true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}

	@Override
	public boolean delete(int id) {
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement(
						"delete from DIPENDENTI where ID = ?")){
			
			stm.setInt(1, id);
			
			if(stm.executeUpdate()>0) {
				return true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}

	@Override
	public boolean update(Dipendente d) { // modifica aggiunta foto
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement(
						"update DIPENDENTI set NOME = ?, COGNOME = ?, FOTO = ?, DDN = ?, STIPENDIO = ?, DDA = ?, ID_AZIENDA = ?, ID_RUOLO = ? where ID = ?")){
			
			stm.setString(1, d.getNome());
			stm.setString(2, d.getCognome());
			stm.setString(3, d.getFoto()); // modifica aggiunta foto
			stm.setDate(4, Date.valueOf(d.getDdn()));
			stm.setDouble(5, d.getStipendio());
			stm.setDate(6, Date.valueOf(d.getDda()));
			stm.setInt(7, d.getIdAzienda());
			stm.setInt(8, d.getIdRuolo());
			
			stm.setInt(9, d.getId());
			
			if(stm.executeUpdate()>0) {
				return true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}

	@Override
	
	// Ho cambiato da dipendenteRuolo(Ruolo r)
	// a dipendenteRuolo(int idRuolo)
	// e anche nel stm.setInt(1, r.getId());
	public List<Dipendente> dipendenteRuolo(int idRuolo) {
		
		List<Dipendente> ris = new ArrayList<Dipendente>();
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
			PreparedStatement stm = conn.prepareStatement("select * from DIPENDENTI where ID_RUOLO = ?")){
			
			//stm.setInt(1, r.getId());
			stm.setInt(1, idRuolo);
			
			ResultSet rs = stm.executeQuery();
			
			while(rs.next()) {
				
				ris.add(new Dipendente(
							rs.getInt("id"),
							rs.getString("nome"),
							rs.getString("cognome"),
							rs.getString("foto"), // modifica aggiunta foto
							rs.getDate("ddn").toLocalDate(),
							rs.getDouble("stipendio"),
							rs.getDate("dda").toLocalDate(),
							rs.getInt("id_ruolo"),
							rs.getInt("id_azienda")));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return ris;
		
	}

	
	
}
