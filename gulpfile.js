'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var concat      = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var siteOutput = './dist';
var { watch, series } = require('gulp');


// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var input = './src/*.scss';
var inputMain = 'src/scss/styles.scss';
var output = siteOutput + '/assets';
var inputTemplates = './src/pages/*.html';
var sassOptions = { outputStyle: 'expanded' };
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var sassdocOptions = { dest: siteOutput + '/sassdoc' };


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function() {
  return gulp
    .src(inputMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});


// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------
/*
gulp.task('scripts', function() {
  return gulp.src([
	  	'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
	  	'js/main.js'
  	])
    .pipe(concat({ path: 'main.js'}))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(siteOutput + '/js'));
});
*/

// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------

gulp.task('nunjucks', function() {
  //nunjucksRender.nunjucks.configure(['./pages/']);
  // Gets .html and .nunjucks files in pages
  return gulp.src(inputTemplates)
  // Renders template with nunjucks
  .pipe(nunjucksRender({
    path: ['src/pages/']
  }))
  // output files in dist folder
  .pipe(gulp.dest(siteOutput))
});


gulp.task('render', function() {
  return gulp.src(inputTemplates)
  .pipe(nunjucksRender({
    path: ['./src/pages/']
  }))
  .pipe(gulp.dest( './dist/' )) ;
});

// -----------------------------------------------------------------------------
// Imagemin
// -----------------------------------------------------------------------------

gulp.task('img', function() {
  return gulp.src('./img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(siteOutput + '/img'));
});


// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

// gulp.task('fonts', function() {
//   return gulp.src(['./fonts/*'])
//   .pipe(gulp.dest(siteOutput + '/fonts/'));
// });


// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------

gulp.task('sassdoc', function() {
  return gulp
    .src(input)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});


// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/pages/*.html', gulp.series('nunjucks'));
  gulp.watch("scr/pages/*.html").on('change', () => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    browserSync.reload();
});
});

// -----------------------------------------------------------------------------
// Static server
// -----------------------------------------------------------------------------

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: siteOutput
    }
  });
});


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', gulp.series('sass', 'nunjucks', 'img', 'watch', 'browser-sync'));