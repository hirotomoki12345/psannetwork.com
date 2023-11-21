// netlify/functions/askBard.js
const { BardAPI } = require('bard-api-node');

exports.handler = async function (event, context) {
  try {
    const assistant = new BardAPI();

    // 認証のためのセッション情報を設定
    assistant.setSession(process.env.BARD_SESSION_NAME, process.env.BARD_SESSION_TOKEN);

    // リクエストボディから質問を取得
    const requestBody = JSON.parse(event.body);
    const question = requestBody.question;

    // Bard にクエリを送信
    const response = await assistant.getBardResponse(question);

    // Bard の応答を返す
    return {
      statusCode: 200,
      body: JSON.stringify({ response: response.content }),
    };
  } catch (error) {
    // エラーを処理
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
