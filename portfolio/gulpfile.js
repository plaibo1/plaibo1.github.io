var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		browserSync  = require('browser-sync'),
		concat       = require('gulp-concat'),
		uglifyJs     = require('gulp-uglifyjs'),
		cssnano      = require('gulp-cssnano'),
		rename       = require('gulp-rename'),
		del          = require('del'),
		imagemin     = require('gulp-imagemin'),
		pngquant     = require('imagemin-pngquant'),
		cache        = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions','> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});


gulp.task('jsFiles', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/bootstrap/dist/js/bootstrap.min.js',
		'app/libs/lityPopup/lity.js',
		'app/libs/swiper/swiper.js',
		'app/libs/lax/lax.js',
		// add new files here
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglifyJs())
	.pipe(gulp.dest('app/js'))
});

gulp.task('cssFiles', function() {
	return gulp.src([
		'app/libs/bootstrap/dist/css/bootstrap.css',
		'app/libs/lityPopup/lity.css',
		'app/libs/swiper/swiper.css'
		// add new files
	])
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
});

gulp.task('doFiles', gulp.parallel('jsFiles', 'cssFiles'));


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app',
			index: "index.html"
		},
		notify: false
	});
});



gulp.task('clean', function (done) {
  del.sync('dist');
  done();
});

// gulp.task('clean', function (done) {
//   return del('dist');
// });


gulp.task('clearCache', function (done) {
  return cache.clearAll();
});

// dist img
gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});
// dist img



// gulp.parallel for parallel doing   gulp.series for series doing

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.series('sass')); 
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/components/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
});


gulp.task('default', gulp.parallel('watch', 'browser-sync'));


// build all start
gulp.task('build', function() {

	 var buildCss = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('dist/css'));


	// var buildFonts = gulp.src('app/fonts/**/*')
	// .pipe(gulp.dest('dist/fonts'));

	var components = gulp.src('app/components/**')
	.pipe(gulp.dest('dist/components'));


	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));


	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
	
	return buildCss, buildJs, buildHtml, components;

});

gulp.task('doBuild', gulp.series(['clean','img','sass','doFiles','build']));
// build all end


// build for CONSTRUCTOR start ---------

// constructor img
gulp.task('img-constructor', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-constructor/img'));
});
// constructor img

gulp.task('clean-constructor', function (done) {
  del.sync('dist-constructor');
  done();
});

gulp.task('constructor', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-constructor/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-constructor/css')); 

	var buildSwiper = gulp.src('app/css/swiper.min.css')
	.pipe(gulp.dest('dist-constructor/css'));

	var buildDemoCss = gulp.src('app/css/constructor.css')
	.pipe(gulp.dest('dist-constructor/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-constructor/js'));

	var buildDemoJs = gulp.src('app/js/constructor.js')
		.pipe(gulp.dest('dist-constructor/js'));

	var buildHtml = gulp.src('app/constructor.html')
		.pipe(gulp.dest('dist-constructor'));

	return buildBootstrap, buildLity, buildSwiper, buildDemoCss, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('construct', gulp.series(['clean-constructor','img-constructor','sass','doFiles','constructor']));

// build for CONSTRUCTOR end ---------


// build for demo1 start----------------

// demo1 img
gulp.task('img-demo1', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-demo1/img'));
});
// demo1 img

gulp.task('clean-demo1', function (done) {
  del.sync('dist-demo1');
  done();
});

gulp.task('buildForDemo1', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-demo1/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-demo1/css')); 

	var buildSwiper = gulp.src('app/css/swiper.min.css')
	.pipe(gulp.dest('dist-demo1/css'));

	var buildDemo1Css = gulp.src('app/css/demo-1.css')
	.pipe(gulp.dest('dist-demo1/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-demo1/js'));

	var buildDemoJs = gulp.src('app/js/demo-1.js')
		.pipe(gulp.dest('dist-demo1/js'));

	var buildHtml = gulp.src('app/demo-1.html')
		.pipe(gulp.dest('dist-demo1'));

	return buildBootstrap, buildLity, buildSwiper, buildDemo1Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-demo1', gulp.series(['clean-demo1','img-demo1','sass','doFiles','buildForDemo1']));

// build for demo1 end---------------


// build for demo2 start-------------

// demo2 img
gulp.task('img-demo2', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-demo2/img'));
});
// demo2 img

