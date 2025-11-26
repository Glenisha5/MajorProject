"use client"

import { ShoppingCart } from "lucide-react"
import useCart from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CartDrawer from "@/components/CartDrawer"

export default function CartButton() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed right-4 top-4 z-50">
        <Button variant="ghost" size="icon" aria-label="Cart" onClick={() => setOpen(true)}>
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">
                {count}
              </span>
            )}
          </div>
        </Button>
      </div>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
