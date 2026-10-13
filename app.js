(function(){
'use strict';
var uno=function(selector,raiz){return (raiz||document).querySelector(selector)};
var varios=function(selector,raiz){return Array.prototype.slice.call((raiz||document).querySelectorAll(selector))};
function crearElemento(etiqueta,clase,html){var e=document.createElement(etiqueta);if(clase)e.className=clase;if(html!==undefined)e.innerHTML=html;return e}

/* ---------- datos de los clubes ---------- */
var CLUBES={
 AME:{nombre:'América',color:'#f6d33f'},CHI:{nombre:'Chivas',color:'#e63946'},TOL:{nombre:'Toluca',color:'#ff6f3c'},CAZ:{nombre:'Cruz Azul',color:'#3a86ff'},
 LEO:{nombre:'León',color:'#2dc653'},TIG:{nombre:'Tigres',color:'#ffa62b'},PUM:{nombre:'Pumas',color:'#b08d57'},PAC:{nombre:'Pachuca',color:'#9db4d6'},
 SAN:{nombre:'Santos Laguna',color:'#2ec4b6'},MTY:{nombre:'Monterrey',color:'#5c6bc0'},ATE:{nombre:'Atlante',color:'#c77dff'},ATS:{nombre:'Atlas',color:'#b5446e'},
 NEC:{nombre:'Necaxa',color:'#ff5d8f'},PUE:{nombre:'Puebla',color:'#4cc9f0'},ZAC:{nombre:'Zacatepec',color:'#f4a261'},VER:{nombre:'Veracruz',color:'#06d6a0'},
 AST:{nombre:'Asturias',color:'#8d99ae'},ESP:{nombre:'Real Club España',color:'#e07a5f'},TAM:{nombre:'Tampico Madero',color:'#7b6cc4'},MAR:{nombre:'Marte',color:'#8ecae6'},
 ORO:{nombre:'Oro',color:'#d4a373'},UAG:{nombre:'UAG (Tecos)',color:'#6a994e'},MOR:{nombre:'Morelia',color:'#f2cc8f'},TIJ:{nombre:'Tijuana',color:'#ff4d6d'}
};
var OTROS_CLUBES={QRO:'Querétaro',NEZ:'Toros Neza',AEP:'Atlético Español',UDG:'U. de Guadalajara',CEL:'Atlético Celaya',SLP:'San Luis'};
function nombreClub(codigo){return CLUBES[codigo]?CLUBES[codigo].nombre:(OTROS_CLUBES[codigo]||codigo)}
function colorClub(codigo){return CLUBES[codigo]?CLUBES[codigo].color:'#8a8f98'}

/* ---------- escudos: archivos que aportó el autor de la página; los clubes sin archivo llevan un escudo genérico del color del club ---------- */
var ESCUDOS={MTY:'monterrey',CAZ:'cruz-azul',NEC:'necaxa',CHI:'chivas',ATS:'atlas',TOL:'toluca',SAN:'santos',ATE:'atlante',AME:'america',LEO:'leon',TIG:'tigres',PAC:'pachuca',PUE:'puebla',PUM:'pumas',QRO:'queretaro',TIJ:'tijuana',SLP:'atletico-san-luis',JUA:'juarez',AST:'asturias',UAG:'uag-tecos',AEP:'atletico-espanol',MAR:'marte',UDG:'u-de-guadalajara',ESP:'real-club-espana',MOR:'morelia',ORO:'oro',TAM:'tampico-madero',NEZ:'toros-neza',ZAC:'zacatepec',VER:'veracruz',CEL:'atletico-celaya'};
function crearEscudo(codigo,tamano,enLinea){
  var caja=document.createElement('span');
  caja.className='escudo'+(enLinea?' en-linea':'');
  caja.style.setProperty('--t',(tamano||24)+'px');
  caja.setAttribute('aria-hidden','true');
  if(ESCUDOS[codigo]){
    var img=document.createElement('img');img.alt='';img.draggable=false;
    /* si el archivo no carga, se muestra el escudo genérico para que nunca quede un hueco */
    img.addEventListener('error',function(){
      var color=colorClub(codigo);
      if(caja.classList.contains('generico'))return;
      img.remove();caja.classList.add('generico');caja.style.setProperty('--c',color);caja.style.setProperty('--tc',colorTextoSobre(color));
      if(tamano>=32)caja.dataset.sigla=codigo;
    });
    img.src=''+ESCUDOS[codigo]+'.webp';
    caja.appendChild(img);
  }else{
    var color=colorClub(codigo);
    caja.className+=' generico';caja.style.setProperty('--c',color);caja.style.setProperty('--tc',colorTextoSobre(color));
    if(tamano>=32)caja.dataset.sigla=codigo;
  }
  return caja;
}

/* ---------- datos de los torneos: [etiqueta, año, código del campeón] ---------- */
function crearTorneo(fila){return {etiqueta:fila[0],anio:fila[1],club:fila[2]}}
var ERA_LARGOS=[['1943-44',1944,'AST'],['1944-45',1945,'ESP'],['1945-46',1946,'VER'],['1946-47',1947,'ATE'],['1947-48',1948,'LEO'],['1948-49',1949,'LEO'],['1949-50',1950,'VER'],['1950-51',1951,'ATS'],['1951-52',1952,'LEO'],['1952-53',1953,'TAM'],['1953-54',1954,'MAR'],['1954-55',1955,'ZAC'],['1955-56',1956,'LEO'],['1956-57',1957,'CHI'],['1957-58',1958,'ZAC'],['1958-59',1959,'CHI'],['1959-60',1960,'CHI'],['1960-61',1961,'CHI'],['1961-62',1962,'CHI'],['1962-63',1963,'ORO'],['1963-64',1964,'CHI'],['1964-65',1965,'CHI'],['1965-66',1966,'AME'],['1966-67',1967,'TOL'],['1967-68',1968,'TOL'],['1968-69',1969,'CAZ'],['1969-70',1970,'CHI'],['México 1970',1970,'CAZ']].map(crearTorneo);
var ERA_LIGUILLA=[['1970-71',1971,'AME'],['1971-72',1972,'CAZ'],['1972-73',1973,'CAZ'],['1973-74',1974,'CAZ'],['1974-75',1975,'TOL'],['1975-76',1976,'AME'],['1976-77',1977,'PUM'],['1977-78',1978,'TIG'],['1978-79',1979,'CAZ'],['1979-80',1980,'CAZ'],['1980-81',1981,'PUM'],['1981-82',1982,'TIG'],['1982-83',1983,'PUE'],['1983-84',1984,'AME'],['1984-85',1985,'AME'],['PRODE 1985',1985,'AME'],['México 1986',1986,'MTY'],['1986-87',1987,'CHI'],['1987-88',1988,'AME'],['1988-89',1989,'AME'],['1989-90',1990,'PUE'],['1990-91',1991,'PUM'],['1991-92',1992,'LEO'],['1992-93',1993,'ATE'],['1993-94',1994,'UAG'],['1994-95',1995,'NEC'],['1995-96',1996,'NEC']].map(crearTorneo);
var ERA_CORTOS=[['Invierno 1996',1996,'SAN'],['Verano 1997',1997,'CHI'],['Invierno 1997',1997,'CAZ'],['Verano 1998',1998,'TOL'],['Invierno 1998',1998,'NEC'],['Verano 1999',1999,'TOL'],['Invierno 1999',1999,'PAC'],['Verano 2000',2000,'TOL'],['Invierno 2000',2000,'MOR'],['Verano 2001',2001,'SAN'],['Invierno 2001',2001,'PAC'],['Verano 2002',2002,'AME'],['Apertura 2002',2002,'TOL'],['Clausura 2003',2003,'MTY'],['Apertura 2003',2003,'PAC'],['Clausura 2004',2004,'PUM'],['Apertura 2004',2004,'PUM'],['Clausura 2005',2005,'AME'],['Apertura 2005',2005,'TOL'],['Clausura 2006',2006,'PAC'],['Apertura 2006',2006,'CHI'],['Clausura 2007',2007,'PAC'],['Apertura 2007',2007,'ATE'],['Clausura 2008',2008,'SAN'],['Apertura 2008',2008,'TOL'],['Clausura 2009',2009,'PUM'],['Apertura 2009',2009,'MTY'],['Bicentenario 2010',2010,'TOL'],['Apertura 2010',2010,'MTY'],['Clausura 2011',2011,'PUM'],['Apertura 2011',2011,'TIG'],['Clausura 2012',2012,'SAN'],['Apertura 2012',2012,'TIJ'],['Clausura 2013',2013,'AME'],['Apertura 2013',2013,'LEO'],['Clausura 2014',2014,'LEO'],['Apertura 2014',2014,'AME'],['Clausura 2015',2015,'SAN'],['Apertura 2015',2015,'TIG'],['Clausura 2016',2016,'PAC'],['Apertura 2016',2016,'TIG'],['Clausura 2017',2017,'CHI'],['Apertura 2017',2017,'TIG'],['Clausura 2018',2018,'SAN'],['Apertura 2018',2018,'AME'],['Clausura 2019',2019,'TIG'],['Apertura 2019',2019,'MTY'],['Clausura 2020',2020,null],['Guardianes 2020',2020,'LEO'],['Guard1anes 2021',2021,'CAZ'],['Apertura 2021',2021,'ATS'],['Clausura 2022',2022,'ATS'],['Apertura 2022',2022,'PAC'],['Clausura 2023',2023,'TIG'],['Apertura 2023',2023,'AME'],['Clausura 2024',2024,'AME'],['Apertura 2024',2024,'AME'],['Clausura 2025',2025,'TOL'],['Apertura 2025',2025,'TOL'],['Clausura 2026',2026,'CAZ']].map(crearTorneo);
var TORNEOS=ERA_LARGOS.concat(ERA_LIGUILLA,ERA_CORTOS);
var ERAS=[
 {titulo:'1943–1970 · Torneos largos',descripcion:'Todos contra todos a doble vuelta. El líder de la tabla era el campeón. Dos puntos por victoria.',torneos:ERA_LARGOS},
 {titulo:'1970–1996 · Largos con Liguilla',descripcion:'Desde 1970-71 el campeón sale de una fase final. Incluye los torneos especiales PRODE 1985 y México 1986.',torneos:ERA_LIGUILLA},
 {titulo:'1996–hoy · Torneos cortos',descripcion:'Dos campeones por año: Invierno y Verano, luego Apertura y Clausura desde 2002. Liguilla con ida y vuelta.',torneos:ERA_CORTOS}
];
var NOTAS={
 '1943-44':'Primer campeón de la era profesional.',
 '1946-47':'Atlante ganó entre polémica: una cuarentena por fiebre aftosa movió el partido decisivo contra León a la casa del Atlante, y terminó 0-0.',
 '1956-57':'Primer título de Chivas, que jugaba solo con futbolistas nacidos en México.',
 '1958-59':'Empieza una racha de cuatro campeonatos seguidos de Chivas.',
 '1969-70':'Octavo título de Chivas entre 1957 y 1970.',
 'México 1970':'Torneo corto previo al Mundial. Cruz Azul lideró la fase de campeonato.',
 '1970-71':'Primera Liguilla de la historia. América venció a Toluca: 0-0 en la ida y 2-0 en el Azteca.',
 '1971-72':'Final a partido único en el Estadio Azteca, Cruz Azul contra América.',
 '1974-75':'Cuadrangular final sin partido de final. Toluca lo definió al ganar 1-0 a León.',
 '1982-83':'Puebla venció en la final a Chivas, que había eliminado en semifinales a un América récord, con 26 victorias en la fase regular.',
 '1983-84':'América se vengó de Chivas: ganó 3-1 la vuelta y 5-3 el global.',
 '1984-85':'América necesitó un tercer partido de desempate ante Pumas.',
 'PRODE 1985':'América remontó: perdía la ida contra Tampico Madero y ganó 4-0 la vuelta. Tricampeonato.',
 '1986-87':'Chivas rompió una sequía de 17 años.',
 '1989-90':'Puebla ganó Liga y Copa el mismo año y entró al grupo de los Campeonísimos.',
 '1991-92':'León terminó 36 años sin campeonato.',
 '1992-93':'Atlante rompió una espera de 46 años.',
 '1993-94':'Único título de la UAG, los Tecos.',
 '1994-95':'Necaxa empieza su bicampeonato y también gana la Copa México.',
 '1995-96':'Última temporada larga. Necaxa ganó por gol de visitante.',
 'Invierno 1996':'Primer torneo corto de la historia y primer título de Santos.',
 'Invierno 1997':'Cruz Azul acabó con 17 años de espera. El gol de oro decidió la final.',
 'Verano 1998':'Toluca rompió 23 años sin ser campeón.',
 'Invierno 1999':'Primer título de Pachuca, definido con gol de oro.',
 'Verano 2000':'Toluca eliminó a Puebla con un global de 9-0, récord de goles en una llave que duró 22 años.',
 'Invierno 2000':'Único título de Morelia.',
 'Verano 2002':'América ganó con gol de oro.',
 'Clausura 2004':'Pumas empieza el primer bicampeonato de la era de torneos cortos.',
 'Apertura 2004':'Pumas, bicampeón con Hugo Sánchez como entrenador.',
 'Apertura 2007':'Atlante rompió 14 años sin título.',
 'Apertura 2011':'Tigres terminó 29 años sin campeonato.',
 'Apertura 2012':'Tijuana ganó con solo 59 partidos en Primera tras ascender, el título más rápido de un recién ascendido.',
 'Apertura 2013':'León empieza su bicampeonato.',
 'Clausura 2014':'León, bicampeón, como ya lo había sido en 1947-49.',
 'Clausura 2017':'Chivas llegó a 12 títulos. América ya le había quitado el liderato histórico.',
 'Clausura 2020':'Torneo cancelado por la pandemia de Covid-19. El título quedó vacante, pero sus estadísticas sí cuentan.',
 'Apertura 2021':'Atlas terminó 70 años sin ser campeón.',
 'Apertura 2022':'Pachuca campeón. En cuartos, América le ganó 11-2 en el global a Puebla.',
 'Apertura 2023':'Empieza el tricampeonato de América.',
 'Apertura 2024':'Tercer título seguido de América, récord en la era de torneos cortos.',
 'Clausura 2025':'Toluca empieza su bicampeonato.',
 'Apertura 2025':'Toluca, bicampeón: venció a Tigres en penales, 9-8, tras un global de 2-2.',
 'Clausura 2026':'Cruz Azul remontó a Pumas en CU (0-0 la ida, 2-1 la vuelta). Rotondi marcó al 90+5. Décimo título, con Joel Huiqui como técnico interino.'
};

/* ---------- finales: [subcampeón, marcador] por torneo. El marcador va con los goles del campeón primero ---------- */
var FINALES={
'1943-44':['ESP','4-1'],'1944-45':['PUE',''],'1945-46':['ATE',''],'1946-47':['LEO',''],'1947-48':['ORO','0-0 y 2-0 en el desempate'],'1948-49':['ATS',''],'1949-50':['ATE',''],'1950-51':['ATE',''],'1951-52':['CHI',''],'1952-53':['ZAC',''],'1953-54':['ORO',''],'1954-55':['CHI',''],'1955-56':['ORO','4-2 en el desempate'],'1956-57':['TOL',''],'1957-58':['TOL',''],'1958-59':['LEO',''],'1959-60':['AME',''],'1960-61':['ORO',''],'1961-62':['AME',''],'1962-63':['CHI',''],'1963-64':['AME',''],'1964-65':['ORO',''],'1965-66':['ATS',''],'1966-67':['AME',''],'1967-68':['PUM',''],'1968-69':['CHI',''],'1969-70':['CAZ',''],'México 1970':['CHI',''],
'1970-71':['TOL','0-0 y 2-0'],'1971-72':['AME','4-1 en partido único'],'1972-73':['LEO','1-1, 0-0 y 2-1 en el desempate'],'1973-74':['AEP','1-2 y 3-0'],'1974-75':['LEO','cuadrangular final'],'1975-76':['UDG','3-0 y 1-0'],'1976-77':['UDG','0-0 y 1-0'],'1977-78':['PUM','2-0 y 1-1'],'1978-79':['PUM','0-0 y 2-0'],'1979-80':['TIG','1-0 y 3-3'],'1980-81':['CAZ','0-1 y 4-1'],'1981-82':['ATE','2-1 y 0-1, penales 3-1'],'1982-83':['CHI','1-2 y 1-0, penales 7-6'],'1983-84':['CHI','2-2 y 3-1'],'1984-85':['PUM','1-1, 0-0 y 3-1 en el tercer partido'],'PRODE 1985':['TAM','1-4 y 4-0'],'México 1986':['TAM','1-2 y 2-0'],'1986-87':['CAZ','1-2 y 3-0'],'1987-88':['PUM','0-1 y 4-1'],'1988-89':['CAZ','3-2 y 2-2'],'1989-90':['UDG','2-1 y 4-3'],'1990-91':['AME','2-3 y 1-0, gol de visitante'],'1991-92':['PUE','0-0 y 2-0'],'1992-93':['MTY','1-0 y 3-0'],'1993-94':['SAN','0-1 y 2-0'],'1994-95':['CAZ','1-1 y 2-0'],'1995-96':['CEL','1-1 y 0-0, gol de visitante'],
'Invierno 1996':['NEC','0-1 y 4-2'],'Verano 1997':['NEZ','1-1 y 6-1'],'Invierno 1997':['LEO','1-0 y 1-1, gol de oro'],'Verano 1998':['NEC','1-2 y 5-2'],'Invierno 1998':['CHI','0-0 y 2-0'],'Verano 1999':['ATS','3-3 y 2-2, penales 5-4'],'Invierno 1999':['CAZ','2-2 y 1-0, gol de oro'],'Verano 2000':['SAN','2-0 y 5-1'],'Invierno 2000':['TOL','3-1 y 0-2, penales 5-4'],'Verano 2001':['PAC','1-2 y 3-1'],'Invierno 2001':['TIG','2-0 y 1-1'],'Verano 2002':['NEC','0-2 y 3-0, gol de oro'],'Apertura 2002':['MOR','0-1 y 4-1'],'Clausura 2003':['MOR','3-1 y 0-0'],'Apertura 2003':['TIG','3-1 y 0-1'],'Clausura 2004':['CHI','1-1 y 0-0, penales 5-4'],'Apertura 2004':['MTY','2-1 y 1-0'],'Clausura 2005':['UAG','1-1 y 6-3'],'Apertura 2005':['MTY','3-3 y 3-0'],'Clausura 2006':['SLP','0-0 y 1-0'],'Apertura 2006':['TOL','1-1 y 2-1'],'Clausura 2007':['AME','2-1 y 1-1'],'Apertura 2007':['PUM','0-0 y 2-1'],'Clausura 2008':['CAZ','2-1 y 1-1'],'Apertura 2008':['CAZ','2-0 y 0-2, penales 7-6'],'Clausura 2009':['PAC','1-0 y 2-2'],'Apertura 2009':['CAZ','4-3 y 2-1'],'Bicentenario 2010':['SAN','2-2 y 0-0, penales 4-3'],'Apertura 2010':['SAN','2-3 y 3-0'],'Clausura 2011':['MOR','1-1 y 2-1'],'Apertura 2011':['SAN','1-0 y 3-1'],'Clausura 2012':['MTY','1-1 y 2-1'],'Apertura 2012':['TOL','2-1 y 2-0'],'Clausura 2013':['CAZ','0-1 y 2-1, penales 4-2'],'Apertura 2013':['AME','2-0 y 3-1'],'Clausura 2014':['PAC','2-3 y 2-0'],'Apertura 2014':['TIG','0-1 y 3-0'],'Clausura 2015':['QRO','5-0 y 0-3'],'Apertura 2015':['PUM','3-0 y 1-4, penales 4-2'],'Clausura 2016':['MTY','1-0 y 1-1'],'Apertura 2016':['AME','1-1 y 1-1, penales 3-0'],'Clausura 2017':['TIG','2-2 y 2-1'],'Apertura 2017':['MTY','1-1 y 2-1'],'Clausura 2018':['TOL','2-1 y 1-1'],'Apertura 2018':['CAZ','0-0 y 2-0'],'Clausura 2019':['LEO','1-0 y 0-0'],'Apertura 2019':['AME','2-1 y 1-2, penales 4-2'],'Guardianes 2020':['PUM','1-1 y 2-0'],'Guard1anes 2021':['SAN','1-0 y 1-1'],'Apertura 2021':['LEO','2-3 y 1-0, penales 4-3'],'Clausura 2022':['PAC','2-0 y 1-2'],'Apertura 2022':['TOL','5-1 y 3-1'],'Clausura 2023':['CHI','0-0 y 3-2'],'Apertura 2023':['TIG','1-1 y 3-0'],'Clausura 2024':['CAZ','1-1 y 1-0'],'Apertura 2024':['MTY','2-1 y 1-1'],'Clausura 2025':['AME','0-0 y 2-0'],'Apertura 2025':['TIG','0-1 y 2-1, penales 9-8'],'Clausura 2026':['PUM','0-0 y 2-1']
};

/* ---------- cuentas generales ---------- */
var totalCampeonatos=0,titulosPorClub={};
TORNEOS.forEach(function(t){if(t.club){totalCampeonatos++;titulosPorClub[t.club]=(titulosPorClub[t.club]||0)+1}});
function primerAnio(codigo){for(var i=0;i<TORNEOS.length;i++)if(TORNEOS[i].club===codigo)return TORNEOS[i].anio;return 9999}
var clubesOrdenados=Object.keys(CLUBES).sort(function(a,b){return (titulosPorClub[b]-titulosPorClub[a])||(primerAnio(a)-primerAnio(b))});
function colorTextoSobre(hex){var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return (0.299*r+0.587*g+0.114*b)>150?'#10170f':'#ffffff'}
function etiquetaCorta(etiqueta){
  var m;
  if((m=/^Invierno (\d{4})$/.exec(etiqueta)))return 'I'+m[1].slice(2);
  if((m=/^Verano (\d{4})$/.exec(etiqueta)))return 'V'+m[1].slice(2);
  if((m=/^Apertura (\d{4})$/.exec(etiqueta)))return 'A'+m[1].slice(2);
  if((m=/^Clausura (\d{4})$/.exec(etiqueta)))return 'C'+m[1].slice(2);
  if((m=/^Guard\w+ (\d{4})$/.exec(etiqueta)))return 'G'+m[1].slice(2);
  if((m=/^Bicentenario (\d{4})$/.exec(etiqueta)))return 'B'+m[1].slice(2);
  if((m=/^PRODE (\d{4})$/.exec(etiqueta)))return 'P'+m[1].slice(2);
  if((m=/^México (\d{4})$/.exec(etiqueta)))return 'M'+m[1].slice(2);
  if((m=/^(\d{2})(\d{2})-(\d{2})$/.exec(etiqueta)))return m[2]+'-'+m[3];
  return etiqueta;
}
function notaDe(torneo){
  if(NOTAS[torneo.etiqueta])return NOTAS[torneo.etiqueta];
  if(torneo.club&&titulosPorClub[torneo.club]===1)return 'Único título de '+CLUBES[torneo.club].nombre+'.';
  return '';
}
/* Crea una fila de barra horizontal: nombre con subtítulo a la izquierda, barra y valor a la derecha */
function crearFilaBarra(nombre,subtitulo,porcentaje,color,textoValor,rayada,codigo){
  var fila=crearElemento('div','fila-barra','<div class="rotulo"></div><div class="pista"><i></i><span></span></div>');
  var rotulo=uno('.rotulo',fila);
  if(codigo)rotulo.appendChild(crearEscudo(codigo,20,true));
  rotulo.appendChild(document.createTextNode(nombre));
  if(subtitulo){var peque=document.createElement('small');peque.textContent=subtitulo;rotulo.appendChild(peque)}
  var barra=uno('i',fila);barra.style.width=porcentaje+'%';
  if(color)barra.style.background=color;
  if(rayada)barra.className='rayado';
  var valor=uno('.pista span',fila);valor.style.left=porcentaje+'%';valor.textContent=textoValor;
  return fila;
}

/* ---------- portada ---------- */
uno('#cifra-total').textContent=totalCampeonatos;
uno('#cifra-clubes').textContent=Object.keys(titulosPorClub).length;
uno('#cifra-america').textContent=titulosPorClub.AME;
var codigoBarras=uno('#codigo-barras'),lecturaCodigo=uno('#lectura-codigo');
TORNEOS.forEach(function(t){var franja=document.createElement('i');if(t.club)franja.style.background=CLUBES[t.club].color;else franja.className='vacio';codigoBarras.appendChild(franja)});
function mostrarLectura(indice){
  var t=TORNEOS[indice];
  lecturaCodigo.innerHTML='';
  var titulo=document.createElement('b');
  if(t.club){
    var punto=document.createElement('i');punto.className='punto';punto.style.background=CLUBES[t.club].color;lecturaCodigo.appendChild(punto);
    titulo.textContent=CLUBES[t.club].nombre;
  }else titulo.textContent='Sin campeón';
  lecturaCodigo.appendChild(titulo);
  var detalleLectura=document.createElement('span');detalleLectura.className='mono';detalleLectura.textContent=t.etiqueta+' · '+t.anio;lecturaCodigo.appendChild(detalleLectura);
}
mostrarLectura(TORNEOS.length-1);
codigoBarras.addEventListener('pointermove',function(e){var caja=codigoBarras.getBoundingClientRect();mostrarLectura(Math.min(TORNEOS.length-1,Math.max(0,Math.floor((e.clientX-caja.left)/caja.width*TORNEOS.length))))});
codigoBarras.addEventListener('pointerleave',function(){mostrarLectura(TORNEOS.length-1)});

/* ---------- carrera de títulos ---------- */
var ALTO_FILA=30,MAX_TITULOS=16;
var carrera=uno('#carrera'),filasCarrera={};
clubesOrdenados.forEach(function(codigo){
  var fila=crearElemento('div','fila-carrera','<span class="nombre"></span><span class="pista"><span class="barra"></span><span class="cuenta"></span></span>');
  fila.style.opacity=0;
  var nombreFila=uno('.nombre',fila);nombreFila.appendChild(crearEscudo(codigo,22));var textoFila=document.createElement('span');textoFila.className='texto';textoFila.textContent=CLUBES[codigo].nombre;nombreFila.appendChild(textoFila);
  uno('.barra',fila).style.background=CLUBES[codigo].color;
  carrera.appendChild(fila);filasCarrera[codigo]=fila;
});
function fijarAnio(anio){
  var cuenta={},ganaronEsteAnio={};
  TORNEOS.forEach(function(t){if(t.club&&t.anio<=anio){cuenta[t.club]=(cuenta[t.club]||0)+1;if(t.anio===anio)ganaronEsteAnio[t.club]=1}});
  var activos=Object.keys(cuenta).sort(function(a,b){return (cuenta[b]-cuenta[a])||(primerAnio(a)-primerAnio(b))});
  carrera.style.height=Math.max(1,activos.length)*ALTO_FILA+'px';
  clubesOrdenados.forEach(function(codigo){
    var fila=filasCarrera[codigo],lugar=activos.indexOf(codigo);
    if(lugar<0){fila.style.opacity=0;fila.style.transform='translateY('+(activos.length*ALTO_FILA)+'px)';fila.style.pointerEvents='none';return}
    fila.style.opacity=1;fila.style.transform='translateY('+(lugar*ALTO_FILA)+'px)';
    var porcentaje=cuenta[codigo]/MAX_TITULOS*88;
    uno('.barra',fila).style.width=porcentaje+'%';
    var numero=uno('.cuenta',fila);numero.style.left=porcentaje+'%';numero.textContent=cuenta[codigo];
    fila.classList.toggle('gano-este-anio',!!ganaronEsteAnio[codigo]);
  });
  uno('#anio').textContent=anio;
  var ganadores=TORNEOS.filter(function(t){return t.anio===anio});
  var contenedor=uno('#campeones-anio');contenedor.innerHTML='';
  var encabezado=document.createElement('span');encabezado.innerHTML='<b>Campeones de '+anio+':</b> ';contenedor.appendChild(encabezado);
  var partes=ganadores.map(function(t){return t.club?(CLUBES[t.club].nombre+' ('+t.etiqueta+')'):(t.etiqueta+': sin campeón')});
  contenedor.appendChild(document.createTextNode(partes.join(' · ')));
}
var controlAnio=uno('#control-anio'),temporizador=null,botonReproducir=uno('#reproducir');
controlAnio.addEventListener('input',function(){detener();fijarAnio(+controlAnio.value)});
function detener(){if(temporizador){clearInterval(temporizador);temporizador=null}botonReproducir.textContent='▶ Reproducir'}
botonReproducir.addEventListener('click',function(){
  if(temporizador){detener();return}
  if(+controlAnio.value>=+controlAnio.max)controlAnio.value=controlAnio.min;
  fijarAnio(+controlAnio.value);
  botonReproducir.textContent='❚❚ Pausar';
  temporizador=setInterval(function(){
    if(+controlAnio.value>=+controlAnio.max){detener();return}
    controlAnio.value=+controlAnio.value+1;fijarAnio(+controlAnio.value);
  },200);
});
fijarAnio(2026);

/* ---------- línea del tiempo ---------- */
var cuadros=[];
var cajaEtiquetas=uno('#etiquetas-club');
function crearEtiqueta(texto,clave,color){
  var boton=crearElemento('button','etiqueta');boton.type='button';boton.setAttribute('aria-pressed','false');boton.dataset.clave=clave;
  if(clave)boton.appendChild(crearEscudo(clave,20));
  boton.appendChild(document.createTextNode(texto));return boton;
}
cajaEtiquetas.appendChild(crearEtiqueta('Todos','',null));
clubesOrdenados.forEach(function(codigo){cajaEtiquetas.appendChild(crearEtiqueta(CLUBES[codigo].nombre+' '+titulosPorClub[codigo],codigo,CLUBES[codigo].color))});
cajaEtiquetas.addEventListener('click',function(e){
  var boton=e.target.closest('.etiqueta');if(!boton)return;
  seleccionarClub(boton.dataset.clave||null);
});
function crearCuadro(torneo,indice,interactivo){
  var cuadro=document.createElement(interactivo?'button':'div');
  cuadro.className='cuadro'+(torneo.club?'':' vacio');
  if(interactivo){cuadro.type='button';cuadro.dataset.indice=indice}
  if(torneo.club){var color=CLUBES[torneo.club].color;cuadro.style.background=color;cuadro.style.color=colorTextoSobre(color);cuadro.innerHTML='<b>'+torneo.club+'</b><small>'+etiquetaCorta(torneo.etiqueta)+'</small>'}
  else cuadro.innerHTML='<b>—</b><small>'+etiquetaCorta(torneo.etiqueta)+'</small>';
  cuadro.title=torneo.etiqueta+(torneo.club?' · '+CLUBES[torneo.club].nombre:' · sin campeón');
  return cuadro;
}
var cajaEras=uno('#eras'),desplazamiento=0;
ERAS.forEach(function(era){
  var bloque=crearElemento('div','era','<h3></h3><p></p><div class="cuadricula"></div>');
  uno('h3',bloque).textContent=era.titulo;uno('p',bloque).textContent=era.descripcion;
  var cuadricula=uno('.cuadricula',bloque);
  era.torneos.forEach(function(t,j){var cuadro=crearCuadro(t,desplazamiento+j,true);cuadricula.appendChild(cuadro);cuadros[desplazamiento+j]=cuadro});
  desplazamiento+=era.torneos.length;cajaEras.appendChild(bloque);
});
cajaEras.addEventListener('click',function(e){
  var cuadro=e.target.closest('.cuadro');if(!cuadro)return;mostrarDetalle(+cuadro.dataset.indice);
});
var detalle=uno('#detalle');
function mostrarDetalle(indice){
  var t=TORNEOS[indice];
  cuadros.forEach(function(c,j){if(j===indice)c.setAttribute('aria-current','true');else c.removeAttribute('aria-current')});
  detalle.innerHTML='';
  var titulo=document.createElement('h3');if(t.club)titulo.appendChild(crearEscudo(t.club,40));titulo.appendChild(document.createTextNode(t.club?CLUBES[t.club].nombre+' · '+t.etiqueta:t.etiqueta));detalle.appendChild(titulo);
  var parrafo=document.createElement('p');
  var nota=notaDe(t),numeroTitulo='',textoFinal='';
  if(t.club){
    var contador=0;for(var j=0;j<=indice;j++)if(TORNEOS[j].club===t.club)contador++;
    numeroTitulo='Título número '+contador+' de '+titulosPorClub[t.club]+' del club. ';
  }
  var final=FINALES[t.etiqueta];
  parrafo.appendChild(document.createTextNode(numeroTitulo+nota));
  if(t.club&&final){parrafo.appendChild(document.createTextNode(' Final contra '));parrafo.appendChild(crearEscudo(final[0],20,true));parrafo.appendChild(document.createTextNode(nombreClub(final[0])+(final[1]?': '+final[1]+'.':'.')))}
  detalle.appendChild(parrafo);
}
function seleccionarClub(codigo){
  varios('.etiqueta',cajaEtiquetas).forEach(function(b){b.setAttribute('aria-pressed',String((b.dataset.clave||null)===codigo))});
  cuadros.forEach(function(c,i){c.classList.toggle('apagado',!!codigo&&TORNEOS[i].club!==codigo)});
  if(codigo){
    var lista=TORNEOS.filter(function(t){return t.club===codigo}).map(function(t){return t.etiqueta});
    detalle.innerHTML='';
    var titulo=document.createElement('h3');titulo.appendChild(crearEscudo(codigo,40));titulo.appendChild(document.createTextNode(CLUBES[codigo].nombre+' · '+titulosPorClub[codigo]+(titulosPorClub[codigo]===1?' título':' títulos')));detalle.appendChild(titulo);
    var parrafo=document.createElement('p');parrafo.textContent=lista.join(', ')+'.';detalle.appendChild(parrafo);
  }else mostrarDetalle(TORNEOS.length-1);
}
seleccionarClub(null);

/* ---------- finales: subcampeones y cómo se decidieron ---------- */
(function(){
  var subcampeonatos={};
  TORNEOS.forEach(function(t){var f=FINALES[t.etiqueta];if(t.club&&f)subcampeonatos[f[0]]=(subcampeonatos[f[0]]||0)+1});
  var codigos=Object.keys(subcampeonatos).sort(function(a,b){return subcampeonatos[b]-subcampeonatos[a]||nombreClub(a).localeCompare(nombreClub(b))}).slice(0,10);
  var caja=uno('#subcampeones'),maximo=subcampeonatos[codigos[0]];
  codigos.forEach(function(codigo){
    var titulos=titulosPorClub[codigo]||0;
    caja.appendChild(crearFilaBarra(nombreClub(codigo),titulos+(titulos===1?' título':' títulos'),subcampeonatos[codigo]/maximo*88,colorClub(codigo),subcampeonatos[codigo],false,codigo));
  });
  /* el resto de los finalistas que se quedaron fuera del top 10 (aquí aparece, por ejemplo, la U. de Guadalajara) */
  var restoCodigos=Object.keys(subcampeonatos).filter(function(c){return codigos.indexOf(c)<0}).sort(function(a,b){return subcampeonatos[b]-subcampeonatos[a]||nombreClub(a).localeCompare(nombreClub(b))});
  if(restoCodigos.length){
    var otros=crearElemento('div','otros-finalistas','<small>También fueron subcampeones</small><div class="escudos-ciudad"></div>');
    var fichas=uno('.escudos-ciudad',otros);
    restoCodigos.forEach(function(c){
      var ficha=crearElemento('span','ficha-finalista','');
      ficha.appendChild(crearEscudo(c,26,true));
      ficha.appendChild(document.createTextNode(nombreClub(c)+' ('+subcampeonatos[c]+')'));
      fichas.appendChild(ficha);
    });
    caja.parentNode.appendChild(otros);
  }
  var definidasEnPenales=[],golDeOro=0,golDeVisitante=0;
  TORNEOS.forEach(function(t){
    var f=FINALES[t.etiqueta];if(!t.club||!f)return;
    if(/penales/.test(f[1]))definidasEnPenales.push(t);
    if(/gol de oro/.test(f[1]))golDeOro++;
    if(/gol de visitante/.test(f[1]))golDeVisitante++;
  });
  var cajaRegistros=uno('#como-se-definieron');
  [[String(definidasEnPenales.length),'finales definidas en penales, la mayoría en la era de torneos cortos.'],[String(golDeOro),'finales con gol de oro: Invierno 1997, Invierno 1999 y Verano 2002.'],[String(golDeVisitante),'finales por gol de visitante: 1990-91 (Pumas) y 1995-96 (Necaxa).']].forEach(function(r){
    var registro=crearElemento('div','registro','<strong></strong><span></span>');uno('strong',registro).textContent=r[0];uno('span',registro).textContent=r[1];cajaRegistros.appendChild(registro);
  });
  var listaPenales=uno('#lista-penales');
  definidasEnPenales.forEach(function(t){
    var f=FINALES[t.etiqueta];var m=/penales (\d+-\d+)/.exec(f[1]);
    var item=crearElemento('li','','<b></b> · <span></span>');
    uno('b',item).textContent=t.etiqueta;
    uno('span',item).textContent=nombreClub(t.club)+' venció a '+nombreClub(f[0])+' ('+(m?m[1]:'')+')';
    listaPenales.appendChild(item);
  });
})();

/* ---------- sequías ---------- */
(function(){
  var ultimoAnio={};TORNEOS.forEach(function(t){if(t.club)ultimoAnio[t.club]=t.anio});
  var CLUBES_ACTUALES=['AME','CHI','TOL','CAZ','LEO','TIG','PUM','PAC','SAN','MTY','ATE','ATS','NEC','PUE','TIJ'];
  var filas=CLUBES_ACTUALES.map(function(codigo){return {c:codigo,nombre:CLUBES[codigo].nombre,color:CLUBES[codigo].color,anios:2026-ultimoAnio[codigo],ultimo:ultimoAnio[codigo]}});
  filas.sort(function(a,b){return b.anios-a.anios});
  var caja=uno('#sequias-actuales');
  [['Querétaro','QRO'],['Atlético San Luis','SLP'],['FC Juárez','JUA']].forEach(function(x){
    caja.appendChild(crearFilaBarra(x[0],'nunca campeón',88,null,'nunca',true,x[1]));
  });
  var MAX_ANIOS=40;
  filas.forEach(function(f){
    var texto=f.anios===0?'campeón vigente':f.anios+(f.anios===1?' año':' años');
    caja.appendChild(crearFilaBarra(f.nombre,'último: '+f.ultimo,Math.max(f.anios,0.4)/MAX_ANIOS*88,f.color,texto,false,f.c));
  });
  var esperas=[],anterior={};
  TORNEOS.forEach(function(t){
    if(!t.club)return;
    if(anterior[t.club]!==undefined)esperas.push({club:t.club,anios:t.anio-anterior[t.club],desde:anterior[t.club],hasta:t.anio});
    anterior[t.club]=t.anio;
  });
  esperas.sort(function(a,b){return b.anios-a.anios});
  var cajaEsperas=uno('#esperas-rotas'),mayor=esperas[0].anios;
  esperas.slice(0,8).forEach(function(e){
    cajaEsperas.appendChild(crearFilaBarra(nombreClub(e.club),e.desde+' a '+e.hasta,e.anios/mayor*88,colorClub(e.club),e.anios+' años',false,e.club));
  });
})();

/* ---------- comparador de clubes ---------- */
(function(){
  var selectorA=uno('#club-a'),selectorB=uno('#club-b'),salida=uno('#comparacion');
  clubesOrdenados.forEach(function(codigo){
    [selectorA,selectorB].forEach(function(s){var opcion=document.createElement('option');opcion.value=codigo;opcion.textContent=CLUBES[codigo].nombre+' ('+titulosPorClub[codigo]+')';s.appendChild(opcion)});
  });
  selectorA.value='AME';selectorB.value='CHI';
  var DECADAS=[1940,1950,1960,1970,1980,1990,2000,2010,2020];
  function aniosDe(codigo){return TORNEOS.filter(function(t){return t.club===codigo}).map(function(t){return t.anio})}
  function dibujar(){
    var a=selectorA.value,b=selectorB.value;salida.innerHTML='';
    var cabecera=crearElemento('div','comparador-cabecera');
    [a,b].forEach(function(codigo){
      var anios=aniosDe(codigo);
      var tarjeta=crearElemento('div','','<h3></h3><strong></strong><small></small>');tarjeta.style.setProperty('--color',colorClub(codigo));
      uno('h3',tarjeta).textContent=CLUBES[codigo].nombre;uno('strong',tarjeta).textContent=titulosPorClub[codigo];
      var escudoTarjeta=crearEscudo(codigo,56);escudoTarjeta.classList.add('esc-cab');tarjeta.appendChild(escudoTarjeta);
      uno('small',tarjeta).textContent='títulos · primero '+anios[0]+' · último '+anios[anios.length-1];
      cabecera.appendChild(tarjeta);
    });
    salida.appendChild(cabecera);
    var gananciasA=[],gananciasB=[];
    TORNEOS.forEach(function(t){var f=FINALES[t.etiqueta];if(!t.club||!f)return;
      if(t.club===a&&f[0]===b)gananciasA.push(t.etiqueta);
      if(t.club===b&&f[0]===a)gananciasB.push(t.etiqueta);});
    var resumen=crearElemento('div','comparador-finales');
    if(a===b){resumen.textContent='Elige dos clubes distintos para compararlos.'}
    else if(!gananciasA.length&&!gananciasB.length){resumen.textContent='No se han enfrentado en una final de liga o, si lo hicieron, no hay registro en esta base.'}
    else{
      resumen.textContent='En finales o cierres de campeonato: '+CLUBES[a].nombre+' '+gananciasA.length+', '+CLUBES[b].nombre+' '+gananciasB.length+'. '+
      (gananciasA.length?CLUBES[a].nombre+' ganó en '+gananciasA.join(', ')+'. ':'')+(gananciasB.length?CLUBES[b].nombre+' ganó en '+gananciasB.join(', ')+'.':'');
    }
    salida.appendChild(resumen);
    var porDecadaA={},porDecadaB={},maximo=1;
    DECADAS.forEach(function(d){
      porDecadaA[d]=aniosDe(a).filter(function(y){return y>=d&&y<d+10}).length;
      porDecadaB[d]=aniosDe(b).filter(function(y){return y>=d&&y<d+10}).length;
      maximo=Math.max(maximo,porDecadaA[d],porDecadaB[d]);
    });
    var cajaDecadas=crearElemento('div','decadas');
    DECADAS.forEach(function(d){
      var fila=crearElemento('div','decada','<b></b><div class="par"><div></div><div></div></div>');
      uno('b',fila).textContent=d+'s';
      var barras=fila.querySelectorAll('.par>div');
      [[barras[0],porDecadaA[d],a],[barras[1],porDecadaB[d],b]].forEach(function(x){
        x[0].style.width=(x[1]/maximo*80)+'%';x[0].style.background=colorClub(x[2]);
        if(x[1]===0)x[0].style.width='2px';
        var numero=document.createElement('span');numero.textContent=x[1];x[0].appendChild(numero);
      });
      cajaDecadas.appendChild(fila);
    });
    salida.appendChild(cajaDecadas);
  }
  selectorA.addEventListener('change',dibujar);selectorB.addEventListener('change',dibujar);
  dibujar();
})();

/* ---------- dinastías ---------- */
(function(){
  var DINASTIAS=[
   {titulo:'Chivas, el Campeonísimo',anios:'1957–1970',torneos:['1958-59','1959-60','1960-61','1961-62'],texto:'Cuatro campeonatos seguidos entre 1958 y 1962 y ocho en trece años, con una plantilla de puros mexicanos.'},
   {titulo:'Cruz Azul, los años 70',anios:'1971–1974',torneos:['1971-72','1972-73','1973-74'],texto:'Tres títulos consecutivos con Miguel Marín en la portería. Ganó cinco ligas en esa década.'},
   {titulo:'América, tricampeón',anios:'1984–1985',torneos:['1983-84','1984-85','PRODE 1985'],texto:'Tres títulos seguidos en el medio de una década de dominio, con diez liguillas en once torneos.'},
   {titulo:'Toluca, tres veranos',anios:'1998–2000',torneos:['Verano 1998','Verano 1999','Verano 2000'],texto:'Ganó los tres Veranos seguidos. En 2000 eliminó a Puebla con un 9-0 global.'},
   {titulo:'Pumas, primer bicampeón corto',anios:'2004',torneos:['Clausura 2004','Apertura 2004'],texto:'Los dos torneos del año 2004, el segundo con Hugo Sánchez en el banquillo.'},
   {titulo:'América, tricampeón',anios:'2023–2024',torneos:['Apertura 2023','Clausura 2024','Apertura 2024'],texto:'Tres títulos consecutivos, algo que no había pasado en la era de torneos cortos.'},
   {titulo:'Toluca, bicampeón',anios:'2025',torneos:['Clausura 2025','Apertura 2025'],texto:'Cerró el Apertura 2025 ganando una final de penales por 9-8 a Tigres.'}
  ];
  var caja=uno('#lista-dinastias');
  DINASTIAS.forEach(function(d){
    var tarjeta=crearElemento('div','tarjeta-dinastia','<h3></h3><div class="anios"></div><div class="cuadricula"></div><p></p>');
    uno('h3',tarjeta).textContent=d.titulo;uno('.anios',tarjeta).textContent=d.anios;uno('p',tarjeta).textContent=d.texto;
    var campeonDinastia=TORNEOS.filter(function(x){return x.etiqueta===d.torneos[0]})[0].club;
    var escudoDinastia=crearEscudo(campeonDinastia,44);escudoDinastia.classList.add('esc-cab');tarjeta.appendChild(escudoDinastia);
    var cuadricula=uno('.cuadricula',tarjeta);
    d.torneos.forEach(function(etiqueta){var torneo=TORNEOS.filter(function(x){return x.etiqueta===etiqueta})[0];cuadricula.appendChild(crearCuadro(torneo,0,false))});
    caja.appendChild(tarjeta);
  });
})();

/* ---------- mapa ---------- */
(function(){
  var CONTORNO=[[-117.12,32.53],[-114.81,32.49],[-111.07,31.33],[-108.2,31.33],[-108.2,31.78],[-106.53,31.78],[-105.0,30.65],[-104.4,29.55],[-103.1,28.98],[-102.4,29.77],[-101.4,29.77],[-100.9,29.35],[-100.5,28.7],[-99.5,27.5],[-99.1,26.4],[-98.3,26.1],[-97.15,25.95],[-97.65,24.5],[-97.7,23.5],[-97.85,22.25],[-97.4,21.0],[-96.8,20.2],[-96.1,19.2],[-95.75,18.77],[-94.4,18.15],[-92.7,18.55],[-91.8,18.65],[-90.7,19.35],[-90.5,19.85],[-90.4,21.0],[-89.65,21.3],[-88.2,21.6],[-87.1,21.6],[-86.8,21.15],[-87.45,20.2],[-87.45,19.3],[-87.8,18.25],[-88.3,18.5],[-89.15,17.8],[-90.45,17.8],[-90.95,16.95],[-91.7,16.1],[-92.2,15.2],[-92.2,14.55],[-93.7,15.95],[-95.2,16.2],[-96.1,15.75],[-97.1,15.85],[-98.0,16.2],[-99.9,16.85],[-101.55,17.65],[-102.2,17.95],[-104.3,19.05],[-105.25,20.65],[-105.5,21.8],[-106.4,23.2],[-108.0,25.0],[-109.1,25.8],[-109.4,26.9],[-109.9,27.5],[-110.9,27.9],[-112.0,28.8],[-112.7,29.9],[-113.5,31.2],[-114.8,31.8],[-114.8,31.0],[-113.8,29.8],[-113.5,29.0],[-112.3,27.3],[-111.35,26.0],[-110.3,24.15],[-109.5,23.05],[-110.0,22.9],[-110.6,23.4],[-111.6,24.2],[-112.1,24.6],[-113.1,26.2],[-114.1,27.1],[-115.1,27.8],[-114.9,28.3],[-115.8,30.0],[-116.6,31.6]];
  var ESCALA_X=26.5,ESCALA_Y=29;
  function proyectarX(longitud){return (longitud+118)*ESCALA_X+6}
  function proyectarY(latitud){return (33-latitud)*ESCALA_Y+6}
  var ESPACIO_SVG='http://www.w3.org/2000/svg';
  var svg=uno('#mapa-svg');
  var contorno=document.createElementNS(ESPACIO_SVG,'path');
  contorno.setAttribute('class','tierra');
  contorno.setAttribute('d','M'+CONTORNO.map(function(p){return proyectarX(p[0]).toFixed(1)+','+proyectarY(p[1]).toFixed(1)}).join('L')+'Z');
  svg.appendChild(contorno);
  var CIUDAD_DEL_CLUB={AME:'CDMX',CAZ:'CDMX',PUM:'CDMX',NEC:'CDMX',ATE:'CDMX',MAR:'CDMX',AST:'CDMX',ESP:'CDMX',ZAC:'Zacatepec',VER:'Veracruz',LEO:'León',CHI:'Guadalajara',ATS:'Guadalajara',ORO:'Guadalajara',UAG:'Guadalajara',TOL:'Toluca',TIG:'Monterrey',MTY:'Monterrey',PAC:'Pachuca',SAN:'Torreón',PUE:'Puebla',TAM:'Tampico',MOR:'Morelia',TIJ:'Tijuana'};
  var COORDENADAS={'CDMX':[-99.13,19.43,'Ciudad de México'],'Zacatepec':[-99.2,18.65,'Zacatepec'],'Veracruz':[-96.13,19.18,'Veracruz'],'León':[-101.68,21.12,'León'],'Guadalajara':[-103.35,20.67,'Guadalajara'],'Toluca':[-99.66,19.29,'Toluca'],'Monterrey':[-100.31,25.67,'Monterrey'],'Pachuca':[-98.73,20.12,'Pachuca'],'Torreón':[-103.43,25.54,'Torreón'],'Puebla':[-98.2,19.04,'Puebla'],'Tampico':[-97.85,22.25,'Tampico'],'Morelia':[-101.19,19.7,'Morelia'],'Tijuana':[-117.04,32.51,'Tijuana']};
  var CON_ETIQUETA={'Tijuana':1,'Torreón':1,'Monterrey':1,'Guadalajara':1,'León':1,'Veracruz':1,'Tampico':1};
  var titulosPorCiudad={},clubesPorCiudad={};
  Object.keys(CIUDAD_DEL_CLUB).forEach(function(codigo){var ciudad=CIUDAD_DEL_CLUB[codigo];titulosPorCiudad[ciudad]=(titulosPorCiudad[ciudad]||0)+titulosPorClub[codigo];(clubesPorCiudad[ciudad]=clubesPorCiudad[ciudad]||[]).push(codigo)});
  var ciudadesOrdenadas=Object.keys(titulosPorCiudad).sort(function(a,b){return titulosPorCiudad[b]-titulosPorCiudad[a]});
  var grupos={};
  function radio(titulos){return 4+Math.sqrt(titulos)*2.4}
  var listaCiudades=uno('#lista-ciudades');
  ciudadesOrdenadas.forEach(function(ciudad){
    var grupo=document.createElementNS(ESPACIO_SVG,'g');grupo.setAttribute('class','ciudad');
    var x=proyectarX(COORDENADAS[ciudad][0]),y=proyectarY(COORDENADAS[ciudad][1]);
    var circulo=document.createElementNS(ESPACIO_SVG,'circle');circulo.setAttribute('cx',x);circulo.setAttribute('cy',y);circulo.setAttribute('r',radio(titulosPorCiudad[ciudad]).toFixed(1));
    grupo.appendChild(circulo);
    if(CON_ETIQUETA[ciudad]){var texto=document.createElementNS(ESPACIO_SVG,'text');texto.setAttribute('x',x+radio(titulosPorCiudad[ciudad])+4);texto.setAttribute('y',y+4);texto.textContent=COORDENADAS[ciudad][2]+' '+titulosPorCiudad[ciudad];grupo.appendChild(texto)}
    grupos[ciudad]=grupo;
    circulo.addEventListener('click',function(){elegir(ciudad)});
    var boton=crearElemento('button','fila-ciudad','<b></b><span></span>');boton.type='button';boton.setAttribute('aria-pressed','false');
    var textoClubes=clubesPorCiudad[ciudad].sort(function(a,b){return titulosPorClub[b]-titulosPorClub[a]}).map(function(codigo){return CLUBES[codigo].nombre+' '+titulosPorClub[codigo]}).join(', ');
    uno('b',boton).textContent=COORDENADAS[ciudad][2]+' · '+titulosPorCiudad[ciudad];uno('span',boton).textContent=textoClubes;
    var filaEscudos=crearElemento('div','escudos-ciudad'+(clubesPorCiudad[ciudad].length===1?' solo':''));clubesPorCiudad[ciudad].forEach(function(codigo){filaEscudos.appendChild(crearEscudo(codigo,24))});boton.appendChild(filaEscudos);
    boton.addEventListener('click',function(){elegir(ciudad)});boton.dataset.ciudad=ciudad;
    listaCiudades.appendChild(boton);
  });
  /* los círculos grandes se dibujan primero para que los chicos queden encima */
  ciudadesOrdenadas.forEach(function(ciudad){svg.appendChild(grupos[ciudad])});
  function elegir(ciudad){
    Object.keys(grupos).forEach(function(k){grupos[k].classList.toggle('activa',k===ciudad)});
    varios('.fila-ciudad',listaCiudades).forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.ciudad===ciudad))});
  }
  elegir(ciudadesOrdenadas[0]);
  var sumaDosCiudades=titulosPorCiudad.CDMX+titulosPorCiudad.Guadalajara;
  uno('#nota-mapa').textContent='Entre la Ciudad de México y Guadalajara suman '+sumaDosCiudades+' de los '+totalCampeonatos+' títulos. Se usa la ciudad donde nació cada club, aunque algunos se mudaron después (Necaxa, Atlante, Morelia, UAG).';
})();

