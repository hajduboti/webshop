CREATE TRIGGER update_quantyties ON dbo.orderItems
AFTER INSERT
AS
IF (ROWCOUNT_BIG() = 0)
RETURN;
DECLARE @items INT = (SELECT Quantity FROM inserted)
DECLARE @oderItemID INT = (SELECT OrderItemID FROM inserted)
DECLARE @quantity INT = (SELECT QuantityOnStock FROM dbo.quantities WHERE OrderItemID = @oderItemID )
IF @quantity > @items
	UPDATE dbo.quantities
	SET QuantityOnStock = QuantityOnStock - @items ,SoldQuantity = SoldQuantity + @items
	WHERE OrderItemID = @oderItemID
ELSE
	RAISERROR ('No enough products in storage', 16, 1);


DROP PROC IF EXISTS UpdateQuantity;
GO
CREATE PROC UpdateQuantity (@qnt int, @oderItemID INT)
AS
BEGIN
DECLARE @quantity INT = (SELECT QuantityOnStock FROM dbo.quantities WHERE ProductQuantityID = @oderItemID )
IF @quantity > @qnt
	UPDATE dbo.quantities
	SET QuantityOnStock = QuantityOnStock - @qnt ,SoldQuantity = SoldQuantity + @qnt
	WHERE ProductQuantityID = @oderItemID
ELSE
	RAISERROR ('No enough products in storage', 16, 1);
END