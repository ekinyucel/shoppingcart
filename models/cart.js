module.exports = function Cart(oldCard){ // gets the oldcard first
    this.items = oldCard.items || {};
    this.totalQty = oldCard.totalQty || 0;
    this.totalPrice = oldCard.totalPrice || 0;

    this.add = function(item, id){ // add new item to the card
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = { item: item, qty:0, price:0 };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.generateArray = function(){ // converting object to array
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.reduce = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
    };

    this.removeItem = function(id){
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
};