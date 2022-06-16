package controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import model.Response;
import model.dao.DaoFactory;
import model.dao.idao.IDaoAziende;
import model.entities.Azienda;

/**
 * Servlet implementation class ControllerAziende
 */
//@WebServlet({ "/prototype/aziende", "/prototype/aziende/*" })
@WebServlet({ "/aziende", "/aziende/*" })
@MultipartConfig(
		fileSizeThreshold = 1024 * 1024 * 1,
		maxFileSize = 1024 * 1024 * 10,
		maxRequestSize = 1024 * 1024 * 100
) 
public class ControllerAziende extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private IDaoAziende dao;    
	private Gson gson;
	private Map<Integer, String> estensioni;
        
    /** 
     * @see HttpServlet#HttpServlet()
     */
    public ControllerAziende() {
        super();
        dao = DaoFactory.makeA();
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        estensioni = new HashMap<Integer, String>();
//        estensioni.put(0, "jpg");
//        estensioni.put(1, "jpg");
//        estensioni.put(2, "jpg");
//        estensioni.put(3, "png");
        inizializareMappa();
    }
         
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Response ris = new Response("", null, estensioni);
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
    
		Azienda az = null;
		Response ris = new Response("", null, null);
		
		Part jsonPart = request.getPart("json"); 
		az = gson.fromJson(IOUtils.toString(jsonPart.getInputStream(), StandardCharsets.UTF_8), Azienda.class);
		
		
		
		
		
		
		if(dao.add(az)) {   
			int addId = dao.getNextId() - 1;
			Part imgPart = request.getPart("image");
			if(imgPart.getSubmittedFileName() != null) {
				estensioni.put(addId, imgPart.getSubmittedFileName().split("[.]")[1]); 
				imgPart.write("C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//a"
						+ addId
						+ "."
						+ estensioni.get(addId));   
			} else {
				estensioni.put(addId, "jpg");
				// Facciamo copy dell'immagine di default
				String source = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//a0.jpg";
				String dest = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//a"
						+ addId
						+ "."
						+ estensioni.get(addId);
				FileUtils.copyFile(new File(source), new File(dest));
			}
			ris.setStatus("200");
			ris.setEstensioni(estensioni);
		} else {
			ris.setStatus("1500"); 
		}
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris));
		
		
	}
	
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Azienda az = null;
		Response ris = new Response("", null, null);
		
		Part jsonPart = request.getPart("json");
		az = gson.fromJson(IOUtils.toString(jsonPart.getInputStream(), StandardCharsets.UTF_8), Azienda.class);
		 
		
		Part imgPart = request.getPart("image");
		if(imgPart.getSubmittedFileName() != null) {
			String source = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//a"
							+ az.getId()
							+ "."
							+ estensioni.get(az.getId());
			File img = new File(source);
			img.delete();
			estensioni.replace(az.getId(), imgPart.getSubmittedFileName().split("[.]")[1]);
			imgPart.write("C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//a" 
					+ az.getId() 
					+ "."
					+ estensioni.get(az.getId()));
		}				 
		
		if(dao.update(az)) {
			ris.setStatus("200"); 
			ris.setEstensioni(estensioni);
		} else 
			ris.setStatus("1500"); 
		
		response.setContentType("application/json");
		response.getWriter().append(gson.toJson(ris));
		
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String path = request.getPathInfo();
		Response ris = new Response("", null, null);
		

		if(path == null || path.equals("/")) {
			ris.setStatus("1500");			
		} else {
			int id = Integer.parseInt(path.substring(1));
			if(dao.delete(id)) {
				String source = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//a"
						+ id
						+ "."
						+ estensioni.get(id);
				File img = new File(source);
				img.delete();
				estensioni.remove(id);
				ris.setStatus("200");
			} else
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
	
	
	private void inizializareMappa() {
		List<String> nomi = new ArrayList<String>();
		File[] files = new File("C:/Users/m3107/eclipse-workspace/JAITA58/10-Settimana/NoPlay_RestfulProj_v1.0/src/main/webapp/images").listFiles();
		
		for(File f : files) {
			if(f.isFile())
				nomi.add(f.getName());
		}
		
		for(String s : nomi) {
			if(s.charAt(0) == 'a') {
				this.estensioni.put(Integer.parseInt(s.split("[.]")[0].substring(1)), s.split("[.]")[1]);
			}
		}
		
	}
	

}
