import { useProducts } from '@/src/api/Product/Product'
import React from 'react'

const ProductCart = () => {
    const { data, isLoading, error } = useProducts(1, 100)
    const items = data?.products[0].productItems
    // console.log(items);
    // console.log(data?.products[0])
    const datas = data?.products

    if (isLoading) return <p>Yuklanmoqda...</p>
    if (error) return <p>Xatolik yuz berdi: {error.message}</p>
    return (
        <div className="flex items-center gap-[30px]">
            <h2>Jami mahsulotlar: {data?.totalCount}</h2>
            <div className="flex items-center gap-[20px] flex-wrap">
                {datas?.map((product) => (
                    <div key={product.id} className="w-[300px] h-[100px] p-[15px] border-[2px] border-blue-500">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-[20px] flex-wrap">
                {items?.map((item) => (
                    <div key={item.id} className="w-[300px] h-[100px] p-[15px] border-[2px] border-blue-500">
                        <h3>{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCart