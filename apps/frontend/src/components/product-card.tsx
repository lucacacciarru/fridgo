import { Product } from '@/types/product';
import { Card, CardContent } from './ui/card';

type Props = {
  product: Product;
  onClick: () => void;
};

export const ProductCard = ({
  product,
  onClick,
}: Props) => {
  return (
    <Card
      key={product.id}
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-lg font-semibold text-[#333333]">
              {product.name}
            </h2>
            <p className="text-sm text-[#666666]">
              Quantity: {product.quantity}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
