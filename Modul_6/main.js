let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
]



function filter (object, key, value) {
    let filterObject = [];
    
    for (let element of object) {
        let elementKeys = Object.keys(element);
        let elementValues = Object.values(element);
        if (elementKeys.includes(key) && elementValues.includes(value)) {
            filterObject.push(element);
        }
    }
    return filterObject;
}
console.log(filter(objects, 'name', 'Иван'))
console.log(Array.isArray(filterObject));