/* ---------- técnicos campeones ---------- */
(function(){
  var TECNICOS=[['Ignacio Trelles',7,'Marte, Zacatepec (2), Toluca (2), Cruz Azul (2)'],['Ricardo Ferretti',7,'Chivas, Pumas, Tigres (5)'],['Raúl Cárdenas',6,'Cruz Azul (5), América'],['Javier de la Torre',5,'Chivas (5)'],['Manuel Lapuente',5,'Puebla (2), Necaxa (2), América'],['Víctor Manuel Vucetich',5,'León, Tecos, Pachuca, Monterrey (2)'],['Antonio Mohamed',5,'Tijuana, América, Monterrey, Toluca (2)'],['Enrique Meza',4,'Toluca (3), Pachuca']];
  var caja=uno('#lista-tecnicos');
  TECNICOS.forEach(function(t){
    var fila=crearFilaBarra(t[0],t[2],t[1]/7*80,null,t[1]);
    fila.style.gridTemplateColumns='10.5rem 1fr';
    caja.appendChild(fila);
  });
})();

/* ---------- goleadores y récords ---------- */
(function(){
  var GOLEADORES=[['Cabinho','Brasil · Pumas, Atlante, León',312],['Carlos Hermosillo','México · Cruz Azul, América',294],['Jared Borgetti','México · Santos, Pachuca, Cruz Azul',252],['José Saturnino Cardozo','Paraguay · Toluca',249]];
  var caja=uno('#goleadores');
  GOLEADORES.forEach(function(g){caja.appendChild(crearFilaBarra(g[0],g[1],g[2]/312*88,null,g[2]))});
  var RECORDS=[
   ['40','goles en una temporada. Solo lo lograron Roberto Aballay (Asturias) e Isidro Lángara (España).'],
   ['35','goles de Carlos Hermosillo con Cruz Azul en 1994-95, su mejor temporada.'],
   ['29','goles de Cardozo en el Apertura 2002, el máximo de un torneo corto. Ese Toluca anotó 55.'],
   ['11-2','global de América sobre Puebla en cuartos del Apertura 2022, la mayor goleada en una llave de liguilla.'],
   ['772','minutos sin recibir gol de Hernán Cristante en el Apertura 2008.'],
   ['8','victorias seguidas de Chivas al inicio del Bicentenario 2010, el mejor arranque de los torneos cortos.']
  ];
  var cajaRecords=uno('#lista-records');
  RECORDS.forEach(function(r){var registro=crearElemento('div','registro','<strong></strong><span></span>');uno('strong',registro).textContent=r[0];uno('span',registro).textContent=r[1];cajaRecords.appendChild(registro)});
})();

