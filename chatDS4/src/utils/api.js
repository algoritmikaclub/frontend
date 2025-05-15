const API_KEY = "sk-39786a37a83546f18a811f44a96cf7c2"
const API_URL = "https://api.deepseek.com/v1/chat/completions"

export function askDeepSeek(messages) {

    const apiQuarry = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: messages.map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text
            }))
        }),
    }

    return fetch(API_URL, apiQuarry)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`)
            }
            return response.json()
        })
        .then((data) => data.choices[0].message.content)
        .catch((error) => {
            console.error("Ошибка запроса:", error)
            return "Не удалось получить ответ от DeepSeek."
        })
}