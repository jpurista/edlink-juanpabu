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
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var storage = firebase.storage();

function addNewCard(doc){
  // background post_card
    var post_card = document.createElement('a');
    post_card.classList.add('post_card');
    // post card link
    post_card.href = doc.data().link;
    post_card.setAttribute('target', '_blank');
  // post card title
    var post_text_elem = document.createElement('p');
    post_text_elem.innerHTML = doc.data().title;
  // attaching to site
    post_card.appendChild(post_text_elem);
    document.getElementById('appendLinksHere').appendChild(post_card);
}


function loadPage(){
  var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
  db.collection("users").doc(userId).collection("page").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        addNewCard(doc);
    });
  });
  // bringing back profile picture
    // referencing data location
      var storage = firebase.storage();
      var storageRef = storage.ref();
    // downloading image url from storageRef
      storageRef.child('userImages/' + userId).getDownloadURL().then(function(url) {
        var previewImage = document.getElementById("previewImage");
          previewImage.src = url;
      });
};




$(document).ready(function(){
  loadPage();
})