/* ---------- trofeos en 3D ---------- */
(function(){
  var FOTOS={clasico:'clasico.webp',moderno:'moderno.webp'};/* fotos de los dos trofeos, usadas cuando el navegador no tiene WebGL */
  var TROFEOS={
    clasico:{
      pestana:'El clásico · hasta 2007',
      titulo:'El trofeo clásico',
      resumen:'Un ánfora de plata con dos asas, tapa ornamentada y un futbolista en lo alto. Se entregó durante décadas y se despidió en el Apertura 2007.',
      puntos:[
        {nombre:'Futbolista en la tapa',texto:'La tapa terminaba en una llama. Más tarde la reemplazó la figura de un jugador con los brazos extendidos, a punto de patear un balón.',pos:[0,3.18,0],y:3.1,dist:6.2},
        {nombre:'Tapa ornamentada',texto:'Forma de ánfora con una tapa de relieves, rematada por la figura del jugador.',pos:[0,2.42,0.56],y:2.45,dist:6.6},
        {nombre:'Dos asas',texto:'Las asas de curvas largas salen del cuerpo y suben hasta el cuello del ánfora. En la foto terminan en figuras de relieve.',pos:[1.02,2.0,0],y:2.0,dist:6.8},
        {nombre:'Cuerpo de plata y cobre',texto:'Plata esterlina y cobre, con relieves de hojas alrededor del vaso. La casa Reed & Barton lo hizo en 1922.',pos:[0,1.72,0.76],y:1.75,dist:6.4},
        {nombre:'Pedestal con escudos',texto:'Pedestal circular oscuro con placas de los escudos de los equipos participantes. En 1980 pasó a ser trapezoidal y en 1998 volvió a ser circular.',pos:[0,0.28,1.1],y:0.7,dist:6.4}
      ],
      ficha:[['Se entregó','De la temporada 1922-23 al Apertura 2007'],['Origen','Reed & Barton, 1922. Desde 1962 lo hizo un taller familiar de la Ciudad de México.'],['Material','Plata esterlina y cobre'],['Forma','Ánfora de dos asas con tapa y figura de futbolista'],['Pedestal','Circular, con placas de escudos']]
    },
    moderno:{
      pestana:'El de hoy · desde 2008',
      titulo:'El trofeo actual',
      resumen:'Plata 925 hecha a mano sobre una base de obsidiana. El diseño representa la cabeza y el pico de un águila que sostiene un balón.',
      puntos:[
        {nombre:'Balón de plata',texto:'El balón es el centro del diseño y queda sostenido por la pieza de plata.',pos:[0,2.78,0.5],y:2.7,dist:6.0},
        {nombre:'Cabeza y pico de águila',texto:'La aleta curva que abraza el balón es el pico del águila. El diseño salió del concurso de aficionados «Hazla tuya», convocado por la FMF en octubre de 2007.',pos:[0.6,2.85,0.27],y:2.5,dist:6.0,az:1.0},
        {nombre:'Inscripción',texto:'En el frente se graba el torneo, el estadio, la fecha y los finalistas. Al terminar la final se agrega el nombre del campeón.',pos:[0.48,2.25,0.22],y:2.3,dist:5.2,az:1.05},
        {nombre:'Hecho a mano',texto:'Plata 925 trabajada sin molde: las piezas se cortan, se doblan, se martillan y se sueldan. Marmolejo Orfebre tarda unos cuatro o cinco meses en cada una.',pos:[0,1.2,0.22],y:1.3,dist:6.8},
        {nombre:'Base de obsidiana',texto:'Pedestal circular de obsidiana, la piedra volcánica negra que simboliza el poder y la tradición.',pos:[0,0.5,0.6],y:0.7,dist:6.2},
        {nombre:'18 escudos',texto:'Placas con los escudos de los 18 equipos de la liga rodean la base. Aquí llevan los escudos que me pasaste, en un orden decorativo.',pos:[0,0.2,0.78],y:0.3,dist:3.8}
      ],
      ficha:[['Se entrega','Desde el Clausura 2008. Santos lo levantó primero, ante Cruz Azul.'],['Hecho por','Marmolejo Orfebre, a mano y sin molde'],['Material','Plata 925 y base de obsidiana'],['Medidas','47 cm de alto, 19 de ancho y 9 kg, según ClaroSports y Wikipedia'],['Diseño','Concurso «Hazla tuya». Ganadores: Alfonso Sotelo, Julián Mancilla y Rodrigo López.']]
    }
  };
  var CLAVES=['clasico','moderno'],actual='clasico',puntoActivo=-1;

  var visor=uno('#visor-trofeo'),lienzo=uno('#lienzo-trofeo'),contenedorPines=uno('#pines-trofeo'),foto=uno('#foto-trofeo');
  var botonGiro=uno('#boton-giro'),botonFoto=uno('#boton-foto'),botonReiniciar=uno('#boton-reiniciar'),usoVisor=uno('#uso-visor');
  var cajaPestanas=uno('#pestanas-trofeo');
  CLAVES.forEach(function(clave){
    var b=crearElemento('button','etiqueta');b.type='button';b.dataset.clave=clave;b.textContent=TROFEOS[clave].pestana;b.setAttribute('aria-pressed',String(clave===actual));cajaPestanas.appendChild(b);
  });

  var T3=window.THREE,motor=null; /* motor: funciones del visor 3D, null si no hay WebGL */

  /* ----- panel de información (funciona con o sin 3D) ----- */
  function pintarInfo(){
    var t=TROFEOS[actual];
    uno('#trofeo-titulo').textContent=t.titulo;uno('#trofeo-resumen').textContent=t.resumen;
    var lista=uno('#lista-puntos');lista.innerHTML='';
    t.puntos.forEach(function(p,i){
      var li=document.createElement('li'),b=crearElemento('button','','<b></b><span></span>');b.type='button';b.setAttribute('aria-pressed','false');b.dataset.indice=i;
      uno('b',b).textContent=i+1;uno('span',b).textContent=p.nombre;li.appendChild(b);lista.appendChild(li);
    });
    var ficha=uno('#ficha-trofeo');ficha.innerHTML='';
    t.ficha.forEach(function(f){var dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=f[0];dd.textContent=f[1];ficha.appendChild(dt);ficha.appendChild(dd)});
    uno('#punto-detalle').textContent='Toca un número para ver ese detalle del trofeo.';
    foto.src=FOTOS[actual];
    puntoActivo=-1;
  }
  function elegirPunto(i){
    var t=TROFEOS[actual];puntoActivo=i;
    varios('#lista-puntos button').forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.indice===i))});
    varios('.pin',contenedorPines).forEach(function(b){b.setAttribute('aria-pressed',String(+b.dataset.indice===i))});
    var p=t.puntos[i];
    var cuadro=uno('#punto-detalle');cuadro.innerHTML='';
    var negrita=document.createElement('b');negrita.textContent=(i+1)+'. '+p.nombre+'. ';cuadro.appendChild(negrita);cuadro.appendChild(document.createTextNode(p.texto));
    if(motor)motor.enfocar(p);
  }
  uno('#lista-puntos').addEventListener('click',function(e){var b=e.target.closest('button');if(b)elegirPunto(+b.dataset.indice)});
  contenedorPines.addEventListener('click',function(e){var b=e.target.closest('.pin');if(b)elegirPunto(+b.dataset.indice)});
  function cambiarTrofeo(clave){
    actual=clave;
    varios('.etiqueta',cajaPestanas).forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.clave===clave))});
    pintarInfo();
    if(motor)motor.mostrar(clave);
  }
  cajaPestanas.addEventListener('click',function(e){var b=e.target.closest('.etiqueta');if(b&&b.dataset.clave!==actual)cambiarTrofeo(b.dataset.clave)});
  function alternarFoto(ver){
    botonFoto.setAttribute('aria-pressed',String(ver));botonFoto.textContent=ver?'Ver 3D':'Ver foto';
    foto.hidden=!ver;contenedorPines.hidden=!ver?false:true;
  }
  botonFoto.addEventListener('click',function(){alternarFoto(botonFoto.getAttribute('aria-pressed')!=='true')});
  pintarInfo();

  /* ----- visor 3D ----- */
  function iniciar3d(){
    var renderizador=new T3.WebGLRenderer({canvas:lienzo,antialias:true,alpha:true});
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderizador.toneMapping=T3.ACESFilmicToneMapping;renderizador.toneMappingExposure=1.2;renderizador.outputEncoding=T3.sRGBEncoding;
    var escena=new T3.Scene();

    /* entorno de estudio: cuartos con paneles de luz para que el metal tenga qué reflejar */
    function crearEntorno(){
      var e=new T3.Scene();
      e.add(new T3.Mesh(new T3.BoxGeometry(30,30,30),new T3.MeshBasicMaterial({color:0x2c3231,side:T3.BackSide})));
      function panel(ancho,alto,x,y,z,color,fuerza){
        var m=new T3.MeshBasicMaterial({color:new T3.Color(color).multiplyScalar(fuerza),side:T3.DoubleSide});
        var p=new T3.Mesh(new T3.PlaneGeometry(ancho,alto),m);p.position.set(x,y,z);p.lookAt(0,0,0);e.add(p);
      }
      panel(16,16,0,13,0,0xffffff,3);
      panel(3,16,-11,3,10,0xffffff,5);
      panel(2,14,12,2,4,0xffd9a0,4);
      panel(14,3,0,5,-12,0xbfe8d4,2.5);
      panel(10,2,0,-6,10,0xffffff,1.5);
      var gen=new T3.PMREMGenerator(renderizador);
      var rt=gen.fromScene(e,0.03);gen.dispose();return rt.texture;
    }
    escena.environment=crearEntorno();
    var luz=new T3.DirectionalLight(0xffffff,0.8);luz.position.set(3,7,5);escena.add(luz);

    var camara=new T3.PerspectiveCamera(30,1,0.1,100);

    var plata=new T3.MeshStandardMaterial({color:0xffffff,metalness:1,roughness:0.18,side:T3.DoubleSide});
    var plataSatinada=new T3.MeshStandardMaterial({color:0xdfe3e6,metalness:1,roughness:0.38,side:T3.DoubleSide});
    var obsidiana=new T3.MeshStandardMaterial({color:0x060809,metalness:0.35,roughness:0.1});
    var madera=new T3.MeshStandardMaterial({color:0x0f1612,metalness:0.2,roughness:0.38});

    /* sólido de revolución a partir de puntos [radio, altura], suavizado con una curva */
    function torno(puntos,suave){
      var v=puntos.map(function(p){return new T3.Vector2(p[0],p[1])});
      var pts=suave===false?v:new T3.SplineCurve(v).getPoints(puntos.length*16);
      return new T3.LatheGeometry(pts,96);
    }
    function malla(geo,mat,x,y,z){var m=new T3.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);return m}

    /* placas redondas de colores: escudos genéricos, no son los de los clubes */
    /* texturas de los escudos (los archivos que aportó el autor de la página) */
    var cargadorTexturas=new T3.TextureLoader(),cacheTexturas={};
    function texturaEscudo(codigo){
      if(!cacheTexturas[codigo]){var t=cargadorTexturas.load(''+ESCUDOS[codigo]+'.webp');t.encoding=T3.sRGBEncoding;t.anisotropy=4;cacheTexturas[codigo]=t}
      return cacheTexturas[codigo];
    }
    function placasGenericas(grupo,cantidad,radio,y,inclinacion,tamano,codigos){
      var colores=[0xc9a227,0xb23a48,0x2f6fb5,0x2e8b57,0xe7e7e7,0x7a4fa3];
      for(var i=0;i<cantidad;i++){
        var a=i/cantidad*Math.PI*2;
        var g=new T3.Group();
        var aro=malla(new T3.CylinderGeometry(tamano,tamano,0.03,32),plata);aro.rotation.x=Math.PI/2;
        var esmalte=malla(new T3.CylinderGeometry(tamano*0.78,tamano*0.78,0.045,32),new T3.MeshStandardMaterial({color:colores[i%colores.length],metalness:0.2,roughness:0.35}));esmalte.rotation.x=Math.PI/2;
        g.add(aro);g.add(esmalte);
        if(codigos&&ESCUDOS[codigos[i]]){
          esmalte.material.color.set(0xf6f7f4);
          var escudoPlaca=malla(new T3.PlaneGeometry(tamano*1.55,tamano*1.55),new T3.MeshBasicMaterial({map:texturaEscudo(codigos[i]),transparent:true,depthWrite:false,toneMapped:false}),0,0,0.032);
          g.add(escudoPlaca);
        }
        g.position.set(Math.sin(a)*radio,y,Math.cos(a)*radio);
        g.rotation.order='YXZ';g.rotation.y=a;g.rotation.x=-inclinacion;
        grupo.add(g);
      }
    }

    /* ===== trofeo clásico ===== */
    function construirClasico(){
      var g=new T3.Group();
      /* pedestal circular oscuro */
      g.add(malla(torno([[0,0],[1.02,0],[1.1,0.05],[1.12,0.2],[1.08,0.3],[0.96,0.38],[0.9,0.46],[0.84,0.5],[0,0.5]]),madera));
      placasGenericas(g,12,1.095,0.26,0,0.1);
      /* ánfora: pie, tallo, vaso, cuello y tapa */
      g.add(malla(torno([[0.66,0.5],[0.64,0.56],[0.5,0.64],[0.34,0.7],[0.22,0.78],[0.14,0.88],[0.13,0.96],[0.2,1.02],[0.27,1.06],[0.2,1.1],[0.14,1.16],[0.16,1.24],[0.3,1.34],[0.5,1.48],[0.68,1.64],[0.75,1.82],[0.71,2.0],[0.6,2.12],[0.5,2.18],[0.52,2.24],[0.6,2.3],[0.63,2.34],[0.6,2.4],[0.5,2.48],[0.36,2.58],[0.2,2.66],[0.1,2.72],[0.08,2.78]]),plata));
      /* relieves de hojas alrededor del vaso */
      for(var fila=0;fila<2;fila++){
        for(var i=0;i<10;i++){
          var a=i/10*Math.PI*2+fila*Math.PI/10,yH=fila?1.58:1.82,rad=fila?0.7:0.755;
          var hoja=malla(new T3.SphereGeometry(1,16,12),plataSatinada,Math.sin(a)*(rad-0.012),yH,Math.cos(a)*(rad-0.012));
          hoja.scale.set(0.065,fila?0.16:0.24,0.02);hoja.rotation.order='YXZ';hoja.rotation.y=a;hoja.rotation.x=fila?0.2:0;g.add(hoja);
        }
      }
      /* dos asas curvas */
      var curva=new T3.CatmullRomCurve3([new T3.Vector3(0.6,1.5,0),new T3.Vector3(0.86,1.62,0),new T3.Vector3(1.02,1.88,0),new T3.Vector3(0.96,2.14,0),new T3.Vector3(0.74,2.26,0),new T3.Vector3(0.56,2.28,0)]);
      for(var lado=0;lado<2;lado++){
        var asa=new T3.Group();
        asa.add(malla(new T3.TubeGeometry(curva,48,0.045,12,false),plata));
        asa.add(malla(new T3.SphereGeometry(0.075,16,12),plata,0.74,2.26,0));
        asa.add(malla(new T3.SphereGeometry(0.06,16,12),plata,0.62,1.52,0));
        asa.rotation.y=lado*Math.PI;g.add(asa);
      }
      /* futbolista a punto de patear */
      var fig=new T3.Group();fig.position.y=2.78;
      function cil(rA,rB,largo,x,y,z,rx,rz){var c=malla(new T3.CylinderGeometry(rA,rB,largo,14),plata,x,y,z);c.rotation.x=rx||0;c.rotation.z=rz||0;fig.add(c)}
      fig.add(malla(new T3.CylinderGeometry(0.2,0.24,0.06,24),plata,0,0.03,0));
      cil(0.075,0.06,0.26,0,0.34,0,0.12,0);
      fig.add(malla(new T3.SphereGeometry(0.06,16,12),plata,0,0.54,0.02));
      cil(0.018,0.016,0.24,-0.15,0.42,0,0,1.15);
      cil(0.018,0.016,0.24,0.15,0.46,0,0,-1.1);
      cil(0.03,0.024,0.26,-0.035,0.13,-0.02,0,0);
      cil(0.03,0.024,0.28,0.05,0.16,0.1,-1.0,0);
      fig.add(malla(new T3.SphereGeometry(0.06,16,12),plata,0.06,0.1,0.28));
      g.add(fig);
      return g;
    }

    /* ===== trofeo actual ===== */
    function crearBalon(radio){
      var geo=new T3.SphereGeometry(radio,72,54),phi=(1+Math.sqrt(5))/2;
      var dirs=[[0,1,phi],[0,1,-phi],[0,-1,phi],[0,-1,-phi],[1,phi,0],[1,-phi,0],[-1,phi,0],[-1,-phi,0],[phi,0,1],[phi,0,-1],[-phi,0,1],[-phi,0,-1]].map(function(v){return new T3.Vector3(v[0],v[1],v[2]).normalize()});
      var pos=geo.attributes.position,col=new Float32Array(pos.count*3),v=new T3.Vector3();
      for(var i=0;i<pos.count;i++){
        v.fromBufferAttribute(pos,i).normalize();
        var mejor=-1;for(var d=0;d<12;d++)mejor=Math.max(mejor,v.dot(dirs[d]));
        var ang=Math.acos(Math.min(1,mejor)),t=Math.min(1,Math.max(0,(ang-0.31)/0.03));
        var c=0.1+(0.93-0.1)*t*t*(3-2*t);
        col[i*3]=col[i*3+1]=col[i*3+2]=c;
      }
      geo.setAttribute('color',new T3.BufferAttribute(col,3));
      return malla(geo,new T3.MeshStandardMaterial({color:0xffffff,vertexColors:true,metalness:1,roughness:0.16}));
    }
    function texturaInscripcion(){
      var c=document.createElement('canvas');c.width=256;c.height=512;var x=c.getContext('2d');
      x.fillStyle='#d9dde0';x.fillRect(0,0,256,512);
      x.save();x.translate(128,256);x.rotate(-Math.PI/2);x.fillStyle='#2b3033';x.textAlign='center';x.textBaseline='middle';
      x.font='700 38px "IBM Plex Sans",Arial,sans-serif';x.fillText('CAMPEÓN',0,-26);
      x.font='500 26px "IBM Plex Sans",Arial,sans-serif';x.fillText('LIGA MX',0,26);x.restore();
      var t=new T3.CanvasTexture(c);t.encoding=T3.sRGBEncoding;t.anisotropy=4;return t;
    }
    function construirModerno(){
      var g=new T3.Group();
      /* base de obsidiana en forma de cono truncado */
      g.add(malla(torno([[0,0],[0.72,0],[0.76,0.03],[0.77,0.08],[0.72,0.3],[0.64,0.54],[0.6,0.6],[0,0.6]]),obsidiana));
      /* 18 placas genéricas en el borde inferior */
      placasGenericas(g,18,0.775,0.2,0.22,0.09,['AME','CHI','TOL','CAZ','LEO','TIG','PUM','PAC','SAN','MTY','ATE','ATS','NEC','PUE','TIJ','QRO','SLP','JUA']);
      /* pieza de plata: pie, cuello y copa que sostiene el balón */
      g.add(malla(torno([[0.46,0.6],[0.42,0.68],[0.3,0.82],[0.22,1.0],[0.19,1.22],[0.21,1.5],[0.28,1.76],[0.38,1.98],[0.46,2.14],[0.45,2.26]]),plata));
      var balon=crearBalon(0.53);balon.position.y=2.77;g.add(balon);
      /* aleta curva: el pico del águila */
      var geoAleta=new T3.CylinderGeometry(0.66,0.42,1.3,48,1,true,-0.6,1.2);
      var aleta=malla(geoAleta,new T3.MeshStandardMaterial({color:0xffffff,map:texturaInscripcion(),metalness:1,roughness:0.14,side:T3.DoubleSide}),0,2.3,0);
      aleta.rotation.y=1.15;g.add(aleta);
      return g;
    }

    var modelos={clasico:construirClasico(),moderno:construirModerno()};
    CLAVES.forEach(function(c){escena.add(modelos[c])});

    /* sombra suave bajo el trofeo */
    var cs=document.createElement('canvas');cs.width=cs.height=128;var xs=cs.getContext('2d');
    var gr=xs.createRadialGradient(64,64,4,64,64,62);gr.addColorStop(0,'rgba(0,0,0,0.55)');gr.addColorStop(1,'rgba(0,0,0,0)');xs.fillStyle=gr;xs.fillRect(0,0,128,128);
    var sombra=malla(new T3.PlaneGeometry(3.6,3.6),new T3.MeshBasicMaterial({map:new T3.CanvasTexture(cs),transparent:true,depthWrite:false}),0,-0.01,0);
    sombra.rotation.x=-Math.PI/2;escena.add(sombra);

    /* cámara orbital con inercia y movimientos suaves hacia una meta */
    var VISTA={az:0.55,el:0.16,dist:9.6,y:1.4};
    var cam={az:VISTA.az,el:VISTA.el,dist:VISTA.dist,y:VISTA.y},meta=null,velAz=0;
    var giro=false,arrastrando=false,punteros={},distPinza=0;
    var reducir=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function limitar(v,a,b){return Math.max(a,Math.min(b,v))}
    function ajustarGiro(valor){giro=valor;botonGiro.setAttribute('aria-pressed',String(valor))}

    visor.addEventListener('pointerdown',function(e){
      if(e.target.closest('button'))return;
      punteros[e.pointerId]={x:e.clientX,y:e.clientY};meta=null;velAz=0;arrastrando=true;
      try{visor.setPointerCapture(e.pointerId)}catch(err){}
      var ids=Object.keys(punteros);if(ids.length===2){var a=punteros[ids[0]],b=punteros[ids[1]];distPinza=Math.hypot(a.x-b.x,a.y-b.y)}
    });
    visor.addEventListener('pointermove',function(e){
      var p=punteros[e.pointerId];if(!p)return;
      var ids=Object.keys(punteros);
      if(ids.length===2){
        punteros[e.pointerId]={x:e.clientX,y:e.clientY};
        var a=punteros[ids[0]],b=punteros[ids[1]],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(distPinza)cam.dist=limitar(cam.dist*distPinza/d,4.5,14);distPinza=d;return;
      }
      var dx=e.clientX-p.x,dy=e.clientY-p.y;punteros[e.pointerId]={x:e.clientX,y:e.clientY};
      cam.az-=dx*0.009;velAz=-dx*0.009;
      if(e.pointerType==='mouse'||e.pointerType==='pen')cam.el=limitar(cam.el+dy*0.006,-0.15,1.1);
    });
    function soltar(e){delete punteros[e.pointerId];distPinza=0;if(!Object.keys(punteros).length)arrastrando=false}
    visor.addEventListener('pointerup',soltar);visor.addEventListener('pointercancel',soltar);
    visor.addEventListener('wheel',function(e){e.preventDefault();meta=null;cam.dist=limitar(cam.dist*(1+e.deltaY*0.0012),4.5,14)},{passive:false});
    visor.addEventListener('keydown',function(e){
      if(e.key==='ArrowLeft')cam.az-=0.12;else if(e.key==='ArrowRight')cam.az+=0.12;else if(e.key==='+'||e.key==='=')cam.dist=limitar(cam.dist*0.9,4.5,14);else if(e.key==='-')cam.dist=limitar(cam.dist*1.1,4.5,14);
    });
    visor.tabIndex=0;
    botonGiro.addEventListener('click',function(){ajustarGiro(!giro)});
    botonReiniciar.addEventListener('click',function(){meta={az:VISTA.az,el:VISTA.el,dist:VISTA.dist,y:VISTA.y};puntoActivo=-1;varios('.pin',contenedorPines).forEach(function(b){b.setAttribute('aria-pressed','false')});varios('#lista-puntos button').forEach(function(b){b.setAttribute('aria-pressed','false')})});

    /* pines numerados que siguen a la pieza */
    var pines=[];
    function armarPines(){
      contenedorPines.innerHTML='';pines=[];
      TROFEOS[actual].puntos.forEach(function(p,i){
        var b=crearElemento('button','pin');b.type='button';b.textContent=i+1;b.dataset.indice=i;b.setAttribute('aria-pressed','false');b.setAttribute('aria-label',p.nombre);
        contenedorPines.appendChild(b);
        var salida=new T3.Vector3(p.pos[0],0,p.pos[2]);if(salida.lengthSq()<1e-4)salida.set(0,0,0);else salida.normalize();
        pines.push({el:b,v:new T3.Vector3(p.pos[0],p.pos[1],p.pos[2]),salida:salida});
      });
    }
    function mostrar(clave){
      CLAVES.forEach(function(c){modelos[c].visible=(c===clave)});
      armarPines();meta={az:VISTA.az,el:VISTA.el,dist:VISTA.dist,y:VISTA.y};
    }
    function enfocar(p){
      var az=p.az!==undefined?p.az:(Math.abs(p.pos[0])+Math.abs(p.pos[2])>0.01?Math.atan2(p.pos[0],p.pos[2]):cam.az);
      /* gira por el camino más corto */
      var d=az-cam.az;d=Math.atan2(Math.sin(d),Math.cos(d));
      meta={az:cam.az+d,el:0.14,dist:p.dist,y:p.y};
    }

    function tamano(){
      var w=visor.clientWidth,h=visor.clientHeight;if(!w||!h)return;
      renderizador.setSize(w,h,false);camara.aspect=w/h;camara.updateProjectionMatrix();
    }
    if(window.ResizeObserver)new ResizeObserver(tamano).observe(visor);else window.addEventListener('resize',tamano);
    tamano();

    var visible=true;
    if(window.IntersectionObserver)new IntersectionObserver(function(en){visible=en[0].isIntersecting}).observe(visor);
    var vec=new T3.Vector3();
    function dibujar(){
      requestAnimationFrame(dibujar);
      if(!visible||document.hidden)return;
      if(meta){
        cam.az+=(meta.az-cam.az)*0.09;cam.el+=(meta.el-cam.el)*0.09;cam.dist+=(meta.dist-cam.dist)*0.09;cam.y+=(meta.y-cam.y)*0.09;
        if(Math.abs(meta.az-cam.az)<0.002&&Math.abs(meta.dist-cam.dist)<0.01&&Math.abs(meta.y-cam.y)<0.01)meta=null;
      }else if(!arrastrando){
        cam.az+=velAz;velAz*=0.94;if(Math.abs(velAz)<0.0002)velAz=0;
        if(giro&&!reducir)cam.az+=0.004;
      }
      var ce=Math.cos(cam.el);
      camara.position.set(Math.sin(cam.az)*ce*cam.dist,cam.y+Math.sin(cam.el)*cam.dist,Math.cos(cam.az)*ce*cam.dist);
      camara.lookAt(0,cam.y,0);
      renderizador.render(escena,camara);
      /* ubicar los pines sobre la pieza */
      var w=visor.clientWidth,h=visor.clientHeight;
      var dx=Math.sin(cam.az)*ce,dz=Math.cos(cam.az)*ce;
      pines.forEach(function(p){
        vec.copy(p.v).project(camara);
        var frente=(p.salida.x===0&&p.salida.z===0)?1:(p.salida.x*dx+p.salida.z*dz);
        var ok=frente>0.05&&vec.z<1;
        p.el.style.left=((vec.x*0.5+0.5)*w)+'px';p.el.style.top=((-vec.y*0.5+0.5)*h)+'px';
        p.el.style.opacity=ok?1:0;p.el.style.pointerEvents=ok?'auto':'none';
      });
    }
    mostrar(actual);
    dibujar();
    usoVisor.textContent='Arrastra para girar · rueda o pellizco para acercar';
    return {mostrar:mostrar,enfocar:enfocar};
  }

  if(T3){
    try{motor=iniciar3d()}catch(err){motor=null}
  }
  if(!motor){
    /* sin WebGL o sin Three.js: se muestra la foto y los datos */
    lienzo.hidden=true;botonGiro.hidden=true;botonReiniciar.hidden=true;
    alternarFoto(true);botonFoto.hidden=true;
    usoVisor.textContent='El 3D no está disponible aquí. Se muestra la foto.';
  }
})();

