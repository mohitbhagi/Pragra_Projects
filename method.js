const { json } = require('express');
const f1 = require('fs');
const getCustomerData = function (){
    const data_buffer = f1.readFileSync("customers.json");
    const data_str = data_buffer.toString();
    const cust_data = JSON.parse(data_str);
    return cust_data;
}

// const addCustomerData = function(name, age, code) {
//     const oldCustomerDetails = getCustomerData();
//     oldCustomerDetails.name = name;
//     oldCustomerDetails.age = age;
//     oldCustomerDetails.code = code;
//     const stJSON = JSON.stringify(oldCustomerDetails);

//     if(oldCustomerDetails.code != stJSON.code) { 
//         f1.writeFileSync("customers.json", stJSON);
//         console.log("Date added successfully");
//     } else {
//         console.log("Duplicate record found");
//     }
// }

const addCustomerData = function (name, age, code) {
    let customers = getCustomerData();

    const duplicateCustomer = customers.find(customer => customer.code === code);

    if (!duplicateCustomer) { 
        customers.push({ name, age, code });
        const stJSON = JSON.stringify(customers, null, 2);
        f1.writeFileSync("customers.json", stJSON);
        console.log("Data added successfully");
    } else {
        console.log("Duplicate record found...");
    }
}

const removeCustomerData = function (code) {
    let customers = getCustomerData();

    const updatedCustomers = customers.filter(customer => customer.code !== code);

    if (customers.length !== updatedCustomers.length) { 
        const stJSON = JSON.stringify(updatedCustomers, null, 2);
        f1.writeFileSync("customers.json", stJSON);
        console.log("Data removed successfully");
    } else {
        console.log("No matching record found");
    }
}


module.exports = { getCustomerData, addCustomerData, removeCustomerData };