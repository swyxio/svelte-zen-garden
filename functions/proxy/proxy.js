const fetch = require('node-fetch');
exports.handler = async function(event, context) {
  let path = event.queryStringParameters.path || null;
  const segments = path.split('/');
  if (segments[2] === 'gist.github.com') {
    path = `https://api.github.com/gists/${segments[4]}`;
    console.log({ path });
  }
  if (!path)
    return {
      statusCode: 400,
      body: 'you must specify a path parameter'
    };
  try {
    const server = await fetch(path).then(async (res) => {
      console.log({ res });
      const data = await res.json();
      console.log({ data });
      return data;
    });
    return {
      statusCode: 200,
      body: JSON.stringify(server)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
