/**
 * Created by Uladzimir_Artsemenka on 7/25/2016.
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';

import config from "../config.json";

// Get one .styl file and render
export default function () {
    return gulp.src(config.script)
        .pipe(babel())
        .pipe(webpack(config.webpack.config))
        .pipe(gulp.dest(config.publicPath));
};
