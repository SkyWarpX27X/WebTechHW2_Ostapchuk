var products = [
    {name: 'Помідори', amount: 2, bought: true},
    {name: 'Печиво', amount: 2, bought: false},
    {name: 'Сир', amount: 1, bought: false},
];

document.addEventListener('DOMContentLoaded', () => {
    if(JSON.parse(localStorage.getItem('savedList')).length != 0){
        products = JSON.parse(localStorage.getItem('savedList'));
    }
    updateList();
});

function updateList(){
    document.querySelector('.to-buy').innerHTML = null;
    document.querySelector('.bought-list').innerHTML = null;
    document.querySelector('.products div').innerHTML = null;
    products.forEach((product) => {
        let productSection = document.createElement('section');
            productSection.classList.add('product-edit');
            let productName = document.createElement('div');
                productName.appendChild(document.createTextNode(product.name));
                productName.classList.add('product-name');
                productName.setAttribute('contenteditable', !product.bought);
                productName.addEventListener('blur', ()=>{
                    if(productName.firstChild.data != null) {
                        product.name = productName.firstChild.data;
                    }
                    localStorage.setItem('savedList', JSON.stringify(products));
                    updateList();
                })
            productSection.appendChild(productName);
            let editAmount = document.createElement('div');
                editAmount.classList.add('edit-amount');
                if(!product.bought){
                    let minus = document.createElement('button');
                    minus.classList.add('minus');
                    minus.setAttribute('data-tooltip','-1 одиниця');
                    minus.appendChild(document.createTextNode('-'));
                    minus.addEventListener('click', ()=>{
                        if(product.amount > 1) {
                            product.amount--;
                            localStorage.setItem('savedList', JSON.stringify(products));
                            updateList();
                        }
                    });
                    editAmount.appendChild(minus);
                }
                let productAmount = document.createElement('span');
                    productAmount.classList.add('product-amount');
                    productAmount.appendChild(document.createTextNode(product.amount));
                editAmount.appendChild(productAmount);
                if(!product.bought){
                    let plus = document.createElement('button');
                    plus.classList.add('plus');
                    plus.setAttribute('data-tooltip','+1 одиниця');
                    plus.appendChild(document.createTextNode('+'));
                    plus.addEventListener('click', ()=>{
                        product.amount++;
                        localStorage.setItem('savedList', JSON.stringify(products));
                        updateList();
                    });
                    editAmount.appendChild(plus);
                }
            productSection.appendChild(editAmount);
            let changeStatus = document.createElement('div');
                changeStatus.classList.add('change-status');
                let statusButton = document.createElement('button');
                    statusButton.classList.add('status-button');
                if(product.bought){
                    statusButton.setAttribute('data-tooltip', 'Куплено');
                    statusButton.appendChild(document.createTextNode('Не куплено'));
                    changeStatus.appendChild(statusButton);
                } else {
                    statusButton.setAttribute('data-tooltip', 'Не куплено');
                    statusButton.appendChild(document.createTextNode('Куплено'));
                    changeStatus.appendChild(statusButton);
                    let closeButton = document.createElement('button');
                    closeButton.classList.add('close-button');
                    closeButton.setAttribute('data-tooltip', 'Закрити');
                    closeButton.appendChild(document.createTextNode('x'));
                    closeButton.addEventListener('click', ()=>{
                        products.splice(products.indexOf(product), 1);
                        localStorage.setItem('savedList', JSON.stringify(products));
                        updateList();
                    })
                    changeStatus.appendChild(closeButton);
                }
                statusButton.addEventListener('click', ()=>{
                    product.bought = !product.bought;
                    localStorage.setItem('savedList', JSON.stringify(products));
                    updateList();
                });
            productSection.appendChild(changeStatus);
        document.querySelector('.products div').appendChild(productSection);
        let productInCart = document.createElement('span');
            productInCart.classList.add('product-item');
            let amountInCart = document.createElement('span');
            amountInCart.classList.add('amount');
            amountInCart.appendChild(document.createTextNode(product.amount));
            productInCart.appendChild(document.createTextNode(product.name));
            productInCart.appendChild(amountInCart);
        if(product.bought){
            productInCart.classList.add('bought-item');
            document.querySelector('.bought-list').appendChild(productInCart);
        } else {
            document.querySelector('.to-buy').appendChild(productInCart);
        }
    });
}

function addProduct(){
    let name = document.querySelector('.text-field').value.trim();
    document.querySelector('.text-field').value = null;
    document.querySelector('.text-field').focus();
    if(name != ''){
        products.push({name, amount: 1, bought: false});
        localStorage.setItem('savedList', JSON.stringify(products));
        updateList();
    }
}