import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from '@/components/ui/button'
import {toast} from 'sonner'
import {useUser} from '@/app/provider'
import {supabase} from '@/services/supabaseClient'

function PayButton({amount, credits}) {
    const {user} = useUser();

    const initialOptions = {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
    };


    const onPaymentSuccess = async () => {
        const {data, error} = await supabase
            .from('Users')
            .update({credits: Number(user?.credits) + credits})
            .eq('email', user?.email)
            .select()
        toast.success("Credits added to your account", {position: "top-center"})
        window.location.reload();
    }

    return (
        <div className="text-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full">Buy</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Checkout</DialogTitle>
                        <DialogDescription asChild>
                            <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons style={{layout: "vertical"}}
                                               onApprove={() => onPaymentSuccess()}
                                               onCancel={() => toast.error("Payment cancelled", {position: "top-center"})}
                                               createOrder={(data, actions) => {
                                                   return actions.order.create({
                                                       purchase_units: [
                                                           {
                                                               amount: {
                                                                   value: amount,
                                                                   currency_code: 'USD'
                                                               }
                                                           }
                                                       ]
                                                   })
                                               }}
                                />
                            </PayPalScriptProvider>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PayButton