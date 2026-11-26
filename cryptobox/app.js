/* CryptoBox : interface (lit les champs, appelle crypto.js, affiche le résultat). */
/* Interface */
const $ = id => document.getElementById(id);
let tab = "caesar";
const ops = {
  caesar:{e:(s)=>caesar(s, kval()), d:(s)=>caesarDec(s, kval())},
  subst:{e:(s)=>subst(s, clean($("sk").value)), d:(s)=>substDec(s, clean($("sk").value))},
  trans:{e:(s)=>trans(s, clean($("tk").value)), d:(s)=>transDec(s, clean($("tk").value))}
};
function kval(){
  const k = parseInt($("k").value, 10);
  if (Number.isNaN(k)) throw new Error("La clé k doit être un nombre entier.");
  return mod(k, 26);
}
function show(text, isErr){
  const r = $("res");
  r.textContent = text; r.className = "res" + (isErr ? " err" : "");
  $("copy").hidden = !!isErr || !text || text === "—";
}
function run(kind){
  $("bt").hidden = true;
  try {
    const s = clean($("msg").value);
    if (!s) throw new Error("Saisissez un message contenant au moins une lettre.");
    show(ops[tab][kind](s));
  } catch(e){ show(e.message, true); }
}
document.querySelectorAll(".tabs button").forEach(b => b.addEventListener("click", () => {
  tab = b.dataset.t;
  document.querySelectorAll(".tabs button").forEach(x => x.setAttribute("aria-selected", x === b));
  $("p-caesar").hidden = tab !== "caesar"; $("p-subst").hidden = tab !== "subst"; $("p-trans").hidden = tab !== "trans";
  $("brute").hidden = tab !== "caesar"; $("bt").hidden = true; show("—");
}));
$("enc").onclick = () => run("e");
$("dec").onclick = () => run("d");
$("brute").onclick = () => {
  const s = clean($("msg").value);
  if (!s){ show("Saisissez un message à analyser.", true); return; }
  show("25 clés testées : repérez la ligne lisible.");
  $("btb").innerHTML = bruteForce(s).map(o => "<tr><td>k = " + o.k + "</td><td>" + o.t + "</td></tr>").join("");
  $("bt").hidden = false;
};
$("copy").onclick = () => { try { navigator.clipboard.writeText($("res").textContent); $("copy").textContent = "Copié"; setTimeout(()=>$("copy").textContent="Copier",1200); } catch(e){} };

/* Tests de l'énoncé */
const tests = [
  ["César k = 3 : BONJOUR", caesar("BONJOUR",3), "ERQMRXU"],
  ["Substitution : ATTAQUE", subst("ATTAQUE","QWERTYUIOPASDFGHJKLZXCVBNM"), "QZZQJXT"],
  ["Transposition PORTE : RENDEZVOUSAMIDI", trans("RENDEZVOUSAMIDI","PORTE"), "ESIEVMRZANOIDUD"],
  ["Aller-retour César", caesarDec(caesar("TESTXYZ",17),17), "TESTXYZ"],
  ["Aller-retour substitution", substDec(subst("ATTAQUE","QWERTYUIOPASDFGHJKLZXCVBNM"),"QWERTYUIOPASDFGHJKLZXCVBNM"), "ATTAQUE"],
  ["Aller-retour transposition", transDec(trans("RENDEZVOUSAMIDI","PORTE"),"PORTE"), "RENDEZVOUSAMIDI"]
];
$("tl").innerHTML = "";
tests.forEach(t => { const ok = t[1] === t[2]; $("tl").insertAdjacentHTML("beforeend", "<div><span>" + t[0] + "</span><span class='" + (ok ? "pass" : "fail") + "'>" + (ok ? "OK" : "ÉCHEC : " + t[1]) + "</span></div>"); });
