import { Package } from "lucide-react";

export default function OrderItems({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        Немає товарів у замовленні
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
        <Package className="w-4 h-4" />
        Товари в замовленні:
      </h4>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/60">
              <th className="text-left py-2.5 px-4 font-medium text-muted-foreground">Товар</th>
              <th className="text-center py-2.5 px-4 font-medium text-muted-foreground">Кількість</th>
              <th className="text-right py-2.5 px-4 font-medium text-muted-foreground">Вартість</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {item.product_image ? (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-10 h-10 rounded-md object-cover border"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                        <Package className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <span className="font-medium text-primary">{item.product_name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">{item.quantity}</td>
                <td className="py-3 px-4 text-right font-medium">
                  {(item.price || 0).toFixed(2)} грн
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}