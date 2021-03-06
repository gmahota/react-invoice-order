import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import {
  IconButton,
  InputBase,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Product, ProductOptions } from '../../model/base/product'
import { get_Products } from '../../service/base/productService'
import { AddCircle, DetailsOutlined, Search } from '@material-ui/icons'

export default function ProductList({ allProducts }) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  const [filterStr, setFilterStr] = useState('')

  const handleNew = () => {
    router.push('/products/create')
  }
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-gray-800">
            Product List's
          </h3>
          <div>
            <Search />
          </div>
          <div>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={filterStr}
              onChange={event => setFilterStr(event.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <IconButton
            aria-label="Create New Order"
            onClick={handleNew}
            color="inherit"
          >
            <AddCircle />
          </IconButton>
        </div>
      </div>

      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">#</TableCell>
              <TableCell align="left">Code</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts
              ?.filter(
                e =>
                  filterStr.length === 0 ||
                  e.code?.toLowerCase().includes(filterStr) ||
                  e.customer?.toLowerCase().includes(filterStr) ||
                  e.name?.toLowerCase().includes(filterStr)
              )
              .map(product => (
                <TableRow key={product.code}>
                  <TableCell align="left">
                    <Link href={`/products/${product.code}`}>
                      <DetailsOutlined />
                    </Link>
                  </TableCell>
                  <TableCell align="left">{product.code}</TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const products = await get_Products()

  const allProducts = products.map(product => {
    const p: ProductOptions = {
      ...product
    }
    return p
  })
  return {
    props: {
      allProducts
    }
  }
}