/* ---------- pronóstico del Apertura 2026 ---------- */
var PRONOSTICO={};/* fuera del bloque para que la ruleta pueda leer el último pronóstico */
(function(){
  /* Motor del pronóstico: simula lo que queda de la fase regular y la liguilla. Sin dependencias del DOM. */

(function(P){
  /* equipos: pts y jugados tras la jornada 11 (datos de respaldo al lunes 12 de octubre de 2026; si la base de la página responde, estos números se reemplazan solos); momio = probabilidad implícita previa al torneo (promedio de dos cotizaciones de Caliente de julio) o estimación propia si no hubo cotización */
  P.EQUIPOS=[
    {c:'AME',nombre:'América',pts:21,jug:10,previa:0.150,cotizado:true},
    {c:'TOL',nombre:'Toluca',pts:20,jug:11,previa:0.150,cotizado:true},
    {c:'QRO',nombre:'Querétaro',pts:20,jug:11,previa:0.020,cotizado:false},
    {c:'CHI',nombre:'Chivas',pts:19,jug:11,previa:0.130,cotizado:true},
    {c:'LEO',nombre:'León',pts:18,jug:11,previa:0.030,cotizado:false},
    {c:'ATS',nombre:'Atlas',pts:18,jug:11,previa:0.030,cotizado:false},
    {c:'CAZ',nombre:'Cruz Azul',pts:17,jug:11,previa:0.170,cotizado:true},
    {c:'TIJ',nombre:'Tijuana',pts:15,jug:10,previa:0.025,cotizado:false},
    {c:'PUE',nombre:'Puebla',pts:15,jug:11,previa:0.025,cotizado:false},
    {c:'MTY',nombre:'Monterrey',pts:14,jug:11,previa:0.080,cotizado:true},
    {c:'PAC',nombre:'Pachuca',pts:13,jug:11,previa:0.095,cotizado:true},
    {c:'PUM',nombre:'Pumas',pts:13,jug:11,previa:0.105,cotizado:true},
    {c:'TIG',nombre:'Tigres',pts:13,jug:11,previa:0.115,cotizado:true},
    {c:'SAN',nombre:'Santos Laguna',pts:13,jug:11,previa:0.015,cotizado:false},
    {c:'SLP',nombre:'Atlético San Luis',pts:12,jug:11,previa:0.015,cotizado:false},
    {c:'ATE',nombre:'Atlante',pts:11,jug:11,previa:0.015,cotizado:false},
    {c:'NEC',nombre:'Necaxa',pts:9,jug:11,previa:0.015,cotizado:false},
    {c:'JUA',nombre:'FC Juárez',pts:4,jug:11,previa:0.008,cotizado:false}
  ];
  /* partidos pendientes conocidos (local primero; el tercer valor true indica que no se conoce el local y se sortea en cada simulación) */
  P.FIJOS=[['AME','TIJ',true]];
  P.DATOS={jornada:11,fecha:'2026-10-12T19:00:00-06:00',enVivo:false,pendientes:[]};
  var N=P.EQUIPOS.length,JORNADAS=17;
  var idx={};P.EQUIPOS.forEach(function(e,i){idx[e.c]=i});

  /* fuerza de cada equipo en unidades logarítmicas de goles. peso: 0 = solo momios previos, 1 = solo la tabla actual */
  /* paridad: 0 = las diferencias de fuerza van completas; 1 = se reducen al 30% y el torneo queda muy parejo */
  P.fuerzas=function(peso,paridad){
    var escala=1-0.7*(paridad||0);
    var lnMedia=0;P.EQUIPOS.forEach(function(e){lnMedia+=Math.log(e.previa)});lnMedia/=N;
    var ppgMedia=0,suma=0;P.EQUIPOS.forEach(function(e){ppgMedia+=e.pts;suma+=e.jug});ppgMedia/=suma;
    return P.EQUIPOS.map(function(e){
      var previa=0.11*(Math.log(e.previa)-lnMedia);
      var ppg=e.pts/e.jug,fiabilidad=e.jug/(e.jug+8);
      var forma=0.34*(ppg-ppgMedia)*fiabilidad;
      return escala*((1-peso)*previa+peso*forma);
    });
  };
  function poisson(l){var L=Math.exp(-l),k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1}
  function goles(fh,fa){var d=fh-fa;return [poisson(1.33*Math.exp(0.1+d/2)),poisson(1.33*Math.exp(-0.05-d/2))]}

  /* pareja de partidos al azar para los equipos con partidos restantes */
  function calendarioRestante(){
    var cupos=[];
    var rest=P.EQUIPOS.map(function(e,i){
      var jugDespues=e.jug;
      P.FIJOS.forEach(function(f){if(f[0]===e.c||f[1]===e.c)jugDespues++});
      return JORNADAS-jugDespues;
    });
    for(var i=0;i<N;i++)for(var k=0;k<rest[i];k++)cupos.push(i);
    for(var intento=0;intento<50;intento++){
      for(var a=cupos.length-1;a>0;a--){var b=Math.floor(Math.random()*(a+1)),t=cupos[a];cupos[a]=cupos[b];cupos[b]=t}
      var ok=true;
      for(var m=0;m<cupos.length;m+=2)if(cupos[m]===cupos[m+1]){
        var s=-1;for(var q=0;q<cupos.length;q+=2)if(cupos[q]!==cupos[m]&&cupos[q+1]!==cupos[m]&&cupos[q]!==cupos[m+1]&&cupos[q+1]!==cupos[m+1]){s=q;break}
        if(s<0){ok=false;break}
        var tmp=cupos[m+1];cupos[m+1]=cupos[s];cupos[s]=tmp;
      }
      if(ok)break;
    }
    return cupos;
  }
  /* serie a dos partidos: gana el mejor ubicado si empatan el global (cuartos y semis) */
  function serie(a,b,f,mejor,alAzar){
    var g1=goles(f[b],f[a]),g2=goles(f[a],f[b]);/* ida en casa de b (peor ubicado), vuelta en casa de a */
    var ga=g1[1]+g2[0],gb=g1[0]+g2[1];
    if(ga>gb)return a;if(gb>ga)return b;
    return alAzar?(Math.random()<0.5?a:b):mejor;
  }
  /* una temporada completa; devuelve tabla final y resultado de la liguilla */
  P.simular=function(f){
    var pts=P.EQUIPOS.map(function(e){return e.pts}),dg=P.EQUIPOS.map(function(e){return e.dg||0});
    function juega(h,a){var g=goles(f[h],f[a]);dg[h]+=g[0]-g[1];dg[a]+=g[1]-g[0];
      if(g[0]>g[1])pts[h]+=3;else if(g[0]<g[1])pts[a]+=3;else{pts[h]++;pts[a]++}}
    P.FIJOS.forEach(function(x){if(x[2]&&Math.random()<0.5)juega(idx[x[1]],idx[x[0]]);else juega(idx[x[0]],idx[x[1]])});
    var cupos=calendarioRestante();
    for(var m=0;m<cupos.length;m+=2){if(Math.random()<0.5)juega(cupos[m],cupos[m+1]);else juega(cupos[m+1],cupos[m])}
    var orden=P.EQUIPOS.map(function(e,i){return i}).sort(function(a,b){return (pts[b]-pts[a])||(dg[b]-dg[a])||(Math.random()-0.5)});
    var cuartos=[[0,7],[1,6],[2,5],[3,4]].map(function(p){var a=orden[p[0]],b=orden[p[1]];return serie(a,b,f,a,false)});
    var pos={};orden.forEach(function(e,i){pos[e]=i});
    /* semifinales con reubicación: el mejor ubicado contra el peor ubicado de los que quedan */
    var s=cuartos.slice().sort(function(a,b){return pos[a]-pos[b]});
    var sf1=serie(s[0],s[3],f,s[0],false),sf2=serie(s[1],s[2],f,s[1],false);
    var fin=[sf1,sf2].sort(function(a,b){return pos[a]-pos[b]});
    var campeon=serie(fin[0],fin[1],f,fin[0],true);
    return {orden:orden,pts:pts,cuartos:cuartos,finalistas:[sf1,sf2],campeon:campeon,semis:s};
  };
  P.correr=function(peso,n,paridad){
    var f=P.fuerzas(peso,paridad),r=P.EQUIPOS.map(function(){return {top8:0,top4:0,top1:0,semi:0,fin:0,camp:0,pts:0}});
    for(var k=0;k<n;k++){
      var x=P.simular(f);
      x.orden.forEach(function(e,i){r[e].pts+=x.pts[e];if(i<8)r[e].top8++;if(i<4)r[e].top4++;if(i<1)r[e].top1++});
      x.semis.forEach(function(e){r[e].semi++});
      x.finalistas.forEach(function(e){r[e].fin++});
      r[x.campeon].camp++;
    }
    return r.map(function(v,i){return {c:P.EQUIPOS[i].c,nombre:P.EQUIPOS[i].nombre,top8:v.top8/n,top4:v.top4/n,top1:v.top1/n,semi:v.semi/n,fin:v.fin/n,camp:v.camp/n,pts:v.pts/n}});
  };
})(PRONOSTICO);

  var SIMULACIONES=6000;
  var COLORES_EXTRA={QRO:'#4a6fa5',SLP:'#d9a441',JUA:'#6aa84f'};
  function colorEquipo(codigo){return CLUBES[codigo]?CLUBES[codigo].color:COLORES_EXTRA[codigo]}
  function porcentaje(x){return (x*100).toFixed(x>=0.095?0:1).replace(/\.0$/,'')+'%'}
  var control=uno('#pron-peso'),parejo=uno('#pron-parejo'),cajaFilas=uno('#pron-filas'),veredicto=uno('#pron-veredicto'),subtitulo=uno('#pron-sub'),textoPeso=uno('#pron-peso-texto');
  var filas={};
  PRONOSTICO.EQUIPOS.forEach(function(e){
    var fila=crearElemento('div','pron-fila','<span class="nom"></span><span class="pista"><i></i><b></b></span><span class="num"></span><span class="num"></span>');
    var nomPron=uno('.nom',fila);nomPron.appendChild(crearEscudo(e.c,20));var txtPron=document.createElement('span');txtPron.className='texto';txtPron.textContent=e.nombre;nomPron.appendChild(txtPron);uno('i',fila).style.background=colorEquipo(e.c);
    cajaFilas.appendChild(fila);filas[e.c]=fila;
  });
  function pintar(resultados){
    var orden=resultados.slice().sort(function(a,b){return b.camp-a.camp});
    PRONOSTICO.ultimo={};resultados.forEach(function(r){PRONOSTICO.ultimo[r.c]=r});
    if(PRONOSTICO.alPronosticar)PRONOSTICO.alPronosticar();
    var maximo=orden[0].camp||1;
    orden.forEach(function(r,i){
      var fila=filas[r.c],ancho=r.camp/maximo*80;
      fila.style.order=i;
      uno('i',fila).style.width=ancho+'%';
      var etiqueta=uno('b',fila);etiqueta.style.left=ancho+'%';etiqueta.textContent=porcentaje(r.camp);
      var nums=fila.querySelectorAll('.num');nums[0].textContent=porcentaje(r.top8);nums[1].textContent=porcentaje(r.fin);
    });
    cajaFilas.style.display='flex';cajaFilas.style.flexDirection='column';
    var a=orden[0],b=orden[1],c=orden[2];
    veredicto.innerHTML='Mi pronóstico: <span></span>';uno('span',veredicto).textContent=a.nombre;
    subtitulo.textContent='Con '+porcentaje(a.camp)+' de probabilidad, seguido de '+b.nombre+' ('+porcentaje(b.camp)+') y '+c.nombre+' ('+porcentaje(c.camp)+'). Aun así, hay '+porcentaje(1-a.camp)+' de que sea otro equipo.';
  }
  function ejecutar(){
    var peso=+control.value/100;
    textoPeso.textContent=(control.value==='0'?'Solo los momios de julio.':control.value==='100'?'Solo la tabla de hoy.':'Tabla de hoy '+control.value+'%, momios de julio '+(100-control.value)+'%.')+(parejo.value==='0'?' Mandan los favoritos.':parejo.value==='100'?' Todos los equipos parejos.':' Torneo parejo al '+parejo.value+'%.')+' '+SIMULACIONES.toLocaleString('es-MX')+' torneos simulados.';
    pintar(PRONOSTICO.correr(peso,SIMULACIONES,+parejo.value/100));
  }
  control.addEventListener('input',function(){textoPeso.textContent='Tabla de hoy '+control.value+'%, momios de julio '+(100-control.value)+'%.'});
  control.addEventListener('change',ejecutar);
  parejo.addEventListener('input',function(){textoPeso.textContent=(parejo.value==='100'?'Todos los equipos parejos.':parejo.value==='0'?'Mandan los favoritos.':'Parejo al '+parejo.value+'%.')});
  parejo.addEventListener('change',ejecutar);
  uno('#pron-otra').addEventListener('click',ejecutar);

  /* ---------- tabla automática ----------
     Una tarea programada revisa los resultados y los guarda en la base de la página (documento apertura/tabla).
     Aquí se leen, se validan y se reemplazan los datos de respaldo. Todo lo que llega de la base se trata como dato
     no confiable: solo se aceptan números y claves de equipos conocidos, y el texto se escribe con textContent. */
  var PARTES_FECHA={day:'numeric',month:'long',year:'numeric'};
  function fechaLarga(valor){
    var f=new Date(valor);if(isNaN(f.getTime()))return '';
    try{return f.toLocaleDateString('es-MX',PARTES_FECHA)}catch(e){return ''}
  }
  function horaCorta(valor){
    var f=new Date(valor);if(isNaN(f.getTime()))return '';
    try{return f.toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'})}catch(e){return ''}
  }
  function unirNombres(lista){return lista.length<2?(lista[0]||''):lista.slice(0,-1).join(', ')+' y '+lista[lista.length-1]}
  function esNumero(x,min,max){return typeof x==='number'&&isFinite(x)&&x>=min&&x<=max}

  /* orden de la tabla: puntos, diferencia de gol si se conoce y, al final, el orden previo */
  function ordenados(){
    return PRONOSTICO.EQUIPOS.map(function(e,i){return {e:e,i:i}}).sort(function(a,b){
      return (b.e.pts-a.e.pts)||((b.e.dg||0)-(a.e.dg||0))||(a.i-b.i);
    }).map(function(x){return x.e});
  }

  function aplicarDatos(d,enVivo){
    if(!d||typeof d!=='object'||!d.equipos||typeof d.equipos!=='object')return false;
    /* si los datos ya cargados son más recientes, no se pisan */
    if(typeof d.actualizado==='string'&&PRONOSTICO.DATOS&&PRONOSTICO.DATOS.fecha){
      var nueva=new Date(d.actualizado).getTime(),vieja=new Date(PRONOSTICO.DATOS.fecha).getTime();
      if(!isNaN(nueva)&&!isNaN(vieja)&&nueva<vieja)return false;
    }
    var E=PRONOSTICO.EQUIPOS,nuevos=[];
    for(var i=0;i<E.length;i++){
      var x=d.equipos[E[i].c];
      if(!x||!esNumero(x.pj,1,17)||!esNumero(x.pts,0,51))return false;
      nuevos.push({pj:x.pj,pts:x.pts,dg:esNumero(x.dg,-60,60)?x.dg:null});
    }
    var codigos={};E.forEach(function(e){codigos[e.c]=true});
    var fijos=[],cuenta={};
    if(Array.isArray(d.fijos))d.fijos.forEach(function(f){
      if(f&&codigos[f.l]&&codigos[f.v]&&f.l!==f.v){fijos.push(f.azar===true?[f.l,f.v,true]:[f.l,f.v]);cuenta[f.l]=(cuenta[f.l]||0)+1;cuenta[f.v]=(cuenta[f.v]||0)+1}
    });
    /* el calendario que falta debe poder repartirse por parejas: nadie con más de 17 partidos y un total par */
    var faltan=0;
    for(var k=0;k<E.length;k++){
      var resto=17-nuevos[k].pj-(cuenta[E[k].c]||0);
      if(resto<0)return false;
      faltan+=resto;
    }
    if(faltan%2!==0)return false;
    E.forEach(function(e,j){e.jug=nuevos[j].pj;e.pts=nuevos[j].pts;e.dg=nuevos[j].dg});
    PRONOSTICO.FIJOS=fijos;
    var resultados=[];
    if(Array.isArray(d.resultados))d.resultados.slice(0,20).forEach(function(r){if(typeof r==='string'&&r.length<=90)resultados.push(r)});
    PRONOSTICO.DATOS={jornada:esNumero(d.jornada,1,17)?d.jornada:null,fecha:typeof d.actualizado==='string'?d.actualizado:'',enVivo:enVivo===true,resultados:resultados};
    return true;
  }

  function pintarTabla(){
    var tabla=uno('#pron-tabla'),lista=ordenados();
    var conDg=lista.every(function(e){return typeof e.dg==='number'});
    tabla.innerHTML='';
    var cab=document.createElement('tr');
    ['#','Equipo','PJ'].concat(conDg?['DG']:[]).concat(['Pts']).forEach(function(t){var th=document.createElement('th');th.textContent=t;cab.appendChild(th)});
    tabla.appendChild(cab);
    lista.forEach(function(e,i){
      var tr=document.createElement('tr');if(i===7)tr.className='corte';
      [i+1,e.nombre,e.jug].concat(conDg?[(e.dg>0?'+':'')+e.dg]:[]).concat([e.pts]).forEach(function(v){var td=document.createElement('td');td.textContent=v;tr.appendChild(td)});
      tabla.appendChild(tr);
    });
    var d=PRONOSTICO.DATOS,fecha=fechaLarga(d.fecha);
    uno('#pron-tabla-titulo').textContent='Tabla de posiciones'+(d.jornada?' tras la jornada '+d.jornada:'')+(fecha?' · '+fecha:'');
    var nombre={};PRONOSTICO.EQUIPOS.forEach(function(e){nombre[e.c]=e.nombre});
    var nota=uno('#pron-tabla-nota');
    nota.textContent='Puntos y partidos jugados. Los ocho primeros pasan a la liguilla.'+(PRONOSTICO.FIJOS.length?' Pendientes que cuentan en el pronóstico: '+PRONOSTICO.FIJOS.map(function(f){return nombre[f[0]]+' contra '+nombre[f[1]]}).join(', ')+'.':'');
    var cajaRes=uno('#pron-resultados');cajaRes.innerHTML='';
    var res=d.resultados||[];
    cajaRes.hidden=!res.length;
    res.forEach(function(r){var li=document.createElement('li');li.textContent=r;cajaRes.appendChild(li)});
  }
  function pintarFuente(){
    var d=PRONOSTICO.DATOS,fecha=fechaLarga(d.fecha),hora=horaCorta(d.fecha);
    var txt='Tabla '+(fecha?'al '+fecha:'')+(d.jornada?', tras la jornada '+d.jornada:'')+'.';
    txt+=d.enVivo?' Se actualiza sola'+(hora?' (última revisión a las '+hora+')':'')+'.':' Datos guardados en la página.';
    uno('#pron-fuente').textContent=txt;
  }
  function pintarHoy(){
    var o=ordenados(),d=PRONOSTICO.DATOS;
    var hoy=fechaLarga(new Date());
    if(hoy)uno('#hoy-fecha').textContent='Hoy · '+hoy;
    var lideres=o.filter(function(e){return e.pts===o[0].pts}).map(function(e){return e.nombre});
    var frase;
    if(lideres.length>1)frase=unirNombres(lideres)+' lideran con '+o[0].pts+' puntos';
    else{
      var segundos=o.filter(function(e,i){return i>0&&e.pts===o[1].pts}).map(function(e){return e.nombre});
      frase=o[0].nombre+' lidera con '+o[0].pts+' puntos, seguido de '+unirNombres(segundos)+' con '+o[1].pts;
    }
    uno('#hoy-texto').textContent='Cruz Azul es el campeón vigente (Clausura 2026, décimo título) y también ganó el Campeón de Campeones 2026 ante Toluca. En el Apertura 2026, '+(d.jornada?'tras la jornada '+d.jornada+', ':'')+frase+'.';
  }
  function refrescar(){pintarTabla();pintarHoy();pintarFuente();ejecutar()}
  pintarTabla();pintarHoy();pintarFuente();

  /* fuente 1: el archivo tabla.json que viaja con la página (funciona en cualquier hosting estático) */
  try{
    if(window.fetch)fetch('tabla.json',{cache:'no-cache'}).then(function(r){return r.ok?r.json():null}).then(function(d){if(d&&aplicarDatos(d,false))refrescar()}).catch(function(){});
  }catch(e){}

  /* fuente 2: la base de la página en claude.ai; si el visor no la ofrece, se quedan los otros datos */
  (function(){
    if(!window.claude||typeof window.claude.use!=='function')return;
    var u=window.claude.use('db');
    if(!u||typeof u.then!=='function')return;
    u.then(function(db){
      if(!db)return;
      db.doc('apertura/tabla').onSnapshot(function(snap){
        if(!snap.exists)return;
        if(aplicarDatos(snap.data(),true))refrescar();
      },function(){});
    }).catch(function(){});
  })();

  /* un torneo completo, al azar */
  var salidaTorneo=uno('#pron-un-torneo-salida');
  uno('#pron-un-torneo').addEventListener('click',function(){
    var fuerzas=PRONOSTICO.fuerzas(+control.value/100,+parejo.value/100),x=PRONOSTICO.simular(fuerzas),E=PRONOSTICO.EQUIPOS;
    function n(i){return E[i].nombre}
    salidaTorneo.innerHTML='';
    var p1=document.createElement('p');p1.innerHTML='<b>Así podría terminar la fase regular</b>';salidaTorneo.appendChild(p1);
    var lista=document.createElement('ol');
    x.orden.slice(0,8).forEach(function(i){var li=document.createElement('li');li.textContent=n(i)+' · '+x.pts[i]+' pts';lista.appendChild(li)});
    salidaTorneo.appendChild(lista);
    var p2=document.createElement('p');
    p2.textContent='Cuartos: pasan '+x.cuartos.map(n).join(', ')+'. Final: '+n(x.finalistas[0])+' contra '+n(x.finalistas[1])+'. ';
    var campeon=document.createElement('b');campeon.textContent='Campeón de esta simulación: '+n(x.campeon)+'.';p2.appendChild(campeon);
    salidaTorneo.appendChild(p2);
  });
  setTimeout(ejecutar,0);
})();

/* ---------- himno: suena al abrir, con mute y volumen ---------- */
(function(){
  var audio=uno('#himno');if(!audio)return;
  var botonGrande=uno('#boton-himno-grande'),botonMenu=uno('#boton-himno'),botonMudo=uno('#boton-mudo'),botonMudoGrande=uno('#boton-mudo-grande'),
      volumen=uno('#himno-volumen'),progreso=uno('#himno-progreso'),tiempo=uno('#himno-tiempo'),estado=uno('#himno-estado'),aviso=uno('#himno-aviso'),cerrarAviso=uno('#himno-aviso-cerrar');
  var DURACION_POR_DEFECTO=134,CLAVE='ligamx-himno',esperandoToque=false;
  var ICONO_ALTAVOZ='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
  var ICONO_MUDO='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
  /* la preferencia vive solo en este navegador; si falla el almacenamiento, la página funciona igual */
  function leerPreferencia(){try{return localStorage.getItem(CLAVE)}catch(e){return null}}
  function guardarPreferencia(v){try{localStorage.setItem(CLAVE,v)}catch(e){}}
  function formato(s){s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2)}
  function duracion(){return isFinite(audio.duration)&&audio.duration>0?audio.duration:DURACION_POR_DEFECTO}
  function silenciado(){return audio.muted||audio.volume===0}
  function pintar(){
    var sonando=!audio.paused&&!audio.ended;
    botonGrande.textContent=sonando?'❚❚ Pausar el himno':(audio.currentTime>0&&!audio.ended?'▶ Seguir escuchando':'▶ Escuchar el himno');
    uno('.txt',botonMenu).textContent=sonando?'Himno':'Himno';
    uno('.ico',botonMenu).textContent=sonando?'❚❚':'♪';
    botonMenu.setAttribute('aria-pressed',String(sonando));
    botonMenu.setAttribute('aria-label',sonando?'Pausar el himno':'Escuchar el himno');
    var mudo=silenciado();
    [botonMudo,botonMudoGrande].forEach(function(b){b.innerHTML=mudo?ICONO_MUDO:ICONO_ALTAVOZ;b.setAttribute('aria-pressed',String(mudo));b.setAttribute('aria-label',mudo?'Activar el sonido':'Silenciar el himno');b.title=mudo?'Activar el sonido':'Silenciar'});
    volumen.value=String(audio.muted?0:Math.round(audio.volume*100));
    progreso.value=String(Math.round(audio.currentTime/duracion()*1000));
    tiempo.textContent=formato(audio.currentTime)+' / '+formato(duracion());
  }
  function ocultarAviso(){aviso.hidden=true}
  function dejarDeEsperar(){
    esperandoToque=false;ocultarAviso();
    ['pointerup','keydown','touchend','click'].forEach(function(n){document.removeEventListener(n,alPrimerToque,true)});
  }
  function reproducir(){
    var promesa=audio.play();
    if(promesa&&promesa.catch)return promesa.catch(function(){estado.textContent='No pude reproducir el audio aquí. Prueba tocar el botón otra vez.'});
  }
  /* primer toque en cualquier parte: ahí el navegador ya permite el sonido */
  function alPrimerToque(e){
    if(e.target&&e.target.closest&&e.target.closest('[data-himno]'))return;
    dejarDeEsperar();
    if(audio.paused&&!audio.ended&&leerPreferencia()!=='off')reproducir();
  }
  function esperarToque(){
    if(esperandoToque)return;esperandoToque=true;
    aviso.hidden=false;
    ['pointerup','keydown','touchend','click'].forEach(function(n){document.addEventListener(n,alPrimerToque,true)});
  }
  function intentarAutoplay(){
    if(leerPreferencia()==='off'){estado.textContent='El himno está en silencio porque lo detuviste la última vez. Dale play cuando quieras.';return}
    if(document.hidden){esperarToque();return}
    var promesa=audio.play();
    if(promesa&&promesa.then)promesa.then(function(){},function(){esperarToque()});
  }
  /* acciones de la persona: se recuerdan para la próxima visita */
  function alternar(){
    dejarDeEsperar();
    if(audio.paused){guardarPreferencia('on');estado.textContent='Cargando el himno…';reproducir()}
    else{guardarPreferencia('off');audio.pause()}
  }
  function alternarMudo(){
    dejarDeEsperar();
    if(silenciado()){audio.muted=false;if(audio.volume===0)audio.volume=0.6;guardarPreferencia('on')}
    else{audio.muted=true;guardarPreferencia('off')}
    pintar();
  }
  botonGrande.addEventListener('click',alternar);botonMenu.addEventListener('click',alternar);
  botonMudo.addEventListener('click',alternarMudo);botonMudoGrande.addEventListener('click',alternarMudo);
  volumen.addEventListener('input',function(){
    dejarDeEsperar();
    var v=+volumen.value/100;audio.volume=v;audio.muted=(v===0);pintar();
  });
  progreso.addEventListener('input',function(){
    dejarDeEsperar();
    if(audio.readyState>0||audio.duration)audio.currentTime=progreso.value/1000*duracion();else{audio.preload='auto';audio.load()}
    pintar();
  });
  cerrarAviso.addEventListener('click',function(){dejarDeEsperar();guardarPreferencia('off');estado.textContent='Listo, no sonará solo. Dale play cuando quieras.'});
  ['play','pause','timeupdate','ended','loadedmetadata','durationchange','volumechange'].forEach(function(n){audio.addEventListener(n,pintar)});
  audio.addEventListener('playing',function(){estado.textContent=silenciado()?'Sonando, pero en silencio.':'Sonando: himno de la Liga MX.'});
  audio.addEventListener('pause',function(){if(!audio.ended)estado.textContent='En pausa.'});
  audio.addEventListener('ended',function(){estado.textContent='Terminó. Dale play para escucharlo otra vez.'});
  audio.addEventListener('error',function(){dejarDeEsperar();estado.textContent='El audio no se pudo cargar en este momento.';botonGrande.disabled=true;botonMenu.hidden=true;botonMudo.hidden=true});
  audio.volume=0.7;
  pintar();
  setTimeout(intentarAutoplay,250);
})();

