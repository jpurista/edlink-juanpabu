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

  $('#form1').submit(function(e) {
  	e.preventDefault(); //keeps page from refreshing
      console.log('posted!');

  	// So this block stores the link the user inputs, but doesn't do anything with it yet
      var link_link_input = document.getElementById('link_link_input');
      var hyperlink = link_link_input.value;

      // This block stores the title, for when the link is posted
  	var link_title_input = document.getElementById('link_title_input'); //gets what user types in and gives it a name
  	var post_text = link_title_input.value; // setting a new variable with the value

  	//Posts everything
      addPost(post_text, hyperlink);

    // saves information by calling saveWebElements
    console.log("calling saveWebElements");
       saveWebElements(post_text, hyperlink);
    //testing
    bringBack(doc);
    //Deletes whats in the input after user submits
      link_link_input.value = '';
      link_title_input.value = '';

  });

  function addPost(post_text, hyperlink) {

  	//background card
  	var post_card = document.createElement('a'); // creates an a tag
  	var breakline = document.createElement('br');

  	post_card.classList.add('post_card');
  	post_card.href = hyperlink;
  	post_card.setAttribute('target', '_blank');

  	// Title
  	var post_text_elem = document.createElement('div'); // creates a span
  	post_text_elem.innerHTML = post_text; //returns the content of the HTML to variable

  	post_card.appendChild(post_text_elem);
  	document.getElementById('phone-preview').appendChild(post_card);
  	document.getElementById('phone-preview').appendChild(breakline);

  	//drag and drop

// setting docId variables


  }

  function customtheme(){
  	var inp1 = document.getElementById('custom-inp1').value;
  	var inp2 = document.getElementById('custom-inp2').value;
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#'+inp1+', #'+inp2+')';
  }

  function optheme(){
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(yellow, #FF30AC)';
  }

  function bgtheme(){
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#4BFFD4, #3787FF)';
  }

  function pptheme(){
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(#FF96CE, #933FFF)';
  }

  function bwtheme(){
  	document.getElementById('phone-preview').style.backgroundImage = 'linear-gradient(yellow, #5FFE78)';
  }

  const draggables = document.querySelectorAll('.draggable')
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
  }
// END OF CADE'S CODE ------------------------------------------>


// saveItemToDatabase function
function saveWebElements(post_text,hyperlink){
  // saving the inputted information in new documents (should be titled after userId)
  var userId = "tNelH5tZvedOWMJM16Jd8GLQj493";
    doc = db.collection("users").doc(userId).set({
        title: post_text,
        link: hyperlink,
        gradient: 
    });
  .then(function(){
    console.log("document successfully written");
  })
  .catch(function(error){
    console.error("error writing document:", error);
  });
}


// function to load the user's webpage
  function loadPage(){
    db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // setting doc data for link as hyperlink
          var hyperlink = doc.data().link;
        // setting doc data for title as post_text
      	var post_text = doc.data().title;
        addPost(post_text, hyperlink);
      });
    });
  };


// calling the function above when the page comes back
$(document).ready(function(){
    loadPage()
});
