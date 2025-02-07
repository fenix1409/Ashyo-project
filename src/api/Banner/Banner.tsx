"use client";
import { instance } from "@/src/components/hook/instance";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export interface BannerType {
  id: number;
  name: string;
  description: string;
  productId: number;
  image: string;
}

const BASE_URL = "https://ashyo.store"; // Asosiy API domeni

const Banner = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const response = await instance().get("/banner");
      return response.data;
    },
  });

  if (isLoading) return <p>Yuklanmoqda...</p>;

  const imageList: { id: number; url: string }[] = 
  data?.banners.map((banner: BannerType) => ({
    id: banner.id,
    url: `${BASE_URL}${banner.image}`
  })) || [];
  console.log(imageList);
  

return (
  <div>
    {imageList.map(({ id, url }) => (
      <div key={id} className="w-[310px]">
        {/* <Image src={url} alt={`Banner ${id}`} width={310} height={169} priority /> */}
      </div>
    ))}
  </div>
)
};

export default Banner;
