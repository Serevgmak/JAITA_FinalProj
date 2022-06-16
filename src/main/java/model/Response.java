package model;

import java.util.Map;

public class Response {
	
	private String status;
	private Object object;
	private Map<Integer, String> estensioni;
	
	
	public Response(String status, Object object, Map<Integer, String> estensioni) {
		super();
		this.status = status;
		this.object = object;
		this.estensioni = estensioni;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Object getObject() {
		return object;
	}


	public void setObject(Object object) {
		this.object = object;
	}


	public Map<Integer, String> getEstensioni() {
		return estensioni;
	}


	public void setEstensioni(Map<Integer, String> estensioni) {
		this.estensioni = estensioni;
	}
	
	
	
	
	
	
	
	
	
	

}
