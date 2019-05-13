for(i=0; i<300; i++){
    Products.create(    
        {ProductID: i, 
        ProductName: "Leggings", 
        Description: "Elastic close-fitting garments worn over the legs ", 
        Quantity: '300', 
        Price:'50.00', 
        SoldQuantity:'0', 
        Category:'Pants', 
        Weight:'.25'})
}

for(i=300; i<900; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "Jeans", 
        Description: " Pants made from denim or dungaree cloth", 
        Quantity: '600', 
        Price:'100.00', 
        SoldQuantity:'0', 
        Category:'Pants', 
        Weight:'.5'}
    )
}

for(i=900; i<1100; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "SweatPants", 
        Description: "Soft pants made for athletic or comfort purposes", 
        Quantity: '200', 
        Price:'15.00', 
        SoldQuantity:'0', 
        Category:'Pants', 
        Weight:'.20'})
}
// 

for(i=1100; i<1500; i++){
    Products.create(

    {ProductID:i, 
        ProductName: "Running", 
        Description: "Shoes for Running", 
        Quantity: '400', 
        Price:'80.00', 
        SoldQuantity:'0', 
        Category:'Shoes', 
        Weight:'.55'})
}

for(i=1500; i<2000; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "Sneakers", 
        Description: "General shoes for athletic occasions", 
        Quantity: '500', 
        Price:'100.00', 
        SoldQuantity:'0', 
        Category:'Shoes', 
        Weight:'.8'})
}
for(i=2000; i<2800; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "Business Shoes", 
        Description: "Fancy Shoes for Business situations", 
        Quantity: '800', 
        Price:'200.00', 
        SoldQuantity:'0', 
        Category:'Shoes', 
        Weight:'.6'})
}

for(i=2800; i<3300; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "Boots", 
        Description: "Shoes for bad weather or for fashion purposes.", 
        Quantity: '500', 
        Price:'110.00', 
        SoldQuantity:'0', 
        Category:'Shoes', 
        Weight:'1.5'})
}

// 


for(i=3300; i<3600; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "Shirts", 
        Description: "Generic shirts with various colours", 
        Quantity: '300', 
        Price:'25.00', 
        SoldQuantity:'0', 
        Category:'Top', 
        Weight:'.1'})
}

for(i=3600; i<4400; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "T-Shirts", 
        Description: "T-Shirts with various colours and graphic designs", 
        Quantity: '800', 
        Price:'20.00', 
        SoldQuantity:'0', 
        Category:'Top', 
        Weight:'.1'})
}

for(i=4400; i<5000; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "Sweater", 
        Description: "Cozy and warm garment", 
        Quantity: '600', 
        Price:'40.00', 
        SoldQuantity:'0', 
        Category:'Top', 
        Weight:'.25'})
}


for(i=5000; i<5500; i++){
    Products.create(
    {ProductID:i, 
        ProductName: "Hoodie", 
        Description: "Warm garment with a hood", 
        Quantity: '500', 
        Price:'30.00', 
        SoldQuantity:'0', 
        Category:'Top', 
        Weight:'.25'})
}