

async function httpRequestBuilder({
  url,
  method = 'POST',
  headers = { 'Content-Type': 'application/json' },
  body,
}) {
  const res = await fetch(url, {
    method,
    headers,
    body: body && JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());

  return res;
}

export default httpRequestBuilder;