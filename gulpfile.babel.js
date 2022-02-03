/*
TASKS:
clean
img
js
css
twig
sprite
s
gulp
*/

/**
 * -----------------------------------------------------------------------------
 * 🧩 PLUGINS AND PATHS
 * -----------------------------------------------------------------------------
 */
// #region
import { src, dest, watch, series, parallel, lastRun } from 'gulp';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import size from 'gulp-size';
// import sourcemaps from 'gulp-sourcemaps';
import yargs from 'yargs';

import autoprefixer from 'gulp-autoprefixer';
// import cleanCss from 'gulp-clean-css';
import cssnano from 'cssnano';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import uncss from 'postcss-uncss';

import imagemin from 'gulp-imagemin';
import imageminGIF from 'imagemin-gifsicle';
import imageminJPG from 'imagemin-mozjpeg';
import imageminPNG from 'imagemin-pngquant';
import imageminSVG from 'imagemin-svgo';

// Prettier convert void tags to self closing tags and there is no option
// to avoid it. But it's not big deal. It's just that from now on we consider
// self-closing tags as part of our coding standards
import prettify from 'gulp-prettier';
import twig2html from 'gulp-twig';

import svgSprite from 'gulp-svg-sprite';
import webpack from 'webpack-stream';

import del from 'del';
import browserSync from 'browser-sync';

const PRODUCTION = yargs.argv.p;
const sass = gulpSass(dartSass);
const server = browserSync.create();

// Paths
const root = {
  src: './src',
  dest: '.',
};

const paths = {
  css: {
    src: {
      main: `${root.src}/style.scss`,
      woo: `${root.src}/woocommerce.scss`,
    },
    watch: `${root.src}/**/*.scss`,
    tmp: `${root.src}/css`,
    dest: {
      main: `${root.dest}`,
      twig: `${root.dest}/templates/styles`,
    },
  },

  markup: {
    src: ['./templates/static/**/*.twig'],
    html: ['./templates/static/**/*.html'],
    watch: ['./templates/**/*.twig', './templates/styles/*.css'],
    dest: './templates/static',
  },

  img: {
    src: {
      graphics: [
        `${root.src}/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
        `!${root.src}/base/graphics/sprite/**/*`,
        `!${root.src}/img/**/*`,
      ],
      content: `${root.src}/img/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
    },
    // Vars array in watchers breaks build process, so there is one var for a watcher
    watch: [
      `${root.src}/**/*.+(jpg|jpeg|png|svg|gif|webp)`,
      `!${root.src}/base/graphics/sprite/**/*`,
    ],
    dest: `${root.dest}/images`,
  },

  js: {
    src: {
      main: `${root.src}/main.js`,
      vendor: `${root.src}/js/**/*.js`,
    },
    watch: [`${root.src}/**/*.js`],
    dest: `${root.dest}/js`,
  },

  sprite: {
    src: {
      main: [`${root.src}/base/graphics/sprite/*.svg`],
    },
    dest: `${root.src}/base/graphics`,
  },

  fonts: {
    src: `${root.src}/fonts/**/*`,
    dest: `${root.dest}/fonts`,
  },
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📰 MARKUP
 * -----------------------------------------------------------------------------
 */
// #region

export const twig = (done) => {
  src(paths.markup.src, { base: './templates/static' })
    .pipe(
      twig2html({
        // Base path for includes and extends:
        base: './templates',
      })
    )
    .pipe(prettify({ printWidth: 40000, bracketSameLine: true }))
    .pipe(size({ title: 'html' }))
    .pipe(dest(paths.markup.dest));
  done();
};

// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🎨 STYLES
 * -----------------------------------------------------------------------------
 */
// #region

// Common styles function
const cssTasks = (source, subtitle, destination, unCssHtml) =>
  src(source)
    .pipe(changed(destination))
    // .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(
      sass({
        precision: 4,
        includePaths: ['.'],
      }).on('error', sass.logError)
    )
    // autoprefixer (browserslist) has been set in package.json
    .pipe(autoprefixer({ cascade: false }))
    // .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(paths.css.tmp))
    .pipe(
      gulpif(
        PRODUCTION,
        gulpif(
          unCssHtml,
          postcss([
            uncss({
              html: unCssHtml,
              ignore: [
                /* eslint-disable max-len */
                // Bootstrap
                /\w\.fade/,
                /\.collapse?(ing)?/,
                /\.carousel(-[a-zA-Z]+)?/,
                /\.modal(-[a-zA-Z]+)?/,

                // Custom
                '.form__control.is-textarea.is-touched',
                '.form__control.is-touched',
                'iframe',
                /\.[hs]laquo-[a-z0-9]+/,
                /\.[mp][btsex]-(((sm|md|lg|xl|xxl)-)*?)[0-9s]+/,
                /\.mx-(.*?)auto+/,
                /\.vk/,
                /\w\.(has-been-validated|has-spinner|is-active|is-on|is-open|is-pressed|is-touched)/,
                /* eslint-enable max-len */
              ],
            }),
          ])
        )
      )
    )
    // .pipe(gulpif(PRODUCTION, cleanCss()))
    .pipe(postcss([cssnano({ reduceIdents: { keyframes: false } })]))
    .pipe(size({ title: `styles: ${subtitle}` }))
    .pipe(dest(destination))
    .pipe(server.stream());

// Main
export const cssMain = (done) => {
  cssTasks(
    paths.css.src.main,
    'main', // subtitle
    paths.css.dest.main,
    ['templates/static/home/home.html'] // unCssHtml
  );
  done();
};

export const cssWoo = (done) => {
  cssTasks(
    paths.css.src.woo, // src
    'woocommerce', // subtitle
    paths.css.dest.main,
    ['templates/static/home/home.html'] // unCssHtml
  );
  done();
};

export const css = parallel(cssMain, cssWoo);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 💾 SCRIPTS
 * -----------------------------------------------------------------------------
 */
// #region
export const jsMain = () => {
  return src(paths.js.src.main)
    .pipe(changed(paths.js.dest))
    .pipe(
      webpack({
        entry: paths.js.src.main,
        mode: 'production',
        // mode: PRODUCTION ? 'production' : 'development',
        // devtool: !PRODUCTION ? 'inline-source-map' : false,
        output: {
          filename: '[name].js',
          library: 'varyag',
        },
      })
    )
    .pipe(size({ title: 'scripts' }))
    .pipe(dest(paths.js.dest));
};

// COPY PLUGIN SCRIPTS TO DESTINATION
export const jsPlugins = () => {
  return src(paths.js.src.vendor, { since: lastRun(jsPlugins) }).pipe(
    dest(paths.js.dest)
  );
};

export const js = parallel(jsMain, jsPlugins);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🖼 IMAGES
 * -----------------------------------------------------------------------------
 */
// #region

// Common images function
const imgTasks = (source, subtitle) =>
  src(source)
    .pipe(changed(paths.img.dest))
    .pipe(
      gulpif(
        PRODUCTION,
        imagemin(
          [
            imageminGIF({
              interlaced: true,
              optimizationLevel: 3,
            }),
            imageminJPG({ quality: 85 }),
            imageminPNG([0.85, 0.9]),
            imageminSVG({
              plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
            }),
          ],
          { verbose: true }
        )
      )
    )
    .pipe(dest(paths.img.dest))
    .pipe(size({ title: `images: ${subtitle}` }));

// Components
function imgGraphics(done) {
  imgTasks(
    paths.img.src.graphics,
    'graphics' // subtitle
  );
  done();
}

// Graphics
function imgContent(done) {
  imgTasks(
    paths.img.src.content,
    'content' // subtitle
  );
  done();
}

// OPTIMIZE
export const img = parallel(imgGraphics, imgContent);
// #endregion

/**
 * -----------------------------------------------------------------------------
 * ❤️ SVG SPRITE
 * -----------------------------------------------------------------------------
 */
// #region

const svgTasks = (source, name, destination) => {
  return src(source)
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: '.', // Output in the same directory
            sprite: name, // Sprite path and name
            prefix: '.', // Prefix for CSS selectors
            dimensions: '', // Suffix for dimension CSS selectors
          },
        },
        svg: {
          xmlDeclaration: false, // strip out the XML attribute
          doctypeDeclaration: false, // don't include the !DOCTYPE declaration
          namespaceClassnames: false, // keep the source class names untouched
        },
      })
    )
    .pipe(dest(destination));
};

