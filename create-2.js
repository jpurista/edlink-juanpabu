//change style and elements between xs+sm+medium and lg+xl
$(document).ready(function(){
    window_width = $(window).width();
        if(window_width <= 991){
        $('.section1').css('border-top-right-radius', '15px');
        $('.section1').css('border-bottom-right-radius', '15px');
        $('.section2').hide();
        $('#url-link-md').hide();
        $('#url-link-xs').show();
        $('#phone-preview').hide();
        $('#custom-gradient-btn').addClass('mb-3');
    }else if(window_width >= 1400) {
        $('#phone-preview').addClass('col-xl-8');
        $('#phone-preview').removeClass('col-xl-9');
        $('#url-link-xs').hide();
        $('#url-link-md').show();
    }else{
        $('#phone-preview').addClass('col-xl-9');
        $('#phone-preview').removeClass('col-xl-8');
        $('.section2').show();
        $('#url-link-xs').hide();
        $('#url-link-md').show();
        $('#phone-preview').show();
        $('#custom-gradient-btn').removeClass('mb-3');
    }
});

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

  function sLinks(){ //shows links and hides design
      document.getElementById('linksPart').style.display='block';
      document.getElementById('designPart').style.display='none';
  }

  function sDesign(){ //shows design and hides links
      document.getElementById('linksPart').style.display='none';
      document.getElementById('designPart').style.display='block';
  }

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = user.uid
  document.getElementById("pageLink").innerHTML = "https://edlink.parthean.com/" + userId;
  } else {
    // No user is signed in.
  }
});


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uid = user.uid
      console.log(uid);
    } else {
      // No user is signed in.
    }
  });

// code to change picture
var chooseImage = document.getElementById('chooseImage');
var imgFile = document.getElementById('imgFile');
  chooseImage.addEventListener("click",function(){
    imgFile.click();
  });

imgFile.addEventListener("change", handleFiles, false);

function handleFiles() {
  if (this.files.length){
    for (let i = 0; i < this.files.length; i++) {
    var profileImage = document.getElementById("profileImage");
    profileImage.src = URL.createObjectURL(this.files[i]);
  }
  previewImage.src = profileImage.src;
  console.log(profileImage.src);
// uploading to storage
// storage ref
    var storage = firebase.storage();
  // Create a storage reference from our storage service
    var storageRef = storage.ref();
  // referencing blob carrying user image
    var file = this.files[0];
  // setting metadata
    var metadata = {
      contentType: 'image/jpeg'
    };
  // upload image with metadata
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       userId = user.uid
    var uploadTask = storageRef.child('userImages/' + userId).put(file, metadata);
  } else {
    //no user is signed in
  }
  });
  }
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     uid = user.uid
  } else {
    // No user is signed in.
  }
});


$('#removeImage').click(function(e){
  // referencing data location
    var storage = firebase.storage();
    var storageRef = storage.ref();
  // downloading image url from storageRef
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       userId = user.uid
    storageRef.child('userImages/' + userId).delete().then(function() {
      // File deleted successfully
  }).catch(function(error) {
    // Uh-oh, an error occurred!
  });
  profileImage.src = "images/filler-pfp.png"
  previewImage.src = profileImage.src;
  } else {
    // no user is signed in
    }
  });
})


$('.add-to-page-btn').click(function(e) {
    e.preventDefault(); //keeps page from refreshing
      console.log('posted!');

      if(($.trim($('#linkInput').val()) !== '')&&($.trim($('#titleInput').val()) !== '')){
      // So this block stores the link the user inputs, but doesn't do anything with it yet
        var link_link_input = document.getElementById('linkInput');
        var hyperlink = link_link_input.value;

        // This block stores the title, for when the link is posted
        var link_title_input = document.getElementById('titleInput'); //gets what user types in and gives it a name
        var post_text = link_title_input.value; // setting a new variable with the value

        //Posts everything
        addPost(post_text, hyperlink);
        // saves information by calling saveWebElements
        console.log("calling saveWebElements");
        saveWebElements(post_text, hyperlink);
        //Deletes whats in the input after user submits
        link_link_input.value = '';
        link_title_input.value = '';
      }else{
        alert('Input fields cannot be empty');
      }
  });

  function addPost(post_text, hyperlink, docRef) {

    //background card
    var post_card = document.createElement('a'); // creates an a tag
    var x = document.createElement('p');
    // setting id of x element
       x.classList.add('delete');
    // set innerHTML of x
       x.innerHTML = "delete card";
    post_card.appendChild(x);

    post_card.classList.add('post_card');
    post_card.href = hyperlink;
    post_card.setAttribute('target', '_blank');

    // Title
    var post_text_elem = document.createElement('p'); // creates a span
    post_text_elem.innerHTML = post_text; //returns the content of the HTML to variable

    // attaching the x onto the phone-preview
    document.getElementById('phone-preview').appendChild(x);
    post_card.appendChild(post_text_elem);
    document.getElementById('phone-preview').appendChild(post_card);

    // remove card when clicked
  x.addEventListener("click", function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         userId = user.uid

    db.collection("users").doc(userId).collection("page").get()
        var post_card_id = userId;
        post_card.id = post_card_id;

        document.getElementById(post_card_id).remove();
        x.remove();
        db.collection("users").doc(userId).collection("page").doc(post_text).delete();
      } else {
        // no user is signed in
        }
      });
  })
}

//Background Theme
  $('#custom-gradient-btn').click(function(e) {
    e.preventDefault(); //keeps page from refreshing
    var inp1 = document.getElementById('custom-input-1').value;
    var inp2 = document.getElementById('custom-input-2').value;
    console.log('linear-gradient(#'+inp1+', #'+inp2+');');
    document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#'+inp1+', #'+inp2+')';
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         userId = user.uid
    doc = db.collection("users").doc(userId).set({
          gradient: 'linear-gradient(#'+inp1+', #'+inp2+')'
        });
    } else {
      // no user is signed in
      }
    });
  });

  $('#yellow-pink-theme').click(function(e) {
    e.preventDefault(); //keeps page from refreshing
    document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#F8EF20, #FF30AC)';
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         userId = user.uid
    doc = db.collection("users").doc(userId).set({
          gradient: "linear-gradient(#F8EF20, #FF30AC)"
    });
    } else {
      // no user is signed in
      }
    });
  });

  $('#lightblue-blue-theme').click(function(e) {
    document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#4BFFD4, #3787FF)';
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         userId = user.uid
    doc = db.collection("users").doc(userId).set({
          gradient: "linear-gradient(#F8EF20, #3787FF)"
    });
  } else {
    // no user is signed in
    }
  });
  });

  $('#pink-purple-theme').click(function(e) {
    document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#FF96CE, #933FFF)';
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         userId = user.uid
    doc = db.collection("users").doc(userId).set({
          gradient: "linear-gradient(#F8EF20, #933FFF)"
    });
  } else {
    // no user is signed in
    }
  });
  });

  $('#yellow-green-theme').click(function(e) {
    document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#F8EF20, #5FFE78)';
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       userId = user.uid
    doc = db.collection("users").doc(userId).set({
          gradient: "linear-gradient(#F8EF20, #5FFE78)"
    });
  } else {
    // no user is signed in
    }
  });
});

  /*const draggables = document.querySelectorAll('.draggable')
  const containers = document.querySelectorAll('#links-container')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging')
    })
  })

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = getDragAfterElement(container, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
        container.appendChild(draggable)
      } else {
        container.insertBefore(draggable, afterElement)
      }
    })
  })

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }*/


  // saveItemToDatabase function
function saveWebElements(post_text,hyperlink) {
    // saving the inputted information in new documents (should be titled after userId)
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       userId = user.uid
      doc = db.collection("users").doc(userId).collection("page").doc(post_text).set ({
          title: post_text,
          link: hyperlink,
      })
      .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
} else {
  // no user is signed in
  }
});
}

// function to load the user's webpage
  function loadPage(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       userId = user.uid
    db.collection("users").doc(userId).collection("page").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // setting doc data for link as hyperlink
          var hyperlink = doc.data().link;
        // setting doc data for title as post_text
        var post_text = doc.data().title;
        addPost(post_text, hyperlink);
      });
    });
    // bringing back profile picture
    // referencing data location
      var storage = firebase.storage();
      var storageRef = storage.ref();
    // downloading image url from storageRef
      storageRef.child('userImages/' + userId).getDownloadURL().then(function(url) {
        var profileImage = document.getElementById("profileImage");
          profileImage.src = url;
        var previewImage = document.getElementById("previewImage");
          previewImage.src = profileImage.src;
      });
    // bringing back gradients
    db.collection("users").doc(userId).get().then(function(doc) {
      var gradientPeter = doc.data().gradient;
      console.log(gradientPeter);
      document.getElementById('phone-preview').style.backgroundImage = doc.data().gradient;
    });
  } else {
    // no user is signed in
    }
  });
}

// calling the function above when the page comes back
$(document).ready(function(){
    loadPage()
});
