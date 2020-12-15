var syntax = "sass";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  cache = require("gulp-cache"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  pug = require("gulp-pug"),
  notify = require("gulp-notify");

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "app",
    },
    notify: false,
  });
  // browserSync({
  // 	proxy: "domen/index.php",
  // 	notify: false
  // });
});

gulp.task("styles", function () {
  return (
    gulp
      .src("app/sass/*.scss")
      .pipe(sass({ outputStyle: "compressed" }).on("error", notify.onError()))
      .pipe(autoprefixer(["last 5 versions"]))
      // .pipe(rename({ suffix: '.min', prefix : '' }))
      // .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.stream())
  );
});

gulp.task("scripts", function () {
  return (
    gulp
      .src([
        //'app/include/slick-carousel/slick/slick.min.js',
        "app/include/common.js",
        // 'app/include/about-page.js',
      ])
      .pipe(concat("scripts.js"))
      // .pipe(uglify())
      .pipe(gulp.dest("app/js"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

// Сборка проекта

gulp.task("clearcache", function () {
  return cache.clearAll();
});
gulp.task("imagemin", function () {
  return (
    gulp
      .src("app/img/**/*")
      // .pipe(cache(imagemin()))
      .pipe(gulp.dest("dist/img"))
  );
});

gulp.task("removePackageLock", function () {
  return del(["package-lock.json"], { force: true });
});
gulp.task("removedist", function () {
  return del(["dist"], { force: true });
});

gulp.task("buildFiles", function () {
  return gulp.src(["app/*.html"]).pipe(gulp.dest("dist"));
});
gulp.task("buildCss", function () {
  return gulp.src(["app/css/styles.css"]).pipe(gulp.dest("dist/css"));
});
gulp.task("buildJs", function () {
  return gulp.src(["app/js/scripts.js"]).pipe(gulp.dest("dist/js"));
});
gulp.task("buildFonts", function () {
  return gulp.src(["app/fonts/**/*"]).pipe(gulp.dest("dist/fonts"));
});
gulp.task("buildLibs", function () {
  return gulp.src(["app/libs/**/*"]).pipe(gulp.dest("dist/libs"));
});

gulp.task(
  "dist",
  gulp.series(
    "removedist",
    "imagemin",
    "styles",
    "scripts",
    "buildFiles",
    "buildCss",
    "buildJs",
    "buildFonts",
    "buildLibs",
    "removePackageLock"
  )
);

// HTML
// gulp.task('code', function() {
// 	return gulp.src('app/*.html')
// 	.pipe(browserSync.reload({ stream: true }));
// });

// PUG
gulp.task("pugCompile", function () {
  return gulp
    .src("app/pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("app"))
    .pipe(browserSync.reload({ stream: true }));
});
// gulp.task('pugClean', function () {
// 	return del('app/pug-modules', {force:true});
// });
// gulp.task('code', gulp.series('pugCompile', 'pugClean'));

gulp.task("watch", function () {
  gulp.watch("app/sass/**/*.scss", gulp.parallel("styles"));
  gulp.watch(
    ["libs/**/*.js", "app/include/common.js"],
    gulp.parallel("scripts")
  );
  // gulp.watch('app/*.html', gulp.parallel('code'));
  gulp.watch(["app/pug/**/*.pug"], gulp.parallel("pugCompile"));
});

gulp.task(
  "default",
  gulp.parallel("watch", "styles", "scripts", "browser-sync")
);
