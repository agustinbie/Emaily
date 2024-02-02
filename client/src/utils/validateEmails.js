const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//emailregex.com
export default (emails) => {
    const invalidEmails = emails.split(",").map(email => email.trim()).filter(email => regularExpression.test(email) === false) //estamos buscando los recipients tipeados por el usuario que no son validos 

if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
}
return;
}