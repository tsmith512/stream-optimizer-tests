export async function onRequest(context) {
  const { request, env } = context;

  const url = new URL(request.url);

  return new Response(JSON.stringify(url), {
    headers: {'Content-Type': 'application/json'}
  })
}
