const API = 'http://46.21.249.179:9000/api';

/**
 * Список id контрактов
 */
const warehouse_manufacturer = '5e32e07b709f1f791387ccf0';
const manufacturer_transport = '5e32e07b709f1f791387ccf0';
const transport_consumer = '5e32e07b709f1f791387ccf0';
const consumer_warehouse = '5e32e07b709f1f791387ccf0';

/**
 * TODO:
 * 1. Задай список стартовых контрактов (строки 7-9)
 * 2. Отредактируйте текст инструкций в соотвествии с логикой контрактов (строки 65, 80, 97, 111)
 * 3. Задайте условия обновления статуса и данные (метод cycle() строки 20-46)
 * 4. Залейте проект на Github Pages или иной хостинг и расшарьте пользователям
 * 5. Подготовьте аналогичные страницы для дополнительных производственных циклов (заменив ссылки на новые контракты)
 */

let cycle = async () => {
    //получаем все текущие поля, всех контрактов
    let wmFields = await getFields(warehouse_manufacturer),
        mtFields = await getFields(manufacturer_transport),
        tcFields = await getFields(transport_consumer),
        cwFields = await getFields(consumer_warehouse);
    
    //получаем все текущие результаты, всех контрактов
    let wmResult = await getResult(warehouse_manufacturer),
        mtResult = await getResult(manufacturer_transport),
        tcResult = await getResult(transport_consumer),
        cwResult = await getResult(consumer_warehouse);

    //FIXME: работаем с полученными полями

    upd_Status({
        condition_1: true, //FIXME: условия начала действий Склада
        condition_2: true, //FIXME: условия начала действий Производителя
        condition_3: true, //FIXME: условия начала действий Транспортная компания
        condition_4: true, //FIXME: условия начала действий Потребителя
        condition_5: false, //FIXME: Условия завершения цикла
    });
    upd_WarehouseInstr({}); //FIXME: какие поля нужны в инструкции складу?
    upd_ManufacturerInstr({}); //FIXME: какие поля нужны в инструкции производителю?
    upd_TransportInstr({}); //FIXME: какие поля нужны в инструкции транспорту?
    upd_ConsumerInstr({words:['тест1','тест2'], trns:'А1', }) //FIXME: какие поля нужны в инструкции потребителю?
}

let upd_Status = (data) => {
    let text = 'Ожидайте начала...';

    if (data.condition_1)
        text = 'Склад, пора действовать!';
    if (data.condition_2)
        text = 'Производитель, пора действовать!';
    if (data.condition_3)
        text = 'Транспортная компания, пора действовать!';
    if (data.condition_4)
        text = 'Потребитель, пора действовать!';
    if (data.condition_5)
        text = 'Цикл завершен, запросите ссылку на новый цикл!';

    document.getElementById('status').innerHTML = text;
}

//FIXME:
let upd_WarehouseInstr = (data) => {
    document.getElementById('Warehouse').innerHTML = `<p>
    (0) Дождитесь статуса "Склад, пора действовать"<br>
    (1) Получите сырье ${data.stuff} от ${data.author}.<br>
    (2) Оплатите контракт по скупке сырья <a href="http://hrhonor:8888/wallet/${data.skID}" target="_blank">здесь</a>.<br>
    (3) Потврдите продажу букв: ${data.letters} <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.<br>
    (4) Передайте проданные буквы ${data.buyer}.<br>
    </p>
    <p><b>Комментарии от автора контракта:</b><br>
        комментарий 1<br>
        комментарий 2<br>
    </p>`
}

//FIXME:
let upd_ManufacturerInstr = (data) => {
    document.getElementById('Manufacturer').innerHTML = `<p>
    (0) Дождитесь статуса "Производитель, пора действовать"<br>
    (1) Укажите покупаемые буквы: ${data.letters} <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.<br>
    (2) Укажите поставщика букв: ${data.letters} <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.<br>
    (3) Укажите используемую транспортную компанию <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.<br>
    (4) Подтвердите передачу слов транспортной компании <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.<br>
    (5) Дождитесь статуса "Цикл завершен, запросите ссылку на новый цикл!"
    (6) Оплатите смарт-контракт <a href="http://hrhonor:8888/wallet/${data.skID}" target="_blank">здесь</a>.<br>
    </p>
    <p><b>Комментарии от автора контракта:</b><br>
        комментарий 1<br>
        комментарий 2<br>
    </p>` 
}

//FIXME:
let upd_TransportInstr = (data) => {
    document.getElementById('Transport').innerHTML = `<p>
    (0) Дождитесь статуса "Транспортная компания, пора действовать"<br>
    (1) Получите слова: ${data.words} от ${data.man}<br>
    (2) Подтвердите начало доставки <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.<br>
    (3) Подтвердите завершние доставки <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.
    </p>
    <p><b>Комментарии от автора контракта:</b><br>
        комментарий 1<br>
        комментарий 2<br>
    </p>`  
}

//FIXME:
let upd_ConsumerInstr = (data) => {
    document.getElementById('Consumer').innerHTML = `<p>
    (0) Дождитесь статуса "Потребитель, пора действовать"<br>
    (1) Получите слова: ${data.words} от ${data.trns}<br>
    (2) Подтвердите получение слов <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.<br>
    (3) Оплатите полученные слова <a href="http://hrhonor:8888/wallet/${data.skID}" target="_blank">здесь</a>.<br>
    (4) Укажите выбранный склад тут <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.<br>
    (5) Укажите продаваемое сырье тут <a href="http://hrhonor:8888/field/${data.skID}/${data.fieldID}" target="_blank">здесь</a>.
    </p>
    <p><b>Комментарии от автора контракта:</b><br>
        комментарий 1<br>
        комментарий 2<br>
    </p>`  
}

/**
 * Получаем результаты рассчетов контракта
 * 
 * @param {String} contractID - адрес контрактам
 * @returns [{ user, balance }, ...]
 */
let getResult = async (contractID) => {
    return (await $.get(`${API}/sk/results/${contractID}`)).result;
}

/**
 * Получаем поля контракта и их значения
 * если поле не заполнено, то author, vlue и date == null
 * name - название переменной
 * 
 * @param {String} contractID - адрес контрактам
 * @returns [{ name, value, author, type, date, ... }, ...]
 */
let getFields = async (contractID) => {
    return await $.get(`${API}/fields/${contractID}`);
}

//Цикл обновления данных, каждые 6 секунд;
(async ()=> {
    cycle();
    setTimeout(()=>{
        cycle();
    }, 6000)
})();