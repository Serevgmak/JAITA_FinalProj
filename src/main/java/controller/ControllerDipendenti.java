package controller;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import model.dao.idao.IDaoDipendenti;
import model.entities.Azienda;
import model.entities.Dipendente;

/**
 * Servlet implementation class ControllerDipendenti
 */ 
//@WebServlet({ "/prototype/dipendenti", "/prototype/dipendenti/*" })
@MultipartConfig(
		fileSizeThreshold = 1024 * 1024 * 1,
		maxFileSize = 1024 * 1024 * 10,
		maxRequestSize = 1024 * 1024 * 100
)
@WebServlet({ "/dipendenti", "/dipendenti/*" })
public class ControllerDipendenti extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 
	private Gson gson;
	private IDaoDipendenti dao;  
	private Map<Integer, String> estensioni;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ControllerDipendenti() {  
        super();  
        dao = DaoFactory.makeD(); 
        gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        estensioni = new HashMap<Integer, String>();
        inizializareMappa();  
    }
       
    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Response ris = new Response("", null, estensioni);
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

		//Dipendente dip = dipendenteFromRequest(request);
		Dipendente dip = null; 
		Response ris = new Response("", null, this.estensioni);
		Part jsonPart = request.getPart("json");  
		System.out.println(IOUtils.toString(jsonPart.getInputStream(), StandardCharsets.UTF_8));
		dip = gson.fromJson(IOUtils.toString(jsonPart.getInputStream(), StandardCharsets.UTF_8), Dipendente.class);
		
		if(dao.add(dip)) {
			int addId = dao.getNextId() - 1;
			Part imgPart = request.getPart("image");
			if(imgPart.getSubmittedFileName() != null) {
				estensioni.put(addId, imgPart.getSubmittedFileName().split("[.]")[1]); 
				imgPart.write("C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//d"
						+ addId 
						+ "."
						+ estensioni.get(addId));
//				String newImgPath = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//d"
//						+ addId
//						+ "."
//						+ estensioni.get(addId);
//				Path newPath = Paths.get(newImgPath);
//				OutputStream output = Files.newOutputStream(newPath);
//				IOUtils.copy(imgPart.getInputStream(), output);
//				output.close();  
				//imgPart.getInputStream().close();
				 
//				String newImgPath = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//d"
//						+ addId
//						+ "."
//						+ estensioni.get(addId);
//				
//				
//				File newImgOut = new File(newImgPath) ;
//		        BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(newImgOut));
//		        InputStream is = imgPart.getInputStream();
//		        byte [] bytes = new byte[1024];
//		        int sizeRead;
//		        while ((sizeRead = is.read(bytes,0, 1024)) > 0) {
//		            stream.write(bytes, 0, sizeRead);
//		        }
//		        stream.flush();
//		        stream.close();
//		        System.out.println( "You successfully uploaded file !" ); 
				
				
				
				
				
			} else {
				estensioni.put(addId, "jpg");
				// Facciamo copy dell'immagine di default
				String source = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//d0.jpg";
				String dest = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//d"
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
		//Dipendente dip = dipendenteFromRequest(request);
		Dipendente dip = null;
		Response ris = new Response("", null, estensioni);
		Part jsonPart = request.getPart("json"); 
		dip = gson.fromJson(IOUtils.toString(jsonPart.getInputStream(), StandardCharsets.UTF_8), Dipendente.class);
		
		Part imgPart = request.getPart("image");
		if(imgPart.getSubmittedFileName() != null) {
			String source = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//d"
							+ dip.getId()
							+ "."
							+ estensioni.get(dip.getId());
			File img = new File(source);
			img.delete();
			estensioni.replace(dip.getId(), imgPart.getSubmittedFileName().split("[.]")[1]);
			String newImgPath = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//d"
					+ dip.getId()
					+ "."
					+ estensioni.get(dip.getId());
			Path newPath = Paths.get(newImgPath);
			OutputStream output = Files.newOutputStream(newPath);
			IOUtils.copy(imgPart.getInputStream(), output);
			imgPart.getInputStream().close();
			output.close(); 
		} 
		
		if(dao.update(dip))
			ris.setStatus("200"); 
		else
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
				String source = "C://Users//m3107//eclipse-workspace//JAITA58//10-Settimana//NoPlay_RestfulProj_v1.0//src//main//webapp//images//d"
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
	
	
	
	private void inizializareMappa() {
		List<String> nomi = new ArrayList<String>();
		File[] files = new File("C:/Users/m3107/eclipse-workspace/JAITA58/10-Settimana/NoPlay_RestfulProj_v1.0/src/main/webapp/images").listFiles();
		
		for(File f : files) {
			if(f.isFile())
				nomi.add(f.getName());
		}
		 
		for(String s : nomi) {
			if(s.charAt(0) == 'd') {
				this.estensioni.put(Integer.parseInt(s.split("[.]")[0].substring(1)), s.split("[.]")[1]);
			}
		}
		
	}

}
