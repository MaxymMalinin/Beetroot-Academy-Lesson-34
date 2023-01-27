'use strict';

/*
  Створи масив «Список покупок». Кожен елемент масиву є об'єктом, який містить назву продукту, кількість і куплений він чи ні, ціну за одиницю товару, сума. Написати кілька функцій для роботи з таким масивом:
  
    1. Виводити весь список на екран таким чином, щоб спочатку йшли продукти, що ще не придбані, а потім - ті, що вже придбали.
    2. Покупка продукту. Функція приймає назву продукту і відзначає його як придбаний.
*/

let shoppingList = [
  { name: 'хліб', amount: 1, alreadyBought: false, price: 22, totalPrice: 22 },
  { name: 'молоко', amount: 2, alreadyBought: true, price: 35, totalPrice: 70 },
  {
    name: 'шоколад',
    amount: 5,
    alreadyBought: true,
    price: 30,
    totalPrice: 150,
  },
  {
    name: 'шоколад',
    amount: 1,
    alreadyBought: false,
    price: 35,
    totalPrice: 35,
  },
];

const showShoppingList = () => {
  console.log(
    shoppingList.sort((a, b) => {
      if (a.alreadyBought < b.alreadyBought) return -1;
      if (a.alreadyBought > b.alreadyBought) return 1;
      return 0;
    })
  );
};

// showShoppingList();

// const buy = (name) => {
//   shoppingList.forEach((element) => {
//     if (element.name === name) element.alreadyBought = true;
//   });
// };

const buy = (name) => {
  const initialValue = [];

  const filteredShoppingList = shoppingList.reduce(
    (accumulator, currentItem) => {
      if (currentItem.name === name) {
        let updatedItem = { ...currentItem, alreadyBought: true };
        return [...accumulator, updatedItem];
      }

      return [...accumulator, currentItem];
    },
    initialValue
  );

  shoppingList = filteredShoppingList;
};

// buy('хліб');
// buy('сало');
// console.log(shoppingList);

/*
  1. Видалення продукту зі списку (видалення повинно проводитися шляхом створення нового масиву, в якому продукт, що ми шукаємо, буде відсутнім)
  
  2.Додавання покупки в список. Враховуй, що при додаванні покупки з уже існуючим в списку продуктом, необхідно збільшувати кількість в існуючій покупці, а не додавати нову. При цьому також повинна змінитися сума, наприклад, якщо ціна за одиницю 12, а кількості товарів стало 2, то сума буде 24.
*/

const deleteShoppingItem = (name) => {
  const filterByName = (element) => {
    return element.name.toUpperCase() !== name.toUpperCase();
  };

  console.log(shoppingList.filter(filterByName));
};

// deleteShoppingItem('ХлІб');

const addShoppingItem = (newItem) => {
  let itemFound = false;

  shoppingList.forEach((element) => {
    if (element.name === newItem.name && element.price === newItem.price) {
      element.amount += newItem.amount;
      element.totalPrice += newItem.price * newItem.amount;
      itemFound = true;
    }
  });

  if (!itemFound) {
    newItem.alreadyBought = false;
    newItem.totalPrice = newItem.price * newItem.amount;
    shoppingList.push(newItem);
  }

  console.log(shoppingList);
};

// addShoppingItem({
//   name: 'шоколад',
//   amount: 1,
//   price: 30,
// });
// addShoppingItem({
//   name: 'горіхи',
//   amount: 2,
//   price: 50,
// });

/*
  1. Підрахунок суми всіх продуктів (враховуючи кількість кожного) в списку.
  2. Підрахунок суми всіх (не) придбаних продуктів.
  3. Показання продуктів в залежності від суми, (від більшого до меншого / від  меншого до більшого, в залежності від параметра функції, який вона приймає)
*/

const getShoppingTotalPrice = () => {
  let sum = 0;

  shoppingList.forEach((element) => {
    sum += element.totalPrice;
  });

  return sum;
};

// console.log(getShoppingTotalPrice());

const getShoppingNotBoughtPrice = () => {
  let sum = 0;

  shoppingList.forEach((element) => {
    if (element.alreadyBought === false) sum += element.totalPrice;
  });

  return sum;
};

// console.log(getShoppingNotBoughtPrice());

const showShoppingListSortedByPrice = (ascending = true) => {
  console.log(
    shoppingList.sort((a, b) => {
      if (a.price < b.price) return ascending ? -1 : 1;
      if (a.price > b.price) return ascending ? 1 : -1;
      return 0;
    })
  );
};

showShoppingListSortedByPrice(0);
