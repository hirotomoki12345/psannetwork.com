var scriptUrl = 'https://script.google.com/macros/s/AKfycbyDO4z3Msz0NRuJb8lolw8X71fCdcuhUH0O9dihMvYdlZyU0IRILNwAdOSKJS7a0Ca-/exec';

var query;
do {
  query = prompt("ここに検索したいYouTubeのキーワードを入れてください。");
  if (query.trim() === "") {
    alert("検索キーワードが空白です。再入力してください。");
  }
} while (query.trim() === "");

var maxResults;
do {
  maxResults = prompt("表示したい動画の数を入力してください（最大30）");
  if (maxResults >= 20) {
    alert("注意: 動画の数が20以上になると、取得に時間がかかる可能性があります。");
  }
} while (!/^\d+$/.test(maxResults) || maxResults < 1 || maxResults > 30);

var url = scriptUrl + '?q=' + encodeURIComponent(query) + '&a=' + encodeURIComponent(maxResults);
fetch(url, {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => {
    var html = '<ul>';
    data.videos.forEach(video => {
      html += '<li>';
      html += '<h3>' + video.title + '</h3>';
      if (video.iframe) {
        html += video.iframe;
      }
      html += '</li>';
    });
    html += '</ul>';

    document.body.innerHTML = html;
  })
  .catch(error => console.error('Error:', error));
