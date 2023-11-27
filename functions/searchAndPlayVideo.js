// netlify/functions/searchAndPlayVideo.js

const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  // YouTube Data APIのAPIキー
  const apiKey = 'YOUR_YOUTUBE_API_KEY';

  // フロントエンドからの検索クエリを取得
  const query = event.queryStringParameters.query;

  // YouTubeの検索および動画再生
  const result = await searchAndPlayVideo(query, apiKey);

  // レスポンスを返す
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

// YouTubeの検索および動画再生
async function searchAndPlayVideo(query, apiKey) {
  // YouTube Data APIのエンドポイント
  const apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  // YouTubeの検索リクエストを構築
  const params = {
    part: 'snippet',
    type: 'video',
    q: query,
    maxResults: 1,
    key: apiKey,
  };

  // YouTubeの検索リクエストを送信
  const response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`);
  const result = await response.json();

  // 検索結果があるか確認
  if (result.items && result.items.length > 0) {
    // 最初の動画のIDを取得
    const videoId = result.items[0].id.videoId;

    // 動画の再生URL
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // 動画のタイトルも取得
    const videoTitle = result.items[0].snippet.title;

    // 結果をオブジェクトとして返す
    return {
      videoUrl: videoUrl,
      videoTitle: videoTitle,
    };
  } else {
    return { error: 'No videos found.' };
  }
}
