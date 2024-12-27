import API from "./api.js";
import UI from "./ui.js";

//classın örneğini alacağız (methodları kullanabilmek için)
const api = new API();
const ui = new UI();

//console.log(api);
// sayfa yüklendiği anda apiden popüler müzikleri al ve renderla
document.addEventListener("DOMContentLoaded", async () => {
  api
    //1)then-catch yöntemi
    .getPopular()
    .then((data) =>
      //gelen data içerisindeki her bir nesne için ekrana kartları bas
      ui.renderCards(data)
    )
    .catch((err) => {
      console.log(err);
      alert("üzgünüz bir hata oluştu");
    });
});

//formdan bir şey aratıldığında api`den aratılan kelimeye uygun sonuçları al ve renderla
ui.form.addEventListener("submit", (e) => {
  //sayfayı yenilemeyi engelle
  e.preventDefault();
  //aratılan kelimeye eriş
  const query = e.target[0].value;
  //aratılan kelime boşsa fonksiyonu durdur
  if (query.trim() === "") return alert("Lütfen geçerli bir metin giriniz");

  //ekrana loader bas
  ui.renderLoader();
  //başlığı güncelle
  ui.updateTitle(`Result for ${query} `);
  //api`den verileri al
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
      alert("üzgünüm bir sorun oluştu");
    });
});

//list alanındaki tıklanma olayını izle ve
ui.list.addEventListener("click", (e) => {
  //eğer oymat butonuna tıklanırsa o şarkıyı oynayatacağız
  if (e.target.className === "play") {
    // oynatılacak şarkının kartına eriş
    const card = e.target.closest(".card");
    //oynatılacak şarkının bilgilerini al
    const data = card.dataset;
    //player alanını tekrar renderla
    ui.renderPlayer(data);
  }
});

//şarkının başlama ve durma olaylarını izle
//ui.audio.addEventListener("play", () => console.log("selam"));
