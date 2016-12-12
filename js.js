
$(document).ready(function(){

    var bottom = document.getElementById("bottom");
    var errorDiv = document.getElementById("errorDiv");
    
    var usernameInput = document.getElementById("usernameInput");
    var imageInput = document.getElementById("imageInput");
    var movieInput = document.getElementById("movieInput");
    var commentInput = document.getElementById("commentInput");
    
    var submitBut = document.getElementById("submitBut");
    
    var usernameEx = /^[a-zA-Z0-9]{8,20}$/; 
    var imageEx = /\.(jpg|png|gif)$/;
    var movieEx = /[a-zA-Z\s]$/;
    var commentEx = /[a-zA-Z0-9\s\.\,\?\!]{1,100}$/;  
    
    var user_valid = "no";
    var image_valid = "no";
    var movie_valid = "no";
    var comment_valid = "no";
  

    usernameInput.onkeyup = function(){
        console.log("typed username");
        
        if (usernameEx.test(usernameInput.value) == true){
            usernameInput.style.color = "black";
            errorDiv.innerHTML = "";
            user_valid = "yes";
            
        } else{
            usernameInput.style.color = "red";
            errorDiv.innerHTML = "Username can only contains 8-15 alphabets or numbers";
            user_valid = "no";
        }
    }
    
    
    imageInput.onkeyup = function(){
        console.log("typed image url");
        
        if (imageEx.test(imageInput.value) == true){
            imageInput.style.color = "black";
            errorDiv.innerHTML = "";
            image_valid = "yes";
        } else{
            imageInput.style.color = "red";
            errorDiv.innerHTML = "Image URL must end with either jpg/png/gif";
            image_valid = "no";
        }
    }
    
    movieInput.onkeyup = function(){
        console.log("typed movie name");
        
        if (movieEx.test(movieInput.value) == true){
            movieInput.style.color = "black";
            errorDiv.innerHTML = "";
            movie_valid = "yes";
        } else{
            movieInput.style.color = "red";
            errorDiv.innerHTML = "Movie name must have only alphabets and space";
            movie_valid = "no";
        }
    }
    
    commentInput.onkeyup = function(){
        console.log("typed comment");
        
        if (commentEx.test(commentInput.value) == true){
            commentInput.style.color = "black";
            errorDiv.innerHTML = "";
            comment_valid = "yes";
            
        } else{
            commentInput.style.color = "red";
            errorDiv.innerHTML = "Comment can only have alphabets, numbers, space, .,?! and a max of 100 characters";
            comment_valid = "no";
        }
        
    }
    

    submitBut.onclick = function(){
        $.ajax({
            url:"http://www.omdbapi.com/?s=" + movieInput.value +"",
            dataType:"jsonp",
            success:function(resp){
                console.log(resp);
                if (user_valid == "yes" && image_valid == "yes" && movie_valid =="yes" && comment_valid == "yes"){
                    var newObj = document.createElement("div");
                    bottom.appendChild(newObj);
                    newObj.className = "newObj";

                    var newImg = document.createElement("img");
                    newImg.src = imageInput.value;
                    newImg.className = "newImg";
                    newObj.appendChild(newImg);

                    /*for(var i=0; i<1; i++){}*/
                    var newMovie = document.createElement("img");
                    newMovie.src = resp.Search[0].Poster;
                    newMovie.className = "newMovie";
                    newObj.appendChild(newMovie);
                    

                    var newComment = document.createElement("div");
                    newComment.innerHTML = commentInput.value;
                    newComment.className = "newComment";
                    newObj.appendChild(newComment);

                    var newUsername = document.createElement("div");
                    newUsername.innerHTML = usernameInput.value;
                    newUsername.className = "newUsername";
                    newObj.appendChild(newUsername);
                }
            }
        })
    }
    
});

