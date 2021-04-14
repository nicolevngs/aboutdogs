

var block = document.getElementById('band1');

var CorrectAnswer;
var selectedAnswer;
var points= 0;
var rounds = 0;


// Function to get a random item from an array
function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

function onSelect(element) {
    selectedAnswer = element.value;
}

function onSubmit() {
    rounds += 1;
    if(rounds === 6) {
        if (selectedAnswer === CorrectAnswer){
         points +=1;   
        }
        document.getElementById("totalPoints").innerHTML = "Final Score: "+ points + " points";
        document.getElementById("exampleModalLabel").innerHTML = "GAME OVER!";
        document.getElementById("playAgain").style.display = "block";
        $('#exampleModal').modal('toggle');
        rounds = 0
        points = 0
        return 

    }

    if (selectedAnswer == CorrectAnswer) {
        points += 1;
        document.getElementById("totalPoints").innerHTML = "Score: "+ points + " points";
        document.getElementById("exampleModalLabel").innerHTML = "PAW-RFECT! That is correct!";
        $('#exampleModal').modal('toggle')
    }
    else{
        document.getElementById("totalPoints").innerHTML = `<div>Correct answer: ${CorrectAnswer}</div> <div>Score: ${points} points</div>`;
        document.getElementById("exampleModalLabel").innerHTML = `W-R-O-N-G! `;

        $('#exampleModal').modal('toggle')

    }
}


function getBreeds() {
    fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => {
            if (!response.ok) {
                throw Error("Woof! There's something wrong");
            }
            return response.json();
        })
        .then (data => {
            console.log(data);
            let OneElement = getRandomItem(data)
            const html =  
                `
                <div class="breed">
                <p style="padding-top: 42px;" ><img src="${OneElement.image.url}" width="400"; /></p>
                <p style="color: white;" > HINT! <p>
                <p style="color: white;" > Breed group: ${OneElement.breed_group} </p>
                </div>
                `;
            CorrectAnswer = OneElement.name;

            let IncorrectAnswerOne= getRandomItem(data).name;
            let IncorrectAnswerTwo= getRandomItem(data).name;

            let choices = [
                {Label: "Choice1", Value: "one"} ,
                {Label: "Choice2", Value: "two"},
                {Label: "Choice3", Value: "three"}
            ];

            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }

            shuffleArray(choices)

            let RandomChoice = choices.pop() //grabbing the last element from "choices" and taking it out of the array

            document.getElementById(RandomChoice.Label).innerHTML = CorrectAnswer; 
            document.getElementById(RandomChoice.Value).value = CorrectAnswer;

            // Choices has now two elements

            RandomChoice = choices.pop() 

            document.getElementById(RandomChoice.Label).innerHTML = IncorrectAnswerOne; 
            document.getElementById(RandomChoice.Value).value = IncorrectAnswerOne;

            // Choices has now one element :(

            RandomChoice = choices.pop() 

            document.getElementById(RandomChoice.Label).innerHTML = IncorrectAnswerTwo; 
            document.getElementById(RandomChoice.Value).value = IncorrectAnswerTwo;


           
            
            

            document.getElementById('dogImage').innerHTML = html;
        })
        .catch(error => {
            console.log(error);
        })
}
 
getBreeds();

// when modal is closed, reload new image (breed). Call function getBreeds again
$('#exampleModal').on('hidden.bs.modal', function (e) {
    getBreeds();
    document.getElementById("playAgain").style.display = "none";
    /// uncheck all radio buttons when closing modal
    document.getElementById("one").checked = false;
    document.getElementById("two").checked = false;
    document.getElementById("three").checked = false;
})

var SubmitButton = document.getElementById("guestName")
var theName = document.getElementById("Userinput")

SubmitButton.addEventListener('click',  GreetMessage )

function GreetMessage(){
    
    alert(" Hi there " + theName.value + ", we'll display random images of dogs below. Choose the right breed to gain points. Each game has 6 rounds, but don't worry you can play as many times as you want. Have fun! ");

}



