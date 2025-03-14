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
  const dest = `https://scratchwork2.tsmith.net/cdn-cgi/media/width=${width}/${storage}/${file.join('/')}`;

  // An example request to https://scratchwork.tsmith.net/videos/journal.mp4?width=300
  // journal.mp4 , coffee.mp4 , and aus-mobile.mp4 would all work
  // generates the URL https://scratchwork.tsmith.net/cdn-cgi/media/width=300/https://pub-9cf4bfca6e924401bd4ac87ca9174da6.r2.dev/journal.mp4
  // Which I can hit directly
  // But this doesn't work:
  return fetch(dest);
}
