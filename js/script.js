{
    const tasks = [
        {
            content: "test",
            done: false,
        },
        {
            content: "test2",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
            ${task.done ? "style=\"text-decoration: line-through\"" : ""}
            >
            ${task.content}
            </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const onFormSubmit = ("submit", (event) => {
        event.preventDefault();

        newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
        render();
    });

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    }

    init();

}