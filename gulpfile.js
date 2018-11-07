const gulp = require('gulp');
const del = require('del');
const inject = require('gulp-inject');
const connect = require('gulp-connect');
const autoprefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const copy = require('gulp-copy');
const sass = require('gulp-sass');
const jsmin = require('gulp-jsmin');
const htmlClean = require('gulp-htmlclean');
const cssClean = require('gulp-clean-css')
//gulp-image-resize

const paths = {
  build:'build/**/*',
  htmlSrc:'build/*.html',
  scssSrc:'build/scss/*.scss',
  cssSrc:'build/css/*.css',
  jsSrc:'build/js/*.js',
  imgSrc:'build/img/*',
  fontSrc:'build/fonts/*',
  htmlDist:'dist/index.html',
  dist:'dist',
  cssDist:'dist/css/',
  jsDist:'dist/js/*',  
  imgDist:'dist/img/*',
  fontDist:'dist/fonts/*'
};


gulp.task('css',()=>{
  gulp.src('build/css/mas.css')
  .pipe(autoprefix('last 2 versions'))
  .pipe(cssClean({level:2}))
  .pipe(gulp.dest("dist/css"))
});

gulp.task('js',()=>{
  gulp.src('build/js/mas.js')
  .pipe(jsmin())
  .pipe(gulp.dest('dist/js'))
});

gulp.task('html:prod',()=>{
  gulp.src('build/index.html')
  .pipe(inject(gulp.src('dist/css/mas.css'),{ignorePath:'/dist/',addRootSlash:false}))
  .pipe(inject(gulp.src('dist/js/mas.js'),{ignorePath:'/dist/',addRootSlash:false}))
  .pipe(gulp.dest("dist"))
});

gulp.task('connect', () =>
  connect.server({
    root: "dist",
    port: 8000,
    livereload: true
  })
);

gulp.task('watch',['html:prod','connect'],function(){
  gulp.watch('build');
});


/*gulp.task('javascripts', () =>
  gulp.src([ paths.jsSrc ])
    .pipe(babel({
      presets: [ 'env' ],
    }))
    .pipe(concat('mas.min.js'))
    .pipe(gulp.dest(paths.jsDist))




/* DEV-Tasks */
/*gulp.task('sass', () =>
  gulp.src([ paths.scssSrc ])
    .pipe(sass({
      includePaths: [ ],outputStyle:'compressed'}
    ).on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(cssClean({level:2}))
    .pipe(gulp.dest(paths.cssDist))
);

gulp.task('css',()=>{
  gulp.src("/build/css")
  .pipe(autoprefix('last 2 versions'))
  .pipe(cssClean({level:2}))
  .pipe(gulp.dest("/dist/css"))
});

gulp.task('connect', () =>
  connect.server({
    root: "build",
    port: 8000,
    livereload: true
  })
);

gulp.task('inject',()=>{
  var target = gulp.src("build/index.html");
  var sources = gulp.src(['build/scss/mas.css','build/js/mas.js']);
  return target.pipe(inject(sources)).pipe(gulp.dest('dist'));
});*/

//PROD-Tasks
/*gulp.task('html',()=>{
  gulp.src(paths.htmlSrc)
  .pipe(htmlClean)
  .pipe(gulp.dest(paths.htmlDist));
});

gulp.task('javascripts', () =>
  gulp.src([ paths.jsSrc ])
    .pipe(babel({
      presets: [ 'env' ],
    }))
    .pipe(concat('mas.min.js'))
    .pipe(gulp.dest(paths.jsDist))
);*/
