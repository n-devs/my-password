import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../services/firebase';


// const config = {
//     apiKey: "AIzaSyCLYyA1xVMD6PAhTm_0jXGSW51Q2ujvPfw",
//     authDomain: "my-password-ebebd.firebaseapp.com",
//     projectId: "my-password-ebebd",
//     storageBucket: "my-password-ebebd.appspot.com",
//     messagingSenderId: "590675023138",
//     appId: "1:590675023138:web:26ec57a53c1c162af7417b",
//     measurementId: "G-ZJZLTY4C91"
// };



// firebase.initializeApp(config);

function SingInComponent() {
    firebase.auth().languageCode = 'th';
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image', // 'audio'
                    size: 'normal', // 'invisible' or 'compact'
                    badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
                },
                defaultCountry: 'TH', // Set default country to the United Kingdom (+44).
                // For prefilling the national number, set defaultNationNumber.
                // This will only be observed if only phone Auth provider is used since
                // for multiple providers, the NASCAR screen will always render first
                // with a 'sign in with phone number' button.
                defaultNationalNumber: '',
                // You can also pass the full phone number string instead of the
                // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
                // the first country ID that matches the country code will be used to
                // populate the country selector. So for countries that share the same
                // country code, the selected country may not be the expected one.
                // In that case, pass the 'defaultCountry' instead to ensure the exact
                // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
                // will always have higher priority than 'loginHint' which will be ignored
                // in their favor. In this case, the default country will be 'GB' even
                // though 'loginHint' specified the country code as '+1'.
                loginHint: ''
            }
        ]
    };

    return (<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />)
}

export default SingInComponent;