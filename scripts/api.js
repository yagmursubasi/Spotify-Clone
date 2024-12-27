//APİ URL
const url = "https://shazam.p.rapidapi.com/search?term=adele&locale=en";

//Gönderilmesi gereken headerlar
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "7b18520e29msh48b76cf15ed13b8p1a3854jsn747aebabad8c",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

//fonksiyonların bir arada tutulması için class yapısını tercih edelim
export default class API {
  //popüler müzikleri getirecek
  async getPopular() {
    const data1 = await this.searchMusic("adele");
    const data2 = await this.searchMusic("rihanna");
    //const data3 = await this.searchMusic("sia");
    return [...data1, ...data2];
  }

  // aranılan kelimeye uygun sonuçları getirecek
  async searchMusic(query) {
    //term parametresini dinamik olarak belirledik
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=en`;
    //api isteği at - gelen cevabı işle
    const res = await fetch(url, options);
    const data = await res.json();
    //veriyi formatladık
    const formatted = data.tracks.hits.map((item) => item.track);
    //fonsiyonun çağırıldığı yere veriyi döndürdük
    return formatted;
  }
}
