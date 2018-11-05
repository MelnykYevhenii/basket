var count = 1;
var count2 = document.getElementById("quantity"); // Привязываем к полю инпут

function plus(){
    count2.value = 1 + (parseInt(count2.value) || 0); 
}
function minus(){
    if(count2.value > 1){
        count2.value = (parseInt(count2.value) - 1);
    }
}

//Используем три глобальных масива для хранения данных (имя, кол-во, цена)
names=[];
prodquantity=[];
prodprice=[];

function addItem(){
    //Отправлаем данные в соответствующие масивы
    names.push(document.getElementById('product-name').value) 
    prodquantity.push(parseInt(document.getElementById('quantity').value))
    prodprice.push(parseInt(document.getElementById('price').value))

    createBasket() //После нажатия на кнопку добавления товара вызывается
    //функция которая создает таблицу и заливает туда товар
}

function createBasket(){
    basketData = '<table><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total price</th><th>Total price with tax</th></tr>';

    totalPrice = 0; // Итоговая цена = 0
    totalPriceWithTax = 0;
    tax = 1.2;

    for(i=0; i<names.length; i++){ 
        totalPrice += prodquantity[i] * prodprice[i];// Узнаем полностью цену товара 
        totalPriceWithTax += prodquantity[i] * prodprice[i] * tax; // Узнаем полностью цену товара с налогом 20%
        // Рисуем таблицу
        basketData += '<tr><td>' + names[i] + '</td><td>' + prodquantity[i] + '</td><td>' + prodprice[i] + ' $' + '</td><td>' + prodquantity[i] * prodprice[i] + ' $' +
        '</td><td>' + prodquantity[i] * prodprice[i] * tax + ' $' + '</td><td><button onclick = "deleteElement(' + i + ')">Delete</button></td></tr>' // Кнопка удаления товара
    }

    basketData += '<tr><td></td><td></td><td></td><td>' + totalPrice + ' $' + '</td><td>' + totalPriceWithTax + ' $' + '</td></tr></table>' // Рисуем последнюю пустую строку вконце таблицы где будет отображатся цена за все товары

    document.getElementById('basket').innerHTML = basketData;//Отображает все данные нашей таблицы
}

function deleteElement(a){ // Функция удаления эл-ов из таблицы
    names.splice(a, 1); // Удаляем эл-ты с 0-ым индексом и только 1
    prodquantity.splice(a, 1)
    prodprice.splice(a, 1)
    createBasket();
}