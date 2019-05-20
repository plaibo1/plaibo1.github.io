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
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/libs/bootstrap/dist/js/bootstrap.min.js',
		'app/libs/lityPopup/lity.js',
		'app/libs/wowAndAnimatejs/wow.js',
		'app/libs/swiper/swiper.js'
		// add new files
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglifyJs())
	.pipe(gulp.dest('app/js'))
});

gulp.task('cssFiles', function() {
	return gulp.src([
		'app/libs/bootstrap/dist/css/bootstrap.css',
		'app/libs/lityPopup/lity.css',
		'app/libs/wowAndAnimatejs/animate.css',
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

gulp.task('clean', function (done) {
  return del('dist');
});


gulp.task('clearCache', function (done) {
  return cache.clearAll();
});


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



// gulp.parallel for parallel doing   gulp.series for series doing

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.series('sass')); 
	// gulp.watch(path.html).on('change', browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));



gulp.task('build', function() {

	 var buildCss = gulp.src('app/css/**/*.css')
	.pipe(gulp.dest('dist/css'));


	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));


	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'));


	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	return buildCss, buildFonts, buildJs, buildHtml;

});

gulp.task('doBuild', gulp.series(['clean','img','sass','doFiles','build']));