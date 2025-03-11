export async function onRequest(context) {
  const { request, env } = context;

  const url = new URL(request.url);

  // Where my originals live
  const storage = 'https://pub-9cf4bfca6e924401bd4ac87ca9174da6.r2.dev';

  // Remove the first slash and the "videos" prefix
  const file = url.pathname.substring(1).split('/');
  file.shift();

  // Get width from query param or use default
  const width = url.searchParams.get('width') ?? 400;

  // Reconstruct Media Transformations URL
  const dest = `${url.origin}/cdn-cgi/media/width=${width}/${storage}/${file.join('/')}`;
  console.log(dest)

  // An example request to https://scratchwork.tsmith.net/videos/journal.mp4?width=300
  // journal.mp4 , coffee.mp4 , and aus-mobile.mp4 would all work
  // generates the URL https://scratchwork.tsmith.net/cdn-cgi/media/width=300/https://pub-9cf4bfca6e924401bd4ac87ca9174da6.r2.dev/journal.mp4
  // Which I can hit directly
  // But this doesn't work:
  return fetch(`https://scratchwork.tsmith.net/trace`, {
    "headers": {
      "Cf-Trace-Id": "001310100320cc34:1310100320cc34:0:3:1741728117:5f77df12b0ae2d8c5686988b947bdf41bf7969505e4c534dae37fe1124c7b3ae",
    }
  });
}
