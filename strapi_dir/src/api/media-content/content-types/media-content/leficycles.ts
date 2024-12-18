export default {
    async afterCreate(event) {
        const { result } = event;

        const payload = {
            hash: result.hash || "default_hash",
            metadata: result.metadata || "default_metadata",
        };

        console.log("Отправка вебхука с данными:", payload);

        try {
            const response = await fetch("http://localhost:3000/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const responseText = await response.text();
            console.log("Ответ сервера вебхука:", response.status, responseText);

            console.log("Вебхук успешно отправлен");
        } catch (error) {
            console.error("Ошибка при отправке вебхука:", error);
        }
    },
};