/* ---------- datos curiosos ---------- */
var DATOS=[
 ['Historia','El profesionalismo llegó en 1943','Ese año la liga aceptó registrar la profesión de futbolista ante la Secretaría del Trabajo. El campeonato venía corriendo desde 1922, cuando América venció 2-0 al Real Club España en el primer partido.'],
 ['Historia','Solo dos clubes nunca se han ido','De los sesenta equipos que han jugado en la liga, América y Chivas son los únicos que siempre han estado en Primera desde la edición inaugural.'],
 ['Historia','Dos trofeos','El clásico, de plata esterlina y cobre, lo hizo Reed & Barton en 1922 y se entregó hasta el Apertura 2007. Desde 2008 el trofeo es de plata 925 hecha a mano, con forma de cabeza de águila que sostiene un balón sobre una base de obsidiana.'],
 ['Historia','La Copa Challenger','Se entregaba a quien ganara tres campeonatos seguidos. La ganaron España, América y Guadalajara.'],
 ['Historia','Atlante y la fiebre aftosa','En 1946-47 una cuarentena movió el juego clave contra León a la casa de Atlante. El 0-0 le dio el título y la polémica.'],
 ['Historia','El nacimiento de la Liguilla','La propuso el presidente de León, Roberto Solís. Se aprobó en 1970 con un empate en la votación que rompió el voto de calidad del presidente de la rama.'],
 ['Récords','Toluca 9-0 Puebla','En el Verano 2000, Toluca ganó 0-2 de visita y 7-0 en casa. El récord duró 22 años, hasta el 11-2 de América a Puebla en 2022.'],
 ['Récords','Cardozo, rey del Apertura 2002','Marcó 29 goles en un solo torneo corto. Toluca anotó 55 ese semestre, la mejor ofensiva de los torneos cortos.'],
 ['Récords','Pachuca 9, Veracruz 2','En el Clausura 2019 los Tuzos firmaron una de las mayores goleadas de la era de torneos cortos.'],
 ['Récords','Cabinho, ocho veces goleador','Ganó el título de goleo ocho veces y llegó a 34 goles en una sola temporada con Pumas en 1976-77.'],
 ['Rarezas','Un título cancelado','El Clausura 2020 se suspendió por la pandemia y quedó sin campeón. Sus estadísticas siguen contando.'],
 ['Rarezas','El gol de oro decidió tres finales','Invierno 1997 (Cruz Azul), Invierno 1999 (Pachuca) y Verano 2002 (América). Se usó hasta el Clausura 2004.'],
 ['Rarezas','Tijuana, campeón exprés','Ganó el Apertura 2012 con 59 partidos en Primera desde su ascenso, el título más rápido de un recién ascendido.'],
 ['Rarezas','Sin descenso por seis años','En abril de 2020 se acordó suspender el ascenso y descenso durante seis años, por la crisis de los equipos de la categoría de ascenso.'],
 ['Rarezas','Clubes sin título','Querétaro, Atlético San Luis y Juárez nunca han sido campeones. Querétaro llegó a la final del Clausura 2015 y perdió 5-3 en el global ante Santos.'],
 ['Hoy','Pumas sigue esperando','No gana la liga desde el Clausura 2011. Perdió la final del Clausura 2026 ante Cruz Azul, con gol en el 90+5.'],
 ['Hoy','2023, el año más goleador','La liga anotó 958 goles ese año, 2.9 por partido, con más de 7.8 millones de aficionados en los estadios.']
];
var etiquetasDatos=['Todos'].concat(DATOS.map(function(d){return d[0]}).filter(function(v,i,a){return a.indexOf(v)===i}));
var cajaEtiquetasDatos=uno('#etiquetas-datos'),cajaDatos=uno('#lista-datos'),etiquetaActiva='Todos';
etiquetasDatos.forEach(function(texto){var boton=crearElemento('button','etiqueta');boton.type='button';boton.dataset.clave=texto;boton.textContent=texto;boton.setAttribute('aria-pressed',String(texto==='Todos'));cajaEtiquetasDatos.appendChild(boton)});
cajaEtiquetasDatos.addEventListener('click',function(e){
  var boton=e.target.closest('.etiqueta');if(!boton)return;
  etiquetaActiva=boton.dataset.clave;
  varios('.etiqueta',cajaEtiquetasDatos).forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.clave===etiquetaActiva))});
  dibujarDatos();
});
function dibujarDatos(){
  cajaDatos.innerHTML='';
  DATOS.filter(function(d){return etiquetaActiva==='Todos'||d[0]===etiquetaActiva}).forEach(function(d){
    var tarjeta=crearElemento('div','dato','<em></em><h3></h3><p></p>');
    uno('em',tarjeta).textContent=d[0];uno('h3',tarjeta).textContent=d[1];uno('p',tarjeta).textContent=d[2];cajaDatos.appendChild(tarjeta);
  });
}
dibujarDatos();

