const appInfo = require('../../../settings.json')

const twilioService = async(MobileNumber,Message)=>{

   let statusCode;
   let statusMessage;
   var accountSid = appInfo.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
   var authToken = appInfo.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
   
    // require the Twilio module and create a REST client
    const client = require('twilio')(accountSid, authToken);

    await client.messages
      .create({
        body: Message,
        to: MobileNumber, // Text this number
        from: appInfo.Twilio_Trail_Number // From a valid Twilio number
      })
       .then((message) => {/*console.log(message.sid),*/statusCode="200"})
       .catch(Err => {
           console.log(Err.message);
           statusCode = "500",
           statusMessage = Err.message
        });

        if(statusCode ==200 || statusCode == 500){
            return statusCode;
        }
  }

  module.exports ={twilioService}