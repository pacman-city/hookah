"use strict";

const {
  src,
  dest
} = require("gulp");
const gulp = require("gulp");
const plumber = require("gulp-plumber"); // модуль для отслеживания ошибок
const browserSync = require("browser-sync").create(); // сервер для работы и автоматического обновления страниц

const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps'); // модуль для генерации карты исходных файлов
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require('gulp-clean-css');
const cssbeautify = require("gulp-cssbeautify");

const rename = require("gulp-rename");
const del = require("del");
const notify = require("gulp-notify");

const htmlmin = require('gulp-htmlmin-next');

const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require("gulp-uglify");

const fileinclude = require("gulp-file-include");

// return src(path.src.mailer)
// .pipe(dest(path.build.mailer))

/* Paths */
const srcPath = 'src/';
const distPath = 'dist/';

const path = {
  build: {
    html: distPath,
    js: distPath + "assets/js/",
    css: distPath + "assets/css/",
    images: distPath + "assets/images/",
    webp: distPath + "assets/images/webp",
    fonts: distPath + "assets/fonts/",
    mailer: distPath + "phpmailer",
    mailerPhp: distPath
  },
  src: {
    html: srcPath + "*.html",
    js: srcPath + "assets/js/*.js",
    css: srcPath + "assets/scss/*.scss",
    images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
    fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}",
    mailer: srcPath + "assets/phpmailer/**/*",
    mailerPhp: srcPath + "assets/mail.php"
  },
  watch: {
    html: srcPath + "**/*.html",
    js: srcPath + "assets/js/**/*.js",
    css: srcPath + "assets/scss/**/*.scss", // "assets/scss/**/*.+(scss|scss|css)"
    images: srcPath + "assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}",
    fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
  },
  clean: "./" + distPath
}



/* Tasks */

function serve() {
  browserSync.init({
    server: {
      baseDir: "./" + distPath,
      index: "index.html"
    },
    // tunnel: false,
    // host: 'localhost',
    port: 9000,
    notify: false
    // logPrefix: "hello"
    // server: {
    //   baseDir: "./build"
    // },
  });
}

function html(cb) {
  // fileinclude.refresh();
  return src(path.src.html, {
      base: srcPath
    })
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({
      stream: true
    }));
  cb();
}

function css(cb) {
  return src(path.src.css, {
      base: srcPath + "assets/scss/"
    })
    .pipe(sourcemaps.init()) // sourse map
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: "SCSS Error",
          message: "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    .pipe(sass({
      includePaths: './node_modules/'
    }))
    .pipe(autoprefixer({
      cascade: true
    }))
    // .pipe(cssbeautify())// отключил style.css
    // .pipe(dest(path.build.css))
    .pipe(cleanCSS({
      compatibility: '*' // * === default(ie10+)    compatibility: 'ie9'
    }))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write('./')) // sourse map
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({
      stream: true
    }));

  cb();
}

function cssWatch(cb) {
  return src(path.src.css, {
      base: srcPath + "assets/scss/" // src/sass/**/*.+(scss | sass | css) - можно добавлять scss, sass, css
    })
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: "SCSS Error",
          message: "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    .pipe(sass({
      includePaths: './node_modules/'
    }))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({
      stream: true
    }));
  cb();
}

function js(cb) {
  return src(path.src.js, {
      base: srcPath + 'assets/js/'
    })
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: "JS Error",
          message: "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    .pipe(webpackStream({
      mode: "production",
      devtool: 'source-map',
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [{
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env']
          }
        }]
      }
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({
      stream: true
    }));
  cb();
}

function jsWatch(cb) {
  return src(path.src.js, {
      base: srcPath + 'assets/js/'
    })
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: "JS Error",
          message: "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    .pipe(webpackStream({
      mode: "development",
      output: {
        filename: 'app.js',
      }
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({
      stream: true
    }));
  cb();
}

function images(cb) {
  return src(path.src.images)
    .pipe(imagemin([
      // imagemin.gifsicle({
      //   interlaced: true
      // }),
      // imagemin.mozjpeg({
      //   quality: 40,
      //   progressive: true
      // }),
      // imagemin.optipng({
      //   optimizationLevel: 1
      // }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    // .pipe(dest(path.build.images))
    .pipe(webp({
      // lossless: true,
      quality: 60,
      alphaQuality: 90
    }))
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({
      stream: true
    }));
  cb();
}

function fonts(cb) {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({
      stream: true
    }));
  cb();
}

function mailer(cb) {
  return src(path.src.mailer)
    .pipe(dest(path.build.mailer))
    .pipe(browserSync.reload({
      stream: true
    }));
  cb();
}

function mailerPhp(cb) {
  return src(path.src.mailerPhp)
    .pipe(dest(path.build.mailerPhp))
    .pipe(browserSync.reload({
      stream: true
    }));
  cb();
}

function clean(cb) {
  return del(path.clean);
  cb();
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], cssWatch);
  gulp.watch([path.watch.js], jsWatch);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, mailer, mailerPhp));
const watch = gulp.parallel(build, watchFiles, serve);



/* Exports Tasks */
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.mailer = mailer;
exports.mailer = mailerPhp;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;