public class Pagamento{

  private int codPag;
  private Evento evento;
  private String dataPagamento;
  private int numParcelas;
  private String formaDePagemento;
  private double Valor;

  public int getCodPag(){
    return codPag;
  }

  public int getEvento(){
    return evento;
  }
  
  public String getDataPagamento(){
    return dataPagamento;
  }

  public void setDataPagamento(String dt_pgto){
    this.dataPagamento = dt_pgto;
  }
  
  public int getNumParcelas(){]
    return numParcelas;
  }

  public void setNumParcelas(int parcela){
    this.numParcela = parcela;
  }

  public String getFormaDePagemento(){
    return formaDePagemento;
  }

  public void setFormaDePagamento(String formaDePagamento){
    this.formaDePagamento = formaDePagamento;
  }

  public double getValor(){
    return valor;
  }

  public void setValor(double valor){
    this.valor = valor;
  }
}