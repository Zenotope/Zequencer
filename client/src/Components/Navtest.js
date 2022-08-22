

useEffect(() => {

    function loadUserData() {
      let user = JSON.parse(localStorage.getItem(“user”));
      console.log(user);
      fetch(http://127.0.0.1:4000/find_thing?email=${user.email})
        .then((response) => response.json())
        .then((data) => {
          setFavorites(data.games);
          setUserID(data.id);
          console.log(data.id);
        });
    }

    loadUserData();


    // Sets games
    fetch(“http://127.0.0.1:4000/games”)
      .then((response) => response.json())
      .then((data) => setGames(data));
    // If there is a local storage user, set user to that
    if (localStorage.getItem(“user”)) {
      setUser(JSON.parse(localStorage.getItem(“user”)));
      // navigate(“/explore”);
    }
    /* global google */
    google.accounts.id.initialize({
      client_id:
        “817805489414-n1vbq2kuidfu0m9f5clttvr2eubo1jtl.apps.googleusercontent.com”,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById(“signInDiv”), {
      theme: “outline”,
      size: “large”,
    });
  }, []);



  function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    // setNewUser(userObject);
    localStorage.setItem(“user”, JSON.stringify(userObject));
    console.log(userObject);
    window.location.assign(“/explore”);
    // If there is not an email associated, create a user with the response data
    fetch(http://127.0.0.1:4000/find_thing?email=${userObject.email})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === []) {
          let data = {
            first_name: userObject.given_name,
            last_name: userObject.family_name,
            email: userObject.email,
            profile_photo: userObject.picture,
          };
          console.log(data);
          fetch(“http://127.0.0.1:4000/new_user”, {
            method: “POST”,
            headers: { “Content-Type”: “application/json” },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(“Success:“, data);
            });
        }
      });
  }