export default async function handler(req, res) {
      if (req.method !== 'POST') {
          res.status(405).json({ error: 'Method not allowed' });
              return;
                }
                  const { topic, language, level, kind, count, withAnswers } = req.body;
                    if (!topic) {
                        res.status(400).json({ error: 'topic required' });
                            return;
                              }
                                const sys = `You are an educational task generator. Return STRICT JSON only...`;
                                  const user = `Generate ${count} ${kind} tasks about: ${topic}. Language: ${language}. Level: ${level}.`;
                                    const resp = await fetch(process.env.OPENAI_API_BASE + '/chat/completions', {
                                        method: 'POST',
                                            headers: {
                                                  'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
                                                        'Content-Type': 'application/json'
                                                            },
                                                                body: JSON.stringify({
                                                                      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
                                                                            temperature: 0.2,
                                                                                  max_tokens: 1200,
                                                                                        messages: [
                                                                                                { role: 'system', content: sys },
                                                                                                        { role: 'user', content: user }
                                                                                                              ]
                                                                                                                  })
                                                                                                                    });
                                                                                                                      const data = await resp.json();
                                                                                                                        // обработка ответа
                                                                                                                          // ...
                                                                                                                            res.status(200).json(/* сформированный JSON */);
                                                                                                                            }
