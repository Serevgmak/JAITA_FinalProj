package controller;

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
@WebServlet({ "/aziende", "/aziende/*" })
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
		// TODO Auto-generated method stub
		Response ris = new Response("", null);
		String path = request.getPathInfo();
		
		if(path == null || path.equals("/")) {
			//ris.setObject(gson.toJson(dao.aziende()));
			ris.setObject(dao.aziende());
			if(((List<Azienda>) ris.getObject()).size() > 0)
				//return new Response("200", dao.read());
				ris.setStatus("200");
				//ris.setObject(dao.read());
			else
				ris.setStatus("1500");
			
		} else {
			//ris.setObject(gson.toJson(dao.azienda(Integer.parseInt(path.substring(1)))));
			ris.setObject(dao.azienda(Integer.parseInt(path.substring(1))));
		}
			//ris. = gson.toJson(dao.readGioco(Integer.parseInt(path.substring(1))));
		
		
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		//doGet(request, response);
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

}
