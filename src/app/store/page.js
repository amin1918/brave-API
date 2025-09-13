import { getApiURL } from "@/utils/get-url"
import Store from "./ClientPage"
import fetchAPI from "@/utils/fetch-api"

async  function Products() {
 const data = await fetchAPI(getApiURL("products"),{
  method:"GET"
 })
  return (
   <Store products={data} />
  )
}
export default Products


