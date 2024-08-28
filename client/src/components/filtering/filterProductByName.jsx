import { Skeleton } from '@chakra-ui/react'
import Card from '../card'
export default function FilterProductByName({ searchTerm, productData, getProducts, isLoaded }) {
  const filteredProducts = productData.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      {filteredProducts.map((item) => (
        <>
          {item.isActive === true && (
            <>
              <Skeleton isLoaded={isLoaded} fadeDuration={1}>
                <Card productData={item} getProducts={getProducts} />
              </Skeleton>
            </>
          )}
        </>
      ))}
    </>
  )
}