gulp.task('clean-demo2', function (done) {
  del.sync('dist-demo2');
  done();
});

gulp.task('buildForDemo2', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-demo2/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-demo2/css')); 

	var buildSwiper = gulp.src('app/css/swiper.min.css')
	.pipe(gulp.dest('dist-demo2/css'));

	var buildDemo2Css = gulp.src('app/css/demo-2.css')
	.pipe(gulp.dest('dist-demo2/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-demo2/js'));

	var buildDemoJs = gulp.src('app/js/demo-2.js')
		.pipe(gulp.dest('dist-demo2/js'));

	var buildHtml = gulp.src('app/demo-2.html')
		.pipe(gulp.dest('dist-demo2'));

	return buildBootstrap, buildLity, buildSwiper, buildDemo2Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-demo2', gulp.series(['clean','img-demo2','sass','doFiles','buildForDemo2']));

// build for demo2 end---------


// build for demo3 start------------------------

// demo3 img
gulp.task('img-demo3', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-demo3/img'));
});
// demo3 img

gulp.task('clean-demo3', function (done) {
  del.sync('dist-demo3');
  done();
});

gulp.task('buildForDemo3', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-demo3/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-demo3/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-demo3/css'));

	var buildDemo3Css = gulp.src('app/css/demo-3.css')
		.pipe(gulp.dest('dist-demo3/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-demo3/js'));

	var buildDemoJs = gulp.src('app/js/demo-3.js')
		.pipe(gulp.dest('dist-demo3/js'));

	var buildHtml = gulp.src('app/demo-3.html')
		.pipe(gulp.dest('dist-demo3'));

	return buildBootstrap, buildLity, buildSwiper, buildDemo3Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-demo3', gulp.series(['clean-demo3','img-demo3','sass','doFiles','buildForDemo3']));

// build for demo3 end---------


// build for demo4 start-----------------------

// demo4 img
gulp.task('img-demo4', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-demo4/img'));
});
// demo4 img

gulp.task('clean-demo4', function (done) {
  del.sync('dist-demo4');
  done();
});

gulp.task('buildForDemo4', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-demo4/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-demo4/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-demo4/css'));

	var builddemo4Css = gulp.src('app/css/demo-4.css')
		.pipe(gulp.dest('dist-demo4/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-demo4/js'));

	var buildDemoJs = gulp.src('app/js/demo-4.js')
		.pipe(gulp.dest('dist-demo4/js'));

	var buildHtml = gulp.src('app/demo-4.html')
		.pipe(gulp.dest('dist-demo4'));

	return buildBootstrap, buildLity, buildSwiper, builddemo4Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-demo4', gulp.series(['clean-demo4','img-demo4','sass','doFiles','buildForDemo4']));

// build for demo4 end--------------------


// build for demo5 start----------------

// demo5 img
gulp.task('img-demo5', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-demo5/img'));
});
// demo5 img

gulp.task('clean-demo5', function (done) {
  del.sync('dist-demo5');
  done();
});

gulp.task('buildFordemo5', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-demo5/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-demo5/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-demo5/css'));

	var builddemo5Css = gulp.src('app/css/demo-5.css')
		.pipe(gulp.dest('dist-demo5/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-demo5/js'));

	var buildDemoJs = gulp.src('app/js/demo-5.js')
		.pipe(gulp.dest('dist-demo5/js'));

	var buildHtml = gulp.src('app/demo-5.html')
		.pipe(gulp.dest('dist-demo5'));

	return buildBootstrap, buildLity, buildSwiper, builddemo5Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-demo5', gulp.series(['clean-demo5','img-demo5','sass','doFiles','buildFordemo5']));

// build for demo5 end--------------


// build for demo6 start------------

// demo6 img
gulp.task('img-demo6', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-demo6/img'));
});
// demo6 img

