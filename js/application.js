(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
  var CountTo = function (element, options) {
    this.$element = $(element);
    this.options  = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
    this.init();
  };

  CountTo.DEFAULTS = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };

  CountTo.prototype.init = function () {
    this.value     = this.options.from;
    this.loops     = Math.ceil(this.options.speed / this.options.refreshInterval);
    this.loopCount = 0;
    this.increment = (this.options.to - this.options.from) / this.loops;
  };

  CountTo.prototype.dataOptions = function () {
    var options = {
      from:            this.$element.data('from'),
      to:              this.$element.data('to'),
      speed:           this.$element.data('speed'),
      refreshInterval: this.$element.data('refresh-interval'),
      decimals:        this.$element.data('decimals')
    };

    var keys = Object.keys(options);

    for (var i in keys) {
      var key = keys[i];

      if (typeof(options[key]) === 'undefined') {
        delete options[key];
      }
    }

    return options;
  };

  CountTo.prototype.update = function () {
    this.value += this.increment;
    this.loopCount++;

    this.render();

    if (typeof(this.options.onUpdate) == 'function') {
      this.options.onUpdate.call(this.$element, this.value);
    }

    if (this.loopCount >= this.loops) {
      clearInterval(this.interval);
      this.value = this.options.to;

      if (typeof(this.options.onComplete) == 'function') {
        this.options.onComplete.call(this.$element, this.value);
      }
    }
  };

  CountTo.prototype.render = function () {
    var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
    this.$element.text(formattedValue);
  };

  CountTo.prototype.restart = function () {
    this.stop();
    this.init();
    this.start();
  };

  CountTo.prototype.start = function () {
    this.stop();
    this.render();
    this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
  };

  CountTo.prototype.stop = function () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  CountTo.prototype.toggle = function () {
    if (this.interval) {
      this.stop();
    } else {
      this.start();
    }
  };

  function formatter(value, options) {
    return value.toFixed(options.decimals);
  }

  $.fn.countTo = function (option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('countTo');
      var init    = !data || typeof(option) === 'object';
      var options = typeof(option) === 'object' ? option : {};
      var method  = typeof(option) === 'string' ? option : 'start';

      if (init) {
        if (data) data.stop();
        $this.data('countTo', data = new CountTo(this, options));
      }

      data[method].call(data);
    });
  };
}));

particlesJS.load('particles-js', 'js/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

$('body').on('hidden.bs.modal', '.modal', function () {
      $(this).removeData('bs.modal');
    });


ion.sound({
    sounds: [
        {
            name: "generator"
        },
        {
            name: "click",
        },
        {
            name: "success",
        }
    ],
    volume: 0.5,
    path: "audio/",
    preload: true
});



$( ".soundclick" ).each(function(index) {
    $(this).on("click", function(){
      ion.sound.play("click");
    });
});
var platform = 'pc';
var amount = '';

$(".platforms li").each(function() {
  $(this).on("click", function(){

    $(".platforms li").removeClass("platform-active");
        $(this).addClass("platform-active");
        platform = $(this).data("name");
        console.log(platform);
  });
});


$(".btnFirst").click(function() {

  if($('.usernameInput').val() === '' || $('.usernameInput').val() <= 3) {
    $(".usernameInput").addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass('shake animated');
    });
  } else {
    $.ajax({
    //   url: "api.php?p=" + platform + "&u=" + $('.usernameInput').val(),
    url: "index.html",
      type: 'GET',
      beforeSend: function() {
        // setting a timeout
        $(".btnCheckData span").html('<i class="fas fa-spinner fa-spin" style="font-size:24px; color: font-weight: bold; #222a4c;"></i>');
        $(".btnFirst").addClass("disabled-btn");
      },
      success: function(res) {
          $(".btnFirst").removeClass("disabled-btn");
        //   var data = JSON.parse(res);
        //   console.log(data);
        // if(data.hasOwnProperty('error') || data.hasOwnProperty('message')){
        if(10 > 9){
             $('.generator-page').addClass('fadeOutRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeOutRight animated');
          $(this).hide();
          $('#packagesModal').modal('show');
          ion.sound.play("success");
          });
        } else {
        $(".generator_icons").show();
        $(".player-kills").html(data.lifeTimeStats[10].value);
        $(".player-score").html(data.lifeTimeStats[6].value);
        $(".player-matches").html(data.lifeTimeStats[7].value);
        $(".player-wins").html(data.lifeTimeStats[9].value);
          $('.generator-page').addClass('fadeOutRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeOutRight animated');
          $(this).hide();
          $('#packagesModal').modal({backdrop: 'static', keyboard: false});
          ion.sound.play("success");
          });
        }
      }
    });

  }
});

$(".btnStartGenerator").click(function() {
  $('#loadingModal').modal({backdrop: 'static', keyboard: false});
  $(".btnStartGenerator").addClass("btn-disabled");
  setTimeout(function() {
    $('.loader-count').addClass('fadeOutRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeOutRight animated');
          $(this).hide();
          $('.package-count').show();
          ion.sound.play("generator");
    });
  }, 3500);
  setTimeout(function() {
   $('.package-count').addClass('zoomInLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('zoomInLeft animated');
           $('#count21').countTo({
            from: 0,
            to: amount,
            speed: 7000,
            refreshInterval: 30,
            onComplete: function(value) {
                 $('.package-count').addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated pulse');
         $(".count-js-title").html("SWEET!");
         $(".valueCount-js").addClass('color-green');
         ion.sound.stop();
           setTimeout(function() {
         $('#loadingModal').modal('hide');
         $('.right_panel').hide();
           $('.package-count').fadeOut();
          $('.human-verification').show();

           }, 2000);
          });

            }
        });





    });
  }, 3600);



});

$(".packages li").each(function() {
  $(this).on("click", function(){
    amount = $(this).data("amount");
    $('#packagesModal').modal('hide');
    $('.right_panel').show();
    $('.value-Counto').html(amount);
    $('.prepare-usr').html($('.usernameInput').val());
    $('.right_panel').addClass('fadeInLeft animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      $(this).removeClass('fadeInLeft animated');
    });
  });
});






var arr1 = ["SypherPK","WFS. cRaBBLe","LP Merti","BRC WOODBØY","HighDistortion","DrLupo","R3demer","POTTATO","Aêrøeu","Darktrust","Enraveee","YOUTUBE_HeroNova","BoroTheGOAT","Complex1996","GODFATHERDOOM"];


$(".btn_verify").on("click", function() {
  // Call CPAbuild Locker here
  CPABuildLock();
});

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

setInterval(function(){
    var $all = $(".recent_block").removeClass("green-bg");
        var blockk = $(shuffle($all).slice(0, 1));
        setTimeout(function() {blockk.addClass("green-bg"); },3500);
        blockk.find(".recent_block_name > span").html(shuffle(arr1).slice(0, 1));
        setTimeout(function() { blockk.find(".stepper").append('<div class="divider"></div><div class="step"><div class="circle">3</div><div class="label">V-Bucks</div></div>'); },1500);
        setTimeout(function() { blockk.find(".stepper > div").slice(-2).remove();},4900);
}, 5000);
