// Model:
var model = {
  currentCat: null,
  cats: [
    {
      clickCount : 0,
      name : 'Kitkat',
      imgSrc : 'https://pixabay.com/static/uploads/photo/2012/10/12/17/12/cat-61079_960_720.jpg'
    },
    {
      clickCount : 0,
      name : 'Kit-teacup',
      imgSrc : 'https://pixabay.com/static/uploads/photo/2013/09/07/08/29/cat-179842_960_720.jpg'
    },
    {
      clickCount : 0,
      name : 'Kittin around',
      imgSrc : 'https://pixabay.com/static/uploads/photo/2013/12/12/03/08/kitten-227009_960_720.jpg'
    },
    {
      clickCount : 0,
      name : 'Kittles',
      imgSrc : 'https://pixabay.com/static/uploads/photo/2015/11/15/20/21/cat-1044750_960_720.jpg'
    },
    {
      clickCount : 0,
      name : 'Kitty Kitty Bang Bang',
      imgSrc : 'https://pixabay.com/static/uploads/photo/2016/05/18/21/33/cat-1401637_960_720.jpg'
    }
  ]
};



/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        //admin area view
        //this.adminElem = document.getElementById('adminArea');
        this.adminName = document.getElementById('cat-name-admin');
        this.adminUrl = document.getElementById('cat-url-admin');
        this.adminClicks = document.getElementById('cat-count-admin');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = 'Clicks: ' + currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;

        //admin view rendering and display with savea anc cacle buttons
        this.adminName.textContent = 'Name of cat: ' + currentCat.name;
        this.adminUrl.textContent = 'Url of image: ' + currentCat.imgSrc;
        this.adminClicks.textContent = 'Amount of clicks: ' + currentCat.clickCount;
        var adminButton = document.getElementById('admin');
        var adminField = document.getElementById('adminArea');
        var saveButton = document.getElementById('save');
        var cancelButton = document.getElementById('cancel');
          adminButton.addEventListener('click', function() {
            adminField.style.display = 'initial';
        })
          saveButton.addEventListener('click', function() {
            adminField.style.display = 'none';
          })
          cancelButton.addEventListener('click', function() {
            adminField.style.display = 'none';
          })
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i, adminCatName, adminButton, adminArea;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            //make a new list for admin
            adminCatName = document.createElement('li');
            elem.textContent = cat.name;
            adminCatName.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};


// make it go!
octopus.init();
