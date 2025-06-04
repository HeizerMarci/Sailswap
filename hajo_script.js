import { hajok } from "./hajok_adat.mjs";
var vanehajo = hajok.length;

window.onload = function(){
  vanehajo = hajok.length;
  hajo_generalas(0, 69900000, "")
  const alkalmaz = document.getElementById("alkalmaz");
  alkalmaz.addEventListener("click", szuro_alkalmaz);
  const torol = document.getElementById("torol");
  torol.addEventListener("click", szuro_torlo);
  const validgomb = document.getElementById("valid");
  validgomb.addEventListener("click", validalas)

  // DINAMIKUS ŰRLAP RÉSZ
  const UrlapOptions = ["","További információ kérése","Próbaút iránti érdeklődés","Dokumentáció lekérése"];
  const ModalTartalom = document.getElementById("urlap_body");
  const urlap = document.createElement("select");
  urlap.setAttribute("id", "erdeklodes_tipus")
  urlap.addEventListener("change", DinamikusUrlap)
  ModalTartalom.appendChild(urlap);
  for (let i = 0; i < 4; i++){
    const UrlapOption = document.createElement("option");
    UrlapOption.setAttribute("value", `${UrlapOptions[i]}`);
    UrlapOption.textContent = `${UrlapOptions[i]}`;
    if(i == 0){
      UrlapOption.selected = true;
      UrlapOption.disabled = true;
    }
    urlap.appendChild(UrlapOption);
  }
}

function validalas() {
  const UrlapTipus = document.getElementById("erdeklodes_tipus").value
  let link = ""
  let elem_lista = ["nev_input", "email_input", "orszag_input", "telefon_input"]
  let elem_lista_nev = ["nev","email","orszag", "telefon"]
  let hiba_lista = []
  for (let i = 0; i < elem_lista.length; i++) {
    if(document.getElementById(`${elem_lista[i]}`).value == ""){
      const elem = document.getElementById(`${elem_lista[i]}`);
      elem.style = "border: 1px solid #dc3545;"
      hiba_lista.push(`${elem_lista[i]}`);
    }
    else{
      const elem = document.getElementById(`${elem_lista[i]}`);
      elem.style = "border: 1px solid #ccc;"
    }
  }

  switch(UrlapTipus){
    case "További információ kérése":
      if(hiba_lista.length == 0){
        link = "kiertekelo.html?type=1";
      }
      utolsoelemvalidalas('informaciok_input', "ertke");
      utolsoelemvalidalas('megjegyzes_input', "megjegyzes");
      break;
    case "Próbaút iránti érdeklődés":
      if(hiba_lista.length == 0){
        link = "kiertekelo.html?type=2";
      }
      utolsoelemvalidalas('datum_input', "ertke");
      break;
    case "Dokumentáció lekérése":
      if(hiba_lista.length == 0){
        link = "kiertekelo.html?type=3";
      }
      utolsoelemvalidalas('dokumentum_input', "ertke");
      break;
  }

  function utolsoelemvalidalas(id, neve){
    if(document.getElementById(`${id}`).value == "Érdeklődés témája" || document.getElementById(`${id}`).value == "" || document.getElementById(`${id}`).value =="Melyik dokumentumot szeretné?"){
      const elem = document.getElementById(`${id}`);
      elem.style = "border: 1px solid #dc3545;"
      hiba_lista.push(`${id}`);
    }
    else{
      const elem = document.getElementById(`${id}`);
      elem.style = "border: 1px solid #ccc;"
      link += `&${neve}=${document.getElementById(`${id}`).value}`
    }
  }

  if(hiba_lista.length == 0){
    for (let i = 0; i < elem_lista.length; i++) {
      link += `&${elem_lista_nev[i]}=${document.getElementById(elem_lista[i]).value}`
    }
    window.location.href = link;
  }
}

function DinamikusUrlap() {
  if(document.getElementById("urlap_test")){
    document.getElementById("urlap_test").remove()
  }
  const ModalTartalom = document.getElementById("urlap_body");
  const DinamikusUrlapTest = document.createElement("div");
  DinamikusUrlapTest.setAttribute("id", "urlap_test");
  ModalTartalom.appendChild(DinamikusUrlapTest);
  switch(document.getElementById("erdeklodes_tipus").value){
    case "További információ kérése":
      alapurlap()
      UjSelect("informaciok_input", ["Érdeklődés témája", "Ár", "Állapot", "Felszereltség", "Tárolás", "Vitorlák"], DinamikusUrlapTest);
      sortores(DinamikusUrlapTest);
      Ujtextarea("megjegyzes_input", "Érdeklődés kifejtése: ", DinamikusUrlapTest);
      break;
    case "Próbaút iránti érdeklődés":
      alapurlap()
      const label = document.createElement("label");
      label.setAttribute("for", "datum_input");
      label.textContent = "Kivánt ídőpont: "
      DinamikusUrlapTest.appendChild(label)
      UjInput("date", "datum_input", "", DinamikusUrlapTest);
      break;
    case "Dokumentáció lekérése":
      alapurlap()
      UjSelect("dokumentum_input", ["Melyik dokumentumot szeretné?", "Műszaki leírás", "Használati útmutató", "Kompatibilitási táblázat", "Hajó papír"], DinamikusUrlapTest);
      break;
  }
}

