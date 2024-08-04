const getMethod = require("./method.js")
const yargs = require('yargs')

yargs.command({
command: "get",
handler: function(){
console.log("It is calling method")
const cust_details = getMethod.getCustomerData();
console.log(cust_details);
}
})

yargs.command({
    command: "add",
    builder: {
        name: {
            demandOption: true,
            type: "string",
        },
        age: {
            demandOption: true,
            type: "number",
        },
        code: {
            demandOption: true,
            type: "string",
        }
    },
    handler: function(argv) {
        getMethod.addCustomerData(argv.name, argv.age, argv.code);
    },
});

yargs.command({
    command: "remove",
    builder: {
        code: {
            demandOption: true,
            type: "string",
        }
    },
    handler: function(argv) {
        getMethod.removeCustomerData(argv.code);
    },
});

yargs.parse();