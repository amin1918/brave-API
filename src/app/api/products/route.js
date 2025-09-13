
export async function products() {
    const result = await fetch("http://localhost:3001/");
    const products = await result.json()
    return products
 
}

 