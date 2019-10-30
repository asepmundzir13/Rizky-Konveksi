class wrapperEl {
  constructor(w) {
    this.wrapper = w;
    this.ulList = Array.from(this.wrapper.children).slice(1, 5);
    this.aList = Array.from(this.wrapper.children[5].children);
    this.current = 0
    this.currentUl = undefined;
    this.currentButton = undefined;
    this.isAnimating = false;
    this.animEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd',
      'msAnimation': 'MSAnimationEnd',
      'animation': 'animationend'
    };
    this.animEndEventName = this.animEndEventNames[Modernizr.prefixed('animation')];
  }

  init() {
    //set initial current button
    this.currentUl = this.ulList[0];
    this.currentButton = this.aList[0];

    //set initial current button class
    this.currentUl.classList.add('pc-current');
    this.currentButton.classList.add('pc-selected');

    //set event listener
    let wrapper = this;
    for (let i = 0; i < this.aList.length; i++) {
      this.aList[i].addEventListener('click', function () {
        wrapper.categorySlide(i);
        return false;
      });
    }
  }

  categorySlide(catindex) {
    if (catindex == this.current || this.isAnimating /*if this category is currently selected or still animating*/ ) {
      return false
    }

    /* if not selected */
    /* inform that it is animating */
    this.isAnimating = true;

    /* remove currently selected button class */
    this.currentButton.classList.remove('pc-selected');

    /* give newly selected button class */
    this.currentButton = this.aList[catindex];
    this.currentButton.classList.add('pc-selected');

    /* determine the direction */
    let direction = catindex > this.current ? 'right' : 'left',
      toClass = direction == 'right' ? 'pc-moveToLeft' : 'pc-moveToRight',
      fromClass = direction == 'right' ? 'pc-moveFromRight' : 'pc-moveFromLeft',
        
      /* newly selected ul */
      newUl = this.ulList[catindex],

      /* ul li */
      newUlChild = newUl.children,

      /* the last li to slide out */
      lastEnter = direction == 'right' ? newUlChild.length - 1 : 0,

      /* the carousel-box-wrapper */
      wrapper = this;

    /* replace currently selected category and remove class */
    this.currentUl = this.ulList[this.current];
    this.currentUl.className = "";
    this.currentUl.classList.add(toClass);

    /* use timeout to make a gap between each item animations */
    setTimeout(function () {
      newUl.className = "";
      newUl.classList.add(fromClass);

      /* after the last li of current ul is out, the new ul is given new class */
      const liAnimEnd = function () {
        this.removeEventListener(wrapper.animEndEventName, liAnimEnd);
        newUl.classList.add('pc-current');
        wrapper.current = catindex;
        wrapper.isAnimating = false;
      }
      newUlChild[lastEnter].addEventListener(wrapper.animEndEventName, liAnimEnd)
    }, newUlChild.length * 90);

  }
}

/* call the main function */
/* create wrapperEl object, call init method */
/* init method will set currentUl and currentButton as well as their classes & also contains addEventListener for buttons */

function activateSlide(element) {
  return new wrapperEl(element);
}