gulp.task('clean-demo6', function (done) {
  del.sync('dist-demo6');
  done();
});

gulp.task('buildFordemo6', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-demo6/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-demo6/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-demo6/css'));

	var builddemo6Css = gulp.src('app/css/demo-6.css')
		.pipe(gulp.dest('dist-demo6/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-demo6/js'));

	var buildDemoJs = gulp.src('app/js/demo-6.js')
		.pipe(gulp.dest('dist-demo6/js'));

	var buildHtml = gulp.src('app/demo-6.html')
		.pipe(gulp.dest('dist-demo6'));

	return buildBootstrap, buildLity, buildSwiper, builddemo6Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-demo6', gulp.series(['clean-demo6','img-demo6','sass','doFiles','buildFordemo6']));

// build for demo6 end-----------------


// build for blog1 start

// blog1 img
gulp.task('img-blog1', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-blog1/img'));
});
// blog1 img

gulp.task('clean-blog1', function (done) {
  del.sync('dist-blog1');
  done();
});

gulp.task('buildForblog1', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-blog1/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-blog1/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-blog1/css'));

	var buildblog1Css = gulp.src('app/css/blog-1.css')
		.pipe(gulp.dest('dist-blog1/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-blog1/js'));

	var buildDemoJs = gulp.src('app/js/blog-1.js')
		.pipe(gulp.dest('dist-blog1/js'));

	var buildHtml = gulp.src('app/blog-1.html')
		.pipe(gulp.dest('dist-blog1'));

	return buildBootstrap, buildLity, buildSwiper, buildblog1Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-blog1', gulp.series(['clean-blog1','img-blog1','sass','doFiles','buildForblog1']));

// build for blog1 end


// build for blog2 start

// blog2 img
gulp.task('img-blog2', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-blog2/img'));
});
// blog2 img

gulp.task('clean-blog2', function (done) {
  del.sync('dist-blog2');
  done();
});

gulp.task('buildForblog2', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-blog2/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-blog2/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-blog2/css'));

	var buildblog2Css = gulp.src('app/css/blog-2.css')
		.pipe(gulp.dest('dist-blog2/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-blog2/js'));

	var buildDemoJs = gulp.src('app/js/blog-2.js')
		.pipe(gulp.dest('dist-blog2/js'));

	var buildHtml = gulp.src('app/blog-2.html')
		.pipe(gulp.dest('dist-blog2'));

	return buildBootstrap, buildLity, buildSwiper, buildblog2Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-blog2', gulp.series(['clean-blog2','img-blog2','sass','doFiles','buildForblog2']));

// build for blog2 end


// build for blog3 start

// blog3 img
gulp.task('img-blog3', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-blog3/img'));
});
// blog3 img

gulp.task('clean-blog3', function (done) {
  del.sync('dist-blog3');
  done();
});

gulp.task('buildForblog3', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-blog3/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-blog3/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-blog3/css'));

	var buildblog3Css = gulp.src('app/css/blog-3.css')
		.pipe(gulp.dest('dist-blog3/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-blog3/js'));

	var buildDemoJs = gulp.src('app/js/blog-3.js')
		.pipe(gulp.dest('dist-blog3/js'));

	var buildHtml = gulp.src('app/blog-3.html')
		.pipe(gulp.dest('dist-blog3'));

	return buildBootstrap, buildLity, buildSwiper, buildblog3Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-blog3', gulp.series(['clean-blog3','img-blog3','sass','doFiles','buildForblog3']));

// build for blog3 end


// build for blogPost1 start

// blogPost1 img
gulp.task('img-blogPost1', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-blogPost1/img'));
});
// blogPost1 img

gulp.task('clean-blogPost1', function (done) {
  del.sync('dist-blogPost1');
  done();
});

