public class Responsavel extends Pessoa{
	
	private String cpf;
	private String email;
  private String senha;

	public void setCpf(String cpf){
		this.cpf = cpf;
	}

	public String getCpf() {
		return cpf;
	}

 	public void setEmail(String email){
 		this.email = email;
 	}

	public String getEmail() {
		return email;
	}

  public void setSenha(String senha){
 		this.senha = senha;
 	}

	public String getSenha() {
		return senha;
	}
	
}
