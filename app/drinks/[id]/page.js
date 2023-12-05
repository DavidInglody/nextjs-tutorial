import Link from "next/link";
import drinkImg from "./drinks.jpg"
import Image from "next/image";
console.log(drinkImg);
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const getSingleDrink = async(id)=>{
  const resp = await fetch(`${url}${id}`)
  if(!resp.ok){
    throw new Error("failed to fetch a drink...")
  }
  return resp.json()
}

const SingleDrinkPage = async ({ params }) => {
  const data = await getSingleDrink(params.id)
  const title = data?.drinks[0].strDrink
  const imgSrc = data?.drinks[0].strDrinkThumb
  console.log(title,imgSrc);
  return (
    <div>
      <Link href="/drinks" className="btn btn-primary mb-12 mt-8">
        back to drinks
      </Link>
      <Image src={imgSrc} width={300} height={300} className="w-48 h-48 rounded shadow-lg mb-4" priority alt={title}/>
      {/* <Image src={drinkImg} className="w-48 h-48 rounded" alt=""/> */}
      <h1 className="text-4xl mb-8">{title}</h1>
    </div>
  );
};
export default SingleDrinkPage;
