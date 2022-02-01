
let avatarEl = document.querySelector('#avatar');
let avatarFotoEl = document.querySelector('#foto-usuario');
let botaocomecarEl = document.querySelector('#comecar');
let nomeEl = document.querySelector('#nome')

botaocomecarEl.addEventListener('click', () => {
  let avatar = avatarEl.value;
  avatarFotoEl.src = `${avatar}`;
});


$('#comecar').click(function(){
  $('.tela-lgn').addClass('sair-baixo');
  setTimeout(function(){ 
    $('.tela-lgn').addClass('apagado');
    }, 500);
  $('.menu-lateral-sec').addClass('menu-lateral-sec-mostrar')
  $('.menu-lateral-opcoes').addClass('menu-lateral-opcoes-mostrar')
  let $usuario = $('#nome').val()
  $('#usuario').html(`${$usuario}`);
});
$('#comecar').click(function(){
  let $usuario = $('#nome').val()
  let $avatar = $('#avatar').val()
  $('#usuario').html(`${$usuario}`);
  $('#foto-usuario').attr('src', $avatar);
})

let pontuacao = localStorage.getItem('pontuacaoLS');
let acertos = localStorage.getItem('acertosLS');
let erros = localStorage.getItem('errosLS');
let segundos = localStorage.getItem('segundos');
let sequencia = localStorage.getItem('sequencia')

if (pontuacao == null || pontuacao == undefined)
{
  pontuacao = 0; 
}
if (acertos == null || acertos == undefined)
{
  acertos = 1; 
}

if (erros == null || erros == undefined)
{
  erros = 1; 
}

if (segundos == null || segundos == undefined)
{
  segundos = 0; 
}

if (sequencia == null || sequencia == undefined)
{
  sequencia = 0; 
}

acertos = 0 + parseInt(acertos);
erros = 0 + parseInt(erros);

$('#tempo').html(`${segundos} seg`)
$('#50-alvos').html(pontuacao);
$('#sequencia').html(sequencia);

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  let data = google.visualization.arrayToDataTable([
    ['A/E', 'Porcentagem'],
    ['Acertos', 0 + acertos],
    ['Erros', 0 + erros],
  ]);

  let options = {
    title: 'TOTAL DE ACERTOS E ERROS'
  };

  let chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}
