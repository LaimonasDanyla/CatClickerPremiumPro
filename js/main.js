// Model:
var model = {
  currentCat: null,
  cats: [
    {
      clickCount : 0,
      name : 'Kitkat',
      imgSrc : 'http://www.imagesource.com/Doc/IS0/Media/TR3_WATERMARKED/e/9/f/3/IS098T7MB.jpg'
    },
    {
      clickCount : 0,
      name : 'Kit-teacup',
      imgSrc : 'http://www.imagesource.com/Doc/IS0/Media/TR3_WATERMARKED/8/f/4/1/IS099M4YQ.jpg'
    },
    {
      clickCount : 0,
      name : 'Kittin around',
      imgSrc : 'http://www.imagesource.com/Doc/IS0/Media/TR3_WATERMARKED/8/6/c/b/IS816-030.jpg'
    },
    {
      clickCount : 0,
      name : 'Kittles',
      imgSrc : 'http://www.imagesource.com/Doc/IS0/Media/TR3_WATERMARKED/b/f/f/1/IS09AN7NF.jpg'
    },
    {
      clickCount : 0,
      name : 'Kitty Kitty Bang Bang',
      imgSrc : 'http://www.imagesource.com/Doc/IS0/Media/TR3_WATERMARKED/7/3/e/c/IS09AA7RX.jpg'
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

        //admin view rendering and display with save and cancel buttons
        this.adminName.value = currentCat.name;
        this.adminUrl.value = currentCat.imgSrc;
        this.adminClicks.value = currentCat.clickCount;
        var adminField = document.getElementById('adminArea');
        var adminButton = document.getElementById('admin');
        var saveButton = document.getElementById('save');
        var cancelButton = document.getElementById('cancel');


          adminButton.addEventListener('click', function() {
            adminField.style.display = 'initial';
          })
          saveButton.addEventListener('click', function() {

            //seting form variable to use later in code
            var inputForm = document.getElementById('form1');

            //get the input value
            var inputName = inputForm.elements["catNameAdmin"].value;

            // input of cat name at the picture
            currentCat.name = inputName;
            var catNameElemAdmin = document.getElementById('cat-name');
            catNameElemAdmin.textContent = currentCat.name;

            //input of url
            var inputUrl = inputForm.elements["imgUrlAdmin"].value;
            currentCat.imgSrc = inputUrl;
            var catImageElemAdmin = document.getElementById('cat-img');
            catImageElemAdmin.src = currentCat.imgSrc;
            adminField.style.display = 'none';

          })
          cancelButton.addEventListener('click', function() {
            adminField.style.display = 'none';
            location.reload();
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
        var cat, elem, i;
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
            elem.id = "cat " + i;
            elem.textContent = cat.name;

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
