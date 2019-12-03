import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    
    String login = "", senha = "";

    Scanner scan = new Scanner(System.in);

     //Cadastrar eventos exemplo

    Evento ev = new Evento();
    ev.setDescricao("Passeio ao parque de diversões do hopi Hari...");
    ev.setHorarioentrada("06:00");
    ev.setHorariosaida("18:00");
    ev.setLocal("Hopi Hari - Parque de Diversões");
    ev.setValor(100.00);

    Evento ev2 = new Evento();
    ev2.setDescricao("Passeio ao parque Aquatico...");
    ev2.setHorarioentrada("06:00");
    ev2.setHorariosaida("18:00");
    ev2.setLocal("Parque Aquático");
    ev2.setValor(120.00);

    //Cadastrar turma
    Turma t1 = new Turma(1, "Matutino", "1º");
    t1.setEv(ev);
    t1.setEv(ev2);
    Turma t7 = new Turma(7, "Matutino", "7º");

    //cadastro reponsável exemplo

    Responsavel resp1 = new Responsavel();
    resp1.setNome("Pai");
    resp1.setEndereco("Av. Carlos Caldeira, 2020");
    resp1.setDtnascimento("10/10/1973");
    resp1.setEmail("pai@gmail.com");
    resp1.setRg("56.458.789-2");
    resp1.setCpf("56.458.789-2");
    resp1.setSenha("123456");
    resp1.setTelefone("(11) 95236-4715");

    //Cadastro aluno exemplo

    Aluno aluno1 = new Aluno();
    aluno1.setNome("Raquel");
    aluno1.setEndereco("Av. Giovanni Gronchi, 870");
    aluno1.setDtnascimento("01/05/2002");
    aluno1.setRa("A001");
    aluno1.setTurma(t7);
    aluno1.setResp(resp1);
    aluno1.setRg("25.568.478-B");
    aluno1.setTelefone("(11) 95632-5687");

    Aluno aluno2 = new Aluno();
    aluno2.setNome("João");
    aluno2.setEndereco("Av. Carlos Caldeira, 2020");
    aluno2.setDtnascimento("10/10/2005");
    aluno2.setTurma(t1);
    aluno2.setResp(resp1);
    aluno2.setRa("A002");
    aluno2.setRg("56.458.789-2");
    aluno2.setTelefone("(11) 92359-4712");


    do{
      System.out.println("\n\n-----Tela de Login-----(Teste -login: pai@gmail // senha: 123456)\n\n");

      System.out.print("Email: ");
      login = scan.next();

      System.out.print("Senha: ");
      senha = scan.next();
    } while (login == resp1.getEmail() && senha == resp1.getSenha());

    System.out.println("\n\nBem Vindo " + resp1.getNome()+"\n");

    System.out.println("---Todos os Eventos---\n");

    int n = t1.getEvs().size();
    for(int i = 0; i < n; i++){
      Evento evento = t1.getEvs().get(i);
      System.out.println("-- " + evento.getLocal() + " --");
      System.out.println("Descricao: " + evento.getDescricao());
      System.out.println("Descricao: " + evento.getValor());
      System.out.println("---------------------------------------------------");
    }
    
  }
}