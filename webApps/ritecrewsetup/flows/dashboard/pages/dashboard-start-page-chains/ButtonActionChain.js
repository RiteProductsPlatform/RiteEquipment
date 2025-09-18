define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils'
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class ButtonActionChain extends ActionChain {

    async run(context) {
      const { $variables } = context;

      // ---- MSAL Config ---- //
      const msalConfig = {
        auth: {
          clientId: "e254c652-35de-415a-9191-e04210edef87", // from Azure AD
          authority:  "https://login.microsoftonline.com/f4d4b2b3-ca12-4c29-8cff-136685f7f51d/",
          redirectUri: "https://oic-vbcs-riteoicdev-vb-idjm2yj32zav.builder.us-ashburn-1.ocp.oraclecloud.com/ic/builder/design/Equipment_Rite_DN/1.1.94/preview/webApps/ritecrewsetup/" // must match Azure redirect URI
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: false
        }
      };

      const msalInstance =  new window.msal.PublicClientApplication(msalConfig);

      try {
        // ---- Login Popup ---- //
        const loginResponse = await msalInstance.loginPopup({
          scopes: ["openid", "profile", "email", "User.Read"] // adjust scopes
        });

        // ---- Tokens ---- //
        const idToken = loginResponse.idToken;
        const accessToken = loginResponse.accessToken;

        console.log("ID Token:", idToken);
        console.log("Access Token:", accessToken);

        // ---- Decode ID Token ---- //
        const decoded = parseJwt(idToken);
        console.log("Decoded User Claims:", decoded.email);

        // ---- Store in VBCS variable ---- //
        // $variables.jwttoken = idToken;
        // $variables.loggedInUser = decoded; // contains email, name, etc.

      } catch (err) {
        console.error("Login failed:", err);
      }

      // ---- Helper function to decode JWT ---- //
      function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
      }
    }
  }

  return ButtonActionChain;
});
