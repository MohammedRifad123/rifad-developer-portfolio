function openFrontendModal(){
    document.getElementById("frontendModal").style.display = "block";
}

function closeFrontendModal(){
    document.getElementById("frontendModal").style.display = "none";
}


function openBackendModal(){
document.getElementById("backendModal").style.display="block";
}

function closeBackendModal(){
document.getElementById("backendModal").style.display="none";
}

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 20);
        }
        else{
            counter.innerText = target + "+";
        }

    };

    updateCounter();

});