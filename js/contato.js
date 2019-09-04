function send (event) {

    event.preventDefault();
    //var name = document.getElementById("name").value;
    //var email = document.getElementById("email").value;
    //var age = parseInt(document.getElementById("age").value);
    //var phone = parseInt(document.getElementById("phone").value);
    //As expressões acima estão escritas como javascript puro
    //as expressões abaixo estão escritas em jquery
    var name = $("#name").val();
    var email = $("#email").val();
    var age = parseInt($("#age").val());
    var phone = parseInt($("#phone").val());
    var cep = $("#cep").val();
    var state = $("#state").val();
    var city= $("#city").val();
    var neighborhood = $("#neighborhood").val();
    var address = $("#address").val();
    var number = $("#number").val();
    var complement = $("#complement").val();
    var errors = [];
    var result = $("#result");
  
    if (name.split(" ").length < 2) {
      errors.push("Favor preencher o nome e sobrenome");
    }
    if (email=="") {
      errors.push("Favor informar o e-mail");
    }
    if (isNaN(age)) {
      errors.push("Campo idade obrigatório");
    }
    if (age < 18){
      errors.push("Permitido somente maiores de 18 anos");
    }
    if (isNaN(phone)) {
      errors.push("Campo telefone obrigatório");
    } else {
    if (phone.toString().length<10){
      errors.push("Favor informar telefone válido");
      }
    }
    if (cep=="") {
      errors.push("Campo CEP obrigatório");
    }
    if (state=="") {
      errors.push("Campo estado obrigatório");
    }
    if (city=="") {
      errors.push("Campo cidade obrigatório");
    }
    if (neighborhood=="") {
      errors.push("Campo bairro obrigatório");
    }
    if (address=="") {
      errors.push("Campo endereço obrigatório");
    }
    if (number=="") {
      errors.push("Campo número obrigatório");
    }
    if (complement=="") {
      errors.push("Campo complemento obrigatório");
    }
    if (errors.length>0) {
      //result.innerHTML = errors.join("</br>"); Imprimir o result javascript puro
      $("#result").html(errors.join("</br>"))
    }
    else {
      //result.innerHTML = (name + ", parabéns! seus dados foram preenchidos com sucesso.");Imprimir o result javascript puro
      $("#result").html(name + ", parabéns! seus dados foram preenchidos com sucesso.");
      clear();
    }
  }
  
  function clear (){
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
    $("#phone").val("");
    $("#cep").val("");
    $("#state").val("");
    $("#city").val("");
    $("#neighborhood").val("");
    $("#address").val("");
    $("#number").val("");
    $("#complement").val("");
  }
  
  //$('#cep').keyup(function() {
  //var cep = $('#cep').value;
  //$.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
    //console.info(dados);
    //console.info(dados.logradouro);
  //});
  $(document).ready(function() {
   function limpa_formulário_cep() {
       // Limpa valores do formulário de cep.
       $("#address").val("");
       $("#neighborhood").val("");
       $("#city").val("");
       $("#state").val("");
       $("#complement").val("");
   }
  
   //Quando o campo cep perde o foco.
   $("#cep").keyup(function() {
  
       //Nova variável "cep" somente com dígitos.
       var cep = $(this).val().replace(/\D/g, '');
  
       //Verifica se campo cep possui valor informado.
       if (cep.length>="8") {
  
           //Expressão regular para validar o CEP.
           var validacep = /^[0-9]{8}$/;
  
           //Valida o formato do CEP.
           if(validacep.test(cep)) {
  
               //Preenche os campos com "..." enquanto consulta webservice.
               $("#address").val("...");
               $("#neighborhood").val("...");
               $("#city").val("...");
               $("#state").val("...");
               $("#complement").val("...");
  
               //Consulta o webservice viacep.com.br/
               $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
  
                   if (!("erro" in dados)) {
                       //Atualiza os campos com os valores da consulta.
                       $("#address").val(dados.logradouro);
                       $("#neighborhood").val(dados.bairro);
                       $("#city").val(dados.localidade);
                       $("#state").val(dados.uf);
                       $("#complement").val(dados.complemento);
                   } //end if.
                   else {
                       //CEP pesquisado não foi encontrado.
                       limpa_formulário_cep();
                       alert("CEP não encontrado.");
                   }
               });
           } //end if.
           else {
               //cep é inválido.
               limpa_formulário_cep();
               alert("Formato de CEP inválido.");
           }
       } //end if.
       else {
           //cep sem valor, limpa formulário.
           limpa_formulário_cep();
       }
   });
  });