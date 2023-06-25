export const isSusDomain = async (url: string) => {
  const name = new URL(url).hostname;

  if (susDomains.includes(name)) {
    return true;
  }

  try {
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
  } catch (e) {
    console.error(e);
    return true;
  }
};

export const susDomains = [
  // Add custom sus domains here
  'somtam.vercel.app',
  'cutehamster.vercel.app',
  'hifumin.app',
];
