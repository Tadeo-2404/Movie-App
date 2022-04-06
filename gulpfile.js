const {src, dest, watch} = require('gulp'); //NOTE Funcion de gulp para identificar archivo
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done) { //REVIEW
    src('src/scss/**/*.scss') //NOTE IDENTIFICAR EL ARCHVIO SCSS A COMPILAR
    .pipe(plumber())
    .pipe(sass()) //NOTE Compilarlo
    .pipe(dest('build/css')) //NOTE Almacenarlo en el disco duro
    done();
}


function dev(done) {
   watch('src/scss/**/*.scss', css)
   done();
}

exports.css = css;
exports.dev = dev;