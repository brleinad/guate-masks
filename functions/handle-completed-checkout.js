const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const contentful = require('contentful');
const contentfulManagement = require('contentful-management');

const CONFIG = {
    space: 'lvdm1g7qic0r',
    accessToken: 'DV6VF78OeykSp79IIlQCJyROy-Ah_lLrtZlOhGMJ9Ic',
    contentTypeIds: {
        mask: 'mask'
    }
}

exports.handler = async  ({body, headers}) => {

    try {
    // Get info from strip
        const stripeEvent = stripe.webhooks.constructEvent(
            body,
            headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log(`Created stripe event`);
        let emailSent = false;


        if (stripeEvent.type === 'checkout.session.completed' ) {
        //&& stripeEvent.payment_status === 'paid') {
            console.log(stripeEvent.data.object);
            sendEmail( stripeEvent.data.object, (error, info) => {console.log(info); console.error(error);});
            unpublishMasks(stripeEvent.data.object);
            emailSent = true;

            return { 
                statusCode: 200,
                body: JSON.stringify({ received: true, emailSent: emailSent})
            }
        }

        return { 
            statusCode: 201,
            body: JSON.stringify({ received: true, emailSent: emailSent})
        }
    } catch (error) {
        console.log(`failed with ${error}`)
        return { 
            statusCode: 400,
            body: `Webhook error: ${error}`
        }
    }


}

const sendEmail = function(checkoutSession, callback) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_LOGIN,
            pass: process.env.MAIL_PASSWORD,
        }
    });

    transporter.sendMail({
        from: process.env.MAIL_LOGIN,
        to: process.env.MAIL_TO,
        subject: 'New order from ' + checkoutSession.shipping.name,
        //text: event.body
        text: JSON.stringify({checkoutSession}, null, 2),
    }, function(error, info) {
    	if (error) {
    		callback(error);
    	} else {
    		callback(null, {
			    statusCode: 200,
			    body: "Ok"
	    	});
    	}
    });
}

const unpublishMasks = async (checkoutSession) => {

    const client = contentful.createClient({
        space: CONFIG.space,
        accessToken: CONFIG.accessToken,
    });
    const maskEntries = await client.getEntries();
    const purchasedItems = checkoutSession.metadata;
    let masksToDelete = [];
    console.log(purchasedItems)

    for (let [item, itemId] of Object.entries(purchasedItems)) {
        console.log('looking for ' + itemId);
        const purchasedMasks = maskEntries.items.filter(maskEntry => {
            return maskEntry.fields.id === parseInt(itemId);
        });
        masksToDelete.push(...purchasedMasks);
    }

    console.log('Gonna delete these masks ');
    console.log(masksToDelete);

    masksToDelete.forEach(mask => {
        unpublishMask(mask);
    });


}

const unpublishMask = async (mask) => {
    const contentful = require('contentful-management')

    const client = contentful.createClient({
        accessToken: process.env.CONTENTFUL_MANAGEMENT_KEY
    });
    console.log('Deleting mask ' + mask.sys.id);
    client.getSpace(CONFIG.space)
        .then((space) => space.getEnvironment('master'))
        .then((environment) => environment.getEntry(mask.sys.id))
        .then((entry) => entry.unpublish())
        .then((entry) => console.log(`Entry ${entry.sys.id} unpublished.`))
        .catch(console.error)
}