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
import model.dao.idao.IDaoRuoli;
import model.entities.Ruolo;

/**
 * Servlet implementation class ControllerRuoli
 */
@WebServlet({ "/ruoli", "/ruoli/*" })
public class ControllerRuoli extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private Gson gson;
	private IDaoRuoli dao;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ControllerRuoli() {
        super();
        dao = DaoFactory.makeR();
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
    }

    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Response ris = new Response("", null);
		String path = request.getPathInfo();
		
		if(path == null || path.equals("/")) {
			ris.setObject(dao.ruoli());
			if(((List<Ruolo>) ris.getObject()).size() > 0)
				ris.setStatus("200");
			else
				ris.setStatus("1500");
			
		} else {
			ris.setObject(dao.ruolo(Integer.parseInt(path.substring(1))));
		}
		
		
		
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
	
	
	private Ruolo ruoloFromRequest(HttpServletRequest request) throws IOException {
		BufferedReader br = request.getReader();

		String body = "";
		
		String riga = null;
		
		while ((riga = br.readLine()) != null) {
			body += riga;
		}

		Ruolo r = gson.fromJson(body, Ruolo.class);
		
		br.close();
		return r;
	}

}