/* ---------- juego: ¿quién ganó? ---------- */
(function(){
  var caja=uno('#caja-juego'),RONDAS=10;
  var conCampeon=TORNEOS.filter(function(t){return t.club});
  var clubesCampeones=Object.keys(titulosPorClub);
  function barajar(lista){lista=lista.slice();for(var i=lista.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var x=lista[i];lista[i]=lista[j];lista[j]=x}return lista}
  var rondas,ronda,aciertos;
  function empezar(){rondas=barajar(conCampeon).slice(0,RONDAS);ronda=0;aciertos=0;dibujar()}
  function dibujar(){
    caja.innerHTML='';
    if(ronda>=RONDAS){
      var mensaje=aciertos>=9?'Memoria de cronista.':aciertos>=6?'Muy bien.':'Hay que repasar la línea del tiempo.';
      caja.innerHTML='<p class="sobretitulo">Resultado</p><div class="pregunta"></div><p class="explicacion"></p><div class="fila-botones"></div>';
      uno('.pregunta',caja).textContent=aciertos+' de '+RONDAS;uno('.explicacion',caja).textContent=mensaje;
      var botones=uno('.fila-botones',caja);
      var otraVez=crearElemento('button','boton-siguiente');otraVez.type='button';otraVez.textContent='Jugar otra vez';otraVez.addEventListener('click',empezar);botones.appendChild(otraVez);
      var compartir=crearElemento('button','boton-siguiente');compartir.type='button';compartir.textContent='Copiar mi resultado';
      var textoResultado='Saqué '+aciertos+' de '+RONDAS+' en ¿Quién ganó? de la Liga MX 1943–2026.';
      compartir.addEventListener('click',function(){
        function alternativa(){var campo=crearElemento('input','campo-copiar');campo.readOnly=true;campo.value=textoResultado;caja.appendChild(campo);campo.focus();campo.select()}
        try{navigator.clipboard.writeText(textoResultado).then(function(){compartir.textContent='Copiado'},alternativa)}catch(e){alternativa()}
      });
      botones.appendChild(compartir);
      return;
    }
    var torneo=rondas[ronda];
    var incorrectas=barajar(clubesCampeones.filter(function(c){return c!==torneo.club})).slice(0,3);
    var opciones=barajar(incorrectas.concat([torneo.club]));
    caja.innerHTML='<div class="barra-juego"><span></span><span></span></div><div class="pregunta"></div><div class="opciones"></div><p class="explicacion" aria-live="polite"></p>';
    var marcadores=caja.querySelectorAll('.barra-juego span');marcadores[0].textContent='Ronda '+(ronda+1)+' de '+RONDAS;marcadores[1].textContent='Aciertos '+aciertos;
    uno('.pregunta',caja).textContent='¿Quién ganó el '+torneo.etiqueta+'?';
    var cajaOpciones=uno('.opciones',caja);
    opciones.forEach(function(codigo){
      var boton=crearElemento('button','opcion');boton.type='button';boton.appendChild(crearEscudo(codigo,26));boton.appendChild(document.createTextNode(CLUBES[codigo].nombre));
      boton.addEventListener('click',function(){
        varios('.opcion',cajaOpciones).forEach(function(x,j){x.disabled=true;if(opciones[j]===torneo.club)x.classList.add('acierto')});
        var acerto=codigo===torneo.club;if(acerto)aciertos++;else boton.classList.add('error');
        var final=FINALES[torneo.etiqueta];
        var extra=final?' Subcampeón: '+nombreClub(final[0])+(final[1]?' ('+final[1]+')':'')+'.':'';
        uno('.explicacion',caja).textContent=(acerto?'Correcto. ':'No fue. ')+'Ganó '+CLUBES[torneo.club].nombre+'.'+extra;
        var siguiente=crearElemento('button','boton-siguiente');siguiente.type='button';siguiente.textContent=ronda===RONDAS-1?'Ver resultado':'Siguiente';
        siguiente.addEventListener('click',function(){ronda++;dibujar()});
        caja.appendChild(siguiente);siguiente.focus();
      });
      cajaOpciones.appendChild(boton);
    });
  }
  empezar();
})();

