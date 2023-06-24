export const isSusDomain = async (url: string) => {
  const name = new URL(url).hostname;
  const dnsUrl = `https://family.cloudflare-dns.com/dns-query?name=${name}`;
  const response = await fetch(dnsUrl, {
    headers: {
      Accept: 'application/dns-json',
    },
  });
  const json = await response.json();

  if (!json.Answer) {
    return false;
  }

  return json.Answer[0].data === '0.0.0.0';
};
