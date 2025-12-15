import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { category: string }
}

const getData = async (category: string): Promise<ProductType[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?cat=${category}`, {
  cache: "no-store"
});

  if (!res.ok) throw new Error("Failed to fetch products!");
  return res.json();
}

const CategoryPage = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);

  return (
    <div className="flex flex-wrap">
      {products.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50"
        >
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt={item.title} fill className="object-contain" />
            </div>
          )}
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
  )
}

export default CategoryPage;
