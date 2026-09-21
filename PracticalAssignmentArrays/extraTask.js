// Створюємо початковий рюкзак на 10 порожніх слотів
let inventory = Array(10).fill("Empty");

// Функція для додавання предмета в першу вільну комірку
function addItem(backpack, item) {
    let emptyIndex = backpack.indexOf("Empty");
    
    if (emptyIndex !== -1) {
        backpack[emptyIndex] = item;
        console.log(`+ Додано: ${item}`);
    } else {
        console.log(`- Немає місця для: ${item}`);
    }
}

// Функція для видалення предмета
function removeItem(backpack, item) {
    let itemIndex = backpack.indexOf(item);
    
    if (itemIndex !== -1) {
        backpack[itemIndex] = "Empty";
        console.log(`- Викинуто: ${item}`);
    } else {
        console.log(`? Предмет ${item} не знайдено в рюкзаку.`);
    }
}

// Функція для ущільнення рюкзака (предмети на початок, пустоти в кінець)
function compactInventory(backpack) {
    let itemsOnly = backpack.filter(slot => slot !== "Empty");
    
    for (let i = 0; i < backpack.length; i++) {
        if (i < itemsOnly.length) {
            backpack[i] = itemsOnly[i];
        } else {
            backpack[i] = "Empty";
        }
    }
    console.log("~ Інвентар ущільнено");
}

// Приклади для перевірки (вивід у консоль)

console.log("Початковий стан:", inventory);

// Додаємо трохи луту
addItem(inventory, "Меч");
addItem(inventory, "Зілля здоров'я");
addItem(inventory, "Щит");
addItem(inventory, "Золоте яблуко");

console.log("Після додавання:", inventory);

// Видаляємо один предмет десь посередині
removeItem(inventory, "Зілля здоров'я");
console.log("Після видалення зілля:", inventory);

// Пробуємо видалити те, чого нема
removeItem(inventory, "Ключ від скрині");

// Додаємо ще щось, щоб побачити куди воно стане (має стати на місце зілля)
addItem(inventory, "Магічний сувій");
console.log("Після додавання сувою:", inventory);

// Робимо ще одну "дірку" в інвентарі
removeItem(inventory, "Меч");
console.log("Перед ущільненням:", inventory);

// Ущільнюємо
compactInventory(inventory);
console.log("Фінальний стан:", inventory);