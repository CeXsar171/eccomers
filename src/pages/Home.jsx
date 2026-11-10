import MainLayout from "../layouts/MainLayout";

import HeroBanner from "../components/home/HeroBanner";
import Categories from "../components/home/Categories";

import ProductsSection from "../components/products/ProductsSection";
import PromotionsSection from "../components/products/PromotionsSection";
import ProductCard from "../components/products/ProductCard";

export default function Home(){

return(

<MainLayout>

<HeroBanner/>

<Categories/>

<ProductsSection/>

<PromotionsSection/>


</MainLayout>

)

}