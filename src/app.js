const express = require("express");
const stripe = require("stripe")(
  "sk_test_51039TY2m5fPKBOnnSsJ9BC9cuxayXSqzDl6yc1wSZxygTDcFKkXyiKUg07hfyWlppzTNi7Zo5uhuQFNs5bjdWp9e00PuryNsxM"
);

const cors = require("cors");
const app = express();
const Users = require("./models/users");
const users = require("./db/user");
var { db } = require("./db/index");
const sequelize = require("sequelize");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());

let createdAt = Date.now();
let updatedAt = Date.now();

// db();

const standeredAccount = async (email) => {
  try {
    const account = await stripe.accounts.create({
      type: "standard",
      country: "us",
      email: email,
    });
    return account;
  } catch (error) {
    return error.messege;
  }
};

const createAccountLink = async (id) => {
  let obj = {
    account: id,
    refresh_url: "http://128.199.20.60:3000/",
    return_url: "http://128.199.20.60:3000/",
    type: "account_onboarding",
  };

  try {
    const accountLinks1 = await stripe.accountLinks.create(obj);
    return accountLinks1;
  } catch (error) {
    return error.messege;
  }
};

app.post("/createAccount", async (req, res) => {
  try {
    const { email, name, description } = req.body;

    if (!email || !name || !description) {
      return res.json({
        messege: "error",
        error: "please enter all the required fields",
      });
    }

    let customerInfo = await standeredAccount(email);

    // console.log(customerInfo);

    const info = await createAccountLink(customerInfo.id);
    // console.log("info=>", info);
    const [userprofile, resultmeta] = await db.sequelize.query(
      "INSERT INTO users (userId,ConnectedId,charges,payouts) VALUES ('" +
        customerInfo.id +
        "','" +
        info.url +
        "','0','0')"
    );

    // console.log("userprofile", userprofile);

    // await users.create({
    //   userId: customerInfo.id,
    //   connectedId: info.url,
    //   ...req.body,
    // });
    // console.log(info);
    res.json({ customerInfo: info, data: customerInfo.id });
  } catch (error) {
    res.json({ messege: error.message, error: error.messege });
  }
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_58SS5ICwlvmk5boxy95umA0Daka1Aeur";

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    // const sig = request.headers["stripe-signature"];
    console.log(request.body.data.object.requirements.alternatives);
    console.log(request.body.data.object.requirements.current_deadline);
    console.log(request.body.data.object.requirements.currently_due);
    console.log(request.body.data.object.requirements.disabled_reason);
    console.log(request.body.data.object.requirements.error);
    console.log(request.body.data.object.requirements.eventually_due);
    console.log(request.body.data.object.requirements.past_due);
    console.log(request.body.data.object.requirements.pending_verification);

    let event = await request.body;
    let data = await event.data.object;

    let id = request.body.data.object.id;
    let charges_enabled = request.body.data.object.charges_enabled;
    let country = request.body.data.object.country;
    let default_currency = request.body.data.object.default_currency;
    let payouts_enabled = request.body.data.object.payouts_enabled;
    let product_description =
      request.body.data.object.business_profile.product_description;
    let first_name = request.body.data.object.individual.first_name;
    let last_name = request.body.data.object.individual.last_name;
    let address1 = request.body.data.object.company.address.line1;
    let address2 = request.body.data.object.company.address.line2;
    let postal_code = request.body.data.object.company.address.postal_code;
    let city = request.body.data.object.company.address.city;
    let state = request.body.data.object.company.address.state;
    let company_country = request.body.data.object.company.address.country;
    let alternative = request.body.data.object.requirements.alternatives;
    let current_deadline =
      request.body.data.object.requirements.current_deadline;
    let currently_due = request.body.data.object.requirements.currently_due;
    let disabled_reason = request.body.data.object.requirements.disabled_reason;
    let error = request.body.data.object.requirements.error;
    let eventually_due = request.body.data.object.requirements.eventually_due;
    let past_due = request.body.data.object.requirements.past_due;
    let pending_verification =
      request.body.data.object.requirements.pending_verification;

    // console.log(address1, address2);
    const [userprofile, resultmeta] = await db.sequelize.query(
      "INSERT INTO user_details (userId,charges_enable,country,	default_currency,payouts_enabled,product_description,first_name,last_name,company_address,company_postal_code,company_city,company_state,company_country,company_alternatives,company_curent_deadline,company_currently_due,company_disabled_reason,company_error,company_eventually_due,company_last_due,company_pending_varification) VALUES ('" +
        id +
        "','" +
        charges_enabled +
        "','" +
        country +
        "','" +
        default_currency +
        "','" +
        payouts_enabled +
        "','" +
        product_description +
        "','" +
        first_name +
        "','" +
        last_name +
        "','" +
        address1 +
        "','" +
        postal_code +
        "','" +
        city +
        "','" +
        state +
        "','" +
        company_country +
        "','" +
        alternative +
        "','" +
        current_deadline +
        "','" +
        currently_due +
        "','" +
        disabled_reason +
        "','" +
        error +
        "','" +
        eventually_due +
        "','" +
        past_due +
        "','" +
        pending_verification +
        "')"
    );
    // console.log(data);

    // try {
    //   event = stripe.webhooks.constructEvent(request.body, endpointSecret);
    // } catch (err) {
    //   response.status(400).send(`Webhook Error: ${err.message}`);
    //   return;
    // }

    // Handle the event
    // console.log(event.event);
    switch (event) {
      case "account.updated":
        const account = event.data.object;
        // Then define and call a function to handle the event account.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.json({ data: event.data.object });
  }
);

app.listen(4000, (re, err) => {
  if (err) console.log(err);
  console.log("running on http://localhost:4000");
  // db.sequelize.authenticate();
  db.sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
});
