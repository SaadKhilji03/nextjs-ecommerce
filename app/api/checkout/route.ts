import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: body.cartItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      })),
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
