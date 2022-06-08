package model.dao.daoObj;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.dao.idao.IDaoRuoli;
import model.entities.Ruolo;

public class DaoRuoli implements IDaoRuoli{

	private String dbAddress;
	
	public DaoRuoli(String dbAddress) {
		this.dbAddress = dbAddress;
	}
	
	@Override
	public List<Ruolo> ruoli() {

		List<Ruolo> ris = new ArrayList<Ruolo>();
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
			PreparedStatement stm = conn.prepareStatement("select * from RUOLI")){
			
			ResultSet rs = stm.executeQuery();
			
			while(rs.next()) {
				
				ris.add(new Ruolo(
							rs.getInt("id"),
							rs.getString("ruolo")));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return ris;
	}

	@Override
	public Ruolo ruolo(int id) {
		
		Ruolo ris = new Ruolo();
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				
			PreparedStatement stm = conn.prepareStatement("select * from RUOLI where ID = ?")){
				
			stm.setInt(1, id);
			
			ResultSet rs = stm.executeQuery();
				
			if(rs.next()) {
					
				ris = new Ruolo(
						rs.getInt("id"),
						rs.getString("ruolo"));
			}
				
		} catch (SQLException e) {
			e.printStackTrace();
		}
			
		return ris;
		
	}

	@Override
	public boolean add(Ruolo r) {
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement(
						"insert into RUOLI(RUOLO) "
						+ "values(?)")){
			
			stm.setString(1, r.getRuolo());
			
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
						"delete from RUOLI where ID = ?")){
			
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
	public boolean update(Ruolo r) {

		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement(
						"update RUOLI set RUOLO = ?")){
			
			stm.setString(1, r.getRuolo());
			
			if(stm.executeUpdate()>0) {
				return true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}

}
