"use client"

import { useState } from "react"
import useCart from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { X, Trash2 } from "lucide-react"

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, count, remove, update, clear } = useCart()
  const [updating, setUpdating] = useState(false)

  const total = items.reduce((s, it) => s + (Number(it.price || 0) * (it.quantity || 0)), 0)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />
      <aside className="w-96 max-w-full bg-white dark:bg-slate-900 shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Cart ({count})</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground">Your cart is empty.</div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <div key={String(it.id)} className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-muted-foreground">{it.unit || ""}</div>
                  <div className="text-sm mt-1">₹{(Number(it.price) || 0).toLocaleString()}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => { setUpdating(true); update(it.id, (it.quantity || 1) - 1); setUpdating(false); }}>-</Button>
                    <div className="px-2">{it.quantity}</div>
                    <Button size="sm" variant="outline" onClick={() => { setUpdating(true); update(it.id, (it.quantity || 0) + 1); setUpdating(false); }}>+</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => remove(it.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t pt-3">
              <div className="flex items-center justify-between font-medium">
                <div>Total</div>
                <div>₹{total.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Button className="flex-1" onClick={() => alert("Proceed to checkout (not implemented)")}>Checkout</Button>
                <Button variant="outline" onClick={() => clear()}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
