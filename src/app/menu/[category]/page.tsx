import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

// جلب البيانات حسب الفئة من API أو مباشرة من قاعدة البيانات
const getData = async (category: string): Promise<ProductType[]> => {
  // يمكنك استبدال fetch بـ prisma مباشرة إذا أحببت
  // return await prisma.product.findMany({ where: { category } });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?cat=${category}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products!");
  return res.json();
};

// النوع Props للـ dynamic route
type Props = {
  params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
  const category = params.category;

  // جلب المنتجات
  const products: ProductType[] = await getData(category);

  return (
    <div className="flex flex-wrap">
      {products.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
        >
          {/* IMAGE */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt={item.title} fill className="object-contain" />
            </div>
          )}
          {/* TEXT */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">{item.price}DA</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
