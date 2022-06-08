package model.dao.daoObj;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.dao.idao.IDaoAziende;
import model.entities.Azienda;

public class DaoAziende implements IDaoAziende{

	private String dbAddress;
	
	public DaoAziende(String dbAddress) {
		this.dbAddress = dbAddress;
	}
	
	@Override
	public List<Azienda> aziende() {
		List<Azienda> ris = new ArrayList<Azienda>();
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement("select * from AZIENDE")){
			
			ResultSet rs = stm.executeQuery();
			
			while(rs.next()) {
				
				ris.add(new Azienda(
							rs.getInt("id"),
							rs.getString("ragione_sociale"),
							rs.getInt("piva"),
							rs.getString("indirizzo"),
							rs.getString("email"),
							rs.getInt("ntelefono")));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ris;
	}

	@Override
	public Azienda azienda(int id) {
		Azienda ris = new Azienda();
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement("select * from AZIENDE where ID = ?")){
			
			stm.setInt(1, id);
			
			ResultSet rs = stm.executeQuery();
			
			if(rs.next()) {
				
				ris = new Azienda(
							rs.getInt("id"),
							rs.getString("ragione_sociale"),
							rs.getInt("piva"),
							rs.getString("indirizzo"),
							rs.getString("email"),
							rs.getInt("ntelefono"));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
		return ris;
	}

	@Override
	public boolean add(Azienda a) {
		
		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement(
						"insert into AZIENDE(RAGIONE_SOCIALE, PIVA, INDIRIZZO, EMAIL, NTELEFONO) "
						+ "values(?,?,?,?,?)")){
			
			stm.setString(1, a.getRagioneSociale());
			stm.setInt(2, a.getpIva());
			stm.setString(3, a.getIndirizzo());
			stm.setString(4, a.getMail());
			stm.setInt(5, a.getTelefono());
			
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
						"delete from AZIENDE where ID = ?")){
			
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
	public boolean update(Azienda a) {

		try(Connection conn = DriverManager.getConnection(dbAddress);
				PreparedStatement stm = conn.prepareStatement(
						"update AZIENDE set RAGIONE_SOCIALE = ?, PIVA = ?, INDIRIZZO = ?, EMAIL = ?, NTELEFONO = ?")){
			
			stm.setString(1, a.getRagioneSociale());
			stm.setInt(2, a.getpIva());
			stm.setString(3, a.getIndirizzo());
			stm.setString(4, a.getMail());
			stm.setInt(5, a.getTelefono());
			
			if(stm.executeUpdate()>0) {
				return true;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return false;
	}

	
	
}
