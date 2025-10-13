import axios from 'axios'

export async function fetchWithRetry(url: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      return response.data;
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`Retrying (${attempt}/${retries}) for ${url}`);
      await new Promise(res => setTimeout(res, attempt * 1000));
    }
  }
  throw new Error(`Failed to fetch ${url}`);
}