import Stripe from "stripe";
import { NextResponse } from "next/server";
import prisma from "@ /libs/prismadb";
import { headers } from "next/headers";

export const segmentConfig = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const buf = await req.text();
  const sig = headers().get("Stripe-Signature") as string;

  if (!sig) {
    return NextResponse.json("Missing stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json("Webhook error" + err, { status: 400 });
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        await prisma?.order.update({
          where: {
            paymentIntentId: charge.payment_intent,
          },
          data: {
            status: "completed",
            address: charge.shipping?.address,
          },
        });
      }
      break;
    default:
      console.log("Unhandled event type: " + event.type);
  }

  return NextResponse.json({
    recieved: true,
  });
}