gulp.task('buildForblogPost1', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-blogPost1/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-blogPost1/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-blogPost1/css'));

	var buildblogPost1Css = gulp.src('app/css/blogPost-1.css')
		.pipe(gulp.dest('dist-blogPost1/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-blogPost1/js'));

	var buildDemoJs = gulp.src('app/js/blog-1.js')
		.pipe(gulp.dest('dist-blogPost1/js'));

	var buildHtml = gulp.src('app/blogPost-1.html')
		.pipe(gulp.dest('dist-blogPost1'));

	return buildBootstrap, buildLity, buildSwiper, buildblogPost1Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-blogPost1', gulp.series(['clean-blogPost1','img-blogPost1','sass','doFiles','buildForblogPost1']));

// build for blogPost1 end


// build for blogPost2 start

// blogPost2 img
gulp.task('img-blogPost2', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-blogPost2/img'));
});
// blogPost2 img

gulp.task('clean-blogPost2', function (done) {
  del.sync('dist-blogPost2');
  done();
});

gulp.task('buildForblogPost2', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-blogPost2/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-blogPost2/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-blogPost2/css'));

	var buildblogPost2Css = gulp.src('app/css/blogPost-2.css')
		.pipe(gulp.dest('dist-blogPost2/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-blogPost2/js'));

	var buildDemoJs = gulp.src('app/js/blog-1.js')
		.pipe(gulp.dest('dist-blogPost2/js'));

	var buildHtml = gulp.src('app/blogPost-2.html')
		.pipe(gulp.dest('dist-blogPost2'));

	return buildBootstrap, buildLity, buildSwiper, buildblogPost2Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-blogPost2', gulp.series(['clean-blogPost2','img-blogPost2','sass','doFiles','buildForblogPost2']));

// build for blogPost2 end


// build for blogPost3 start

// blogPost3 img
gulp.task('img-blogPost3', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist-blogPost3/img'));
});
// blogPost3 img

gulp.task('clean-blogPost3', function (done) {
  del.sync('dist-blogPost3');
  done();
});

gulp.task('buildForblogPost3', function () {

	var buildBootstrap = gulp.src('app/css/bootstrap.min.css')
		.pipe(gulp.dest('dist-blogPost3/css'));

	var buildLity = gulp.src('app/css/lity.min.css')
		.pipe(gulp.dest('dist-blogPost3/css'));

	var buildSwiper = gulp.src('app/css/swiper.min.css')
		.pipe(gulp.dest('dist-blogPost3/css'));

	var buildblogPost3Css = gulp.src('app/css/blogPost-3.css')
		.pipe(gulp.dest('dist-blogPost3/css'));

	var buildLibs = gulp.src('app/js/libs.min.js')
		.pipe(gulp.dest('dist-blogPost3/js'));

	var buildDemoJs = gulp.src('app/js/blog-1.js')
		.pipe(gulp.dest('dist-blogPost3/js'));

	var buildHtml = gulp.src('app/blogPost-3.html')
		.pipe(gulp.dest('dist-blogPost3'));

	return buildBootstrap, buildLity, buildSwiper, buildblogPost3Css, buildLibs, buildDemoJs, buildHtml;

});

gulp.task('doBuild-blogPost3', gulp.series(['clean-blogPost3','img-blogPost3','sass','doFiles','buildForblogPost3']));

// build for blogPost3 end



// landing all
gulp.task('doBuild-demoAll', gulp.series(['doBuild-demo1','doBuild-demo2','doBuild-demo3', 'doBuild-demo4', 'doBuild-demo5', 'doBuild-demo6']));


// blog all
gulp.task('doBuild-BlogAll', gulp.series(['doBuild-blog3','doBuild-blog2','doBuild-blog1']));


// blogPost all
gulp.task('doBuild-BlogPostAll', gulp.series(['doBuild-blogPost1','doBuild-blogPost2','doBuild-blogPost3']));
