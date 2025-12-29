const form = document.getElementById("formHitung");
const inputTeks = document.getElementById("inputTeks");
const inputHuruf = document.getElementById("inputHuruf");

const resultBox = document.getElementById("resultBox");

const hurufDicari = document.getElementById("hurufDicari");
const hasilJumlah = document.getElementById("hasilJumlah");

const waktuIteratif = document.getElementById("waktuIteratif");
const waktuRekursif = document.getElementById("waktuRekursif");

// ===============================
// ITERATIF
// ===============================
function hitungIteratif(teks, cari) {
  let jumlah = 0;
  for (let i = 0; i < teks.length; i++) {
    if (teks[i] === cari) jumlah++;
  }
  return jumlah;
}

// ===============================
// REKURSIF
// ===============================
function hitungRekursif(teks, cari, i = 0) {
  if (i === teks.length) return 0;
  if (teks[i] === cari) {
    return 1 + hitungRekursif(teks, cari, i + 1);
  }
  return hitungRekursif(teks, cari, i + 1);
}

// ===============================
// SUBMIT FORM
// ===============================
form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  let teks = inputTeks.value;
  let cari = inputHuruf.value;
  
  if (!teks || !cari) {
    alert("Teks dan huruf tidak boleh kosong");
    location.reload();
    return;
  }
  if (cari.length > 1) {
    alert("pencarian hanya bisa 1 huruf saja");
    location.reload();
    return;
  }
  
  resultBox.classList.remove("hidden");
  teks = teks.toLowerCase();
  cari = cari.toLowerCase();

  // ===============================
  // ITERATIF (AMAN)
  // ===============================
  const t0 = performance.now();
  const hasil = hitungIteratif(teks, cari);
  const t1 = performance.now();

  hasilJumlah.textContent = hasil;
  hurufDicari.textContent = cari;
  waktuIteratif.textContent = (t1 - t0).toFixed(4) + " ms";
  waktuIteratif.classList.add("text-black/50");

  // ===============================
  // REKURSIF (RAWAN ERROR)
  // ===============================
  try {
    const t2 = performance.now();
    hitungRekursif(teks, cari);
    const t3 = performance.now();

    waktuRekursif.textContent = (t3 - t2).toFixed(4) + " ms";
    waktuRekursif.classList.add("text-black/50");
  } catch (err) {
    waktuRekursif.textContent = "Out of memory";
    waktuRekursif.style.color = "red";
  }
});