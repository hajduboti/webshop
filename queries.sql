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