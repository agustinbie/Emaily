const keys = require("../../config/keys");

module.exports = (survey, url) => {
    return `
        <html>
            <body>
                <div style="text-aling: center;">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};
//no se por que los anchor dan undefined en el mail enviado