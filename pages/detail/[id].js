import React, { useEffect, useState } from "react";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";

const Detail = ({ detailProduct }) => {
  return (
    <>
      <Head>
        <title>Detail</title>
      </Head>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <Link
                    href={`/`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Katalog
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {detailProduct.title}
                </a>
              </li>
            </ol>
          </nav>
          <div className="mt-6 max-w-4xl mx-auto">
            <Carousel>
              {detailProduct.images.map((c, key) => (
                <div key={key} max-h-173>
                  {" "}
                  <Image
                    loader={() => c}
                    src={c}
                    alt={"image"}
                    className="w-full h-full "
                    width={500}
                    height={300}
                    layout="responsive"
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {detailProduct.title}
              </h1>
            </div>
            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              Description
              <div>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {detailProduct.description}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-3xl text-gray-900">${detailProduct.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;

// // This also gets called at build time
export async function getServerSideProps(props) {
  const response = await fetch(
    `https://dummyjson.com/products/${props.query.id}`
  );
  const detailProduct = await response.json();
  return {
    props: {
      detailProduct: detailProduct,
    }, // will be passed to the page component as props
  };
}
