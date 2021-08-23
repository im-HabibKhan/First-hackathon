(function ($) {
  "use strict"; // Start of use strict
  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [{
      data: [85, 15],
      // displacements: [0, 0, 20],
      backgroundColor: ['#1cc88a', '#e74a3b'],
      // hoverBackgroundColor: ['#2e59d9', '#17a673'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  };

  const config = {
    type: 'pie',
    data: data,
    options: {
      animation: {
        animateScale: true
      },
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          boxWidth: 30,
          padding: 50
        }
      },
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          color: '#fff',
          display: true,
          font: {
            family: 'Gotham',
            size: 20,
            weight: 'bold'
          },
          formatter: function (value, context) {
            return Math.round(value) + '%';
          }
        },
      },
    },
  };
  var timeOut = false;

  var questionsArray = [{
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "Brendan Eich"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "npm"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "ESLint"
    }
  ];

  var points = 0;
  var numQuestions = questionsArray.length;
  var count = 0;

  for (var i in questionsArray) {
    if (i == 0) {
      var slide =
        `<div class="slide active">`;
    } else {
      var slide =
        `<div class="slide">`;
    }
    slide = slide +
      `<p class="text-justify h5 pb-2 font-weight-bold question">` + questionsArray[i].question + `</p>
    <div class="options py-3">`;
    for (var j in questionsArray[i].answers) {
      slide = slide +
        `<label class="rounded p-2 option">` + questionsArray[i].answers[j] + `
        <input type="radio" name="radio">`;
      if (questionsArray[i].correctAnswer === questionsArray[i].answers[j]) {
        slide = slide + `<span class="checkmark"></span></label>`;
      } else {
        slide = slide + `<span class="crossmark"></span></label>`;
      }
    }
    slide = slide +
      `</div>
    <div class="feedback d-none">
        <b>Feedback</b>
        <p class="mt-2 mb-4 pl-2 text-justify"> Well done! He was scared of flying so picked
            up
            the
            parachute from an support store before the trip. He won gold </p>
        <p class="my-2 pl-2"> That was incorrect. Try again </p>
    </div>`;
    $('.content').append(slide);
  }

  mouseDisabled();

  $('#nextButton').on('click', function () {
    if ($('.slide.active input:checked').length != 0) {
      // console.log($('.slide.active input:checked'));
      var userAnswer = $('.slide.active input:checked').parent().text().trim();
      if (questionsArray[count].correctAnswer == userAnswer) {
        points++;
      }
      count++;
      // console.log(points);
      $('.slide.active').remove();
      $('.slide').first().addClass('active');
      mouseDisabled();
      if (count > numQuestions - 2) {
        // console.log('here');
        $('#nextButton').addClass('d-none');
        $('#btnSubmit').addClass('d-block');
      }
    } else {
      alert('Please select an option!');
    }

  })

  $('#btnSubmit').on('click', function () {
    $('.loading-screen').fadeIn("slow");
    setTimeout(function () {
      $('.loading-screen').fadeOut("slow");
    }, 5000);
    if ($('.slide.active input:checked').length != 0 || timeOut == true) {
      var userAnswer = $('.slide.active input:checked').parent().text().trim();
      if (questionsArray[count].correctAnswer == userAnswer) {
        points++;
      }
      $('.mcq-container').children().remove();
      $('.mcq-container').append(
        `<div class="mcq-container container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Result</h1>
        </div>
        <div class="container-fluid bg-white rounded mb-4">
            <div class="row">
                <div class="col mb-4 pb-4">
                    <h3 class="result-text">
                        You got <span class="text-success">` + points + `</span> out of <span class="text-danger">` + numQuestions + `</span> correct. Click on Retry button to start over assessments.
                    </h3>
                </div>
            </div>
            <div class="row">
                <div class="col-8 mx-auto mb-4 pb-4">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
            <div class="row d-flex align-items-center justify-content-center">
                <div class="buttons menu">
                    <a id="retryButton" href="index.html" class="btn btn-primary">Retry</a>
                </div>
            </div>
        </div>
    </div>`);
      var chartBox = document.getElementById('myChart');
      if (chartBox) {
        data.datasets[0].data = [(points / numQuestions) * 100, ((numQuestions - points) / numQuestions) * 100]

        var myChart = new Chart(chartBox,
          config
        );
      }
    } else {
      alert('Please select an option!');
    }
  })

  function mouseDisabled() {
    $('.slide.active .options label').on('click', function () {
      $('.slide.active .options').addClass('mouse-disabled');
    })
  }
  $(".loading-screen").fadeOut("slow");
})(jQuery); // End of use strict