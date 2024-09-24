require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());


// checkOut api
app.post("/api/create-checkout-session", async (req,res)=> {
    const {products} = req.body;

   // Calculate items to send to Stripe
    const extractingItems = await products.map(product => ({
        quantity: product.quantity,
        price_data: {
            currency: "usd",
            unit_amount: (product.price - (product.price / 100) * product.discountPercentage). toFixed(2) * 100,  
            product_data: {
                name: product.title,
                description: product.description,
                images: product.images
            }
        }
    }))
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:extractingItems,
        mode:"payment",
        success_url:"http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url:"http://localhost:5173/cancel",
    });
      res.json({id:session.id})

    
})

app.get('/api/get-checkout-session/:id', async (req, res) => {
    const sessionId = req.params.id;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.status(200).json(session);
    } catch (error) {
      res.status(404).json({ error: "Checkout session not found" });
    }
  });


app.listen(7000,() => {
    console.log("server start");
    
})