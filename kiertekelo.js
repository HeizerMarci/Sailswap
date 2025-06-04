window.onload = function(){
    const params = new URLSearchParams(window.location.search);
    const uzenet = document.getElementById("uzenet");
    let type = params.get("type");
    let name = params.get("nev");
    let mail = params.get("email");
    let orszag = params.get("orszag");
    let telefon = params.get("telefon");
    let ertke = params.get("ertke");
    let megjegyzes = params.get("megjegyzes");
    switch(type) {
        case "1":
        uzenet.innerHTML= `<br><h5>Üzenetküldő adatai:</h5>
        <p>Nev: ${name}</p>
        <p>Email: ${mail}</p>
        <p>Telefonszám: ${orszag} ${telefon}</p><br>
        <h5>Üzenet tartalma:</h5>
        <p>Érdeklődés tárgya: További információ kérése</p>
        <p>Érdeklődés típusa: ${ertke}</p>
        <p>Érdeklődési megjegyzés: ${megjegyzes}</p>`

        case "2":
        uzenet.innerHTML= `<br><h5>Üzenetküldő adatai:</h5>
        <p>Nev: ${name}</p>
        <p>Email: ${mail}</p>
        <p>Telefonszám: ${orszag} ${telefon}</p><br>
        <h5>Üzenet tartalma:</h5>
        <p>Érdeklődés tárgya: Próbaút iránti érdeklődés</p>
        <p>Próbaút időpontja: ${ertke}</p>`

        case "3":
        uzenet.innerHTML= `<br><h5>Üzenetküldő adatai:</h5>
        <p>Nev: ${name}</p>
        <p>Email: ${mail}</p>
        <p>Telefonszám: ${orszag} ${telefon}</p><br>
        <h5>Üzenet tartalma:</h5>
        <p>Érdeklődés tárgya: Dokumentáció lekérése</p>
        <p>Kért dokumentum: ${ertke}</p>`
    }
}
