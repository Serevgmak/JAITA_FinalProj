package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import model.Response;
import model.dao.DaoFactory;
import model.dao.idao.IDaoDipendenti;
import model.entities.Azienda;
import model.entities.Dipendente;

/**
 * Servlet implementation class ControllerDipendenti
 */ 
@WebServlet({ "/prototype/dipendenti", "/prototype/dipendenti/*" })
//@WebServlet({ "/dipendenti", "/dipendenti/*" })
public class ControllerDipendenti extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 
	private Gson gson;
	private IDaoDipendenti dao;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ControllerDipendenti() {
        super();
        dao = DaoFactory.makeD();
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
    }
       
    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Response ris = new Response("", null);
		String path = request.getPathInfo();
		
		if(path == null || path.equals("/")) {
			ris.setObject(dao.dipendenti());
			if(((List<Dipendente>) ris.getObject()).size() > 0)
				ris.setStatus("200");
			else
				ris.setStatus("1500");
			
		} else if (path.startsWith("/r")){
			ris.setObject(dao.dipendenteRuolo(Integer.parseInt(path.substring(2))));
			if(((List<Dipendente>) ris.getObject()).size() > 0)
				ris.setStatus("200");
			else
				ris.setStatus("1500");
		} else if (path.startsWith("/a")){
			ris.setObject(dao.dipendenteAzienda(Integer.parseInt(path.substring(2))));
			if(((List<Dipendente>) ris.getObject()).size() > 0)
				ris.setStatus("200");
			else
				ris.setStatus("1500");
		} else
			ris.setObject(dao.dipendente(Integer.parseInt(path.substring(1))));
		
		
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Dipendente dip = dipendenteFromRequest(request);
		Response ris = new Response("", null);
		
		if(dao.add(dip)) {
			ris.setStatus("200");
		} else {
			ris.setStatus("1500"); 
		}
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris));
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Dipendente dip = dipendenteFromRequest(request);
		Response ris = new Response("", null);
		
		if(dao.update(dip))
			ris.setStatus("200");
		else
			ris.setStatus("1500");
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris));
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String path = request.getPathInfo();
		Response ris = new Response("", null);
		

		if(path == null || path.equals("/")) {
			ris.setStatus("1500");			
		} else {
			int id = Integer.parseInt(path.substring(1));
			if(dao.delete(id))
				ris.setStatus("200");
			else
				ris.setStatus("1500");
		}	
		// comment for test 2
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris)); 
	}
	
	private Dipendente dipendenteFromRequest(HttpServletRequest request) throws IOException {
		BufferedReader br = request.getReader();

		String body = "";
		
		String riga = null;
		
		while ((riga = br.readLine()) != null) {
			body += riga;
		}

		Dipendente dip = gson.fromJson(body, Dipendente.class);
		
		br.close();
		return dip;
	}

}
