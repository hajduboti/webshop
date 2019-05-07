const Model = Sequelize.Model;

class Images extends Model{}
Image.init({
    ImageID:{
        type: Sequelize.Integer,
        primaryKey: True
    },
    ProductID:{
        type: Sequelize.Integer,
        references: 'products',
        referencesKey: 'productid',
        allowNull: false
    },
    Url:{
        type: Sequelize.String,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'images'
});
class OrderItems extends Model{}
OrderItems.init({
    OrderItemID:{
        type: Sequelize.Integer,
        primaryKey: True
    },
    OrderID:{
        type: Sequelize.Integer,
        references: 'orders',
        referencesKey: 'orderid',
        allowNull: false
    },
    ProductName:{
        type: Sequelize.String,
        allowNull: false
    },
    Quantity:{
        type: Sequelize.Integer,
        allowNull: false
    },
    OrderPrice:{
        type: Sequelize.Double,
        allowNull: false
    },
    Weight:{
        type: Sequelize.Double,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'orderItems'
});

class Orders extends Model{}
Orders.init({
    OrderID:{
        type: Sequelize.Integer,
        primaryKey: True
    },

    UserID:{
        type: Sequelize.Integer,
        references: 'users',
        referencesKey: 'userid',
        allowNull: false
    },

    PaymentID:{
        type: Sequelize.Integer,
        allowNull: false
    },

    TotalPrice:{
        type: Sequelize.Double,
        allowNull: false

    }
},{
    sequelize,
    modelName: 'orders'
});

class Products extends Model{}
Products.init({
    ProductID:{
        type: Sequelize.Integer,
        primaryKey: True
    },
    ProductName:{
        type: Sequelize.String,
        allowNull: false
    },
    Description:{
        type: Sequelize.String,
        allowNull: false  
    },
    Quantity:{
        type: Sequelize.Integer,
        allowNull: false  
    },
    Price:{
        type: Sequelize.Double,
        allowNull: false
    },
    SoldQuantity:{
        type: Sequelize.Integer,
        allowNull: false 
    },
    Category:{
        type: Sequelize.String,
        allowNull: false
    },
    Weight:{
        type: Sequelize.Double,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'products'
});

class Reviews extends Model{}
Reviews.init({
    ReveiwID:{
        type: Sequelize.Integer,
        primaryKey: True
    },
    ProductID:{
        type: Sequelize.Integer,
        references: 'products',
        referencesKey: 'productid',
        allowNull: false
    },
    CustomerName:{
        type: Sequelize.String,
        allowNull: false
    },
    Score:{
        type: Sequelize.Double,
        allowNull: false
    },
    ReviewText:{
        type: Sequelize.String,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'reviews'
});

class Users extends Model{}
Users.init({
    UserID:{
        type: Sequelize.Integer,
        primaryKey: True
    },
    FirstName:{
        type: Sequelize.String,
        allowNull: false
    },
    LastName:{
        type: Sequelize.String,
        allowNull: false
    },
    Email:{
        type: Sequelize.String,
        allowNull: false
    },
    Password:{
        type: Sequelize.String,
        allowNull: false
    },
    City:{
        type: Sequelize.String,
        allowNull: false
    },
    Postcode:{
        type: Sequelize.String,
        allowNull: false
    },
    Address:{
        type: Sequelize.String,
        allowNull: false
    },
    UserType:{
        type: Sequelize.String,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'users'
});

Products.hasMany(Images)
Products.hasMany(Reviews)

Orders.hasMany(OrderItems)

Orders.hasOne(Users)

Users.hasMany(Orders)