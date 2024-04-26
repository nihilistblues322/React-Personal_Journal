// Пример начального массива пользователей
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

// Пример объекта нового пользователя
const newUser = {
    id: null, // Пока неизвестен
    name: "David"
};

const addUser = (user) => {
    // Находим максимальный id среди существующих пользователей
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    // Создаем нового пользователя с уникальным id и добавляем его в массив пользователей
    users.push({ ...user, id: maxId + 1 });
};

// Добавляем нового пользователя
addUser(newUser);

// Выводим массив пользователей после добавления нового пользователя
console.log(users);