/* ---------- ruleta del campeón ---------- */
(function(){
  var lienzo=uno('#ruleta-lienzo');
  if(!lienzo||!lienzo.getContext)return;
  var ctx=lienzo.getContext('2d');
  var botonGirar=uno('#ruleta-girar'),modoIguales=uno('#ruleta-modo-iguales'),modoPron=uno('#ruleta-modo-pron'),
      salida=uno('#ruleta-resultado'),cajaHistorial=uno('#ruleta-historial');
  /* orden fijo, pensado para que dos colores parecidos no queden juntos */
  var ORDEN=['AME','CAZ','CHI','TOL','TIG','PUM','LEO','MTY','PAC','SAN','ATS','NEC','ATE','PUE','TIJ','QRO','SLP','JUA'];
  var COLORES_RULETA={QRO:'#4a6fa5',SLP:'#d9a441',JUA:'#6aa84f'};
  var nombres={};PRONOSTICO.EQUIPOS.forEach(function(e){nombres[e.c]=e.nombre});
  var equipos=ORDEN.filter(function(c){return nombres[c]});
  function colorDe(c){return CLUBES[c]?CLUBES[c].color:(COLORES_RULETA[c]||'#8a8f98')}

  var imagenes={},logo=new Image();
  equipos.forEach(function(c){
    if(!ESCUDOS[c])return;
    var im=new Image();im.onload=function(){dibujar()};im.src=''+ESCUDOS[c]+'.webp';imagenes[c]=im;
  });
  logo.onload=function(){dibujar()};logo.src='logo-liga-mx.webp';

  var modo='iguales',giro=0,girando=false,ganador=-1,historial=[];
  var DOS_PI=Math.PI*2;

  /* tamaño de cada gajo: iguales, o según la probabilidad de campeón del pronóstico */
  function pesos(){
    var u=PRONOSTICO.ultimo;
    var w=equipos.map(function(c){return modo==='pron'&&u&&u[c]?Math.max(u[c].camp,0.006):1});
    var total=w.reduce(function(a,b){return a+b},0);
    return w.map(function(x){return x/total});
  }
  function gajos(){
    var w=pesos(),a=0;
    return w.map(function(x,i){var g={c:equipos[i],ini:a,fin:a+x*DOS_PI,peso:x};a=g.fin;return g});
  }
  function token(nombre,defecto){var v=getComputedStyle(document.documentElement).getPropertyValue(nombre).trim();return v||defecto}

  function dibujar(){
    var ancho=lienzo.clientWidth;if(!ancho)return;
    var dpr=Math.min(window.devicePixelRatio||1,2);
    if(lienzo.width!==Math.round(ancho*dpr)){lienzo.width=lienzo.height=Math.round(ancho*dpr)}
    ctx.setTransform(lienzo.width/ancho,0,0,lienzo.width/ancho,0,0);
    ctx.clearRect(0,0,ancho,ancho);
    var fondo=token('--fondo','#0b130e'),oro=token('--oro','#e6b422'),linea=token('--linea','#27392e'),texto=token('--texto','#e8efe6');
    var cx=ancho/2,R=ancho/2-8,g=gajos();
    /* aro exterior */
    ctx.beginPath();ctx.arc(cx,cx,R+6,0,DOS_PI);ctx.fillStyle=linea;ctx.fill();
    g.forEach(function(x,i){
      ctx.beginPath();ctx.moveTo(cx,cx);ctx.arc(cx,cx,R,giro+x.ini,giro+x.fin);ctx.closePath();
      ctx.fillStyle=colorDe(x.c);ctx.fill();
      ctx.lineWidth=2;ctx.strokeStyle=fondo;ctx.stroke();
    });
    /* escudos sobre cada gajo, siempre derechos */
    g.forEach(function(x){
      var medio=giro+(x.ini+x.fin)/2,r=R*0.74,px=cx+Math.cos(medio)*r,py=cx+Math.sin(medio)*r;
      var arco=(x.fin-x.ini)*r,tam=Math.min(ancho*0.105,arco*0.82);
      if(tam<12)return;
      ctx.beginPath();ctx.arc(px,py,tam/2+3,0,DOS_PI);ctx.fillStyle='#f6f7f4';ctx.fill();
      var im=imagenes[x.c];
      if(im&&im.complete&&im.naturalWidth){ctx.drawImage(im,px-tam/2,py-tam/2,tam,tam)}
      else{ctx.fillStyle='#16130a';ctx.font='700 '+Math.round(tam*0.38)+'px '+getComputedStyle(document.body).getPropertyValue('--f-mono');ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(x.c,px,py)}
    });
    /* gajo ganador resaltado */
    if(ganador>=0&&!girando){
      var w=g[ganador];
      ctx.beginPath();ctx.moveTo(cx,cx);ctx.arc(cx,cx,R,giro+w.ini,giro+w.fin);ctx.closePath();
      ctx.lineWidth=5;ctx.strokeStyle=oro;ctx.lineJoin='round';ctx.stroke();
    }
    /* focos en el borde */
    g.forEach(function(x){
      var a=giro+x.ini,px=cx+Math.cos(a)*(R+3),py=cx+Math.sin(a)*(R+3);
      ctx.beginPath();ctx.arc(px,py,3.2,0,DOS_PI);ctx.fillStyle=oro;ctx.fill();
    });
    /* centro con el logo de la liga */
    var rc=R*0.2;
    ctx.beginPath();ctx.arc(cx,cx,rc+4,0,DOS_PI);ctx.fillStyle=oro;ctx.fill();
    ctx.beginPath();ctx.arc(cx,cx,rc,0,DOS_PI);ctx.fillStyle='#f6f7f4';ctx.fill();
    if(logo.complete&&logo.naturalWidth){
      var lado=rc*1.45,rel=logo.naturalWidth/logo.naturalHeight,lw=rel>=1?lado:lado*rel,lh=rel>=1?lado/rel:lado;
      ctx.drawImage(logo,cx-lw/2,cx-lh/2,lw,lh);
    }
  }

  /* qué gajo está bajo la aguja (arriba, a -90°) */
  function gajoBajoAguja(){
    var a=(((-Math.PI/2-giro)%DOS_PI)+DOS_PI)%DOS_PI,g=gajos();
    for(var i=0;i<g.length;i++)if(a>=g[i].ini&&a<g[i].fin)return i;
    return g.length-1;
  }
  function elegirGanador(){
    var g=gajos(),r=Math.random(),acum=0;
    for(var i=0;i<g.length;i++){acum+=g[i].peso;if(r<acum)return i}
    return g.length-1;
  }

  function ultimoTitulo(c){
    for(var i=TORNEOS.length-1;i>=0;i--)if(TORNEOS[i].club===c)return TORNEOS[i].etiqueta;
    return null;
  }
  function mostrar(c){
    salida.innerHTML='';
    var cab=crearElemento('div','ruleta-ganador','');
    cab.appendChild(crearEscudo(c,72));
    var bloque=document.createElement('div');
    var peq=document.createElement('small');peq.textContent='Tu campeón del Apertura 2026';
    var h=document.createElement('h3');h.textContent=nombres[c];
    bloque.appendChild(peq);bloque.appendChild(h);cab.appendChild(bloque);
    salida.appendChild(cab);
    var lista=document.createElement('ul');lista.className='ruleta-datos';
    var titulos=titulosPorClub[c]||0,ult=ultimoTitulo(c);
    var li1=document.createElement('li');
    li1.textContent=titulos?('Tiene '+titulos+(titulos===1?' título':' títulos')+' de liga desde 1943; el último fue el '+ult+'.'):'Todavía no tiene un título de liga: sería el primero.';
    lista.appendChild(li1);
    var u=PRONOSTICO.ultimo;
    if(u&&u[c]){
      var li2=document.createElement('li');
      var orden=Object.keys(u).sort(function(a,b){return u[b].camp-u[a].camp});
      li2.textContent='En mi pronóstico tiene '+porcentajeRuleta(u[c].camp)+' de probabilidad de ser campeón'+(orden[0]===c?', la más alta de la tabla.':'.');
      lista.appendChild(li2);
    }
    salida.appendChild(lista);
  }
  function porcentajeRuleta(x){return (x*100).toFixed(x>=0.095?0:1).replace(/\.0$/,'')+'%'}

  function pintarHistorial(){
    cajaHistorial.innerHTML='';
    if(!historial.length)return;
    var t=document.createElement('small');t.textContent='Tus giros ('+historial.length+')';cajaHistorial.appendChild(t);
    historial.slice(-8).reverse().forEach(function(c){
      var sp=document.createElement('span');sp.appendChild(crearEscudo(c,22,true));sp.appendChild(document.createTextNode(nombres[c]));cajaHistorial.appendChild(sp);
    });
  }

  function girar(){
    if(girando)return;
    var reducir=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    girando=true;ganador=-1;botonGirar.disabled=true;botonGirar.textContent='Girando…';
    modoIguales.disabled=modoPron.disabled=true;
    salida.innerHTML='<p class="ruleta-vacio">Girando…</p>';
    var g=gajos(),i=elegirGanador(),w=g[i];
    /* el punto de parada cae dentro del gajo, sin llegar a sus bordes */
    var punto=w.ini+(w.fin-w.ini)*(0.18+Math.random()*0.64);
    var base=-Math.PI/2-punto;
    var vueltas=reducir?1:6+Math.floor(Math.random()*3);
    var destino=base+DOS_PI*Math.ceil((giro+vueltas*DOS_PI-base)/DOS_PI);
    var inicio=giro,t0=null,dur=reducir?600:5600;
    function paso(t){
      if(t0===null)t0=t;
      var k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,4);
      giro=inicio+(destino-inicio)*e;
      dibujar();
      if(k<1){requestAnimationFrame(paso);return}
      giro=destino;girando=false;ganador=gajoBajoAguja();
      botonGirar.disabled=false;botonGirar.textContent='Girar otra vez';
      modoIguales.disabled=modoPron.disabled=false;
      historial.push(equipos[ganador]);
      dibujar();mostrar(equipos[ganador]);pintarHistorial();
    }
    requestAnimationFrame(paso);
  }
  botonGirar.addEventListener('click',girar);

  function cambiarModo(nuevo){
    if(girando||modo===nuevo)return;
    modo=nuevo;ganador=-1;
    modoIguales.setAttribute('aria-pressed',String(modo==='iguales'));
    modoPron.setAttribute('aria-pressed',String(modo==='pron'));
    dibujar();
  }
  modoIguales.addEventListener('click',function(){cambiarModo('iguales')});
  modoPron.addEventListener('click',function(){cambiarModo('pron')});

  /* redibujar cuando cambia el tamaño, el tema o el pronóstico */
  if(window.ResizeObserver)new ResizeObserver(function(){dibujar()}).observe(lienzo);
  else window.addEventListener('resize',dibujar);
  if(window.MutationObserver)new MutationObserver(function(){dibujar()}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  if(window.matchMedia)try{window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',dibujar)}catch(e){}
  PRONOSTICO.alPronosticar=function(){if(!girando&&modo==='pron'){ganador=-1;dibujar()}};
  dibujar();
})();

/* ---------- efecto al hacer scroll: la página reacciona a cuánto has bajado ---------- */
(function(){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var vh=window.innerHeight||800;
  function limitar(x,a,b){return x<a?a:x>b?b:x}
  function suave(t){return 1-Math.pow(1-t,3)}

  /* 1. cada bloque de cada sección entra subiendo y aclarándose según su posición en pantalla */
  var bloques=[];
  varios('section').forEach(function(sec){
    Array.prototype.forEach.call(sec.children,function(el){
      if(el.tagName==='SCRIPT'||el.tagName==='STYLE'||el.hidden)return;
      el.classList.add('revela');bloques.push({el:el,listo:false});
    });
  });

  /* 2. los párrafos de entrada se iluminan palabra por palabra */
  var textos=[];
  varios('.subtitulo, .entradilla').forEach(function(p){
    if(p.children.length||!p.textContent.trim())return;
    var palabras=p.textContent.trim().split(/\s+/);
    p.textContent='';
    var spans=palabras.map(function(w,i){
      var s=document.createElement('span');s.className='pal';s.textContent=w;
      p.appendChild(s);if(i<palabras.length-1)p.appendChild(document.createTextNode(' '));
      return s;
    });
    textos.push({el:p,spans:spans,listo:false});
  });

  /* 3. el video de la portada se aleja y se atenúa al bajar */
  var video=uno('.video-portada'),barra=uno('#progreso-scroll');

  var pendiente=false;
  function actualizar(){
    pendiente=false;
    var y=window.pageYOffset||0,alto=Math.max(1,document.documentElement.scrollHeight-vh);
    if(barra)barra.style.transform='scaleX('+limitar(y/alto,0,1).toFixed(4)+')';

    /* lecturas */
    var rb=bloques.map(function(b){return b.el.getBoundingClientRect().top});
    var rt=textos.map(function(t){return t.el.getBoundingClientRect().top});
    var rv=video?video.getBoundingClientRect().height:0;

    /* escrituras */
    bloques.forEach(function(b,i){
      var t=limitar((vh*0.95-rb[i])/(vh*0.30),0,1);
      if(t>=1){if(!b.listo){b.el.style.opacity='';b.el.style.transform='';b.listo=true}return}
      b.listo=false;
      var e=suave(t);
      b.el.style.opacity=(0.06+0.94*e).toFixed(3);
      b.el.style.transform='translate3d(0,'+((1-e)*42).toFixed(1)+'px,0) scale('+(0.97+0.03*e).toFixed(4)+')';
    });
    textos.forEach(function(x,i){
      var t=limitar((vh*0.9-rt[i])/(vh*0.42),0,1);
      if(t>=1){if(!x.listo){x.spans.forEach(function(s){s.style.opacity=''});x.listo=true}return}
      x.listo=false;
      var encendidas=t*(x.spans.length+4);
      x.spans.forEach(function(s,k){s.style.opacity=(0.2+0.8*limitar(encendidas-k,0,1)).toFixed(3)});
    });
    if(video){
      var s=limitar(y/Math.max(1,rv*0.9),0,1);
      if(s<=0){video.style.transform='';video.style.opacity='';video.style.borderRadius=''}
      else{
        video.style.transform='translate3d(0,'+(s*34).toFixed(1)+'px,0) scale('+(1-0.1*s).toFixed(4)+')';
        video.style.opacity=(1-0.6*s).toFixed(3);
        video.style.borderRadius=(14+22*s).toFixed(1)+'px';
      }
    }
  }
  function pedir(){if(!pendiente){pendiente=true;requestAnimationFrame(actualizar)}}
  window.addEventListener('scroll',pedir,{passive:true});
  window.addEventListener('resize',function(){vh=window.innerHeight||800;pedir()});

  /* 4. el menú marca en qué sección estás, como la barra de producto de las páginas de Apple */
  var enlaces={};
  varios('.menu a[href^="#"]').forEach(function(a){enlaces[a.getAttribute('href').slice(1)]=a});
  var lista=uno('.menu ul');
  if(window.IntersectionObserver){
    var io=new IntersectionObserver(function(entradas){
      entradas.forEach(function(en){
        if(!en.isIntersecting)return;
        var a=enlaces[en.target.id];if(!a)return;
        Object.keys(enlaces).forEach(function(k){enlaces[k].removeAttribute('aria-current')});
        a.setAttribute('aria-current','true');
        if(lista&&lista.scrollTo)lista.scrollTo({left:Math.max(0,a.offsetLeft-lista.clientWidth/2+a.offsetWidth/2),behavior:'smooth'});
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    varios('section[id]').forEach(function(s){if(enlaces[s.id])io.observe(s)});
  }
  actualizar();
})();

/* ---------- cambio de tema claro y oscuro ---------- */
uno('#boton-tema').addEventListener('click',function(){
  var raiz=document.documentElement;
  var actual=raiz.getAttribute('data-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  raiz.setAttribute('data-theme',actual==='dark'?'light':'dark');
});
})();
