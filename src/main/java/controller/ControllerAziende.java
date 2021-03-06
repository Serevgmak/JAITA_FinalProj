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
import model.dao.idao.IDaoAziende;
import model.entities.Azienda;

/**
 * Servlet implementation class ControllerAziende
 */
@WebServlet({ "/prototype/aziende", "/prototype/aziende/*" })
//@WebServlet({ "/aziende", "/aziende/*" })
public class ControllerAziende extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private IDaoAziende dao;  
	private Gson gson;
       
    /** 
     * @see HttpServlet#HttpServlet()
     */
    public ControllerAziende() {
        super();
        dao = DaoFactory.makeA();
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Response ris = new Response("", null);
		String path = request.getPathInfo();
		
		if(path == null || path.equals("/")) {
			ris.setObject(dao.aziende());
			if(((List<Azienda>) ris.getObject()).size() > 0)
				ris.setStatus("200");
			else
				ris.setStatus("1500");
			
		} else {
			ris.setObject(dao.azienda(Integer.parseInt(path.substring(1))));
		}
		
		
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Azienda az = aziendaFromRequest(request);
		Response ris = new Response("", null);
		
		if(dao.add(az)) {
			ris.setStatus("200");
		} else {
			ris.setStatus("1500");
		}
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris));
		
		
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Azienda az = aziendaFromRequest(request);
		Response ris = new Response("", null);
		
		if(dao.update(az))
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
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris)); 
		
	}
	
	
	private Azienda aziendaFromRequest(HttpServletRequest request) throws IOException {
		BufferedReader br = request.getReader();

		String body = "";   
		//comment 2
		
		String riga = null;
		
		while ((riga = br.readLine()) != null) {
			body += riga;
		}

		Azienda az = gson.fromJson(body, Azienda.class);
		
		br.close();
		return az;
	}
	

}
