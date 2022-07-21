import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function Home({ listProduct }) {
  console.log(listProduct.products);
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {listProduct.products.map((product) => (
              <div key={product.id}>
                <Link href={`/detail/${product.id}`} className="group">
                  <a>
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      <Image
                        loader={() => product.thumbnail}
                        src={product.thumbnail}
                        alt={"image"}
                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                        width={500}
                        height={500}
                        layout="responsive"
                      />
                    </div>
                  </a>
                </Link>

                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  $ {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const response = await fetch(`https://dummyjson.com/products?limit=12`);
  const listProduct = await response.json();
  return {
    props: {
      listProduct: listProduct,
    }, // will be passed to the page component as props
  };
}
