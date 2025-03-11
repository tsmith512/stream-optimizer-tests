export async function onRequest(context) {
  const { request, env } = context;

  return new Response(JSON.stringify(request), {
    headers: {'Content-Type': 'application/json'}
  })
}
