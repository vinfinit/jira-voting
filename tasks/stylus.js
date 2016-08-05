/**
 * Created by Uladzimir_Artsemenka on 7/25/2016.
 */

import gulp from 'gulp';
import stylus from 'gulp-stylus';
import sourceMaps from 'gulp-sourcemaps';

import config from "../config.json";

// Get one .styl file and render
export default function () {
    return gulp.src(config.stylus)
        .pipe(sourceMaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(config.publicPath));
};
