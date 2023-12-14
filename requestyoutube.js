// Google Apps ScriptのURL
var scriptUrl = 'https://script.google.com/macros/s/AKfycbyDO4z3Msz0NRuJb8lolw8X71fCdcuhUH0O9dihMvYdlZyU0IRILNwAdOSKJS7a0Ca-/exec';

// 検索クエリと取得する動画数を指定
var query = 'your_search_query';
var maxResults = 5;

// Google Apps ScriptのdoGet関数にリクエストを送信 (GETリクエスト)
var url = scriptUrl + '?q=' + encodeURIComponent(query) + '&a=' + encodeURIComponent(maxResults);
fetch(url, {
  method: 'GET'
})
  .then(response => response.json()) // JSON形式で返ってくることを想定
  .then(data => {
    // HTMLを構築して表示する
    var html = '<ul>';
    data.videos.forEach(video => {
      html += '<li>';
      html += '<h3>' + video.title + '</h3>';
      // YouTubeの埋め込みコードがあれば追加
      if (video.iframe) {
        html += video.iframe;
      }
      html += '</li>';
    });
    html += '</ul>';

    // HTMLをドキュメントに追加
    document.body.innerHTML = html;
  })
  .catch(error => console.error('Error:', error));
