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
						"insert into DIPENDENTI(NOME, COGNOME, DDN, STIPENDIO, DDA, ID_AZIENDA, ID_RUOLO) "
						+ "values(?,?,?,?,?,?,?)")){
			
			stm.setString(1, d.getNome());
			stm.setString(2, d.getCognome());
			stm.setDate(3, Date.valueOf(d.getDdn()));
			stm.setDouble(4, d.getStipendio());
			stm.setDate(5, Date.valueOf(d.getDda()));
			stm.setInt(6, d.getIdAzienda());
			stm.setInt(7, d.getIdRuolo());
			
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
	public boolean update(Dipendente d) {
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement(
						"update DIPENDENTI set NOME = ?, COGNOME = ?, DDN = ?, STIPENDIO = ?, DDA = ?, ID_AZIENDA = ?, ID_RUOLO = ? where ID = ?")){
			
			stm.setString(1, d.getNome());
			stm.setString(2, d.getCognome());
			stm.setDate(3, Date.valueOf(d.getDdn()));
			stm.setDouble(4, d.getStipendio());
			stm.setDate(5, Date.valueOf(d.getDda()));
			stm.setInt(6, d.getIdAzienda());
			stm.setInt(7, d.getIdRuolo());
			
			stm.setInt(8, d.getId());
			
			if(stm.executeUpdate()>0) {
				return true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}

	@Override
	public List<Dipendente> dipendenteRuolo(Ruolo r) {
		
		List<Dipendente> ris = new ArrayList<Dipendente>();
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
			PreparedStatement stm = conn.prepareStatement("select * from DIPENDENTI where ID_RUOLO = ?")){
			
			stm.setInt(1, r.getId());
			
			ResultSet rs = stm.executeQuery();
			
			while(rs.next()) {
				
				ris.add(new Dipendente(
							rs.getInt("id"),
							rs.getString("nome"),
							rs.getString("cognome"),
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
