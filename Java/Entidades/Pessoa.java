public abstract class Pessoa {

	private String nome;
	private String dtNascimento;
	private String endereco;
	private String telefone;
  private String rg;
	
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getDtnascimento() {
		return dtNascimento;
	}
	
	public void setDtnascimento(String nasce) {
		this.dtNascimento = nasce; 
	}
	
	public String getEndereco() {
		return endereco;
	}
	
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

 public String getTelfone(){
   return telefone;
 }
 
  public void setTelefone(String tel){
    this.telefone = tel;
  }

  public String getRg(){
    return rg;
  } 

  public void setRg(String rg){
    this.rg = rg;
  }
	
}
