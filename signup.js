var firebaseConfig = {
    apiKey: "AIzaSyDQqS1OuU1s8cwkyQDcgqQV9vquxFZAfTU",
    authDomain: "partheanedlink.firebaseapp.com",
    databaseURL: "https://partheanedlink.firebaseio.com",
    projectId: "partheanedlink",
    storageBucket: "partheanedlink.appspot.com",
    messagingSenderId: "244645197259",
    appId: "1:244645197259:web:23e5b88a5ab02d3faa324e",
    measurementId: "G-N60RNK9K3L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.auth();
  var db = firebase.firestore();
  //authentication

//signing up users
$("#signupuser").click(function(e) {
  e.preventDefault();
  //save email and password inputs
      emailInput = document.getElementById("newEmailInput").value;
      console.log(emailInput);
      passwordInput = document.getElementById("newPassInput").value;
      console.log(passwordInput);
      first = document.getElementById('first').value;
      last = document.getElementById('last').value;
      //run signup
    signUp();
    document.getElementById("firstName").value= 'First name';
    document.getElementById("lastName").value = 'Last name';
    document.getElementById("newEmailInput").value = 'Email address';
    document.getElementById("newPassInput").value = 'Create password';
})

//logging in users
$("#loginuser").click(function(e) {
  e.preventDefault();
//save email and password inputs
  email = document.getElementById("email_input").value;
  console.log(email);
  password = document.getElementById("pass_input").value;
  console.log(password);
  login();
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        uid = user.uid
        console.log(uid);
      } else {
        // No user is signed in.
      }
    });
})

//sign up users
function signUp() {
  console.log('signup working');

  //handle verification requirements
  if (passwordInput.length < 6) {
    alert("Password length must be at least 6 characters.");
    return;
  }

  //create a new user
  firebase.auth().createUserWithEmailAndPassword(emailInput,passwordInput).then(cred => {
    //add user to database
      return db.collection("users").doc(cred.user.uid).set({
      email: emailInput,
    });
      //REDIRECT LINK
      console.log('added to database');
      sendEmailVerification();
  })
  //check and print errors
  .catch(function(error){
    errorCode = error.code;
    errorMessage = error.message;
    console.log(errorCode);
    //handle error message changes
    switch (errorCode) {
      case "auth/email-already-in-use":
        alert("The email is already in use. Please sign in with your password.");
        break;
      case "auth/invalid-email":
        alert("Please enter a valid email.");
        break;
      default:
        alert(errorMessage);
    }
  })
}

//login users
function login() {
  console.log('login working');
  //sign in users
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then(function(event) {
    alert("Logged in successfully!");
    //REDIRECT LINK
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
//handle error message changes
    switch(errorCode) {
      case "auth/user-disabled":
        alert("This user has been disabled.");
        break;
      case "auth/user-not-found":
        alert("This user is not registered. Sign up with your email.");
        break;
      case "auth/wrong-password":
        alert("The password is incorrect.");
        break;
      default:
        alert(errorMessage);

    }
  })
}

function sendEmailVerification() {
  var user = firebase.auth().currentUser;
  console.log(user);

  user.sendEmailVerification().then(function() {
    console.log('email sent');
  }).catch(function(error) {
    console.log(error.message);
  })
}