function alapurlap() {
  const DinamikusUrlapTest = document.getElementById("urlap_test");
  UjInput("text", "nev_input", "Név*: ", DinamikusUrlapTest);
  UjInput("email", "email_input", "Email*: ", DinamikusUrlapTest);
  sortores(DinamikusUrlapTest);
  UjSelect("orszag_input", ["",
    "🇭🇺 +36", // Magyarország
    "🇦🇹 +43", // Ausztria
    "🇩🇪 +49", // Németország
    "🇫🇷 +33", // Franciaország
    "🇮🇹 +39", // Olaszország
    "🇪🇸 +34", // Spanyolország
    "🇳🇱 +31", // Hollandia
    "🇵🇱 +48", // Lengyelország
    "🇷🇴 +40", // Románia
    "🇸🇰 +421" // Szlovákia
  ], DinamikusUrlapTest)
  UjInput("number", "telefon_input", "Telefonszám*: ", DinamikusUrlapTest);
  sortores(DinamikusUrlapTest);
}

function UjInput(tipus, id, placeholder, hova){
  const input = document.createElement("input");
  input.type = `${tipus}`;
  input.setAttribute("id", `${id}`)
  input.setAttribute("placeholder", `${placeholder}`)
  hova.appendChild(input);
}

function UjSelect(id, options, hova) {
  const select = document.createElement("select");
  select.setAttribute("id", `${id}`)
  hova.appendChild(select);
  for (let i = 0; i < options.length; i++){
    const option = document.createElement("option");
    option.setAttribute("value", `${options[i]}`);
    option.textContent = `${options[i]}`;
    if(i == 0){
      option.selected = true;
      option.disabled = true;
    }
    select.appendChild(option);
  }
}

function sortores(hova) {
  const szunet = document.createElement("br");
  hova.appendChild(szunet)
}

function Ujtextarea(id, placeholder, hova) {
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", `${id}`);
  textarea.setAttribute("placeholder", `${placeholder}`);
  hova.appendChild(textarea);
}

function hajo_generalas(min, max, tipus) {
  const hajobongeszes = document.getElementById("hajoklista");
  for (let i = 0; i < hajok.length; i++) {
    if(hajok[i]['ar'] >= min && hajok[i]['ar'] <= max && (tipus == hajok[i]['tipus'] || tipus == "")){
      vanehajo =+ 1;
      const atlag = hajok[i]['ar'];
      const atlagFormazva = atlag.toLocaleString("hu-HU");
      const ujhajo = document.createElement("div");
      ujhajo.setAttribute("class", "card mb-3");
      ujhajo.setAttribute("id", `${i}`)
      ujhajo.innerHTML= `
      <img src=${hajok[i]['kepek']} class="card-img-top" alt="...">
      <div class="card-body">
      <h2 class="card-title">${hajok[i]['nev']}</h2>
      <h6 class="card-text">Ár: ${atlagFormazva} Ft</h6>
      <p class="card-text">${hajok[i]['rovid_leiras']}</p>
      <p class="card-text"><i class="bi bi-geo-alt-fill"></i> ${hajok[i]['tarolasi_hely']}</p>
      <ul><li><b>Típus:</b> ${hajok[i]['tipus']}</li>
      <li><b>Gyártási év:</b> ${hajok[i]['gyartasi_ev']}</li>
      <li><b>Szín:</b> ${hajok[i]['szin']}</li>
      <li><b>Szállítható utasok száma:</b> ${hajok[i]['utasok_szama']} fő</li>
      <li><b>Férőhelyek száma:</b> ${hajok[i]['fekvohelyek_szama']} fő</li>
      <li><b>Vitorlák száma:</b> ${hajok[i]['vitorlak_szama']} </li>
      <li><b>Vitorla felület:</b> ${hajok[i]['vitorla_felulet']} m2</li>  
      <li><b>Hossz:</b> ${hajok[i]['hossz_m']} m2</li>
      <li><b>Árboc magasság:</b> ${hajok[i]['arboc_magassag_m']} m</li>
      <li><b>Üzemanyag:</b> ${hajok[i]['uzemanyag']}</li>
      <li><b>Lóerő:</b> ${hajok[i]['motor_le']}</li>
      </ul>
      <div id="szuro_delet">
      <p class="card-text"><small class="text-body-secondary">Feltöltve: ${hajok[i]['feltoltesi_ido']}</small></p>
      <button class="btn btn-custom" data-bs-toggle="modal" data-bs-target="#urlap">Érdeklődés küldése!</button>
      </div>
      </div>`
      hajobongeszes.appendChild(ujhajo);
    }
  }
  if (vanehajo <= 0) {
    const hiba = document.createElement("h5");
    hiba.textContent = "Nincsen az adott szűrőknek megfelelő hajó!"
    hiba.setAttribute("id", "nincshajo")
    hajobongeszes.appendChild(hiba)
  }
}

function szuro_alkalmaz() {
  let min = document.getElementById("szuro_min").value;
  let max = document.getElementById("szuro_max").value;
  let hajo_tipus = document.getElementById("hajo_tipus").value;
  const szuro_lista = document.getElementById("jelenlegi_szurok");

  //szuro display
  let minErtek = min === "" ? 0 : min;
  let maxErtek = max === "" ? 69900000 : max;
  let tipusErtek = hajo_tipus === "" ? "MINDEN" : hajo_tipus;
  
  szuro_lista.textContent = `Minimum ár: ${minErtek} Ft, Maximum ár: ${maxErtek} Ft, Típus: ${tipusErtek}`;

  if (max == "") {
    max = 69900000;
  }

  torles()
  vanehajo = 0;
  hajo_generalas(min, max, hajo_tipus)
}

function szuro_torlo(){
  const szuro_lista = document.getElementById("jelenlegi_szurok");
  szuro_lista.textContent = "";
  torles();
  hajo_generalas(0, 69900000, "");
}

function torles(){
  document.getElementById('hajoklista').remove();
  const hajobongeszes = document.getElementById("hajo_bongeszo");
  const hajoklista = document.createElement('div')
  hajoklista.setAttribute('id', 'hajoklista');
  hajobongeszes.appendChild(hajoklista);
}
