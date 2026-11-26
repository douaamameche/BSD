/* CryptoBox : brique 1. Logique de chiffrement, sans bibliothèque. */
const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const clean = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z]/g,"");
const mod = (n,m) => ((n % m) + m) % m;

/* César : C = (M + k) mod 26 */
function caesar(s, k){
  let o = "";
  for (const c of s) o += A[mod(A.indexOf(c) + k, 26)];
  return o;
}
const caesarDec = (s,k) => caesar(s, -k);
const bruteForce = s => Array.from({length:25}, (_,i) => ({k:i+1, t:caesarDec(s, i+1)}));

/* Substitution : A -> clé[0], B -> clé[1], ... */
function checkKey(key){
  if (key.length !== 26 || new Set(key).size !== 26) throw new Error("La clé doit contenir 26 lettres, toutes différentes (" + key.length + " lettres, " + new Set(key).size + " distinctes).");
}
function subst(s, key){ checkKey(key); return [...s].map(c => key[A.indexOf(c)]).join(""); }
function substDec(s, key){ checkKey(key); return [...s].map(c => A[key.indexOf(c)]).join(""); }

/* Transposition par colonnes */
function colOrder(key){
  if (!key) throw new Error("Le mot-clé est vide.");
  return [...key].map((c,i) => ({c,i})).sort((a,b) => a.c.localeCompare(b.c) || a.i - b.i).map(o => o.i);
}
function trans(s, key){
  const n = key.length, order = colOrder(key);
  while (s.length % n) s += "X";
  const rows = s.length / n;
  let o = "";
  for (const col of order) for (let r = 0; r < rows; r++) o += s[r*n + col];
  return o;
}
function transDec(s, key){
  const n = key.length, order = colOrder(key);
  if (s.length % n) throw new Error("Pour déchiffrer, la longueur du texte (" + s.length + ") doit être un multiple de la longueur du mot-clé (" + n + ").");
  const rows = s.length / n, grid = Array(s.length);
  order.forEach((col, j) => { for (let r = 0; r < rows; r++) grid[r*n + col] = s[j*rows + r]; });
  return grid.join("");
}
