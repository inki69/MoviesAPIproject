const API_key ="04c76c7e593758e81f12da6f6f443855";
const endpoints = {
    nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_key}`,
    popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_key}`,
    trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_key}`,
    upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_key}`,
    topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_key}`
};

const options = ["Now Playing", "Popular", "Trending", "Upcoming", "Top Rated"];

var moviesContainer = document.querySelector('#movies-container');
var sideBarButton = document.querySelector('.middle');
var menu =document.querySelector('#menu');
var search= document.querySelector('#searchContainer')
const menuList = document.querySelector('#menuList');


getMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_key}`);



function display(movies) {
    moviesContainer.innerHTML = ''; //clearing previous results
    movies.forEach(movie => {
        var movieElement = document.createElement('div');
        movieElement.classList.add('movie', 'col-md-4', 'mt-4');
        

        var moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
        moviePoster.classList.add("movie-img")
        moviePoster.style.transition = "opacity 0.5s ease";
        movieElement.appendChild(moviePoster);


        var movieDetails = document.createElement('div');
        movieDetails.classList.add('movie-details');
        movieDetails.style.display = 'none'; // Initially hidden
        movieDetails.innerHTML = `
            <h3 class="color-gray">${movie.title}</h3>
            <p class="color-gray">${movie.overview}</p>
        `;
        movieElement.appendChild(movieDetails);

        moviesContainer.appendChild(movieElement);

        const imgElement = movieElement.querySelector('img');
        imgElement.addEventListener('mouseover', () => {
            imgElement.style.opacity = 0; //Fade out
            setTimeout(() => {
                imgElement.src = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
                imgElement.style.opacity = 1; //Fade in
            }, 500); //Delay matches the transition duration
            movieDetails.style.display = 'block'; //showing movie details
        });

        imgElement.addEventListener('mouseout', () => {
            imgElement.style.opacity = 0; // Fade out
            setTimeout(() => {
                imgElement.src = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
                imgElement.style.opacity = 1; //Fade in
            }, 500); //Delay matches the transition duration
            movieDetails.style.display = 'none'; //Hiding movie details
        });
    });
}

sideBarButton.addEventListener('click', function(){
    if(menu.classList.contains('d-none')){
        menu.classList.remove('d-none');
        sideBarButton.innerHTML=`<i class="fa-solid fa-x"></i>`;
    }else{
        menu.classList.add('d-none');
        sideBarButton.innerHTML=`<i class="fa-solid fa-bars"></i>`;
    }
})

options.forEach((option, index) => {
    const optionEle = document.createElement('li');
    optionEle.classList.add('py-3', 'ps-3','fs-4','color-gray');
    optionEle.textContent = option;
    optionEle.addEventListener('click', () => {
        const endpointKey = Object.keys(endpoints)[index];
        getMovies(endpoints[endpointKey]);
        console.log(endpoints[endpointKey])
        menu.classList.add('d-none');
        sideBarButton.innerHTML=`<i class="fa-solid fa-bars"></i>`;
    });
    menuList.appendChild(optionEle);
});

function getMovies(endpoint) {
    fetch(endpoint)
        .then(response => response.json())
        .then(data => display(data.results))
        .catch(error => console.error('Error fetching data:', error));
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length >= 3) {
        const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=${query}`;
        fetch(searchEndpoint)
            .then(response => response.json())
            .then(data => {
                if (data.results.length === 0) {
                   
                } else {
                    display(data.results);
                }
            })
            .catch(error => console.error('Error searching movies:', error));
    } 
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query.length >= 3) {
            const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=${query}`;
            fetch(searchEndpoint)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length === 0) {
                        displayNoResults();
                    } else {
                        display(data.results);
                    }
                })
                .catch(error => console.error('Error searching movies:', error));
        }else{
            displayLessThan3();
        }
        // Prevent the default form submission on Enter key press
        event.preventDefault();
    }
});

// Display no results message
function displayNoResults() {
    Swal.fire({
        icon: 'info',
        title: 'No Results Found',
        text: 'No movies found matching your search criteria.',
        footer: '<button onclick="returnToHome();" class="btn btn-primary">Return to Home</button>',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false, // Prevent closing by clicking outside
    });
}
//Display less than 3 letters
function displayLessThan3() {
    Swal.fire({
        icon: 'info',
        title: 'Oops, Too Short',
        text: 'Please enter a longer search input',
        footer: '<button onclick="returnToHome();" class="btn btn-primary">Return to Home</button>',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false, // Prevent closing by clicking outside
    });
}

// Function to return to home
function returnToHome() {
    getMovies(endpoints.nowPlaying);
    searchInput.value=''; // Reset search input
    Swal.close(); // Close the SweetAlert dialog
}


// Select form and input elements
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const ageInput = document.getElementById('age');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Function to display error message for an input field
function showError(input, message) {
    const feedbackDiv = input.nextElementSibling; // Get the next sibling div (for error feedback)
    feedbackDiv.textContent = message; // Set error message text
    input.classList.add('is-invalid'); // Add Bootstrap class for invalid feedback
}

// Function to clear error message for an input field
function clearError(input) {
    const feedbackDiv = input.nextElementSibling;
    feedbackDiv.textContent = ''; // Clear error message text
    input.classList.remove('is-invalid'); // Remove Bootstrap class for invalid feedback
}

// Function to validate email format using regex
function isValidEmail(email) {
    // Regex pattern for basic email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Function to validate phone format using regex
function isValidPhone(phone) {
    // Regex pattern for phone number validation (###-##-###)
    const pattern = /^01[0-2]\d{8}$/;
    return pattern.test(phone);
}
const phoneNumber = "01123456789";
console.log(isValidPhone(phoneNumber));  // Should return true

const invalidPhoneNumber = "0112345678";
console.log(isValidPhone(invalidPhoneNumber));
// Function to validate form inputs
function validateForm() {
    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Enter a valid email address.');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate phone
    if (phoneInput.value.trim() === '') {
        showError(phoneInput, 'Phone number is required.');
        isValid = false;
    } else if (!isValidPhone(phoneInput.value.trim())) {
        showError(phoneInput, 'Enter a valid phone number (###-##-###).');
        isValid = false;
    } else {
        clearError(phoneInput);
    }

    // Validate age
    if (ageInput.value.trim() === '') {
        showError(ageInput, 'Age is required.');
        isValid = false;
    } else if (ageInput.value < 18 || ageInput.value > 100) {
        showError(ageInput, 'Age must be between 18 and 100.');
        isValid = false;
    } else {
        clearError(ageInput);
    }

    // Validate password
    if (passwordInput.value.trim() === '') {
        showError(passwordInput, 'Password is required.');
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        showError(passwordInput, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    // Validate confirm password
    if (confirmPasswordInput.value.trim() === '') {
        showError(confirmPasswordInput, 'Please confirm your password.');
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, 'Passwords do not match.');
        isValid = false;
    } else {
        clearError(confirmPasswordInput);
    }

    return isValid;
}

// Event listener for form submission
contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    if (validateForm()) {
        // Form is valid, proceed with submission or other action
        // For demo, show a success message (replace with your logic)
        Swal.fire({
            icon: 'success',
            title: 'Form Submitted!',
            text: 'Thank you for contacting us.',
        });

        // Reset form after successful submission (optional)
        contactForm.reset();
    } else {
        // Form is invalid, display error message or handle as needed
    }
});
