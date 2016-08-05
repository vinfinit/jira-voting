/**
 * Created by Uladzimir_Artsemenka on 7/25/2016.
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import browserify from 'gulp-browserify';

import config from "../config.json";

// Get one .styl file and render
export default function () {
    return gulp.src(config.script)
        .pipe(babel())
        .pipe(browserify())
        .pipe(gulp.dest(config.publicPath));
};
