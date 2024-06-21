import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { OrderReceivedEmail } from "@/components/emails/order-received-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature)
      return new NextResponse("Invalid signature.", { status: 400 });

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email)
        throw new Error("Missing user email.");

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) throw new Error("Invalid requests metadata.");

      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details?.name!,
              city: shippingAddress?.city!,
              country: shippingAddress?.country!,
              postalCode: shippingAddress?.postal_code!,
              street: shippingAddress?.line1!,
              state: shippingAddress?.state!,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details?.name!,
              city: billingAddress?.city!,
              country: billingAddress?.country!,
              postalCode: billingAddress?.postal_code!,
              street: billingAddress?.line1!,
              state: billingAddress?.state!,
            },
          },
        },
      });

      await resend.emails.send({
        from: `casecobra <${process.env.RESEND_SENDER_EMAIL}>`,
        to: [event.data.object.customer_details.email],
        subject: "Thanks for your order!",
        react: OrderReceivedEmail({
          orderId,
          orderDate: updatedOrder.createdAt.toLocaleDateString(),
          shippingAddress: {
            id: orderId,
            name: session.customer_details?.name!,
            city: shippingAddress?.city!,
            country: shippingAddress?.country!,
            postalCode: shippingAddress?.postal_code!,
            street: shippingAddress?.line1!,
            state: shippingAddress?.state!,
            phone: null,
          },
        }),
      });
    }

    return NextResponse.json({ result: event, ok: true }, { status: 200 });
  } catch (error) {
    console.error("STRIPE_WEBHOOK: ", error);

    return NextResponse.json(
      {
        message: "Something went wrong!",
        ok: false,
      },
      {
        status: 500,
      }
    );
  }
}
