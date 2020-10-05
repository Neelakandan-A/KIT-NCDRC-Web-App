var firebaseConfig = 
{
    apiKey: "AIzaSyDLs4Ea4pXTwqYvHv0PWboxJNYoe8SgA0U",
    authDomain: "kit-ncdrc-portal.firebaseapp.com",
    databaseURL: "https://*.firebaseio.com",
    projectId: "kit-ncdrc-portal",
    storageBucket: "kit-ncdrc-portal.appspot.com",
    messagingSenderId: "822595100725",
    appId: "1:822595100725:web:468eea06abfd600de4517c",
    measurementId: "G-J99KD1CFNV"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  firebase.auth.Auth.Persistence.LOCAL;


  $("#btn-login").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();

      if(email != ""  &&  password != "")
      {
          var result = firebase.auth().signInWithEmailAndPassword(email, password);

          result.catch(function(error)
          {
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorCode);
              console.log(errorMessage);
              window.alert("Message : " + errorMessage);
              
              
          });
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
  });




  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmpassword").val();

      if(email != ""  &&  password != ""  &&  cPassword != "")
      {
          if(password == cPassword)
          {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);

            result.catch(function(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
  
                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message : " + errorMessage);
            });
          }
          else
          {
            window.alert("Password do not match with the Confirm Password");
          }
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
  });



  $("#btn-resetPassword").click(function()
  {
     var auth = firebase.auth();
     var email = $("#email").val();

     
     if(email != "")
     {
         auth.sendPasswordResetEmail(email).then(function()
         {
            window.alert("Email has been sent to you, Please check and verify.");
         })
         .catch(function(error)
         {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message : " + errorMessage);
         });
     }
     else
     {
        window.alert("Please write your email first.");
     }
  });



  $("#btn-logout").click(function()
  {
      firebase.auth().signOut();
  });




  $("#btn-update").click(function()
  {
    var fName = $("#firstName").val();
    var lName = $("#lastName").val();
    var department = $("#department").val();
    var year = $("#year").val();
    var regno = $("#reg").val();
    var phone = $("#phone").val();
    var gender = $("#gender").val();
    var address = $("#address").val();
    var interest = $("#interest").val();
    var bio = $("#bio").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName!="" && lName!="" && department!="" && year!="" && regno!="" && phone!="" && gender!="" && address!="" && interest!="" && bio)
    {
        var userData =
        {
            "firstName": fName,
            "lastName": lName,
            "department": department,
            "year": year,
            "regnum": regno,
            "phone": phone,
            "gender": gender,
            "address": address,
            "interest": interest,
            "bio": bio,
        };

        usersRef.set(userData, function(error)
        {
            if(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
    
                console.log(errorCode);
                console.log(errorMessage);
    
                window.alert("Message : " + errorMessage); 
            }
            else
            {
                window.location.href = "home.html"
            }
        });
    }
    else
    {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
  });
