const postmark = require("postmark");
const sendgrid = require("sendgrid");
//console.log(postmark);
const helper = sendgrid.mail; //.mail no se si sirve en postmak
//console.log(sendgrid.mail.Mail.Mail);
//console.log(postmark.Models);
const keys = require("../config/keys");

class Mailer extends helper.Mail   {
    constructor({subject, recipients}, content) { //el primer parametro que recibe es la nueva survey que creamos en la surveyRoute y con destructuring extrae las propiedades subject y recipients del objeto survey. El segundo parametro que recibe es el template que es un string de html. De esta forma la clase se puede instaciar con cualquier modelo de email que creemos en el futuro, no solo encuestas
        super();



        //todo esto es sendgrid
        
        this.sgApi = sendgrid(keys.sendgridKey);
        this.from_email = new helper.Email("noreply@emaily.com");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        this.recipients = this.formatAddresses(recipients); 
        
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();

    }

    formatAddresses(recipients) {
      return recipients.map(({email}) =>{
        return new helper.Email(email);
      });
    }

    addClickTracking() {
      const trackingSettings = new helper.TrackingSettings();
      const clickTracking = new helper.ClickTracking(true, true);

      trackingSettings.setClickTracking(clickTracking);
      this.addTrackingSettings(trackingSettings);
    }
    

    addRecipients() {
      const personalize = new helper.Personalization();
      this.recipients.forEach(recipient => {
        personalize.addTo(recipient);
      });
      this.addPersonalization(personalize);
    }


    async send() {
      const request = this.sgApi.emptyRequest({
        method: "POST",
        path: "/v3/mail/send",
        body: this.toJSON()
      });

      const response = await  this.sgApi.API(request);
      return response

    }


}

module.export = Mailer;



/* // Create a Mail object with the email options
const mail = new postmark.Models.Mail({
    From: "sender@example.com",
    To: "recipient@example.com",
    Subject: "Hello from Postmark",
    TextBody: "This is a test email",
    HtmlBody: "<p>This is a test email</p>",
    MessageStream: "outbound"
  }); */


  /* // Send the email using the client
client.sendEmail(mail)
.then(response => {
  console.log(response);
})
.catch(error => {
  console.error(error);
}); */