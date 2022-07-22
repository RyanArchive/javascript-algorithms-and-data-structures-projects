/*
    Cash Register

    Design a cash register drawer function checkCashRegister() that 
    accepts purchase price as the first argument (price), payment as the 
    second argument (cash), and cash-in-drawer (cid) as the third 
    argument.

    cid is a 2D array listing available currency.

    The checkCashRegister() function should always return an object with 
    a status key and a change key.

    Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer 
    is less than the change due, or if you cannot return the exact change.

    Return {status: "CLOSED", change: [...]} with cash-in-drawer as the 
    value for the key change if it is equal to the change due.

    Otherwise, return {status: "OPEN", change: [...]}, with the change 
    due in coins and bills, sorted in highest to lowest order, as the 
    value of the change key.
*/

function checkCashRegister(price, cash, cid) {
    const unit = {
        "ONE HUNDRED": 100,
        "TWENTY": 20,
        "TEN": 10,
        "FIVE": 5,
        "ONE": 1,
        "QUARTER": 0.25,
        "DIME": 0.1,
        "NICKEL": 0.05,
        "PENNY": 0.01
    }
    const cidObj = Object.assign(...cid.map(([k, v]) => ({ [k]: v })));
    let changeVal = cash - price;
    const changeArr = [];
    
    for (let key in unit) {
        let amountTemp = 0;

        while (unit[key] <= changeVal && cidObj[key] > 0) {
            changeVal = Math.round((changeVal - unit[key]) * 100) / 100;
            cidObj[key] = Math.round((cidObj[key] - unit[key]) * 100) / 100;
            amountTemp = Math.round((amountTemp + unit[key]) * 100) / 100;
        }

        amountTemp > 0 
            ? changeArr.push([key, amountTemp]) 
            : changeArr.push([key, 0]);
    }

    if (changeVal > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    for (let key in cidObj) {
        if (cidObj[key] > 0) {
            return { status: "OPEN", change: changeArr.filter(c => c[1] > 0) };
        }
    }

    return { status: "CLOSED", change: changeArr.reverse() };
}

checkCashRegister(
    19.5, 
    20, 
    [
        ["PENNY", 1.01], 
        ["NICKEL", 2.05], 
        ["DIME", 3.1], 
        ["QUARTER", 4.25], 
        ["ONE", 90], 
        ["FIVE", 55], 
        ["TEN", 20], 
        ["TWENTY", 60], 
        ["ONE HUNDRED", 100]
    ]
);