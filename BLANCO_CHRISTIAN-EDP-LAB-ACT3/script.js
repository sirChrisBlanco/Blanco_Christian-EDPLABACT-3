function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    let discount = 0;

    if (subtotal >= 5000) {
            discount = subtotal * 0.10;  
    }else if (subtotal >= 3000) {
            discount = subtotal * 0.07;
    }else if (subtotal >= 1000) {
            discount = subtotal * 0.05;
    }else{
        discount = 0;
    }
    return discount;
    
}

function getDeliveryFee(option) {
    let fee = 0;

    switch (option) {
        case 1:
            fee = 0;
            break;
        case 2:
            fee = 80;
            break;
        case 3:
            fee = 150;
            break;
        default:
            fee = 0;
    }
    return fee;
    
}

document.getElementById("calculateBtn").addEventListener("click", function(){

    const customerName = document.getElementById("customerName").value;
    const productCount = Number(document.getElementById("productCount").value);
    const orderSummary = document.getElementById("orderSummary");
    const validationMessage = document.getElementById("validationMessage");

    if(customerName === ""){
        validationMessage.textContent = "Please enter a valid name";
        return;
    }
    if (productCount <= 0 ) {
        validationMessage.textContent = "Please put a number";
        
    }

    let subtotal = 0;
    let productDetails = "";


    for (let i = 0; i < productCount; i++) {

        const productName = document.getElementById(`productName-${i}`).value.trim();

        const price = Number(
            document.getElementById(`productPrice-${i}`).value
        );

        const quantity = Number(
            document.getElementById(`productQuantity-${i}`).value
        );

        if (productName === "") {
            validationMessage.textContent =
                `Please enter the Product Name for Product ${i + 1}.`;
            return;
        }

   
        if (isNaN(price) || price <= 0) {
            validationMessage.textContent =
                `Price for Product ${i + 1} must be a positive number.`;
            return;
        }

   
        if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
            validationMessage.textContent =
                `Quantity for Product ${i + 1} must be a positive whole number.`;
            return;
        }

        const itemAmount = calculateItemAmount(price, quantity);

   
        subtotal += itemAmount;

   
        productDetails += `
            <p>
                <strong>Product Name: ${i + 1}. ${productName}</strong><br>
               <strong> Price: ₱${price.toFixed(2)}</strong><br>
                <strong>Quantity: ${quantity}</strong><br>
                <strong>Amount: ₱${itemAmount.toFixed(2)}</strong>
            </p>
            <hr>
        `;
    }


    const discount = calculateDiscount(subtotal);


    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }


    const deliveryOption = document.getElementById("deliveryOption").value;


    const deliveryFee = getDeliveryFee(deliveryOption);

  
    let deliveryType = "";

    switch (deliveryOption) {
        case "1":
            deliveryType = "Store Pickup";
            break;

        case "2":
            deliveryType = "Standard Delivery";
            break;

        case "3":
            deliveryType = "Express Delivery";
            break;

        default:
            deliveryType = "Unknown";
    }

    
    const finalAmount = subtotal - discount + deliveryFee;

    
    orderSummary.innerHTML = `
        <h2>ORDER SUMMARY</h2>

        <p>
            <strong>Customer:</strong> ${customerName}
        </p>

        ${productDetails}

        <h3>ORDER TOTALS</h3>

        <p>
            <strong>Subtotal:</strong> ₱${subtotal.toFixed(2)}
        </p>

        <p>
            <strong>Discount Rate:</strong> ${discountRate}%
        </p>

        <p>
            <strong>Discount Amount:</strong> ₱${discount.toFixed(2)}
        </p>

        <p>
            <strong>Delivery Type:</strong> ${deliveryType}
        </p>

        <p>
            <strong>Delivery Fee:</strong> ₱${deliveryFee.toFixed(2)}
        </p>

        <h2>
            Final Amount: ₱${finalAmount.toFixed(2)}
        </h2>
    `;


})

document.getElementById("productCount").addEventListener("input", function(){
    const productCountInput = document.getElementById("productCount");
    const productsContainer = document.getElementById("productsContainer");

    const productCount = Number(productCountInput.value);

    productsContainer.innerHTML = "";

    if (productCount > 0) {

    
        for (let i = 0; i < productCount; i++) {

            productsContainer.innerHTML += `
                <div class="product">
                    <h2>Product ${i + 1}</h2>

                    <label for="productName-${i}">Product Name</label>
                    <input 
                        type="text" 
                        id="productName-${i}" 
                        placeholder="Enter product name"
                    >

                    <label for="productPrice-${i}">Price</label>
                    <input 
                        type="number" 
                        id="productPrice-${i}" 
                        placeholder="Enter price"
                    >

                    <label for="productQuantity-${i}">Quantity</label>
                    <input 
                        type="number" 
                        id="productQuantity-${i}" 
                        placeholder="Enter quantity"
                    >
                </div>
            `;
        }
    }
});

