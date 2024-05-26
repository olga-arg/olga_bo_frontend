var aws = require('@aws-sdk/client-ses')
var ses = new aws.SES({ region: 'us-east-1' }) // This is you SES region
const digitGenerator = require('crypto-secure-random-digit')

function sendChallengeCode(emailAddress, secretCode) {
  var params = {
    Destination: {
      ToAddresses: [emailAddress],
    },
    Message: {
      Body: {
        Html: {
          Data: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <style>
                @media only screen and (min-width: 601px) {
                  .code {
                    font-weight: 900;
                  }
                  .mail {
                    width: 60%;
                    margin: auto;
                    margin-top: 5%;
                  }
                  h1 {
                    color: black;
                    font-size: 35px;
                    text-align: center;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 400;
                  }
                  p.title {
                    color: #4c525c;
                    font-size: 20px;
                    text-align: center;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 300;
                  }
                  p.footer {
                    color: #4c525c;
                    font-size: 18px;
                    text-align: center;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 300;
                  }
                  .etc {
                    color: #4c525c;
                    font-size: 18px;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 300;
                  }
                  .logo {
                    display: block;
                    text-align: center;
                    width: 25%;
                    margin: auto;
                  }
                }
                @media only screen and (max-width: 600px) {
                  .code {
                    font-weight: 900;
                  }
                  .mail {
                    width: 80%;
                    margin: auto;
                    margin-top: 5%;
                  }
                  h1 {
                    color: black;
                    font-size: 25px;
                    text-align: center;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 400;
                  }
                  p.title {
                    color: #4c525c;
                    font-size: 15px;
                    text-align: center;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 300;
                  }
                  p.footer {
                    color: #4c525c;
                    font-size: 13px;
                    text-align: center;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 300;
                  }
                  .etc {
                    color: #4c525c;
                    font-size: 15px;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 300;
                  }
                  .logo {
                    display: block;
                    text-align: center;
                    width: 40%;
                    margin: auto;
                  }
                }
                body {
                  margin: auto;
                }
                hr {
                  width: 100%;
                  border-top: 1px solid #bbb;
                }
              </style>
            </head>
            <body>
              <div class="mail">
              <div>
                <img class="logo" src="https://github.com/olga-arg/olga_bo_frontend/blob/main/src/assets/rendilo_i.png?raw=true" alt="Rendilo logo" />
                <h1>Your verification code is: <span class="code">${secretCode}</span></h1>
              </div>
                <br />
                <br />
                <br />
                <p class="title">
                  Si estás experimentando algún problema con tu cuenta, por favor no dudes en contactarnos respondiendo a este correo.
                  <br />
                  <br />
                  <br />
                  Gracias!<br />
                  El equipo de Rendilo
                </p>
                <br />
                <br />
                <br />
                <hr />
                <p class="footer">Si no realizaste esta solicitud, por favor contáctanos respondiendo a este correo.</p>
              </div>
            </body>
          </html>
          `,
        },
      },
      Subject: { Data: 'Rendilo código de confirmación' },
    },
    Source: 'hola@rendilo.com', // This is you SES Identity Email
  }

  return ses.sendEmail(params)
}

exports.handler = async function (event) {
  if (event.request.challengeName === 'CUSTOM_CHALLENGE') {
    // Generate a random code for the custom challenge
    const challengeCode = digitGenerator.randomDigits(6).join('')

    event.response.privateChallengeParameters = {}
    event.response.privateChallengeParameters.answer = challengeCode

    event.response.publicChallengeParameters = {}
    event.response.publicChallengeParameters['fieldTitle'] = 'Enter the secert'
    event.response.publicChallengeParameters['fieldHint'] = 'Check your email'

    return sendChallengeCode(event.request.userAttributes.email, challengeCode)
  }
}
