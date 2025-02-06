"use client"

import { SetStateAction, useContext } from "react";
import { Context } from "../components/context/Context";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../components/hook/instance";


export interface ProductType {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    image: string;
    brendId: number;
    productItems: ProductItem[];
}

export interface ProductItem {
    id: number;
    name: string;
    colorId: number;
    productId: number;
    image: string;
    quantity: number;
    price: number;
}
interface ParamsType {
    page: number,
    limit: number,
    category?: string | null,
    min_price: number,
    max_price: number,
}
export const Product = (categoryName: string | null, tags: string | null, page: number, setTotalPage: React.Dispatch<SetStateAction<number>>, fullPrice: number[], size: string | null) => {
    const { token } = useContext(Context)
    const params: ParamsType = {
        page,
        limit: 6,
        category: categoryName == "All" ? null : categoryName,
        min_price: fullPrice[0],
        max_price: fullPrice[1],
    };
    const { data = [] } = useQuery({
        queryKey: ['products', categoryName, tags, page, fullPrice, size],
        enabled: true,
        queryFn: () => instance().get("/api/products", {
            headers: token ? { "Authorization": `Bearer ${token}` } : {},
            params: params
        }).then((res) => {
            setTotalPage(res.data.total_count)
            return res.data.products
        })
    });
    return data
}