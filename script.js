import { hajok } from "./hajok_adat.mjs";

window.onload = function(){
    //Megvasalohato hajok száma
    const hajokszama = document.getElementById("hajok_szama");
    hajokszama.innerHTML = `Megvásárolható hajók száma: <b> ${hajok.length} </b>`

    //Hajok átlag ára
    const hajokara = document.getElementById("hajok_ara");
    let osszeg = 0;
    for (let i = 0; i < hajok.length; i++) {
        osszeg += hajok[i]['ar'];
    }
    const atlag = osszeg / hajok.length;
    const atlagFormazva = atlag.toLocaleString("hu-HU"); 
    hajokara.innerHTML = `Átlagos hajó ár: <b> ${atlagFormazva} Ft </b>`;

    //legfrisebb hajok
    let datumok = [];
    for (let i = 0; i < hajok.length; i++) {
        datumok.push(hajok[i]['feltoltesi_ido']);
    }
    const datumIndexParok = datumok.map((datum, index) => ({
        datum,
        index,
        dateObj: new Date(datum)
    }));
    datumIndexParok.sort((a, b) => b.dateObj - a.dateObj);
    const haromLegfrissebb = datumIndexParok.slice(0, 3);

    const legfrissebbDatumok = haromLegfrissebb.map(item => item.datum);
    const eredetiIndexek = haromLegfrissebb.map(item => item.index);

    for (let i = 0; i < legfrissebbDatumok.length; i++) {
        const feltoltesek_row = document.getElementById("feltoltesek_row")
        const ujlegfrissebbfeltoltes = document.createElement('div');
        ujlegfrissebbfeltoltes.setAttribute('class', 'col');
        ujlegfrissebbfeltoltes.innerHTML = `
            <div class="card h-100">
            <img src="${hajok[eredetiIndexek[i]]['kepek']}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${hajok[eredetiIndexek[i]]['nev']}</h5>
            <p class="card-text">${hajok[eredetiIndexek[i]]['rovid_leiras']}</p>
            <button type="button" class="btn btn-dark" onclick="location.href='./adokveszek.html'">Bővebben</button>
            </div>
            <div class="card-footer">
            <small class="text-body-secondary">Feltöltve: ${hajok[eredetiIndexek[i]]['feltoltesi_ido']}</small>
            </div>
            </div>`
        feltoltesek_row.appendChild(ujlegfrissebbfeltoltes)
        
    }
}