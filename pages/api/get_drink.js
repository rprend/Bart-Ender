export default async function handler(req, res) {
  const url = 'https://shared-api.forefront.link/organization/pkL92ETh6oTT/gpt-j-6b-vanilla/completions/u11x5aiRtaJt';

  const headers = {
    "Authorization": "Bearer " + process.env.FOREFRONT_API_KEY,
    "Content-Type": "application/json"
  };
  
  const body = {
    prompt: "Drink Name:",
    max_tokens: 250,
    top_p: 1,
    top_k: 40,
    temperature: 0.86,
    repetition_penalty:  1,
    stop_sequences: ["\n\n", "<|endoftext|>"]
  };

  var data = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })

  data = await data.json();
  
  res.status(200).json(data);

}
