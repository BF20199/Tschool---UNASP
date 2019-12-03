public class Evento{

  private int idEvento;
  private String local;
  private String horarioEntrada;
  private String horarioSaida;
  private String descricao;
  private Double valor;

  public int getIdEvento(){
    return idEvento;
  }

  public String getLocal(){
    return local;
  }

  public void setLocal(String local){
    this.local = local;
  }

  public String getHorarioentrada(){
    return horarioEntrada;
  }

  public void setHorarioentrada(String entra){
    this.horarioEntrada = entra;
  }

  public String getHorariosaida(){
    return horarioSaida;
  }

  public void setHorariosaida (String sai){
    this.horarioSaida = sai;
  }

  public String getDescricao(){
    return descricao;
  }

  public void setDescricao(String descricao){
    this.descricao = descricao;
  }

  public Double getValor(){
    return valor;
  }

  public setValor(Double valor){
    this.valor = valor;
  }
}