export function sprite(done) {
  svgTasks(
    paths.sprite.src.main,
    'sprite.svg', // sprite name
    paths.sprite.dest
  );
  done();
}
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🛠 UTILITIES
 * -----------------------------------------------------------------------------
 */
// #region
export const clean = () => {
  return del([`${paths.js.dest}/**/*`, `${paths.img.dest}/**/*`]);
};

// COPY FILES TO DESTINATION
export const fonts = () => {
  return src(paths.fonts.src, { since: lastRun(fonts) }).pipe(
    dest(paths.fonts.dest)
  );
};
// #endregion

/**
 * -----------------------------------------------------------------------------
 * 📶 SERVER
 * -----------------------------------------------------------------------------
 */
// #region
export const serve = (done) => {
  server.init({
    server: {
      // root ← wp-content ← themes ← my-theme
      baseDir: '../../../',
    },
    middleware(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    },
    port: 9000,
    notify: false,
  });
  done();
};

export const reload = (done) => {
  server.reload();
  done();
};

export const watchForChanges = () => {
  watch(paths.css.watch, series(css));
  watch(paths.js.watch, series(js, reload));
  watch(paths.img.watch, series(img, reload));
  watch(paths.markup.watch, series(twig));
  watch(paths.markup.html, series(reload));
};

// #endregion

/**
 * -----------------------------------------------------------------------------
 * 🏗 BUILD / DEFAULT
 * -----------------------------------------------------------------------------
 */
// #region
// Add jsPlugins in parallel if it's used

const dev = series(
  clean,
  sprite,
  parallel(css, js, img),
  serve,
  watchForChanges
);

exports.s = dev;

// Add jsPlugins in parallel if it's used
export const build = series(clean, sprite, parallel(css, js, img));

export default build;
// #endregion
